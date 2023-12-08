import axios from './index';
import { isAxiosError } from 'axios';

// OAuth2.0 로그인 URL 요청
export const getOAuth2LoginUrl = async (redirectUrl: string) => {
  try {
    const response = await axios.get('/oauth2/login', {
      params: { redirectUrl },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios 관련 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Network or setup error:', error.message);
      }
    } else {
      // 그 외 오류 처리
      console.error('Unknown error:', error);
    }
  }
};

// OAuth2.0 로그인
export const loginOAuth2 = async (
  redirectUrl: string,
  authorizationCode: string
) => {
  try {
    const response = await axios.get('/oauth2/login', {
      params: { redirectUrl, authorizationCode },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios 관련 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Network or setup error:', error.message);
      }
    } else {
      // 그 외 오류 처리
      console.error('Unknown error:', error);
    }
  }
};

// OAuth2.0 Access Token 재발급
export const refreshOAuth2Token = async (refreshToken: string) => {
  try {
    const response = await axios.get('/oauth2/refresh', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios 관련 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Network or setup error:', error.message);
      }
    } else {
      // 그 외 오류 처리
      console.error('Unknown error:', error);
    }
  }
};

// OAuth2.0 로그아웃
export const logoutOAuth2 = async (accessToken: string) => {
  try {
    const response = await axios.post(
      '/oauth2/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios 관련 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Network or setup error:', error.message);
      }
    } else {
      // 그 외 오류 처리
      console.error('Unknown error:', error);
    }
  }
};
