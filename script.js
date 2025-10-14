// Access to DOM Elements
const startBtn = document.getElementById("startQuiz");
const endBtn = document.getElementById("endQuiz");
const welcomeSection = document.getElementById("welcomeSection");
const quizSection = document.getElementById("quizSection");

// ---------- Quiz Data ----------
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Transfer Makeup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0,
  },
  {
    question: "What year was JavaScript created?",
    options: ["1993", "1995", "1997", "1999"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;




// timer logic
let timer;
let timeleft = 15



function startTimer() {
  clearInterval(timer);
  timeleft = 15;
  updateTimerDisplay()

  timer = setInterval(() => {
    timeleft--;
    updateTimerDisplay();
    if(timeleft <=0){
      clearInterval(timer);
      handleNext(true)
    }
  },1000)
} 

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  if(timerEl){
    timerEl.textContent = `Time left: ${timeleft}s`;
    if(timeleft<=5){
      timerEl.style.color = "red";
    }else{
      timerEl.style.color = "black"
    }
  }
}
// ---------- Helpers to render the quiz layout ----------
function renderQuizLayout() {
  // Render the quiz inner HTML (question + form + Next)
  quizSection.innerHTML = `
    <h2 id="question"></h2>
    <div id="timer" class="timer">Time Left: 15s</div>
    <form id="optionsForm" class="options"></form>
    <div class="controls">
      <button id="nextBtn" class="btn" type="button">Next</button>
    </div>
  `;
}

// Utility to get current UI elements (queried fresh)
function getUI() {
  return {
    questionEl: document.getElementById("question"),
    optionsForm: document.getElementById("optionsForm"),
    nextBtn: document.getElementById("nextBtn"),
  };
}

// ---------- Show question----------
function showQuestion() {
  const { questionEl, optionsForm } = getUI();
  const current = quizData[currentQuestion];

  // update question
  questionEl.textContent = `Q${currentQuestion + 1}. ${current.question}`;

  // clear previous options
  optionsForm.innerHTML = "";

  // create radio items
  current.options.forEach((opt, index) => {
    const optionDiv = document.createElement("label");
    optionDiv.className = "option-item";
    optionDiv.innerHTML = `
      <input type="radio" name="option" value="${index}">
      <span>${opt}</span>
    `;
    optionsForm.appendChild(optionDiv);
  });
  startTimer();
}

// ---------- Handle next action ----------
function handleNext(auto = false) {
  clearInterval(timer);

  const selected = document.querySelector("input[name='option']:checked");

  if (!selected && !auto) {
    alert("Please select an answer!");
    return;
  }

  const current = quizData[currentQuestion];
  const selectedAnswer = selected ? parseInt(selected.value) : null;

  if (selectedAnswer === current.correct) score++;

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}


// ---------- Show result----------
function showResult() {
  quizSection.innerHTML = `
    <div class="result-box">
      <h2>🎉 Quiz Completed!</h2>
      <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
      <div style="display:flex; gap:12px; justify-content:center;">
        <button class="btn" id="restartBtn" type="button">Restart Quiz</button>
        <button class="btn" id="homeBtn" type="button">Back to Home</button>
      </div>
    </div>
  `;
  clearInterval(timer);
}

// ---------- Restart quiz  ----------
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  renderQuizLayout();
  showQuestion();
 
}

// ---------- Return to welcome screen ----------
function backToHome() {
  // show welcome, hide quiz
  welcomeSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
  // reset state
  currentQuestion = 0;
  score = 0;
}

// ---------- Start/End handlers ----------
startBtn.addEventListener("click", () => {
  welcomeSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  // render and start
  renderQuizLayout();
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

endBtn.addEventListener("click", () => {
  welcomeSection.innerHTML = `<h2>Thanks for visiting!</h2><p>Come back when you're ready to test your knowledge!</p>`;
});


quizSection.addEventListener("click", (e) => {
  const id = e.target.id;

  if (id === "nextBtn") {
    handleNext();
    return;
  }

  if (id === "restartBtn") {
    restartQuiz();
    return;
  }

  if (id === "homeBtn") {
    // show welcome screen and hide quiz
    backToHome();
    return;
  }
});
