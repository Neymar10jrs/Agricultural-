# BKIN Production Deployment Guide

Bharat Krishi Intelligence Network (BKIN) is engineered for zero-friction deployment across modern serverless, edge, and containerized platforms.

---

## 1. Vercel Deployment (Recommended for Instant Global CDN)

BKIN is built natively on the Next.js App Router and utilizes TypeScript API route handlers under `src/app/api/v1/...`, making it 100% compatible with Vercel out of the box with zero additional configuration.

### Steps:
1. Push the repository to GitHub / GitLab.
2. In the Vercel Dashboard, click **Add New Project** and import the `bkin` repository.
3. Keep default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or `scratch/bkin` if deployed from a monorepo)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Environment Variables (Optional):
   ```env
   NEXT_PUBLIC_API_URL=/api/v1
   NEXT_PUBLIC_DEMO_MODE=true
   ```
5. Click **Deploy**. Vercel will build all static pages, server components, and API routes within 60 seconds.

---

## 2. Netlify Deployment

BKIN functions cleanly on Netlify using the `@netlify/plugin-nextjs`.

### Steps:
1. Link your repository in Netlify.
2. Build Settings:
   - **Base directory**: `scratch/bkin`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Netlify automatically detects Next.js App Router and routes `/api/v1/*` through serverless edge functions.

---

## 3. Cloudflare Pages

1. In the Cloudflare Dashboard, go to **Workers & Pages** -> **Create application** -> **Pages**.
2. Connect your Git repository.
3. Build preset: **Next.js**.
4. Deploy.

---

## 4. Docker & Kubernetes Container Deployment

The project contains a production-ready multi-stage `Dockerfile` and `docker-compose.yml`.

### Single Container Build (Frontend):
```bash
docker build -t bkin-web:latest .
docker run -d -p 3000:3000 --name bkin-app bkin-web:latest
```

### Full Multi-Service Stack (Frontend + Python FastAPI):
```bash
docker-compose up --build -d
```
- Web Application: http://localhost:3000
- FastAPI Swagger Docs: http://localhost:8000/docs

---

## 5. Standalone FastAPI Python Backend Deployment (Render / Railway / Fly.io)

If you wish to deploy the Python FastAPI backend as an independent microservice:
1. Set the root directory to `backend/`.
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set the frontend environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-fastapi-backend.onrender.com/api/v1
   ```
