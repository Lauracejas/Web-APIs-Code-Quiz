var startBtn = document.querySelector("#start");
var timeleft = document.querySelector(".timer");
var secondsLeft = 60;
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//Start the Quiz
startBtn.addEventListener("click", function () {
    console.log("start the game");
    //start the timer
    function setTime() {       
        var timerInterval = setInterval(function () {
           
            secondsLeft--;
            timeleft.textContent = secondsLeft;
            console.log(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
      //  firstQuestion();
    }
    setTime();
});


