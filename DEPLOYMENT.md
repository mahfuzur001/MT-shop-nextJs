# Next.js Frontend Deployment to Vercel

## Prerequisites
1. GitHub account with repository
2. Vercel account (free tier available)
3. Backend API deployed (e.g., on Heroku, Railway, or similar)

## Steps to deploy to Vercel

### 1. Push to Git
```bash
cd MT-shop-nextJs
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel
- Go to https://vercel.com/new
- Select "Next.js" template or import from Git
- Choose your GitHub repository
- Select the `MT-shop-nextJs` folder as the root directory

### 3. Set Environment Variables in Vercel
In Vercel dashboard:
- Go to Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com`
  - Replace `your-backend-domain.com` with your actual backend URL
  - Must start with `https://` for production

### 4. Deploy
- Click "Deploy"
- Vercel will automatically build and deploy

## Environment Variables
- `NEXT_PUBLIC_API_BASE_URL` — Backend API URL (required in production)
  - Must be NEXT_PUBLIC to expose to client
  - Example: `https://api.myapp.com`

## Local development
```bash
# Create .env.local from the example
cp .env.local.example .env.local

# Update NEXT_PUBLIC_API_BASE_URL in .env.local to your backend URL

npm install
npm run dev
```

## Troubleshooting

### Image loading fails
- Ensure backend URL is accessible from Vercel
- Check CORS settings on backend
- Verify image paths in next.config.mjs include your backend domain

### API calls fail with Network Error
- Check if `NEXT_PUBLIC_API_BASE_URL` is set in Vercel env vars
- Verify backend API is accessible from production URL
- Check backend CORS_ALLOWED_ORIGINS includes your Vercel domain

## Notes
- Vercel will auto-detect Next.js and build correctly
- No need for custom build steps
- Automatic deployments on `git push`
- Free tier includes unlimited deployments
