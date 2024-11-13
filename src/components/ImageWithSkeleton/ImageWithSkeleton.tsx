import React, { useState } from "react";
import { PhotoImage, Skeleton } from "./ImageWithSkeleton.styles";
import { PexelsPhotoSrc } from "../../api/pexelsApi/pexelsInterfaces";

interface ImageWithSkeletonProps {
  src: PexelsPhotoSrc;
  alt: string;
  height: number;
  top: number;
  avgColor?: string | undefined;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  height,
  top,
  avgColor,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Skeleton height={height} top={top} avgColor={avgColor || ""} />
      )}
      <picture>
        <source media="(min-width: 768px)" srcSet={src.large} />
        <PhotoImage
          src={src.medium}
          alt={alt}
          height={height}
          top={top}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? "none" : "block" }}
        />
      </picture>
    </>
  );
};

export default ImageWithSkeleton;
