const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const AppError = require("./utils/AppError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const aWeekAway = require("./utils/constants");
// const { resultsSchema } = require("./schemas.js");

const userRoutes = require("./routes/users.js")
const cardRoutes = require("./routes/cards.js");
const gameRoutes = require("./routes/games.js");
const comboRoutes = require("./routes/combos.js");
const authRoutes = require("./routes/registration.js");
const loginRoutes = require("./routes/login.js");

mongoose.connect("mongodb://127.0.0.1:27017/comboRecords", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("db connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "productionSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + aWeekAway,
        maxAge: aWeekAway
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// *******************************************


// *******************************************

app.use("/", userRoutes)
app.use("/cards", cardRoutes);
app.use("/games", gameRoutes);
app.use("/combos", comboRoutes);
app.use("/register", authRoutes);
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
    console.log("running home")
    console.log("")
    res.render("home");
});

// app.get("/:id", async (req, res) => {
//     console.log("userID")
//     console.log("")
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.render("userLanding", {user});
// });

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    const { message = "Bad things Happened" } = err;
    res.status(status).render("error", {message});
});

app.listen(3000, () => {
    console.log("listening...");
})
