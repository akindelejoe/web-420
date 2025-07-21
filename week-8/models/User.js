const users = {}; // In-memory user store

function findUserByEmail(email) {
  return users[email];
}

function saveUser(user) {
  users[user.email] = user;
}

function generateResetToken() {
  return require('crypto').randomBytes(20).toString('hex');
}

module.exports = { findUserByEmail, saveUser, generateResetToken };
