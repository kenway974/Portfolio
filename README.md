# ✦ Freelance Developer Portfolio

A minimalist, dark-themed portfolio website for a freelance developer. Built with React + TypeScript (Vite) on the frontend and Node.js + Express on the backend.

---

## Project Structure

```
portfolio/
├── frontend/   # React + TypeScript (Vite)
└── backend/    # Node.js + Express API
```

---

## Prerequisites

- Node.js **18 LTS** or higher
- npm 9+

---

## Setup

### 1. Clone and install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure environment variables

**Frontend** (`frontend/.env`):
```bash
cp frontend/.env.example frontend/.env
# Edit VITE_API_URL if needed (leave blank for local dev — Vite proxy handles it)
```

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit SMTP_* variables if you want email delivery
# CONTACT_EMAIL is where contact form submissions are sent
```

---

## Running Locally

### Frontend (Vite dev server)

```bash
cd frontend
npm run dev
# → http://localhost:5173
```

### Backend (Express API)

```bash
cd backend
npm run dev
# → http://localhost:4000
```

The Vite dev server proxies `/api/*` requests to `http://localhost:4000` automatically.

---

## Content Management

All content lives in JSON files — no database required.

| File | Description |
|------|-------------|
| `frontend/src/data/projects.json` | Project cards in the carousel |
| `frontend/src/data/blog.json` | Blog posts |

### Adding a project

Edit `projects.json`:
```json
{
  "id": "7",
  "title": "My New Project",
  "logo": "🚀",
  "url": "https://example.com",
  "description": "Short project description",
  "tech": ["React", "Node.js"]
}
```

### Adding a blog post

Edit `blog.json`:
```json
{
  "id": "5",
  "title": "Post Title",
  "slug": "post-slug-here",
  "category": "Engineering",
  "date": "2024-04-01",
  "excerpt": "Short summary shown in listing.",
  "content": "Full content here.\n\n## Section Heading\n\nParagraph text.\n\n**Bold** text supported."
}
```

Blog post content supports:
- `## Heading` → section headings
- `**bold**` → bold text
- Blank lines → paragraph breaks

---

## Language Support

Toggle between **English** and **French** via the button in the navbar. All UI strings live in `frontend/src/i18n/index.ts`. To add more languages, extend the `resources` object there.

---

## Building for Production

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

---

## Deployment

### Frontend → Vercel

1. Push the `frontend/` directory to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Add environment variable: `VITE_API_URL=https://your-backend.up.railway.app`

The `vercel.json` handles SPA routing and asset caching automatically.

### Backend → Railway

1. Push the `backend/` directory to GitHub
2. Create a new project in [railway.app](https://railway.app)
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. Add environment variables (see `.env.example`)
5. Railway uses `railway.toml` for build/start configuration

---

## Environment Variables Reference

### Backend

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 4000) |
| `FRONTEND_URL` | Yes (prod) | Your Vercel frontend URL for CORS |
| `SMTP_HOST` | No | SMTP server hostname (enables email) |
| `SMTP_PORT` | No | SMTP port (default: 587) |
| `SMTP_SECURE` | No | Use TLS (default: false) |
| `SMTP_USER` | No | SMTP username / email |
| `SMTP_PASS` | No | SMTP password or app password |
| `CONTACT_EMAIL` | No | Where to send form submissions |

### Frontend

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL in production (blank = Vite proxy) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Routing | React Router v6 |
| i18n | i18next + react-i18next |
| Animations | CSS (IntersectionObserver) |
| Backend | Node.js 18, Express 4 |
| Email | Nodemailer (optional) |
| Deploy FE | Vercel |
| Deploy BE | Railway |
