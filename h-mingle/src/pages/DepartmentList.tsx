import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DepartmentItem from '../components/DepartmentListPage/DepartmentItem';

const DepartmentList = () => {
  const navigate = useNavigate();
  const tempDepartments = new Array(8).fill(null);

  // 로그인 상태를 나타내는 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값 false

  return (
    <ListContainer>
      <NavigationBar>
        <BackButton onClick={() => navigate('/')}>Home</BackButton>
        <Title>Department List</Title>
        {isLoggedIn ? (
          <MyPageButton onClick={() => navigate('/mypage')}>
            My Page
          </MyPageButton>
        ) : (
          <AuthButton onClick={() => navigate('/auth')}>
            Login / Sign Up
          </AuthButton>
        )}
      </NavigationBar>

      {tempDepartments.map((_, index) => (
        <DepartmentItem key={index} />
      ))}
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
