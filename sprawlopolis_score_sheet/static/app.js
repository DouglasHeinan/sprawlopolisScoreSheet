import {
    ScoreSheet,
    Deck
} from "./models.js"
import {
    sprawlopolis,
    agropolis,
    naturopolis
} from "./cardGames.js"


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
        const deckElements = getDeckElements()
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
        const sheetElements = getSheetElements();
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

//    const sprawlopolis = {
//        "name": "Sprawlopolis",
//        "blocks": [
//            {"name": "residential", "modifier": 1},
//            {"name": "commercial", "modifier": 1},
//            {"name": "industrial", "modifier": 1},
//            {"name": "parks", "modifier": 1},
//            {"name": "roads", "modifier": -1}
//        ],
//        "scoringCards": [
//            {"name": "The Outskirts", "description": "1 point per road that DOES NOT end at the edge of the city; -1 point per road that ends at the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads ending not at edge", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads ending at city's edge", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Bloom Boom", "description": "1 point/each row and column with exactly three Park blocks in it; -1 point for each row and column with exactly 0 Park blocks in it.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Rows/Columns w/ 3 Parks", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Rows with 0 Parks", "target": 2, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Go Green", "description": "1 point per Park block in your city; -3 points per Industrial block in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks", "colTwo": 0, "colTwoMulti": -3, "colTwoName": "Industrial Blocks", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Block Party", "description": "Score points per group of 4 'corner-tocorner' blocks of the same type. You may score multiple groups of the same type and a block may apply to more than one group.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Corner 2 corner blocks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -8, "max-score": 7,  "startingTotal": -8},
//            {"name": "Stacks and Scrapers", "description": "2 points per Industrial block adjacent to only Commercial or Industrial blocks", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Industrial blocks only adjacent to Industrial/Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 5, "min-score": 0, "max-score": 98, "startingTotal": 0},
//            {"name": "Master Planned", "description": "Subtract the number of blocks in your largest Industrial group from the number of blocks in your largest Residential group. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in largest Residential group", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Blocks in largest Industrial Group", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Central Perks", "description": "1 point per Park block located on the interior of the city; -2 points per Park block on the edge of the city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Interior Park blocks", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Park at City's edge", "target": 7, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "The Burbs", "description": "1 point per Park block adjacent to your largest group of Residential blocks; -2 points per Industrial block adjacent to your largest group of Residential blocks.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Parks adjacent to largest Residential group", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Industrial blocks adjacent to largest Residential group", "target": 8, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Concrete Jungle", "description": "1 point per Industrial block that shares a corner with at least 1 other Industrial block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Industrial blocks sharing corners", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 9, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "The Strip", "description": "1 point per Commercial block in any 1 row or column of your choice. You may only score for 1 row or column.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks in row/columns of your choice", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 10, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Mini Marts", "description": "2 points per Commercial block directly between two Residential blocks with the same road connecting all three blocks. Blocks may be a straight line or in a 'stepped' pattern.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Commercial blocks between Residential blocks connected by road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 98, "startingTotal": 0},
//            {"name": "Superhighway", "description": "1 point per every 2 Road sections (rounded down) that are part of your longest road.", "img": 0, "colOne": 0, "colOneMulti": 0.5, "colOneName": "Pairs of road sections in largest road", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Park Hopping", "description": "3 points per Road that begins at one Park and ends at different Park.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Roads connecting two parks", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Looping Lanes", "description": "1 point per Road section in a completed loop. You may acore multiple loops in your city.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Road sections in completed loops", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Skid Row", "description": "2 points per Residential block adjacent to 2 or more Industrial blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Residential blocks adjacent to 2+ Industrials", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 15, "min-score": 0, "max-score": 98, "startingTotal": 0},
//            {"name": "Morning Commute", "description": "2 points per Road that passes through both a Resdential block and a Commercial block.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass thru Residential and Commercial", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 16, "min-score": 0, "max-score": 98, "startingTotal": 0},
//            {"name": "Tourist Traps", "description": "1 point per Commercial block on the edge of the city; Additional 1 point per Commercial block on a corner edge.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Commercial blocks at City edge", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Corner Commercial Blocks", "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Sprawlopolis", "description": "Add the number of blocks in your longest column (skipping any gaps); Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Blocks in longest row", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Blocks in longest column", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0}
//        ]
//    };
//
//    const agropolis = {
//        "name": "Agropolis",
//        "blocks": [
//            {"name": "cornfields", "modifier": 1},
//            {"name": "orchards", "modifier": 1},
//            {"name": "vineyards", "modifier": 1},
//            {"name": "livestock", "modifier": 1},
//            {"name": "roads", "modifier": -1},
//        ],
//        "scoringCards": [
//            {"name": "Wine Seller", "id": "ag1", "description": "1 point per Road taht passes through 2 or more Vineyard blocks; -1 point per road that passes through 0 or 1 Vineyards.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Roads passing through multiple Vineyards.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Roads that pass through 1 or fewer Vineyards.", "target": 1, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Big Country", "id": "ag2", "description": "Score points based on the largest completed square group of blocks.", "img": 0, "colOne": createMultiRadio("ag2"), "colOneMulti": 1, "colOneName": "What size is your largest completed square group of blocks?", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 2, "min-score": -5, "max-score": 5, "startingTotal": -5},
//            {"name": "Udderly Impossible", "id": "ag3", "description": "1 point per Cow Pen not in the same row or column as any other Livestock block; -2 points per Cow Pen in the same row or column as any other Livestock block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Cow Pens not in same row/column as other Livestock.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cow Pens in same row/column as other Livestock.", "target": 3, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Count Your Chickens", "id": "ag4", "description": "1 point per Chicken Pen directly across a straight road segment from at least 1 other Chicken Pen; -4 points if none of your Chicken Pens score as described above.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Chicken Pens across a straight road segment form 1 or more Chicken Pens.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 4, "min-score": -4, "max-score": 99, "startingTotal": -4},
//            {"name": "All the Way Home", "id": "ag5", "description": "1 point per Pig Pen adjacent to your longest road; -1 point per Pig Pen not adjacent to your longest Road.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to longest Road.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Pig Pens not adjacent to longest Road.", "target": 5, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Fruitful Endeavor", "id": "ag6", "description": "1 point per Row or columns with 1 or more Vineyard blocks and 1 or more Orchard blocks; -1 point per row or column without both a Vineyard block and an Orchard block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Row/column with 1+ Vineyard and 1+ Orchard blocks.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Row/column without BOTH a Vineyard and Orchard block.", "target": 6, "min-score": -99, "max-score": 99, "startingTotal": 0},
//            {"name": "Cornfed", "id": "ag7", "description": "2 points per single Cow Pen block adjacent to 2 or more Cornfield blocks; 2 points per double Cow Pen block adjacent to 3 or more Cornfield blocks.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Single Cow Pens adjacent to 2+ Cornfield blocks.", "colTwo": 0, "colTwoMulti": 2, "colTwoName": "Double Cow Pen blocks adjacent to 3 or more Cornfield blocks.", "target": 7, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Coops and Loops", "id": "ag8", "description": "2 points per Chicken Pen inside each completed Road loop.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Chicken Pens inside completed Road loops.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 8, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Happy Cows", "id": "ag9", "description": "2 points per Cow Pen adjacent to 0 or 1 Roads; -1 point per Cow Pen adjacent to 2 or more Roads.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cow Pens adjacent to 0-1 Roads.", "colTwo": 0, "colTwoMulti": -1, "colTwoName": "Cow Pens adjacent to 2+ Roads.", "target": 9, "min-score": -99, "max-score": 98, "startingTotal": 0},
//            {"name": "Swine Country", "id": "ag10", "description": "2 points per Pig Pen adjacent to your largest Vineyard group; -2 points per Pig Pen not adjacent to your largest Vineyard group.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Pig Pens adjacent to largest Vineyard group.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Pig Pens not adjacent to largest Vineyard group.", "target": 10, "min-score": -98, "max-score": 98, "startingTotal": 0},
//            {"name": "Tractor Tours", "id": "ag11", "description": "Count the number of left and right turns on your longest Road and score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Number of turns on longest Road.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 11, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Country Roads", "id": "ag12", "description": "2 points per Road that passes more Cornfield blocks that any other block type.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Roads that pass through more Cornfield blocks than any other kind.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 12, "min-score": 0, "max-score": 98, "startingTotal": 0},
//            {"name": "Polyominorchards", "id": "ag13", "description": "Score points for each Orchard group of a given size, regardless of shape.", "img": 0, "colOne": createMultiCheck("ag13"), "colOneMulti": 1, "colOneName": "Select each size of Orchard group present on your map.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 13, "min-score": 0, "max-score": 9, "startingTotal": 0},
//            {"name": "Bacon and Eggs", "id": "ag14", "description": "1 point per Pig Pen adjacent to 1 or more Chicken Blocks but not to another Pig Block; 1 point per Chicken Pen adjacent to 1 or more Pig Blocks but not to another Chicken Block.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "Pig Pens adjacent to Chicken Blocks bot not Pig Blocks.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "Chicken Pens adjacent to Pig Blocks but not Chicken Blocks.", "target": 14, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Cornercopia", "id": "ag15", "description": "2 points per Cornfield Block on a corner; -2 points per Cornfield Block not on a corner.", "img": 0, "colOne": 0, "colOneMulti": 2, "colOneName": "Cornfield blocks on a corner.", "colTwo": 0, "colTwoMulti": -2, "colTwoName": "Cornfield blocks not on a corner.", "target": 15, "min-score": -98, "max-score": 98, "startingTotal": 0},
//            {"name": "Them Apples", "id": "ag16", "description": "3 points per Orchard group with a different number of blocks than any other Orchard group; BONUS: 5 points if every Orchard group has a different number of blocks.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Orchard groups with different numbers of blocks.", "colTwo": themApplesCheckBox(), "colTwoMulti": 1, "colTwoName": "Does every Orchard group have a different number of blocks?", "target": 16, "min-score": 0, "max-score": 20, "startingTotal": 0},
//            {"name": "Noah's Farm", "id": "ag17", "description": "3 points per Livestock group that contains an even number of pens and at least 2 different Livestock types.", "img": 0, "colOne": 0, "colOneMulti": 3, "colOneName": "Livestock group containing an even number of pens and 2+ different Livestock types.", "colTwo": null, "colTwoMulti": null, "colTwoName": null, "target": 17, "min-score": 0, "max-score": 99, "startingTotal": 0},
//            {"name": "Agropolis", "id": "ag18", "description": "Count all of the Livestock Pens in your longest row and in your longest column. Score that many points.", "img": 0, "colOne": 0, "colOneMulti": 1, "colOneName": "All Livestock Pens in longest row.", "colTwo": 0, "colTwoMulti": 1, "colTwoName": "All Livestock Pens in longest column.", "target": 18, "min-score": 0, "max-score": 99, "startingTotal": 0},
//        ]
//    };
//
//        const naturopolis = {
//        "name": "Naturopolis",
//        "blocks": [
////            later...
//        ],
//        "scoringCards": [
////            later...
//        ]
//    };

