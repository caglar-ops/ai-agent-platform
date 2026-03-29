# Deployment Guide

## Local Development

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Development Features
- Hot reload on code changes
- Source maps for debugging
- Unminified assets
- Full error messages

---

## Production Build

### Building Locally

```bash
# Build the application
npm run build

# Start production server
npm start
```

This creates optimized bundles ready for deployment.

---

## Deployment Platforms

### Vercel (Recommended - Next.js creators)

**Easiest deployment path:**

```bash
npm install -g vercel
vercel
```

Follow prompts to:
1. Link to your Git repository
2. Set environment variables (if any)
3. Deploy

**Features:**
- Zero-config deployment
- Automatic preview URLs
- Built-in CI/CD
- Edge functions support
- Analytics included

**Costs:** Free tier available

### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy

**Alternative:** Direct file upload
```bash
npm run build
netlify deploy --prod --dir=.next
```

### AWS Amplify

1. Connect GitHub/GitLab repository
2. Select main branch
3. Edit build settings:
   ```
   Build: npm install && npm run build
   Start: npm start
   ```
4. Deploy

### DigitalOcean App Platform

1. Create new app
2. Connect repository
3. Build command: `npm install && npm run build`
4. Run command: `npm start`
5. Set environment to Node.js 18+
6. Deploy

### Heroku

```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Procfile:**
```
web: npm start
```

### Self-Hosted (VPS/Server)

#### Requirements
- Node.js 16+ and npm
- Server with SSH access
- Domain name

#### Setup Steps

1. **SSH into server:**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone repository:**
   ```bash
   git clone https://github.com/yourusername/ai-agent-platform.git
   cd ai-agent-platform
   ```

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Build application:**
   ```bash
   npm run build
   ```

5. **Start server** (use PM2 for persistence):
   ```bash
   npm install -g pm2
   pm2 start npm --name "agent-ai" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup reverse proxy** (Nginx):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL** (Let's Encrypt):
   ```bash
   sudo apt-get install certbot
   sudo certbot certonly -a nginx -d yourdomain.com
   ```

---

## Environment Variables

Create `.env.production.local` for production secrets:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X  # For Google Analytics
```

### Available Variables

- `NEXT_PUBLIC_SITE_URL` - Your production domain
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
- `NODE_ENV` - Always "production" in prod

---

## Email Storage in Production

The current implementation uses a local JSON file (`emails.json`). For production, consider:

### Option 1: Keep JSON (Single Server)
Good for small-scale deployments. Emails stored in `emails.json`.

```bash
# Backup regularly
cp emails.json emails.backup.json
```

### Option 2: Database (Recommended for Scale)

Update `pages/api/subscribe.js`:

```javascript
// Example with MongoDB
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  const db = client.db('agent-ai')
  const collection = db.collection('emails')

  // Check if exists
  const exists = await collection.findOne({ email })
  if (exists) {
    return res.status(400).json({ error: 'Email already subscribed' })
  }

  // Insert
  await collection.insertOne({ email, subscribedAt: new Date() })
  res.status(200).json({ success: true, message: 'Successfully subscribed!' })
}
```

### Option 3: Email Service Integration

Use services like:
- **Mailchimp** - Email marketing
- **SendGrid** - Transactional emails
- **ConvertKit** - Creator platform

---

## Post-Deployment Checklist

- [ ] Domain points to deployment
- [ ] SSL/HTTPS works
- [ ] Email subscription form works
- [ ] Dark mode persists
- [ ] Mobile responsive on actual devices
- [ ] Analytics tracking works (if enabled)
- [ ] Backup system in place
- [ ] Error logging configured
- [ ] Monitoring set up
- [ ] Auto-scaling enabled (if applicable)

---

## Monitoring & Maintenance

### Log Monitoring
```bash
# Vercel
vercel logs

# Self-hosted (PM2)
pm2 logs agent-ai
```

### Performance Monitoring
- Set up uptime monitoring: UptimeRobot, Pingdom
- Monitor response times
- Track error rates
- Monitor storage usage (emails.json)

### Regular Maintenance
- Keep dependencies updated: `npm update`
- Monitor security advisories: `npm audit`
- Backup emails.json weekly (if using file storage)
- Review analytics monthly

---

## Rollback Procedure

### If deployment fails:

**Vercel:**
```bash
vercel rollback
```

**Git-based:**
```bash
git revert <commit-hash>
git push
```

**Manual:**
- Restore from last backup
- Restart application

---

## Performance Optimization Tips

1. **Enable Gzip compression** - Most platforms do this automatically
2. **Set up CDN** - Cloudflare, AWS CloudFront
3. **Cache headers** - Static assets cached for longer
4. **Database optimization** - If using DB for emails
5. **Monitor Core Web Vitals** - Vercel provides this

---

## Cost Estimates

| Platform | Free Tier | Recommended Plan | Cost/Month |
|----------|-----------|------------------|-----------|
| Vercel | Yes | Pro | $20 |
| Netlify | Yes | Pro | $19 |
| AWS Amplify | 1000 build mins/mo | Pay as you go | $5-50 |
| DigitalOcean | No | $5 droplet | $5+ |
| Heroku | No (killed free tier) | Eco | $7 |

---

## Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Emails not saving in production
- Verify file permissions: `chmod 755 emails.json`
- Check disk space: `df -h`
- Verify write permissions: `ls -la emails.json`

### Slow deployment
- Check bundle size: `npm run build -- --analyze` (requires `@next/bundle-analyzer`)
- Optimize images
- Remove unused dependencies

### Dark mode not working
- Clear browser cache
- Check localStorage is enabled
- Verify `dark` class is applied to `<html>`

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Deployment**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Node.js**: https://nodejs.org/en/docs/

---

Last Updated: 2026-03-29
