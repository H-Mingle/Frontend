import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { carouselImageData } from '../../constants/HomePage/carouselImageData';

// 현재 이미지 5개라 5번째 이미지에서 1번째로 갈때 캐러셀 슬라이드가 휙 앞으로 이동하는데, 이건 이미지 여러개 넣으면 사용자는 인지 못함
const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 초기 중앙 슬라이드 인덱스를 0으로 설정

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageClick = (index: number) => {
    setCurrentSlide(index);
  };

  const imageSlides = carouselImageData.map((image, index) => {
    let positionClass = '';
    if (index === currentSlide) {
      positionClass = 'center';
    } else if (
      index ===
      (currentSlide + carouselImageData.length - 1) % carouselImageData.length
    ) {
      positionClass = 'left';
    } else if (index === (currentSlide + 1) % carouselImageData.length) {
      positionClass = 'right';
    }

    return (
      <div
        key={image.alt}
        className={`carousel-item ${positionClass}`}
        onClick={() => handleImageClick(index)}
      >
        <img src={image.src} alt={image.alt} />
      </div>
    );
  });

  return (
    <HomeCarouselContainer>
      <Carousel
        className="carousel"
        showArrows={false}
        autoPlay
        infiniteLoop
        showThumbs={false}
        centerMode
        centerSlidePercentage={33.33}
        onChange={handleSlideChange}
        selectedItem={currentSlide}
        showStatus={false}
      >
        {imageSlides}
      </Carousel>
    </HomeCarouselContainer>
  );
};

const HomeCarouselContainer = styled.div`
  .carousel .carousel-slider {
    overflow: visible;
    margin-top: 1rem;
  }

  .carousel-item {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    width: 30vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    margin: 0 1.5vw;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .carousel-item.left {
    transform: translateX(-8%);
  }

  .carousel-item.right {
    transform: translateX(8%);
  }

  .carousel-item.center {
    transform: scale(1.25);
    opacity: 1;
  }

  .carousel .slide {
    flex: 0 0 auto;
  }

  .carousel .control-dots {
    display: none;
  }
`;

export default HomeCarousel;
