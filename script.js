// Telegram Web App Setup
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    tg.setBackgroundColor('#fff5f7');
    tg.setHeaderColor('#ff1744');
}

// ==================== SCROLL TO TOP BUTTON ====================

const scrollTopBtn = document.getElementById('scroll-top');

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

// ==================== WELCOME BUTTON ====================

const btnPrimary = document.querySelector('.btn-primary');

btnPrimary?.addEventListener('click', () => {
    createHeartParticles(30);
    document.querySelector('.section-dark')?.scrollIntoView({ behavior: 'smooth' });
});

// ==================== HEART PARTICLES ====================

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

// Add hearts on clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .card, .photo-card, .memory-card, .flower, .photo-placeholder')) {
        createHeartParticles(8);
    }
});

// ==================== MOBILE OPTIMIZATIONS ====================

// Prevent pinch zoom
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

// Prevent double-tap zoom
let lastTouchDown = 0;
document.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (lastTouchDown + 300 > now) {
        e.preventDefault();
    }
    lastTouchDown = now;
}, false);

// ==================== INITIAL ANIMATION ====================

window.addEventListener('load', () => {
    createHeartParticles(15);
});
