import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeEnterButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/department-list');
  };

  return (
    <div>
      <HomeEnterButtonContainer>
        <button onClick={handleButtonClick}>입장하기</button>
      </HomeEnterButtonContainer>
    </div>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const HomeEnterButtonContainer = styled.div`
  margin: 1rem;
  text-align: center;
  animation: ${fadeIn} 1.5s ease-out;

  button {
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: black;
      transform: scale(1.05);
    }
  }
`;

export default HomeEnterButton;