//    function themApplesCheckBox() {
//        const bonusCheck = document.createElement("input");
//        const bonusLabel = document.createElement("label");
//        bonusCheck.type = "checkbox";
//        bonusCheck.id = "themApplesBonus";
//        bonusCheck.value = "5";
//        bonusLabel.for = "themApplesBonus";
//        bonusLabel.innerText = "5 point bonus!";
//        return [bonusCheck, bonusLabel];
//    }
//
//    function createMultiCheck(card) {
//        const checkOne = document.createElement("input");
//        const checkTwo = document.createElement("input");
//        const checkThree = document.createElement("input");
//        const labelOne = document.createElement("label");
//        const labelTwo = document.createElement("label");
//        const labelThree = document.createElement("label");
//        const checks = [checkOne, checkTwo, checkThree];
//        const labels = [labelOne, labelTwo, labelThree]
//        if (card === "ag13") {
//            const checkElements = checkPolyominorchards(checks, labels);
//            return checkElements;
//        }
//    }
//
//    function createMultiRadio(card) {
//        const radioOne = document.createElement("input");
//        const radioTwo = document.createElement("input");
//        const radioThree = document.createElement("input");
//        const labelOne = document.createElement("label");
//        const labelTwo = document.createElement("label");
//        const labelThree = document.createElement("label");
//        const radios = [radioOne, radioTwo, radioThree];
//        const labels = [labelOne, labelTwo, labelThree]
//        if (card === "ag2") {
//            const checkElements = checkBigCountry(radios, labels);
//            return checkElements;
//        }
//    }
//
//    function checkPolyominorchards(checks, labels) {
//        const length = checks.length;
//        const values = [1, 3, 5];
//        const blocks = ["2", "3", "4"];
//        for (let i = 0; i < length; i++) {
//            checks[i].type = "checkbox";
//            checks[i].id = `polyCheck${String(values[i])}`;
//            checks[i].value = values[i];
//            labels[i].for = `polyCheck${String(values[i])}`;
//            labels[i].innerText = `Exactly ${blocks[i]} blocks (${String(values[i])} points)`;
//        }
//        return [checks, labels]
//    }
//
//    function checkBigCountry(radios, labels) {
//        const length = radios.length;
//        const values = [-5, 7, 10];
//        const blocks = ["4x4 or less", "5x5", "6x6 or more"];
//        for (let i = 0; i < length; i++) {
//            radios[i].type = "radio";
//            radios[i].id = `BCCheck${String(values[i])}`;
//            radios[i].value = values[i];
//            radios[i].name = "bigCountryRadio"
//            labels[i].for = `BCCheck${String(values[i])}`;
//            labels[i].innerText = `${blocks[i]}`;
//        }
//        return [radios, labels]
//    }
