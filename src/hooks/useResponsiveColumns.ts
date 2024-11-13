import { useEffect, useState, useRef } from 'react';

interface UseResponsiveColumnsProps {
  galleryPadding: number;
  gapSize: number;
}

export const useResponsiveColumns = ({ galleryPadding, gapSize }: UseResponsiveColumnsProps) => {
  const [columnCount, setColumnCount] = useState(3);
  const [columnWidth, setColumnWidth] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const updateColumnCount = (width: number) => {
    const newColumnCount =
      width > 1200 ? 5 : width > 900 ? 3 : width > 600 ? 2 : 1;
    setColumnCount(newColumnCount);

    const galleryWidth = width - 2 * galleryPadding;
    const totalGap = (newColumnCount - 1) * gapSize;
    const calculatedColumnWidth = (galleryWidth - totalGap) / newColumnCount;
    setColumnWidth(calculatedColumnWidth);
  };

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updateColumnCount(entry.contentRect.width);
      }
    });

    resizeObserver.observe(galleryElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [galleryPadding, gapSize]);

  return { galleryRef, columnCount, columnWidth };
};
