# AgentAI Landing Page - Deployment Guide

## Project Overview

✅ **Status:** Production-Ready
📦 **Size:** ~1500 LOC
🎯 **Features:** Fully featured conversion-focused landing page with email collection

## What's Included

### Frontend
- **index.html** (295 lines) - Semantic HTML structure
  - Navigation with logo
  - Hero section with visualization
  - Features showcase (6 cards)
  - Pricing tiers (3-tier model)
  - Early access signup form
  - Footer with links

- **styles.css** (686 lines) - Professional styling
  - CSS variables for theming
  - Responsive grid layouts
  - Gradient backgrounds
  - Smooth animations
  - Mobile-first design
  - Form styling with validation states

- **script.js** (246 lines) - Client-side functionality
  - Form validation (email, name, required fields)
  - Form submission handling
  - Success/error messaging
  - Smooth scroll navigation
  - Analytics event tracking hooks
  - Lazy load image support

### Backend
- **server.js** (318 lines) - Express.js server
  - Static file serving
  - Waitlist API endpoint
  - Email confirmation system
  - Form validation
  - Input sanitization
  - Stats endpoint (admin)
  - Error handling

### Configuration
- **package.json** - Dependencies (express, cors, nodemailer, dotenv)
- **.env.example** - Environment template
- **.gitignore** - Git exclusions
- **README.md** - Comprehensive documentation

## Quick Deployment

### Option 1: Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your email configuration

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Option 2: Vercel (Recommended for Serverless)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables in dashboard
```

**Vercel Configuration:**
- Add `.env` variables in Project Settings
- Vercel will auto-detect Node.js backend

### Option 3: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Option 4: Fly.io

```bash
# Install Fly CLI
# Deploy with fly.toml configuration
fly deploy
```

### Option 5: Traditional Server (AWS EC2, VPS, etc.)

```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone <repo-url>
cd ai-agent-platform

# Install dependencies
npm install

# Create .env
cp .env.example .env
# Edit with your values

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "agentai-landing"
pm2 startup
pm2 save
```

## Email Configuration

### Gmail (Easiest)

1. Enable 2-factor authentication
2. Generate app password: https://myaccount.google.com/apppasswords
3. Use in `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

### SendGrid

1. Create account at sendgrid.com
2. Get API key
3. Use SMTP settings:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxx
```

### AWS SES

1. Verify email in AWS SES
2. Create SMTP credentials
3. Configure:
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

### Mailgun

1. Create account at mailgun.com
2. Get SMTP credentials
3. Configure:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-password
```

## Database Integration

Current implementation uses in-memory storage. For production:

### MongoDB

```bash
npm install mongoose
```

```javascript
// In server.js
const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  company: String,
  usecase: String,
  timestamp: Date,
  id: String
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// In POST /api/waitlist
const entry = new Waitlist(userData);
await entry.save();
```

### PostgreSQL

```bash
npm install pg
```

```javascript
const { Pool } = require('pg');
const pool = new Pool();

// In POST /api/waitlist
await pool.query(
  'INSERT INTO waitlist (name, email, company, usecase) VALUES ($1, $2, $3, $4)',
  [userData.name, userData.email, userData.company, userData.usecase]
);
```

### Firebase

```bash
npm install firebase-admin
```

```javascript
const admin = require('firebase-admin');
const db = admin.firestore();

// In POST /api/waitlist
await db.collection('waitlist').add(userData);
```

## Security Checklist

### Before Going Live

- [ ] Change `ADMIN_API_KEY` to secure random string
- [ ] Use production email service (not personal Gmail)
- [ ] Enable HTTPS (auto with Vercel, Railway, etc.)
- [ ] Set proper CORS origins:
  ```javascript
  app.use(cors({
    origin: ['https://yourdomain.com'],
    credentials: true
  }));
  ```
- [ ] Add rate limiting:
  ```bash
  npm install express-rate-limit
  ```
- [ ] Enable CSP headers
- [ ] Set up logging and monitoring
- [ ] Test XSS/injection attacks
- [ ] Use database instead of in-memory
- [ ] Enable HTTPS redirects

### Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Rate Limiting Example

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.post('/api/waitlist', limiter, async (req, res) => {
  // ... handler
});
```

## Performance Optimization

### Image Optimization
- Use WebP format with fallbacks
- Lazy load images
- Optimize SVGs

### Code Splitting
- Minify CSS/JS for production
- Use CSS purging for unused styles
- Gzip compression

### Caching
```javascript
app.use(express.static('public', {
  maxAge: '1d'
}));
```

### CDN Integration
- Use Cloudflare for free CDN
- Cache static assets
- DDoS protection

## Monitoring & Analytics

### Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking

```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### Email Bounce Handling
- Implement bounce list management
- Auto-disable bounced emails
- Track unsubscribe requests

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/action@main
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Check email bounce rates
- [ ] Review analytics monthly
- [ ] Update dependencies quarterly
- [ ] Backup waitlist data
- [ ] Test form submissions

### Scaling
- Database: As traffic grows, migrate to managed database
- Email: Consider transactional email service
- CDN: Add CDN for static assets
- Rate limiting: Adjust based on traffic
- Caching: Implement Redis for sessions

## Troubleshooting

### Email Not Sending
1. Check `.env` variables
2. Verify email provider credentials
3. Check spam folder
4. Enable "Less secure apps" (Gmail)
5. Review server logs

### Form Not Submitting
1. Check browser console for errors
2. Verify `/api/waitlist` endpoint is responding
3. Check CORS settings
4. Validate form inputs

### High Server Load
1. Enable caching
2. Add rate limiting
3. Use CDN
4. Consider load balancer
5. Optimize database queries

## Support & Resources

- Express.js: https://expressjs.com
- Nodemailer: https://nodemailer.com
- Vercel: https://vercel.com
- Railway: https://railway.app
- MongoDB: https://www.mongodb.com
- PostgreSQL: https://www.postgresql.org

---

**Next Steps:**
1. Choose deployment platform
2. Configure environment variables
3. Set up email service
4. Deploy and test
5. Set up monitoring
6. Monitor and optimize
