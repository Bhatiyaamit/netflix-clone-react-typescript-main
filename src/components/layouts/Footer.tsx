import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "react-i18next";

const FOOTER_LINK_KEYS = [
  "signedInFooter.audioDescription",
  "signedInFooter.investorRelations",
  "signedInFooter.legalNotices",
  "signedInFooter.helpCentre",
  "signedInFooter.jobs",
  "signedInFooter.cookiePreferences",
  "signedInFooter.giftCards",
  "signedInFooter.termsOfUse",
  "signedInFooter.corporateInformation",
  "signedInFooter.mediaCentre",
  "signedInFooter.privacy",
  "signedInFooter.contactUs",
] as const;

export default function Footer() {
  const { t } = useTranslation();

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
        {FOOTER_LINK_KEYS.map((key) => (
          <Link
            key={key}
            href="#"
            underline="hover"
            sx={{
              color: "grey.500",
              fontSize: "13px",
              "&:hover": { color: "grey.300" },
            }}
          >
            {t(key)}
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
