import React from 'react';
import HomeCarousel from '../components/HomePage/HomeCarousel';
import HomeTitle from '../components/HomePage/HomeTitle';
import HomeEnterButton from '../components/HomePage/HomeEnterButton';
import styled from 'styled-components';
import Header from '../components/Common/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <HomeWrapper>
        <HomeCarousel />
        <HomeTitle />
        <HomeEnterButton />
      </HomeWrapper>
    </div>
  );
};

const HomeWrapper = styled.div`
  background-color: #fff;
  height: 80vh;
  padding: 2rem 0;
`;

export default Home;
