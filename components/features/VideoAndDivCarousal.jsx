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
    };

    const handleEnd = (e) => {
        if (dragging && !movedDuringDrag && Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 5) {
            if (e.target.nodeName === 'VIDEO') {
                if (e.target.paused) e.target.play();
                else e.target.pause();
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

    return (
        <div
            ref={ carouselRef }
            onMouseDown={ handleStart }
            onMouseUp={ handleEnd }
            onMouseLeave={ handleEnd }
            onMouseMove={ handleMove }
            onTouchStart={ handleStart }
            onTouchEnd={ handleEnd }
            onTouchMove={ handleMove }
            className="overflow-x-hidden flex w-full mt-32 mb-24"
        >
            <div ref={ businessScrollToRef } />

            { videosComponents.map((videoOrComponent, index) => (
                (typeof videoOrComponent === 'string') ?
                    <video
                        key={ index }
                        src={ videoOrComponent }
                        className="flex-shrink-0 px-10 cursor-pointer w-92 h-full md:w-[700px]"
                    />
                    :
                    <div
                        key={ index }
                        className="flex-shrink-0 px-10 cursor-pointer w-92 h-full md:w-[700px]"
                    >
                        { videoOrComponent }
                    </div>
            )) }
        </div>
    );
};


export default VideoAndDivCarousel;
