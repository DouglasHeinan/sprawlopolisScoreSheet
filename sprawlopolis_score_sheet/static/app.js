//function Score(scoreOne, scoreTwo, scoreThree) {
//    this.residential = {"count": 0, "negative count": "N/A", "total": 0};
//    this.commercial = {"count": 0, "negative count": "N/A", "total": 0};
//    this.residential = {"count": 0, "negative count": "N/A", "total": 0};
//    this.parks = {"count": 0, "negative count": "N/A", "total": 0};
//    this.roads = {"count": "N/A", "negative count": 0, "total": 0};
//    this.scoreOne = scoreOne;
//    this.scoreTwo = scoreTwo;
//    this.scoreThree = scoreThree;
//}

//Score.prototype.target = function() {
//    const { scoreOne, scoreTwo, scoreThree } = this;
//    const target = (scoreOne["target"]) + (scoreTwo["target"]) + (scoreThree["target"])
//    return target
//}

//Score.prototype.total = function() {
//    const { scoreOne, scoreTwo, scoreThree } = this;
//    properties = Object.keys(this)
//    total = 0;
//    for (i = 0; i < 7; i++) {
//        total += this[properties[i]]["total"];
//    }
//    return total;
//}

//Score.prototype.cardScore = function() {
//    cards = Object.keys(this).slice(-3);
//    for (i = 0; i < cards.length; i++) {
//        card = cards[i];
//        if (this[card]["groups"]) {
//            this[card]["total"] = -8 + (this[card]["groups"] * 3);
//            if (this[card]["total"] > 7) {
//                this[card]["total"] = 7;
//            }
//        } else if (this[card]["edge-blocks"]) {
//            this[card]["total"] = this[card]["edge-blocks"] + this[card]["corner-blocks"];
//        } else {
//            this[card]["total"] = (this[card]["count"] * this[card]["countMultiplier"]) - (this[card]["negative-count"] * this[card]["negMultiplier"]);
//        }
//    }
//}

//class Color {
//    constructor(r, g, b) {
//        this.r = r;
//        this.g = g;
//        this.b= b;
//    }
//    rgb() {
//        const { r, g, b} = this;
//        return `rgb(${r}, ${g}, ${b})`;
//    }
//}

class Score {
    constructor(scoreOne, scoreTwo, scoreThree) {
        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
        this.commercial = {"count": 0, "negative count": "N/A", "total": 0};
        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
        this.parks = {"count": 0, "negative count": "N/A", "total": 0};
        this.roads = {"count": "N/A", "negative count": 0, "total": 0};
        this.scoreOne = scoreOne;
        this.scoreTwo = scoreTwo;
        this.scoreThree = scoreThree;
    }
    target() {
        const {scoreOne, scoreTwo, scoreThree} = this;
        const target = (scoreOne["target"]) + (scoreTwo["target"]) + (scoreThree["target"])
        return target
    }
    total() {
        const properties = Object.keys(this);
        let total = 0;
        for (let i = 0; i < 7; i++) {
            total += this[properties[i]]["total"];
        }
        return total;
    }
    cardScore() {
        const {scoreOne, scoreTwo, scoreThree} = this;
        const cards = [scoreOne, scoreTwo, scoreThree];
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            if (card["groups"]) {
                card["total"] = -8 + (card["groups"] * 3);
                if (card["total"] > 7) {
                    card["total"] = 7;
                }
            } else if (card["edge-blocks"]) {
                card["total"] = card["edge-blocks"] + card["corner-blocks"];
            } else {
                card["total"] = (card["count"] * card["countMultiplier"]) - (card["negative-count"] * card["negMultiplier"]);
            }
        }
    }
}


