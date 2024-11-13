import React from "react";
import { Column } from "./VirtualizedColumn.styles";
import { VirtualizedColumnProps } from "./virtualizedColumnInterfaces";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../ImageWithSkeleton/ImageWithSkeleton";

const VirtualizedColumn: React.FC<VirtualizedColumnProps> = React.memo(
  ({ images, scrollTop, viewportHeight, height }) => {
    const buffer = viewportHeight;
    const startPosition = scrollTop - buffer;
    const endPosition = scrollTop + viewportHeight + buffer;

    const visibleImages = React.useMemo(() => {
      return images.filter((image) => {
        const imageBottom = image.top + image.height;
        return imageBottom >= startPosition && image.top <= endPosition;
      });
    }, [images, startPosition, endPosition]);

    return (
      <Column style={{ height }}>
        {visibleImages.map((image) => (
          <Link to={`/photo/${image.id}`} key={image.id} aria-label={`View details for ${image.alt}`}>
            <ImageWithSkeleton
              src={image.src}
              alt={image.alt}
              height={image.height}
              top={image.top}
              avgColor = {image.avgColor}
            />
          </Link>
        ))}
      </Column>
    );
  }
);

export default VirtualizedColumn;
