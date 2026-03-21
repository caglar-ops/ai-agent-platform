# AI Agent Platform - Landing Page

A modern, conversion-focused landing page for the AI Agent Platform. Built with clean HTML/CSS and progressive JavaScript.

## Features

✨ **Modern Design**
- Responsive gradient design
- Smooth animations and transitions
- Mobile-first approach

🎯 **Conversion Focused**
- Clear hero section with strong CTAs
- Early access signup form
- Pricing tier preview (3 tiers)
- Feature highlights with icons

📱 **Interactive Elements**
- Smooth scroll navigation
- Form validation
- Scroll animations
- Active navigation states

## Structure

```
ai-agent-platform/
├── index.html          # Main landing page
├── styles.css          # All styling and animations
├── script.js           # Interactive features
└── README.md           # This file
```

## Sections

### 1. Navigation Bar
- Sticky navigation with brand logo
- Quick links to features, pricing, and signup

### 2. Hero Section
- Large headline: "Build Autonomous AI Agents in Minutes"
- Subheadline with value proposition
- Call-to-action button
- Visual gradient box element

### 3. Early Access Signup
- Email capture form
- Fields: Name, Email, Company, Role
- Success feedback
- No credit card required

### 4. Features Overview
- 6 feature cards with icons
- Hover animations
- Highlights key capabilities

### 5. Pricing Tiers
- **Starter** - $99/month (up to 5 agents)
- **Professional** - $499/month (unlimited agents, most popular)
- **Enterprise** - Custom pricing (white-label, on-premise)

### 6. Footer
- Product, Company, Legal, and Social links
- Copyright information

## Customization

### Colors
Edit `:root` variables in `styles.css`:
```css
--primary: #6366f1      /* Main brand color */
--secondary: #ec4899    /* Accent color */
--dark: #1f2937         /* Dark text */
--light: #f9fafb        /* Light backgrounds */
```

### Content
All text is easily editable in `index.html`. Key sections:
- Hero title/subtitle
- Feature descriptions
- Pricing details
- Footer links

### Form Integration
The signup form in `script.js` currently logs data to console. To integrate:
1. Replace console.log with API call to your backend
2. Update the success message timing
3. Add error handling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Zero external dependencies
- Pure CSS animations
- Minimal JavaScript (3.5KB)
- Optimized for Core Web Vitals
- ~25KB total with CSS

## Accessibility

- Semantic HTML structure
- ARIA labels ready
- Keyboard navigation support
- Sufficient color contrast
- Focus states on interactive elements

## Getting Started

Simply open `index.html` in a web browser or serve through any web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Visit `http://localhost:8000` in your browser.

## Next Steps

1. Replace placeholder links in footer with actual URLs
2. Connect signup form to email service (Mailchimp, Segment, etc.)
3. Add analytics tracking (Google Analytics, etc.)
4. Update pricing and feature details as needed
5. Deploy to hosting service

---

Built for Caglar's AI Agent Platform | 2026