//-----------------------------------------------------------------
const allCards = [
    {"name": "The Outskirts", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "total": 0},
    {"name": "Bloom Boom", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "total": 0},
    {"name": "Go Green", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Inudstrial Blocks", "target": 3, "total": 0},
    {"name": "Block Party", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "total": -8},
    {"name": "Stacks and Scrapers", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "total": 0},
    {"name": "Master Planned", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "total": 0},
    {"name": "Central Perks", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "total": 0},
    {"name": "The Burbs", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "total": 0},
    {"name": "Concrete Jungle", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "total": 0},
    {"name": "The Strip", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "total": 0},
    {"name": "Mini Marts", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "total": 0},
    {"name": "Superhighway", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "total": 0},
    {"name": "Park Hopping", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "total": 0},
    {"name": "Looping Lanes", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "total": 0},
    {"name": "Skid Row", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "total": 0},
    {"name": "Morning Commute", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "total": 0},
    {"name": "Tourist Traps", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "total": 0},
    {"name": "Sprawlopolis", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "total": 0}
]

let gameCards = [];
let score1
let score2

const testBtn = document.querySelector("#testBtn");
const newGameBtn = document.querySelector("#newGame");
const newGameCardListDiv = document.querySelector("#newGameCardListDiv");
const newGameCardList = document.querySelector("#newGameCardList");
const tableDiv = document.querySelector("#tableDiv");
const scoreDisplay = document.querySelector("#scoreDisplay");
const scoreCardOneHeader = document.querySelector("#scoreCardOneHeader");
const scoreCardOneFirstCat = document.querySelector("#scoreCardOneFirstCat");
const scoreCardOneSecondCat = document.querySelector("#scoreCardOneSecondCat");
const scoreCardTwoSecondCat = document.querySelector("#scoreCardTwoSecondCat");
const scoreCardThreeSecondCat = document.querySelector("#scoreCardThreeSecondCat");
const scoreCardOneDataOne = document.querySelector("#scoreCardOneDataOne");
const scoreCardOneDataTwo = document.querySelector("#scoreCardOneDataTwo");
const scoreCardTwoHeader = document.querySelector("#scoreCardTwoHeader");
const scoreCardTwoFirstCat = document.querySelector("#scoreCardTwoFirstCat");
const scoreCardTwoDataOne = document.querySelector("#scoreCardTwoDataOne");
const scoreCardTwoDataTwo = document.querySelector("#scoreCardTwoDataTwo");
const scoreCardThreeHeader = document.querySelector("#scoreCardThreeHeader");
const scoreCardThreeFirstCat = document.querySelector("#scoreCardThreeFirstCat");
const scoreCardThreeDataOne = document.querySelector("#scoreCardThreeDataOne");
const scoreCardThreeDataTwo = document.querySelector("#scoreCardThreeDataTwo");


newGameBtn.addEventListener("click", function() {
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
    for (let i = 0; i < gameCards.length; i++) {
        for (let j = 0; j < allCards.length; j++) {
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
    scoreCardOneFirstCat.innerText = sheet.scoreOne["colOneName"]
    scoreCardTwoFirstCat.innerText = sheet.scoreTwo["colOneName"]
    scoreCardThreeFirstCat.innerText = sheet.scoreThree["colOneName"]
    scoreCardOneDataOne.innerText = sheet.scoreOne["colOne"]
    scoreCardTwoDataOne.innerText = sheet.scoreTwo["colOne"]
    scoreCardThreeDataOne.innerText = sheet.scoreThree["colOne"]
    scores = [sheet.scoreOne, sheet.scoreTwo, sheet.scoreThree]
    headerCells = [scoreCardOneSecondCat, scoreCardTwoSecondCat, scoreCardThreeSecondCat]
    dataCells = [scoreCardOneDataTwo, scoreCardTwoDataTwo, scoreCardThreeDataTwo]
    makeSecondCol(scores, headerCells, dataCells)
}


function makeSecondCol(scores, headerCells, dataCells) {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i]["colTwoName"] === null) {
            headerCells[i].classList.add("hidden");
            dataCells[i].classList.add("hidden");
        } else {
            headerCells[i].innerText = scores[i]["colTwoName"];
            dataCells[i].innerText = scores[i]["colTwo"];
        }
    }
}

//------------------------------TEST---------------------------------------
testBtn.addEventListener("click", function() {
    score1 = new Score(allCards[5], allCards[6], allCards[7]);
    score2 = new Score(allCards[8], allCards[9], allCards[11]);
    score1["scoreOne"]["count"] = 8;
    score1["scoreOne"]["negative-count"] = 2;
    console.log(score1, score2)
    return score1, score2
})