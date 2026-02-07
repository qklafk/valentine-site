// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    tg.setBackgroundColor('#fff5f7');
    tg.setHeaderColor('#ff1744');
}

// ==================== SCROLL TO TOP BUTTON ====================

const scrollTopBtn = document.getElementById('btn-scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== WELCOME SECTION ====================

const btnStart = document.getElementById('btn-start');
const sectionWelcome = document.getElementById('section-welcome');
const sectionConfession = document.getElementById('section-confession');

btnStart?.addEventListener('click', () => {
    sectionConfession.scrollIntoView({ behavior: 'smooth' });
    createHeartParticles(30);
});

// ==================== QUIZ FUNCTIONALITY ====================

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
        if (Object.keys(quizAnswers).length === 4) {
            setTimeout(showQuizResults, 1500);
        }
    });
});

function showQuizResults() {
    const correct = Object.values(quizAnswers).filter(v => v).length;
    
    document.querySelectorAll('.quiz-question').forEach(q => {
        q.style.display = 'none';
    });
    
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');
    
    let resultText = '';
    if (correct === 4) {
        resultText = `Отлично! 🎉 Ты знаешь меня на 100%! Это настоящая любовь! 💕`;
    } else if (correct === 3) {
        resultText = `Очень хорошо! 😊 Ты знаешь многое обо мне, и это здорово!`;
    } else {
        resultText = `Неплохо! 😄 Но мы еще много узнаем друг о друге!`;
    }
    
    document.getElementById('result-text').textContent = resultText;
    createHeartParticles(40);
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
    window.scrollTo({
        top: document.getElementById('section-quiz').offsetTop,
        behavior: 'smooth'
    });
});

// ==================== FLOATING PARTICLES ====================

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

// Добавляем сердца при кликах на интерактивные элементы
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .quiz-opt, .gallery-card, .about-card, .flower')) {
        createHeartParticles(8);
    }
});

// Добавляем сердца при загрузке
window.addEventListener('load', () => {
    createHeartParticles(15);
});

// ==================== MOBILE OPTIMIZATION ====================

// Оптимизация для мобильных устройств
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

// Предотвращаем двойной tap zoom
let lastTouchDown = 0;
document.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (lastTouchDown + 300 > now) {
        e.preventDefault();
    }
    lastTouchDown = now;
}, false);

// ==================== USER INFO ====================

if (tg) {
    const userId = tg.initDataUnsafe?.user?.id;
    const firstName = tg.initDataUnsafe?.user?.first_name;
    
    console.log(`Mini App открыта для: ${firstName} (${userId})`);
}

// ==================== ACCESSIBILITY ====================

// Улучшение доступности
document.querySelectorAll('button').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('role', 'button');
    }
});

// ==================== PERFORMANCE ====================

// Lazy loading для изображений (если будут добавлены)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✨ Сайт загружен идеально! 💕');
