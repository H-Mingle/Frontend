import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchOAuth2LoginUrl } from '../services/AuthServices'; // OAuth2 로그인 URL 요청 함수

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const BackButton = styled(BackButtonContainer)``;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoogleLogin = async () => {
    try {
      await fetchOAuth2LoginUrl(`http://localhost:3000${location.pathname}`);
    } catch (error) {
      console.error('Error fetching OAuth2 login URL:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  const [activeImage, setActiveImage] = useState(0); // 현재 활성화된 이미지의 인덱스
  const images = [
    '/images/carousel/1.png',
    '/images/carousel/2.png',
    '/images/carousel/3.png',
    '/images/carousel/4.png',
    '/images/carousel/5.png',
    '/images/carousel/6.png',
    '/images/carousel/7.png',
    '/images/carousel/8.png',
    '/images/carousel/9.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(
        (prevActiveImage) => (prevActiveImage + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <AuthPageContainer>
      <NavigationBar>
        <BackButton onClick={handleBack}>Back</BackButton>
      </NavigationBar>
      <BodyContainer>
        <ImageBackground>
          <CircleImage src="/images/carousel/1.png" alt="Background" />
          <CircleImage src="/images/carousel/2.png" alt="Background" />
          <CircleImage src="/images/carousel/3.png" alt="Background" />
          <CircleImage src="/images/carousel/4.png" alt="Background" />
        </ImageBackground>
        <AuthContainer>
          <LogoWrapper>
            <LogoIconWrapper>
              <Logo>H-Mingle</Logo>
              <LogoIcon />
            </LogoIconWrapper>
            <SubLogo>우리의 이야기가 모이는 곳</SubLogo>
          </LogoWrapper>
          <GoogleLoginButton onClick={handleGoogleLogin}>
            <GoogleLogo src="/images/icons/googleLogo.png" />
            Google로 로그인 / 시작하기
          </GoogleLoginButton>
        </AuthContainer>
      </BodyContainer>
    </AuthPageContainer>
  );
};

const AuthPageContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  height: 90vh;
  overflow: hidden;
`;

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: #333;
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
// `;

const BackButtonContainer = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: black;
    transform: scale(1.03);
  }
`;

const fadeInOut = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BodyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ImageBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.8;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 32rem;
  padding: 2rem;
  background: #fffffa;
  border-radius: 1rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  border-width: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const CircleImage = styled.img`
  width: 60vh;
  height: 60vh;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-iteration-count: 1; // 애니메이션을 한 번만 실행

  &:nth-child(1) {
    animation-name: ${fadeInOut};
    top: 0%;
    left: 0%;
    animation-delay: 0.4s;
  }
  &:nth-child(2) {
    animation-name: ${fadeInOut};
    top: 0%;
    right: 2%;
    width: 76vh;
    height: 76vh;
    animation-delay: 0.8s;
  }
  &:nth-child(3) {
    animation-name: ${fadeInOut};
    top: 2%;
    right: 36%;
    width: 24vh;
    height: 24vh;
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-name: ${fadeInOut};
    top: 27%;
    left: 20%;
    width: 58vh;
    height: 58vh;
    animation-delay: 0.6s;
  }
  object-fit: cover;
`;

const LogoWrapper = styled.div`
  align-items: center;
  justify-items: center;
`;

const LogoIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const LogoIcon = styled.div`
  width: 7px;
  height: 7px;
  top: -7px;
  background-color: #333;
  border-radius: 50%;
  margin-left: 1.8px;
  margin-right: 6px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -6px;
    left: 8px;
    width: 8px;
    height: 8px;
    background-color: #333;
    border-radius: 50%;
  }
`;

const SubLogo = styled.div`
  margin-left: 0.4rem;
  margin-top: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  align-items: end;
  margin-bottom: 2rem;
`;

const GoogleLoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-weight: bold;
  position: relative;
  z-index: 2;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export default Auth;
