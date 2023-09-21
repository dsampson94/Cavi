import React, { useEffect, useRef, useState } from 'react';

const VideoCarousel = ({ videos, businessScrollToRef }) => {
  const carouselRef = useRef(null);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [expandText, setExpandText] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [direction, setDirection] = useState(1);
  const [startPosition, setStartPosition] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (isUnmuted || expandText !== null) return;

      if (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth) {
        setDirection(-1);
      } else if (carouselRef.current.scrollLeft <= 0) {
        setDirection(1);
      }
      carouselRef.current.scrollLeft += direction * 1.4;
    }, 20);

    return () => {
      clearInterval(autoScroll);
    };
  }, [direction, isUnmuted, expandText]);

  const handleDragStart = (e) => {
    setStartPosition(e.clientX || e.touches[0].clientX);
    setDragging(true);
  };

  const handleDragMove = (e) => {
    if (dragging) {
      const newPos = e.clientX || e.touches[0].clientX;
      const diff = startPosition - newPos;
      carouselRef.current.scrollLeft += diff;
      setStartPosition(newPos);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleVideoTouchStart = (e) => {
    const video = e.target;
    setIsUnmuted(!video.muted);
  };

  return (
    <>
      <div ref={businessScrollToRef} />
      <div
        ref={carouselRef}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="overflow-x-hidden flex w-full md:mt-12 mt-6"
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full md:w-[600px] h-[300px] md:h-[620px] overflow-hidden mx-2 md:mx-12"
            onMouseEnter={() => {
              setActiveVideo(index);
            }}
            onMouseLeave={() => {
              setActiveVideo(null);
            }}
          >
            <video
              src={video.src}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              onTouchStart={handleVideoTouchStart}
              autoPlay
              loop
              muted
            />
            <div
              className={`absolute inset-0 bg-black p-2 md:p-4 transition-all duration-300 flex flex-col justify-end ${
                activeVideo === index ? 'bg-opacity-60' : 'bg-opacity-0'
              }`}
            >
              <div
                className={`${
                  expandText === index ? '' : 'line-clamp-2'
                } transition-all text-white text-xs md:text-lg`}
              >
                {video.text}
              </div>
              {video.text && (
                <button
                  onClick={() => {
                    setExpandText((prev) => (prev === index ? null : index));
                  }}
                  className="mt-1 text-white underline cursor-pointer text-xs md:text-base"
                >
                  {expandText === index ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCarousel;
