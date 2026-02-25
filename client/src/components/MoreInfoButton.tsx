import Button, { ButtonProps } from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function MoreInfoButton({ sx, ...others }: ButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={
        <InfoOutlinedIcon
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
        px: { xs: 1.5, sm: 3 },
        py: { xs: 0.5, sm: 1 },
        fontSize: { xs: 12, sm: 18, md: 20 },
        fontWeight: 600,
        borderRadius: "4px",
        backgroundColor: "rgba(109, 109, 110, 0.7)",
        color: "#ffffff",
        textTransform: "none",
        whiteSpace: "nowrap",
        "&:hover": {
          backgroundColor: "rgba(109, 109, 110, 0.5)",
        },
        ...sx,
      }}
    >
      More Info
    </Button>
  );
}
