import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import DepartmentItem from '../components/DepartmentListPage/DepartmentItem';
import { getChannels } from '../api/channels';
import { DepartmentItemProps } from '../types/DepartmentItemProps';
import { useAuth } from '../context/AuthContext';

const DepartmentList = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // 채널 목록 상태 변수
  const [departments, setDepartments] = useState<
    DepartmentItemProps['department'][]
  >([]);

  // 서버에서 채널 데이터 fetch 함수
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getChannels();
        if (Array.isArray(data)) {
          setDepartments(data);
        } else {
          console.error('예상치 못한 데이터 형식:', data);
        }

        console.log(data);
      } catch (error) {
        console.error('채널 데이터 가져오기 실패:', error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <ListContainer>
      <NavigationBar>
        <BackButton onClick={() => navigate('/')}>Home</BackButton>
        <Title>Department List</Title>
        {isAuthenticated ? (
          <MyPageButton onClick={() => navigate('/mypage')}>
            My Page
          </MyPageButton>
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
      </NavigationBar>

      <DepartmentListContainer>
        {departments.map((department, index) => (
          <DepartmentItem key={index} department={department} index={index} />
        ))}
      </DepartmentListContainer>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin: 2rem 1rem;
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

const DepartmentListContainer = styled.div`
  margin: 0 8.8rem;
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
const MyPageButton = styled(Button)``; // 로그인 되어있을 때만 보이게, 안되어 있으면 로그인/회원가입 화면으로 넘기기
const AuthButton = styled(Button)``; // 로그인/회원가입 버튼 (비로그인시 보이게, 로그인시 안보이게)

export default DepartmentList;
