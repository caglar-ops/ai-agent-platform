# AI Agent Platform Landing Page

A modern, conversion-focused landing page for the AI Agent Platform with early access signup.

## Features

✨ **Hero Section** - Clear value proposition with email waitlist form
💰 **Pricing Tiers** - 3 pricing tiers (Starter, Professional, Enterprise)
❓ **FAQ Section** - Comprehensive answers to common questions
🗣️ **Testimonials** - Social proof with customer quotes
🌓 **Dark Mode** - Full dark mode support
📱 **Responsive Design** - Mobile-first, optimized for all devices
✅ **Form Validation** - Email validation and duplicate prevention
💾 **Email Storage** - Simple JSON-based email storage

## Project Structure

```
ai-agent-platform/
├── pages/
│   ├── _app.jsx           # App wrapper with dark mode support
│   ├── _document.jsx      # Document structure
│   ├── index.jsx          # Home page
│   └── api/
│       └── subscribe.js   # Email subscription API endpoint
├── components/
│   ├── Header.jsx         # Navigation header with dark mode toggle
│   ├── Hero.jsx           # Hero section with email form
│   ├── Pricing.jsx        # Pricing tiers section
│   ├── FAQ.jsx            # FAQ accordion section
│   ├── Testimonials.jsx   # Customer testimonials section
│   └── Footer.jsx         # Footer with links
├── styles/
│   └── globals.css        # Global Tailwind styles
├── public/                # Static assets
├── emails.json            # Email storage file
├── package.json           # Dependencies
├── next.config.js         # Next.js config
├── tailwind.config.js     # Tailwind CSS config
└── README.md              # This file
```

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Validation**: Custom email validation
- **Storage**: JSON file (emails.json)
- **Dark Mode**: CSS class-based

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Features Breakdown

### Hero Section
- Animated gradient heading
- Email subscription form with validation
- Social proof counter
- Smooth scroll indicators

### Pricing
- 3 tier options (Starter, Professional, Enterprise)
- Feature comparison
- Call-to-action buttons
- Highlighted "Most Popular" tier

### FAQ
- 6 pre-written FAQs
- Expandable accordion interface
- Contact CTA

### Testimonials
- 3 customer testimonial cards
- Star ratings
- Company trust indicators
- Responsive grid layout

### Dark Mode
- Persistent storage using localStorage
- Toggle button in header
- Smooth transitions
- Optimized colors for both modes

## API Endpoints

### `POST /api/subscribe`

Subscribe email to waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email address"
}
```

**Status Codes:**
- `200` - Successfully subscribed
- `400` - Invalid email or already subscribed
- `500` - Server error

## Email Storage

Emails are stored in `emails.json` as a simple JSON array:

```json
[
  "user1@example.com",
  "user2@example.com",
  "user3@example.com"
]
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: '#6366f1',    // Indigo
  secondary: '#8b5cf6',  // Purple
}
```

### Content
- Update hero copy in `components/Hero.jsx`
- Modify pricing tiers in `components/Pricing.jsx`
- Edit FAQs in `components/FAQ.jsx`
- Update testimonials in `components/Testimonials.jsx`

### Branding
- Change logo in `components/Header.jsx`
- Update company name throughout
- Modify social links in `components/Footer.jsx`

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

The app is a standard Next.js project, so it can be deployed to:
- Netlify
- AWS Amplify
- Heroku
- DigitalOcean
- Self-hosted servers

## Environment Variables

No external API keys required for basic functionality. Optional variables for production:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance

- ⚡ Fast static generation
- 📦 Optimized bundle size
- 🎯 SEO-friendly with Next.js Head
- 📱 Mobile-first responsive design
- 🌙 Minimal JavaScript for dark mode

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## License

MIT License - feel free to use this project as a starting point.

## Support

For issues or questions, refer to the FAQ section on the landing page or contact the development team.

---

Made with ❤️ for the AI Agent Platform
