const seedData = require('../utils/seeder');

class CivitService {
    constructor() {
        this.dataSource = process.env.DATA_SOURCE || 'mock';
    }

    async syncProjects() {
        if (this.dataSource === 'mock') {
            console.log('DATA_SOURCE is mock. Running seeder...');
            return await seedData(); // This returns the result of the seeder
        } else {
            console.log('DATA_SOURCE is civitbuild. Fetching from API...');
            // Logic for real API would be here
            return { status: 'Real sync not implemented yet' };
        }
    }
}

module.exports = new CivitService();
