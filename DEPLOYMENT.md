# CivitBuild ERP - Deployment Guide

## 🌐 Deployment Architecture

This application consists of two parts:
1. **Frontend (React + Vite)** → Deploy to Vercel
2. **Backend (Node.js + Express)** → Deploy to Render/Railway/Heroku

---

## 📦 Part 1: Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed locally

### Step 1: Prepare the Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit for deployment"
```

2. **Create a GitHub repository** and push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/civitbuild-erp.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

#### Method A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Navigate to client directory**:
```bash
cd client
```

3. **Deploy**:
```bash
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? `civitbuild-erp`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Deploy to production**:
```bash
vercel --prod
```

#### Method B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - `VITE_API_URL`: (Your backend URL - see Part 2)

5. Click **Deploy**

---

## 🖥️ Part 2: Deploy Backend

### Option A: Deploy to Render (Recommended - Free Tier Available)

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click **New +** → **Web Service**
4. Connect your repository
5. Configure:
   - **Name**: `civitbuild-erp-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=<your-postgres-url>
   JWT_SECRET=<generate-strong-secret>
   DATA_SOURCE=mock
   ```

7. Click **Create Web Service**

8. **Get your backend URL** (e.g., `https://civitbuild-erp-backend.onrender.com`)

9. **Update Frontend Environment Variable** on Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_URL` to your Render backend URL
   - Redeploy the frontend

### Option B: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Configure:
   - **Root Directory**: `server`
   - Add environment variables (same as Render)
6. Deploy and get your backend URL

### Option C: Deploy to Heroku

1. Install Heroku CLI
2. Navigate to server directory:
```bash
cd server
heroku login
heroku create civitbuild-erp-backend
```

3. Add PostgreSQL:
```bash
heroku addons:create heroku-postgresql:mini
```

4. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set DATA_SOURCE=mock
```

5. Deploy:
```bash
git subtree push --prefix server heroku main
```

---

## 🗄️ Part 3: Database Setup (Production)

### Option A: Use Render PostgreSQL (Free)
1. In Render Dashboard → New → PostgreSQL
2. Copy the **External Database URL**
3. Add it to your backend environment variables as `DATABASE_URL`

### Option B: Use Neon (Serverless Postgres - Free)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add it to your backend environment variables

### Option C: Use Supabase (Free)
1. Go to https://supabase.com
2. Create a new project
3. Get the connection string from Settings → Database
4. Add it to your backend environment variables

---

## ✅ Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway/Heroku
- [ ] Database provisioned and connected
- [ ] Environment variables configured on both platforms
- [ ] CORS configured in backend to allow frontend domain
- [ ] Frontend `VITE_API_URL` points to backend URL
- [ ] Test login functionality
- [ ] Verify data sync is working
- [ ] Check all API endpoints are accessible

---

## 🔧 Update CORS for Production

Update `server/src/index.js` to allow your Vercel frontend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',
    'https://civitbuild-erp.vercel.app'
  ],
  credentials: true
}));
```

---

## 🔄 Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:
- **Push to `main` branch** → Automatic deployment
- **Pull requests** → Preview deployments (Vercel)

---

## 📊 Monitoring

- **Vercel**: Built-in analytics and logs
- **Render**: Logs available in dashboard
- **Database**: Monitor connections and queries

---

## 🚨 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable
- Verify CORS settings in backend
- Check backend is running (visit backend URL)

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure IP whitelist includes your backend host

### Build failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

---

## 💰 Cost Estimate

**Free Tier Setup:**
- Vercel Frontend: Free
- Render Backend: Free (with limitations)
- Neon/Supabase Database: Free (with limitations)

**Total: $0/month** (with free tier limitations)

**Recommended Production Setup:**
- Vercel Pro: $20/month
- Render Starter: $7/month
- Database: $10-20/month

**Total: ~$37-47/month**
