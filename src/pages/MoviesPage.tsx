import { useState } from "react";
import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import CategoryHeader from "src/components/CategoryHeader";
import GridPage from "src/components/GridPage";
import store from "src/store";

export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}

export function Component() {
  const { data: genres, isSuccess } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  if (isSuccess && genres && genres.length > 0) {
    if (selectedGenre && viewMode === "grid") {
      const genre = genres.find((g) => g.id.toString() === selectedGenre);
      if (genre) {
        return (
          <Stack direction="column">
            <CategoryHeader
              title="Movies"
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={handleGenreChange}
              showViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />
          </Stack>
        );
      }
    }

    return (
      <Stack direction="column" spacing={2}>
        <CategoryHeader
          title="Movies"
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          showViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {selectedGenre
          ? genres
              .filter((g) => g.id.toString() === selectedGenre)
              .map((genre: Genre) => (
                <SliderRowForGenre
                  key={genre.id}
                  genre={genre}
                  mediaType={MEDIA_TYPE.Movie}
                />
              ))
          : [...COMMON_TITLES, ...genres].map(
              (genre: Genre | CustomGenre) => (
                <SliderRowForGenre
                  key={genre.id || genre.name}
                  genre={genre}
                  mediaType={MEDIA_TYPE.Movie}
                />
              )
            )}
      </Stack>
    );
  }
  return null;
}

Component.displayName = "MoviesPage";
