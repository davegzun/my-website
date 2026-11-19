  
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
      { text: "use my friends for help", result: "b" },
      { text: "form a plan, then execute", result: "c" },
      { text: "No thoughts, just answer it", result: "d" }
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
    question: "You find $100 on the floor, what do you do with it?",
    answers: [
      { text: "put it in the bank", result: "a" },
      { text: "take my friends out to lunch", result: "b" },
      { text: "Use it on myself", result: "c" },
      { text: "just keep it, no one saw me pocket it", result: "d" }
    ]
  },
  {
    question: "You're going out to enjoy the night, what do you bring?",
    answers: [
      { text: "A book", result: "b" },
      { text: "My friends along", result: "a" },
      { text: "Use the $100 I found earlier", result: "c" },
      { text: "My keys", result: "d" }
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
    answers: ["Wizards of the Coast", "Bandai", "Riot Games", "The Pokémon Company"],
    correct: 3
  },
    {
    question: "Who created the Yu-Gi-Oh! Manga that lead to making its own card game",
    answers: ["Richard Garfield", "Eiichiro Oda", "Kazuki Takahashi", "Dan Green"],
    correct: 2
  },
  {
        question: "True or False: Pot of Greed lets you draw two additional cards ",
    answers: ["True", "False"],
    correct: 0
  },
   {
        question: "What is a term used for a card with a special shiny finish?",
    answers: ["A holographic", "A foil", "A shiny", "A glitter"],
    correct: [0, 1]
  },
   {
        question: "True or False: Base set Pikachu is the most valued card in the first Pokemon set",
    answers: ["True", "False"],
    correct: 1
  },
];

/* ---------- Quiz 3: playstyle quiz ---------- */
const playstyleResults = {
  aggro: { title: "Aggro", text: "You like to take the initiative and put pressure on your opponent from turn one. Fast decks and quick wins are your thing." },
  control: { title: "Control", text: "You're patient and calculated. You answer your opponent's threats one by one, then take over the late game." },
  midrange: { title: "Midrange", text: "You're flexible and well-rounded. You can be fast or slow depending on what the game needs." },
  combo: { title: "Combo", text: "You love finding powerful synergies. You build toward one huge turn where everything clicks." }
};

const playstyleQuestions = [
  {
    question: "It's the start of a match. What's your plan?",
    answers: [
      { text: "Hit hard and fast before they can react", result: "aggro" },
      { text: "Hold back and answer whatever they do", result: "control" },
      { text: "Build a solid board and adapt", result: "midrange" },
      { text: "Set up my pieces for one big turn", result: "combo" }
    ]
  },
  {
    question: "Which sounds like the best feeling?",
    answers: [
      { text: "Winning on turn 4", result: "aggro" },
      { text: "Countering my opponent's best card", result: "control" },
      { text: "Out-trading them with stronger cards", result: "midrange" },
      { text: "Pulling off a perfect combination", result: "combo" }
    ]
  },
  {
    question: "How do you feel about long games?",
    answers: [
      { text: "I'd rather end it quickly", result: "aggro" },
      { text: "The longer the better, I win late", result: "control" },
      { text: "I'm comfortable at any speed", result: "midrange" },
      { text: "Depends on whether my deck came together", result: "combo" }
    ]
  },
  {
    question: "What do you enjoy most about deck building?",
    answers: [
      { text: "Picking the most powerful, cheap cards", result: "aggro" },
      { text: "Finding answers for every threat", result: "control" },
      { text: "Balancing a bit of everything", result: "midrange" },
      { text: "Discovering card synergies", result: "combo" }
    ]
  }
];

/* ---------- Start all three quizzes ---------- */
createQuiz(document.getElementById("quiz-preference"), preferenceResults, preferenceQuestions);
createTrivia(document.getElementById("quiz-trivia"), triviaQuestions);
createQuiz(document.getElementById("quiz-playstyle"), playstyleResults, playstyleQuestions);