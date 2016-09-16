var letter = function(userGuess, lettersInWord, lettersGuessed){
	this.lettersInWord = [];
	this.lettersGuessed = [];
	this.matchedLetters = [];
	this.userGuess = '';
	this.updateMatchedletters = function(userGuess){
		for (var i=0; i <this.lettersInWord.length; i++){
			if((userGuess == this.lettersInWord[i]) &&(this.matchedLetters.indexOf(answer) == -1)){
				this.matchedLetters.push(userGuess);
			else
				this.lettersGuessed.push(userGuess);
		}
	}
}