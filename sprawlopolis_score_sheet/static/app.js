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
            const card = scoreCards[i];
            this.createScoreCardRow(i);
        }
        this.createScoreBlockRows()
        this.createTargetScore()
    }

    createScoreCardRow(i) {
        const {scoreCards, sheetElements} = this;
        const card = scoreCards[i];
        sheetElements["headers"][i].innerText = card["name"];
        sheetElements["headers"][i].title = card["description"];
        sheetElements["colOneNames"][i].innerText = card["colOneName"];
        sheetElements["colOneData"][i].innerText = card["colOne"];
        sheetElements["scoreCardTotals"].innerText = card["startingTotal"];
        sheetElements["cardTargets"][i].innerText = card["target"];
        this.createColTwo(card, i)
    }

    createColTwo(card, i) {
        if (card["colTwo"] != null) {
            sheetElements["colTwoNames"][i].innerText = card["colTwoName"];
            if (card["name"] === "Them Apples") {
                this.makeThemApplesCol(card, i)
            } else {
                sheetElements["colTwoData"][i].innerText = card["colTwo"];
            }
        } else {
            sheetElements["colTwoNames"][i].classList.add("noBorder");
            sheetElements["colTwoData"][i].parentNode.classList.add("noBorder");
        }
    }

    makeThemApplesCol(card, i) {
        const {sheetElements} = this;
        sheetElements["colTwoData"][i].contentEditable = "false";
        sheetElements["colTwoData"][i].insertAdjacentElement("beforeend", card["colTwo"][0]);
        sheetElements["colTwoData"][i].insertAdjacentElement("beforeend", card["colTwo"][1]);
    }

    createScoreBlockRows() {
        const {blocks, sheetElements} = this
        const blockNames = sheetElements["blockNames"];
        const length = blockNames.length;
        for (let i = 0; i < length; i++) {
            blockNames[i].innerText = blocks[i]["name"];
        }
    }

    createTargetScore() {
        const {scoreCards, sheetElements} = this;
        const targetOne = parseInt(scoreCards[0]["target"]);
        const targetTwo = parseInt(scoreCards[1]["target"]);
        const targetThree = parseInt(scoreCards[2]["target"]);
        const target = targetOne + targetTwo + targetThree
        sheetElements["totalTarget"].innerText = target;
    }

    calcBlockScores() {
        const {blocks, sheetElements} = this;
        const scores = sheetElements["blockScores"];
        const length = scores.length;
        let total = 0;
        for (let i = 0; i < length; i++) {
            let toAdd = scores[i].innerText;
            if (!toAdd) {
                toAdd = 0;
            }
            total += (parseInt(toAdd) * blocks[i]["modifier"]);
        }
        sheetElements["blockTotal"].innerText = total;
    }

    calcScoreCards() {
        const {scoreCards, sheetElements} = this;
        let total = 0;
        const length = scoreCards.length;
        for (let i = 0; i < length; i++) {
            total += this.getScoreCardTotal(i)
        }
        sheetElements["scoreCardsSubtotal"].innerText = total;
    }

    getScoreCardTotal(i) {
        const {scoreCards, sheetElements} = this;
        let cardTotal = scoreCards[i]["startingTotal"];
        cardTotal += this.calcColTotal(i, "colOneData", "colOneMulti");
        if (sheetElements["colTwoNames"] != null) {
            if (scoreCards[i]["name"] === "Them Apples") {
                cardTotal += this.scoreThemApples();
            } else {
                cardTotal += this.calcColTotal(i, "colTwoData", "colTwoMulti");
            }
        }
        const adjustedCardTotal = this.adjustScoreCardMinMax(cardTotal, i);
        sheetElements["scoreCardTotals"][i].innerText = adjustedCardTotal;
        return adjustedCardTotal;
    }

    scoreThemApples() {
        let points = 0;
        if (document.querySelector("#themApplesBonus").checked) {
            points = 5;
        } else {
            points = 0;
        }
        return points;
    }

    calcColTotal(i, colData, colMulti) {
        const {scoreCards, sheetElements} = this;
        const col = sheetElements[colData][i].innerText;
        let colScore = parseInt(col) * scoreCards[i][colMulti];
        if (!colScore) {
            colScore = 0;
        }
        return Math.floor(colScore);
    }

    adjustScoreCardMinMax(cardTotal, i) {
        const {scoreCards} = this;
        if (cardTotal < scoreCards[i]["min-score"]) {
            cardTotal = scoreCards[i]["min-score"];
        }
        if (cardTotal > scoreCards[i]["max-score"]) {
            cardTotal = scoreCards[i]["max-score"];
        }
        return cardTotal;
    }

    calcTotalScore() {
        const {sheetElements} = this;
        let blocksSubtotal = sheetElements["blockTotal"].innerText;
        if (!blocksSubtotal) {
            blocksSubtotal = 0;
        }
        let scoreCardSubtotal = sheetElements["scoreCardsSubtotal"].innerText;
        if (!scoreCardSubtotal) {
            scoreCardSubtotal = 0;
        }
        const total = parseInt(blocksSubtotal) + parseInt(scoreCardSubtotal);
        sheetElements["gameTotal"].innerText = total;
    }
}


