import React from 'react';

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

  const handleClose = () => {
    setImageViewerIsOpen(false);
    dispatch({ type: SET_ACTIVE_IMAGE, undefined });
  };

  return (
    <>
      { imageViewerIsOpen && fieldActiveImage && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center"
             onClick={ handleClose }>
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl h-[520px] w-[400px] p-4 mt-20 relative"
               onClick={ (e) => e.stopPropagation() }>

            <button className="absolute top-0 h-4 right-0 w-4 text-gray-900 hover:text-gray-700 dark:text-gray-400 flex"
                    onClick={ (e) => {
                      e.stopPropagation();
                      handleClose();
                    } }>
              <VscClose />
            </button>

            <img src={ fieldActiveImage }
                 width={ 600 }
                 height={ 500 }
                 alt={ activeFieldName } />

          </div>
        </div>
      ) }
    </>
  );
};
