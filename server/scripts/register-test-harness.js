require('dotenv').config();
const mongoose = require('mongoose');
const { registerUser } = require('../controllers/auth/auth-controller');

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });

  const req = {
    body: {
      userName: 'testuser123',
      email: 'testuser123@example.com',
      password: 'password'
    }
  };

  const res = {
    status(code) {
      this._status = code;
      return this;
    },
    json(payload) {
      console.log('Response status:', this._status || 200);
      console.log('Response body:', payload);
    },
    cookie() { return this; }
  };

  try {
    await registerUser(req, res);
  } catch (e) {
    console.error('Harness Error:', e);
  } finally {
    await mongoose.disconnect();
  }
}

run();