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

All content lives in the repo — no database required.

| File | Description |
|------|-------------|
| `frontend/src/data/services.ts` | Service pages (`/services/:slug`): SEO title, description, H1, content sections, FAQ, related projects and services |
| `frontend/src/data/realisations.ts` | Project pages (`/realisations/:slug`): type (client, internal tool, certification project, demo), context, challenges, features, outcome |
| `frontend/src/data/blog.json` | Blog posts (`/blog/:slug`) |
| `frontend/src/data/secteurs.ts` | Sector pages (`/secteurs/:slug`, recruiter profile at `/profil`) and the « Vous êtes… ? » wheel on the home page: situations, packs and prices |
| `frontend/src/data/diagnostic.ts` | Questions of the needs wizard (`/diagnostic`) and the scoring that maps answers to services |

Other pages: `/contact` (contact page) and `/diagnostic` (needs wizard, ends with a pre-filled contact form).

Adding an entry to one of these files creates the page, its share image and its sitemap entry at the next build.

In `services.ts` and `realisations.ts`, a paragraph starting with `- ` is rendered as a bullet.
The contact form's project types come from `services.ts`; keep `SERVICE_TYPES` in `backend/src/routes/contact.js` in sync.

Blog post content supports:
- `## Heading` → section headings
- `**bold**` → bold text
- Blank lines → paragraph breaks

---

## SEO

- Site URL, name and social profiles live in `frontend/site.config.json` (single source of truth).
- Every page renders its tags through `src/components/Seo.tsx` (title, description, canonical, Open Graph, Twitter, JSON-LD).
- Structured data builders are in `src/seo.ts` (WebSite, Person, ProfessionalService, Service, FAQPage, CreativeWork, CollectionPage, Blog, BlogPosting, BreadcrumbList).
- `npm run build` pre-renders every page (vite-react-ssg), then `scripts/postbuild.mjs` reads the generated HTML to build `sitemap.xml`, `robots.txt` and the 1200×630 share images (`/og/*.png`, from each page's H1). Nothing to maintain by hand.
- Optional `updated` field (`YYYY-MM-DD`) on a blog post sets its `lastmod` / `dateModified`.

## Texts

The site is French only. All UI strings live in `frontend/src/i18n/fr.ts`, read with `t('key')` / `tList('key')` from `src/i18n`.

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

`vercel.json` handles clean URLs, security headers and asset caching.

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
| SSG / SEO | vite-react-ssg, satori + resvg (share images) |
| Animations | CSS (IntersectionObserver) |
| Backend | Node.js 18, Express 4 |
| Email | Nodemailer (optional) |
| Deploy FE | Vercel |
| Deploy BE | Railway |
