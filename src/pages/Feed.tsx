import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { GridItemProps } from '../types/GridItemProps';
import { getPosts } from '../api/posts'; // 스토리 리스트 조회 API 가져오기
import { PostData } from '../types/PostData'; // PostData 타입 가져오기
import { useAuth } from '../context/AuthContext';

const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]); // 게시글 데이터 저장
  const [channelName, setChannelName] = useState<string>(''); // 채널 이름 저장
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(currentPage, 10, 1);
        if (response && response.success) {
          setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
          setChannelName(response.data.channelName);
          // 'next' 값도 필요하면 여기서 상태에 저장 (인피니티 스크롤에 활용)
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const isLargeImage = (index: any) => {
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
  }, []);

  const loadMoreImages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <FeedContainer>
      <NavigationBar>
        <BackButton onClick={() => navigate('/department-list')}>
          Department List
        </BackButton>
        <Title>Feed</Title>
        <NavigationRightSection>
          {isAuthenticated ? (
            <div>
              <EditButton
                onClick={() => {
                  localStorage.setItem('channelId', '1');
                  navigate('/edit');
                }}
              >
                Edit
              </EditButton>
              <MyPageButton onClick={() => navigate('/mypage')}>
                My Page
              </MyPageButton>
            </div>
          ) : (
            <AuthButton
              onClick={() => {
                localStorage.setItem('previousPath', location.pathname);
                navigate('/auth');
              }}
            >
              Login / Sign Up
            </AuthButton>
          )}
        </NavigationRightSection>
      </NavigationBar>
      <SubTitle>여러분이 만들어가는 {channelName}의 이야기</SubTitle>
      <GridContainer>
        {posts.map((post, index) => (
          <GridItem
            key={index}
            large={isLargeImage(index)}
            onClick={() => navigate(`/story/${post.postId}`)}
          >
            <img src={`data:image/jpeg;base64,${post.image}`} alt="thumbnail" />
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

const NavigationRightSection = styled.div`
  display: flex;
  align-items: center;
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
const EditButton = styled(Button)`
  margin-right: 1rem;
`;
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
