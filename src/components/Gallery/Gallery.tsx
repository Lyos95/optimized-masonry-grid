import React from 'react';
import { GalleryContainer, GalleryColumnsContainer } from './Gallery.styles';
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import useScrollPosition from '../../hooks/useScrollPosition';
import useViewportSize from '../../hooks/useViewportSize';
import VirtualizedColumn from '../VirtualizedColumn/VirtualizedColumn';
import { useResponsiveColumns } from '../../hooks/useResponsiveColumns';
import { useGallery } from '../../hooks/useGallery';
import { usePhotos } from '../../hooks/usePhotos/usePhotos';

const GALLERY_PADDING = 100;
const GAP_SIZE = 20;
const ITEM_GAP = 40;

const Gallery: React.FC = () => {
  const { photos, fetchPhotos } = usePhotos();
  const { galleryRef, columnCount, columnWidth } = useResponsiveColumns({
    galleryPadding: GALLERY_PADDING,
    gapSize: GAP_SIZE,
  }); 
  const scrollTop = useScrollPosition();
  const viewportHeight = useViewportSize();
  const gallery = useGallery({
    photos,
    columnCount,
    columnWidth,
    itemGap: ITEM_GAP,
  });
  
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: fetchPhotos
  });

  return (
    <GalleryContainer ref={galleryRef}>
      <GalleryColumnsContainer>
        {gallery.map((column, index) => {
          const totalHeight =
            column.length > 0
              ? column[column.length - 1].top +
                column[column.length - 1].height
              : 0;
          return (
              <VirtualizedColumn
                key={index}
                height={totalHeight}
                images={column}
                scrollTop={scrollTop}
                viewportHeight={viewportHeight}
              />
          );
        })}
      </GalleryColumnsContainer>
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </GalleryContainer>
  );
};

export default Gallery;
