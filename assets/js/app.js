var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

var questions =
    [
        {
            question: "What does HTML stand for?",
            choiceA: "Hyper Text Markeup Language",
            choiceB: "Hype Test Matter Llama",
            choiceC: "Help There's My Leg",
            correct: "A"
        },
        {
            question: "What does CSS stand for?",
            choiceA: "Canned Sea Salt",
            choiceB: "Cascading Style Sheets",
            choiceC: "Cascading Styled Sheeps",
            correct: "B"
        },
        {
            question: "What does JS stand for?",
            choiceA: "JambaShip",
            choiceB: "JuiceShop",
            choiceC: "JavaScript",
            correct: "C"
        }
    ];

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10;
var gaugeWidth = 150; 
var gaugeUnit = gaugeWidth / questionTime;
var timer = 0;
var score = 0;

function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

function renderProgress() {

    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

start.addEventListener("click", startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    timer = setInterval(renderCounter,1000); // 1000ms = 1s
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }
    else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }
        else{
            // end the quiz and show the score
            clearInterval(timer);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }
    else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }
    else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
