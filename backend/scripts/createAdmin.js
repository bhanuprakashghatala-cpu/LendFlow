
require('dotenv').config();

const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('../src/models/User');
const { sequelize } = require('../src/models');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createAdmin() {
  try {
    const name = await ask('Admin name: ');
    const email = (await ask('Admin email: ')).trim().toLowerCase();
    const password = await ask('Admin password (minimum 12 characters): ');

    if (!name.trim() || !email || password.length < 12) {
      throw new Error('Provide a name, email and password of at least 12 characters.');
    }

    await sequelize.authenticate();

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('This email already exists. No account was changed.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`Admin account created successfully. User ID: ${admin.id}`);
  } catch (error) {
    console.error('Admin creation failed:', error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await sequelize.close();
  }
}

createAdmin();
