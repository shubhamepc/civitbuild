/**
 * SQL Generator Logic Reference
 * -----------------------------
 * The actual data generation is performed by the Sequelize Seeder (server/src/utils/seeder.js).
 * This ensures data integrity and correct foreign key relationships which are hard to maintain with raw SQL scripts.
 *
 * To generate data:
 * 1. Ensure `DATA_SOURCE=mock` in server/.env
 * 2. POST to http://localhost:5000/api/sync
 *
 * Below is the logic flow used for generation:
 */

// 1. Generate Clients
// INSERT INTO clients (name, contact_person, email...) VALUES ...

// 2. Generate Projects (linked to Clients)
// INSERT INTO projects (id, name, client_name...) VALUES ...

// 3. Generate Vendors
// INSERT INTO vendors (name, category...) VALUES ...

// 4. Generate Finance Records (linked to Projects)
// INSERT INTO finance_records (id, project_id, type, amount...) VALUES ...

// ... and so on for Inventory and Purchase Orders.

// Refer to `server/src/utils/seeder.js` for the complete implementation using Faker.js.
