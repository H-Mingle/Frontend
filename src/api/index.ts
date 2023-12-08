import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 요청 경로
  headers: {
    'Content-Type': 'application/json', // 기본 Content Type 설정
  },
});

export default instance;
