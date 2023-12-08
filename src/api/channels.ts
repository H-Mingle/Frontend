import axios from './index';
import { isAxiosError } from 'axios';

export const getChannels = async () => {
  try {
    const response = await axios.get('/channels');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios 관련 오류 처리
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else {
        console.error('Network or setup error:', error.message);
      }
    } else {
      // 그 외 오류 처리
      console.error('Unknown error:', error);
    }
  }
};
