// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe step items
document.querySelectorAll('.step-item').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(step);
});

// Form validation and submission via Web3Forms
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                contactForm.reset();

                // Hide success message after 8 seconds
                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.style.display = 'none';
                    }
                }, 8000);
            } else {
                alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement à contact@mrautomate.fr');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement à contact@mrautomate.fr');
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Add CSS for success message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('.floating-circuit');
    
    heroElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Cursor glow effect
const createGlowCursor = () => {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    glow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
    
    // Hide on mobile
    if (window.innerWidth < 768) {
        glow.style.display = 'none';
    }
};

// Initialize cursor glow
if (window.innerWidth >= 768) {
    createGlowCursor();
}

// Number counter animation
const animateNumber = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Observe stats with data-target attribute
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.querySelector('.stat-value');
            if (value && !value.classList.contains('animated')) {
                value.classList.add('animated');
                const target = parseInt(value.getAttribute('data-target')) || parseInt(value.textContent);
                if (!isNaN(target) && target > 0) {
                    animateNumber(value, target);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent form resubmission on refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add active state to current nav item
const currentPage = window.location.hash || '#';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.style.color = 'var(--primary)';
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate easter egg
        document.querySelectorAll('.robot-logo, .hero-robot').forEach(robot => {
            robot.style.animation = 'spin 2s ease-in-out';
        });
        
        setTimeout(() => {
            document.querySelectorAll('.robot-logo, .hero-robot').forEach(robot => {
                robot.style.animation = '';
            });
        }, 2000);
    }
});

console.log('%cMrAutomate.fr', 'font-size: 50px; font-weight: bold; color: #00D9FF; text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);');
console.log('%c🤖 En 2026, toute entreprise a besoin d\'un Mr Automate!', 'font-size: 16px; color: #00FF88;');
console.log('%cCurieux ? Contactez-nous à contact@mrautomate.fr', 'font-size: 14px; color: #999;');
