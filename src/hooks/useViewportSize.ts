import { useEffect, useState } from 'react';

const useViewportSize = () => {
  const [viewportHeight, setViewportHeight] = useState(
    window.innerHeight || document.documentElement.clientHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(
        window.innerHeight || document.documentElement.clientHeight
      );
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportHeight;
};

export default useViewportSize;
