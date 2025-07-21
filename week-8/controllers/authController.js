const bcrypt = require('bcryptjs');
const { findUserByEmail, saveUser, generateResetToken } = require('../models/User');

const requestPasswordReset = (req, res) => {
  const { email } = req.body;
  let user = findUserByEmail(email);

  if (!user) {
    user = { email, password: '', resetToken: '', resetTokenExpire: '' };
    saveUser(user);
  }

  const token = generateResetToken();
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 3600000;
  saveUser(user);

  console.log(`Reset link: http://localhost:3000/reset-password?token=${token}`);
  res.json({ message: 'Reset link sent (check server console)' });
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  const user = findUserByEmail(email);

  if (!user || user.resetToken !== token || Date.now() > user.resetTokenExpire) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpire = null;
  saveUser(user);

  res.json({ message: 'Password reset successful' });
};

module.exports = { requestPasswordReset, resetPassword };
