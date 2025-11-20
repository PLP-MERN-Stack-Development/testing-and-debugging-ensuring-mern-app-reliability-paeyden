// server/tests/setup.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' }); // Use a separate .env for testing

// Connect to test DB before all tests
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Test Database');
  } catch (err) {
    console.error('Error connecting to Test DB', err);
    process.exit(1);
  }
});

// Clear collections before each test to ensure test isolation
beforeEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    await mongoose.connection.collections[collectionName].deleteMany({});
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log('Disconnected from Test Database');
});
