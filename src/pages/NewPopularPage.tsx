import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetTrendingQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { APP_BAR_HEIGHT } from "src/constant";
import SliderRowForGenre from "src/components/VideoSlider";

const TRENDING_SECTIONS = [
  { name: "Trending Now", mediaType: "all", timeWindow: "day" },
  { name: "Worth the Wait", mediaType: "all", timeWindow: "week" },
  { name: "Top 10 TV Shows Today", mediaType: "tv", timeWindow: "day" },
  { name: "Top 10 Movies Today", mediaType: "movie", timeWindow: "day" },
];

function TrendingSlider({ name, mediaType, timeWindow }: { name: string; mediaType: string; timeWindow: string }) {
  const { data } = useGetTrendingQuery({ mediaType, timeWindow, page: 1 });

  if (!data || !data.results || data.results.length === 0) return null;

  return (
    <Box sx={{ px: { xs: "4%", md: "60px" }, py: 1 }}>

      <SliderRowForGenre
        genre={{ name, apiString: timeWindow === "day" ? "popular" : "top_rated" }}
        mediaType={mediaType === "tv" ? MEDIA_TYPE.Tv : MEDIA_TYPE.Movie}
      />
    </Box>
  );
}

export function Component() {
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
          New & Popular
        </Typography>
      </Box>

      {TRENDING_SECTIONS.map((section) => (
        <TrendingSlider
          key={section.name}
          name={section.name}
          mediaType={section.mediaType}
          timeWindow={section.timeWindow}
        />
      ))}
    </Stack>
  );
}

Component.displayName = "NewPopularPage";
