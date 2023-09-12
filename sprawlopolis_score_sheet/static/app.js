function Score(scoreOne, scoreTwo, scoreThree) {
    this.residential = {"count": 0, "negative count": "N/A", "total": 0};
    this.commercial = {"count": 0, "negative count": "N/A", "total": 0};
    this.residential = {"count": 0, "negative count": "N/A", "total": 0};
    this.parks = {"count": 0, "negative count": "N/A", "total": 0};
    this.roads = {"count": "N/A", "negative count": 0, "total": 0};
    this.scoreOne = scoreOne;
    this.scoreTwo = scoreTwo;
    this.scoreThree = scoreThree;
}

Score.prototype.target = function() {
//    const { scoreOne, scoreTwo, scoreThree } = this;
    const target = (scoreOne["target"]) + (scoreTwo["target"]) + (scoreThree["target"])
    return target
}

Score.prototype.total = function() {
//    const { scoreOne, scoreTwo, scoreThree } = this;
    properties = Object.keys(this)
    total = 0;
    for (i = 0; i < 7; i++) {
        total += this[properties[i]]["total"];
    }
    return total;
}

Score.prototype.cardScore = function() {
    cards = Object.keys(this).slice(-3);
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        if (this[card]["groups"]) {
            this[card]["total"] = -8 + (this[card]["groups"] * 3);
            if (this[card]["total"] > 7) {
                this[card]["total"] = 7;
            }
        } else if (this[card]["edge-blocks"]) {
            this[card]["total"] = this[card]["edge-blocks"] + this[card]["corner-blocks"];
        } else {
            this[card]["total"] = (this[card]["count"] * this[card]["countMultiplier"]) - (this[card]["negative-count"] * this[card]["negMultiplier"]);
        }
    }
}

function makeCards() {
    let allCards = [
        {"name": "The Outskirts", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 1, "total": 0},
        {"name": "Bloom Boom", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 2, "total": 0},
        {"name": "Go Green", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 3, "target": 3, "total": 0},
        {"name": "Block Party", "img": 0, "groups": 0, "target": 0, "total": -8},
        {"name": "Stacks and Scrapers", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 5, "total": 0},
        {"name": "Master Planned", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 6, "total": 0},
        {"name": "Central Perks", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 2, "target": 7, "total": 0},
        {"name": "The Burbs", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 2, "target": 8, "total": 0},
        {"name": "Concrete Jungle", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 9, "total": 0},
        {"name": "The Strip", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 10, "total": 0},
        {"name": "Mini Marts", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 11, "total": 0},
        {"name": "Superhighway", "img": 0, "count": 0, "countMultiplier": 0.5, "negative-count": "N/A", "negMultiplier": "N/A", "target": 12, "total": 0},
        {"name": "Park Hopping", "img": 0, "count": 0, "countMultiplier": 3, "negative-count": "N/A", "negMultiplier": "N/A", "target": 13, "total": 0},
        {"name": "Looping Lanes", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 14, "total": 0},
        {"name": "Skid Row", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 15, "total": 0},
        {"name": "Morning Commute", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 16, "total": 0},
        {"name": "Tourist Traps", "img": 0, "edge-blocks": 8, "corner-blocks": 2, "target": 17, "total": 0},
        {"name": "Sprawlopolis", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 18, "total": 0},
    ]
    return allCards;
}

function testFunc() {
    allCards = makeCards();
    score1 = new Score(allCards[5], allCards[6], allCards[7]);
    score2 = new Score(allCards[8], allCards[9], allCards[11]);
    score1["scoreOne"]["count"] = 8;
    score1["scoreOne"]["negative-count"] = 2;
    console.log(score1, score2)
    return score1, score2
}

const testBtn = document.querySelector("#testBtn");

testBtn.addEventListener("click", testFunc)

