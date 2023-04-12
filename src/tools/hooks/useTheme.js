import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { retrieveActiveThemeFromLocalStorage, saveActiveThemeToLocalStorage } from '../storage/localStorage';

const useTheme = (activate) => {

  const storeActiveTheme = useSelector(state => state?.system?.theme);
  const localActiveTheme = retrieveActiveThemeFromLocalStorage();
  const isDarkMode = (localActiveTheme === 'dark');

  useEffect(() => {
    if (activate) {
      if (localActiveTheme === 'dark') {
        return document.documentElement.classList.add('dark');
      } else {
        saveActiveThemeToLocalStorage('light');
        return document.documentElement.classList.add('light');
      }
    }
  }, [isDarkMode, activate, localActiveTheme]);

  return { storeActiveTheme, localActiveTheme, isDarkMode };
};

export default useTheme;
