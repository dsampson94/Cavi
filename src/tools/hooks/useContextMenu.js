import { useEffect, useCallback, useState } from 'react';

const useContextMenu = () => {

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showDropDown, setShowDropDown] = useState(false);

  const handleContextMenu = useCallback((event) => {
      event.preventDefault();
      setShowDropDown(true);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
    },
    [setShowDropDown, setAnchorPoint]
  );

  const handleClick = useCallback(() => (showDropDown ? setShowDropDown(false) : null), [showDropDown]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { showDropDown, anchorPoint };
};

export default useContextMenu;
