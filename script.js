// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    
    // Меняем цвет интерфейса на розовый
    tg.setBackgroundColor('#fff5f7');
    tg.setHeaderColor('#ff1744');
}

// Управление экранами
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Прокручиваем вверх
    setTimeout(() => {
        document.querySelector('.container').scrollTop = 0;
    }, 50);
}

// Слушатели для кнопок главного экрана
document.getElementById('btn-confession').addEventListener('click', () => {
    showScreen('screen-confession');
    createHeartParticles(20);
});

document.getElementById('btn-gallery').addEventListener('click', () => {
    showScreen('screen-gallery');
    createHeartParticles(15);
});

document.getElementById('btn-quiz').addEventListener('click', () => {
    showScreen('screen-quiz');
    resetQuiz();
});

// Кнопки "Назад"
document.getElementById('btn-back-confession').addEventListener('click', () => {
    showScreen('screen-main');
});

document.getElementById('btn-back-gallery').addEventListener('click', () => {
    showScreen('screen-main');
});

document.getElementById('btn-back-quiz').addEventListener('click', () => {
    showScreen('screen-main');
});

// Викторина
let quizAnswers = {};

document.querySelectorAll('.quiz-opt').forEach(button => {
    button.addEventListener('click', function() {
        const question = this.closest('.quiz-question');
        const isCorrect = this.dataset.correct === 'true';
        const questionId = question.id;
        
        // Отключаем все кнопки на этом вопросе
        question.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.disabled = true;
            if (btn === this) {
                if (isCorrect) {
                    btn.classList.add('correct');
                    quizAnswers[questionId] = true;
                } else {
                    btn.classList.add('incorrect');
                    quizAnswers[questionId] = false;
                }
            }
        });
        
        // Если ответлены все вопросы, показываем результаты
        if (Object.keys(quizAnswers).length === 3) {
            setTimeout(showQuizResults, 1500);
        }
    });
});

function showQuizResults() {
    const correct = Object.values(quizAnswers).filter(v => v).length;
    const total = Object.keys(quizAnswers).length;
    
    document.querySelectorAll('.quiz-question').forEach(q => {
        q.style.display = 'none';
    });
    
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');
    
    let resultText = '';
    if (correct === 3) {
        resultText = `Отлично! 🎉 Ты знаешь меня на 100%! Значит, это настоящая любовь! 💕`;
    } else if (correct === 2) {
        resultText = `Очень хорошо! 😊 Ты знаешь многое обо мне, и это здорово!`;
    } else {
        resultText = `Неплохо! 😄 Но мы еще многое узнаем друг о друге!`;
    }
    
    document.getElementById('result-text').textContent = resultText;
    createHeartParticles(30);
}

function resetQuiz() {
    quizAnswers = {};
    document.querySelectorAll('.quiz-question').forEach(q => {
        q.style.display = 'block';
        q.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
    });
    document.getElementById('quiz-result').classList.add('hidden');
}

document.getElementById('btn-restart-quiz')?.addEventListener('click', () => {
    resetQuiz();
});

// Плавающие сердца
function createHeartParticles(count) {
    const particlesContainer = document.getElementById('particles');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-20px';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }
}

// Добавляем сердца при кликах
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .quiz-opt, .gallery-item, .flower')) {
        createHeartParticles(5);
    }
});

// Плавающие сердца при загрузке
window.addEventListener('load', () => {
    createHeartParticles(10);
});

// Музыка (опционально - добавишь свою ссылку на музыку)
// const audio = document.getElementById('bg-music');
// audio.src = 'URL_к_музыке';
// audio.play().catch(e => console.log('Автоплей музыки заблокирован'));

// Отправка данных на сервер (опционально)
function sendToServer(data) {
    const userId = tg?.initDataUnsafe?.user?.id || 'anonymous';
    
    fetch('/api/save-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            ...data
        })
    }).catch(e => console.log('Server error:', e));
}

// Обработка жестов (свайп для закрытия)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const diff = touchEndX - touchStartX;
    
    // Свайп вправо - вернуться на главный экран
    if (diff > 100) {
        const activeScreen = document.querySelector('.screen.active').id;
        if (activeScreen !== 'screen-main') {
            showScreen('screen-main');
        }
    }
}

// Отправка уведомления в бота при открытии Mini App
if (tg) {
    const userId = tg.initDataUnsafe?.user?.id;
    const firstName = tg.initDataUnsafe?.user?.first_name;
    
    // Можно логировать открытие
    console.log(`Mini App открыта для: ${firstName} (${userId})`);
}

// Disable zoom на мобильных
document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});
