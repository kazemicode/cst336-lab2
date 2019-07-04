// GLOBAL VARIABLES
var selectedWord = "";
var selectedHint="";
var board;
var remainingGuesses;
var words = [{word: "snake", hint: "It's a reptile"},
             {word: "monkey", hint: "It's a mammal"},
             {word: "beetle", hint: "It's a insect"}];
var alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
var hintClicked = false;

// LISTENERS
window.onload = startGame();

$(".hintBtn").click(function() {
  console.log("triggered hint");
  giveHint();
  hintClicked = true;
  remainingGuesses--;
  updateMan();
});

$(".letter").on("click", function() {
  console.log($(this));
  checkLetter($(this).attr("id"));
  disableButton($(this)); 
});

$(".replayBtn").on("click", function() {
  location.reload();
});




// FUNCTIONS

/* 
* Initializes remaining guesses, the board, picks the word to be guessed, initalizes the board
* array. updates the visile board, and creates the letter buttons 
*/
function startGame()
{
  $("#guessed").append(localStorage.getItem("guessed"));
  remainingGuesses = 6;
  board =[];
  pickWord();
  initBoard();
  updateBoard();
  createLetters();
}

//Fill the board with underscores
function initBoard()
{
  for(var letter in selectedWord)
    {
      board.push('_');
    }   
}

// Picks a random word from the array using a pseudorandom number generator
function pickWord()
{
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}

// updates the board in it's current state
function updateBoard()
{
  //document.getElementById("word").innerHTML = "";
  $("#word").empty();
  for (var i = 0; i < board.length; i++)
  {
    $("#word").append(board[i] + " ");
  }
  $("#word").append("<br><br>");
  $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
  $("#word").append("<button class='hintBtn btn btn-success'>Hint? </button>");
  if(hintClicked)
    {
      giveHint();
    }
  $("#word").append("<br><br>");
}

// create the letter buttons iteratively
function createLetters()
{
  $("#letters").empty();
  for(var letter of alphabet)
    {
      $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
    }
}

// disable buttons when clicked
function disableButton(btn)
{
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger");
}

// check if letter is in the word and put them in the correct place
function checkLetter(letter)
{
  var positions = [];
  
  //put all positions the letter exists in in the array
  for(var i = 0; i < selectedWord.length; i++){
    if(selectedWord[i] == letter)
      {
        positions.push(i);
      }
  }
  
  if(positions.length > 0)
    {
      updateWord(positions, letter);
      
      // check to see if this is a winning guess
//       if(!board.includes('_'))
//       {
//         // Store past guessed words
//         if( localStorage.getItem("guessed") == null)
//           {
//             localStorage.setItem("guessed", selectedWord);
//           }
//         else
//           {
//           localStorage.setItem("guessed", localStorage.getItem("guessed") + " " + selectedWord);
//           }
//         $("#guessed").empty();
//         $("#guessed").append(localStorage.getItem("guessed"));
//         // end game in win state
//         endGame(true);
//       }
    }
  else
    {
      remainingGuesses -= 1;
      if(remainingGuesses >= 0)
        {
          updateMan();
        }
      if(remainingGuesses <= 0)
        {
          // end game in lose state
          endGame(false);
        }
    }
  
  
 
}

function updateWord(positions, letter) // array of positions and a letter
{
  for(var position of positions)
    {
      board[position] = letter;
    }
  updateBoard();
}

function updateMan()
{
  $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) // win is boolean
{
  $("#letters").hide();
  if(win)
    {
      $('#won').show();
    }
  else
    {
      $('#lost').show();
    }
}

function giveHint()
{
  document.querySelector('.hintBtn').style.display = 'none';
  document.querySelector('.hint').style.display = 'inline';  
}







