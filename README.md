# AI Agent Platform - Landing Page

A modern, convert-focused landing page for the AI Agent Platform. Features early access signup, pricing tiers, and responsive design.

## 🎯 Features

✅ **Convert-Focused Hero** - Clear value proposition with CTA  
✅ **Feature Showcase** - 6 key benefits with icons  
✅ **Responsive Pricing** - 3 pricing tiers (Starter, Professional, Enterprise)  
✅ **Early Access Form** - Collects email, company, role, and use case  
✅ **Mobile-Responsive** - Works perfectly on all devices  
✅ **Clean UI** - Modern gradient design with smooth animations  
✅ **Form Submission** - Stores signups in JSON file  

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies (Node.js required)
npm install

# Run the server
npm start
```

Visit `http://localhost:3000` in your browser.

### View Signups

- Go to `http://localhost:3000/api/signups` to see all collected signups in JSON format
- Signups are stored in `signups.json`

## 📦 Deployment

### Option 1: GitHub Pages (Static Only)

1. Copy `index.html` to your `gh-pages` branch
2. Enable GitHub Pages in your repo settings
3. Add a simple backend (see Options 2-3) if you want form submissions

### Option 2: Vercel (Recommended)

```bash
vercel deploy
```

Add a simple serverless function to handle signups:

```javascript
// api/signup.js
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  // Save to database or file
  res.status(200).json({ success: true });
};
```

### Option 3: Netlify

```bash
netlify deploy --prod
```

Use Netlify Functions for form handling.

### Option 4: Docker

```bash
docker build -t ai-platform-landing .
docker run -p 3000:3000 ai-platform-landing
```

## 📄 Files

- **index.html** - Complete landing page (standalone)
- **server.js** - Node.js server with form endpoint
- **signups.json** - Collected early access signups
- **package.json** - NPM configuration

## 🎨 Customization

### Colors

Edit the gradient colors in `index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Content

Update hero text, features, and pricing directly in the HTML.

### Pricing Tiers

Modify the pricing section to add/remove tiers or change prices.

## 📊 Form Data

Signups include:
- Name
- Email
- Company
- Role
- Use Case
- Timestamp
- User Agent

## 🔄 Next Steps

1. Set up email notifications when forms are submitted
2. Connect to CRM (HubSpot, Salesforce, etc.)
3. Add analytics tracking (Google Analytics, Mixpanel)
4. Set up payment processing for premium tiers
5. Create onboarding flow for early access members

## 📝 License

MIT
