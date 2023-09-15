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
//        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
//        this.commercial = {"count": 0, "negative count": "N/A", "total": 0};
//        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
//        this.parks = {"count": 0, "negative count": "N/A", "total": 0};
//        this.roads = {"count": "N/A", "negative count": 0, "total": 0};
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
            if (card["colTwo"]) {
                card["total"] += Math.floor((card["colOne"] * card["colOneMulti"]) + (card["colTwo"] * card["colTwoMulti"]));
            } else {
                card["total"] += Math.floor(card["colOne"] * card["colOneMulti"]);
            }
            if (card["total"] > card["max-score"]) {
                card["total"] = card["max-score"];
            }
            if (card["total"] < card["min-score"]) {
                card["total"] = card["min-score"];
            }
            console.log(card["total"])
        }
    }

}


class SprawlScore extends Score {
    constructor(scoreOne, scoreTwo, scoreThree) {
        super(scoreOne, scoreTwo, scoreThree)
        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
        this.commercial = {"count": 0, "negative count": "N/A", "total": 0};
        this.residential = {"count": 0, "negative count": "N/A", "total": 0};
        this.parks = {"count": 0, "negative count": "N/A", "total": 0};
        this.roads = {"count": "N/A", "negative count": 0, "total": 0};
    }
}

class AgScore extends Score {
    constructor(scoreOne, scoreTwo, scoreThree) {
        super(scoreOne, scoreTwo, scoreThree)
        this.cornfield = {"count": 0, "negative count": "N/A", "total": 0};
        this.orchard = {"count": 0, "negative count": "N/A", "total": 0};
        this.livestock = {"count": 0, "negative count": "N/A", "total": 0};
        this.vineyard = {"count": 0, "negative count": "N/A", "total": 0};
        this.roads = {"count": "N/A", "negative count": 0, "total": 0};
    }
}


