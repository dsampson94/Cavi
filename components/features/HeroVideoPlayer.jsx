import { useEffect, useRef } from 'react';

const HeroVideoPlayer = ({ videoSrc }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [videoSrc]);

    return (
        <video
            ref={ videoRef }
            src={ videoSrc }
            className="w-full h-screen md:h-[120%] object-cover"
            loop
            muted
        />
    );
};

export default HeroVideoPlayer;
