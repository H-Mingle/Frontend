import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const Edit = () => {
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<Array<string | null>>([
    null,
    null,
    null,
    null,
  ]);
  const isPostButtonActive =
    images.every((img) => img !== null) && content.trim() !== '';
  // 히든 파일 인풋을 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    // 프리뷰 패널 오른쪽에 상시 고정 or 탭 형식 결정 로직
    const handleResize = () => {
      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance();
        if (window.innerWidth > 1200) {
          editorInstance.changePreviewStyle('vertical');
        } else {
          editorInstance.changePreviewStyle('tab');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (index: number) => {
    // 이미지 업로드 로직
    const updatedImages = [...images];
    updatedImages[index] = '/path/to/uploaded/image.png'; // Replace with actual image path
    setImages(updatedImages);
  };

  const handlePost = () => {
    if (isPostButtonActive) {
      navigate('/feed');
      window.location.reload();
    }
  };

  const triggerFileInput = (index: number) => {
    setCurrentImageIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && currentImageIndex !== null) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const updatedImages = [...images];
        updatedImages[currentImageIndex] = imageUrl;
        setImages(updatedImages);
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
            {index === 0 ? (
              <ImagePosition>{index + 1}. (대표 사진)</ImagePosition>
            ) : (
              <ImagePosition>{index + 1}.</ImagePosition>
            )}
            <ImagePlaceholder onClick={() => triggerFileInput(index)}>
              {image ? (
                <UploadedImage src={image} alt={`Image ${index}`} />
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
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
  width: 100%; // Wrapper에 맞게 너비를 최대화
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