class Deck {
    constructor(game, deckElements) {
        this.name = game["name"];
        this.blocks = game["blocks"];
        this.scoringCards = game["scoringCards"];
        this.deckElements = deckElements;
    }

    createScoreCardList() {
        const {scoringCards, deckElements} = this;
        deckElements["newGameCardList"].classList.remove("hidden");
        length = scoringCards.length;
        for (let i = 0; i < length; i++) {
            this.createScoreCardRow(i)
        };
    };

    createScoreCardRow(i) {
        const {scoringCards, deckElements} = this;
        const newListTag = document.createElement("li");
        const newAnchorTag = document.createElement("a");
        newAnchorTag.innerText = scoringCards[i]["name"];
        newAnchorTag.href = "#";
        newAnchorTag.classList.add("addToGame");
        deckElements["newGameCardList"].insertAdjacentElement("beforeend", newListTag);
        newListTag.insertAdjacentElement("beforeend", newAnchorTag);
    }

    selectScoreCard(e) {
        const {scoringCards} = this;
        let newCard
        length = scoringCards.length
        if (e.target.className == "addToGame") {
            const cardName = e.target.innerText;
            e.target.remove();
            for (let i = 0; i < length; i++) {
                if (cardName === scoringCards[i]["name"]) {
                    newCard = scoringCards[i];
                };
            };
            return newCard;
        };
    };

};

//-------------------------------------------------------------------

