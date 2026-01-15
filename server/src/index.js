const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { initModels, Project } = require('./models');
const startScheduler = require('./services/cron');
const civitService = require('./services/civitService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

// CORS Configuration for Production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Add your Vercel URL here
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        dataSource: process.env.DATA_SOURCE
    });
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Manual trigger for sync
app.post('/api/sync', async (req, res) => {
    try {
        const result = await civitService.syncProjects();
        res.json({ message: 'Sync started successfully', details: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sync failed' });
    }
});

// Start Server
const startServer = async () => {
    await initModels();

    // Initial Seed if mocked (Auto-run for demo)
    if (process.env.DATA_SOURCE === 'mock') {
        console.log('Use Mock Data: Triggering initial seed checks...');
        // Check if we have projects, if not, seed
        const count = await Project.count();
        if (count === 0) {
            console.log('Database appears empty. Seeding now...');
            await civitService.syncProjects();
        } else {
            console.log('Database already has data. Skipping auto-seed.');
        }
    }

    startScheduler();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
