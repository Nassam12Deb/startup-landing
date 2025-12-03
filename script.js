// ===== CONFIGURATION =====
const CONFIG = {
    SCROLL_OFFSET: 80,
    DEBOUNCE_DELAY: 100
};

// ===== ÉLÉMENTS DOM =====
const DOM = {
    body: document.body,
    header: document.querySelector('.header'),
    navToggle: document.getElementById('navToggle'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTop: document.getElementById('backToTop'),
    signupForm: document.getElementById('signupForm'),
    contactForm: document.getElementById('contactForm')
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    setupScrollAnimations();
    checkBackToTopVisibility();
    console.log('🚀 Landing page initialisée');
}

// ===== GESTION DES ÉVÉNEMENTS =====
function setupEventListeners() {
    // Menu mobile
    if (DOM.navToggle) {
        DOM.navToggle.addEventListener('click', toggleMobileMenu);
        DOM.navToggle.addEventListener('touchstart', (e) => e.preventDefault());
    }
    
    // Fermer le menu au clic sur un lien
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Back to top
    if (DOM.backToTop) {
        DOM.backToTop.addEventListener('click', scrollToTop);
    }
    
    // Scroll optimisé avec debounce
    window.addEventListener('scroll', debounce(handleScroll, CONFIG.DEBOUNCE_DELAY));
    
    // Validation formulaires avant soumission
    if (DOM.signupForm) {
        DOM.signupForm.addEventListener('submit', validateSignupForm);
    }
    
    if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', validateContactForm);
    }
    
    // Clic en dehors du menu pour le fermer
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
}

// ===== MENU MOBILE =====
function toggleMobileMenu() {
    DOM.navMenu.classList.toggle('active');
    const icon = DOM.navToggle.querySelector('i');
    
    if (DOM.navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        DOM.body.style.overflow = 'hidden';
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        DOM.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    DOM.navMenu.classList.remove('active');
    const icon = DOM.navToggle.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
    DOM.body.style.overflow = '';
}

function handleClickOutside(e) {
    if (!e.target.closest('.nav') && DOM.navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// ===== GESTION DU SCROLL =====
function handleScroll() {
    // Header effect
    DOM.header.classList.toggle('scrolled', window.scrollY > 50);
    
    // Back to top
    checkBackToTopVisibility();
    
    // Update active nav
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + CONFIG.SCROLL_OFFSET;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.id;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            DOM.navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${sectionId}`;
                link.classList.toggle('active', isActive);
            });
        }
    });
}

function checkBackToTopVisibility() {
    if (DOM.backToTop) {
        DOM.backToTop.classList.toggle('visible', window.scrollY > 300);
    }
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ANIMATIONS SCROLL =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ===== VALIDATION FORMULAIRES =====
function validateSignupForm(e) {
    const email = this.signupEmail?.value.trim();
    
    if (!email || !isValidEmail(email)) {
        e.preventDefault();
        showNotification('Veuillez entrer une adresse email valide', 'error');
        this.signupEmail?.focus();
        return;
    }
    
    showNotification('🎉 Merci ! Votre inscription est en cours...', 'success');
}

function validateContactForm(e) {
    const name = this.name?.value.trim();
    const email = this.email?.value.trim();
    const message = this.message?.value.trim();
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    if (!message || message.length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        e.preventDefault();
        errors.forEach(error => showNotification(error, 'error'));
        return;
    }
    
    showNotification('✅ Message envoyé avec succès !', 'success');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    removeExistingNotifications();
    
    const notification = document.createElement('div');
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Fermer">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: min(400px, 90vw);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    setTimeout(() => closeNotification(notification), 5000);
}

function removeExistingNotifications() {
    document.querySelectorAll('.notification').forEach(closeNotification);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
}

// ===== UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialisation des animations de notification
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);