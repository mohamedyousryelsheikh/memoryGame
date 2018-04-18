/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateCards(){
     $(".new-deck li").remove();
    for (let card of shuffle(cardsArray)) {

        cardsList = cardsList + `<li class="card"><i class="fa fa-${card}"></i></li>`;
    }
    /*appending another matching random cards */
    for (let card of shuffle(cardsArrayToMatch)) {

        cardsList = cardsList + `<li class="card"><i class="fa fa-${card}"></i></li>`;
    }
    $(".new-deck").append(cardsList);
    cardsList='';


}
/*function to add opened cards to an array */
function addOpenedCards(cardOpened) {
    openedCards.push(cardOpened);
    var openedCardsStatus = openedCardsChecker();

}

/*function checking opened cards matching or not*/
function openedCardsChecker() {

    if (openedCards.length == 2) {
        if (openedCards[0] == openedCards[1]) {
            //success..keep cards opened
            successFlag = "true";
        }
        else {
            //failure..hide cards again
            successFlag = "false";
        }
        openedCards = [];
    }

    else
        return openedCards;


}
/*function to reset the game once again */
function resetCards() {
    $(".deck.new-deck li").removeClass("open show match");
    movesCounter = 0;
    $(".moves").text(movesCounter);
    $(".stars li").css("color", "#2e3d49");
    openedCards = [];
    $(".dialog-wrapper").hide();
    generateCards();
}

function playerPerfomance() {
    var numOfCardsMatching = $(".new-deck li.match").length;

    switch (true) {
        case ((movesCounter>=6 && movesCounter<=12) && (numOfCardsMatching>=4 && numOfCardsMatching<=6)):
            $(".stars li:first-child").css("color", "orange");
            break;
        case ((movesCounter>=14 && movesCounter<=20) && (numOfCardsMatching>=7 && numOfCardsMatching<=10)):
            $(".stars li:nth-child(2)").css("color", "orange");
            break;
        case ((movesCounter>=21 && movesCounter<=30) && (numOfCardsMatching>=11 && numOfCardsMatching<=16)):
            $(".stars li:last-child").css("color", "orange");
            break;
    }
}

function winTheGame(matchingCardsCounter) {
    if (matchingCardsCounter == $(".new-deck li").length)
        $(".dialog-wrapper").show();
}


/*list of variables*/
const cardsArray = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
const cardsArrayToMatch = [...cardsArray];
let openedCards = [];
let cardsList = "";
var successFlag = "";
var movesCounter = 0;

$(document).ready(function () {


    /*function to display the cards on clicking the item*/
    $(".deck").on("click", "li", (function () {
        movesCounter++;
        playerPerfomance();
        $(".moves").text(movesCounter);
        $(this).addClass("show open");
        var getOpenedCard = $(this).find('i').attr("class").split("fa-")[1];
        addOpenedCards(getOpenedCard);//adding opened item to opened card array
        if (successFlag == "true") {
            $(".deck li.open.show").addClass("match");
            successFlag = "";
        }
        else if (successFlag == "false") {
            $(".deck.new-deck li").css("pointer-events", "none");
            setTimeout(function () {
                $(".deck.new-deck li").removeClass("open show");
                successFlag = "";
                $(".deck.new-deck li").css("pointer-events", "visible");
            }, 800);
        }
        else
            return console.log("continue");

            winTheGame($(".deck.new-deck li.match").length);

    }));
    /*click function end*/

    /*reset function call*/
    $(".restart").on("click", function () {
        resetCards();
    });


    /*getting random cards */
    generateCards();
    
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
