import axios from 'axios';

const API_URL = 'https://your-api.com/api/v1/auth/social-login';

export const socialLogin = async (provider: 'google' | 'apple', token: string, userId?: string) => {
  try {
    const response = await axios.post(API_URL, { provider, token, userId });
    return response.data; // user/session info
  } catch (error) {
    console.error('Social login failed', error);
    throw error;
  }
};
