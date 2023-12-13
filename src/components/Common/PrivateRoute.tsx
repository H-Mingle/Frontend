import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode; // 자식 컴포넌트 타입 명시
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // 자식 컴포넌트가 없는 경우(null 반환)를 고려한 조건문
  if (!children) return null;

  // 인증 상태에 따른 리다이렉트 또는 자식 컴포넌트 렌더링 (로그아웃 하면 홈으로 보내기)
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
