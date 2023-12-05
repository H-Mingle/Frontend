import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TabProps } from '../types/TabProps';
import { carouselImageData } from '../constants/HomePage/carouselImageData'; // 이미지 데이터 임포트

const MyPage = () => {
  const navigate = useNavigate();

  // 프로필 이미지 상태 관리
  const [profileImage, setProfileImage] = useState<string>(
    '/images/carousel/2.png'
  );

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  // 개발 중이라 로그인 상태를 true로 설정 실제로는 false로 설정 해야함
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState('posts');

  const [editingUsername, setEditingUsername] = useState(false);
  const [username, setUsername] = useState('Username');
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState('...');

  const [isEditing, setIsEditing] = useState(false);

  // 편집 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // 편집 완료 핸들러
  const handleEditComplete = () => {
    // 편집 완료 로직 (예: API 호출 등)
    toggleEditMode();
  };

  // 입력 핸들러
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleBioChange = (e: any) => setBio(e.target.value);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const repeatedData = Array(1)
      .fill(carouselImageData)
      .flat()
      .map((image) => image.src);
    setImages(repeatedData);
  }, []);

  useEffect(() => {
    // 로그인 상태가 아닐 경우 로그인 페이지로 리디렉트
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

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

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 이미지 업로드 트리거 함수
  const triggerImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <MyPageContainer>
      <NavigationBar>
        <BackButton onClick={handleBack}>Back</BackButton>
        <Title>My Page</Title>
        <SettingButton onClick={openModal}>Settings</SettingButton>
      </NavigationBar>

      {isModalOpen && (
        <ModalBackground onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalButton>문의하기</ModalButton>
            <ModalButton>로그아웃</ModalButton>
            <DeleteAccountButton>회원탈퇴</DeleteAccountButton>
          </ModalContainer>
        </ModalBackground>
      )}

      <BodyContainer>
        <ProfileSection>
          {/* 조건부 렌더링을 사용하여 프로필 이미지 표시 */}
          <ProfileImageWrapper onClick={triggerImageUpload}>
            <ProfileImage
              src={profileImage || '/public/images/carousel/2.png'}
              alt="Profile"
            />
            <ProfileImageChangeButton>+</ProfileImageChangeButton>
          </ProfileImageWrapper>

          {/* 이미지 업로드를 위한 input 태그를 숨겨진 상태로 추가.
          "+" 버튼 또는 이미지 클릭 시, 숨겨진 input 태그를 트리거하여 파일 선택 창을 열기 */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }} // 숨김 처리
          />

          <ProfileInfo>
            <ProfileInfoHeader>
              {isEditing ? (
                <EditCompleteButton onClick={handleEditComplete}>
                  저장
                </EditCompleteButton>
              ) : (
                <EditButton onClick={toggleEditMode}>✎</EditButton>
              )}
            </ProfileInfoHeader>

            {isEditing ? (
              <EditingContainer>
                <EditingInput
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <EditingTextarea value={bio} onChange={handleBioChange} />
              </EditingContainer>
            ) : (
              <>
                <DisplayName className={isEditing ? 'hidden' : ''}>
                  {username}
                </DisplayName>
                <DisplayBio className={isEditing ? 'hidden' : ''}>
                  {bio}
                </DisplayBio>
              </>
            )}

            <PostsCount>게시물: 10</PostsCount>
          </ProfileInfo>
        </ProfileSection>

        <TabContainer>
          <Tab
            isActive={activeTab === 'posts'}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </Tab>
          <Tab
            isActive={activeTab === 'likes'}
            onClick={() => setActiveTab('likes')}
          >
            Likes
          </Tab>
        </TabContainer>

        <InfiniteScrollContainer>
          {/* 예시 이미지 리스트 */}
          <ImageGrid>
            {images.map((image: any, index: any) => (
              <ImageItem
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => navigate('/story')}
              />
            ))}
          </ImageGrid>
        </InfiniteScrollContainer>
      </BodyContainer>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
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

const SettingButton = styled(Button)``;

const BodyContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
  padding: 2rem;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProfileImageChangeButton = styled.div`
  font-size: 1.4rem;
  position: absolute;
  bottom: 0.8rem;
  right: 2rem;
  background-color: #333;
  color: white;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.8rem;
  cursor: pointer;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 2rem;
  margin-top: 1rem;
  background-color: ${(props) =>
    props.src ? 'transparent' : '#999'}; // 이미지가 없으면 #999 배경색 사용
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: 150px;
`;

const PostsCount = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tab = styled.button<TabProps>`
  padding: 1rem 2rem;
  cursor: pointer;
  border: none;
  background: none;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? '#333' : 'transparent')};
  margin-right: 0.4rem;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
  font-size: 1.1rem;
  color: ${(props) => (props.isActive ? '#333' : '#999')};

  &:hover {
    color: #333;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const ImageItem = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

// 무한 스크롤 구현
const InfiniteScrollContainer = styled.div`
  /* 무한 스크롤에 필요한 스타일링 */
  /* 로직으로 구현해놓아서 따로 스타일링이 필요하진 않음. 현재는 컨테이너 박스로 사용 */
`;

const ProfileInfoHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const EditButton = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const EditCompleteButton = styled.button`
  background: #333;
  border: 1px solid #ddd;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 7px 12px;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: black;
  }
`;

const DisplayName = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
`;

const DisplayBio = styled.span`
  font-size: 1rem;
  color: #333;
  flex-grow: 1;
`;

const EditingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

const EditingInput = styled.input`
  font-size: 1.4rem;
  font-weight: bold;
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 0.5rem;
`;

const EditingTextarea = styled.textarea`
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.9rem;
  height: 80px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 30%;
  height: 100%;
  padding: 3rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ModalButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteAccountButton = styled(ModalButton)`
  margin-top: auto; // 나머지 버튼들과의 간격을 늘려 화면 하단에 위치시킴
  background-color: crimson;
`;

export default MyPage;
