import Axios from 'axios';
import JwtDecode from 'jwt-decode';
import { Data, LocalUser } from './SetUser';
import { UserType } from './types';

const loginUserIn = async (userDetails: Data) => {
  let authUser: UserType | null = null;
  let authorized = false;
  let error;

  const { data } = await Axios.post('/auth/login', {
    username: userDetails.username,
    password: userDetails.password,
  });
  if (!data.error) {
    await LocalUser('shopifyToken', data.token);
    const user: UserType = JwtDecode(data.token);
    authUser = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: data.token,
    };
    authorized = true;
  } else {
    authorized = false;
    error = data.error;
  }

  return {
    error,
    authorized,
    authUser,
  };
};

export default loginUserIn;
