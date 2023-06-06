import React, { useEffect, useRef, useState } from 'react';

const VideoCarousel = ({ videos, businessScrollToRef }) => {
    const [startPosition, setStartPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [movedDuringDrag, setMovedDuringDrag] = useState(false);
    const carouselRef = useRef(null);
    const [direction, setDirection] = useState(1);
    const [isUnmuted, setIsUnmuted] = useState(false); // new state for checking if any video is unmuted

    const handleStart = (e) => {
        e.preventDefault();
        setStartPosition(e.clientX || e.touches?.[0].clientX);
        setDragging(true);
        setMovedDuringDrag(false);
    };

    const handleEnd = (e) => {
        if (dragging && !movedDuringDrag && Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 5) {
            if (e.target.paused) {
                e.target.play();
            } else {
                e.target.pause();
            }
        }
        setDragging(false);
        setMovedDuringDrag(false);
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
        video.muted = !video.muted;
        setIsUnmuted(!video.muted); // set isUnmuted to the opposite of the new muted state
    };

    return (
        <>
            <div ref={ businessScrollToRef } />

            <div
                ref={ carouselRef }
                onMouseDown={ handleStart }
                onMouseUp={ handleEnd }
                onMouseLeave={ handleEnd }
                onMouseMove={ handleMove }
                onTouchStart={ handleStart }
                onTouchEnd={ handleEnd }
                onTouchMove={ handleMove }
                className="overflow-x-hidden flex w-full md:mt-12 md:mt-24"
            >
                <div ref={ businessScrollToRef } />

                { videos.map((video, index) => (
                    <video
                        key={ index }
                        src={ video }
                        className="flex-shrink-0 px-10 cursor-pointer w-92 h-full md:w-[700px]"
                        onMouseEnter={ e => {
                            e.target.muted = false;
                            setIsUnmuted(true); // set isUnmuted to true when mouse enters
                        } }
                        onMouseLeave={ e => {
                            e.target.muted = true;
                            setIsUnmuted(false); // set isUnmuted to false when mouse leaves
                        } }
                        onTouchStart={ handleVideoTouchStart }
                        autoPlay
                        loop
                        muted
                    />
                )) }
            </div>
        </>
    );
};

export default VideoCarousel;
