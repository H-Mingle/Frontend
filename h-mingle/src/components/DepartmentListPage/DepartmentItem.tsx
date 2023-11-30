import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DepartmentItem = () => {
  const navigate = useNavigate();

  return (
    <ItemContainer onClick={() => navigate('/story')}>
      <ItemImage
        src="/images/department/default_department_image.png"
        alt="department"
      />
      <ItemInfo>
        <h3>더현대 서울</h3>
        <p className="location">
          🏬 서울 영등포구 여의대로 108, (여의도동,파크원)
        </p>
        <p className="contact">☎ 02-767-2233</p>
        <p className="text">
          SOUND OF THE FUTURE, THE HYUNDAI SEOUL (더현대 서울)
          <br />
          더현대 서울은 ‘미래를 향한 울림’이라는 테마 아래, 더 행복한 내일을
          위한 비전과 스탠다드를제시합니다.
          <br />
          서울 최대 규모의 혁신적인 공간 디자인, 플래그십 럭셔리, MZ 전문관,
          국내 최대 식품관과 업계 최대 복합 문화 공간 등 글로벌 큐레이션과 함께
          <br />
          업계 최초 무인 스마트 스토어와 안전 관리 로봇을 갖춘 미래형
          테크놀로지를 갖추고 있습니다.
        </p>
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
