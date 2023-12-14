import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TabProps } from '../types/TabProps';
import { carouselImageData } from '../constants/HomePage/carouselImageData'; // 이미지 데이터 임포트
import { ModalContainerProps } from '../types/ModalContainerProps';
import { ModalBackgroundProps } from '../types/ModalBackgroundProps';
import { useAuth } from '../context/AuthContext';
import {
  getUserDetails,
  getUserLikedPosts,
  getUserPosts,
  updateUserDetails,
  updateUserImage,
} from '../api/posts';
import { UserData } from '../types/UserData';
import { PostDataForMyPage } from '../types/PostData';

const MyPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);

  const [profile, setProfile] = useState<UserData | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState<PostDataForMyPage[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostDataForMyPage[]>([]);

  // 사용자 상세 정보를 가져오고 상태에 저장하는 로직
  const fetchUserProfile = async () => {
    const userData = await getUserDetails(1);
    if (userData.data) {
      setProfile(userData.data);
    }

    console.log(userData.data);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const [images, setImages] = useState([]);

  const getDefaultImage = () => {
    return '/images/userDefault/userDefault.png'; // 기본 이미지 경로
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState('posts');

  const [username, setUsername] = useState('Username');
  const [bio, setBio] = useState('...');

  const [isEditing, setIsEditing] = useState(false);

  // 프로필 이미지 변경 핸들러
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert('이미지를 선택해주세요.');
      return;
    }

    try {
      const response = await updateUserImage(file);
      if (response.success) {
        fetchUserProfile(); // 프로필 정보 업데이트
      } else {
        alert('이미지 업데이트 실패: ' + response.message);
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  // 사용자 정보 업데이트 핸들러
  const handleEditComplete = async () => {
    if (!username.trim() || !bio.trim()) {
      alert('닉네임과 소개는 비워둘 수 없습니다.');
      return;
    }

    try {
      // API 호출을 통한 사용자 정보 업데이트
      const updateResponse = await updateUserDetails(1, username, bio);
      if (updateResponse && updateResponse.success) {
        // 성공 시, 프로필 정보를 새로고침
        fetchUserProfile();
        setIsEditing(false);
      } else {
        alert('업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('업데이트 중 오류가 발생했습니다.');
    }
  };

  // 편집 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditing(!isEditing);

    // 편집 모드로 진입할 때 현재 프로필 정보로 상태를 설정
    if (!isEditing) {
      setUsername(profile?.nickname || '');
      setBio(profile?.introduction || '');
    }
  };

  // 입력 핸들러
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleBioChange = (e: any) => setBio(e.target.value);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // 로그인 상태가 아닐 경우 로그인 페이지로 리디렉트
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // 스크롤 이벤트 핸들러와 데이터 로드 로직
  useEffect(() => {
    const handleScroll = () => {
      const totalPageHeight = document.documentElement.scrollHeight;
      const currentScrollPosition =
        window.innerHeight + document.documentElement.scrollTop;

      if (totalPageHeight - currentScrollPosition < 100) {
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMoreImages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 편집 취소 핸들러
  const handleEditCancel = () => {
    setIsEditing(false);
    // 현재 프로필 정보로 초기화
    setUsername(profile?.nickname || '');
    setBio(profile?.introduction || '');
  };

  const handleProfileImageClick = () => {
    if (selectedProfileImage) {
      setSelectedProfileImage(null);
    } else {
      setSelectedProfileImage(profile?.image?.toString() || getDefaultImage());
    }
  };

  // 문의하기 버튼 클릭 핸들러
  const handleContactClick = () => {
    window.open('https://www.instagram.com/Mingle_Hyundai/', '_blank');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExtraFunctionMessage = async () => {
    window.confirm('추가 구현 예정입니다. 🙂');
  };

  const fetchUserPosts = async () => {
    const response = await getUserPosts(1, currentPage, 9);
    if (response && Array.isArray(response.data.post)) {
      const newPosts = response.data.post.map((post) => ({
        id: post.id,
        image: post.image,
      }));
      setPosts((prevPosts) => {
        // 중복된 아이템이 없는 새로운 아이템만 추가
        const updatedPosts = newPosts.filter(
          (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        );
        return [...prevPosts, ...updatedPosts];
      });
    }
  };

  const fetchUserLikedPosts = async () => {
    const response = await getUserLikedPosts(1, currentPage, 10);
    if (response && Array.isArray(response.data.post)) {
      const newLikedPosts = response.data.post.map((post) => ({
        id: post.id,
        image: post.image,
      }));
      setLikedPosts((prevLikedPosts) => {
        // 중복된 아이템이 없는 새로운 아이템만 추가
        const updatedLikedPosts = newLikedPosts.filter(
          (newLikedPost) =>
            !prevLikedPosts.some(
              (prevLikedPost) => prevLikedPost.id === newLikedPost.id
            )
        );
        return [...prevLikedPosts, ...updatedLikedPosts];
      });
    }
  };

  // 탭 상태 관리 및 탭 변경 핸들러
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchUserPosts();
    } else if (activeTab === 'likes') {
      fetchUserLikedPosts();
    }
  }, [activeTab, currentPage]);

  const displayImages = activeTab === 'posts' ? posts : likedPosts;

  return (
    <MyPageContainer>
      <NavigationBar>
        <BackButton onClick={handleBack}>Back</BackButton>
        <Title>My Page</Title>
        <SettingButton onClick={openModal}>Options</SettingButton>
      </NavigationBar>

      <ModalBackground isOpen={isModalOpen} onClick={closeModal}>
        <ModalContainer
          isOpen={isModalOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalButton onClick={handleContactClick}>문의하기</ModalButton>
          <ModalButton onClick={logout}>로그아웃</ModalButton>
          <DeleteAccountButton onClick={handleExtraFunctionMessage}>
            회원탈퇴
          </DeleteAccountButton>
        </ModalContainer>
      </ModalBackground>

      <BodyContainer>
        <ProfileSection>
          <ProfileImageWrapper>
            <ProfileImage
              src={
                profile?.image
                  ? `data:image/jpeg;base64,${profile.image}`
                  : getDefaultImage()
              }
              alt="Profile"
              onClick={handleProfileImageClick}
            />
            <ProfileImageChangeButton
              onClick={() => imageInputRef.current?.click()}
            >
              +
            </ProfileImageChangeButton>
          </ProfileImageWrapper>

          {/* 이미지 업로드를 위한 input 태그를 숨겨진 상태로 추가.
          "+" 버튼 또는 이미지 클릭 시, 숨겨진 input 태그를 트리거하여 파일 선택 창을 열기 */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          <ProfileInfo>
            <ProfileInfoHeader>
              {isEditing ? (
                <>
                  <CancelButton onClick={handleEditCancel}>취소</CancelButton>
                  <EditCompleteButton onClick={handleEditComplete}>
                    저장
                  </EditCompleteButton>
                </>
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
                <DisplayName>{profile?.nickname}</DisplayName>
                <DisplayBio>{profile?.introduction}</DisplayBio>
              </>
            )}

            <PostsCount>게시물: {profile?.postCount}</PostsCount>
          </ProfileInfo>
        </ProfileSection>

        <TabContainer>
          <Tab
            isActive={activeTab === 'posts'}
            onClick={() => handleTabChange('posts')}
          >
            Posts
          </Tab>
          <Tab
            isActive={activeTab === 'likes'}
            onClick={() => handleTabChange('likes')}
          >
            Likes
          </Tab>
        </TabContainer>

        <InfiniteScrollContainer>
          <ImageGrid>
            {Array.isArray(displayImages) &&
              displayImages.map((post, index) => (
                <ImageItem
                  key={index}
                  src={`data:image/jpeg;base64,${post.image}`}
                  alt={`Post Image ${index}`}
                  onClick={() => navigate(`/story/${post.id}`)}
                />
              ))}
          </ImageGrid>
        </InfiniteScrollContainer>
      </BodyContainer>

      {selectedProfileImage && (
        <ImageModal onClick={() => setSelectedProfileImage(null)}>
          <img
            src={`data:image/jpeg;base64,${selectedProfileImage}`}
            alt="Selected_Image"
          />
        </ImageModal>
      )}
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
  z-index: 1;
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
  background-color: ${(props) => (props.src ? 'transparent' : '#999')};
  cursor: pointer;
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

const ImageModal = styled.div`
  /* Similar styling as in the Story component */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  img {
    max-width: 80%;
    max-height: 80%;
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

const CancelButton = styled(EditCompleteButton)`
  background-color: #999;
  margin-right: 0.4rem;

  &:hover {
    background-color: #777;
  }
`;

const DisplayName = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
  margin-left: -0.55rem;
`;

const DisplayBio = styled.span`
  font-size: 1rem;
  color: #333;
  flex-grow: 1;
  white-space: pre-wrap;
  line-height: 1.2;
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

const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${(props) => (props.isOpen ? 0.5 : 0)});
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: flex-end;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s, visibility 0.3s ease-in-out,
    background 0.3s ease-in-out;
  z-index: 100;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  background-color: white;
  width: 30%;
  height: 100%;
  padding: 3rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 100;
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
