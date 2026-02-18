import { CustomGenre } from "src/types/Genre";

export const API_ENDPOINT_URL = import.meta.env.VITE_APP_API_ENDPOINT_URL;
export const TMDB_V3_API_KEY = import.meta.env.VITE_APP_TMDB_V3_API_KEY;

export const MAIN_PATH = {
  root: "",
  browse: "browse",
  genreExplore: "genre",
  watch: "watch",
  shows: "shows",
  movies: "movies",
  newPopular: "new-popular",
  myList: "my-list",
  browseByLanguages: "browse-by-languages",
  search: "search",
  manageProfiles: "manage-profiles",
  signin: "signin",
};

export const ARROW_MAX_WIDTH = 60;
export const COMMON_TITLES: CustomGenre[] = [
  { name: "Popular", apiString: "popular" },
  { name: "Top Rated", apiString: "top_rated" },
  { name: "Now Playing", apiString: "now_playing" },
  { name: "Upcoming", apiString: "upcoming" },
];

export const COMMON_TITLES_TV: CustomGenre[] = [
  { name: "Popular", apiString: "popular" },
  { name: "Top Rated", apiString: "top_rated" },
  { name: "Airing Today", apiString: "airing_today" },
  { name: "On The Air", apiString: "on_the_air" },
];

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
export const APP_BAR_HEIGHT = 50;

export const INITIAL_DETAIL_STATE = {
  id: undefined,
  mediaType: undefined,
  mediaDetail: undefined,
};
export const GOOGLE_CLIENT_ID =
  "881240855246-23s85i5kahm19qbrjtg1vmiockucqp8f.apps.googleusercontent.com";
