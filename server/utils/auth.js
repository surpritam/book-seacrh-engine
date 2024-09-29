const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Function to authenticate and extract user from token
const getUserFromToken = (token) => {
  try {
    if (token) {
      // Remove "Bearer " from the token string
      const actualToken = token.split(' ').pop().trim();
      const { data } = jwt.verify(actualToken, secret, { maxAge: expiration });
      return data;
    }
    return null;
  } catch (error) {
    console.log('Invalid token:', error);
    return null;
  }
};

// Function to sign a new token
const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  getUserFromToken,
  signToken,
};