// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Apa maksud Obesiti?",
    answers: [
      { text: "Berat badan kurang daripada biasa", correct: false },
      { text: "Seseorang yang tinggi dan kurus", correct: false },
      { text: "Keadaan di mana lemak badan berlebihan terkumpul", correct: true },
      { text: "Hanya makan makanan berlemak", correct: false },
    ],
  },
  {
    question: "Apakah punca utama berlakunya obesiti?",
    answers: [
      { text: "Kurang tidur", correct: false },
      { text: "Pengambilan makanan berlebihan tanpa aktiviti fizikal", correct: true },
      { text: "Makan sayur-sayuran setiap hari", correct: false },
      { text: "Minum air kosong terlalu banyak", correct: false },
    ],
  },
  {
    question: "Antara berikut, manakah cara terbaik untuk mengawal berat badan?",
    answers: [
      { text: "Mengelakkan sarapan pagi", correct: false },
      { text: "Tidur sepanjang hari", correct: false },
      { text: "Makan lewat malam", correct: false },
      { text: "Bersenam secara berkala dan amalkan diet seimbang", correct: true },
    ],
  },
  {
    question: "Apakah risiko kesihatan utama akibat obesiti?",
    answers: [
      { text: "Penyakit jantung dan diabetes", correct: true },
      { text: "Selsema biasa", correct: false },
      { text: "Luka lambat sembuh", correct: false },
      { text: "Kekurangan vitamin", correct: false },
    ],
  },
  {
    question: "Apakah tabiat pemakanan yang sihat untuk mengelak obesiti?",
    answers: [
      { text: "Tidak minum air langsung", correct: false },
      { text: "Hanya makan satu jenis makanan", correct: false },
      { text: "Makan makanan segera setiap hari", correct: false },
      { text: "Kurangkan gula dan lemak, lebihkan buah dan sayur", correct: true },
    ],
  },
];

//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// event listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0

    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()
}

function showQuestion() {
    // reset state 
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
answersContainer.innerHTML = "";

currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.textContent = answer.text
    button.classList.add("answer-btn")

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct

    button.addEventListener("click",selectAnswer)

    answersContainer.appendChild(button)

})
}

function selectAnswer(event) {
    // optimization check
    if(answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    //todo: explain this in a sec
    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct ==="true"){
            button.classList.add("correct")
        } else if (button === selectedButton) {
            button.classList.add("incorrect")
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++

        //check if there are more question or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        } else {
            showResults()
        }
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Sempurna! Anda seorang yang sangat pintar!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Syabas! Anda tahu barangan anda!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Usaha yang baik! Teruskan belajar!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Tidak teruk! Cuba lagi untuk menambah baik!";
    } else {
        resultMessage.textContent = "Teruskan belajar! Anda akan menjadi lebih baik!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
  }