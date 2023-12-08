import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>Footer: 프로젝트 팀 정보 및 기타 텍스트</FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 1rem;
  /* text-align: center; */
`;

export default Footer;
