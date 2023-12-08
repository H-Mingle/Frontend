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
  // OAuth2 로그인 페이지로 리디렉션 등의 추가적인 처리...
  return response.oauthLink;
};

// OAuth2.0 로그인
export const performOAuth2Login = async (
  redirectUrl: string,
  authorizationCode: string
) => {
  const response = await loginOAuth2(redirectUrl, authorizationCode);
  TokenStorage.setAccessToken(response.data.accessToken);
  TokenStorage.setRefreshToken(response.data.refreshToken);
  // 추가적인 로그인 후 처리...
};

// OAuth2.0 로그아웃
export const performOAuth2Logout = async () => {
  const accessToken = TokenStorage.getAccessToken();
  if (!accessToken) {
    return;
  }
  await logoutOAuth2(accessToken);
  TokenStorage.clearToken();
  // 로그아웃 후의 추가적인 처리...
};

// OAuth2.0 Access Token 재발급
export const refreshAccessToken = async () => {
  const refreshToken = TokenStorage.getRefreshToken();
  if (!refreshToken) {
    return;
  }
  const response = await refreshOAuth2Token(refreshToken);
  TokenStorage.setAccessToken(response.data.accessToken);
  // 재발급 후 추가적인 처리...
};
