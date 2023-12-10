// components/Carousel.tsx
import { useState, useEffect } from 'react';

const images = [
  'https://i.ibb.co/CQv6DV8/banner1.jpg',
  'https://i.ibb.co/sKyMVb5/banner2.jpg',
  'https://i.ibb.co/2gpDpH2/banner3.jpg',
  'https://i.ibb.co/LCNdXcK/banner4.png',
  'https://i.ibb.co/Wyyn3RL/banner5.png',
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if the component is on the client side
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="relative mt-16">
      {/* mt-16 to provide space below the navbar */}
      {/* Carousel wrapper with additional margin top to ensure it starts below the navbar */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 mt-16">
        {images.map((src, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-1000 ease-in-out`}
            data-carousel-item
          >
            <img
              src={src}
              className="absolute block w-1200 h-600 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-2xl"
        data-carousel-prev
        onClick={goToPrevSlide}
      >
        ⮜
        {/* ... (rest of the code for the previous button) */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-2xl"
        data-carousel-next
        onClick={goToNextSlide}
      >
        ⮞
        {/* ... (rest of the code for the next button) */}
      </button>
    </div>
  );
};

export default Carousel;
