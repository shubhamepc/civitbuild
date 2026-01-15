const { faker } = require('@faker-js/faker');
const {
    Project, Client, FinanceRecord, Vendor, PurchaseOrder, InventoryItem, Employee, User
} = require('../models');

async function seedData() {
    console.log('Starting data seeding...');

    try {
        // 1. Clients (20)
        const clients = [];
        for (let i = 0; i < 20; i++) {
            clients.push({
                name: faker.company.name(),
                contact_person: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress()
            });
        }
        await Client.bulkCreate(clients);
        console.log('Created 20 Clients');

        // 2. Projects (50)
        const projects = [];
        const statuses = ['Planning', 'In Progress', 'On Hold', 'Completed'];
        for (let i = 0; i < 50; i++) {
            projects.push({
                id: `P${faker.number.int({ min: 1000, max: 9999 })}`,
                name: faker.commerce.productName() + ' Construction',
                status: faker.helpers.arrayElement(statuses),
                start_date: faker.date.past(),
                end_date: faker.date.future(),
                budget: faker.finance.amount({ min: 1000000, max: 50000000, dec: 2 }),
                client_name: clients[Math.floor(Math.random() * clients.length)].name // Using client name as per model
            });
        }
        await Project.bulkCreate(projects, { ignoreDuplicates: true }); // Handle potential ID collisions
        console.log('Created 50 Projects');

        // 3. Vendors (30)
        const vendors = [];
        const categories = ['Material', 'Service', 'Labor', 'Equipment'];
        for (let i = 0; i < 30; i++) {
            vendors.push({
                name: faker.company.name(),
                category: faker.helpers.arrayElement(categories),
                rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
                contact_person: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            });
        }
        const createdVendors = await Vendor.bulkCreate(vendors, { returning: true });
        console.log('Created 30 Vendors');

        // 4. Employees (100)
        const employees = [];
        const depts = ['Civil', 'Mechanical', 'Electrical', 'Accounts', 'HR', 'IT'];
        for (let i = 0; i < 100; i++) {
            employees.push({
                name: faker.person.fullName(),
                designation: faker.person.jobTitle(),
                department: faker.helpers.arrayElement(depts),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                joining_date: faker.date.past({ years: 5 }),
                salary: faker.finance.amount({ min: 30000, max: 200000 }),
                status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'On Leave'])
            });
        }
        await Employee.bulkCreate(employees);
        console.log('Created 100 Employees');

        // 5. Finance Records (300) - Invoices & Expenses
        const financeRecords = [];
        for (let i = 0; i < 300; i++) {
            const proj = projects[Math.floor(Math.random() * projects.length)];
            const type = faker.helpers.arrayElement(['invoice', 'payment', 'expense']);
            financeRecords.push({
                id: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
                project_id: proj.id,
                type: type,
                amount: faker.finance.amount({ min: 5000, max: 500000 }),
                date: faker.date.between({ from: proj.start_date, to: new Date() }),
                status: type === 'invoice' ? faker.helpers.arrayElement(['Paid', 'Pending', 'Overdue']) : 'Paid',
                description: faker.commerce.productDescription()
            });
        }
        await FinanceRecord.bulkCreate(financeRecords, { ignoreDuplicates: true });
        console.log('Created 300 Finance Records');

        // 6. Purchase Orders (200)
        const pos = [];
        for (let i = 0; i < 200; i++) {
            const proj = projects[Math.floor(Math.random() * projects.length)];
            const vend = createdVendors[Math.floor(Math.random() * createdVendors.length)];
            pos.push({
                id: `PO-${faker.string.alphanumeric(6).toUpperCase()}`,
                project_id: proj.id,
                vendor_id: vend.id,
                total_amount: faker.finance.amount({ min: 10000, max: 1000000 }),
                issue_date: faker.date.recent({ days: 100 }),
                expected_delivery: faker.date.future(),
                status: faker.helpers.arrayElement(['Issued', 'Received', 'Cancelled'])
            });
        }
        await PurchaseOrder.bulkCreate(pos, { ignoreDuplicates: true });
        console.log('Created 200 Purchase Orders');

        // 7. Inventory Items (500)
        const inventory = [];
        const items = ['Cement', 'Steel Rods', 'Bricks', 'Sand', 'Tiles', 'Paint', 'Pipes', 'Cables'];
        const units = ['bags', 'tons', 'pcs', 'kg', 'sqft', 'liters', 'm', 'm'];

        for (let i = 0; i < 500; i++) {
            const proj = projects[Math.floor(Math.random() * projects.length)];
            const itemIdx = Math.floor(Math.random() * items.length);
            inventory.push({
                id: `ITM-${faker.string.alphanumeric(8).toUpperCase()}`,
                project_id: proj.id,
                name: items[itemIdx],
                quantity: faker.number.int({ min: 10, max: 1000 }),
                unit: units[itemIdx],
                unit_price: faker.finance.amount({ min: 50, max: 5000 }),
                last_updated: faker.date.recent()
            });
        }
        await InventoryItem.bulkCreate(inventory, { ignoreDuplicates: true });
        console.log('Created 500 Inventory Items');

        console.log('Seeding completed successfully.');

    } catch (error) {
        console.error('Seeding failed:', error);
    }
}

module.exports = seedData;
