  
  /* ---------- Quiz 1: preference quiz ---------- */
function createQuiz(root, results, questions) {
  const quizScreen   = root.querySelector(".quiz-screen");
  const resultScreen = root.querySelector(".result-screen");
  const progressEl   = root.querySelector(".quiz-screen .progress");
  const questionEl   = root.querySelector(".question");
  const answersEl    = root.querySelector(".answers");
  const titleEl      = root.querySelector(".result-title");
  const textEl       = root.querySelector(".result-text");
  const restartBtn   = root.querySelector(".restart");

  let current = 0;
  let tally = {};

  function resetTally() {
    tally = {};
    Object.keys(results).forEach(function (key) { tally[key] = 0; });
  }

  function showQuestion() {
    const q = questions[current];
    progressEl.textContent = "Question " + (current + 1) + " of " + questions.length;
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach(function (answer) {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.addEventListener("click", function () { pickAnswer(answer.result); });
      answersEl.appendChild(btn);
    });
  }

  function pickAnswer(resultKey) {
    tally[resultKey]++;
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    let winner = Object.keys(tally)[0];
    Object.keys(tally).forEach(function (key) {
      if (tally[key] > tally[winner]) winner = key;
    });

    titleEl.textContent = results[winner].title;
    textEl.textContent = results[winner].text;
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
  }

  restartBtn.addEventListener("click", function () {
    current = 0;
    resetTally();
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
  });

  resetTally();
  showQuestion();
}

/* ---------- Quiz 2: knowledge quiz ---------- */
function createTrivia(root, questions) {
  const quizScreen   = root.querySelector(".quiz-screen");
  const resultScreen = root.querySelector(".result-screen");
  const progressEl   = root.querySelector(".quiz-screen .progress");
  const questionEl   = root.querySelector(".question");
  const answersEl    = root.querySelector(".answers");
  const titleEl      = root.querySelector(".result-title");
  const textEl       = root.querySelector(".result-text");
  const restartBtn   = root.querySelector(".restart");

  let current = 0;
  let score = 0;

  function showQuestion() {
    const q = questions[current];
    progressEl.textContent = "Question " + (current + 1) + " of " + questions.length;
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach(function (text, index) {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.addEventListener("click", function () { pickAnswer(index); });
      answersEl.appendChild(btn);
    });
  }

  function pickAnswer(index) {
    if (index === questions[current].correct) score++;
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    titleEl.textContent = "You scored " + score + " out of " + questions.length;
    textEl.textContent = score === questions.length
      ? "Perfect score!"
      : "Nice try! Take it again to improve.";
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
  }

  restartBtn.addEventListener("click", function () {
    current = 0;
    score = 0;
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
  });

  showQuestion();
}

/* ---------- Data ---------- */
const preferenceResults = {
  a: { title: "Magic: The Gathering", text: "You enjoy the classic that started it all." },
  b: { title: "Pokemon TCG", text: "Whether you enjoy playing the video games, the creatures that inhabit their world, or collect a specific pokemon, this game is right for you." },
  c: { title: "Riftbound", text: "You enjoyed the legends that you played in the game League of Legends, and want to battle alongside them through conquering lands." },
  d: { title: "One Piece", text: "You want to be free!" }
};

const preferenceQuestions = [
  {
    question: "How do you view yourself in a game?",
    answers: [
      { text: "I want to explore different regions, enjoying the lore that goes behind the scenes", result: "a" },
      { text: "I ask my companions to help me win against other trainers", result: "b" },
      { text: "With my champion, we will defeat our foes", result: "c" },
      { text: "I want to be free!", result: "d" }
    ]
  },
  {
    question: "How do you think when you see a problem:",
    answers: [
      { text: "There are many angles I can think about to answer it", result: "a" },
      { text: "No thoughts, just answer it", result: "b" },
      { text: "A sketchbook", result: "c" },
      { text: "A phone", result: "d" }
    ]
  },
  {
    question: "How do you want to see your opponent?",
    answers: [
      { text: "A rival,", result: "b" },
      { text: "A friend that I want to create good memories with", result: "a" },
      { text: "Just the competition", result: "c" },
      { text: "You make everyone feel welcome", result: "d" }
    ]
  },
  {
    question: "How do you want to see your opponent?",
    answers: [
      { text: "A rival,", result: "b" },
      { text: "A friend that I want to create good memories with", result: "a" },
      { text: "Just the competition", result: "c" },
      { text: "You make everyone feel welcome", result: "d" }
    ]
  },
  {
    question: "How do you want to see your opponent?",
    answers: [
      { text: "A rival,", result: "b" },
      { text: "A friend that I want to create good memories with", result: "a" },
      { text: "Just the competition", result: "c" },
      { text: "You make everyone feel welcome", result: "d" }
    ]
  }
];

const triviaQuestions = [
  {
    question: "What does TCG stand for?",
    answers: ["Total Card Game", "Trading Card Game", "Team Card Game", "Tactical Card Game"],
    correct: 1
  },
  {
    question: "Which company makes the Pokémon TCG?",
    answers: ["Wizards of the Coast", "The Pokémon Company", "Bandai", "Riot Games"],
    correct: 1
  }
  // Add your own questions here. "correct" is the position of the
  // right answer, counting from 0.
];

/* ---------- Start both quizzes ---------- */
createQuiz(document.getElementById("quiz-preference"), preferenceResults, preferenceQuestions);
createTrivia(document.getElementById("quiz-trivia"), triviaQuestions);