import React, { useState } from 'react';
import DatePick from '../../date-picker/DatePick';
import Button from '../../button/Button';
import TextInput from '../../input/text/TextInput';

export const FieldCaptureBar = ({
                                  captureValue,
                                  setCaptureValue,
                                  captureType,
                                  setCaptureType,
                                  captureDate,
                                  setCaptureDate
                                }) => {

  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="w-0 h-0">
      <div className="flex relative border-2 border-gray-500 ml-[260px] dark:border-white h-11 -mt-[28px] -translate-y-3 w-[480px] pr-2 rounded-md z-[99] bg-gray-100">
        <div className="min-w-[23%] mt-0.5 ml-1">
          <DatePick setActiveItem={ setCaptureDate } value={ captureDate } />
        </div>

        <TextInput
          defaultValue={ captureValue }
          placeholder="Enter value"
          onKeyDown={ (event) => {
            if (event.key === 'Enter') setCaptureValue(event.target.value);
          } }
          popup
        />

        <Button
          label={ 'Irrigation' }
          onClick={ () => setCaptureType('Irrigation') }
          popup
        />
        <Button label={ 'Note' } onClick={ () => setCaptureType('Note') } popup />
        <Button
          label={ 'Rainfall' }
          onClick={ () => setCaptureType('Rainfall') }
          popup
        />
        <Button
          label={ 'Close' }
          onClick={ () => setIsVisible(false) }
          popup
        />
      </div>
    </div>
  ) : null;
};
