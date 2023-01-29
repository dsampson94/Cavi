import { useEffect, useState } from 'react';

const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    return (
        <img
            src={ images[currentImageIndex].src }
            alt="slide-cavi-images"
            className="transition duration-800 ease-in-out transform hover:scale-105"
            style={ {
                transition: 'opacity 6s ease-in-out, transform 6s ease-in-out',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            } }
        />
    );
};

export default ImageCarousel;
