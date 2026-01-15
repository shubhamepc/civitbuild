const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.saveSettings = async (req, res) => {
    try {
        const config = req.body;

        console.log("------------------------------------------------");
        console.log("RECEIVED SYSTEM CONFIGURATION UPDATE:");
        console.log("Data Source:", config.dataSource);
        console.log("API URL:", config.apiUrl);
        console.log("------------------------------------------------");

        // Simulate verifying the connection to CivilBuild ERP
        if (config.dataSource === 'civitbuild') {
            try {
                // Verify connection by hitting the API
                await axios.get(`${config.apiUrl}/todos/1`);
                console.log("Connection Verified: External API is reachable.");

                return res.json({
                    success: true,
                    message: `Successfully connected to ${config.apiUrl}`
                });
            } catch (apiError) {
                console.error("API Connection Failed:", apiError.message);
                return res.status(502).json({ error: 'Failed to connect to external API URL' });
            }
        }

        res.json({ success: true, message: 'Configuration saved (Mock Mode active).' });
    } catch (error) {
        console.error("Settings Error:", error);
        res.status(500).json({ error: 'Failed to save settings' });
    }
};
