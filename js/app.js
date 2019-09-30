/*
 * Create a list that holds all of your cards
 */
const allCards = document.querySelector('.deck');

//Use the given shuffle function to shuffle cards at the beginning of the game.
function shuffleCards() {
  const arrayOfCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffled = shuffle(arrayOfCards);
  for (card of shuffled) {
    allCards.appendChild(card);
  }
}

shuffleCards();

// Create timer.
let time = 0;
let clockTime;
let clockOff = true;
let timer;

let clock = document.querySelector('.clock');

function runTimer() {
  time++;
  const minutes = Math.floor(time/60);
  const seconds = time%60;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
};

//Start timer when first card is clicked.
function inSeconds() {
  if (clockOff) {
    timer = setInterval(runTimer, 1000);
    clockOff = false;
  }
}

//Stop timer at the end of the game.
function timerOff() {
  clearInterval(timer);
}

//Show the cards that are clicked on (two at a time).
//Determine if they are a match.
//Increment move counter by one.
//Change the score by removing a star if conditions are met.
 allCards.addEventListener('click', event => {
   const clickTarget = event.target;
   inSeconds();
   if (clicking(clickTarget)) {
     clickCards(clickTarget);
     listClickedCards(clickTarget);
     if (clickedCards.length === 2) {
       changeScore();
       cardsMatch();
       moveCounter();
     };
   };
 });

//Set conditions when clicking on cards.
 function clicking(clickTarget) {
   return(
     clickTarget.classList.contains('card')
     && clickedCards.length < 2
     && !clickedCards.includes(clickTarget)
     && !clickTarget.classList.contains('match')
   );
 }

//Toggle cards from face down to face up.
 function clickCards(clickTarget) {
   clickTarget.classList.toggle('open');
   clickTarget.classList.toggle('show');
 }

 let clickedCards = [];

//Add clicked cards to the array.
 function listClickedCards(clickTarget) {
   clickedCards.push(clickTarget);
 }

 let cardsMatched = 0;
 const totalPairs = 8;

//Determine if cards match. If so, toggle the match class, clear the array,
//increment matched cards. If matched cards equals 8, end the game.
//If the cards do not match, clear the array.
 function cardsMatch() {
   if (clickedCards[0].firstElementChild.className ===
     clickedCards[1].firstElementChild.className) {
     clickedCards[0].classList.toggle('match');
     clickedCards[1].classList.toggle('match');
     clickedCards = [];
     cardsMatched++;
     if(cardsMatched === totalPairs){
       gameEnds();
     }
   } else {
     setTimeout(() => {
       clickCards(clickedCards[0]);
       clickCards(clickedCards[1]);
       clickedCards = [];
     }, 1000);
   }
 }

//Create function that removes one star at a time.
 function removeStar() {
   const starRating = document.querySelectorAll('.stars li');
   for (star of starRating) {
     if (star.style.display !== 'none') {
       star.style.display = 'none';
       break;
     }
   }
 }

//Remove stars depending on the number of moves the player has made.
 function changeScore() {
   if (numOfMoves === 16 ||
     numOfMoves === 22 ||
     numOfMoves === 28 ||
     numOfMoves === 34 ||
     numOfMoves === 40) {
       removeStar();
     }
 }

//Count the number of moves the player has made.
 let numOfMoves = 0;

 function moveCounter() {
   numOfMoves++;
   const moves = document.querySelector('.moves');
   moves.innerHTML = numOfMoves;
 }

//When all eight pairs have been matched and game is over, turn on modal,
//show stats, and turn off the timer.
 function gameEnds() {
   modalPage();
   modalStats();
   timerOff();
 }

//Darken the screen for when the modal opens.
function modalPage() {
  const modal = document.querySelector('.modal_page');
  modal.classList.toggle('removed');
}

//Include in the modal the number os stars the player received.
let numOfStars = 0;

function retrieveStars() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    if (star.style.display !== 'none') {
      numOfStars++;
    }
  }
  return numOfStars;
}

//Create a list of the player's stats (time, stars, and moves).
 function modalStats() {
  const statsTime = document.querySelector('.modal_timeFinished');
  const clockEndTime = document.querySelector('.clock').innerHTML;
  statsTime.innerHTML = `Time = ${clockEndTime}`;
  const statsStars = document.querySelector('.modal_starRating');
  const starSet = retrieveStars();
  statsStars.innerHTML = `Stars = ${starSet}`;
  const statsMoves = document.querySelector('.modal_numMoves');
  statsMoves.innerHTML = `Moves = ${numOfMoves+1}`;
}

//Reset the game when the restart icon is clicked on.
const restart = document.querySelector('.restart');

restart.addEventListener('click', gameStartOver);

function gameStartOver() {
  shuffleCards();
  timeReset();
  movesReset();
  starsReset();
  cardsReset();
  cardsMatched = 0;
  clickedCards = [];
  numOfStars = 0;
}

//Cancel the game when the cancel button is clicked on. Toggle off the modal.
const cancel = document.querySelector('.modal_cancel');

cancel.addEventListener('click', modalPage);

//Reset the game when the replay button is clicked on.
const replay = document.querySelector('.modal_replay');

replay.addEventListener('click', gameReplay);

function gameReplay() {
  modalPage();
  shuffleCards();
  timeReset();
  movesReset();
  starsReset();
  cardsReset();
  cardsMatched = 0;
  clickedCards = [];
  numOfStars = 0;
}

//Reset the time so it displays 0:00.
function timeReset() {
  timerOff();
  clockOff = true;
  time = 0;
  runTimer();
  clock.innerHTML = "0:00";
}

//Reset the number of moves to zero.
function movesReset() {
  numOfMoves = 0;
  document.querySelector('.moves').innerHTML = numOfMoves;
}

//Reset the number of stars to show five stars.
function starsReset() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
    star.style.display = 'inline';
  }
}

//Reset the cards so they are facing down.
function cardsReset() {
  const cards = document.querySelectorAll('.deck li');
  for (card of cards) {
    card.className = 'card';
  }
}






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
