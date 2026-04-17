# 🚀 AI Debug Assistant

AI-powered code debugging tool that analyzes code, identifies errors, suggests fixes, and explains issues. Built with Node.js, MongoDB Atlas, OpenAI GPT-4o-mini.

[![Frontend Preview](frontend-screenshot.png)](frontend/index.html)

## ✨ Features

- **AI Code Analysis** - GPT-4o-mini powered error detection & fixes
- **Multi-Language** - Python, JavaScript, Java, C, C++
- **Persistent History** - MongoDB Atlas storage
- **Modern UI** - Responsive, mobile-friendly
- **Production Ready** - Netlify + Render + Atlas deployment

## 🛠️ Quick Start

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables (.env)
```env
OPENAI_API_KEY=sk-proj-your-key-here
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/ai-debug-assistant
PORT=5000
```

### 3. MongoDB Atlas Setup
```
Database: ai-debug-assistant
Collection: analyses (auto-created)
Network Access: 0.0.0.0/0
```

**Atlas Search Index (Advanced):**
```json
{
  "mappings": {
    "dynamic": true
  },
  "searchAnalyzer": "lucene.standard",
  "synonyms": "https://your-synonym-map.json"
}
```

### 4. Run
```bash
# Backend
npm start

# Frontend
open frontend/index.html
```

## 📱 Test It

**Language:** JavaScript  
**Buggy Code:**
```js
function factorial(n) {
  return n * factorial(n-1)  // Infinite recursion!
}
```

**AI Output:**
```
Error: Infinite recursion - no base case
Fix: function factorial(n) { if(n<=1) return 1; return n*factorial(n-1); }
Explanation: Added base case n<=1...
```

## 🌐 API Endpoints

```
POST /analyze
{
  "code": "...",
  "language": "JavaScript"
}

GET /history
```

## 🚀 Production Deployment

| Component | Platform | Setup |
|-----------|----------|-------|
| Frontend | Netlify | Drag `frontend/` folder |
| Backend | Render | GitHub repo + env vars |
| Database | MongoDB Atlas | Free M0 cluster |

## 🛠️ Tech Stack

```
Frontend: HTML5/CSS3/Vanilla JS
Backend: Node.js + Express + CORS
AI: OpenAI GPT-4o-mini
Database: MongoDB + Mongoose
Deployment: Netlify/Render/Atlas
```

## 🎯 Usage

1. **Paste Code** → Select Language
2. **Ctrl+Enter** → Analyze instantly
3. **View History** → See past analyses
4. **Copy Fixes** → Production-ready code

## 📈 Enhancements (Next Level)

- [ ] Monaco Editor (syntax highlighting)
- [ ] Dark Mode toggle
- [ ] Code complexity analysis
- [ ] PDF reports
- [ ] Real-time collaboration

## 🤝 Contributing

```
1. Fork repo
2. npm install
3. Create feature branch
4. npm run dev
5. PR to main
```

## 📄 License

MIT License - Free to use in portfolio/resume!

---

**Resume Line:** `Built AI-powered Debug Assistant (Node + MongoDB Atlas + OpenAI) - analyzes code errors, generates fixes/explanations, persistent history. Production deployed.`
