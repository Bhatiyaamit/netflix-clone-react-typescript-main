import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";

export default function LandingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000",
        color: "#b3b3b3",
        px: { xs: 2, md: 6, lg: 20 },
        py: 8,
        borderTop: "8px solid #232323",
      }}
    >
      <Typography mb={3}>Questions? Call 000-800-919-1694</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
          fontSize: "0.85rem",
          mb: 4,
        }}
      >
        {[
          "FAQ",
          "Help Centre",
          "Account",
          "Media Centre",
          "Investor Relations",
          "Jobs",
          "Ways to Watch",
          "Terms of Use",
          "Privacy",
          "Cookie Preferences",
          "Corporate Information",
          "Contact Us",
          "Speed Test",
          "Legal Notices",
          "Only on Netflix",
        ].map((linkText) => (
          <Link
            key={linkText}
            href="#"
            underline="hover"
            sx={{
              color: "#b3b3b3",
              "&:hover": { color: "#b3b3b3" },
            }}
          >
            {linkText}
          </Link>
        ))}
      </Box>

      <Select
        value="en"
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <LanguageIcon fontSize="small" sx={{ color: "#999" }} />
          </InputAdornment>
        }
        sx={{
          color: "#999",
          borderColor: "#333",
          fontSize: "0.8rem",
          mb: 3,
          ".MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          ".MuiSvgIcon-root": { color: "#999" },
          minWidth: 120,
        }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hi">Hindi</MenuItem>
      </Select>

      <Typography fontSize="0.8rem">Netflix India</Typography>
    </Box>
  );
}
