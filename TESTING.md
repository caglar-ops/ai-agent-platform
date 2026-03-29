# Testing Guide

## Manual Testing Checklist

### Hero Section
- [ ] Email validation works (rejects invalid emails)
- [ ] Duplicate emails are rejected with proper message
- [ ] Success message appears after valid submission
- [ ] Form clears after successful submission
- [ ] Copy is clear and compelling
- [ ] CTA button is visible and clickable

### Responsive Design (Mobile-First)
- [ ] Mobile (375px): Single column layout
- [ ] Tablet (768px): 2-3 column layouts
- [ ] Desktop (1024px): Full layouts
- [ ] Header navigation collapses on mobile
- [ ] Buttons and forms are touch-friendly
- [ ] Images scale properly
- [ ] Text is readable at all sizes

### Dark Mode
- [ ] Toggle button works in header
- [ ] Preference persists on page reload
- [ ] All components have dark mode colors
- [ ] Text contrast is sufficient in both modes
- [ ] No white text on light background
- [ ] No dark text on dark background

### Pricing Section
- [ ] All 3 tiers display correctly
- [ ] "Most Popular" tier is highlighted
- [ ] Feature lists are visible
- [ ] CTA buttons are prominent
- [ ] Hover effects work smoothly
- [ ] Mobile stacks vertically

### FAQ Section
- [ ] Accordion opens/closes on click
- [ ] Only one accordion open at a time
- [ ] Chevron icon rotates on expand
- [ ] Text is readable in dark mode
- [ ] Mobile-friendly spacing

### Testimonials Section
- [ ] All 3 testimonials display
- [ ] Author info is visible
- [ ] Star ratings show
- [ ] Brand logos/names visible
- [ ] Grid responsive

### Navigation
- [ ] Header links scroll to sections
- [ ] Dark mode toggle works
- [ ] Sign In link is present
- [ ] Logo is clickable
- [ ] Sticky header works

### Performance
- [ ] Page loads quickly (<3s)
- [ ] No console errors
- [ ] Images are optimized
- [ ] CSS/JS is minified in production build

## Testing Email Functionality

### Successful Subscription
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{"success": true, "message": "Successfully subscribed!"}
```

### Invalid Email
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email"}'
```

Expected response:
```json
{"error": "Invalid email address"}
```

### Duplicate Email
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"duplicate@example.com"}'
```

Second request should return:
```json
{"error": "Email already subscribed"}
```

## Browser Testing

- [x] Chrome/Edge (latest)
- [x] Firefox (latest)
- [x] Safari (latest)
- [x] Mobile Chrome
- [x] Mobile Safari

## Accessibility Checklist

- [ ] All buttons have clear labels
- [ ] Form inputs have associated labels
- [ ] Color is not the only indicator
- [ ] Dark mode doesn't break readability
- [ ] Keyboard navigation works
- [ ] Focus states are visible

## Email Storage Verification

Check that emails are properly stored:

```bash
cat emails.json
```

Should contain array of email strings:
```json
[
  "email1@example.com",
  "email2@example.com"
]
```

## Load Testing

For light load testing:

```bash
# Using Apache Bench (if installed)
ab -n 100 -c 10 http://localhost:3000/

# Using curl loop
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/subscribe \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"user$i@example.com\"}"
done
```

## Deployment Testing

After deploying to production:

1. Test live URL loads correctly
2. Form submission works
3. Email validation works
4. Dark mode persists across visits
5. Mobile responsive
6. Social links work
7. Analytics tracking (if configured)

## Common Issues & Fixes

### Dark mode not persisting
- Check localStorage permissions
- Verify `toggleDarkMode` function updates DOM

### Form not submitting
- Check API endpoint is reachable
- Verify CORS headers if cross-origin
- Check browser console for errors

### Emails not saving
- Verify `emails.json` has write permissions
- Check file path in `subscribe.js`
- Ensure Node.js process has file access

### Slow performance
- Run `npm run build` for production optimizations
- Check for unused dependencies
- Verify images are optimized
- Use Next.js built-in Image component

---

Last Updated: 2026-03-29
