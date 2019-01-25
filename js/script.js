var alphabets = document.querySelectorAll(".alphabet");
var playHangman = document.getElementById("playHangman");
var canvas = document.getElementById("myCanvas").getContext("2d");
var hintMessage = document.getElementById("hintDisplay");
var reset = document.getElementById("reset");
var remainingMoves = document.getElementById("lives");
var message = document.getElementById("displayMessage");
var hint = document.querySelector(".hint");
var toggleHint = 0;
var h = -1; //=======variable to call the right function for hangman
var lives = 10; //==========no. of lives for player //==============list of words in the game;
var correctAnswer = 0;
var words = [
  "womanizer",
  "education",
  "copyright",
  "alien",
  "nepal",
  "birthplace",
  "prague",
  "computer",
  "document",
  "lemon",
  "shark"
];
var guessWord = document.querySelector(".guess");

var hintArray = [
  "A womanizer is a man who always seems to have a new girlfriend",
  "the process of receiving or giving systematic instruction, especially at a school or university",
  "the exclusive legal right, given to an originator ",
  "Science-Fiction horror film",
  "beautiful country in Asia",
  "the place where something started or originated",
  "Czech Republic capital",
  "an electronic device for storing and processing data",
  "a piece of written, printed, matter that provides information ",
  "a yellow, oval citrus fruit with thick skin and fragrant, acidic juice ",
  "marine fish with a cartilaginousskeleton, a prominent dorsal fin, and toothlike scales."
];
var num = randNum();
var word = randWords(num); //assiging the random numberfor player
var answerArray = [];
var userGuess = [];
var hintWords = hintArray[num];
var finalGuess = [];
message.style.textAlign = "center";
createAnswers();
//hang man begin path for first line and first life
var firstAttempt = function() {
  canvas.beginPath();
  canvas.moveTo(160, 120);
  canvas.lineTo(70, 120);
};
///hangman 2nd line and lost 2n chance
var secondAttempt = function() {
  canvas.lineTo(70, 10);
};
///hangman 3nd line and lost 3nd chance
var thirdAttempt = function() {
  canvas.lineTo(120, 10);
};
///hangman 4nd line and lost 4nd chance
var fourthAtttempt = function() {
  canvas.lineTo(120, 20);
};
///hang man head
var fifthAtttempt = function() {
  canvas.arc(120, 28, 8, 10, 0, 2 * Math.PI);
};
///hang man body
var sixAtttempt = function() {
  canvas.moveTo(120, 36);
  canvas.lineTo(120, 80);
};
//hangman left hand
var seventAtttempt = function() {
  canvas.moveTo(120, 36);
  canvas.lineTo(100, 50);
};
//hangman right hand
var eightAtttempt = function() {
  canvas.moveTo(120, 36);
  canvas.lineTo(140, 50);
};
//hangman left leg
var nineAtttempt = function() {
  canvas.moveTo(120, 80);
  canvas.lineTo(100, 100);
};
//hangman right leg
var lastAtttempt = function() {
  canvas.moveTo(120, 80);
  canvas.lineTo(140, 100);
};
////list of hangman function
var hangman = [
  firstAttempt,
  secondAttempt,
  thirdAttempt,
  fourthAtttempt,
  fifthAtttempt,
  sixAtttempt,
  seventAtttempt,
  eightAtttempt,
  nineAtttempt,
  lastAtttempt
];

init();

function init() {
  setUpHangman();
}

if (lives != 10) {
  remainingMoves.textContent = "You have " + lives + " moves left.";
}

hint.addEventListener("click", function() {
  hintMessage.textContent = hintWords;
  hintMessage.classList.toggle("bounceInUp");
  toggleHint += 1;
  if (toggleHint === 2) {
    hintMessage.textContent = "";
    toggleHint = 0;
  }
});

function resetButton() {
  wordHolder.innerHTML = "";
  canvas.clearRect(0, 0, 500, 500);
  num = randNum();
  word = randWords(num);
  hintWords = hintArray[num];
  answerArray = [];
  userGuess = [];
  lives = 10;
  correctAnswer = 0;
  h = -1;
  createAnswers();
  enableButton();
  reset.textContent = "Reset";
}
reset.addEventListener("click", function() {
  resetButton();
});

//function called if player failed to guess thhe right word
function hangmanStart() {
  h += 1;
  return hangman[h]();
}

function randWords(num) {
  return words[num];
}
//gentraterandom number to select the word from words array

function randNum() {
  return Math.floor(Math.random() * words.length);
}

//function to create ul, li element to hold random words
function createAnswers() {
  ////loop that find out the length of the assigned word and hide the real word by assigning
  for (var i = 0; i < word.length; i++) {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");
    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      guess.innerHTML = "_";
      answerArray.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
}

///function to check if the player clicked words matched the randow words or not
function setUpHangman() {
  for (var i = 0; i < alphabets.length; i++) {
    alphabets[i].addEventListener("click", function() {
      for (var j = 0; j < word.length; j++) {
        if (word[j] === this.value) {
          message.textContent = "";
          correctAnswer += 1;
          userGuess[j] = this.value;
          answerArray[j].innerHTML = this.value;

          //calling function that check if player win or nor
          win(correctAnswer);

          break;
        } else {
          if (j === word.length - 1) {
            message.textContent = "Opps! did not match";
            message.classList.toggle("flipInY");
            message.style.color = "red";
            message.style.fontSize = "20px";
            lives = lives - 1;
            hangmanStart();
            canvas.strokeStyle = "#000";
            canvas.lineWidth = 3;
            canvas.stroke();
          }
          // break;
        }

        //calling function for move left and game status
        gameOver(lives);
      }
      this.disabled = true;
      this.style.backgroundColor = "blue";
      this.style.color = "white";
    });
  }
}

//function for move left and game status
function gameOver(move) {
  if (move != 10) {
    remainingMoves.textContent = "You have " + move + " moves left.";
  }
  if (move === 0) {
    remainingMoves.textContent = "Game Over!!! Click Play Again to Continue!";
    remainingMoves.classList.toggle("rotateInDownLeft");
    remainingMoves.style.color = "red";
    reset.textContent = "Play Again";
    message.textContent = "Guessing word was " + word;
    message.style.color = "#000";
    disableButton();
  }
}

//function that check if player win or not
function win(game) {
  if (game === word.length) {
    message.textContent = "You win!!!! Congratulation..";
    message.classList.add("bounceInUp");
    message.style.fontSize = "40px";
    message.style.color = "green";
    reset.textContent = "Play Again";
    disableButton();
  }
}

//function to disable buttom
function disableButton() {
  for (var y = 0; y < alphabets.length; y++) {
    alphabets[y].disabled = true;
    alphabets[y].style.backgroundColor = "blue";
    alphabets[y].style.color = "white";
  }
}

///function to enable button
function enableButton() {
  remainingMoves.textContent = "";
  hintMessage.textContent = "";
  message.textContent = "";
  remainingMoves.style.color = "black";
  for (var b = 0; b < alphabets.length; b++) {
    alphabets[b].disabled = false;
    alphabets[b].style.backgroundColor = "";
    alphabets[b].style.color = "";
  }
}
