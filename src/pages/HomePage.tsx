import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";
// import { colors } from "@mui/material";
// import { green, yellow } from "@mui/material/colors";

export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}
export function Component() {
  const { data: genres, isSuccess } = useGetGenresQuery(MEDIA_TYPE.Movie);

  if (isSuccess && genres && genres.length > 0) {
    return (
      <Stack direction="column" spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
          // <div key={genre.id || genre.name} style={{ backgroundColor: yellow[200], padding: "10px", margin: "10px 0" }}>{genre.name} Section</div>
        ))}
      </Stack>
    );
  }
  return null;
}

Component.displayName = "HomePage";
