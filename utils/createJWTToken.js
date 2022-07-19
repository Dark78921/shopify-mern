import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default (id, username, email, isAdmin) =>
  jwt.sign({ id, username, email, isAdmin }, process.env.JWT_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
