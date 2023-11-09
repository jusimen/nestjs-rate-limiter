import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

async function seed() {
  console.log(`Connececting to ${process.env.DATABASE_URL}...`);
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  const db = client.db(process.env.DATABASE_NAME);

  db.dropDatabase();

  console.log('🌱 Seeding Sessions...');
  await db.collection('sessions').insertOne({
    token: process.env.SESSION_ID,
  });
  for (let i = 0; i < 4; i++) {
    await db.collection('sessions').insertOne({
      token: faker.string.uuid(),
    });
  }

  console.log('🌱 Seeding Accounts...');
  for (let i = 0; i < 10; i++) {
    await db.collection('accounts').insertOne({
      accountName: faker.finance.accountName(),
      accountNumber: faker.finance.accountNumber(),
      amount: faker.finance.amount(),
      currency: faker.finance.currencyName(),
    });
  }

  console.log('🌱 Seeding Products...');
  for (let i = 0; i < 10; i++) {
    await db.collection('products').insertOne({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
    });
  }
}

seed()
  .catch((error) => console.error(error))
  .finally(() => process.exit(0));
