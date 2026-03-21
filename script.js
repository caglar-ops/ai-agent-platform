// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send this to a backend
        console.log('Signup data:', data);
        
        // Show success message
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ Thanks! Check your email';
        submitButton.style.background = '#10b981';
        
        // Reset form
        this.reset();
        
        // Revert button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    // This can be expanded later for mobile navigation
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth < 768) {
        // Mobile specific code
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

// Keyboard accessibility for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            button.click();
        }
    });
});
