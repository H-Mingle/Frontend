import React from 'react';
import HomeCarousel from '../components/HomePage/HomeCarousel';
import HomeTitle from '../components/HomePage/HomeTitle';
import HomeEnterButton from '../components/HomePage/HomeEnterButton';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeWrapper>
      <HomeCarousel />
      <HomeTitle />
      <HomeEnterButton />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  margin-top: 3rem;

  // 각 컴포넌트에 마진 적용
  & > * {
    margin-bottom: 2rem; // 컴포넌트 하단에 간격 추가
  }

  // 마지막 컴포넌트는 마진 제거
  & > *:last-child {
    margin-bottom: 0;
  }
`;

export default Home;
