# AI Agent Platform - Landing Page

A production-ready landing page for the AI Agent Platform with early access form, pricing tiers, and email collection.

## Features

✨ **Hero Section** - Convert-focused headline with early access CTA
📧 **Early Access Form** - Email validation and signup with waitlist.json storage
💰 **Pricing Tiers** - 3 pricing plans (Starter, Pro, Enterprise) with feature comparison
🎨 **Responsive Design** - Mobile-friendly layout with smooth animations
🔍 **SEO Optimized** - Meta tags and semantic HTML
⚡ **Performance** - Vanilla HTML/CSS/JS with no dependencies

## Getting Started

### Installation

```bash
# No dependencies to install, works with vanilla Node.js
npm install
```

### Running Locally

```bash
npm start
# Server runs on http://localhost:3000
```

## File Structure

- `index.html` - Complete landing page with embedded CSS and JavaScript
- `server.js` - Simple Node.js HTTP server with API endpoint
- `waitlist.json` - Stores early access email signups
- `package.json` - Project metadata

## API Endpoints

### POST /api/waitlist
Register an email for early access.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Successfully registered for early access",
  "email": "user@example.com"
}
```

## Customization

- Edit hero headline and subheading in the `<h1>` and `<p>` tags
- Modify pricing tiers in the pricing section
- Update social links in the footer
- Change colors by modifying CSS variables in the `<style>` section

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
