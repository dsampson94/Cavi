import React, { useEffect, useRef, useState } from 'react';

const VideoAndDivCarousel = ({ videosComponents, reverse }) => {
    const [startPosition, setStartPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [movedDuringDrag, setMovedDuringDrag] = useState(false);
    const carouselRef = useRef(null);
    const [direction, setDirection] = useState(reverse ? -1 : 1); // Initialize direction based on `reverse` prop
    const [isUnmuted, setIsUnmuted] = useState(false);

    const handleStart = (e) => {
        e.preventDefault();
        setStartPosition(e.clientX || e.touches?.[0].clientX);
        setDragging(true);
        setMovedDuringDrag(false);
        carouselRef.current.style.scrollBehavior = 'unset';
    };

    const handleEnd = (e) => {
        if (dragging && !movedDuringDrag && Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 5) {
            if (e.target.play && e.target.pause) {
                if (e.target.paused) {
                    e.target.play();
                } else {
                    e.target.pause();
                }
            }
        }
        setDragging(false);
        setMovedDuringDrag(false);
    };

    useEffect(() => {
        if (reverse && carouselRef.current) {
            // Scroll to the far right
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
        }
    }, [reverse]);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (isUnmuted) return;

            if (!reverse && carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth) {
                setDirection(-1);
            } else if (reverse && carouselRef.current.scrollLeft <= 0) {
                setDirection(1);
            } else if (carouselRef.current.scrollLeft <= 0) {
                setDirection(1);
            }
            carouselRef.current.scrollLeft += direction;
        }, 25);

        return () => {
            clearInterval(autoScroll);
        };
    }, [direction, isUnmuted, reverse]);

    const handleMove = (e) => {
        if (!dragging) return;
        setMovedDuringDrag(true);
        const newScrollLeft =
            carouselRef.current.scrollLeft - (e.clientX || e.touches?.[0].clientX) + startPosition;
        carouselRef.current.scrollLeft = newScrollLeft;
        setStartPosition(e.clientX || e.touches?.[0].clientX);
    };

    const handleVideoTouchStart = (e) => {
        const video = e.target;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };


    return (
        <div
            ref={ carouselRef }
            onTouchStart={ handleStart }
            onTouchEnd={ handleEnd }
            onTouchMove={ handleMove }
            onMouseDown={ handleStart }
            onMouseUp={ handleEnd }
            onMouseLeave={ handleEnd }
            onMouseMove={ handleMove }
            className="overflow-x-hidden flex flex-col w-full mt-12 md:mt-48 mb-24 md:mb-32 md:flex-row"
        >

            { videosComponents.map((videoOrComponent, index) =>
                typeof videoOrComponent === 'string' ? (
                    <video
                        key={ index }
                        src={ videoOrComponent }
                        className="flex-shrink-0 px-10 cursor-pointer w-full h-full md:w-[700px] md:h-auto"
                        onTouchStart={ handleVideoTouchStart }
                        onMouseEnter={ e => {
                            setIsUnmuted(true);
                        } }
                        onMouseLeave={ e => {
                            setIsUnmuted(false);
                        } }
                    />
                ) : (
                    <div
                        key={ index }
                        className="flex-shrink-0 px-10 py-10 cursor-pointer w-full h-full md:w-[500px] md:h-auto"
                        onMouseEnter={ e => {
                            setIsUnmuted(true);
                        } }
                        onMouseLeave={ e => {
                            setIsUnmuted(false);
                        } }
                    >
                        { videoOrComponent }
                    </div>
                )
            ) }
        </div>
    );
};

export default VideoAndDivCarousel;
