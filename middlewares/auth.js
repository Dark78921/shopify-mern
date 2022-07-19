import jwt from 'jsonwebtoken';
import { ExpressError } from '../utils/ExpressError.js';

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (decode) {
        return next();
      } else {
        throw new ExpressError('Please Log in First', 401);
      }
    });
  } catch (e) {
    throw new ExpressError('Please Log in First', 401);
  }
};

// Make sure we got the correct user - Authorization
export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (decode && decode.isAdmin === true) {
        return next();
      } else {
        throw new ExpressError('Unauthorized', 401);
      }
    });
  } catch (e) {
    throw new ExpressError('Unauthorized', 401);
  }
};

export const isReviewAuthor = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (decode && decode.id === req.params.rID) {
        return next();
      } else {
        throw new ExpressError('Unauthorized', 401);
      }
    });
  } catch (e) {
    throw new ExpressError('Unauthorized', 401);
  }
};

export const isOrderOwner = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (decode && decode.id === req.params.uid) {
        return next();
      } else {
        throw new ExpressError('Unauthorized', 401);
      }
    });
  } catch (e) {
    throw new ExpressError('Unauthorized', 401);
  }
};
