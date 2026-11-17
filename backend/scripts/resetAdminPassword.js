
require('dotenv').config();

const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('../src/models/User');
const { sequelize } = require('../src/models');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function resetAdminPassword() {
  try {
    const password = await ask('Enter new admin password (minimum 12 characters): ');

    if (password.length < 12) {
      throw new Error('Password must contain at least 12 characters.');
    }

    await sequelize.authenticate();

    const email = (await ask('Enter admin email: ')).trim().toLowerCase();

    const admin = await User.findOne({
    where: { email, role: 'admin' }
});

    if (!admin) {
      throw new Error('Admin account with ID 2 was not found.');
    }

    admin.password = await bcrypt.hash(password, 12);
    await admin.save();

    console.log('Admin password updated successfully.');
  } catch (error) {
    console.error('Password reset failed:', error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await sequelize.close();
  }
}

resetAdminPassword();
