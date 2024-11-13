import { useMemo } from 'react';
import { ImageData } from '../components/VirtualizedColumn/virtualizedColumnInterfaces';
import { PexelsPhoto } from '../api/pexelsApi/pexelsInterfaces';

interface UseGalleryProps {
  photos: PexelsPhoto[];
  columnCount: number;
  columnWidth: number;
  itemGap: number;
}

export const useGallery = ({ photos, columnCount, columnWidth, itemGap }: UseGalleryProps) => {
  return useMemo(() => {
    if (!columnWidth || photos.length === 0) return [];

    const columns: ImageData[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = new Array(columnCount).fill(0);

    photos.forEach((item) => {
      if (!item.width || !item.height) {
        console.error(`Photo with ID ${item.id} is missing width or height.`);
        return;
      }

      const aspectRatio = item.height / item.width;
      const imageHeight = columnWidth * aspectRatio;
      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);
      const top = columnHeights[columnIndex];

      columns[columnIndex].push({
        id: item.id,
        src: item.src,
        height: imageHeight,
        top: top,
        alt: item.alt,
        avgColor: item.avg_color,
      });

      columnHeights[columnIndex] += imageHeight + itemGap;
    });

    return columns;
  }, [photos, columnCount, columnWidth, itemGap]);
};
