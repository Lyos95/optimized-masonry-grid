import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import axios from "axios";
import {
  fetchPhoto,
  fetchPexelPhotos,
  fetchPexelCuratedPhotos,
} from "./pexelsApi";
import {
  PexelsPhoto,
  PexelSearchApiParams,
  PexelSearchCuratedApiParams,
} from "./pexelsInterfaces";

vi.mock("axios");

const mockPhoto: PexelsPhoto = {
  id: 1,
  url: "https://example.com/photo1",
  photographer: "Photographer 1",
  src: {
    original: "https://example.com/photo1",
    large2x: "https://example.com/photo1_large2x",
    large: "https://example.com/photo1_large",
    medium: "https://example.com/photo1_medium",
    small: "https://example.com/photo1_small",
    portrait: "https://example.com/photo1_portrait",
    landscape: "https://example.com/photo1_landscape",
    tiny: "https://example.com/photo1_tiny",
  },
  width: 1000,
  height: 1000,
  photographer_url: "https://example.com/photographer1",
  avg_color: "#000000",
  liked: false,
  alt: "Photo 1",
  photographer_id: 0,
};

const mockPhotos: PexelsPhoto[] = [mockPhoto];

describe("Pexels API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchPexelPhotos should return photos for search", async () => {
    const params: PexelSearchApiParams = { query: "nature", per_page: 10 };
    (axios.get as Mock).mockResolvedValue({ data: { photos: mockPhotos } });

    const result = await fetchPexelPhotos(params);

    expect(axios.get).toHaveBeenCalledWith("https://api.pexels.com/v1/search", {
      headers: {
        Authorization:
          "1RIIywOsHlxfuklqTwMlJtIOpcnPIflFZXt6D7FEulnYuM8sLDmJphp5",
      },
      params,
    });
    expect(result).toEqual(mockPhotos);
  });

  it("fetchPexelCuratedPhotos should return curated photos", async () => {
    const params: PexelSearchCuratedApiParams = { per_page: 5 };
    (axios.get as Mock).mockResolvedValue({ data: { photos: mockPhotos } });

    const result = await fetchPexelCuratedPhotos(params);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.pexels.com/v1/curated",
      {
        headers: {
          Authorization:
            "1RIIywOsHlxfuklqTwMlJtIOpcnPIflFZXt6D7FEulnYuM8sLDmJphp5",
        },
        params,
      }
    );
    expect(result).toEqual(mockPhotos);
  });

  it("fetchPhoto should return a photo by ID", async () => {
    (axios.get as Mock).mockResolvedValue({ data: mockPhoto });

    const result = await fetchPhoto("1");

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.pexels.com/v1/photos/1",
      {
        headers: {
          Authorization:
            "1RIIywOsHlxfuklqTwMlJtIOpcnPIflFZXt6D7FEulnYuM8sLDmJphp5",
        },
      }
    );
    expect(result).toEqual(mockPhoto);
  });

  it("fetchPhoto should throw an error if the response is not ok", async () => {
    (axios.get as Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchPhoto("invalid-id")).rejects.toThrow(
      "Failed to fetch photo data."
    );
  });

  it("fetchPhotos should throw an error if axios request fails", async () => {
    (axios.get as Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchPexelPhotos({ query: "nature" })).rejects.toThrow(
      "Failed to fetch photos"
    );
  });
});
