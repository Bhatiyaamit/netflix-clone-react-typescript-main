import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Genre } from "src/types/Genre";
import { APP_BAR_HEIGHT } from "src/constant";

interface CategoryHeaderProps {
  title: string;
  genres?: Genre[];
  selectedGenre?: string;
  onGenreChange?: (genreId: string) => void;
}

export default function CategoryHeader({
  title,
  genres,
  selectedGenre = "",
  onGenreChange,
}: CategoryHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pt: `${APP_BAR_HEIGHT + 20}px`,
        px: { xs: "4%", md: "60px" },
        pb: 1,
        position: "relative",
        zIndex: 10,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "2.2rem" },
          }}
        >
          {title}
        </Typography>

        {genres && genres.length > 0 && (
          <FormControl size="small">
            <Select
              value={selectedGenre}
              onChange={(e) => onGenreChange?.(e.target.value)}
              displayEmpty
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "4px",
                fontSize: "0.85rem",
                minWidth: 120,
                "& .MuiSelect-icon": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.9)",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "rgba(0,0,0,0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    maxHeight: 400,
                    "& .MuiMenuItem-root": {
                      color: "white",
                      fontSize: "0.85rem",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Genres</em>
              </MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
    </Box>
  );
}
