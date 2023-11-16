const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
// const morgan = require("morgan");
const { resultsSchema } = require("./schemas.js");
// const requireLogin = require("./utils/requireLogin");
const aWeekAway = require("./utils/constants");
const AppError = require("./utils/AppError");
const User = require("./models/users");
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
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// app.use(morgan("tiny"));
// app.use(cookieParser());

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
// app.use(requireLogin());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const requireLogin = (req, res, next) => {
//     if (!req.session.user_id) {
//         req.flash("error", "Log in to view your profile.")
//         return res.redirect("/login")
//     };
//     next();
// };

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// *******************************************


// *******************************************

app.use("/cards", cardRoutes);
app.use("/games", gameRoutes);
app.use("/combos", comboRoutes);
app.use("/register", authRoutes);
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/:id", async (req, res) => {
    console.log("HEREHEREHERE")
    const {id} = req.params;
    const user = await User.findById(id);
    res.render("userLanding", {user});
})

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    const { message = "Bad things Happened" } = err;
    res.status(status).render("error", {message});
});


// const validateResult = (req, res, next) => {
//     const { error } = resultsSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(",");
//         throw new AppError(msg, 400);
//     } else {
//         next();
//     };
// };


// const verifyPassword = (req, res, next) => {
//     const {password} = req.query;
//     if (password === "good") {
//         next();
//     }
//     throw new AppError("Can't eat chicken", 401);
// };


// app.get("/error", verifyPassword, (req, res) => {
//     res.send("good")
// });

// app.get("/bad", (req, res) => {
//     DefaultDeserializer.fart();
// })

// app.use((err, req, res, next) => {  Error handlers need these four params in express
//     console.log("HERE");            Additionally, this use method must be placed after all other middleware (app.uses) on the page.
//     If the code stops here, the page will never encounter the built-in or custom made error handler.
//     next(err)                       This lets the code in our function run and THEN move onto the default handler.
// });                                 The error must be passed into nest(). next() with a parameter passed thru knows that the argument being passed is an error.


app.listen(3000, () => {
    console.log("listening...");
})

