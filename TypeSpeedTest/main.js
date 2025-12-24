const words = [
  "apple",
  "Dragonfruit",
  "elephant",
  "Falcon",
  "Jackfruit",
  "kangaroo",
  "Nectarine",
  "octopus",
  "strawberry",
  "Tomato",
  "umbrella",
  "Vanilla",
  "watermelon",
  "Xylophone",
  "yak",
  "Zebra",
  "algorithm",
  "Binary",
  "compiler",
  "Database",
  "Encryption",
  "Framework",
  "Gigabyte",
  "Hyperlink",
  "Interface",
  "JavaScript",
  "Kernel",
  "Logic",
  "Matrix",
  "Neural",
  "Optimization",
  "Protocol",
  "Query",
  "Runtime",
  "Syntax",
  "Thread",
  "Unicode",
  "Variable",
  "Workflow",
  "Xenon",
  "Yield",
  "Zero",
  "Astrophysics",
  "Biochemistry",
  "Cryptography",
  "Differentiation",
  "Ecosystem",
  "Fluctuation",
  "Geothermal",
  "Hydrology",
  "Isotope",
  "Jurisdiction",
  "Kaleidoscope",
  "Linguistics",
  "Metamorphosis",
  "Nanotechnology",
  "Oscillation",
  "Photosynthesis",
  "Quadratic",
  "Renaissance",
  "Symbiosis",
  "Thermodynamics",
  "Ultraviolet",
  "Volcano",
  "Wavelength",
  "Xenophobia",
  "Yearning",
  "Zephyr",
  "abacus",
  "balloon",
  "candle",
  "dolphin",
  "engine",
  "forest",
  "garden",
  "house",
  "island",
  "jungle",
  "kite",
  "lamp",
  "mountain",
  "notebook",
  "orange",
  "pencil",
  "queen",
  "river",
];
let level = "Medium"; //easy,medium,hard.. medium by default
let currentScore = 0;
let totalScore = 30;
let time = -1;
let duration; // for setInterval

let levelType = document.querySelector(".level-type");
let levelDuration = document.querySelector(".level-duration");
let currScoreElement = document.querySelector(".current-score");
let totalScoreElement = document.querySelector(".total-score");

let timeLeftElement = document.querySelector(".time-left");

let theWordElement = document.querySelector(".the-word");

//On click buttons:

let easyButton = document.querySelector(".easy");
let mediumButton = document.querySelector(".medium");
let hardButton = document.querySelector(".hard");

Initialize();
// FUNCTIONS
easyButton.onclick = () => {
  InitializeEasyValues();
  RenderUI();
};

mediumButton.onclick = () => {
  InitializeDefaultValues();
  RenderUI();
};

hardButton.onclick = () => {
  InitializeHardValues();
  RenderUI();
};
function Initialize() {
  InitializeDefaultValues();
  fillWords();
  RenderUI();
}
function InitializeDefaultValues() {
  level = "Medium";
  currentScore = 0;
  time = 3;
}

function InitializeEasyValues() {
  level = "Easy";
  time = 5;
  currentScore = 0;
}
function InitializeHardValues() {
  level = "Hard";
  time = 2;
  currentScore = 0;
}
function RenderUI() {
  levelType.textContent = `[${level}]`;
  levelDuration.textContent = `[${time}]`;
  currScoreElement.textContent = `${currentScore}`;
  timeLeftElement.textContent = `${time}`;
}

// Fill Words

function fillWords() {
  let wordsDiv = document.querySelector(".words");
  for (let index = 0; index < words.length; index++) {
    let wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    wordSpan.textContent = words[index];
    wordsDiv.appendChild(wordSpan);
  }
}

// Input Field Logic

let inputFieldElement = document.querySelector(".input-word");

let gameStarted = false;
inputFieldElement.oninput = () => {
  hideEndGameElement();
  fireTime();
  fireRandomWord();
  console.log(theWordElement.textContent);
  if (inputFieldElement.value === theWordElement.textContent) {
    clearInterval(duration);
    gameStarted = false;
    fireTime();
    increaseScore();
    if (currentScore === totalScore) {
      endGame();
      return;
    }
    clearField();
    fireRandomWord();
  }
};

function InitializeLevelValues() {
  if (level === "Easy") {
    InitializeEasyValues();
  } else if (level === "Medium") {
    InitializeDefaultValues();
  } else {
    InitializeHardValues();
  }
}

function endGame() {
  clearInterval(duration);
  showEndGameElement();
  currentScore = 0;
  RenderUI();
  clearField();
  resetWord();
  gameStarted = false;
}

function resetWord() {
  theWordElement.textContent = "Type To Start";
}
function increaseScore() {
  currentScore++;
  currScoreElement.textContent = `${currentScore}`;
}
function fireTime() {
  console.log("Fire time function init");
  if (gameStarted === true) return;
  console.log("fire time function gamestarted is false");
  let tempTime = time;
  duration = setInterval(() => {
    console.log("temp" + tempTime);
    console.log(time);
    tempTime--;
    if (tempTime < 0) {
      clearInterval(duration);
      timeLeftElement.textContent = time;
      endGame();
    } else {
      timeLeftElement.textContent = tempTime;
    }
  }, 1000);
}

let showEndElement = document.querySelector(".end-game");
function showEndGameElement() {
  if (currentScore === totalScore) {
    showEndElement.classList.add("win");
  } else {
    showEndElement.classList.add("lose");
  }
  showEndElement.innerHTML = `GAME ENDED.. YOUR SCORE: <span class="current-score">${currentScore}</span>/30;
`;
}

function hideEndGameElement() {
  showEndElement.classList.remove("win");
  showEndElement.classList.remove("lose");
  showEndElement.innerHTML = "";
}

function clearField() {
  inputFieldElement.value = "";
}

function fireRandomWord() {
  if (gameStarted === false) {
    const randomNumber = Math.floor(Math.random() * words.length);
    theWordElement.textContent = words[randomNumber];
  }
  gameStarted = true;
}
