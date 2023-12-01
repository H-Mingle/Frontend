import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const navigate = useNavigate();
  // 이미지 확대를 위한 상태 (문자열 또는 null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const tmp_text =
    '얼마 만에 도심 속 대형 복합 쇼핑몰에 와보는 건지 모릅니다. 아이를 낳고 키우며, 일하며 바쁘다는 핑계로 이런 여가생활을 게을리한 것 같습니다. 이날 여기서 찍은 사진만 100장이 넘을 듯합니다. 아무 데서나 찍어도 전부 포토존입니다. 5. 6층에는 숲속 정원과 함께 셀카를 찍을 수 있는 포토 스팟이 곳곳에 있습니다. 인생 사진을 남길 수 있습니다. 아이들이 좋아하는 마시멜로우 팝업샵부터 레고, 플레이 인 더 박스 등 주머니가 열려야 하는 곳도 많습니다. 그리고 추억의 LP 판을 판매하고 들어볼 수 있는 공간도 있었습니다. 앉아서 책도 읽을 수 있습니다. 진짜 없는 것이 없습니다. 더운 여름날, 비가 오는 장마철, 아이와 아침부터 방문해서 하루 종일 놀다 가도 지루하지 않을 것 같습니다. 하지만 다음엔 꼭 아이 없이 친구들과 방문해 더 많은 것들을 즐기고 느끼고 맛보고 싶어지네요~^^ 야외활동이 어려운 날엔 더 현대 서울로 몰캉스를 떠나보시길 추천드립니다~!! ';

  // 임시 이미지 배열
  const images = [
    '/images/carousel/1.png',
    '/images/carousel/2.png',
    '/images/carousel/3.png',
    '/images/carousel/4.png',
  ];

  return (
    <StoryPageWrapper>
      <NavigationBar>
        <BackButton onClick={() => navigate('/department-list')}>
          Back
        </BackButton>
        <Title>더현대 서울(여의도)</Title>
        <NavigationRightSection>
          <EditButton onClick={() => navigate('/edit')}>Edit</EditButton>
          <ProfileImageContainer onClick={() => navigate('/mypage')}>
            <ProfileImage src="/images/carousel/1.png" alt="Profile" />
          </ProfileImageContainer>
        </NavigationRightSection>
      </NavigationBar>
      <ArrowContainer>
        {/* TODO: 현재는 임시로 /department-list로 라우팅 되게 했음. 나중에 서버 작업 하면서 이전 게시물, 다음 게시물로 이동 */}
        <Arrow direction="left" onClick={() => navigate('/department-list')} />
        <Arrow direction="right" onClick={() => navigate('/department-list')} />
      </ArrowContainer>
      <StoryContainer>
        <PostDate>2023년 3월 15일 14:30</PostDate>
        <ImagesContainer>
          {images.map((image, index) => (
            <ImagePreview
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              zigzag={index % 2 === 0}
            />
          ))}
        </ImagesContainer>
        {/* 임시 조회수 및 좋아요 */}
        <Statistics>
          <ViewCount>👀 1234</ViewCount>
          <LikeCount>🫶 567</LikeCount>
          <StatisticsRightSection>
            <Username>nickname</Username> {/* 사용자 닉네임 */}
            <ProfileImageContainerForWriter onClick={() => navigate('/mypage')}>
              <ProfileImageForWriter
                src="/images/carousel/1.png"
                alt="Profile"
              />
            </ProfileImageContainerForWriter>
          </StatisticsRightSection>
        </Statistics>
        <TextContent>
          {tmp_text} <br /> {tmp_text}
        </TextContent>
        <CommentsContainer>
          <CommentForm>
            <CommentInput type="text" placeholder="댓글을 입력하세요..." />
            <CommentButton type="submit">Comment</CommentButton>
          </CommentForm>
          <CommentList>
            <CommentItem>
              <ProfileImageContainerForComment
                onClick={() => navigate('/mypage')}
              >
                <ProfileImageForComment
                  src="/images/carousel/1.png"
                  alt="Profile"
                />
              </ProfileImageContainerForComment>
              <CommentDetails>
                <UsernameForComment>닉네임</UsernameForComment>
                <CommentText>
                  너무 멋져요! <br /> 저도 꼭 가볼게요!{' '}
                </CommentText>
                <CommentMetadata>
                  <span>1시간 전</span>
                  <LikeButton>🫶 12</LikeButton>
                  <ReplyButton>답글 쓰기</ReplyButton>
                </CommentMetadata>
              </CommentDetails>
            </CommentItem>

            <SubCommentItem>
              <ProfileImageContainerForComment
                onClick={() => navigate('/mypage')}
              >
                <ProfileImageForComment
                  src="/images/carousel/1.png"
                  alt="Profile"
                />
              </ProfileImageContainerForComment>
              <CommentDetails>
                <UsernameForComment>닉네임</UsernameForComment>
                <CommentText>정말 멋진 곳이네요!</CommentText>
                <CommentMetadata>
                  <span>30분 전</span>
                  <LikeButton>🫶 8</LikeButton>
                </CommentMetadata>
              </CommentDetails>
            </SubCommentItem>
          </CommentList>
        </CommentsContainer>
      </StoryContainer>
      {/* 이미지 확대 뷰 */}
      {selectedImage && (
        <ImageModal onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected" />
        </ImageModal>
      )}
    </StoryPageWrapper>
  );
};

