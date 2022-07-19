import User from '../model/User.js';
import createJWTToken from '../utils/createJWTToken.js';
import { ExpressError } from '../utils/ExpressError.js';

export const signupUser = async (req, res) => {
  try {
    const { id, username, email, isAdmin } = await new User(req.body).save();
    const token = createJWTToken(id, username, email, isAdmin);
    if (!token) throw new ExpressError('Server Error', 500);
    res.status(200).json({ token });
  } catch (err) {
    if (err.code === 11000) {
      // res with username/password is already taken
      throw new ExpressError('Sorry!, username/email is already taken...');
    } else {
      throw new ExpressError(err.message);
    }
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new ExpressError('User with the given user does not exist!');
  let isMatch = await user.comparePassword(password);

  if (isMatch) {
    const token = createJWTToken(
      user.id,
      user.username,
      user.email,
      user.isAdmin
    );
    return res.status(200).json({ token });
  } else {
    throw new Error('Invalid Email/Password Provided...', 400);
  }
};
