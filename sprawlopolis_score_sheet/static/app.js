class ScoreSheet {
    constructor(scoreCards, blocks, sheetElements) {
        this.scoreCards = scoreCards;
        this.blocks = blocks
        this.sheetElements = sheetElements;
    }

    createSheet() {
        const {scoreCards, sheetElements} = this;
        length = scoreCards.length;
        for (let i = 0; i < length; i++) {
            card = scoreCards[i];
            this.createScoreCardRow(i);
        }
        this.createScoreBlockRows()
        sheetElements['totalTarget'].innerText = scoreCards[3]['target'];
    }

    createScoreCardRow(i) {
        const {scoreCards, sheetElements} = this;
        card = scoreCards[i];
        sheetElements['headers'][i].innerText = card["name"];
        sheetElements['headers'][i].title = card["description"];
        sheetElements['colOneNames'][i].innerText = card["colOneName"];
        sheetElements['colOneData'][i].innerText = card["colOne"];
        sheetElements['totals'][i].innerText = card["total"];
        sheetElements['cardtargets'][i].innerText = card["target"];
        if (card['colTwo']) {
            sheetElements['colTwoNames'][i].innerText = card["colTwoName"];
            sheetElements['colTwoData'][i].innerText = card["colTwo"];
        }
    }

    createScoreBlockRows() {
        const {blocks, sheetElements} = this
        blockNames = sheetElements['blockNames'];
        length = blockNames.length;
        for (let i = 0; i < length; i++) {
            blockNames[i].innerText = blocks[i]["name"];
        }
    }

    calcBlockScores() {
        const {blocks, sheetElements} = this;
        scores = sheetElements["blockScores"];
        length = blockScores.length;
        total = 0;
        for (let i = 0; i < length; i++) {
            toAdd = scores[i].innerText;
            total += parseInt(toAdd);
        }
        sheetElements['blockTotal'].innerText = total;
    }

    calcScoreCards() {
        const {scoreCards, sheetElements} = this;
        let total
        const length = scoreCards.length;
        for (let i = 0; i < length; i++) {
            let cardTotal
            const colOne = sheetElements["colOneData"][i].innerText;
            const colOneScore = parseInt(colOne) + scoreCards[i]["colOneMulti"];
            cardTotal += colOneScore;
            if (sheetElements['colTwo'] != null) {
                colTwo = sheetElements["colTwoData"][i].innerText;
                colTwoScore = parseInt(colTwo) + scoreCards[i]['colTwoMulti'];
                cardTotal += colTwoScore;
            }
            sheetElements["scoreCardTotals"][i].innerText = cardTotal;
            total += cardTotal;
        }
        sheetElements["scoreCardSubtotal"].innerText = total;
    }

    calcTotalScore() {
        const {sheetElements} = this;
        blocksSubtotal = sheetElements["blockTotal"].innerText;
        scoreCardSubTotal = sheetElements["scoreCardSubtotal"].innerText;
        total = parseInt(blocksSubtotal) + parseInt(scoreCardSubtotal);
        sheetElements["gameTotal"].innerText = total;
    }
}


class Deck {
    constructor(game, deckElements) {
        this.name = game['name'];
        this.blocks = game['blocks'];
        this.scoringCards = game['scoringCards'];
        this.deckElements = deckElements;
    }

    createScoreCardList() {
        const {scoringCards, deckElements} = this;
        deckElements["newGameCardList"].classList.remove("hidden");
        length = scoringCards.length;
        for (let i = 0; i < length; i++) {
            const newListTag = document.createElement("li");
            const newAnchorTag = document.createElement("a");
            newAnchorTag.innerText = scoringCards[i]["name"];
            newAnchorTag.href = "#";
            newAnchorTag.classList.add("addToGame");
            deckElements["newGameCardList"].insertAdjacentElement("beforeend", newListTag);
            newListTag.insertAdjacentElement("beforeend", newAnchorTag);
        };
    };


//    selectScoreCards() {
//        const {scoringCards} = this;
//        const cardNames = [];
//        const gameCards = [];
//        length = scoringCards.length
//        deckElements['newGameCardList'].addEventListener("click", function(e) {
//            if (e.target.className == "addToGame") {
//                const newCard = e.target.innerText;
//                cardNames.push(newCard);
//                e.target.remove();
//                if (cardNames.length === 3) {
//                    newGameCardList.classList.add("hidden");
//                    for (let i = 0; i < gameCards.length; i++) {
//                        for (let j = 0; j < length; j++) {
//                            if (gameCards[i] === scoringCards[j]["name"]) {
//                                const card = scoringCards[j];
//                                gameCards.push(newCard);
//                            }
//                        }
//                    }
//                    return gameCards
//                };
//            };
//        });
//    };

