import { PexelsPhotoSrc } from "../../api/pexelsApi/pexelsInterfaces";

export interface ImageData {
    id: number;
    src: PexelsPhotoSrc;
    height: number;
    top: number;
    alt: string;
    avgColor: string;
  }

export interface PhotoCardProps {
    height: number;
    top: number;
}

export interface VirtualizedColumnProps {
    images: ImageData[];
    scrollTop: number;
    viewportHeight: number;
    height: number;
  }