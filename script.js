const words = [
    { word: "Apple", choices: ["Táo", "Chuối", "Cam"], correct: "Táo" },
    { word: "Banana", choices: ["Dưa hấu", "Chuối", "Táo"], correct: "Chuối" },
    { word: "Orange", choices: ["Cam", "Nho", "Lê"], correct: "Cam" }
];

let currentWordIndex = 0;
let score = 0;

const wordElement = document.getElementById('word');
const choicesContainer = document.getElementById('choices');
const scoreElement = document.getElementById('score');

function startGame() {
    currentWordIndex = 0;
    score = 0;
    scoreElement.textContent = `Điểm: ${score}`;
    showWord();
}

function showWord() {
    const currentWord = words[currentWordIndex];
    wordElement.textContent = currentWord.word;
    choicesContainer.innerHTML = '';

    currentWord.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectChoice(choice));
        choicesContainer.appendChild(button);
    });
}

function selectChoice(choice) {
    const currentWord = words[currentWordIndex];
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
        scoreElement.textContent = `Điểm: ${score}`;
    }

    // Chuyển sang câu hỏi tiếp theo sau 1 giây
    setTimeout(() => {
        currentWordIndex++;
        if (currentWordIndex < words.length) {
            showWord();
        } else {
            alert('Kết thúc trò chơi! Bạn đã đạt được ' + score + ' điểm.');
            startGame(); // Bắt đầu lại trò chơi
        }
    }, 1000); // Thay đổi thời gian nếu muốn
}

document.addEventListener('DOMContentLoaded', startGame);