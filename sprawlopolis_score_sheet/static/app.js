import {
    ScoreSheet,
    Deck
} from "./models.js"
import {
    sprawlopolis,
    agropolis,
    naturopolis
} from "./cardGames.js"
import {
    sheetElements,
    deckElements
} from "./htmlElements.js"

//-------------------------------------------------------------------

window.onload = chooseGame();

function chooseGame() {
    const games = [sprawlopolis, agropolis, naturopolis];
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
    };
};

function makeDeck(game) {
    const newDeck = new Deck(game, deckElements);
    newDeck.createScoreCardList();
    const blocks = newDeck["blocks"];
    const scoringCards = [];
    deckElements["newGameCardList"].addEventListener("click", function(e) {
        const newCard = newDeck.selectScoreCard(e);
        scoringCards.push(newCard);
        if (scoringCards.length === 3) {
            deckElements["newGameCardList"].classList.add("hidden");
            makeSheet(scoringCards, blocks);
        };
    });
};

function makeSheet(scoreCards, blocks) {
    const newSheet = new ScoreSheet(scoreCards, blocks, sheetElements);
    newSheet.createSheet();
    sheetElements["tableDiv"].classList.remove("hidden");
    createScoreKeepingVariables(sheetElements, newSheet);
}

function createScoreKeepingVariables(sheetElements, sheet) {
    const blockScores = sheetElements["blockScores"];
    const cardScoresOne = sheetElements["colOneData"];
    const cardScoresTwo = sheetElements["colTwoData"];
    const scoringGroups = [blockScores, cardScoresOne, cardScoresTwo];
    const blockLength = blockScores.length;
    const cardOneLength = cardScoresOne.length;
    const cardTwoLength = cardScoresTwo.length;
    const scoringGroupLengths = [blockLength, cardOneLength, cardTwoLength];
    keepScore(scoringGroupLengths, sheet, scoringGroups);
}

function keepScore(scoringGroupLengths, sheet, scoringGroups) {
    updateScores(sheet);
    for (let i = 0; i < scoringGroups.length; i++) {
        for (let j = 0; j < scoringGroupLengths[i]; j++) {
            scoringGroups[i][j].addEventListener("input", function() {
                updateScores(sheet);
            });
        };
    };
};

function updateScores(sheet) {
    sheet.calcBlockScores();
    sheet.calcScoreCards();
    sheet.calcTotalScore();
}
