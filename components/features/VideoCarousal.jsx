import React, { useEffect, useRef, useState } from 'react';

const VideoCarousel = ({ videos, businessScrollToRef }) => {
    const [startPosition, setStartPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [movedDuringDrag, setMovedDuringDrag] = useState(false);
    const carouselRef = useRef(null);
    const [direction, setDirection] = useState(1);
    const [isUnmuted, setIsUnmuted] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);
    const [expandText, setExpandText] = useState(false);

    const handleStart = (e) => {
        e.preventDefault();
        setStartPosition(e.clientX || e.touches?.[0].clientX);
        setDragging(true);
        setMovedDuringDrag(false);
    };

    const handleEnd = (e) => {
        if (dragging && !movedDuringDrag && Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 5) {
            const videoElement = e.target.closest('video');
            if (videoElement) {
                if (videoElement.paused) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            }
        }
        setDragging(false);
        setMovedDuringDrag(false);
    };


    const handleMove = (e) => {
        if (!dragging) return;
        setMovedDuringDrag(true);
        const newScrollLeft = carouselRef.current.scrollLeft - (e.clientX || e.touches?.[0].clientX) + startPosition;
        carouselRef.current.scrollLeft = newScrollLeft;
        setStartPosition(e.clientX || e.touches?.[0].clientX);
    };

    const handleVideoTouchStart = (e) => {
        const video = e.target;
        setIsUnmuted(!video.muted);
    };

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (isUnmuted) return;

            if (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth) {
                setDirection(-1);
            } else if (carouselRef.current.scrollLeft <= 0) {
                setDirection(1);
            }
            carouselRef.current.scrollLeft += direction;
        }, 20);

        return () => {
            clearInterval(autoScroll);
        };
    }, [direction, isUnmuted]);

    return (
        <>
            <div ref={businessScrollToRef} />
            <div
                ref={carouselRef}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}  // Add this line
                onMouseLeave={handleEnd}
                onMouseMove={handleMove}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}  // Also add this for touch events
                onTouchMove={handleMove}
                className="overflow-x-hidden flex w-full md:mt-12 md:mt-24"
            >
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 w-[600px] h-[620px] overflow-hidden mx-12"
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
                            className={`absolute inset-0 bg-black p-4 transition-all duration-300 flex flex-col justify-end ${activeVideo === index ? 'bg-opacity-60' : 'bg-opacity-0'}`}>
                            <div className={`${expandText === index ? '' : 'line-clamp-2'} transition-all text-white text-lg`}>
                                {video.text}
                            </div>
                            {video.text &&
                            <button
                                onClick={() => {
                                    if (expandText === index) {
                                        setExpandText(null);
                                    } else {
                                        setExpandText(index);
                                    }
                                }}
                                className="mt-2 text-white underline cursor-pointer"
                            >
                                {expandText === index ? 'Read Less' : 'Read More'}
                            </button>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default VideoCarousel;