const StoryPageWrapper = styled.div``;

const NavigationBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 0 1rem;
  background-color: white;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavigationRightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #333;
`;

const StoryContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: auto;
  padding-top: 6.8rem;
  box-sizing: border-box;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2.4rem;
  margin-bottom: 3rem;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  20% { transform: translateY(-8px); }
  40% { transform: translateY(0); }
  60% { transform: translateY(-3px); }
  80% { transform: translateY(0); }
  90% { transform: translateY(-1px); }
`;

const ImagePreview = styled.img<{ zigzag?: boolean }>`
  width: calc(100% / 4 - 2%); // 네 개의 이미지를 나타내기 위한 가로 너비
  height: 100%; // 높이 자동 조정
  aspect-ratio: 3 / 5;
  object-fit: cover;
  margin: ${({ zigzag }) => (zigzag ? '0 1% 1% 1%' : '4% 1% 0 1%')};
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    animation: ${bounce} 0.8s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ImageModal = styled.div`
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

const ArrowContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  justify-content: space-between;
  z-index: 100;
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    border: solid black;
    border-width: 0 3px 3px 0;
    padding: 0.3rem;
    transform: ${({ direction }) =>
      direction === 'left' ? 'rotate(135deg)' : 'rotate(-45deg)'};
  }
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

const TextContent = styled.div`
  width: 100%;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 2rem;
  margin-left: 8px;
`;

const Statistics = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  margin-left: 8px;
`;

const ViewCount = styled.span`
  margin-right: 1rem;
`;

const LikeCount = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PostDate = styled.div`
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

const StatisticsRightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const ProfileImageContainerForWriter = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 70%;
  margin-bottom: 0.1rem;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImageForWriter = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #333;
`;

const CommentsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-left: 8px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const CommentButton = styled(Button)`
  margin-left: 1rem;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: start;
  padding: 0.5rem 0;
`;

const ProfileImageContainerForComment = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImageForComment = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #333;
`;

const CommentDetails = styled.div`
  flex-grow: 1;
  margin-top: 0.1rem;
  margin-left: 0.8rem;
`;

const UsernameForComment = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CommentText = styled.span`
  display: block;
  line-height: 1.3;
  margin-bottom: 0.5rem;
`;

const CommentMetadata = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #666;
  align-items: center;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: #666;
`;

const ReplyButton = styled(LikeButton)`
  background: none;
  border: none;
  cursor: pointer;

  color: #666;
`;

const SubCommentItem = styled(CommentItem)`
  margin-left: 4rem;
  border-bottom: none;
`;

export default Story;
