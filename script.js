// Early Access Form Handler
document.getElementById('earlyAccessForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('successMessage');

    // Validate email
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return;
    }

    // Validate name
    if (name.length < 2) {
        showFormError('Please enter your full name');
        return;
    }

    // Disable submit button during processing
    submitButton.disabled = true;
    submitButton.textContent = 'Signing up...';

    try {
        // Store signup data (in a real app, send to backend)
        const signupData = {
            name: name,
            email: email,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        // Log to console (in production, send to API)
        console.log('Early Access Signup:', signupData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Optional: Clear form
        form.reset();

    } catch (error) {
        console.error('Signup error:', error);
        showFormError('Something went wrong. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = 'Get Early Access';
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form error
function showFormError(message) {
    const form = document.getElementById('earlyAccessForm');
    let errorDiv = form.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.insertBefore(errorDiv, form.firstChild);
    }

    errorDiv.textContent = '⚠ ' + message;
    errorDiv.style.display = 'block';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.color = '#c62828';
    errorDiv.style.padding = '1rem';
    errorDiv.style.borderRadius = '6px';
    errorDiv.style.marginBottom = '1rem';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Track CTAs
document.querySelectorAll('.button-primary, .button-secondary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        console.log('CTA Clicked:', buttonText);
    });
});

// Add scroll animation for feature cards
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

document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize
console.log('AI Agent Platform landing page loaded');
