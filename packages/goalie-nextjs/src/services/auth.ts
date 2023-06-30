import { saveGoalieRefreshToken, saveGoalieToken, saveGoalieUser } from '../lib/util';
import { GOALIE_AUTH_API_ENDPOINT, GoalieUser } from '../types';
import { httpPost } from './_req';
import { User } from '@prisma/client';
import { decode } from 'jsonwebtoken';

export const signup = (data: Partial<User>) => {
  return httpPost('/api/auth/sign-up', data);
};

export interface ISignin {
  email: string;
  password: string;
}

export const generateJWTOnNextJS = (body: { token: string; refreshToken: string }) => {
  fetch(GOALIE_AUTH_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authentication': body.token,
      'RefreshToken': body.refreshToken
    },
  });
};

export const signin = ({ email, password }: ISignin) => {
  return httpPost('/api/auth/sign-in', { email, password }).then(res => {
    const { status, data } = res.data;
    const { headers } = res;

    if (status !== 200) {
      return Promise.reject('INVALID_INFORMATION');
    }

    const token = headers.authorization;
    const refreshToken = headers.refreshtoken;

    saveGoalieToken(token);
    saveGoalieRefreshToken(refreshToken);

    // const decodeJWT = decode(token) as GoalieUser
    const decodeRefreshToken = decode(refreshToken) as { exp: number };
    console.log('save token');

    saveGoalieUser({
      id: data.id,
      email: data.email,
      name: data.name,
      photo: data.photo,
      exp: decodeRefreshToken.exp // it should be `refreshToken expired`
    });

    generateJWTOnNextJS({ token, refreshToken });

    return Promise.resolve('SUCCESS');
  });
};
