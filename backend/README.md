# THUNAI Backend - Render Deployment Guide

## 1. Prerequisites
- Node.js 18+ (Render default)
- PostgreSQL database (Render provides this)
- Set up environment variables in Render dashboard:
  - `DATABASE_URL` (from Render PostgreSQL)
  - Any other .env variables your app needs

## 2. Build & Start Commands
- **Build Command:**
  ```sh
  npm run render-build
  ```
- **Start Command:**
  ```sh
  npm start
  ```

## 3. Render Settings
- Root Directory: `backend`
- Auto-detect build/start commands or set as above
- Add a PostgreSQL database in Render and link it
- Add environment variables in the Render dashboard

## 4. Prisma Notes
- The build script runs `prisma generate` before building
- If you use migrations, add a migration step in the build command or use a Render migration hook

## 5. API URL
- Your backend will be available at `https://<your-service-name>.onrender.com`
- Point your frontend API URL to this address

## 6. Troubleshooting
- Check Render logs for errors
- Ensure all environment variables are set
- Make sure `dist/index.js` exists after build

---
For help, see https://render.com/docs/deploy-node-express-app or ask the assistant. 