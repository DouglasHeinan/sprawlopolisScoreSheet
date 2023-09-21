
export class ScoreSheet {
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
        sheetElements["scoreCardTotals"].innerText = card["startingTotal"];
        sheetElements["cardTargets"][i].innerText = card["target"];
        if (card["colOne"] != 0) {
            this.redirectColOne(card, i);
        } else {
            sheetElements["colOneData"][i].innerText = card["colOne"];
        }
        this.createColTwo(card, i)
    }

    createColTwo(card, i) {
        const{sheetElements} = this;
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

    redirectColOne(card, i) {
        if (card["name"] === "Big Country") {
            this.multiRadioScoreCol(card, i)
        } else if (card["name"] === "Polyominorchards") {
            this.multiCheckScoreCol(card, i);
        } else if (card["name"] === "Natural Selection") {
            this.multiRadioScoreCol(card, i);
        }
    }

    multiCheckScoreCol(card, i) {
        const {sheetElements} = this;
        const checksLength = card["colOne"][0].length;
        sheetElements["colOneData"][i].contentEditable = "false";
        for (let j = 0; j < checksLength; j++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(`${card["id"]}CheckDiv`);
            sheetElements["colOneData"][i].insertAdjacentElement("beforeEnd", newDiv)
            newDiv.insertAdjacentElement("beforeEnd", card["colOne"][0][j]);
            newDiv.insertAdjacentElement("beforeEnd", card["colOne"][1][j]);
        }
    }

    multiRadioScoreCol(card, i) {
        const {sheetElements} = this;
        const radioLength = card["colOne"][0].length;
        sheetElements["colOneData"][i].contentEditable = "false";
        for (let j = 0; j < radioLength; j ++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(`${card["id"]}RadioDiv`);
            sheetElements["colOneData"][i].insertAdjacentElement("beforeEnd", newDiv);
            newDiv.insertAdjacentElement("beforeEnd", card["colOne"][0][j]);
            newDiv.insertAdjacentElement("beforeEnd", card["colOne"][1][j]);
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
        if (scoreCards[i]["name"] === "Polyominorchards") {
            cardTotal += this.scoreMultiCheck(scoreCards[i]["id"])
        } else if (scoreCards[i]["name"] === "Big Country") {
            cardTotal += this.scoreMultiRadio(scoreCards[i]["id"])
        } else if (scoreCards[i]["name"] === "Natural Selection") {
            cardTotal += this.scoreMultiRadio(scoreCards[i]["id"])
        } else {
            cardTotal += this.calcColTotal(i, "colOneData", "colOneMulti");
        }
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

    scoreMultiCheck(cardID) {
        let points = 0;
        const multiCheckDivs = document.querySelectorAll(`.${cardID}CheckDiv`);
        length = multiCheckDivs.length;
        for (let i = 0; i < length; i++) {
            if (multiCheckDivs[i].firstElementChild.checked) {
                points += parseInt(multiCheckDivs[i].firstElementChild.value);
            }
        }
        return points;
    }

    scoreMultiRadio(cardID) {
        let points;
        const multiRadioDivs = document.querySelectorAll(`.${cardID}RadioDiv`)
        length = multiRadioDivs.length;
        for (let i = 0; i < length; i++) {
            if (multiRadioDivs[i].firstElementChild.checked) {
                points = parseInt(multiRadioDivs[i].firstElementChild.value);
            }
        }
        if (!points) {
            points = 0;
        }
        return points;
    }

    scoreThemApples() {
        let points = 0;
        const appleBonus = document.querySelector("#themApplesBonus");
        if (appleBonus.checked) {
            points = parseInt(appleBonus.value);
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
        if (scoreCards[i]["name"] === "Count Your Chickens") {
            if (colScore != 0) {
                colScore += 4;
            }
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


export class Deck {
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
