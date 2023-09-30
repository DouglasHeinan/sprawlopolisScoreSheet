const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ScoreCard = require("./models/scoringCards");
const Score = require("./models/tempModels/tempScores")

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


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    let cards = null
    res.render("home", {cards});
});

app.get("/cards", async (req, res) => {
    const cards = await ScoreCard.find({});
    res.render("tempviews/tempAllCards", {cards});
});

app.get("/cards/:id", async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findById(id);
    res.render("tempViews/tempSingleCard", {card})
});

app.get("/games/new", (req, res) => {
    res.render("tempViews/tempAddNewGame");
});

app.post("/games/new", async (req, res) => {
    const score = new Score(req.body);
    await score.save();
    res.redirect("/")
});

app.get("/cards/:id/edit", async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findById(id);
    res.render("tempViews/tempEditCard", {card})
});

app.put("/cards/:id", async (req, res) => {
    console.log(req.body)
    const {id} = req.params;
    const card = await ScoreCard.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/cards/${card.id}`);
});

app.delete("/cards/:id", async (req, res) => {
    const {id} = req.params;
    await ScoreCard.findByIdAndDelete(id);
    res.redirect("/")
})




app.listen(3000, () => {
    console.log("listening...");
})
