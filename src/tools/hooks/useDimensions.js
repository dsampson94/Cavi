import { useEffect, useMemo, useRef, useState } from 'react';

const useDimensions = () => {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;

    const resizeObserverCallback = ([entry]) => {
      requestAnimationFrame(() => {
        if (width !== entry.contentRect.width) {
          setWidth(entry.contentRect.width);
        }
        if (height !== entry.contentRect.height) {
          setHeight(entry.contentRect.height);
        }
      });
    };

    const resizeObserver = new ResizeObserver(resizeObserverCallback);
    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [height, width]);

  const dimensions = useMemo(() => ({ width, height }), [width, height]);

  return [ref, dimensions];
};

export default useDimensions;
