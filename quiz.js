  
  const results = {
    a: { title: "Magic: The Gathering",  text: "You enjoy the classic that started it all." },
    b: { title: "Pokemon TCG",   text: "Wether you enjoy playing the video games, the creatures that inhabit their world, or collect a specific pokemon. this game is right for you." },
    c: { title: "Riftbound",   text: "You enjoyed the legends that you played in the game League of Legends, and want to battle alongside them through conquering lands." },
    d: { title: "One Piece", text: "You want to be free!." }
    // To add a fifth result, add:  e: { title: "...", text: "..." }
  };

  const questions = [
    {
      question: "How do you view yourself in a game?",
      answers: [
        { text: "I want to explore different regions, enjoying the lore that goes behind the scenes",  result: "a" },
        { text: "I ask my companions to help me win against other trainers",     result: "b" },
        { text: "With my champion, we will defeat our foes",  result: "c" },
        { text: "I want to be free!",   result: "d" }
      ]
    },
    {
      question: "Pick a tool for the day:",
      answers: [
        { text: "A map",        result: "a" },
        { text: "A toolbox",    result: "b" },
        { text: "A sketchbook", result: "c" },
        { text: "A phone",      result: "d" }
      ]
    },
    {
      question: "What do people say about you?",
      answers: [
        { text: "You're always up for something new", result: "a" },
        { text: "You always finish what you start",   result: "b" },
        { text: "You have the best ideas",            result: "c" },
        { text: "You make everyone feel welcome",     result: "d" }
      ]
    }
  ];

  const quizScreen   = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const progressEl   = document.getElementById("progress");
  const questionEl   = document.getElementById("question");
  const answersEl    = document.getElementById("answers");
  const titleEl      = document.getElementById("result-title");
  const textEl       = document.getElementById("result-text");
  const restartBtn   = document.getElementById("restart");


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

