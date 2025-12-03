// ===== CONFIGURATION =====
const CONFIG = {
    FORMSPREE_ENDPOINT: "https://formspree.io/f/xxxxxxxx", // À remplacer avec votre endpoint
    SCROLL_OFFSET: 80,
    DEBOUNCE_DELAY: 100
};

// ===== ÉLÉMENTS DOM =====
const domElements = {
    body: document.body,
    header: document.querySelector('.header'),
    navToggle: document.getElementById('navToggle'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTop: document.getElementById('backToTop'),
    signupForm: document.getElementById('signupForm'),
    contactForm: document.getElementById('contactForm')
};

// ===== ÉTAT GLOBAL =====
let scrollTimeout;
let lastScrollTop = 0;

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    setupScrollAnimations();
    updateActiveNavLink();
    checkBackToTopVisibility();
    
    console.log('🚀 Landing page NexaTech initialisée !');
}

// ===== GESTION DES ÉVÉNEMENTS =====
function setupEventListeners() {
    // Menu mobile
    if (domElements.navToggle) {
        domElements.navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le menu au clic sur un lien
    domElements.navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Back to top
    if (domElements.backToTop) {
        domElements.backToTop.addEventListener('click', scrollToTop);
    }
    
    // Scroll
    window.addEventListener('scroll', handleScroll);
    
    // Forms
    if (domElements.signupForm) {
        domElements.signupForm.addEventListener('submit', handleSignupSubmit);
    }
    
    if (domElements.contactForm) {
        domElements.contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Clic en dehors du menu pour le fermer
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && domElements.navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ===== MENU MOBILE =====
function toggleMobileMenu() {
    domElements.navMenu.classList.toggle('active');
    const icon = domElements.navToggle.querySelector('i');
    
    if (domElements.navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        domElements.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        domElements.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    domElements.navMenu.classList.remove('active');
    const icon = domElements.navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    domElements.body.style.overflow = '';
}

// ===== GESTION DU SCROLL =====
function handleScroll() {
    // Header scroll effect
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        domElements.header.classList.add('scrolled');
    } else {
        domElements.header.classList.remove('scrolled');
    }
    
    // Back to top visibility
    checkBackToTopVisibility();
    
    // Active nav link update
    updateActiveNavLink();
    
    // Animation au scroll avec debounce
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        animateOnScroll();
    }, CONFIG.DEBOUNCE_DELAY);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + CONFIG.SCROLL_OFFSET;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            domElements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function checkBackToTopVisibility() {
    if (window.scrollY > 300) {
        domElements.backToTop.classList.add('visible');
    } else {
        domElements.backToTop.classList.remove('visible');
    }
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== ANIMATIONS SCROLL =====
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

function animateOnScroll() {
    // Animation des éléments flottants
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        const delay = index * 0.5;
        el.style.animationDelay = `${delay}s`;
    });
}

// ===== FORMULAIRES =====
async function handleSignupSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('#signupEmail');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validation basique
    if (!isValidEmail(emailInput.value)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        emailInput.focus();
        return;
    }
    
    // Simuler l'envoi
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;
    
    // Simulation d'une requête API
    setTimeout(() => {
        showNotification('🎉 Merci ! Votre essai gratuit va commencer.', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirection vers une page de confirmation (optionnelle)
        // window.location.href = '/merci.html';
    }, 1500);
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validation
    const errors = validateContactForm(formData);
    if (errors.length > 0) {
        errors.forEach(error => {
            showNotification(error, 'error');
        });
        return;
    }
    
    // Simuler l'envoi
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;
    
    try {
        // Pour Formspree (décommentez et configurez)
        /*
        const response = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('✅ Message envoyé avec succès !', 'success');
            form.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
        */
        
        // Simulation
        setTimeout(() => {
            showNotification('✅ Message envoyé avec succès !', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('❌ Une erreur est survenue. Veuillez réessayer.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function validateContactForm(formData) {
    const errors = [];
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!isValidEmail(email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    if (!message || message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    removeExistingNotifications();
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icône selon le type
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" aria-label="Fermer">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function removeExistingNotifications() {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Ajouter les animations CSS pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// ===== FONCTIONS UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exposer certaines fonctions globalement (pour debug)
window.app = {
    showNotification,
    scrollToTop,
    validateContactForm
};

console.log('📱 Application prête !');