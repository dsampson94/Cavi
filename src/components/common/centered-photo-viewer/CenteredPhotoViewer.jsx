import React from 'react';

import { VscClose } from 'react-icons/vsc';

export const CenteredPhotoViewer = ({
                                      imageViewerIsOpen,
                                      setImageViewerIsOpen,
                                      activeFieldName,
                                      fieldActiveImage
                                    }) => {
  const imageBase64 = fieldActiveImage
    ? `data:image/jpeg;base64,${ btoa(
      String.fromCharCode.apply(null, new Uint8Array(fieldActiveImage))
    ) }`
    : null;

  return (
    <>
      { imageViewerIsOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl h-92 w-[400px] p-4 mt-20 relative">

            <button className="absolute top-0 h-4 right-0 w-4 text-gray-900 hover:text-gray-700 dark:text-gray-400 flex"
                    onClick={ () => setImageViewerIsOpen(false) }>
              <VscClose />
            </button>

            { imageBase64 && (
              <img
                src={ imageBase64 }
                width={ 600 }
                height={ 500 }
                alt={ activeFieldName }
              />
            ) }
          </div>
        </div>
      ) }
    </>
  );
};
