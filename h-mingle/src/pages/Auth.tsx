import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const BackButton = styled(BackButtonContainer)``;
  const WhiteButton = styled(WhiteBox)``;

  return (
    <AuthPageContainer>
      <TitleBar>
        <BackButton onClick={() => navigate('/department-list')}>
          Back
        </BackButton>
        <Title>Sign in / Sign up</Title>
        <WhiteButton>Hi :)</WhiteButton>
      </TitleBar>
      <AuthContainer>
        <LogoWrapper>
          <LogoIconWrapper>
            <Logo>H-Mingle</Logo>
            <LogoIcon />
          </LogoIconWrapper>
          <SubLogo>우리의 이야기가 모이는 곳</SubLogo>
        </LogoWrapper>
        <Input type="email" placeholder="Email Address" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
        <DividerWrapper>
          <Divider />
          또는
          <Divider />
        </DividerWrapper>
        <LinkButton>Forgot Password?</LinkButton>
        <LinkButton>Sign Up</LinkButton>
      </AuthContainer>
    </AuthPageContainer>
  );
};

const AuthPageContainer = styled.div`
  margin: 2rem 1rem;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const WhiteBox = styled.div`
  padding: 10px 20px;
  background-color: white;
  color: white;
  border: none;
`;

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

const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-style: italic;
  font-weight: bold;
  align-items: end;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: black;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const Divider = styled.hr`
  flex: 1;
  border: none;
  border-top: 1px solid #ccc;
  margin: 0 10px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default Auth;
