var startBtn = document.querySelector("#start");
var timeleft = document.querySelector(".timer");
var secondsLeft = 60;
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var questionIndex = 0;

//Start the Quiz
function startQuiz() {
    //console.log("start the game");
    
    // hide start screen
    var startScreenEl = document.getElementById("start-quiz");
    startScreenEl.setAttribute("class", "hide");

    // Un-hide questions
    questionsEl.removeAttribute("class");

    //start the timer
    function setTime() {
        var timerInterval = setInterval(function () {

            secondsLeft--;
            timeleft.textContent = secondsLeft;
            //console.log(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        
    }
    setTime();
    firstQuestion();
};


function firstQuestion() {

    var questionNext = questions[questionIndex];
    console.log(questionIndex);
    console.log(questionNext);
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = questionNext.title;
    choicesEl.innerHTML = "";

    //loop over choices
    questionNext.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + "." + choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);
    });
}

function questionClick() {
    if (this.value !== questions[questionIndex].answer) {
       // secondsLeft -= 10;
       console.log("wrong");
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }

    }
    questionIndex++;
    if (questionIndex === questions.length) {
        console.log("game over");
      // quizEnd();
    } else {
        firstQuestion();
    }
}

function quizEnd() {
    
}

startBtn.onclick = startQuiz;

