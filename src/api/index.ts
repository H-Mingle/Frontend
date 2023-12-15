import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://3.34.190.110:8080/', // 기본 요청 경로
});

export default instance;
