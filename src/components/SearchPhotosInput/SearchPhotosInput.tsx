import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { searchPhotos, setQuery } from "../../redux/gallerySlice/gallerySlice";
import { StyledSearchInput } from "./SearchPhotosInput.styles";

const SearchPhotosInput: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [query, setQueryInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setQuery(query));
      dispatch(searchPhotos({ params: {}, reset: true }));
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  };

  return (
    <StyledSearchInput
      type="text"
      placeholder="Search photos..."
      value={query}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchPhotosInput;
