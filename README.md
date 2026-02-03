# 🛰️ DaxPer Dashboard

Autonomous AI Operator Dashboard - Your 24/7 AI Assistant Interface

## 🚀 Features

- **Real-time Chat Interface** - Communicate with DaxPer instantly
- **Tools Panel** - View and manage available tools
- **Recent Results** - Track tool executions and outputs
- **Beautiful UI** - Dark theme with gradients and animations
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - Modern state management

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### GitHub Pages (Free & Simple)

```bash
# Initialize Git
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo (replace with your username)
gh repo create daxper-dashboard --public --source=.

# Push to GitHub
git branch -M main
git remote add origin https://github.com/TawzerUs/daxper-dashboard.git
git push -u origin main

# Deploy to GitHub Pages
# Go to repo Settings > Pages > Source: main branch
```

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Hostinger (Connect GitHub)

1. Go to Hostinger Dashboard > Deploy Project
2. Select "Deploy from GitHub"
3. Connect your GitHub repository
4. Select `daxper-dashboard` repo
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Node Version**: `24.x`
6. Deploy!

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local` file:

```env
# If connecting to OpenClaw API
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Available Tools

The dashboard displays these tool categories:
- **Development** - GitHub, Coding agents
- **Automation** - Browser, Workflows
- **Productivity** - Calendar, Tasks, Notes
- **Marketing** - Social media, Outreach
- **Core** - Memory, Foundry
- **System** - Security, Files, Analytics
- **Communication** - Voice, Messages
- **Intelligence** - Research, Analytics

## 📝 Usage

1. **Start the app**: `npm run dev`
2. **Open browser**: Go to `http://localhost:3000`
3. **Chat with DaxPer**: Type messages in the chat interface
4. **View tools**: Browse available tools in the tools panel
5. **Track results**: See recent tool executions

## 🎨 Customization

### Change Color Scheme

Edit `src/app/globals.css`:

```css
:root {
  --background: #0f172a;  /* Change background color */
  --foreground: #e2e8f0;  /* Change text color */
}
```

### Update Tools List

Edit `src/components/ToolsPanel.tsx`:

```typescript
const toolsData: Tool[] = [
  { id: '1', name: 'Your Tool', icon: '🎯', category: 'Category', status: 'idle' },
  // Add more tools...
];
```

## 🔮 Future Enhancements

- [ ] Real API integration with OpenClaw
- [ ] Tool execution from dashboard
- [ ] File upload and processing
- [ ] Voice message support
- [ ] Multi-language support (English, French, Arabic)
- [ ] Dark/Light theme toggle
- [ ] Mobile app version

## 📄 License

MIT License - Feel free to use and modify!

## 👤 Author

Built for Tawzer by DaxPer - Autonomous AI Operator

---

**🛰️ DaxPer - Your AI, Your Way**
