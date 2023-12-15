import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPost,
  getPostImages,
  addLike,
  removeLike,
  getComments,
  createReply,
  updateReply,
  deleteReply,
} from '../api/posts';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StoryData } from '../types/StoryData';
import { CommentData } from '../types/CommentData';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Story = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // 인증된 사용자의 ID 가져오기

  const { id } = useParams(); // 게시글 ID
  const [post, setPost] = useState<StoryData | null>(null); // 게시글 데이터 상태
  const [images, setImages] = useState([]); // 이미지 데이터 상태
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentInput, setEditCommentInput] = useState('');
  // 페이지 상태와 댓글 로딩 상태를 추적하기 위한 useState 추가
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isAuthor =
    post?.nickname === '밍글이' || post?.nickname === '밍글밍글이';

  const handleBack = () => {
    navigate('/feed');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPostData(id); // 게시글 데이터 가져오기
    fetchPostImages(id); // 이미지 데이터 가져오기
    fetchComments(id, 1); // 댓글 데이터 가져오기
  }, [id]);

  const fetchPostData = async (postId) => {
    const postData = await getPost(postId);
    if (postData.data) {
      setPost(postData.data);
    }
  };

  // 이미지 데이터 가져오는 함수
  const fetchPostImages = async (postId) => {
    const imageData = await getPostImages(postId);
    if (imageData && Array.isArray(imageData.data)) {
      setImages(imageData.data); // 서버에서 받은 데이터가 배열이면 상태에 설정
    } else {
      setImages([]); // 배열이 아니면 빈 배열로 설정
    }
  };

  const fetchComments = async (postId, page) => {
    setLoading(true);
    const commentsData = await getComments(postId, page, 5, null);
    if (commentsData && commentsData.data) {
      if (page === 1) {
        // 첫 페이지일 경우 댓글 전체를 교체
        setComments(commentsData.data);
      } else {
        // 두 번째 페이지 이후일 경우 기존 댓글 리스트에 추가
        setComments((prevComments) => [...prevComments, ...commentsData.data]);
      }
      setPage(page + 1);
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return; // 게시물 데이터가 없으면 작업을 수행하지 않음

    try {
      if (post.liked) {
        await removeLike(post.postId); // 좋아요 취소 API 호출
        setPost({ ...post, heartCount: post.heartCount - 1, liked: false }); // 상태 업데이트
      } else {
        await addLike(post.postId); // 좋아요 추가 API 호출
        setPost({ ...post, heartCount: post.heartCount + 1, liked: true }); // 상태 업데이트
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const atBottom =
      window.innerHeight + window.scrollY > document.body.offsetHeight;
    if (atBottom && !loading) {
      fetchComments(id, page);
    }
  };

  useEffect(() => {
    console.log('post:', post);
  }, [post]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page, id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      await handleCreateComment(commentInput);
      setCommentInput(''); // Clear input field after submission
    }
  };

  const handleCreateComment = async (content, parentId = null) => {
    // 댓글 작성 로직
    try {
      const response = await createReply(id, content, parentId);
      const newComment = response.data;
      if (newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleUpdateComment = async (replyId: number, content: string) => {
    try {
      await updateReply(id, replyId, content); // 서버에서 수정 로직을 처리하는 함수 호출
      // 댓글 수정 시 해당 댓글만 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === replyId ? { ...comment, content } : comment
        )
      );
      setEditingCommentId(null); // Reset editing state
      setEditCommentInput(''); // Clear edit input
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (replyId: number) => {
    try {
      // 댓글 삭제 로직
      await deleteReply(id, replyId); // 서버에서 삭제 로직을 처리하는 함수 호출
      // 댓글 삭제 시 해당 댓글만 제거
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== replyId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const initiateEditComment = (comment: CommentData) => {
    setEditingCommentId(comment.id);
    setEditCommentInput(comment.content);
  };

  const handleEditCommentSubmit = async (replyId: number) => {
    await handleUpdateComment(replyId, editCommentInput);
    setEditingCommentId(null); // Reset editing state
    setEditCommentInput(''); // Clear edit input
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentInput('');
  };

  // 이미지 확대를 위한 상태 (문자열 또는 null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExtraFunctionMessage = async () => {
    window.confirm('추가 구현 예정입니다. 🙂');
  };

  return (
    <StoryPageWrapper>
      <NavigationBar>
        <BackButton onClick={handleBack}>Back</BackButton>
        <ChannelName>{post && post.channelName}</ChannelName>
        <NavigationRightSection>
          {isAuthor && (
            <>
              <EditButton onClick={handleExtraFunctionMessage}>
                Modify
              </EditButton>
              <EditButton onClick={handleExtraFunctionMessage}>
                Delete
              </EditButton>
            </>
          )}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EditButton onClick={() => navigate('/edit')}>Edit</EditButton>
              <ProfileImageContainer onClick={() => navigate('/mypage')}>
                <ProfileImage
                  src={`data:image/jpeg;base64,${post?.myImage}`}
                  alt="Profile_Image"
                />
              </ProfileImageContainer>
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
      <ArrowContainer>
        {post && post.subsequentId ? (
          <Arrow
            direction="left"
            onClick={() => navigate(`/story/${post.subsequentId}`)}
          />
        ) : (
          <Arrow direction="left" disabled />
        )}
        {post && post.previousId ? (
          <Arrow
            direction="right"
            onClick={() => navigate(`/story/${post.previousId}`)}
          />
        ) : (
          <Arrow direction="right" disabled />
        )}
      </ArrowContainer>

      <StoryContainer>
        <PostDate>{post && post.createdDate}</PostDate>
        <ImagesContainer>
          {images.map((image, index) => (
            <ImagePreview
              key={index}
              onClick={() => setSelectedImage(image)}
              zigzag={index % 2 === 0}
            >
              <StyledImage
                src={`data:image/jpeg;base64,${image}`}
                alt="Description"
              />
            </ImagePreview>
          ))}
        </ImagesContainer>
        <Statistics>
          <ViewCount>👀 {post && post.readCount}</ViewCount>
          <LikeCount onClick={handleLike}>
            🫶 {post && post.heartCount}
          </LikeCount>
          <StatisticsRightSection onClick={() => navigate('/mypage')}>
            <Username>{post && post.nickname}</Username>
            <ProfileImageContainerForWriter>
              <ProfileImageForWriter
                src={`data:image/jpeg;base64,${post?.writerImage}`}
                alt="Profile_Image"
              />
            </ProfileImageContainerForWriter>
          </StatisticsRightSection>
        </Statistics>
        <TextContent>
          {post ? (
            <Viewer initialValue={post.content} />
          ) : (
            '[H-Mingle]: 내용이 없습니다.'
          )}
        </TextContent>
        <CommentsContainer>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              placeholder="댓글을 입력하세요..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <CommentButton type="submit">Comment</CommentButton>
          </CommentForm>
          <CommentList>
            {comments.map((comment: CommentData) => (
              <CommentItem key={comment.id}>
                <ProfileImageContainerForComment
                  onClick={() => navigate('/mypage')}
                >
                  <ProfileImageForComment
                    src={`data:image/jpeg;base64,${comment.image}`}
                    alt="Profile_Image"
                  />
                </ProfileImageContainerForComment>
                <CommentDetails>
                  <UsernameForComment>{comment.nickname}</UsernameForComment>
                  {editingCommentId === comment.id ? (
                    // 수정 중일 때의 UI
                    <div>
                      <input
                        type="text"
                        value={editCommentInput}
                        onChange={(e) => setEditCommentInput(e.target.value)}
                      />
                      <EditButtonsForCommentEditMode>
                        <button
                          onClick={() => handleEditCommentSubmit(comment.id)}
                        >
                          Save
                        </button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </EditButtonsForCommentEditMode>
                    </div>
                  ) : (
                    // 일반적인 댓글 표시 UI
                    <div>
                      <CommentText>{comment.content}</CommentText>
                      <CommentMetadata>
                        <span>{comment.recent}</span>
                        {comment.memberId === 1 && isAuthenticated && (
                          <div>
                            <CommentEditButton
                              onClick={() => initiateEditComment(comment)}
                            >
                              Edit
                            </CommentEditButton>
                            <span>·</span>
                            <CommentEditButton
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </CommentEditButton>
                          </div>
                        )}
                      </CommentMetadata>
                    </div>
                  )}
                </CommentDetails>
              </CommentItem>
            ))}
          </CommentList>
        </CommentsContainer>
      </StoryContainer>
      {/* 이미지 확대 뷰 */}
      {selectedImage && (
        <ImageModal onClick={() => setSelectedImage(null)}>
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Selected_Image"
          />
        </ImageModal>
      )}
    </StoryPageWrapper>
  );
};

const StoryPageWrapper = styled.div`
  margin-bottom: 4rem;
`;

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

const ChannelName = styled.h1`
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
  transition: transform 0.3s ease;
  /* 호버 스케일 될 때 화질 확대 및 저하에 따른 이미지 깨지거나 자글거림을 방지하기 위해 GPU 가속 활성화하여 이미지 최적화 */
  will-change: transform;
  transform: translateZ(0); // GPU 가속 활성화

  &:hover {
    transform: scale(1.05) translateZ(0); // 스케일링 시에도 GPU 가속 유지
  }
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

const ImagePreview = styled.div<{ zigzag?: boolean }>`
  width: calc(100% / 4 - 2%); // 네 개의 이미지를 나타내기 위한 가로 너비
  height: 100%; // 높이 자동 조정
  aspect-ratio: 3 / 5;
  object-fit: cover;
  overflow: hidden;
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

const StyledImage = styled.img`
  width: 100%; // 컨테이너 너비에 맞춤
  height: 100%; // 컨테이너 높이에 맞춤
  object-fit: cover; // 컨테이너를 채우면서 비율 유지
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

const Arrow = styled.div<{ direction: 'left' | 'right'; disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.3' : '1')};
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

const AuthButton = styled(Button)``;

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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
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
  cursor: pointer;
  transition: transform 0.3s ease;
  will-change: transform;
  transform: translateZ(0); // GPU 가속 활성화

  &:hover {
    transform: scale(1.05) translateZ(0); // 스케일링 시에도 GPU 가속 유지
  }
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
  align-self: stretch;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  margin-right: 1rem;
  flex: 1;
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 1.2;
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
  transition: transform 0.3s ease;
  will-change: transform;
  transform: translateZ(0); // GPU 가속 활성화

  &:hover {
    transform: scale(1.05) translateZ(0); // 스케일링 시에도 GPU 가속 유지
  }
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
  font-size: 1rem;
  margin-left: -0.3rem;
`;

const CommentText = styled.span`
  display: block;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  white-space: pre-wrap; // 줄바꿈과 공백 유지
`;

const CommentMetadata = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.84rem;
  color: #666;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  margin-top: -0.1rem;

  &:hover {
    color: black;
  }
`;

const CommentEditButton = styled(LikeButton)`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  /* margin-left: 0.5rem; */
`;

const EditButtonsForCommentEditMode = styled.div`
  display: flex;
  margin-top: 0.5rem;

  button {
    margin-right: 0.5rem;
    padding: 0.2rem 0.5rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: black;
      transform: scale(1.03);
    }
  }
`;

// const SubCommentItem = styled(CommentItem)`
//   margin-left: 4rem;
//   border-bottom: none;
// `;

export default Story;
