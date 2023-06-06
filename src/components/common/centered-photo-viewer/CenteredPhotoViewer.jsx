import React, { useCallback, useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_IMAGE } from '../../../redux/actions/field.action';

export const CenteredPhotoViewer = ({
                                      imageViewerIsOpen,
                                      setImageViewerIsOpen,
                                      activeFieldName,
                                      fieldActiveImage
                                    }) => {
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: window.innerWidth / 2 - 200, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = fieldActiveImage;
    image.onload = () => setIsImageLoaded(true);
  }, [fieldActiveImage]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = useCallback((e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y
    });
    e.stopPropagation();
    e.preventDefault();
  }, [dragging, rel]);

  const handleClose = () => {
    setImageViewerIsOpen(false);
    dispatch({ type: SET_ACTIVE_IMAGE, undefined });
    setZoom(1);
    setIsImageLoaded(false);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    setZoom(prevZoom => e.deltaY < 0 ? Math.min(3, prevZoom + 0.1) : Math.max(0.5, prevZoom - 0.1));
  };

  return (
    <>
      { imageViewerIsOpen && fieldActiveImage && isImageLoaded && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center"
             style={ { transform: 'scale(0.8)', transformOrigin: 'center' } } // 0.8 can be any value less than 1
             onMouseMove={ onMouseMove }
             onMouseUp={ onMouseUp }>
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl w-[500px] p-4 -mt-6 relative"
               style={ { transform: `scale(${ zoom })`, transformOrigin: 'center', position: 'absolute', left: `${ pos.x }px`, top: `${ pos.y }px` } }
               onMouseDown={ onMouseDown }
               onClick={ (e) => e.stopPropagation() }>

            <button className="absolute top-0 h-4 right-0 w-4 text-gray-900 hover:text-gray-700 dark:text-gray-400 flex"
                    onClick={ (e) => {
                      e.stopPropagation();
                      handleClose();
                    } }>
              <VscClose />
            </button>

            <img src={ fieldActiveImage }
                 alt={ activeFieldName }
                 style={ { transform: 'scale(0.99)', transformOrigin: 'center' } } // 0.8 can be any value less than 1
                 onWheel={ handleZoom } />

          </div>
        </div>
      ) }
    </>
  );
};
