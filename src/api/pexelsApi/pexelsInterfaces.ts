// Documentation: https://www.pexels.com/api/documentation/#photos-search

export interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  width: number;
  height: number;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  alt: string;
  url: string;
  liked: boolean;
}

interface PexelApiBaseParams {
  orientation?: PexelsOrientation;
  size?: PexelsSize;
  color?: PexelsColor;
  locale?: PexelsLocale;
  page?: number;
  per_page?: number;
}

export interface PexelSearchApiParams extends PexelApiBaseParams {
  query?: string;
}

export interface PexelSearchCuratedApiParams extends PexelApiBaseParams {}

export interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
  next_page: string;
}

export type PexelsLocale =
  | "en-US"
  | "pt-BR"
  | "es-ES"
  | "ca-ES"
  | "de-DE"
  | "it-IT"
  | "fr-FR"
  | "sv-SE"
  | "id-ID"
  | "pl-PL"
  | "ja-JP"
  | "zh-TW"
  | "zh-CN"
  | "ko-KR"
  | "th-TH"
  | "nl-NL"
  | "hu-HU"
  | "vi-VN"
  | "cs-CZ"
  | "da-DK"
  | "fi-FI"
  | "uk-UA"
  | "el-GR"
  | "ro-RO"
  | "nb-NO"
  | "sk-SK"
  | "tr-TR"
  | "ru-RU";

export type PexelsColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "turquoise"
  | "blue"
  | "violet"
  | "pink"
  | "brown"
  | "black"
  | "gray"
  | "white"
  | `#${string}`; // Allows for any valid hex color code, such as #ffffff

export type PexelsSize =
  | "large" //24MP
  | "medium" // 12MP
  | "small"; // 4MP

export type PexelsOrientation = "landscape" | "portrait" | "square";
