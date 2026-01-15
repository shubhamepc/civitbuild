# 🏗️ CivitBuild ERP Analytics Dashboard

A modern, full-stack ERP analytics dashboard built for construction project management with real-time data synchronization and comprehensive reporting.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

## 📋 Overview

CivitBuild ERP is a comprehensive analytics platform designed to streamline construction project management. It provides real-time insights into projects, finances, inventory, and employee management with an intuitive, modern interface.

## ✨ Features

- 📊 **Real-time Dashboard** - KPI cards, financial overview, and project progress charts
- 🏗️ **Project Management** - Sortable and filterable project tracking
- 💰 **Financial Analytics** - Comprehensive financial reporting and insights
- 📦 **Inventory Tracking** - Real-time inventory management
- 👥 **Employee Management** - Team oversight and resource allocation
- 🔄 **Auto-sync** - Hourly data synchronization with CivitBUILD APIs
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔐 **Secure Authentication** - JWT-based authentication system

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Beautiful, composable charts
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Sequelize** - ORM for database management
- **PostgreSQL** - Production database
- **SQLite** - Development database
- **JWT** - Authentication
- **Node-cron** - Scheduled tasks
- **Winston** - Logging

## 📁 Project Structure

```
CivitBuild/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Node.js backend
│   ├── src/
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── index.js     # Server entry point
│   └── package.json
├── docs/                # Documentation
├── DEPLOYMENT.md        # Deployment guide
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (for production) or SQLite (for development)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/shubhamepc/civitbuild.git
cd civitbuild
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.production .env  # Copy and configure environment variables
npm run dev
```
Server runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

**Default Login:** Any email/password (demo mode)

## 🌐 Deployment

This application is ready for deployment on modern cloud platforms.

### Recommended Setup
- **Frontend**: Vercel (Free tier available)
- **Backend**: Render / Railway (Free tier available)
- **Database**: Neon / Supabase (Free tier available)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shubhamepc/civitbuild)

**Detailed deployment instructions:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Mock Data

The system includes a comprehensive data generator that creates:
- 50 Projects with realistic timelines and budgets
- 20 Clients with contact information
- 300 Finance Records with transactions
- 100 Employees with roles and departments
- 500 Inventory Items with stock levels

Perfect for testing and demonstration purposes!

## 🔗 Data Sources

The application supports two data sources that can be switched via environment variable:

### 1. **Mock Data** (Default - Current)
- Generates realistic dummy data using Faker.js
- Perfect for development, testing, and demonstrations
- No external dependencies or API setup required
- Includes:
  - 50 Projects with realistic timelines and budgets
  - 20 Clients with contact information
  - 300 Finance Records with transactions
  - 100 Employees with roles and departments
  - 500 Inventory Items with stock levels

### 2. **CivitBUILD API** (Production - Coming Soon)
- Direct integration with CivitBUILD platform
- Real-time construction project data
- Live synchronization with CivitBUILD ERP
- **Setup Guide**: [CIVITBUILD_API_INTEGRATION.md](./docs/CIVITBUILD_API_INTEGRATION.md)

### Switching Data Sources

```bash
# Use Mock Data (Current)
DATA_SOURCE=mock

# Use CivitBUILD API (Future)
DATA_SOURCE=civitbuild
CIVIT_API_URL=https://api.civitbuild.com/v1
CIVIT_API_KEY=your_api_key
CIVIT_API_SECRET=your_api_secret
```

## �🔧 Configuration

### Environment Variables

#### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/civilbuild_erp
JWT_SECRET=your-secret-key
DATA_SOURCE=mock  # or 'civitbuild' for real API
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

## 📖 Documentation

- **[Setup Guide](./SETUP.md)** - Detailed setup instructions
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment guide
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and database schema

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- CivitBUILD API for data integration
- React and Node.js communities
- All contributors who help improve this project

## 📧 Support

For support, email support@example.com or open an issue in the repository.

---

**Made with ❤️ for better construction project management**
