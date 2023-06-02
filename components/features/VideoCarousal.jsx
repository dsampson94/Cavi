import React, { useRef, useState } from 'react';

const VideoCarousel = ({ videos, businessScrollToRef }) => {
    const [startPosition, setStartPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [movedDuringDrag, setMovedDuringDrag] = useState(false);
    const carouselRef = useRef(null);

    const handleStart = (e) => {
        e.preventDefault();
        setStartPosition(e.clientX || e.touches?.[0].clientX);
        setDragging(true);
        setMovedDuringDrag(false); // reset flag when starting a new drag
    };

    const handleEnd = (e) => {
        if (dragging && !movedDuringDrag && Math.abs(startPosition - (e.clientX || e.changedTouches?.[0].clientX)) < 5) {
            // only handle click if the mouse hasn't moved during the drag
            if (e.target.paused) {
                e.target.play();
            } else {
                e.target.pause();
            }
        }
        setDragging(false);
        setMovedDuringDrag(false); // reset flag when drag ends
    };

    const handleMove = (e) => {
        if (!dragging) return;
        setMovedDuringDrag(true); // set flag when the mouse is moved during a drag
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
            className="overflow-x-hidden flex w-full mt-10"
        >
            <div ref={ businessScrollToRef } />

            { videos.map((video, index) => (
                <video
                    key={ index }
                    src={ video }
                    className="flex-shrink-0 px-10 cursor-pointer w-92 h-full md:w-[700px]"
                />
            )) }
        </div>
    );
};

export default VideoCarousel;
