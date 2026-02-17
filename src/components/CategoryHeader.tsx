import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Genre } from "src/types/Genre";
import { APP_BAR_HEIGHT } from "src/constant";
import useOffSetTop from "src/hooks/useOffSetTop";

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
  const isScrolled = useOffSetTop(80);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pt: `${APP_BAR_HEIGHT + 8}px`,
        px: { xs: "4%", md: "60px" },
        pb: 0.5,
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: isScrolled ? "#141414" : "transparent",
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.5)" : "none",
        transition: "background-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.2rem", md: "1.6rem" },
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
                fontSize: "0.8rem",
                minWidth: 100,
                height: 32,
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
