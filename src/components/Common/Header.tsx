import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => window.location.reload()}>
        <Logo>H-Mingle</Logo>
        <LogoIcon />
        <SubLogo>우리의 이야기가 모이는 곳</SubLogo>
      </LogoWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  color: #333;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
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
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Header;
