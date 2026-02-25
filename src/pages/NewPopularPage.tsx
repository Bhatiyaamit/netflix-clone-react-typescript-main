import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetTrendingQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { APP_BAR_HEIGHT } from "src/constant";
import SliderRowForGenre from "src/components/VideoSlider";
import { useTranslation } from "react-i18next";

const TRENDING_SECTION_KEYS = [
  { key: "newPopular.trendingNow", mediaType: "all", timeWindow: "day" },
  { key: "newPopular.worthTheWait", mediaType: "all", timeWindow: "week" },
  { key: "newPopular.topTvShows", mediaType: "tv", timeWindow: "day" },
  { key: "newPopular.topMovies", mediaType: "movie", timeWindow: "day" },
];

function TrendingSlider({
  nameKey,
  mediaType,
  timeWindow,
}: {
  nameKey: string;
  mediaType: string;
  timeWindow: string;
}) {
  const { data } = useGetTrendingQuery({ mediaType, timeWindow, page: 1 });
  const { t } = useTranslation();

  if (!data || !data.results || data.results.length === 0) return null;

  return (
    <Box sx={{ px: { xs: "4%", md: "60px" }, py: 1 }}>
      <SliderRowForGenre
        genre={{
          name: t(nameKey),
          apiString: timeWindow === "day" ? "popular" : "top_rated",
        }}
        mediaType={mediaType === "tv" ? MEDIA_TYPE.Tv : MEDIA_TYPE.Movie}
      />
    </Box>
  );
}

export function Component() {
  const { t } = useTranslation();

  return (
    <Stack direction="column" spacing={3}>
      <Box
        sx={{
          pt: `${APP_BAR_HEIGHT + 30}px`,
          px: { xs: "4%", md: "60px" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {t("newPopular.title")}
        </Typography>
      </Box>

      {TRENDING_SECTION_KEYS.map((section) => (
        <TrendingSlider
          key={section.key}
          nameKey={section.key}
          mediaType={section.mediaType}
          timeWindow={section.timeWindow}
        />
      ))}
    </Stack>
  );
}

Component.displayName = "NewPopularPage";