//-----------------------------------------------------------------
const allSprawlCards = [
    {"name": "The Outskirts", "description": "1 point per road that DOES NOT end at the edge of the city; -1 point per road that ends at the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "Bloom Boom", "description": "1 point/each row and column with exactly three Park blocks in it; -1 point for each row and column with exactly 0 Park blocks in it.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "Go Green", "description": "1 point per Park block in your city; -3 points per Industrail block in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Inudstrial Blocks", "target": 3, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "Block Party", "description": "Score points per group of 4 'corner-tocorner' blocks of the same type. You may score multiple groups of the same type and a block may apply to more than one group.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -8, "max-score": 7, "total": -8},
    {"name": "Stacks and Scrapers", "description": "2 points per Industrial block adjacent to only Commercial or Industrial blocks", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 98, "total": 0},
    {"name": "Master Planned", "description": "Subtract the number of blocks in your largest Industrial group from the number of blocks in your largest Residential group. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "Central Perks", "description": "1 point per Park block located on the interior of the city; -2 points per Park block on the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "The Burbs", "description": "1 point per Park block adjacent to your largest group of Residential blocks; -2 points per Industrial block adjacent to your largest group of Residential blocks.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "min-score": -99, "max-score": 99, "total": 0},
    {"name": "Concrete Jungle", "description": "1 point per Industrial block that shares a corner with at least 1 other Industrial block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "The Strip", "description": "1 point per Commercial block in any 1 row or column of your choice. You may only score for 1 row or column.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "Mini Marts", "description": "2 points per Commercial block directly between two Residential blocks with the same road connecting all three blocks. Blocks may be a straight line or in a 'stepped' pattern.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 98, "total": 0},
    {"name": "Superhighway", "description": "1 point per every 2 Road sections (rounded down) that are part of your longest road.", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "Park Hopping", "description": "3 points per Road that begins at one Park and ends at different Park.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "Looping Lanes", "description": "1 point per Road section in a completed loop. You may acore multiple loops in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "Skid Row", "description": "2 points per Residential block adjacent to 2 or more Industrial blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "min-score": 0, "max-score": 98, "total": 0},
    {"name": "Morning Commute", "description": "2 points per Road that passes through both a Resdential block and a Commercial block.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 98, "total": 0},
    {"name": "Tourist Traps", "description": "1 point per Commercial block on the edge of the city; Additional 1 point per Commercial block on a corner edge.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "min-score": 0, "max-score": 99, "total": 0},
    {"name": "Sprawlopolis", "description": "Add the number of blocks in your longest column (skipping any gaps); Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "min-score": 0, "max-score": 99, "total": 0}
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
const subTotalHeaders = document.querySelectorAll(".subTotalHeader");

const scoreCardOneHeader = document.querySelector("#scoreCardOneHeader");
const scoreCardOneFirstCat = document.querySelector("#scoreCardOneFirstCat");
const scoreCardOneSecondCat = document.querySelector("#scoreCardOneSecondCat");
const scoreCardOneDataOne = document.querySelector("#scoreCardOneDataOne");
const scoreCardOneDataTwo = document.querySelector("#scoreCardOneDataTwo");

const scoreCardTwoHeader = document.querySelector("#scoreCardTwoHeader");
const scoreCardTwoFirstCat = document.querySelector("#scoreCardTwoFirstCat");
const scoreCardTwoSecondCat = document.querySelector("#scoreCardTwoSecondCat");
const scoreCardTwoDataOne = document.querySelector("#scoreCardTwoDataOne");
const scoreCardTwoDataTwo = document.querySelector("#scoreCardTwoDataTwo");

const scoreCardThreeHeader = document.querySelector("#scoreCardThreeHeader");
const scoreCardThreeFirstCat = document.querySelector("#scoreCardThreeFirstCat");
const scoreCardThreeSecondCat = document.querySelector("#scoreCardThreeSecondCat");
const scoreCardThreeDataOne = document.querySelector("#scoreCardThreeDataOne");
const scoreCardThreeDataTwo = document.querySelector("#scoreCardThreeDataTwo");


newGameBtn.addEventListener("click", function() {
    newGameBtn.classList.add("hidden");
    newGameCardList.classList.remove("hidden");
    for (i = 0; i < allSprawlCards.length; i++) {
        const newListTag = document.createElement("li");
        const newAnchorTag = document.createElement("a");
        newAnchorTag.innerText = allSprawlCards[i]["name"];
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
        for (let j = 0; j < allSprawlCards.length; j++) {
            if (gameCards[i] === allSprawlCards[j]["name"]) {
                newCard = allSprawlCards[j];
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
//    makeTotalCol();
}


function makeSecondCol(scores, headerCells, dataCells) {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i]["colTwoName"] === null) {
            headerCells[i].classList.add("noBorder");
            dataCells[i].parentNode.classList.add("noBorder");
        } else {
            headerCells[i].innerText = scores[i]["colTwoName"];
            dataCells[i].innerText = scores[i]["colTwo"];
        }
    }
}

function makeTotalCol() {
//    for (let i = 0; i < subTotalHeaders.length; i++) {
//        subTotalHeaders[i]. inner
//    }
}

//------------------------------TEST---------------------------------------
testBtn.addEventListener("click", function() {
    score1 = new SprawlScore(allSprawlCards[1], allSprawlCards[2], allSprawlCards[11]);
    score2 = new SprawlScore(allSprawlCards[16], allSprawlCards[3], allSprawlCards[7]);
    score1["scoreOne"]["colOne"] = 8;
    score1["scoreOne"]["colTwo"] = 2;
    score1["scoreTwo"]["colOne"] = 7;
    score1["scoreTwo"]["colTwo"] = 1;
    score1["scoreThree"]["colOne"] = 11;
    score2["scoreOne"]["colOne"] = 8;
    score2["scoreOne"]["colTwo"] = 6;
    score2["scoreTwo"]["colOne"] = 12;
    score2["scoreThree"]["colOne"] = 6;
    score2["scoreThree"]["colTwo"] = 3;
    console.log(score1, score2)
    return score1, score2
})