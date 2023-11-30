import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      Footer: 프로젝트 팀 정보 및 기타 텍스트
      {/* 여기에 추가 정보나 링크를 넣을 수 있습니다 */}
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 1rem;
  /* text-align: center; */
`;

export default Footer;
