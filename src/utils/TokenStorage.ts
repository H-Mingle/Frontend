// 토큰 저장 및 관리 유틸리티
export const TokenStorage = {
  setAccessToken: (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  },
  getAccessToken: () => localStorage.getItem('accessToken'),
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
  },
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  clearToken: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
