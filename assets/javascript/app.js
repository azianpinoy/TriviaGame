//Basic Variables///////////////////////////////////////////////////
var timer = 30;
var questionIndex = 0;
var questionInterval = null;
var listItemArray = [0, 0, 0, 0];
var correctAnswer = 0;
var isCorrect = null;
var correctCount = 0;
var incorrectCount = 0;
var timeOutCount = 0;

//Quiz Data Storage/////////////////////////////////////////////////
var answersOne = ["Erica", "Diane", "Jessica", "Bojack"];
var answersTwo = ["Improv Comedy", "Scientology", "Latin Kings", "Children of God"];
var answersThree = ["Muffins", "Bag of Mulch", "TV Show Idea", "Wallet"];
var answersFour = ["Suck a dick dumb shits!", "Wubba Lubba Dub Dub!", "That's too much man!", "Neigh Way Jose!"];
var answersFive = ["Horsin Around", "The BoJack Horseman Show", "Secretariat", "Jelly Beans"];
var answersSix = ["Sextina Aquafina", "Jessica Biel", "Naomi Watts", "Kitty Minaj"];
var answersSeven = ["Actress", "Writer", "Social Media Coordinator", "Starbucks Barista"];
var answersEight = ["Wanda Pierce", "Cameron Crowe", "Hank Hippopoulus", "Mr. Peanutbutter"];
var answersNine = ["Boat", "Home", "Baby", "Restaurant"];
var answersTen = ["16", "4", "none", "1"];

var q1 = {
	question: 		"What is the name of Mr.Peanutbutter's mysterious friend who is not	allowed to vote in national elections?",
	answerChoices: 	answersOne,
	gif: 			"assets/images/erica.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Erica'.",
	textIfRight: 	"Correct! Who is this mysterious Erica?!?",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Erica'."
};

var q2 = {
	question: 		"What cult did Todd become involved in?",
	answerChoices: 	answersTwo,
	gif: 			"assets/images/todd.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Improv Comedy'.",
	textIfRight: 	"Correct! Martha have you seen my hashbrowns?",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Improv Comedy'."
};

var q3 = {
	question: 		"What did BoJack 'steal' from Neal McBeal the Navy Seal?",
	answerChoices: 	answersThree,
	gif: 			"assets/images/neal.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Muffins'.",
	textIfRight: 	"Correct! Although, Neal did NOT have dibs on the muffins!",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Muffins'."
};

var q4 = {
	question: 		"What is Sarah Lynn's new catch-phrase?",
	answerChoices: 	answersFour,
	gif: 			"assets/images/catch-phrase.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Suck a dick dumb shits!'.",
	textIfRight: 	"Correct! LOL!",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Suck a dick dumb shits'."	
}

var q5 = {
	question: 		"What family show is BoJack Horseman known for?",
	answerChoices: 	answersFive,
	gif: 			"assets/images/bojack.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Horsin Around'.",
	textIfRight: 	"Correct! Horsin around was a god damn riot!",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Horsin Around'."	
}

var q6 = {
	question: 		"What celebrity did Princess Carolyn help fake an abortion for?",
	answerChoices: 	answersSix,
	gif: 			"assets/images/sextina.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Sextina Aquafina'.",
	textIfRight: 	"Correct! Get dat Fetus, Kill dat Fetus!",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Sextina Aquafina'."	
}

var q7 = {
	question: 		"Which of the following jobs has Diane Nguyen not had?",
	answerChoices: 	answersSeven,
	gif: 			"assets/images/diane.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Actress'.",
	textIfRight: 	"Correct! Diane, Diane, Diane.",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Actress'."	
}

var q8 = {
	question: 		"Who from the show was in a 30 year coma?",
	answerChoices: 	answersEight,
	gif: 			"assets/images/wanda.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Wanda Pierce'.",
	textIfRight: 	"Correct! Some things take time.",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Wanda Pierce'."	
}

var q9 = {
	question: 		"What big purchase does BoJack make during his visit to Tesuque, New Mexico?",
	answerChoices: 	answersNine,
	gif: 			"assets/images/awesome.gif",
	textIfWrong: 	"Wrong! The correct answer is 'Boat'.",
	textIfRight: 	"Correct! She's a good girl... or is she a bad girl?",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is 'Boat'."	
}

