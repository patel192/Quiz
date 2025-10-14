const quizData = [
  {
    question: "Which HTML tag is used to display the largest heading?",
    options: ["<h3>", "<heading>", "<h1>", "<head>"],
    correct: 2,
  },
  {
    question:
      "Which attribute is used in HTML to provide a unique name to an element?",
    options: ["class", "id", "style", "name"],
    correct: 1,
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "background"],
    correct: 2,
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correct: 2,
  },
  {
    question: "How can you make a numbered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<dl>"],
    correct: 1,
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "Both // and /* */"],
    correct: 3,
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["alt", "title", "src", "href"],
    correct: 0,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Style System",
    ],
    correct: 1,
  },
  {
    question:
      "Which JavaScript method is used to write text into an HTML document?",
    options: [
      "document.write()",
      "console.log()",
      "window.print()",
      "innerText()",
    ],
    correct: 0,
  },
];
// ---------- DOM Elements ----------
const startBtn = document.getElementById("startQuiz");
const endBtn = document.getElementById("endQuiz");
const welcomeSection = document.querySelector(".welcome");
const quizSection = document.getElementById("quizSection");
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

let currentQuestion = 0;
let score = 0;

// ---------- Start the Quiz ----------
startBtn.addEventListener("click", () => {
  welcomeSection.style.display = "none";
  quizSection.style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

// ---------- Exit Quiz ----------
endBtn.addEventListener("click", () => {
  welcomeSection.innerHTML = "<h2>Maybe next time! 👋</h2>";
});

// ---------- Show Question ----------
function showQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${currentQuiz.question}`;
  optionsContainer.innerHTML = "";

  currentQuiz.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(btn);
  });
}

// ---------- Handle Answer ----------
function selectAnswer(selectedIndex) {
  const currentQuiz = quizData[currentQuestion];
  const correctIndex = currentQuiz.correct;
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach(btn => btn.disabled = true);

  optionButtons.forEach((btn, index) => {
    if (index === correctIndex) btn.classList.add("correct");
    else if (index === selectedIndex && index !== correctIndex)
      btn.classList.add("wrong");
  });

  if (selectedIndex === correctIndex) score++;
}

// ---------- Next Button ----------
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) showQuestion();
  else showResult();
});

// ---------- Show Result ----------
function showResult() {
  quizSection.innerHTML = `
    <div class="result-box">
      <h2>🎉 Quiz Completed!</h2>
      <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
      <button class="btn" id="restartBtn">Restart Quiz</button>
    </div>
  `;

  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", restartQuiz);
}

// ---------- Restart Quiz ----------
function restartQuiz() {
  // Reset quizSection to the normal quiz layout
  quizSection.innerHTML = `
    <h2 id="question"></h2>
    <div id="options" class="options"></div>
    <div class="controls">
      <button id="nextBtn" class="btn">Next</button>
    </div>
  `;

  // Reconnect elements and reset state
  questionEl = document.getElementById("question");
  optionsContainer = document.getElementById("options");
  nextBtn = document.getElementById("nextBtn");

  currentQuestion = 0;
  score = 0;

  // Show the first question immediately
  showQuestion();

  // Add event listener for the new Next button
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) showQuestion();
    else showResult();
  });
}

