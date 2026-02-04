# 🚀 DaxPer Dashboard - Deployment Guide (SIMPLIFIED)

## ⚠️ HOSTINGER ENVIRONMENT VARIABLES

**Hostinger expects this format (key=value, one per line):**

```env
DAXPER_AUTH_PASSWORD=your_password_here
OPENCLAW_GATEWAY_URL=http://localhost:18789
OPENCLAW_GATEWAY_TOKEN=your_gateway_token_here
```

**NOT this format:**
```env
# ❌ WRONG
DAXPER_AUTH_PASSWORD=…value…

# ❌ WRONG
KEY … value
```

---

## 📝 HOW TO ADD IN HOSTINGER

### Step 1: Login to Hostinger
1. Go to: https://hpanel.hostinger.com
2. Navigate to: **Hosting** > **Deploy Project**
3. Click: **Deploy from GitHub**
4. Select: `TawzerUs/daxper-dashboard`

### Step 2: Configure Build Settings
```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Node Version: 24.x
```

### Step 3: Add Environment Variables

**In Hostinger project settings → Environment Variables:**

```env
# Authentication password (check your email: tawzerus@gmail.com)
DAXPER_AUTH_PASSWORD=CQLCX8whlps3ywwDv+qIAvDwZMhZaGXo

# OpenClaw Gateway URL (for production, change localhost to actual server)
OPENCLAW_GATEWAY_URL=http://localhost:18789

# Gateway token (get from: cat ~/.openclaw/openclaw.json | grep token)
OPENCLAW_GATEWAY_TOKEN=593c08f311284c10a73432621638ac78ff522152604e5c05
```

**Important:**
- One variable per line
- `KEY=value` format (no "…")
- Click "Add" after each variable
- Save changes

---

## 🌐 DEPLOYMENT OPTIONS

### **Option A: Run Locally (RECOMMENDED)** ⭐

**Works immediately, no deployment needed:**

```bash
cd /Users/orbit/.openclaw/workspace/daxper-dashboard
npm run dev
```

Then visit: `http://localhost:3000`

**This works because:**
- `localhost` connects to your actual OpenClaw gateway
- All features work immediately
- No deployment complexity

---

### **Option B: Use ngrok Tunnel**

**If you need external access:**

```bash
# Install ngrok
brew install ngrok

# Start tunnel for OpenClaw gateway
ngrok http 18789
```

You'll get a URL like: `https://abc123.ngrok.io`

Then update `.env.local`:
```env
OPENCLAW_GATEWAY_URL=https://abc123.ngrok.io
```

Deploy to Hostinger with this URL.

---

### **Option C: Deploy OpenClaw to Public Server**

1. Get a VPS or cloud server
2. Install and run OpenClaw gateway there
3. Update `.env.local` with that server's address
4. Deploy dashboard to same Hostinger account

---

## 🧪 TESTING AFTER DEPLOYMENT

### 1. Test Authentication
- Visit your deployed URL
- Enter password from your email (tawzerus@gmail.com)
- Should access dashboard successfully

### 2. Test Connection
- Type: "Test message"
- If connected to localhost: ✅ Works
- If deployed: Need ngrok or public server

### 3. Check Logs
- Open browser DevTools (F12)
- Check Console tab for log messages
- All operations are logged with timestamps

---

## 🐛 TROUBLESHOOTING

### "Invalid password"
- Check your email: tawzerus@gmail.com
- Verify password in Hostinger env vars
- Clear browser localStorage

### "Gateway connection error"
- If using localhost: That's expected! Run locally instead.
- If using ngrok: Make sure tunnel is running
- Check OpenClaw gateway is running: `openclaw gateway status`

### "App won't start"
- Check Node version is 24.x or higher
- Verify environment variables are set
- Check build completed: `npm run build`

---

## 📋 CHECKLIST

Before deploying to Hostinger:

- [ ] Read password from email (tawzerus@gmail.com)
- [ ] Use correct format: `KEY=value` (not `KEY … value`)
- [ ] Add each variable one at a time
- [ ] Save changes in Hostinger
- [ ] Click Deploy
- [ ] Wait for deployment (2-3 minutes)
- [ ] Test login functionality
- [ ] Test chat functionality

---

## 🎯 RECOMMENDATION

**Start with Option A (Run Locally)**

It works immediately with full features and no configuration needed on Hostinger's side.

For external access later, use ngrok or deploy OpenClaw gateway to a public server.

---

**🛰️ DaxPer Dashboard - Simple & Working!**
