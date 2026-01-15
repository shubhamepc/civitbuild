const cron = require('node-cron');
const civitService = require('./civitService');

const startScheduler = () => {
    // Schedule task to run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled data sync...');
        await civitService.syncProjects();
    });

    console.log('Cron scheduler started.');
};

module.exports = startScheduler;
