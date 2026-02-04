# 🔒 IMPORTANT: Localhost Gateway Issue

## ⚠️ Problem

The dashboard has an issue when deployed to Hostinger (or any external server):

**Error Message:** "Gateway URL is set to localhost - this only works in development"

**Why This Happens:**
- The `.env.local` file has: `OPENCLAW_GATEWAY_URL=http://localhost:18789`
- When deployed to Hostinger, `localhost` refers to the **Hostinger server**
- Your OpenClaw gateway is running on **your local machine**
- Hostinger cannot connect to your local machine's localhost
- Connection fails!

---

## ✅ **SOLUTIONS**

### **Option 1: Run Dashboard Locally (Easiest for Now)** ⭐

The dashboard will work perfectly when running locally:

```bash
# The .env.local file is already configured correctly
cd /Users/orbit/.openclaw/workspace/daxper-dashboard

# Start development server
npm run dev
```

**Then visit:** `http://localhost:3000`

This connects to your actual OpenClaw gateway at `http://localhost:18789` ✅

---

### **Option 2: Use ngrok Tunnel** 🌐

Expose your OpenClaw gateway to the internet temporarily:

```bash
# Install ngrok (if not installed)
brew install ngrok

# Start tunnel for OpenClaw gateway
ngrok http 18789
```

You'll get a public URL like: `https://abc123.ngrok.io`

Then update `.env.local`:
```env
OPENCLAW_GATEWAY_URL=https://abc123.ngrok.io
```

Now Hostinger can connect to your local gateway via ngrok!

---

### **Option 3: Deploy OpenClaw Gateway** 🚀

Deploy the OpenClaw gateway to a public server (VPS, cloud, etc.):

1. Update `~/.openclaw/openclaw.json` to run on public IP
2. Restart OpenClaw gateway: `openclaw gateway restart`
3. Set `OPENCLAW_GATEWAY_URL` to public address in Hostinger env vars

---

### **Option 4: Host Dashboard on Same Server** 🏢

Host both the dashboard and OpenClaw gateway on the same server (Hostinger VPS):

1. Set up a VPS on Hostinger
2. Install and run OpenClaw gateway there
3. Set `OPENCLAW_GATEWAY_URL` to that server's address
4. Deploy dashboard to same Hostinger account

---

## 📋 **Quick Start Guide**

### For Testing RIGHT NOW (Recommended):

```bash
# 1. Go to dashboard directory
cd /Users/orbit/.openclaw/workspace/daxper-dashboard

# 2. Run locally
npm run dev

# 3. Open browser
# Visit: http://localhost:3000
# 4. Login with password from your email (tawzerus@gmail.com)
# 5. Chat with DaxPer - IT WORKS! ✅
```

### For Production Deployment:

**Don't deploy to Hostinger yet!** First choose one of the solutions above.

---

## 🔒 **Current Configuration**

The `.env.local` file is correctly configured for **local development**:

```env
✅ DAXPER_AUTH_PASSWORD = [emailed to you]
✅ OPENCLAW_GATEWAY_URL = http://localhost:18789
✅ OPENCLAW_GATEWAY_TOKEN = [pre-configured]
```

This setup works **perfectly for local development** but **not for external deployment**.

---

## 🎯 **Recommendation**

**Start with Option 1 (Run Locally)** to test everything works.

Then decide:
- Keep running locally? Use Option 1
- Need external access? Use Option 2 (ngrok)
- Need full production? Use Option 3 or 4

---

## 🐛 **If You See "localhost" Error**

This is **expected** when deployed to Hostinger with current config.

The chat API now shows this friendly error:
- Explains why it's not working
- Lists 3 possible solutions
- Provides helpful next steps

**You need to choose one solution** for external deployment to work.
