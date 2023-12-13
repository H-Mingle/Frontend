import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { createPost } from '../api/posts';

const Edit = () => {
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState('');
  const channelId = localStorage.getItem('channelId') || '';
  const [images, setImages] = useState<
    { file: File | null; url: string | null }[]
  >(new Array(4).fill({ file: null, url: null }));

  const isPostButtonActive =
    images.every((image) => image.file !== null) && content.trim() !== '';

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.changePreviewStyle(
          window.innerWidth > 1200 ? 'vertical' : 'tab'
        );
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFile = event.target.files?.[0] || null;
    if (newFile) {
      const newImages = [...images];
      newImages[index] = {
        file: newFile,
        url: URL.createObjectURL(newFile),
      };
      setImages(newImages);
    }
  };

  const handlePost = async () => {
    if (isPostButtonActive) {
      try {
        const postData = {
          content,
          channelId,
          images: images.map((image) => image.file).filter(Boolean),
        };
        await createPost(postData);
        navigate('/feed');
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
    ['code', 'codeblock'],
    ['scrollSync'],
  ];

  return (
    <EditPageContainer>
      <NavigationBar>
        <BackButton onClick={handleBack}>Back</BackButton>
        <Title>Edit</Title>
        <PostButton onClick={handlePost} disabled={!isPostButtonActive}>
          Post
        </PostButton>
      </NavigationBar>
      <ImageUploadContainer>
        {images.map((image, index) => (
          <ImageUploadWrapper key={index}>
            <ImagePosition>
              {index + 1}. {index === 0 && '(대표 사진)'}
            </ImagePosition>
            <ImagePlaceholder
              onClick={() =>
                document.getElementById(`input-file-${index}`).click()
              }
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, index)}
                id={`input-file-${index}`}
                style={{ display: 'none' }}
              />

              {image.url ? (
                <UploadedImage src={image.url} alt={`Image ${index}`} />
              ) : (
                '+'
              )}
            </ImagePlaceholder>
          </ImageUploadWrapper>
        ))}
      </ImageUploadContainer>
      <EditorContainer>
        <Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          initialValue={content}
          initialEditType="markdown"
          previewStyle={window.innerWidth > 1200 ? 'vertical' : 'tab'}
          hideModeSwitch
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut
          onChange={() => {
            if (editorRef.current) {
              const instance = editorRef.current.getInstance();
              setContent(instance.getMarkdown());
            }
          }}
          height="auto"
        />
      </EditorContainer>
    </EditPageContainer>
  );
};

const EditPageContainer = styled.div`
  margin: 2rem;
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

const BackButton = styled.button`
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

const PostButton = styled.button`
  background-color: ${(props) => (props.disabled ? 'grey' : '#333')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? 'grey' : 'black')};
  }
`;

const ImageUploadWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1rem 1rem 0;
  &:last-child {
    margin-right: 0;
  }
`;

const ImagePosition = styled.span`
  margin-bottom: 0.4rem;
  margin-left: 0.2rem;
  color: #333;
  font-size: 0.9rem;
  font-weight: bold;
  align-self: flex-start;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
  margin: auto;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 3 / 5; // 종횡비 유지
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
  border-radius: 0.5rem;
  overflow: hidden;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditorContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: auto;
`;

export default Edit;
