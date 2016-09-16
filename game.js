var inquirer = require('inquirer');

var hangmanGame = {
	// wordsToPick: {[
	// 	"giraffe", 
	// 	"monkey",
	// 	"frog",
	// 	"tiger", 
	// 	"lion",
	// 	"zebra", 
	// 	"iguana", 
	// 	"alligator",
	// 	"dolphin", 
	// 	"whale",
	// 	"rhino"
	// ]}

	wordInPlay: "zebra",
	lettersOfTheWord: ['z', 'e', 'b', 'r', 'a'],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	letterGuessed: null,
	wins: 0,
	setupGame: function() {
		// ---Pick a random word
		// var objKeys = Object.keys(this.wordsToPick[i]);
		// this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

		// this.lettersOfTheWord = this.wordInPlay.split('');
		inquirer.prompt([{
			type: "input",
			name: "input",
			message: "Guess a letter"
			}])
		this.rebuildWordView();
		this.processUpdateTotalGuesses();
		this.updatePage();
	},
	updatePage: function(letter) {
		if (this.guessesLeft == 0){
			this.restartGame();
		}else{
			inquirer.prompt([{
			type: "input",
			name: "input",
			message: "Guess a letter"
			}]).then(function(answer) {

// 			answer.input = function() {
// 	//hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
// 	hangmanGame.updatePage(hangmanGame.letterGuessed);
// }

			this.updateGuesses(letter);

			this.updateMatchedLetters(letter);

			this.rebuildWordView();

			if (this.updateWins() == true){
				this.restartGame();
			}
		})
		}

	},
	updateGuesses: function(letter){

		if ((this.guessedLetters.indexOf(letter) == -1) && (this.lettersOfTheWord.indexOf(letter) == -1)){
			
			this.guessedLetters.push(letter);

			this.guessesLeft--;

			console.log(this.guessesLeft);

			console.log(this.guessedLetters.join(', '));
		}
	},
	processUpdateTotalGuesses: function() {
		this.totalGuesses = this.lettersOfTheWord.length + 5;
		this.guessesLeft = this.totalGuesses;

		console.log(this.guessesLeft);
	},
	updateMatchedLetters: function(letter){
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) == -1)){
				this.matchedLetters.push(letter);
			};
		};
	},
	rebuildWordView: function() {
		var wordView = "";

		for(var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) != -1){
				wordView += this.lettersOfTheWord[i];				
			}else{
				wordView += '&nbsp;_&nbsp;';
			}
		}

		console.log(wordView);

	},
	restartGame : function(){
		//document.querySelector('#guessed-letters').innerHTML = '';
		this.wordInPlay = null;
		this.lettersOfTheWord = [];
		this.matchedLetters = [];
		this.guessedLetters = [];
		this.guessesLeft = 0;
		this.totalGuesses = 0;
		this.letterGuessed = null;
		this.setupGame();
		this.rebuildWordView();
	},
	updateWins: function() {

		//this won't work for words with double or triple letters
			//var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
			//this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

		if (this.matchedLetters.length == 0){
			var win = false;
		}else{
			var win = true
		}
		
		for (var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1){
				win = false;
			}
		}

		if (win == true){
			this.wins =  this.wins + 1;

			console.log("you win!");
			
			return true;
		}else{
			return false;
		}
	}
};

hangmanGame.setupGame();

