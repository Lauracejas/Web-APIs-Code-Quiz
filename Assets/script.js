var startBtn = document.querySelector("#start");
var timeleft = document.querySelector(".timer");
var secondsLeft = 60; //questions.length * 10;
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var questionIndex = 0;
var EndQuiz = document.getElementById("end-quiz");
var clearBtn = document.getElementById("#clear");

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
    if (this.value !== questions[questionIndex]) {
        secondsLeft -= 10;
        console.log("wrong");
        if (secondsLeft <= 0) {

            quizEnd();
        }

    }
    questionIndex++;
    if (questionIndex === questions.length) {
        console.log("game over");
        quizEnd();
    } else {
        firstQuestion();
    }
}

function quizEnd() {
    EndQuiz.removeAttribute("class");

    //show final score
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = secondsLeft;


    //hide questions
    questionsEl.setAttribute("class", "hide");

}

submitBtn.addEventListener("submit", function (event) {
    event.preventDefault();
    savehighScore();
});

function savehighScore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: secondsLeft,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}


//clearBtn.onclick = clearHighscores();
startBtn.onclick = startQuiz;