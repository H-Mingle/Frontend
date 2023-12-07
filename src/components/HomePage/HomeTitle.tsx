import React from 'react';
import styled, { keyframes } from 'styled-components';

const HomeTitle = () => {
  return (
    <HomeTitleContainer>
      <h1 className="H-Mingle-title">HYUNDAI IT&E H-Mingle</h1>
      <h2 className="H-Mingle-subtitle">
        섞이다, 어울리다, 현대백화점 그룹과 함께.
      </h2>
    </HomeTitleContainer>
  );
};

// 타이틀 애니메이션 효과
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const HomeTitleContainer = styled.div`
  text-align: center;
  margin: 2rem;
  animation: ${fadeIn} 1.5s ease-out;

  .H-Mingle-title {
    font-size: 2.5em;
    color: #333;
    font-weight: bold;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .H-Mingle-subtitle {
    font-size: 1.5em;
    color: #666;
    margin-top: 0.8rem;
    font-weight: bold;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default HomeTitle;
