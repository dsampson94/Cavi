import { useRef } from 'react';

export default function TextInputTw({ label, placeholder, activeValue, setActiveValue }) {

  const inputRef = useRef(null);

  function handleCommit() {
    setActiveValue(inputRef.current.value);
  }

  return (
    <div
      className="relative m-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-0 focus-within:ring-blue-600 min-w-[188px]"
    >
      <label
        htmlFor="input"
        className="absolute -top-2 left-2 -mt-px inline-block bg-white dark:bg-dark-mode-grey px-1 text-xs transition duration-300 font-medium text-gray-900 dark:text-white"
      >
        { label }
      </label>
      <input
        type="text"
        name="input"
        id="input"
        defaultValue={ activeValue }
        ref={ inputRef }
        onBlur={ handleCommit }
        onKeyPress={ (event) => {
          if (event.key === 'Enter') handleCommit();
        } }
        className="block w-full text-black dark:text-white bg-transparent border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder={ placeholder }
      />
    </div>
  );
}
