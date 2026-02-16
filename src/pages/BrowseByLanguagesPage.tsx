import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { useGetLanguagesQuery } from "src/store/slices/configuration";
import { useGetDiscoverByLanguageQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { APP_BAR_HEIGHT } from "src/constant";
import VideoItemWithHover from "src/components/VideoItemWithHover";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Suggestions For You" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "release_date.desc", label: "Year Released" },
  { value: "original_title.asc", label: "A-Z" },
  { value: "original_title.desc", label: "Z-A" },
];

export function Component() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const { data: languages } = useGetLanguagesQuery();
  const { data: movies } = useGetDiscoverByLanguageQuery({
    mediaType: MEDIA_TYPE.Movie,
    language: selectedLanguage,
    sortBy,
    page: 1,
  });

  const sortedLanguages = useMemo(() => {
    if (!languages) return [];
    return [...languages]
      .filter((l) => l.english_name)
      .sort((a, b) => a.english_name.localeCompare(b.english_name));
  }, [languages]);

  const currentLanguageName = useMemo(() => {
    const lang = sortedLanguages.find((l) => l.iso_639_1 === selectedLanguage);
    return lang?.english_name || "English";
  }, [sortedLanguages, selectedLanguage]);

  return (
    <Stack direction="column">
      <Box
        sx={{
          pt: `${APP_BAR_HEIGHT + 20}px`,
          px: { xs: "4%", md: "60px" },
          pb: 4,
          minHeight: "80vh",
        }}
      >
        {/* Header Row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2.2rem" },
            }}
          >
            Browse by Languages
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.9rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              Select Your Preferences
            </Typography>

            {/* Language Selector */}
            <FormControl size="small" sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  minWidth: { xs: "100%", sm: 160 },
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(0,0,0,0.95)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      maxHeight: 350,
                      "& .MuiMenuItem-root": {
                        color: "white",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                      },
                    },
                  },
                }}
                renderValue={() => currentLanguageName}
              >
                {sortedLanguages.map((lang) => (
                  <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                    {lang.english_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort Selector */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                Sort by
              </Typography>
              <FormControl size="small" sx={{ flexGrow: 1, minWidth: { sm: 160 } }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.7)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    "& .MuiSelect-icon": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "rgba(0,0,0,0.95)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        "& .MuiMenuItem-root": {
                          color: "white",
                          fontSize: "0.85rem",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                        },
                      },
                    },
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>

        {/* Grid of results */}
        {movies && movies.results && (
          <Grid container spacing={2}>
            {movies.results
              .filter((m) => m.backdrop_path)
              .map((movie, idx) => (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={2}
                  key={`${movie.id}_${idx}`}
                  sx={{ zIndex: 1 }}
                >
                  <VideoItemWithHover video={movie} />
                </Grid>
              ))}
          </Grid>
        )}

        {movies && movies.results && movies.results.length === 0 && (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem" }}>
              No results found for the selected language.
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

Component.displayName = "BrowseByLanguagesPage";
