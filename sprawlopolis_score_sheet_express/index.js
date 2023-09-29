const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ScoreCard = require("./models/scoreRecords");
const cards = require("./spralOnly/seedSprawl")

mongoose.connect("mongodb://127.0.0.1:27017/comboRecords", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("db connected");
})

const app = express();


app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
});


// app.get("/newCombo", async (req, res) => {
//     const card = new ScoreCard({
//         name: "card1",
//         number: 1
//     });
//     await card.save();
//     res.send(card);
// });



app.listen(3000, () => {
    console.log("listening...");
})
