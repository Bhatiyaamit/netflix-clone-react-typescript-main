import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { selectMyList } from "src/store/slices/myList";
import { APP_BAR_HEIGHT } from "src/constant";
import VideoItemWithHover from "src/components/VideoItemWithHover";

export function Component() {
  const myList = useSelector(selectMyList);

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
          My List
        </Typography>

        {myList.length === 0 ? (
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
              Your list is empty
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1rem",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              Add movies and TV shows to your list so you can easily find them
              later.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {myList.map((item) => (
              <Grid
                item
                xs={6}
                sm={3}
                md={2}
                key={`${item.mediaType}-${item.id}`}
                sx={{ zIndex: 1 }}
              >
                <VideoItemWithHover
                  video={{
                    id: item.id,
                    title: item.title,
                    backdrop_path: item.backdrop_path || "",
                    overview: "",
                    poster_path: item.poster_path || "",
                    genre_ids: [],
                    original_language: "",
                    original_title: item.title,
                    popularity: 0,
                    release_date: "",
                    video: false,
                    vote_average: 0,
                    vote_count: 0,
                    adult: false,
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

Component.displayName = "MyListPage";
