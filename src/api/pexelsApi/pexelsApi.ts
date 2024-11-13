import axios from "axios";

import { PexelSearchApiParams, PexelSearchCuratedApiParams, PexelsPhoto, PexelsResponse } from "./pexelsInterfaces";

const BASE_URL = "https://api.pexels.com/v1/search";
const BASE_URL_CURATED = "https://api.pexels.com/v1/curated";
const BASE_URL_PHOTO = "https://api.pexels.com/v1/photos";

const fetchPhotos = async (url: string, params: object): Promise<PexelsPhoto[]> => {
  try {
    const response = await axios.get<PexelsResponse>(url, {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
      params,
    });
    return response.data.photos;
  } catch (error) {
    throw new Error("Failed to fetch photos");
  }
};

export const fetchPhoto = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL_PHOTO}/${id}`, {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch photo data.");
  }
};

export const fetchPexelPhotos = async (params: PexelSearchApiParams): Promise<PexelsPhoto[]> => {
  return fetchPhotos(BASE_URL, params);
};

export const fetchPexelCuratedPhotos = async (params: PexelSearchCuratedApiParams): Promise<PexelsPhoto[]> => {
  return fetchPhotos(BASE_URL_CURATED, params);
};