"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let newDiv = document.createElement("div");
    newDiv.className = color;
    newDiv.addEventListener("click", ()=> handleCardClick(newDiv));
    gameBoard.append(newDiv);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.transform = "rotateY(180deg)";
  card.style.backgroundColor = card.className;
  card.classList.add("flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.transform = "rotateY(180deg)";
  card.style.backgroundColor = "white";
  card.classList.remove("flipped");
}

/** Handle clicking on a card: this could be first-card or second-card. */

let temp;
let delay = false;

function handleCardClick(evt) {
  if(delay === false){
    let numFlipped = document.getElementsByClassName("flipped");
    console.log(evt.classList);
    // this is for if a flipped card is chosen (skip)
    if(evt.classList.contains("flipped")) {
      return;
    }
    // this is for if there isn't a temporary flipped card, it will simply flip a card and add "temp" class
    else if(numFlipped.length % 2 === 0) {
      temp = evt.className;
     flipCard(evt);
     evt.classList.add("temporary");
     return;
   }
    // this one is for if they match
    else if(evt.className === temp) {
      flipCard(evt);
      let matched = document.querySelector(".temporary");
      matched.classList.remove("temporary");
     return;
     // may have to put code to remove temp
   }
   // this one is for if they don't match, and they need to be flipped back
   else {
      delay = true;
      flipCard(evt);
      setTimeout(function() {
       unFlipCard(evt);
       let notMatched = document.querySelector(".temporary");
       unFlipCard(notMatched);
       notMatched.classList.remove("temporary");
       delay = false;
     }, FOUND_MATCH_WAIT_MSECS);
     return;
   }
  }
}