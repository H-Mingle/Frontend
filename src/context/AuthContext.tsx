import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { TokenStorage } from '../utils/TokenStorage';
import {
  performOAuth2Login,
  performOAuth2Logout,
  refreshAccessToken,
} from '../services/AuthServices';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (redirectUrl: string, authorizationCode: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

// AuthContext는 로그인 상태와 관련된 데이터 및 함수들을 담는 React Context
// 이 컨텍스트를 통해 애플리케이션의 어느 곳에서든 로그인 상태에 접근하고, 로그인 및 로그아웃 기능을 사용할 수 있음
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// useAuth는 AuthContext를 사용하기 위한 커스텀 훅
// 이 훅을 사용하면 컴포넌트 내에서 쉽게 로그인 상태와 관련 함수들에 접근할 수 있음
// 이 훅이 AuthProvider 컴포넌트 외부에서 사용된다면, 오류를 발생시킴
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider는 로그인 상태와 관련된 로직을 구현하는 컴포넌트
// AuthContext를 사용하여 애플리케이션의 다른 부분에 로그인 관련 상태와 함수들을 제공
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!TokenStorage.getAccessToken()
  );

  const login = async (redirectUrl: string, authorizationCode: string) => {
    try {
      await performOAuth2Login(redirectUrl, authorizationCode);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('로그인 실패:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await performOAuth2Logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const refresh = async () => {
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('토큰 재발급 실패:', error);
    }
  };

  // 컨텍스트 프로바이더로 감싼 자식 컴포넌트들에게 상태와 함수들을 전달
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        refreshAccessToken: refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