//const scoringCardOne = {"name": "The Outskirts", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 1, "total": 0};
//const scoringCardTwo = {"name": "Bloom Boom", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 2, "total": 0};
//const scoringCardThree = {"name": "Go Green", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 3, "target": 3, "total": 0};
//const scoringCardFour = {"name": "Block Party", "img": 0, "groups": 0, "target": 0, "total": -8};
//const scoringCardFive = {"name": "Stacks and Scrapers", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 5, "total": 0};
//const scoringCardSix = {"name": "Master Planned", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 1, "target": 6, "total": 0};
//const scoringCardSeven = {"name": "Central Perks", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 2, "target": 7, "total": 0};
//const scoringCardEight = {"name": "The Burbs", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": 0, "negMultiplier": 2, "target": 8, "total": 0};
//const scoringCardNine = {"name": "Concrete Jungle", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 9, "total": 0};
//const scoringCardTen = {"name": "The Strip", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 10, "total": 0};
//const scoringCardEleven = {"name": "Mini Marts", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 11, "total": 0};
//const scoringCardTwelve = {"name": "Superhighway", "img": 0, "count": 0, "countMultiplier": 0.5, "negative-count": "N/A", "negMultiplier": "N/A", "target": 12, "total": 0};
//const scoringCardThirteen = {"name": "Park Hopping", "img": 0, "count": 0, "countMultiplier": 3, "negative-count": "N/A", "negMultiplier": "N/A", "target": 13, "total": 0};
//const scoringCardFourteen = {"name": "Looping Lanes", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 14, "total": 0};
//const scoringCardFifteen = {"name": "Skid Row", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 15, "total": 0};
//const scoringCardSixteen = {"name": "Morning Commute", "img": 0, "count": 0, "countMultiplier": 2, "negative-count": "N/A", "negMultiplier": "N/A", "target": 16, "total": 0};
//const scoringCardSeventeen = {"name": "Tourist Traps", "img": 0, "edge-blocks": 8, "corner-blocks": 2, "target": 17, "total": 0};
//const scoringCardEighteen = {"name": "Sprawlopolis", "img": 0, "count": 0, "countMultiplier": 1, "negative-count": "N/A", "negMultiplier": "N/A", "target": 18, "total": 0};

//const allCards = [scoringCardOne, scoringCardTwo, scoringCardThree, scoringCardFour, scoringCardSeventeen]





//-----------------------------------------------------------------
let gameCards = [];

const newGameBtn = document.querySelector("#newGame");
const newGameCardListDiv = document.querySelector("#newGameCardListDiv");
const newGameCardList = document.querySelector("#newGameCardList");
const tableDiv = document.querySelector("#tableDiv");
const scoreDisplay = document.querySelector("#scoreDisplay");
const scoreCardOneHeader = document.querySelector("#scoreCardOneHeader");
const scoreCardOneData = document.querySelector("#scoreCardOneData");
const scoreCardTwoHeader = document.querySelector("#scoreCardTwoHeader");
const scoreCardTwoData = document.querySelector("#scoreCardTwoData");
const scoreCardThreeHeader = document.querySelector("#scoreCardThreeHeader");
const scoreCardThreeData = document.querySelector("#scoreCardThreeData");


newGameBtn.addEventListener("click", function() {
    allCards = makeCards()
    newGameBtn.classList.add("hidden");
    newGameCardList.classList.remove("hidden");
    for (i = 0; i < allCards.length; i++) {
        const newListTag = document.createElement("li");
        const newAnchorTag = document.createElement("a");
        newAnchorTag.innerText = allCards[i]["name"];
        newAnchorTag.href = "#";
        newAnchorTag.classList.add("addToGame");
        const availableCards = document.querySelector(".addToGame");
        newGameCardList.insertAdjacentElement("beforeend", newListTag);
        newListTag.insertAdjacentElement("beforeend", newAnchorTag);
    }
})

newGameCardList.addEventListener("click", function(e) {
    if (e.target.className == "addToGame") {
        newCard = e.target.innerText;
        gameCards.push(newCard);
        e.target.remove();
        if (gameCards.length === 3) {
            newGameCardList.classList.add("hidden");
            createGameSheet(gameCards);
        }
    }
})

function createGameSheet(gameCards) {
    newCards = []
    for (i = 0; i < gameCards.length; i++) {
        for (j = 0; j < allCards.length; j++) {
            if (gameCards[i] === allCards[j]["name"]) {
                newCard = allCards[j];
                newCards.push(newCard);
            }
        }
    }
    const newSheet = new Score(newCards[0], newCards[1], newCards[2])
    gameCards = [];
    createDisplay(newSheet);
}

function createDisplay(sheet) {
    tableDiv.classList.remove("hidden");
    scoreCardOneHeader.innerText = sheet.scoreOne["name"]
    scoreCardTwoHeader.innerText = sheet.scoreTwo["name"]
    scoreCardThreeHeader.innerText = sheet.scoreThree["name"]
    scoreCardOneData.innerText = sheet.scoreOne[""]
}