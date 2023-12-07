import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundText>Sorry, Page Not Found :(</NotFoundText>
        <NotFoundSubText>by. H-Mingle</NotFoundSubText>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const NotFoundContent = styled.div`
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 0.5em;
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.5em;
`;

const NotFoundSubText = styled.p`
  font-size: 1.5rem;
`;

export default NotFound;
