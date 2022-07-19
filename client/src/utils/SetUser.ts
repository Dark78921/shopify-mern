import JwtDecode from 'jwt-decode';
import { MethodEnum, UserType } from './types';
// import logUserIn from './logUserIn';
// import signupUser from './signupUser';
import axios from 'axios';

export interface Data {
  username: string;
  password: string | number;
  email?: string;
}

export const LocalUser = async (key: string, token: string) => {
  let val;
  // try {
  //   val = window.localStorage.getItem(key);
  // } catch (e) {
  val = window.localStorage.setItem(key, JSON.stringify(token));
  // }
  return val;
};

export const setLocalUser = (token: string) => {
  let authUser: UserType = {
    email: '',
    username: '',
    id: '',
    isAdmin: false,
    token: '',
  };
  try {
    const user: UserType = JwtDecode(token);
    authUser = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      token: user.token,
    };
    return authUser;
  } catch {
    return;
  }
};

export const SetUser = async (
  userDetails: Data,
  method: MethodEnum
): Promise<(string | boolean | UserType | null)[]> => {
  let authUser: UserType | null = null;
  let authorized = false;
  let error = '';

  if (!userDetails.password || !userDetails.username) {
    authorized = false;
    error = 'Please Provide us with your Credentials';
  }

  try {
    if (method === MethodEnum.Login) {
      // logUserIn(userDetails).then((receivedData) => {
      //   console.log(receivedData);
      //   authUser = receivedData.authUser;
      //   authorized = receivedData.authorized;
      //   error = receivedData.error;
      //   ready = true;
      // });
      const { data } = await axios.post('/auth/login', {
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
    }

    if (method === MethodEnum.Signup) {
      // signupUser(userDetails).then((receivedData) => {
      //   console.log(receivedData);

      //   authUser = receivedData.authUser;
      //   authorized = receivedData.authorized;
      //   error = receivedData.error;
      // });
      const { data } = await axios.post('/auth/signup', {
        username: userDetails.username,
        password: userDetails.password,
        email: userDetails.email,
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
    }
  } catch (e) {
    console.log(e.message);
  }

  return [authUser, authorized, error];
};
