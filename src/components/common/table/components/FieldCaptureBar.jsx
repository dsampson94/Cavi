import React from 'react';
import DatePick from '../../date-picker/DatePick';
import Button from '../../button/Button';
import TextInput from '../../input/text/TextInput';

export const FieldCaptureBar = ({
                                  showCaptureBar,
                                  setShowCaptureBar,
                                  captureValue,
                                  setCaptureValue,
                                  captureType,
                                  setCaptureType,
                                  captureDate,
                                  setCaptureDate
                                }) => {

  const transitionStyle = 'transition-all duration-300 ease-out transform';
  const barStyle = showCaptureBar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2';

  return <>
    { showCaptureBar &&
    <div
      className={ `flex border-2 border-gray-500 dark:border-white h-12 -mt-[38px] w-[480px] pr-2 ml-10 rounded-md z-10 absolute bg-gray-100 ${ transitionStyle } ${ barStyle }` }
    >
      <div className="min-w-[30%] mt-1">
        <DatePick setActiveItem={ setCaptureDate }
                  value={ captureDate } />
      </div>
      <TextInput defaultValue={ captureValue }
                 onKeyDown={ (event) => {
                   if (event.key === 'Enter') setCaptureValue(event.target.value);
                 } }
                 popup />
      <Button label={ 'Irrigation' }
              onClick={ () => setCaptureType('Irrigation') }
              popup />
      <Button label={ 'Note' }
              onClick={ () => setCaptureType('Note') }
              popup />
      <Button label={ 'Rainfall' }
              onClick={ () => setCaptureType('Rainfall') }
              popup />
      <Button label={ 'Close' }
              onClick={ () => setShowCaptureBar(false) }
              popup />
    </div> }
  </>;
};
