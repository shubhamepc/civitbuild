# 🚀 Quick Vercel Deployment Guide

Your code is now on GitHub! Let's deploy it to Vercel.

## 📍 Repository URL
https://github.com/shubhamepc/civitbuild

---

## 🎯 Step 1: Deploy Frontend to Vercel

### Option A: One-Click Deploy (Easiest)
Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shubhamepc/civitbuild)

### Option B: Manual Deploy

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Git Repository"
   - Select: `shubhamepc/civitbuild`
   - Click "Import"

3. **Configure Project**
   ```
   Project Name: civitbuild-erp
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add: `VITE_API_URL`
   - Value: `http://localhost:5000` (temporary - will update after backend deployment)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy your frontend URL (e.g., `https://civitbuild-erp.vercel.app`)

---

## 🖥️ Step 2: Deploy Backend to Render

1. **Go to Render**
   - Visit: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `shubhamepc/civitbuild`

3. **Configure Service**
   ```
   Name: civitbuild-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-super-secret-key-change-this
   DATA_SOURCE=mock
   FRONTEND_URL=https://civitbuild-erp.vercel.app
   ```

   **For Database URL:**
   - If using Render PostgreSQL: Create a PostgreSQL database first, then copy the "External Database URL"
   - If using Neon/Supabase: Get connection string from their dashboard
   
   ```
   DATABASE_URL=your-postgres-connection-string
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL (e.g., `https://civitbuild-backend.onrender.com`)

---

## 🔄 Step 3: Connect Frontend to Backend

1. **Go back to Vercel Dashboard**
   - Navigate to your project
   - Go to Settings → Environment Variables

2. **Update VITE_API_URL**
   - Find `VITE_API_URL`
   - Click "Edit"
   - Change value to your Render backend URL
   - Example: `https://civitbuild-backend.onrender.com`
   - Save

3. **Redeploy Frontend**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Or just push a new commit to trigger auto-deploy

---

## ✅ Step 4: Test Your Deployment

1. **Visit your Vercel URL**
   - Example: `https://civitbuild-erp.vercel.app`

2. **Check Health**
   - Visit: `https://civitbuild-backend.onrender.com/health`
   - Should return: `{"status":"healthy",...}`

3. **Test Login**
   - Use any email/password (demo mode)
   - Should see the dashboard

---

## 🗄️ Database Setup (If needed)

### Option A: Render PostgreSQL (Free)
1. In Render Dashboard → "New +" → "PostgreSQL"
2. Name: `civitbuild-db`
3. Create database
4. Copy "External Database URL"
5. Add to backend environment variables as `DATABASE_URL`

### Option B: Neon (Recommended - Better Free Tier)
1. Go to https://neon.tech
2. Sign up and create new project
3. Copy connection string
4. Add to backend environment variables as `DATABASE_URL`

### Option C: Supabase
1. Go to https://supabase.com
2. Create new project
3. Settings → Database → Connection string
4. Copy and add to backend environment variables

---

## 🎉 You're Done!

Your application should now be live at:
- **Frontend**: `https://civitbuild-erp.vercel.app`
- **Backend**: `https://civitbuild-backend.onrender.com`

---

## 🔧 Troubleshooting

### Frontend shows "Network Error"
- Check if `VITE_API_URL` is set correctly in Vercel
- Verify backend is running (visit `/health` endpoint)
- Check CORS settings in backend

### Backend shows "Database connection error"
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure database allows connections from Render's IP

### "Data not loading"
- Check backend logs in Render dashboard
- Verify `DATA_SOURCE=mock` is set
- Check if database seeding completed

---

## 📊 Monitoring

- **Vercel**: Dashboard → Your Project → Analytics
- **Render**: Dashboard → Your Service → Logs
- **Database**: Check your database provider's dashboard

---

## 💰 Cost

**Current Setup (Free Tier):**
- Vercel: Free
- Render: Free (with sleep after 15 min inactivity)
- Neon/Supabase: Free

**Note**: Free tier backend may sleep after inactivity. First request after sleep takes ~30 seconds to wake up.

---

**Need help?** Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide.
