const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
let transporter;

// Initialize email transporter
function initializeTransporter() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        console.log('Email transporter configured with SMTP');
    } else if (process.env.EMAIL_SERVICE) {
        // Support for services like Gmail, Outlook, etc.
        transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log(`Email transporter configured with ${process.env.EMAIL_SERVICE}`);
    } else {
        console.warn('No email configuration found. Email notifications disabled.');
        transporter = null;
    }
}

// In-memory waitlist storage (replace with database in production)
const waitlist = [];

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate name
function isValidName(name) {
    return name && name.length > 0 && name.length <= 100;
}

// Sanitize input
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, 200);
}

// Send confirmation email
async function sendConfirmationEmail(userData) {
    if (!transporter) {
        console.log('Email transporter not configured. Skipping email send.');
        return true;
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@agentai.com',
            to: userData.email,
            subject: '🎉 Welcome to AgentAI Early Access Waitlist!',
            html: generateConfirmationEmail(userData)
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${userData.email}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't fail the API call if email fails
        return true;
    }
}

// Generate confirmation email HTML
function generateConfirmationEmail(userData) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px 20px; border-radius: 0 0 8px 8px; }
            .benefits { list-style: none; padding: 20px 0; }
            .benefits li { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
            .benefits li:before { content: "✓ "; color: #10B981; font-weight: bold; margin-right: 10px; }
            .cta { margin: 20px 0; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; }
            .footer { text-align: center; padding: 20px; color: #64748B; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Welcome to AgentAI!</h1>
                <p>You're on the inside track</p>
            </div>
            <div class="content">
                <h2>Hi ${sanitizeInput(userData.name)},</h2>
                <p>Thank you for joining our early access waitlist! We're thrilled to have you on this journey.</p>
                
                <h3>What's Next?</h3>
                <p>We'll be reaching out with your early access details very soon. In the meantime, here's what you get as an early adopter:</p>
                
                <ul class="benefits">
                    <li>50% founding member discount (first year)</li>
                    <li>Direct access to our team</li>
                    <li>Priority onboarding and support</li>
                    <li>Your feedback shapes our roadmap</li>
                </ul>

                <p><strong>Your interest:</strong> ${userData.usecase}</p>
                ${userData.company ? `<p><strong>Company:</strong> ${sanitizeInput(userData.company)}</p>` : ''}

                <div class="cta">
                    <p>Check out our feature roadmap while you wait:</p>
                    <a href="https://agentai.com#features" class="button">View Features</a>
                </div>

                <p>Questions? Reply to this email or visit our help center.</p>
                <p>Best regards,<br>The AgentAI Team</p>
            </div>
            <div class="footer">
                <p>© 2026 AgentAI. All rights reserved.</p>
                <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// API Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
    try {
        const { name, email, company, usecase } = req.body;

        // Validation
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        if (!isValidName(name)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid name'
            });
        }

        if (!usecase) {
            return res.status(400).json({
                success: false,
                message: 'Please select a use case'
            });
        }

        // Check for duplicate email
        const existingEntry = waitlist.find(entry => entry.email.toLowerCase() === email.toLowerCase());
        if (existingEntry) {
            return res.status(200).json({
                success: true,
                message: 'Already on waitlist',
                isDuplicate: true
            });
        }

        // Sanitize inputs
        const userData = {
            name: sanitizeInput(name),
            email: email.toLowerCase(),
            company: sanitizeInput(company || ''),
            usecase: sanitizeInput(usecase),
            timestamp: new Date().toISOString(),
            id: generateId()
        };

        // Add to waitlist
        waitlist.push(userData);

        // Send confirmation email
        await sendConfirmationEmail(userData);

        // Log to file (for persistence in production, use database)
        if (process.env.NODE_ENV === 'production') {
            console.log(`New waitlist entry: ${userData.email}`);
            // In production, save to database here
        }

        res.status(201).json({
            success: true,
            message: 'Successfully added to waitlist',
            email: userData.email,
            isDuplicate: false
        });

    } catch (error) {
        console.error('Waitlist API error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Get waitlist stats (protected endpoint - add authentication in production)
app.get('/api/waitlist/stats', (req, res) => {
    // In production, add proper authentication/authorization
    if (req.headers['x-api-key'] !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const stats = {
        total: waitlist.length,
        byUseCase: {},
        recentSignups: waitlist.slice(-10).reverse()
    };

    waitlist.forEach(entry => {
        stats.byUseCase[entry.usecase] = (stats.byUseCase[entry.usecase] || 0) + 1;
    });

    res.json(stats);
});

// Verify email endpoint
app.post('/api/verify-email', (req, res) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ valid: false });
    }

    const exists = waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase());
    res.json({
        valid: true,
        exists: exists
    });
});

// Generate unique ID
function generateId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Not found'
    });
});

// Initialize and start server
initializeTransporter();

const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║     AgentAI Landing Page Server        ║
╠════════════════════════════════════════╣
║  Server running on port ${PORT}
║  Environment: ${process.env.NODE_ENV || 'development'}
║  Email configured: ${transporter ? 'Yes' : 'No'}
╚════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
