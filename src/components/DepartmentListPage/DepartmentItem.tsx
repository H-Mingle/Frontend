import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DepartmentItemProps } from '../../types/DepartmentItemProps';

const DepartmentItem: React.FC<DepartmentItemProps & { index: number }> = ({
  department,
  index,
}) => {
  const navigate = useNavigate();

  // 이미지 경로를 결정하는 함수
  const getImageSrc = (index) => {
    let imagePath;
    switch (index) {
      case 0:
        imagePath = '0.jpg';
        break;
      case 1:
        imagePath = '1.jpeg';
        break;
      case 2:
        imagePath = '2.jpeg';
        break;
      case 3:
        imagePath = '3.jpeg';
        break;
      case 4:
        imagePath = '4.jpeg';
        break;
      default:
        imagePath = department.imageUrl || 'default_department_image.png';
        break;
    }
    return `/images/department/${imagePath}`;
  };

  return (
    <ItemContainer onClick={() => navigate('/feed')}>
      <ItemImage src={getImageSrc(index)} alt="department" />
      <ItemInfo>
        <h3>{department.name}</h3>
        <p className="location">🏬 {department.location}</p>
        <p className="contact">☎ {department.phoneNumber}</p>
        <p className="text">{department.description}</p>
      </ItemInfo>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 0.1px solid #ddd;
  padding: 20px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.015);
    background-color: #f8f4ec;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const ItemImage = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  font-size: 1rem;
  color: #444;
  line-height: 1.5;

  h3 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }

  p.location,
  p.contact {
    color: gray;
    font-size: 1rem;
    margin-bottom: 8px;
  }

  p.text {
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

export default DepartmentItem;
