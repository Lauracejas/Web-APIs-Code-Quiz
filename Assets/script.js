var startBtn = document.querySelector("#start");
var timeleft = document.querySelector(".timer");
var secondsLeft = 60;
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var questionIndex = 0;
var EndQuiz = document.getElementById("end-quiz");
var clearBtn = document.getElementById("#clear");
var timerInterval;

function setTime() {
    timerInterval = setInterval(function () {

        secondsLeft--;
        timeleft.textContent = secondsLeft;
        //console.log(secondsLeft);
        if (secondsLeft <= 0) {
            quizEnd();
            clearInterval(timerInterval);
            secondsLeft = 0;

        }
    }, 1000);
}
//Start the Quiz
function startQuiz() {

    // hide start screen
    var startScreenEl = document.getElementById("start-quiz");
    startScreenEl.setAttribute("class", "hide");

    // Un-hide questions
    questionsEl.removeAttribute("class");

    setTime();
    firstQuestion();
};


startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
});

//startBtn.onclick = startQuiz;

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

function questionClick(event) {
    if (event.target.value !== questions[questionIndex].answer) {
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }
    questionIndex++;
    if (questionIndex === questions.length) {

        quizEnd();
    } else {
        firstQuestion();
    }
}

function quizEnd() {
    clearInterval(timerInterval);
    EndQuiz.removeAttribute("class");


    //show final score
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = secondsLeft;
    //console.log(finalScore);

    //hide questions
    questionsEl.setAttribute("class", "hide");

}

/************************************************************************************************************************/
function savehighScore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: secondsLeft,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}


function printHighscores() {
    //get scores from localstorage or set to empty array
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];


    highscores.forEach((score) => {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // display on page
        var list = document.getElementById("highscores");
        list.appendChild(liTag);
    });printHighscores();
}

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    savehighScore();
    
});

function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
}

clearBtn.addEventListener("click", function(event){
event.preventDefault();
clearHighscores();
});