import { PostData } from '../types/PostData';
import axios from './index';
import { isAxiosError } from 'axios';

// 스토리 상세 조회
export const getPost = async (id: number) => {
  try {
    const response = await axios.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

// 게시글 이미지 조회
export const getPostImages = async (id: number) => {
  try {
    const response = await axios.get(`/posts/images/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // 오류 처리
      console.error(
        'Error fetching images:',
        error.response?.data || error.message
      );
    }
  }
};

// 좋아요 추가
export const addLike = async (postId: number) => {
  try {
    const response = await axios.post(`/like?postId=${postId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error adding like:',
        error.response?.data || error.message
      );
    }
  }
};

// 좋아요 취소
export const removeLike = async (postId: number) => {
  try {
    const response = await axios.put(`/like?postId=${postId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error removing like:',
        error.response?.data || error.message
      );
    }
  }
};

// 스토리 리스트 조회
export const getPosts = async (
  page: number,
  size: number,
  channelID: number
) => {
  try {
    const response = await axios.get('/posts', {
      params: { page, size },
      headers: {
        'Content-Type': 'application/json',
        channel: channelID,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // 에러 처리
      console.error('Error:', error.response?.data || error.message);
    }
  }
};

// 스토리 생성
export const createPost = async (postData: PostData) => {
  try {
    const formData = new FormData();

    formData.append('content', postData.content);
    formData.append('channelId', postData.channelId);

    // 이미지 파일 추가
    postData.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append('uploadImgs', image, image.name);
      }
    });

    const response = await axios.post('/posts', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      console.error('Server response', error.response.data);
    }
  }
};

// 댓글 리스트 조회
export const getComments = async (
  postId: number,
  page: number,
  size: number,
  parentId: number | null
) => {
  try {
    const response = await axios.get(`/posts/${postId}/replies`, {
      params: { page, size, parentId },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error fetching comments:',
        error.response?.data || error.message
      );
    }
  }
};

// 댓글 작성
export const createReply = async (
  postId: number,
  content: string,
  parentId: number | null
) => {
  try {
    const response = await axios.post(
      `/posts/${postId}/replies`,
      { content, parentId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error creating reply:',
        error.response?.data || error.message
      );
    }
  }
};

// 댓글 수정
export const updateReply = async (
  postId: number,
  replyId: number,
  content: string
) => {
  try {
    const response = await axios.patch(
      `/posts/${postId}/replies/${replyId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error updating reply:',
        error.response?.data || error.message
      );
    }
  }
};

// 댓글 삭제
export const deleteReply = async (postId: number, replyId: number) => {
  try {
    const response = await axios.delete(`/posts/${postId}/replies/${replyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Error deleting reply:',
        error.response?.data || error.message
      );
    }
  }
};

export const getUserDetails = async (memberId: any) => {
  try {
    const response = await axios.get(`/members/${memberId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error('Error fetching user details:', error);
  }
};

export const updateUserDetails = async (
  memberId: number,
  nickname: string,
  introduction: string
) => {
  try {
    console.log(nickname, introduction);
    const response = await axios.patch(`/members/${memberId}`, {
      memberId,
      nickname,
      introduction,
    });
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error('Error updating user details:', error);
  }
};

export const updateUserImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile, imageFile.name);

  try {
    const response = await axios.patch('/members/images', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user image:', error);
    throw error;
  }
};

// 사용자가 작성한 게시글 리스트 조회
export const getUserPosts = async (
  memberId: number,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(`/members/${memberId}/posts`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

// 사용자가 좋아요한 게시글 리스트 조회
export const getUserLikedPosts = async (
  memberId: number,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(`/members/${memberId}/posts/like`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user liked posts:', error);
  }
};
