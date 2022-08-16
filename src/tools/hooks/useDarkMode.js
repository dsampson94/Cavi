import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { retrieveActiveThemeFromLocalStorage } from '../storage/localStorage';

const useDarkMode = (activate) => {

  const storeActiveTheme = useSelector(state => state?.system?.theme);
  const localActiveTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode] = useState(localActiveTheme === 'dark');

  useEffect(() => {
    if (activate) {
      if (localActiveTheme === 'dark') return document.body.classList.add('dark-mode');
      else return document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return { storeActiveTheme, localActiveTheme, isDarkMode };
};

export default useDarkMode;
