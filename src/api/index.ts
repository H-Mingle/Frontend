import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://h-mingle.netlify.app/',
});

export default instance;
