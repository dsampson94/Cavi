import { useEffect, useState } from 'react';

const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    return (
        <img src={ images[currentImageIndex].src }
             alt="slide-cavi-images"
             style={ {
                 width: '100%',
                 height: '100%',
                 objectFit: 'cover'
             } }
        />
    );
};

export default ImageCarousel;
