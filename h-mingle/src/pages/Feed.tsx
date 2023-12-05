import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GridItemProps } from '../types/feed';
import { carouselImageData } from '../constants/HomePage/carouselImageData';

const Feed = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값 false
  const [images, setImages] = useState<string[]>([]); // 이미지 데이터를 저장할 상태 (임시로 carouselImageData를 사용)

  useEffect(() => {
    // carouselImageData를 3번 반복하여 추가 (임시 데이터, 나중에는 실제 데이터 서버로부터 fetch)
    const repeatedData = Array(3)
      .fill(carouselImageData)
      .flat()
      .map((image) => image.src);
    setImages(repeatedData);
  }, []);

  const isLargeImage = (index: any) => {
    // 12개 이미지마다 패턴이 반복되도록 조건 설정
    // 첫 번째 패턴: index 2, 3
    // 두 번째 패턴: index 8, 9
    return index % 10 === 2 || index % 10 === 5;
  };

  // 스크롤 이벤트 핸들러와 데이터 로드 로직
  useEffect(() => {
    const handleScroll = () => {
      // 문서의 총 높이
      const totalPageHeight = document.documentElement.scrollHeight;

      // 현재 스크롤 위치 (스크롤이 내려간 거리 + 현재 보이는 화면의 높이)
      const currentScrollPosition =
        window.innerHeight + document.documentElement.scrollTop;

      // 문서 끝에 거의 도달했는지 확인
      if (totalPageHeight - currentScrollPosition < 100) {
        // 추가 이미지 데이터 로드
        loadMoreImages();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

  const loadMoreImages = () => {
    // 기존 이미지 목록에 추가 이미지 데이터 연결
    const newImageSources = Array(1)
      .fill(carouselImageData)
      .flat()
      .map((image) => image.src);

    setImages((prevImages) => [...prevImages, ...newImageSources]);
  };

  return (
    <FeedContainer>
      <NavigationBar>
        <BackButton onClick={() => navigate('/department-list')}>
          Department List
        </BackButton>
        <Title>Feed</Title>
        {isLoggedIn ? (
          <MyPageButton onClick={() => navigate('/mypage')}>
            My Page
          </MyPageButton>
        ) : (
          <AuthButton onClick={() => navigate('/auth')}>
            Login / Sign Up
          </AuthButton>
        )}
      </NavigationBar>
      {/* 서브타이틀 변수 따로 받아서 현백 목동점의 이야기, 더현대 서울의 이야기 이런식으로 동적으로 만들기 */}
      <SubTitle>여러분이 만들어가는 더현대 서울의 이야기</SubTitle>
      <GridContainer>
        {images.map((image, index) => (
          <GridItem
            key={index}
            large={isLargeImage(index)} // 패턴에 따른 셀 병합
            onClick={() => navigate('/story')}
          >
            <img src={image} alt={`Image ${index}`} />
          </GridItem>
        ))}
      </GridContainer>
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  margin: 2rem 1rem;
`;

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
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

const BackButton = styled(Button)``;
const MyPageButton = styled(Button)``; // 로그인 되어있을 때만 보이게, 안되어 있으면 로그인/회원가입 화면으로 넘기기
const AuthButton = styled(Button)``; // 로그인/회원가입 버튼 (비로그인시 보이게, 로그인시 안보이게)

const SubTitle = styled.div`
  font-size: 1rem;
  width: 30%;
  margin: auto;
  color: #999;
  text-align: center;
  padding: 0.5rem 0;
  border-top: 0.1px solid #eee;
  border-bottom: 0.1px solid #eee;
  margin-top: -0.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 80%;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
  padding: 2rem;
`;

const GridItem = styled.div<GridItemProps>`
  width: 100%;
  padding-top: 100%; // 1:1 비율
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.1s ease-in-out;
  ${({ large }) =>
    large &&
    `
    grid-column-end: span 1;
    grid-row-end: span 2;
    padding-top: 200%; // 1:2 비율
  `}

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

export default Feed;
