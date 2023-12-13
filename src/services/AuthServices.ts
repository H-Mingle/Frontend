import {
  getOAuth2LoginUrl,
  loginOAuth2,
  refreshOAuth2Token,
  logoutOAuth2,
} from '../api/auth';
import { TokenStorage } from '../utils/TokenStorage';

// OAuth2.0 로그인 URL 가져오기
export const fetchOAuth2LoginUrl = async (redirectUrl: string) => {
  const response = await getOAuth2LoginUrl(redirectUrl);
  return response.data.oauthLink; // 구글 로그인 페이지 URL 반환
};

// OAuth2.0 로그인
export const performOAuth2Login = async (
  redirectUrl: string,
  authorizationCode: string
) => {
  try {
    const response = await loginOAuth2(redirectUrl, authorizationCode);
    TokenStorage.setAccessToken(response.data.accessToken);
    TokenStorage.setRefreshToken(response.data.refreshToken);
  } catch (error) {
    console.error('Error during OAuth2 login:', error);
    throw error;
  }
};

// OAuth2.0 로그아웃
export const performOAuth2Logout = async () => {
  const accessToken = TokenStorage.getAccessToken();
  if (!accessToken) {
    console.error('No access token found');
    return;
  }
  await logoutOAuth2(accessToken);
  TokenStorage.clearToken();
  // 로그아웃 후 필요한 추가 처리 (예: 홈페이지로 리디렉션)
};

// OAuth2.0 Access Token 재발급
export const refreshAccessToken = async () => {
  const refreshToken = TokenStorage.getRefreshToken();
  if (!refreshToken) {
    console.error('No refresh token found');
    return;
  }
  const response = await refreshOAuth2Token(refreshToken);
  TokenStorage.setAccessToken(response.data.accessToken);
  // 토큰 재발급 후 필요한 추가 처리
};
