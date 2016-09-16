var inquirer = require("inquirer");

function HangMan(word, letters) {
	this.word = "";
	this.letters = [];
	this.matchedLetters = [];
	this.guessedLetters = [];
	this.guessesLeft = 10;
	this.totalGuesses = 0;
	this.letterGuessed = null;
	this.wins = 0;
	//this.remainingPieces = word.split(' ');
}

HangMan.prototype.isFinished = function() {
	return this.guessesLeft == 0;


HangMan.prototype.print = function() {
	console.log(this.word);
}
}

HangMan.prototype.progress = function(cb) {
	var self = this;
	//var nextLetter = this.guessesLeft.shift();
	for(var i=10; i > -1; i--) {
		if (i>0) {
		inquirer.prompt([{
			type: "input",
			name: "answer",
			message: "Guess a letter"
		}]).then(function(answer){
			updateMatchedLetters(answer);
			updateGuesses(answer);
			processUpdateTotalGuesses()
			rebuildWordView()
			cb();
		})
		}
		else{this.isFinished();
		//cb();
		}
	}
}

HangMan.prototype.play = function(cb) {
	var self = this;
	if(this.isFinished()) {
		cb();
	} else {
		this.progress(function() {
			self.play(cb);
		});
	}
}

function updateGuesses(answer){
		if ((this.guessedLetters.indexOf(answer) == -1) && (this.lettersOfTheWord.indexOf(answer) == -1)){			
			this.guessedLetters.push(answer);
			this.guessesLeft--;
			console.log(this.guessesLeft);
			console.log(this.guessedLetters.join(', '));
		}
	};
function processUpdateTotalGuesses() {
		this.totalGuesses = this.lettersOfTheWord.length + 5;
		this.guessesLeft = this.totalGuesses;
		console.log(this.guessesLeft);
	};
function updateMatchedLetters(answer){
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			if ((answer === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(answer) == -1)){
				this.matchedLetters.push(answer);
			};
		};
	};
function rebuildWordView() {
		var wordView = "";
		for(var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) != -1){
				wordView += this.lettersOfTheWord[i];				
			}else{
				wordView += '';
			}
	}
		console.log(wordView);
	};

var hangman = new HangMan("zebra", ['z', 'e', 'b', 'r', 'a']);
hangman.play()
//(function() {
//	hangman.print();	
//});