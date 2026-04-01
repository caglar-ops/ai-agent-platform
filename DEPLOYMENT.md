# Deployment Guide

## 📦 Deployment Options

### 1. GitHub Pages (Static Only - No Form Backend)

**Best for:** Simple showcase, free hosting

```bash
# 1. Push index.html to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp index.html .
git add index.html
git commit -m "Deploy landing page"
git push origin gh-pages

# 2. Enable in repository Settings > Pages
# Set source to: gh-pages branch
```

**Form handling:** Use client-side localStorage (already included in index.html)

---

### 2. Vercel (Recommended - Full-Featured)

**Best for:** Best performance, serverless backend, free tier available

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment if needed
vercel env add DATABASE_URL
```

**Create serverless function for form:**

Create `api/signup.js`:
```javascript
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, company, role, usecase } = req.body;

  // Validate
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Add to signups
  const signup = {
    id: Date.now(),
    email,
    name,
    company,
    role,
    usecase,
    timestamp: new Date().toISOString()
  };

  // Store in database or file
  // For demo: return success
  res.status(200).json({ success: true, signup });
}
```

**Update index.html:**
```javascript
const response = await fetch('/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

### 3. Netlify (Full-Featured)

**Best for:** Git-connected deployment, built-in CI/CD

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Create netlify/functions/signup.js:**
```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const data = JSON.parse(event.body);
  
  // Process signup
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

---

### 4. Heroku (Node.js Backend)

**Best for:** Full Node.js backend, database integration

```bash
# Install Heroku CLI
npm i -g heroku

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Heroku Procfile:**
```
web: node server.js
```

---

### 5. AWS (Lambda + S3)

**Best for:** Enterprise scale, CDN, advanced options

```bash
# Deploy static files to S3
aws s3 sync . s3://your-bucket/ --include "*.html" --include "*.css" --include "*.js"

# CloudFront for CDN
aws cloudfront create-distribution --origin-domain-name your-bucket.s3.amazonaws.com

# Lambda for API
# Use AWS SAM or Serverless Framework
```

---

### 6. Docker (Any Server)

**Best for:** Full control, on-premise deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
```

**Build & Run:**
```bash
docker build -t ai-platform .
docker run -p 3000:3000 ai-platform
```

---

## 📊 Data Storage Options

### Option 1: JSON File (Current)
- ✅ Simple, no setup
- ❌ No real-time sync, file-based limits

### Option 2: MongoDB
```javascript
const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  email: String,
  name: String,
  company: String,
  role: String,
  usecase: String,
  timestamp: Date
});

const Signup = mongoose.model('Signup', signupSchema);
```

### Option 3: PostgreSQL
```sql
CREATE TABLE signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(100),
  usecase TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### Option 4: Firebase
```javascript
const db = firebase.firestore();

db.collection('signups').add({
  email,
  name,
  company,
  role,
  usecase,
  timestamp: new Date()
});
```

### Option 5: Supabase (PostgreSQL + Auth)
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

await supabase
  .from('signups')
  .insert([{ email, name, company, role, usecase }]);
```

---

## 🔧 Email Notifications

### SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: signupEmail,
  from: 'hello@ai-platform.com',
  subject: 'Welcome to AI Agent Platform!',
  html: '<h1>Early Access Confirmed</h1>'
});
```

### Mailgun
```javascript
const mailgun = require('mailgun.js');
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

mg.messages.create('mg.yourdomain.com', {
  from: 'hello@ai-platform.com',
  to: signupEmail,
  subject: 'Welcome!',
  html: '...'
});
```

### Sendgrid, Mailchimp, ConvertKit, etc.
```javascript
// Add to Mailchimp list
const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us1'
});

await mailchimp.lists.addListMember('list_id', {
  email_address: email,
  status: 'subscribed',
  merge_fields: { FNAME: name, COMPANY: company }
});
```

---

## ✅ Pre-Deployment Checklist

- [ ] Form validation working
- [ ] Mobile responsive (test on phone)
- [ ] All links working
- [ ] Images/assets loading
- [ ] SSL certificate ready (HTTPS)
- [ ] Analytics configured (optional)
- [ ] Email notifications set up
- [ ] Data backup strategy
- [ ] 404 page configured
- [ ] Performance optimized

---

## 🚀 Quick Deploy Script

```bash
#!/bin/bash

# Build
npm run build || true

# Deploy to Vercel
vercel --prod

# Deploy to GitHub Pages
git checkout gh-pages
cp index.html .
git add index.html
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
git checkout main
```

---

## 📈 Post-Launch

1. **Analytics:** Add Google Analytics/Mixpanel
2. **A/B Testing:** Test different CTAs
3. **SEO:** Submit to search engines
4. **Monitoring:** Set up error tracking
5. **Feedback:** Add Intercom/Drift chat
6. **Performance:** Monitor Core Web Vitals

