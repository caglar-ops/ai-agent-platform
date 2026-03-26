// Form submission handler
document.getElementById('early-access-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const useCase = document.getElementById('use-case').value;
    
    // Validate email
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, this would send data to a server
    console.log('Form submission:', {
        name,
        email,
        company,
        useCase,
        timestamp: new Date().toISOString()
    });
    
    // Show success message
    const form = document.getElementById('early-access-form');
    const successMessage = document.getElementById('success-message');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Optional: Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMessage.style.display = 'none';
    }, 3000);
});

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
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

// Observe feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
});

// Mobile menu toggle (if nav becomes collapsible in future)
const navLinks = document.querySelector('.nav-links');
if (window.innerWidth <= 768) {
    navLinks.style.display = 'none';
}

// Log page analytics (replace with actual analytics service)
console.log('AI Agent Platform landing page loaded');
console.log('Tracking:', {
    page: 'index',
    title: 'Deploy Autonomous AI Agents in Minutes',
    timestamp: new Date().toISOString()
});
