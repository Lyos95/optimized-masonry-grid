import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PexelSearchApiParams, PexelSearchCuratedApiParams, PexelsPhoto } from "../../api/pexelsApi/pexelsInterfaces";
import { fetchPexelCuratedPhotos, fetchPexelPhotos } from "../../api/pexelsApi/pexelsApi";
import { RootState } from "../../redux/store";

import {
  GalleryError,
  GalleryState,
  GalleryStatus,
} from "./galleryInterfaces";

const initialState: GalleryState = {
  photos: [],
  status: "idle",
  error: null,
  page: 1,
  query: "",
};

export const fetchPhotosQuery = createAsyncThunk(
  "gallery/fetchPhotosQuery",
  async ({ params, reset }: { params: PexelSearchApiParams; reset: boolean }, { getState }) => {
    const state = getState() as RootState;
    const page = state.gallery.page;
    const query = state.gallery.query;
    const photosData = await fetchPexelPhotos({ ...params, query, page });

    return { photos: photosData, reset };
  }
);

export const fetchCuratedPhotos = createAsyncThunk(
  "gallery/fetchCuratedPhotos",
  async ({ params, reset }: { params: PexelSearchCuratedApiParams; reset: boolean }, { getState }) => {
    const state = getState() as RootState;
    const page = getPage(state);
    const photosData = await fetchPexelCuratedPhotos({ ...params, page });

    return { photos: photosData, reset };
  }
);

export const searchPhotos = createAsyncThunk(
  "photos/searchPhotos",
  async ({ params, reset }: { params: PexelSearchApiParams; reset: boolean }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const query = state.gallery.query;

    if (query) {
      return await dispatch(fetchPhotosQuery({ params: { ...params, query }, reset })).unwrap();
    } else {
      return await dispatch(fetchCuratedPhotos({ params, reset })).unwrap();
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    resetGalleryState: (state) => {
      state.photos = [];
      state.page = 1;
      state.status = "idle";
      state.error = null;
      state.query = ""; 
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.photos = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosQuery.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchPhotosQuery.fulfilled,
        (state, action: PayloadAction<{ photos: PexelsPhoto[]; reset: boolean }>) => {
          state.status = "succeeded";
          if (action.payload.reset) {
            state.photos = action.payload.photos; // Reset photos if it's a new search
          } else {
            state.photos = [...state.photos, ...action.payload.photos]; // Append photos for infinite scroll
          }
          state.page += 1;
        }
      )
      .addCase(fetchPhotosQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch photos";
      })
      .addCase(fetchCuratedPhotos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchCuratedPhotos.fulfilled,
        (state, action: PayloadAction<{ photos: PexelsPhoto[]; reset: boolean }>) => {
          state.status = "succeeded";
          if (action.payload.reset) {
            state.photos = action.payload.photos; // Reset photos if it's a new search
          } else {
            state.photos = [...state.photos, ...action.payload.photos]; // Append photos for infinite scroll
          }
          state.page += 1;
        }
      )
      .addCase(fetchCuratedPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch photos";
      });

      
  },
});

export const { resetGalleryState, setQuery } = gallerySlice.actions;

export const getPhotos = (state: RootState): PexelsPhoto[] => state.gallery.photos;
export const getPage = (state: RootState): number => state.gallery.page;
export const getStatus = (state: RootState): GalleryStatus => state.gallery.status;
export const getError = (state: RootState): GalleryError => state.gallery.error;
export const getQuery = (state: RootState): string => state.gallery.query;

export default gallerySlice.reducer;
