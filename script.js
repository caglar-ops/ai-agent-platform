// Form Handling and Validation
const earlyAccessForm = document.getElementById('earlyAccessForm');
const successMessage = document.getElementById('successMessage');

// Scroll to signup function
function scrollToSignup() {
    const signupSection = document.getElementById('signup');
    signupSection.scrollIntoView({ behavior: 'smooth' });
}

// Contact sales function
function contactSales() {
    window.location.href = 'mailto:sales@agentai.com?subject=Enterprise Inquiry';
}

// Form submission handler
earlyAccessForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(earlyAccessForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        usecase: formData.get('usecase'),
        timestamp: new Date().toISOString()
    };

    // Validate form data on client side
    if (!validateFormData(data)) {
        showError('Please fill in all required fields correctly.');
        return;
    }

    try {
        // Show loading state
        const submitButton = earlyAccessForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        // Submit to backend
        const response = await fetch('/api/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            // Show success message
            displaySuccessMessage(data.email);
            // Reset form
            earlyAccessForm.reset();
            // Re-enable button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showError(error.message || 'Failed to submit form. Please try again.');
        // Re-enable button
        const submitButton = earlyAccessForm.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Form validation function
function validateFormData(data) {
    // Check required fields
    if (!data.name || !data.email || !data.usecase) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    // Validate name (letters and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(data.name)) {
        return false;
    }

    return true;
}

// Display success message
function displaySuccessMessage(email) {
    earlyAccessForm.style.display = 'none';
    successMessage.style.display = 'block';
    document.getElementById('successEmail').textContent = `Confirmation sent to ${email}`;

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show error message
function showError(message) {
    // Create error alert
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-alert';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(errorDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Add CSS animations
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

    .error-alert {
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Analytics tracking (optional - can be connected to analytics service)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics integration
    console.log(`Event: ${eventName}`, eventData);
    
    // Can be connected to Google Analytics, Mixpanel, etc.
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// Track form views
trackEvent('form_view', {
    section: 'early_access'
});

// Track feature section views (intersection observer)
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            trackEvent('section_view', {
                section: sectionId
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Mobile menu handling (for future expansion)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Lazy load images (for future optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('AgentAI landing page loaded successfully');
