import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchMultiQuery } from "src/store/slices/discover";
import { APP_BAR_HEIGHT } from "src/constant";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import { useTranslation } from "react-i18next";

export function Component() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { t } = useTranslation();

  const { data, isLoading, isFetching } = useSearchMultiQuery(
    { query, page: 1 },
    { skip: !query },
  );

  // Filter results to only movies and tv shows with backdrop images
  const results =
    data?.results?.filter(
      (item: any) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.backdrop_path,
    ) || [];

  return (
    <Stack direction="column">
      <Box
        sx={{
          pt: `${APP_BAR_HEIGHT + 30}px`,
          px: { xs: "4%", md: "60px" },
          pb: 4,
          minHeight: "80vh",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {query ? t("search.resultsFor", { query }) : t("search.title")}
        </Typography>

        {isLoading || isFetching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 12,
            }}
          >
            <CircularProgress sx={{ color: "red" }} />
          </Box>
        ) : !query ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 12,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                mb: 2,
              }}
            >
              {t("search.startTyping")}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1rem",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              {t("search.searchDescription")}
            </Typography>
          </Box>
        ) : results.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 12,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                mb: 2,
              }}
            >
              {t("search.noResults")}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1rem",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              {t("search.tryDifferent")}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {results.map((item: any) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={`${item.media_type}-${item.id}`}
                sx={{ zIndex: 1 }}
              >
                <VideoItemWithHover
                  video={{
                    id: item.id,
                    title: item.title || item.name || "",
                    original_title: item.title || item.name || "",
                    backdrop_path: item.backdrop_path || "",
                    poster_path: item.poster_path || "",
                    overview: item.overview || "",
                    genre_ids: item.genre_ids || [],
                    original_language: item.original_language || "",
                    popularity: item.popularity || 0,
                    release_date: item.release_date || "",
                    video: false,
                    vote_average: item.vote_average || 0,
                    vote_count: item.vote_count || 0,
                    adult: item.adult || false,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Stack>
  );
}

Component.displayName = "SearchPage";
