const md5 = require('md5');

const gravatar =(email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('A valid email is required to generate a Gravatar URL.');
  }
  const normalizedEmail = email.trim().toLowerCase();
  const hash = md5(normalizedEmail);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;
