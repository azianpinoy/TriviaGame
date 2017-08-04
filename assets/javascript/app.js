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

var quizArray = [q1, q2, q3];

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




