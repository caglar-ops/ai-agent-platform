/**
 * AI Agent Platform Landing Page
 * Form validation, email collection, and interactive features
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupEmailForm();
    setupSmoothScroll();
    setupFormSubmitHandler();
});

/**
 * Email validation utility
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Setup email form submission
 */
function setupEmailForm() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    // Real-time email validation feedback (optional visual cue)
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const submitButton = form.querySelector('.form-button');

        // Validate email
        if (!email) {
            showFormMessage('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Disable button and show loading state
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Signing up...';

        try {
            // Simulate API call (replace with actual endpoint)
            await submitWaitlist(email);
            
            // Success
            showFormMessage('✅ Welcome! Check your email for confirmation.', 'success');
            emailInput.value = '';
            
            // Track conversion
            trackConversion(email);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);

        } catch (error) {
            showFormMessage('Something went wrong. Please try again.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

/**
 * Submit email to waitlist (API integration point)
 */
async function submitWaitlist(email) {
    // In production, replace this with your actual API endpoint
    // Example:
    // const response = await fetch('https://api.example.com/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    // });
    // 
    // if (!response.ok) {
    //     throw new Error('Failed to submit email');
    // }
    // 
    // return response.json();

    // For now, simulate a successful submission
    return new Promise((resolve) => {
        setTimeout(() => {
            // Store in localStorage for demo purposes
            const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
            if (!waitlist.includes(email)) {
                waitlist.push(email);
                localStorage.setItem('waitlist', JSON.stringify(waitlist));
            }
            resolve({ success: true, email });
        }, 800);
    });
}

/**
 * Display form message
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

/**
 * Track conversion (analytics integration point)
 */
function trackConversion(email) {
    // Send event to analytics service
    // Example with Google Analytics:
    // if (window.gtag) {
    //     gtag('event', 'early_access_signup', {
    //         'email': email,
    //         'timestamp': new Date().toISOString()
    //     });
    // }

    // Log to console for development
    console.log('📊 Conversion tracked:', {
        event: 'early_access_signup',
        email: email,
        timestamp: new Date().toISOString()
    });
}

/**
 * Setup smooth scroll behavior for navigation links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Utility: Get waitlist for admin purposes (localStorage demo)
 */
function getWaitlist() {
    return JSON.parse(localStorage.getItem('waitlist') || '[]');
}

/**
 * Utility: Clear waitlist (for testing)
 */
function clearWaitlist() {
    localStorage.removeItem('waitlist');
    console.log('✓ Waitlist cleared');
}

// Expose utilities to window for console access during development
window.waitlistDebug = {
    getWaitlist,
    clearWaitlist,
    trackConversion
};
