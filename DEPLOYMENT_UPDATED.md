# 🚀 DaxPer Dashboard - Deployment Guide (UPDATED)

## ✅ FIXED ISSUES

### 1. **Authentication Added** 🔐
- Login screen with password protection
- Secure session management via localStorage
- Logout functionality
- Default password: `daxper2026` (change in production!)

### 2. **Live API Connection** 🔗
- Chat now connects to OpenClaw gateway in real-time
- Messages sent to actual DaxPer agent
- Responses received live from OpenClaw

---

## 📦 Configuration Before Deployment

### Step 1: Set Environment Variables

Create `.env.local` file in the daxper-dashboard directory:

```bash
cd /Users/orbit/.openclaw/workspace/daxper-dashboard
cp .env.local.example .env.local
```

Edit `.env.local` and set your credentials:

```env
# Change this password in production!
DAXPER_AUTH_PASSWORD=your_secure_password

# OpenClaw Gateway URL (usually localhost:18789 for local)
OPENCLAW_GATEWAY_URL=http://localhost:18789

# Get your token from: ~/.openclaw/openclaw.json (gateway.auth.token)
OPENCLAW_GATEWAY_TOKEN=593c08f311284c10a73432621638ac78ff522152604e5c05
```

**IMPORTANT:** 
- Keep `.env.local` file private - DO NOT commit to GitHub
- It's already in `.gitignore`

---

## 🌐 Deployment to Hostinger

### Option A: Deploy from GitHub (Recommended)

1. **Login to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Navigate to **Hosting** > **Deploy Project**

2. **Connect GitHub**
   - Click **"Deploy from GitHub"**
   - Authorize Hostinger to access your GitHub
   - Select repository: `TawzerUs/daxper-dashboard`

3. **Configure Build Settings**

   **For Next.js:**
   ```
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   Node Version: 24.x (or latest)
   Install Command: npm install
   ```

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (~2-3 minutes)

5. **Set Environment Variables**
   - Go to project settings in Hostinger
   - Add these environment variables:
     - `DAXPER_AUTH_PASSWORD` = your_password
     - `OPENCLAW_GATEWAY_URL` = http://your-gateway-url:18789
     - `OPENCLAW_GATEWAY_TOKEN` = your_gateway_token

### Option B: Deploy via Vercel (Easier for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from dashboard directory
cd /Users/orbit/.openclaw/workspace/daxper-dashboard
vercel --prod

# Add environment variables
vercel env add DAXPER_AUTH_PASSWORD
vercel env add OPENCLAW_GATEWAY_URL
vercel env add OPENCLAW_GATEWAY_TOKEN
```

### Option C: GitHub Pages (Static Export)

**Note:** Next.js needs static export for GitHub Pages.

1. **Configure next.config.ts:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. **Update package.json:**

```json
{
  "scripts": {
    "export": "next build"
  }
}
```

3. **Build and Deploy:**

```bash
npm run export

# Copy .next/out to gh-pages branch
git checkout -b gh-pages
cp -r .next/out/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

4. **Enable GitHub Pages:**
   - Go to repo Settings > Pages
   - Set Source: `gh-pages` branch
   - Save

---

## 🧪 Testing After Deployment

### 1. Test Authentication
- Visit your deployed URL
- Should see login screen
- Enter password
- Should access dashboard

### 2. Test Live Chat
- Type a message
- Check if it reaches OpenClaw
- Verify response comes back

### 3. Check Connection
- Open browser DevTools (F12)
- Check Network tab
- Look for API calls to `/api/chat`
- Verify response status

---

## 🐛 Troubleshooting

### "Invalid password" error
- Check `DAXPER_AUTH_PASSWORD` env variable
- Clear browser localStorage
- Try login again

### "Failed to communicate with OpenClaw gateway"
- Check `OPENCLAW_GATEWAY_URL` is correct
- Verify `OPENCLAW_GATEWAY_TOKEN` is set
- Check if OpenClaw gateway is running

### Chat not working
- Check if OpenClaw is running: `openclaw gateway status`
- Check gateway URL matches config
- Check network connectivity

---

## 📝 Files Changed

**New Files:**
- `src/app/api/auth/login/route.ts` - Authentication endpoint
- `src/app/api/chat/route.ts` - Chat API endpoint
- `src/components/LoginScreen.tsx` - Login UI component

**Modified Files:**
- `src/app/page.tsx` - Added login/logout logic
- `src/components/DashboardHeader.tsx` - Added logout button
- `src/components/ChatInterface.tsx` - Updated to use real API

---

## ✅ What Works Now

1. ✅ **Password Protected** - Dashboard requires login
2. ✅ **Live Connection** - Chat connects to OpenClaw
3. ✅ **Session Management** - Stay logged in via localStorage
4. ✅ **Logout** - Secure logout functionality
5. ✅ **Build Successful** - Production-ready build

---

## 🎯 Next Steps

1. **Set environment variables** in Hostinger/Vercel
2. **Deploy to production**
3. **Test all features**
4. **Share URL with users**

---

**🛰️ DaxPer Dashboard - Ready for Production Deployment!**
