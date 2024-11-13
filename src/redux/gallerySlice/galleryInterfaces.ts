import { PexelsPhoto } from "../../api/pexelsApi/pexelsInterfaces";

export interface PhotoSizes {
    landspace: string,
    large: string,
    large2x: string,
    medium: string,
    original: string,
    portrait: string,
    small: string,
    tiny: string
} 

export type GalleryStatus = 'idle' | 'pending' | 'succeeded' | 'failed'
export type GalleryError = string | null;

export interface GalleryState {
    error: GalleryError; 
    photos: PexelsPhoto[];
    status: GalleryStatus;
    page: number;
    query: string;
}