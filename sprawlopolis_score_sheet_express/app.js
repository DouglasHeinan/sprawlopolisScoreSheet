const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const morgan = require("morgan");
const { cardSchema, resultsSchema } = require("./schemas.js")
const catchAsync = require("./utils/catchAsync")
const AppError = require("./utils/AppError")
const ScoreCard = require("./models/scoringCards");
const CardCombo = require("./models/cardCombos")
const GameResult = require("./models/gameResults")

mongoose.connect("mongodb://127.0.0.1:27017/comboRecords", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("db connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const validateResult = (req, res, next) => {
    const { error } = resultsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new AppError(msg, 400);
    } else {
        next();
    };
};

// const validateCard = (req, res, next) => {
//     const { error } = cardSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(",");
//         throw new AppError(msg, 400);
//     } else {
//         next();
//     };
// };


app.get("/", async (req, res) => {
    res.render("home");
});

app.get("/cards", catchAsync(async (req, res) => {
    const cards = await ScoreCard.find({});
    res.render("tempviews/tempAllCards", {cards});
}));

app.get("/cards/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findById(id);
    res.render("tempViews/tempSingleCard", {card})
}));

app.get("/combos", (req, res) => {
    const allCombos = CardCombos.find({});
    const someCombos = allCombos.slice(50, 76);
    res.render("", {someCombo})
});

app.get("/combos/:id/games/new", (req, res) => {
    const {id} = req.params;
    // const combo = CardCombo.findById(id);
    res.render("tempViews/tempAddNewGame", {id});
});

// app.get("/games/new", (req, res) => {
//     const allCombos = CardCombo.find({});
//     const index = Math.floor(Math.random() * 816);
//     const combo = allCombos[index];
//     res.render("tempViews/tempAddNewGame", {combo});
// });

app.post("combos/:id/games", validateResult, catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const combo = CardCombo.findById(id);
    const gameScore = req.body.score;
    let gameWin = false;
    if (score >= combo.targetScore) {
        gameWin = true;
    }; 
    const newResult = new GameResult({
        cardCombo: combo.id,
        win : win,
        score: gameScore,
        target: combo.target
    });
    await newResult.save();
    if (wins) {
        combo.wins += 1;
    } else {
        combo.losses += 1;
    };
    if (gameScore > combo.highScore) {
        combo.highScore = gameScore;
    } elif (gameScore < combo.lowScore) {
        combo.lowScore = gameScore;
    }
    await combo.save();
    res.redirect("/")
}));

app.get("/cards/:id/edit", catchAsync(async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findById(id);
    res.render("tempViews/tempEditCard", {card})
}));

app.put("/cards/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findByIdAndUpdate(id, req.body.card, {runValidators: true});
    res.redirect(`/cards/${card.id}`);
}));

app.delete("/cards/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    await ScoreCard.findByIdAndDelete(id);
    res.redirect("/")
}));


app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    const { message = "Bad things Happened" } = err;
    res.status(status).render("error", {message});
});





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
