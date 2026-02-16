import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const footerLinks = [
  ["Audio Description", "Investor Relations", "Legal Notices"],
  ["Help Centre", "Jobs", "Cookie Preferences"],
  ["Gift Cards", "Terms of Use", "Corporate Information"],
  ["Media Centre", "Privacy", "Contact Us"],
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "inherit",
        px: { xs: "30px", md: "60px" },
        pt: 6,
        pb: 4,
      }}
    >
      {/* Social Media Icons */}
      <Stack direction="row" spacing={2.5} sx={{ mb: 3 }}>
        {[
          { icon: <FacebookIcon />, label: "Facebook" },
          { icon: <InstagramIcon />, label: "Instagram" },
          { icon: <TwitterIcon />, label: "Twitter" },
          { icon: <YouTubeIcon />, label: "YouTube" },
        ].map(({ icon, label }) => (
          <IconButton
            key={label}
            aria-label={label}
            sx={{
              color: "white",
              p: 0,
              "&:hover": { color: "grey.400" },
              "& .MuiSvgIcon-root": { fontSize: 28 },
            }}
          >
            {icon}
          </IconButton>
        ))}
      </Stack>

      {/* Footer Links Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 1.5,
          mb: 3,
        }}
      >
        {footerLinks.flat().map((linkText) => (
          <Link
            key={linkText}
            href="#"
            underline="hover"
            sx={{
              color: "grey.500",
              fontSize: "13px",
              "&:hover": { color: "grey.300" },
            }}
          >
            {linkText}
          </Link>
        ))}
      </Box>

      {/* Copyright */}
      <Typography
        sx={{
          color: "grey.600",
          fontSize: "12px",
          mt: 1,
        }}
      >
        © 1997-2026 Netflix, Inc.
      </Typography>
    </Box>
  );
}
