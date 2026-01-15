const seedData = require('../utils/seeder');
const erpnextService = require('./erpnextService');
const logger = require('../utils/logger');

class CivitService {
    constructor() {
        this.dataSource = process.env.DATA_SOURCE || 'mock';
    }

    async syncProjects() {
        logger.info(`Data source: ${this.dataSource}`);

        switch (this.dataSource) {
            case 'mock':
                logger.info('DATA_SOURCE is mock. Running seeder...');
                return await seedData();

            case 'erpnext':
                logger.info('DATA_SOURCE is erpnext. Syncing from ERPNext...');
                return await erpnextService.syncAll();

            case 'civitbuild':
                logger.info('DATA_SOURCE is civitbuild. Fetching from CivitBUILD API...');
                // TODO: Implement CivitBUILD API integration
                return { status: 'CivitBUILD sync not implemented yet' };

            default:
                logger.warn(`Unknown DATA_SOURCE: ${this.dataSource}. Falling back to mock.`);
                return await seedData();
        }
    }

    /**
     * Get current data source
     */
    getDataSource() {
        return this.dataSource;
    }

    /**
     * Set data source (useful for testing)
     */
    setDataSource(source) {
        if (['mock', 'erpnext', 'civitbuild'].includes(source)) {
            this.dataSource = source;
            logger.info(`Data source changed to: ${source}`);
        } else {
            logger.error(`Invalid data source: ${source}`);
            throw new Error(`Invalid data source: ${source}`);
        }
    }
}

module.exports = new CivitService();
