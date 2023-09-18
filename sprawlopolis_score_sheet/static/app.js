class ScoreSheet {
    constructor(scoreCards, deck) {
        this.scoreOne = scoreCards[0];
        this.scoreTwo = scoreCards[1];
        this.scoreThree = scoreCards[2];
        this.blockOne = deck['blocks'][0];
        this.blockTwo = deck['blocks'][1];
        this.blockThree = deck['blocks'][2];
        this.blockFour = deck['blocks'][3];
        this.blockFive = deck['blocks'][4];
    }

    create() {
        const {scoreCards, deck} = this;
        length = scoreCards.length
        for (let i = 0; i < length; i++) {
            card = scoreCards[i];
            cardElements = this.getCardElements(i)
            this.createScoreCardRow(cardElements, card);
            this.createTargets(cardElements);
        }
        this.createScoreBlockRows()
        this.calcScore()
    }

    getCardElements(elementIndex) {
        allCardElements = [];
        scoreCardHeader = document.querySelectorAll(".scoreCardHeaders");
        scoreCardFirstCat = document.querySelectorAll(".scoreCardFirstCats");
        scoreCardSecondCat = document.querySelectorAll(".scoreCardSecondCats");
        scoreCardDataOne = document.querySelectorAll(".scoreCardDataOne");
        scoreCardDataTwo = document.querySelectorAll(".scoreCardDataTwo");
        scoreCardTotal = document.querySelectorAll(".scoreCardTotal")
        allCardElements.push (
        scoreCardHeader[elementIndex],
        scoreCardFirstCat[elementIndex],
        scoreCardSecondCat[elementIndex],
        scoreCardDataOne[elementIndex],
        scoreCardDataTwo[elementIndex],
        scoreCardTotal[elementIndex]
        )
        return allCardElements
    }
    createScoreCardRow(cardElements) {

    }
}


//    tableDiv.classList.remove("hidden");
//    scoreCardOneHeader.innerText = sheet.scoreOne["name"]
//    scoreCardTwoHeader.innerText = sheet.scoreTwo["name"]
//    scoreCardThreeHeader.innerText = sheet.scoreThree["name"]
//    scoreCardOneFirstCat.innerText = sheet.scoreOne["colOneName"]
//    scoreCardTwoFirstCat.innerText = sheet.scoreTwo["colOneName"]
//    scoreCardThreeFirstCat.innerText = sheet.scoreThree["colOneName"]
//    scoreCardOneDataOne.innerText = sheet.scoreOne["colOne"]
//    scoreCardTwoDataOne.innerText = sheet.scoreTwo["colOne"]
//    scoreCardThreeDataOne.innerText = sheet.scoreThree["colOne"]
//    scoreCardOneHeader.title = sheet.scoreOne["description"];
//    scoreCardTwoHeader.title = sheet.scoreTwo["description"];
//    scoreCardThreeHeader.title = sheet.scoreThree["description"];
//    scores = [sheet.scoreOne, sheet.scoreTwo, sheet.scoreThree]
//    headerCells = [scoreCardOneSecondCat, scoreCardTwoSecondCat, scoreCardThreeSecondCat]
//    dataCells = [scoreCardOneDataTwo, scoreCardTwoDataTwo, scoreCardThreeDataTwo]
//    makeSecondCol(scores, headerCells, dataCells)
//}

//    target() {
//        const {scoreOne, scoreTwo, scoreThree} = this;
//        const target = (scoreOne["target"]) + (scoreTwo["target"]) + (scoreThree["target"])
//        return target
//    }
//    total() {
//        const properties = Object.keys(this);
//        console.log(properties)
//        let total = 0;
//        for (let i = 0; i < properties.length; i++) {
//            total += this[properties[i]]["total"];
//        }
//        return total;
//    }
//
//    cardScore() {
//        const {scoreOne, scoreTwo, scoreThree} = this;
//        const cards = [scoreOne, scoreTwo, scoreThree];
//        for (let i = 0; i < cards.length; i++) {
//            const card = cards[i];
//            if (card["colTwo"]) {
//                card["total"] = Math.floor((card["colOne"] * card["colOneMulti"]) + (card["colTwo"] * card["colTwoMulti"]) + card["totalMod"]);
//            } else {
//                card["total"] = Math.floor((card["colOne"] * card["colOneMulti"]) + card["totalMod"]);
//            }
//            if (card["total"] > card["max-score"]) {
//                card["total"] = card["max-score"];
//            }
//            if (card["total"] < card["min-score"]) {
//                card["total"] = card["min-score"];
//            }
//        }
//    }
//
//}
//
//

class Deck {
    constructor(game) {
        this.name = game['name'];
        this.blocks = game['blocks']
        this.scoringCards = game['scoringCards']
    }
    selectScoreCards() {
        const {scoringCards} = this;

    }
}

