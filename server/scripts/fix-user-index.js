const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Please set MONGO_URI in .env before running this script');
  process.exit(1);
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run({ dropUsernameIndex = false, removeNullUsers = false } = {}) {
  try {
    await client.connect();
    console.log('Connected to DB');
    const db = client.db(); // uses db from the connection string
    const users = db.collection('users');

    const indexes = await users.indexes();
    console.log('Existing indexes:');
    indexes.forEach(ix => console.log(` - ${ix.name}: ${JSON.stringify(ix.key)}`));

    const badIndex = indexes.find(ix => ix.name === 'username_1');
    if (badIndex) {
      console.log('\nFound legacy index "username_1" that may be causing conflicts with null values.');
      if (dropUsernameIndex) {
        console.log('Dropping index "username_1"...');
        await users.dropIndex('username_1');
      } else {
        console.log('To drop it, re-run with option dropUsernameIndex=true');
      }
    } else {
      console.log('\nNo legacy "username_1" index found');
    }

    // Ensure correct partial unique index exists for userName
    const desiredIndexName = 'userName_unique_partial';
    const existingDesired = indexes.find(ix => ix.name === desiredIndexName);
    if (!existingDesired) {
      console.log('\nCreating partial unique index on userName to avoid null collisions...');
      await users.createIndex(
        { userName: 1 },
        { name: desiredIndexName, unique: true, partialFilterExpression: { userName: { $type: 'string' } } }
      );
      console.log('Index created:', desiredIndexName);
    } else {
      console.log('\nDesired index already exists:', desiredIndexName);
    }

    // Find documents with missing or null userName
    const nullUsers = await users.find({ $or: [ { userName: { $exists: false } }, { userName: null }, { userName: '' } ] }).toArray();
    console.log(`\nFound ${nullUsers.length} user(s) with missing/null/empty userName`);
    if (nullUsers.length > 0) {
      nullUsers.slice(0, 10).forEach(u => console.log(` - _id: ${u._id}, email: ${u.email || 'N/A'}`));
      if (removeNullUsers) {
        const ids = nullUsers.map(u => u._id);
        const { deletedCount } = await users.deleteMany({ _id: { $in: ids } });
        console.log(`Deleted ${deletedCount} user(s)`);
      } else {
        console.log('To remove them, re-run with removeNullUsers=true');
      }
    }

    console.log('\nDone.');
  } catch (err) {
    console.error('Script Error:', err.message || err);
  } finally {
    await client.close();
  }
}

// Simple CLI
const args = process.argv.slice(2);
run({ dropUsernameIndex: args.includes('--drop-username-index'), removeNullUsers: args.includes('--remove-null-users') });
