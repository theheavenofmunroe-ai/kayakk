# Deployment Guide - Munroe Island Kayaking Website

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   npm run deploy:vercel
   ```

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   npm run deploy:railway
   ```

### Option 3: GitHub Actions (Automated)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy kayaking website with updated images"
   git push origin main
   ```

2. **Set up secrets in GitHub repository:**
   - `VERCEL_TOKEN`: Your Vercel token
   - `ORG_ID`: Your Vercel organization ID
   - `PROJECT_ID`: Your Vercel project ID
   - `RAILWAY_TOKEN`: Your Railway token (backup option)

## 🔧 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL=your_neon_database_url

# Email (Optional)
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=your_email@domain.com

# Production Settings
NODE_ENV=production
PORT=5000
```

## 📁 File Structure for Deployment

```
kayakk/
├── .github/workflows/deploy.yml  # GitHub Actions
├── client/                       # Frontend React app
│   ├── public/images/           # Your 55 kayaking photos
│   └── dist/                    # Built frontend (auto-generated)
├── server/                      # Backend Express API
├── vercel.json                  # Vercel configuration
├── railway.json                 # Railway configuration
└── package.json                 # Updated with deploy scripts
```

## 🖼️ Image Deployment Notes

- ✅ All 55 photos are in `client/public/images/`
- ✅ Kayaking service now uses `1 (15).jpg`
- ✅ Gallery displays all photos with unique descriptions
- ✅ Images are optimized for web deployment

## 🔍 Pre-Deployment Checklist

- [ ] Database connection configured
- [ ] Environment variables set
- [ ] All images copied to `client/public/images/`
- [ ] Build process completes successfully
- [ ] Local testing passed

## 🌐 Post-Deployment

1. **Test the live site**
2. **Verify all images load correctly**
3. **Check gallery functionality**
4. **Test booking forms**
5. **Confirm mobile responsiveness**

## 🆘 Troubleshooting

### Images not loading?
- Ensure images are in `client/public/images/`
- Check file names match exactly (case-sensitive)
- Verify build process includes public folder

### Build failing?
- Run `npm run check` to verify TypeScript
- Check all dependencies are installed
- Ensure Node.js version is 18+

### Database issues?
- Verify DATABASE_URL is correct
- Run `npm run db:push` to sync schema
- Check Neon database is accessible

## 📞 Support

If you need help with deployment:
1. Check the deployment logs
2. Verify all environment variables
3. Test locally first with `npm run dev`

---

**Your Munroe Island Kayaking website is ready for the world! 🚣‍♂️🌴**