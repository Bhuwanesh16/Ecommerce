const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Please set MONGO_URI in .env before running this script');
  process.exit(1);
}

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    const bad = await users.find({
      $or: [
        { userName: { $exists: false } },
        { userName: null },
        { userName: '' },
        { username: { $exists: true } },
        { username: null },
        { username: '' }
      ]
    }).toArray();

    console.log(`Found ${bad.length} potentially problematic user(s)`);
    bad.slice(0, 50).forEach(u => console.log(JSON.stringify({ _id: u._id, userName: u.userName, username: u.username, email: u.email })));
  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    await client.close();
  }
})();