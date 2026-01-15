# Deploying to Vercel (Frontend) & Render (Backend)

Since you chose **Vercel** for now, here is the fastest way to go live.

## Part 1: Deploy Frontend to Vercel
1.  Push your code to **GitHub**.
2.  Go to [Vercel.com](https://vercel.com) and **Add New Project**.
3.  Import your Repository.
4.  **Important Configuration**:
    *   **Root Directory**: Click "Edit" and select `client`.
    *   **Framework Preset**: Select `Vite`.
    *   **Environment Variables**:
        *   `VITE_API_URL`: `https://your-render-backend-url.onrender.com` (You will get this in Part 2).
5.  Click **Deploy**.

---

## Part 2: Deploy Backend to Render (Free)
Since your backend uses Node.js, Vercel is not the best fit for it (Vercel is for frontends). We will use **Render** (which is free and easy).

1.  Go to [Render.com](https://render.com) and sign up.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Important Configuration**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node src/index.js`
    *   **Environment Variables**:
         *   `NODE_ENV`: `production`
         *   `PORT`: `10000` (Render default)
5.  Click **Create Web Service**.
6.  Render will give you a URL (e.g., `https://civilbuild-api.onrender.com`).
    *   **Copy this URL** and go back to Vercel -> Project Settings -> Environment Variables.
    *   Add/Update `VITE_API_URL` with this new URL.
    *   Redeploy Vercel.

## Note on Database (SQLite)
Your current app uses `database.sqlite` (a file).
*   **On Render (Free Tier)**: Files are deleted every time you deploy. So your data will reset on every update.
*   **Fix**: For a real production app, you should use a cloud database (like **Neon Postgres** or **Supabase**) instead of SQLite.
*   **For Demo**: The current setup is fine, just know that data resets if the server restarts.
