import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DepartmentItem from '../components/DepartmentListPage/DepartmentItem';

const DepartmentList = () => {
  const navigate = useNavigate();
  const tempDepartments = new Array(8).fill(null);

  const BackButton = styled(Button)``;
  const MyPageButton = styled(Button)``;

  return (
    <ListContainer>
      <TitleBar>
        <BackButton onClick={() => navigate('/')}>Home</BackButton>
        <Title>Department List</Title>
        <MyPageButton onClick={() => navigate('/mypage')}>My Page</MyPageButton>
      </TitleBar>

      {tempDepartments.map((_, index) => (
        <DepartmentItem key={index} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin: 2rem 1rem;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
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

export default DepartmentList;