window.onload = function wrapper() {

    chooseGame()

    function chooseGame() {
        const games = [sprawlopolis, agropolis, naturopolis]
        let game;
        const newGameButtons = document.querySelectorAll(".newGameButton");
        const gameStartButtons = document.querySelector("#gameStartButtons");
        const length = newGameButtons.length;
        for (let i = 0; i < length; i++) {
            newGameButtons[i].addEventListener("click", function() {
                game = games[i];
                gameStartButtons.classList.add("hidden");
                makeDeck(game);
            });
        }
    };

    function makeDeck(game) {
        deckElements = getDeckElements()
        const newDeck = new Deck(game, deckElements);
        newDeck.createScoreCardList()
        const blocks = newDeck["blocks"];
        const scoringCards = [];
        deckElements["newGameCardList"].addEventListener("click", function(e) {
            const newCard = newDeck.selectScoreCard(e);
            scoringCards.push(newCard)
            if (scoringCards.length === 3) {
                deckElements["newGameCardList"].classList.add("hidden");
                makeSheet(scoringCards, blocks);
            };
        });
    };

    function makeSheet(scoreCards, blocks) {
        sheetElements = getSheetElements();
        const newSheet = new ScoreSheet(scoreCards, blocks, sheetElements)
        newSheet.createSheet()
        sheetElements["tableDiv"].classList.remove("hidden");
        keepScore(sheetElements, newSheet);
    }

    function keepScore(sheetElements, sheet) {
        const blockScores = sheetElements["blockScores"];
        const cardScoresOne = sheetElements["colOneData"];
        const cardScoresTwo = sheetElements["colTwoData"];
        const blockLength = blockScores.length;
        const cardOneLength = cardScoresOne.length;
        const cardTwoLength = cardScoresTwo.length
        sheet.calcBlockScores()
        sheet.calcScoreCards()
        sheet.calcTotalScore()
        for (let i = 0; i < blockLength; i++) {
            blockScores[i].addEventListener("input", function() {
                sheet.calcBlockScores();
                sheet.calcScoreCards();
                sheet.calcTotalScore();
            })
        }
        for (let i = 0; i < cardOneLength; i++) {
            cardScoresOne[i].addEventListener("input", function() {
                sheet.calcScoreCards();
                sheet.calcTotalScore();
            })
        }
        for (let i = 0; i < cardTwoLength; i++) {
            cardScoresTwo[i].addEventListener("input", function() {
                sheet.calcScoreCards();
                sheet.calcTotalScore();
            })
        }
    }

    function getDeckElements() {
        const allDeckElements = {};
        allDeckElements["newGameButtons"] = document.querySelector("#newGameButtons");
        allDeckElements["newGameCardList"] = document.querySelector("#newGameCardList");
        return allDeckElements;
    }

    function getSheetElements() {
        const allSheetElements = {};
        allSheetElements["tableDiv"] = document.querySelector("#tableDiv");
        allSheetElements["blockNames"] = document.querySelectorAll(".blockName");
        allSheetElements["blockScores"] = document.querySelectorAll(".blockScores");
        allSheetElements["blockTotal"] = document.querySelector("#blockTotal");
        allSheetElements["headers"] = document.querySelectorAll(".scoreCardHeaders");
        allSheetElements["colOneNames"] = document.querySelectorAll(".scoreCardColOneNames");
        allSheetElements["colTwoNames"] = document.querySelectorAll(".scoreCardColTwoNames");
        allSheetElements["colOneData"] = document.querySelectorAll(".scoreCardColOneData");
        allSheetElements["colTwoData"] = document.querySelectorAll(".scoreCardColTwoData");
        allSheetElements["scoreCardTotals"] = document.querySelectorAll(".scoreCardTotal");
        allSheetElements["scoreCardsSubtotal"] = document.querySelector("#scoringCardSubtotal");
        allSheetElements["cardTargets"] = document.querySelectorAll(".cardTarget");
        allSheetElements["totalTarget"] = document.querySelector("#totalTarget");
        allSheetElements["gameTotal"] = document.querySelector("#gameTotal");
        return allSheetElements
    }

}

    const sprawlopolis = {
        "name": "Sprawlopolis",
        "blocks": [
            {"name": "residential", "modifier": 1},
            {"name": "commercial", "modifier": 1},
            {"name": "industrial", "modifier": 1},
            {"name": "parks", "modifier": 1},
            {"name": "roads", "modifier": -1}
        ],
        "scoringCards": [
            {"name": "The Outskirts", "description": "1 point per road that DOES NOT end at the edge of the city; -1 point per road that ends at the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Bloom Boom", "description": "1 point/each row and column with exactly three Park blocks in it; -1 point for each row and column with exactly 0 Park blocks in it.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Go Green", "description": "1 point per Park block in your city; -3 points per Industrial block in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Industrial Blocks", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Block Party", "description": "Score points per group of 4 'corner-tocorner' blocks of the same type. You may score multiple groups of the same type and a block may apply to more than one group.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -8, "max-score": 7,  "startingTotal": -8},
            {"name": "Stacks and Scrapers", "description": "2 points per Industrial block adjacent to only Commercial or Industrial blocks", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 98, "startingTotal": 0},
            {"name": "Master Planned", "description": "Subtract the number of blocks in your largest Industrial group from the number of blocks in your largest Residential group. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Central Perks", "description": "1 point per Park block located on the interior of the city; -2 points per Park block on the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "The Burbs", "description": "1 point per Park block adjacent to your largest group of Residential blocks; -2 points per Industrial block adjacent to your largest group of Residential blocks.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Concrete Jungle", "description": "1 point per Industrial block that shares a corner with at least 1 other Industrial block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "The Strip", "description": "1 point per Commercial block in any 1 row or column of your choice. You may only score for 1 row or column.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Mini Marts", "description": "2 points per Commercial block directly between two Residential blocks with the same road connecting all three blocks. Blocks may be a straight line or in a 'stepped' pattern.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 98, "startingTotal": 0},
            {"name": "Superhighway", "description": "1 point per every 2 Road sections (rounded down) that are part of your longest road.", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Park Hopping", "description": "3 points per Road that begins at one Park and ends at different Park.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Looping Lanes", "description": "1 point per Road section in a completed loop. You may acore multiple loops in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Skid Row", "description": "2 points per Residential block adjacent to 2 or more Industrial blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "min-score": 0, "max-score": 98, "startingTotal": 0},
            {"name": "Morning Commute", "description": "2 points per Road that passes through both a Resdential block and a Commercial block.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 98, "startingTotal": 0},
            {"name": "Tourist Traps", "description": "1 point per Commercial block on the edge of the city; Additional 1 point per Commercial block on a corner edge.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Sprawlopolis", "description": "Add the number of blocks in your longest column (skipping any gaps); Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0}
        ]
    };

    const agropolis = {
        "name": "Agropolis",
        "blocks": [
            {"name": "cornfields", "modifier": 1},
            {"name": "orchards", "modifier": 1},
            {"name": "vineyards", "modifier": 1},
            {"name": "livestock", "modifier": 1},
            {"name": "roads", "modifier": -1},
        ],
        "scoringCards": [
            {"name": "Wine Seller", "description": "1 point per Road taht passes through 2 or more Vineyard blocks; -1 point per road that passes through 0 or 1 Vineyards.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads passing through multiple Vineyards.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads that pass through 1 or fewer Vineyards.", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Big Country", "description": "Score points based on the largest completed square group of blocks.", "img": 0, "colOne": 0, "colOneMulti": 7, "colOneName": "5X5 block?", "colTwo": 0, "colTwoMulti": 10, "colTwoName": "6X6 block", "target": 2, "min-score": -5, "max-score": 5, "startingTotal": -5},
            {"name": "Udderly Impossible", "description": "1 point per Cow Pen not in the same row or column as any other Livestock block; -2 points per Cow Pen in the same row or column as any other Livestock block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Cow Pens not in same row/column as other Livestock.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cow Pens in same row/column as other Livestock.", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Count Your Chickens", "description": "1 point per Chicken Pen directly across a straight road segment from at least 1 other Chicken Pen; -4 points if none of your Chicken Pens score as described above.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Chicken Pens across a straight road segment form 1 or more Chicken Pens.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -4, "max-score": 99, "startingTotal": -4},
            {"name": "All the Way Home", "description": "1 point per Pig Pen adjacent to your longest road; -1 point per Pig Pen not adjacent to your longest Road.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to longest Road.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Pig Pens not adjacent to longest Road.", "target": 5, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Fruitful Endeavor", "description": "1 point per Row or columns with 1 or more Vineyard blocks and 1 or more Orchard blocks; -1 point per row or column without both a Vineyard block and an Orchard block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Row/column with 1+ Vineyard and 1+ Orchard blocks.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Row/column without BOTH a Vineyard and Orchard block.", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
            {"name": "Cornfed", "description": "2 points per single Cow Pen block adjacent to 2 or more Cornfield blocks; 2 points per double Cow Pen block adjacent to 3 or more Cornfield blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Single Cow Pens adjacent to 2+ Cornfield blocks.", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Double Cow Pen blocks adjacent to 3 or more Cornfield blocks.", "target": 7, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Coops and Loops", "description": "2 points per Chicken Pen inside each completed Road loop.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Chicken Pens inside completed Road loops.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 8, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Happy Cows", "description": "2 points per Cow Pen adjacent to 0 or 1 Roads; -1 point per Cow Pen adjacent to 2 or more Roads.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cow Pens adjacent to 0-1 Roads.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Cow Pens adjacent to 2+ Roads.", "target": 9, "min-score": -99, "max-score": 98, "startingTotal": 0},
            {"name": "Swine Country", "description": "2 points per Pig Pen adjacent to your largest Vineyard group; -2 points per Pig Pen not adjacent to your largest Vineyard group.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Pig Pens adjacent to largest Vineyard group.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Pig Pens not adjacent to largest Vineyard group.", "target": 10, "min-score": -98, "max-score": 98, "startingTotal": 0},
            {"name": "Tractor Tours", "description": "Count the number of left and right turns on your longest Road and score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Number of turns on longest Road.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Country Roads", "description": "2 points per Road that passes more Cornfield blocks that any other block type.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass through more Cornfield blocks than any other kind.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 98, "startingTotal": 0},
            {"name": "Polyominorchards", "description": "Score points for each Orchard group of a given size, regardless of shape.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Orchard group comrpised of exactly 2 blocks?", "colTwo": 0, "colTwoMulti": 3, "colTwoName": "Orchard group of exactly 3 blocks?", "colThree": 0, "colThreeMulti": 5, "colTwoName": "Orchard group of exactly 4 blocks?", "target": 13, "min-score": 0, "max-score": 9, "startingTotal": 0},
            {"name": "Bacon and Eggs", "description": "1 point per Pig Pen adjacent to 1 or more Chicken Blocks but not to another Pig Block; 1 point per Chicken Pen adjacent to 1 or more Pig Blocks but not to another Chicken Block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to Chicken Blocks bot not Pig Blocks.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Chicken Pens adjacent to Pig Blocks but not Chicken Blocks.", "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Cornercopia", "description": "2 points per Cornfield Block on a corner; -2 points per Cornfield Block not on a corner.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cornfield blocks on a corner.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cornfield blocks not on a corner.", "target": 15, "min-score": -98, "max-score": 98, "startingTotal": 0},
//            {"name": "Them Apples", "description": "3 points per Orchard group with a different number of blocks than any other Orchard group; BONUS: 5 points if every Orchard group has a different number of blocks.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Orchard groups with different numbers of blocks.", "colTwo": 0, "colTwoMulti": 5, "colTwoName": "Does every Orchard group have a different number of blocks?", "target": 16, "min-score": 0, "max-score": 20, "startingTotal": 0},
            {"name": "Them Apples", "description": "3 points per Orchard group with a different number of blocks than any other Orchard group; BONUS: 5 points if every Orchard group has a different number of blocks.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Orchard groups with different numbers of blocks.", "colTwo": themApplesCheckBox(), "colTwoMulti": 1, "colTwoName": "Does every Orchard group have a different number of blocks?", "target": 16, "min-score": 0, "max-score": 20, "startingTotal": 0},
            {"name": "Noah's Farm", "description": "3 points per Livestock group that contains an even number of pens and at least 2 different Livestock types.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Livestock group containing an even number of pens and 2+ different Livestock types.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
            {"name": "Agropolis", "description": "Count all of the Livestock Pens in your longest row and in your longest column. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "All Livestock Pens in longest row.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "All Livestock Pens in longest column.", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0},
        ]
    };

        const naturopolis = {
        "name": "Naturopolis",
        "blocks": [
//            later...
        ],
        "scoringCards": [
//            later...
        ]
    };

    function themApplesCheckBox() {
        const bonusCheck = document.createElement("input");
        const bonusLabel = document.createElement("label");
        bonusCheck.type = "checkbox";
        bonusCheck.id = "themApplesBonus";
        bonusCheck.value = "5";
        bonusLabel.for = "themApplesBonus";
        bonusLabel.innerText = "5 point bonus!";
        return [bonusCheck, bonusLabel];
    }