var q10 = {
	question: 		"What is the adequate amount of locos?",
	answerChoices: 	answersTen,
	gif: 			"assets/images/locos.gif",
	textIfWrong: 	"Wrong! The correct answer is '16'.",
	textIfRight: 	"Correct! That's four 4Locos.",
	textIfTimeOut: 	"Time out! You need to speed up! The correct answer is '16'."	
}

var quizArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

//Move to Answer Screen Function//////////////////////////////////////
function answerScreen(){
	stopInterval();
	
	if(timer === 0){
		timeOutCount++;
		$("#top-div").html(quizArray[questionIndex].textIfTimeOut);	
	}
	else if (isCorrect == true){
		correctCount++;
		$("#top-div").html(quizArray[questionIndex].textIfRight);
	}
	else{
		incorrectCount++;
		$("#top-div").html(quizArray[questionIndex].textIfWrong);	
	}

	var img = $("#mid-div").html("<img id='gif'>");
	$("#gif").attr("src", quizArray[questionIndex].gif)

	if(questionIndex + 1 == quizArray.length){
		setTimeout(endScreen, 1000 * 5);
	}

	timer = 30;
	questionIndex++;
	listItemArray = [0, 0, 0, 0];

	setTimeout(questionScreen, 1000 * 5);

} 

//Stop Timer Interval Function////////////////////////////////////////
function stopInterval(){
	clearInterval(questionInterval);
}

//Timer Function/////////////////////////////////////////////////////
function timerCountdown(){

	if(timer === 0){
		stopInterval();
		answerScreen();
	}
	else{
	timer--;
	$("#bot-div").html("Time Remaining = " + timer + " seconds");
	}
}

//Question to HTML Function///////////////////////////////////////////
function showQuestion(){
	$("#top-div").html(quizArray[questionIndex].question);
}

//Append Answers Function////////////////////////////////////////////
function showAnswers(){
	$("#mid-div").html("<ul id='multiple-choices'></ul>");

	var randNum = Math.floor(Math.random() * 3);

	listItemArray[randNum] = quizArray[questionIndex].answerChoices[0];
	correctAnswer = randNum;

    var x = 1;

	for(var i = 0; i <= 3; i++){
		if(listItemArray[i] == 0){
			listItemArray[i] = quizArray[questionIndex].answerChoices[x];
			x++;
		}
	}

	for(var j = 0; j <= 3; j++){
		var activeListItem = $("<li></li>");

		activeListItem.html(listItemArray[j]);

		$("#multiple-choices").append(activeListItem);
		
		if(correctAnswer == j){
			activeListItem.attr("id", "rightChoice")	
		}
		else{
			activeListItem.attr("class", "wrongChoice")
		}
	}

	$("#rightChoice").on("click", function(){
	isCorrect = true;
	answerScreen();
	});

	$(".wrongChoice").on("click", function(){
	isCorrect = false;
	answerScreen();
	});
}

//Start Button//////////////////////////////////////////////////////
function questionScreen(){
	showQuestion();

	showAnswers();

	$("#bot-div").html("Time Remaining = " + timer + " seconds");
	questionInterval = setInterval(timerCountdown, 1000);	

}



//Reset Game////////////////////////////////////////////////////////
function resetGame(){
	var startButton = $('<button id= "start-button" type="button" class="btn btn-primary btn-lg">Start Game</button>').on("click", questionScreen);

	$("#mid-div").html(startButton);
}

function restartGame(){
	timer = 30;
	questionIndex = 0;
	questionInterval = null;
	listItemArray = [0, 0, 0, 0];
	correctAnswer = 0;
	isCorrect = null;
	correctCount = 0;
	incorrectCount = 0;
	timeOutCount = 0;

	$("#top-div").html("");
	$("#bot-div").html("");

	resetGame();
}

//End Screen Function//////////////////////////////////////////////
function endScreen(){
	$("#top-div").html("Game Results:");
	
	$("#mid-div").html("<div>Correct Answers: " + correctCount + "</div>");
	$("#mid-div").append("<div>Incorrect Answers: " + incorrectCount + "</div>");
	$("#mid-div").append("<div>Unanswered Questions: " + timeOutCount + "</div>");

	var restartButton = $("<button>Restart Game</button>");
	$("#bot-div").html(restartButton);
	restartButton.on("click", restartGame);

	
}


//Start of Process////////////////////////////////////////////////
resetGame();




