// AI Agent Platform Landing Page - Form Handler
// High-converting early access form functionality

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('earlyAccessForm');
    const successMessage = document.getElementById('successMessage');

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            useCase: document.getElementById('useCase').value,
            timestamp: new Date().toISOString()
        };

        // Validate email format
        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In production, this would send to a backend service
        // For now, we'll simulate the submission
        console.log('Early Access Submission:', formData);

        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Reset form for potential additional submissions
        form.reset();

        // Optional: Send to analytics or email service
        trackSubmission(formData);

        // Scroll to success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to track submission (integrate with your analytics)
    function trackSubmission(data) {
        // This would typically send to your backend or analytics service
        // Example: fetch('/api/early-access', { method: 'POST', body: JSON.stringify(data) })
        
        // For demonstration, store in localStorage
        try {
            const submissions = JSON.parse(localStorage.getItem('earlyAccessSubmissions') || '[]');
            submissions.push(data);
            localStorage.setItem('earlyAccessSubmissions', JSON.stringify(submissions));
        } catch (error) {
            console.error('Error tracking submission:', error);
        }
    }

    // Smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
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

    // Apply animation to elements
    document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (if needed in future)
    console.log('AI Agent Platform landing page loaded successfully');
});
