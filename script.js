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

// Quiz удалена, викторина заменена на письмо

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
    if (e.target.matches('.btn, .gallery-card, .about-card, .flower, .letter-card')) {
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
