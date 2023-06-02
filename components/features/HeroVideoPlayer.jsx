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
            ref={videoRef}
            src={ videoSrc }
            style={ {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            } }
            loop
            muted
        />
    );
};

export default HeroVideoPlayer;