    selectScoreCard(e) {
        const {scoringCards} = this;
        length = scoringCards.length
//        deckElements['newGameCardList'].addEventListener("click", function(e) {
        if (e.target.className == "addToGame") {
            const cardName = e.target.innerText;
            e.target.remove();
            for (let i = 0; i < length; i++) {
                if (cardName === scoringCards[i]["name"]) {
                    const newCard = scoringCards[i];
                }
            }
            return newCard;
        };
//        });
    };

};








window.onload = function wrapper() {

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

    let games = [sprawlopolis];
    chooseGame(games);

    function chooseGame(games) {
        let game
        newGameButton = document.querySelector("#newGameButton");
        newGameButton.addEventListener("click", function() {
            game = games[0]
            makeDeck(game);
        })
    }

    function makeDeck(game) {
        deckElements = getDeckElements()
        sheetElements = getSheetElements();
        const newDeck = new Deck(game, deckElements);
        newDeck.createScoreCardList()
        const blocks = newDeck['blocks'];
        const scoringCards = [];


        deckElements['newGameCardList'].addEventListener("click", function(e) {

            scoringCards.push()
        }

//        while (scoringCards.length < 3) {
//            newCard = newDeck.selectScoreCards()
//            scoringCards.push(newCard)
//        }




//        const scoreCards = newDeck.selectScoreCards()
//        const newSheet = new ScoreSheet(scoreCards, blocks, sheetElements)
//        newSheet.createSheet()
    };

//    async function waitForVariable(func) {
//        variable = await func();
//        return variable;
//    }

    function getDeckElements() {
        const allDeckElements = {};
        allDeckElements["newGameButtons"] = document.querySelector("#newGameButtons");
        allDeckElements["newGameCardList"] = document.querySelector("#newGameCardList");
        return allDeckElements;
    }

    function getSheetElements() {
        const allSheetElements = {};
        const blockNames = document.querySelectorAll(".blockNames");
        const blockScores = document.querySelectorAll(".blockScores");
        const blockTotal = document.querySelector("#blockTotal");
        const scoreCardHeaders = document.querySelectorAll(".scoreCardHeaders");
        const scoreCardColOneNames = document.querySelectorAll(".scoreCardColOneNames");
        const scoreCardColTwoNames = document.querySelectorAll(".scoreCardColTwoNames");
        const scoreCardColOneData = document.querySelectorAll(".scoreCardColOneData");
        const scoreCardColTwoData = document.querySelectorAll(".scoreCardColTwoData");
        const scoreCardTotals = document.querySelectorAll(".scoreCardTotal");
        const scoreCardSubtotal = document.querySelector("#scoreCardSubTotal");
        const cardTargets = document.querySelectorAll(".cardTarget");
        const totalTarget = document.querySelector("#totalTarget");
        const gameTotal = document.querySelector("gameTotal");
        allSheetElements['blockNames'] = blockNames;
        allSheetElements['blockScores'] = blockScores;
        allSheetElements['blockTotal'] = blockTotal;
        allSheetElements['headers'] = scoreCardHeaders;
        allSheetElements['colOneNames'] = scoreCardColOneNames;
        allSheetElements['colTwoNames'] = scoreCardColTwoNames;
        allSheetElements['colOneData'] = scoreCardColOneData;
        allSheetElements['colTwoData'] = scoreCardColOneData;
        allSheetElements['scoreCardTotals'] = scoreCardTotals;
        allSheetElements['scoreCardSubtotal'] = scoreCardSubtotal;
        allSheetElements['cardTargets'] = cardTargets;
        allSheetElements['totalTarget'] = totalTarget;
        allSheetElements['gameTotal'] = gameTotal;
        return allSheetElements
    }

}









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
