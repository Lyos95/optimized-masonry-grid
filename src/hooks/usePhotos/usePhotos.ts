import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getPhotos,
  getStatus,
  searchPhotos,
} from "../../redux/gallerySlice/gallerySlice";
import { PexelsPhoto } from "../../api/pexelsApi/pexelsInterfaces";

export const usePhotos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photos = useSelector(getPhotos) as PexelsPhoto[];
  const status = useSelector(getStatus);
  
  const fetchPhotos = () => {
    if (status !== "pending") {
      dispatch(
        searchPhotos({
          reset: false,
          params: { per_page: 20 },
        })
      );
    }
  };

  return { photos, fetchPhotos };
};
