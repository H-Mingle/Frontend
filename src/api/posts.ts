import { PostData } from '../types/PostData';
import axios from './index';
import { isAxiosError } from 'axios';

// 스토리 상세 조회
export const getPost = async (id: number) => {
  try {
    const response = await axios.get(`/posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // 서버로부터의 응답 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    } else {
      // 알 수 없는 오류 처리
      console.error('Unknown error:', error);
    }
  }
};

// 스토리 리스트 조회
export const getPosts = async (page: number, size: number) => {
  try {
    const response = await axios.get('/posts', {
      params: { page, size },
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-id': '1', // channelId에 해당하는 값
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // 서버로부터의 응답 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    } else {
      // 알 수 없는 오류 처리
      console.error('Unknown error:', error);
    }
  }
};

// 스토리 생성
export const createPost = async (postData: PostData) => {
  try {
    const formData = new FormData();

    // 필드 추가
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('channelId', postData.channelId.toString());
    formData.append('memberId', postData.memberId.toString());

    // 이미지 파일 추가
    postData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    const response = await axios.post('/posts', formData); // Content-Type 헤더를 생략

    return response.data;
  } catch (error) {
    console.error(error);
    // 에러 핸들링
  }
};
