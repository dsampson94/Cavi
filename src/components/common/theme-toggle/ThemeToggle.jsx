import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DarkModeToggle from 'react-dark-mode-toggle';

import { retrieveActiveThemeFromLocalStorage, saveActiveThemeToLocalStorage } from '../../../tools/storage/localStorage';

import { SET_THEME } from '../../../redux/actions/system.action';

const ThemeToggle = () => {

  const dispatch = useDispatch();

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode, setIsDarkMode] = useState(!(getTheme === 'dark'));

  useEffect(() => {
    if (getTheme === 'dark') return document.body.classList.add('dark-mode');
  }, [isDarkMode]);

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      saveActiveThemeToLocalStorage('dark');
      dispatch({ type: SET_THEME, theme: 'dark' });
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      saveActiveThemeToLocalStorage('light');
      dispatch({ type: SET_THEME, theme: 'light' });
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  return (
    <div style={ style }>
      <DarkModeToggle className="theme-toggle"
                      onChange={ handleChange }
                      checked={ !isDarkMode }
                      size={ 60 } />
    </div>
  );
};

const style = {
  display: 'flex'
};

export default ThemeToggle;