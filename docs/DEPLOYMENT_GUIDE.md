# Deployment Guide for CivilBuild ERP Dashboard

Since your application fetches data via API from an external ERP (CivilBuild) or your own backend, the hosting choice depends heavily on **Performance (Latency)**, **Security**, and **Scalability**.

## 🚀 Best Overall Recommendation: AWS (Amazon Web Services)
**Why?**
*   **Performance**: If you use the **Mumbai Region (`ap-south-1`)**, the latency for Indian users will be extremely low (~20-50ms).
*   **Security**: Enterprise-grade security (WAF, VPC) which is crucial if you are handling sensitive construction/financial data.
*   **Scalability**: "Shubham EPC" sounds like a growing company; AWS scales indefinitely.

### How to Deploy on AWS:
1.  **Frontend (React)**: host on **AWS Amplify** or **S3 + CloudFront**.
2.  **Backend (Node.js)**: Host on **AWS App Runner** (easiest) or **EC2** (full control).
3.  **Domain**: Point `dashboard.shubhamepc.com` to your AWS resources.

---

## ⚡ Easiest for Developers: Vercel + Render
**Why?**
*   **Speed**: Vercel is built by the creators of Next.js/React tooling. It is incredibly fast and has a global CDN.
*   **Simplicity**: You can deploy by simply connecting your GitHub repository.
*   **Cost**: Free tiers available for development.

### How to Deploy:
1.  **Frontend**: Connect your git repo to **Vercel**.
    *   Set Environment Variable: `VITE_API_URL` = `https://your-backend-api.onrender.com`
2.  **Backend**: Deploy your Node.js server to **Render** or **Railway**.

---

## 💰 Cost-Effective & Simple: DigitalOcean
**Why?**
*   **Predictable Pricing**: You know exactly what you pay ($5-$10/month).
*   **App Platform**: Similar to Vercel but for both frontend and backend in one place.
*   **Data Center**: They have a Bangalore data center for good speed in India.

---

## 🛠️ Important Configuration (Done)
I have already refactored your code to use Environment Variables for the API connection.
*   **Local**: Uses `http://localhost:5000`
*   **Production**: You simply set the `VITE_API_URL` variable in your hosting dashboard (AWS/Vercel/etc.) to your live backend URL.

### Recommended Production Setup for Shubham EPC:
*   **Frontend**: AWS S3 + CloudFront (Mumbai) OR Vercel.
*   **Backend**: AWS EC2 (Mumbai).
*   **Database**: AWS RDS (PostgreSQL/MySQL).