//const d = new Deck(sprawlopolis)

//function createGameSheet(gameCards) {
//    newCards = []
//    for (let i = 0; i < gameCards.length; i++) {
//        for (let j = 0; j < allSprawlCards.length; j++) {
//            if (gameCards[i] === allSprawlCards[j]["name"]) {
//                newCard = allSprawlCards[j];
//                newCards.push(newCard);
//            }
//        }
//    }
//    newSheet = new SprawlScore(newCards[0], newCards[1], newCards[2])
//    gameCards = [];
//    makeBlocks()
//    createDisplay(newSheet);
//}

//newGameCardList.addEventListener("click", function(e) {
//    if (e.target.className == "addToGame") {
//        newCard = e.target.innerText;
//        gameCards.push(newCard);
//        e.target.remove();
//        if (gameCards.length === 3) {
//            newGameCardList.classList.add("hidden");
//            createGameSheet(gameCards);
//        }
//    }
//})


const sprawlopolis = {
    'name': "Sprawlopolis",
    'blocks': [
        {"name": "residential", "modifier": 1},
        {"name": "commercial", "modifier": 1},
        {"name": "industrial", "modifier": 1},
        {"name": "parks", "modifier": 1},
        {"name": "roads", "modifier": -1}
    ],
    'scoringCards': [
        {"name": "The Outskirts", "description": "1 point per road that DOES NOT end at the edge of the city; -1 point per road that ends at the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Bloom Boom", "description": "1 point/each row and column with exactly three Park blocks in it; -1 point for each row and column with exactly 0 Park blocks in it.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Go Green", "description": "1 point per Park block in your city; -3 points per Industrail block in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Inudstrial Blocks", "target": 3, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Block Party", "description": "Score points per group of 4 'corner-tocorner' blocks of the same type. You may score multiple groups of the same type and a block may apply to more than one group.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -8, "max-score": 7, "totalMod": -8, "total": -8},
        {"name": "Stacks and Scrapers", "description": "2 points per Industrial block adjacent to only Commercial or Industrial blocks", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 98, "totalMod": 0, "total": 0},
        {"name": "Master Planned", "description": "Subtract the number of blocks in your largest Industrial group from the number of blocks in your largest Residential group. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Central Perks", "description": "1 point per Park block located on the interior of the city; -2 points per Park block on the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "The Burbs", "description": "1 point per Park block adjacent to your largest group of Residential blocks; -2 points per Industrial block adjacent to your largest group of Residential blocks.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "min-score": -99, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Concrete Jungle", "description": "1 point per Industrial block that shares a corner with at least 1 other Industrial block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "The Strip", "description": "1 point per Commercial block in any 1 row or column of your choice. You may only score for 1 row or column.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Mini Marts", "description": "2 points per Commercial block directly between two Residential blocks with the same road connecting all three blocks. Blocks may be a straight line or in a 'stepped' pattern.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 98, "totalMod": 0, "total": 0},
        {"name": "Superhighway", "description": "1 point per every 2 Road sections (rounded down) that are part of your longest road.", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Park Hopping", "description": "3 points per Road that begins at one Park and ends at different Park.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Looping Lanes", "description": "1 point per Road section in a completed loop. You may acore multiple loops in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Skid Row", "description": "2 points per Residential block adjacent to 2 or more Industrial blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "min-score": 0, "max-score": 98, "totalMod": 0, "total": 0},
        {"name": "Morning Commute", "description": "2 points per Road that passes through both a Resdential block and a Commercial block.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 98, "totalMod": 0, "total": 0},
        {"name": "Tourist Traps", "description": "1 point per Commercial block on the edge of the city; Additional 1 point per Commercial block on a corner edge.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0},
        {"name": "Sprawlopolis", "description": "Add the number of blocks in your longest column (skipping any gaps); Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "min-score": 0, "max-score": 99, "totalMod": 0, "total": 0}
    ]
}

//-----------------------------------------------------------------

//let gameCards = [];
//let score1
//let score2
//let newSheet
//let blocks
//
//const testBtn = document.querySelector("#testBtn");
//const newGameBtn = document.querySelector("#newGame");
//const newGameCardListDiv = document.querySelector("#newGameCardListDiv");
//const newGameCardList = document.querySelector("#newGameCardList");
//const tableDiv = document.querySelector("#tableDiv");
//const scoreDisplay = document.querySelector("#scoreDisplay");
//const cardTargets = document.querySelectorAll(".cardTarget");
//const blockScores = document.querySelectorAll(".blockScore");
//const blockScoreChanges = document.querySelectorAll(".blockScoreChange");
//const blocksRoadsSubtotal = document.querySelector("#blocksRoadsSubtotal");
//const cardScoreChanges = document.querySelectorAll(".cardScoreChange");
//const scoreCardTotals = document.querySelectorAll(".scoreCardTotal");
//const scoreColOne = document.querySelectorAll(".scoreColOne");
//const scoreColTwo = document.querySelectorAll(".scoreColTwo");
//const scoringCardSubTotal = document.querySelector("#scoringCardSubtotal");
//const totalScore = document.querySelector("#totalScore");
//const totalTarget = document.querySelector("#totalTarget");
//
//const scoreCardOneHeader = document.querySelector("#scoreCardOneHeader");
//const scoreCardOneFirstCat = document.querySelector("#scoreCardOneFirstCat");
//const scoreCardOneSecondCat = document.querySelector("#scoreCardOneSecondCat");
//const scoreCardOneDataOne = document.querySelector("#scoreCardOneDataOne");
//const scoreCardOneDataTwo = document.querySelector("#scoreCardOneDataTwo");
//const scoreCardOneTotal = document.querySelector("#scoreCardOneTotal");
//
//const scoreCardTwoHeader = document.querySelector("#scoreCardTwoHeader");
//const scoreCardTwoFirstCat = document.querySelector("#scoreCardTwoFirstCat");
//const scoreCardTwoSecondCat = document.querySelector("#scoreCardTwoSecondCat");
//const scoreCardTwoDataOne = document.querySelector("#scoreCardTwoDataOne");
//const scoreCardTwoDataTwo = document.querySelector("#scoreCardTwoDataTwo");
//const scoreCardTwoTotal = document.querySelector("#scoreCardTwoTotal");
//
//const scoreCardThreeHeader = document.querySelector("#scoreCardThreeHeader");
//const scoreCardThreeFirstCat = document.querySelector("#scoreCardThreeFirstCat");
//const scoreCardThreeSecondCat = document.querySelector("#scoreCardThreeSecondCat");
//const scoreCardThreeDataOne = document.querySelector("#scoreCardThreeDataOne");
//const scoreCardThreeDataTwo = document.querySelector("#scoreCardThreeDataTwo");
//const scoreCardThreeTotal = document.querySelector("#scoreCardThreeTotal");
//
//
//newGameBtn.addEventListener("click", function() {
//    newGameBtn.classList.add("hidden");
//    newGameCardList.classList.remove("hidden");
//    for (i = 0; i < allSprawlCards.length; i++) {
//        const newListTag = document.createElement("li");
//        const newAnchorTag = document.createElement("a");
//        newAnchorTag.innerText = allSprawlCards[i]["name"];
//        newAnchorTag.href = "#";
//        newAnchorTag.classList.add("addToGame");
//        const availableCards = document.querySelector(".addToGame");
//        newGameCardList.insertAdjacentElement("beforeend", newListTag);
//        newListTag.insertAdjacentElement("beforeend", newAnchorTag);
//    }
//})
//
//newGameCardList.addEventListener("click", function(e) {
//    if (e.target.className == "addToGame") {
//        newCard = e.target.innerText;
//        gameCards.push(newCard);
//        e.target.remove();
//        if (gameCards.length === 3) {
//            newGameCardList.classList.add("hidden");
//            createGameSheet(gameCards);
//        }
//    }
//})
//
//for (let i = 0; i < blockScoreChanges.length; i++) {
//    blockScoreChanges[i].addEventListener("input", function() {
//        calcBlocks()
//        calcTotal()
//    })
//}
//
//for (let i = 0; i < cardScoreChanges.length; i++) {
//    cardScoreChanges[i].addEventListener("input", function() {
//        calcScoreCards()
//        calcTotal()
//    })
//}
//
//function createGameSheet(gameCards) {
//    newCards = []
//    for (let i = 0; i < gameCards.length; i++) {
//        for (let j = 0; j < allSprawlCards.length; j++) {
//            if (gameCards[i] === allSprawlCards[j]["name"]) {
//                newCard = allSprawlCards[j];
//                newCards.push(newCard);
//            }
//        }
//    }
//    newSheet = new SprawlScore(newCards[0], newCards[1], newCards[2])
//    gameCards = [];
//    makeBlocks()
//    createDisplay(newSheet);
//}
//
//function createDisplay(sheet) {
//    tableDiv.classList.remove("hidden");
//    scoreCardOneHeader.innerText = sheet.scoreOne["name"]
//    scoreCardTwoHeader.innerText = sheet.scoreTwo["name"]
//    scoreCardThreeHeader.innerText = sheet.scoreThree["name"]
//    scoreCardOneFirstCat.innerText = sheet.scoreOne["colOneName"]
//    scoreCardTwoFirstCat.innerText = sheet.scoreTwo["colOneName"]
//    scoreCardThreeFirstCat.innerText = sheet.scoreThree["colOneName"]
//    scoreCardOneDataOne.innerText = sheet.scoreOne["colOne"]
//    scoreCardTwoDataOne.innerText = sheet.scoreTwo["colOne"]
//    scoreCardThreeDataOne.innerText = sheet.scoreThree["colOne"]
//    scoreCardOneHeader.title = sheet.scoreOne["description"];
//    scoreCardTwoHeader.title = sheet.scoreTwo["description"];
//    scoreCardThreeHeader.title = sheet.scoreThree["description"];
//    scores = [sheet.scoreOne, sheet.scoreTwo, sheet.scoreThree]
//    headerCells = [scoreCardOneSecondCat, scoreCardTwoSecondCat, scoreCardThreeSecondCat]
//    dataCells = [scoreCardOneDataTwo, scoreCardTwoDataTwo, scoreCardThreeDataTwo]
//    makeSecondCol(scores, headerCells, dataCells)
//    makeBlocks()
//    makeTargets()
//    calcBlocks();
//    calcScoreCards();
//    calcTotal()
//}
//
//function makeBlocks() {
//    allKeys = Object.keys(newSheet);
//    blocks = allKeys.slice(3)
//    for (let i = 0; i < blockScores.length; i++) {
//        blockScores[i].innerText = newSheet[blocks[i]]["name"]
//    }
//}
//
//
//function makeSecondCol(scores, headerCells, dataCells) {
//    for (let i = 0; i < scores.length; i++) {
//        if (scores[i]["colTwoName"] === null) {
//            headerCells[i].classList.add("noBorder");
//            dataCells[i].parentNode.classList.add("noBorder");
//        } else {
//            headerCells[i].innerText = scores[i]["colTwoName"];
//            dataCells[i].innerText = scores[i]["colTwo"];
//        }
//    }
//}
//
//function makeTargets() {
//    cards = [newSheet["scoreOne"], newSheet["scoreTwo"], newSheet["scoreThree"]]
//    for (let i = 0; i < cardTargets.length; i++) {
//        cardTargets[i].innerText = "Target: " + cards[i]["target"]
//    }
//    totalTarget.innerText = newSheet.target()
//}
//
//function calcBlocks() {
//    let subtotal = 0;
//    for (let i = 0; i < blockScoreChanges.length; i++) {
//        scoreDiv = blockScoreChanges[i];
//        score = parseInt(scoreDiv.innerText);
//        if (!score) {
//            score = 0;
//        }
//        subtotal += score;
//    }
//    blocksRoadsSubtotal.innerText = subtotal;
//}
//
//function calcScoreCards() {
//    scoringCardSub = 0
//    cards = [newSheet["scoreOne"], newSheet["scoreTwo"], newSheet["scoreThree"]]
//    totalDisplays = [scoreCardOneTotal, scoreCardTwoTotal, scoreCardThreeTotal];
//    for (let i = 0; i < cards.length; i++) {
//        card = cards[i];
//        card["colOne"] = scoreColOne[i].innerText;
//        if (card["colTwo"] != null) {
//            card["colTwo"] = scoreColTwo[i].innerText;
//        }
//    }
//    newSheet.cardScore()
//    for (let i = 0; i < totalDisplays.length; i++) {
//        totalDisplays[i].innerText = cards[i]["total"];
//        scoringCardSub += cards[i]["total"];
//    }
//    scoringCardSubtotal.innerText = scoringCardSub
//}
//
//function calcTotal() {
//    total = parseInt(scoringCardSubtotal.innerText) + parseInt(blocksRoadsSubtotal.innerText)
//    totalScore.innerText = total;
//}
//
////------------------------------TEST---------------------------------------
//testBtn.addEventListener("click", function() {
//    score1 = new SprawlScore(allSprawlCards[1], allSprawlCards[2], allSprawlCards[11]);
//    score2 = new SprawlScore(allSprawlCards[16], allSprawlCards[3], allSprawlCards[7]);
//    score1["scoreOne"]["colOne"] = 8;
//    score1["scoreOne"]["colTwo"] = 2;
//    score1["scoreTwo"]["colOne"] = 7;
//    score1["scoreTwo"]["colTwo"] = 1;
//    score1["scoreThree"]["colOne"] = 11;
//    score2["scoreOne"]["colOne"] = 8;
//    score2["scoreOne"]["colTwo"] = 6;
//    score2["scoreTwo"]["colOne"] = 12;
//    score2["scoreThree"]["colOne"] = 6;
//    score2["scoreThree"]["colTwo"] = 3;
//    console.log(score1, score2)
//    return score1, score2
//})

//
