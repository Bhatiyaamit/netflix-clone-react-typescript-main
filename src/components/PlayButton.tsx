import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function PlayButton({ sx, ...others }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      startIcon={
        <PlayArrowIcon
          sx={{
            fontSize: {
              xs: 16,
              sm: 24,
              md: 28,
            },
          }}
        />
      }
      {...others}
      sx={{
        px: { xs: 1.5, sm: 4.5 },
        py: { xs: 0.5, sm: 1 },
        fontSize: { xs: 12, sm: 18, md: 20 },
        fontWeight: 600,
        borderRadius: "4px",
        backgroundColor: "#ffffff",
        color: "#000000",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#e6e6e6",
        },
        ...sx,
      }}
      onClick={() => navigate(`/${MAIN_PATH.watch}`)}
    >
      Play
    </Button>
  );
}
