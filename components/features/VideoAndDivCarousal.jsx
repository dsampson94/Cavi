import React, { useRef, useState } from 'react';

const VideoAndDivCarousel = ({ videosComponents, businessScrollToRef }) => {
    const [startPosition, setStartPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [movedDuringDrag, setMovedDuringDrag] = useState(false);
    const carouselRef = useRef(null);

    const handleStart = (e) => {
        e.preventDefault();
        setStartPosition(e.clientX || e.touches?.[0].clientX);
        setDragging(true);
        setMovedDuringDrag(false);
        carouselRef.current.style.scrollBehavior = 'unset';
    };

    const handleEnd = (e) => {
        if (
            dragging &&
            !movedDuringDrag &&
            Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 20
        ) {
            if (e.target.nodeName === 'VIDEO') {
                if (e.target.paused) e.target.play();
                else e.target.pause();
            }
        }
        setDragging(false);
        setMovedDuringDrag(false);
        carouselRef.current.style.scrollBehavior = 'smooth';
    };

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
            <div ref={ businessScrollToRef } />

            { videosComponents.map((videoOrComponent, index) =>
                typeof videoOrComponent === 'string' ? (
                    <video
                        key={ index }
                        src={ videoOrComponent }
                        className="flex-shrink-0 px-10 cursor-pointer w-full h-full md:w-[700px] md:h-auto"
                        onMouseEnter={ (e) => {
                            e.target.muted = false;
                        } }
                        onMouseLeave={ (e) => {
                            e.target.muted = true;
                        } }
                        onTouchStart={ handleVideoTouchStart }
                        muted
                        autoPlay
                        loop
                    />
                ) : (
                    <div
                        key={ index }
                        className="flex-shrink-0 px-10 py-10 cursor-pointer w-full h-full md:w-[500px] md:h-auto"
                    >
                        { videoOrComponent }
                    </div>
                )
            ) }
        </div>
    );
};

export default VideoAndDivCarousel;
