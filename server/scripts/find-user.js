const { MongoClient } = require('mongodb');
require('dotenv').config();

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db();
    const user = await db.collection('users').findOne({ email: 'testuser123@example.com' });
    console.log('User found:', user);
  } catch (e) {
    console.error('Error:', e.message || e);
  } finally {
    await client.close();
  }
}

run();