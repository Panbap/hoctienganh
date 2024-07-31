const words = [
    { word: "Apple", choices: ["Táo", "Chuối", "Cam"], correct: "Táo" },
    { word: "Banana", choices: ["Dưa hấu", "Chuối", "Táo"], correct: "Chuối" },
    { word: "Orange", choices: ["Cam", "Nho", "Lê"], correct: "Cam" },
    { word: "Grapes", choices: ["Nho", "Lê", "Cam"], correct: "Nho" } // Đổi câu hỏi để không trùng lặp
];

let currentWordIndex = 0;
let score = 0;
let highScore = 0;
let playerName = '';
let shuffledWords = []; // Mảng chứa các câu hỏi đã xáo trộn

const wordElement = document.getElementById('word');
const choicesContainer = document.getElementById('choices');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startButton = document.getElementById('start-button');
const gameContent = document.getElementById('game-content');
const playerNameInput = document.getElementById('player-name');
const playerInfo = document.getElementById('player-info');
const welcomeMessage = document.getElementById('welcome-message');

// Hàm xáo trộn mảng
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Hàm xáo trộn các câu hỏi
function shuffleQuestions() {
    shuffledWords = [...words]; // Tạo bản sao của mảng câu hỏi
    shuffle(shuffledWords);    // Xáo trộn mảng câu hỏi
}

// Hàm xáo trộn các lựa chọn trong câu hỏi
function shuffleChoices(choices) {
    shuffle(choices);
}

function loadHighScore() {
    const storedHighScore = localStorage.getItem('highScore');
    const storedPlayerName = localStorage.getItem('playerName');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore, 10);
        playerName = storedPlayerName || 'Người chơi';
    }
    highScoreElement.textContent = `Điểm cao nhất: ${playerName}: ${highScore}`;
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        localStorage.setItem('playerName', playerName);
        highScoreElement.textContent = `Điểm cao nhất: ${playerName}: ${highScore}`;
    }
}

function startGame() {
    playerName = playerNameInput.value || 'Người chơi'; // Lấy tên người chơi từ input
    if (!playerName) {
        alert('Vui lòng nhập tên của bạn!');
        return;
    }
    
    // Xáo trộn các câu hỏi trước khi bắt đầu trò chơi
    shuffleQuestions();
    
    // Ẩn thông tin người chơi và điểm số cao nhất
    playerInfo.classList.add('hidden');
    highScoreElement.classList.add('hidden');
    gameContent.classList.remove('hidden');
    
    currentWordIndex = 0;
    score = 0;
    showWord();
}

function showWord() {
    const currentWord = shuffledWords[currentWordIndex];
    wordElement.textContent = currentWord.word;
    choicesContainer.innerHTML = '';

    // Xáo trộn các lựa chọn
    const shuffledChoices = [...currentWord.choices];
    shuffleChoices(shuffledChoices);

    shuffledChoices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectChoice(choice));
        choicesContainer.appendChild(button);
    });

    // Cập nhật điểm số hiện tại
    if (scoreElement) {
        scoreElement.textContent = `Điểm: ${score}`;
    }
}

function selectChoice(choice) {
    const currentWord = shuffledWords[currentWordIndex];
    const buttons = document.querySelectorAll('.choice');

    buttons.forEach(button => {
        if (button.textContent === currentWord.correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Vô hiệu hóa tất cả các lựa chọn sau khi chọn
    });

    // Cập nhật điểm số nếu lựa chọn đúng
    if (choice === currentWord.correct) {
        score++;
    }

    // Lưu điểm số cao nhất nếu cần
    saveHighScore();

    // Chuyển sang câu hỏi tiếp theo sau 1 giây
    setTimeout(() => {
        currentWordIndex++;
        if (currentWordIndex < shuffledWords.length) {
            showWord();
        } else {
            alert(`Kết thúc trò chơi! Bạn đã đạt được ${score} điểm.`);
            gameContent.classList.add('hidden');
            playerInfo.classList.remove('hidden');
            highScoreElement.classList.remove('hidden');
            playerNameInput.value = '';
            loadHighScore(); // Tải điểm cao nhất sau khi trò chơi kết thúc
        }
    }, 1000); // Thay đổi thời gian nếu muốn
}

document.addEventListener('DOMContentLoaded', () => {
    loadHighScore(); // Tải điểm cao nhất khi trang được tải
    startButton.addEventListener('click', startGame);
});