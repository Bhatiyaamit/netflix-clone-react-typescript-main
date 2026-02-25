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

const SOCIAL_LINKS = [
  {
    icon: <FacebookIcon />,
    label: "Facebook",
    url: "https://www.facebook.com/NetflixIN",
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    url: "https://www.instagram.com/netflix",
  },
  { icon: <TwitterIcon />, label: "Twitter", url: "https://x.com/netflix" },
  {
    icon: <YouTubeIcon />,
    label: "YouTube",
    url: "https://www.youtube.com/netflix",
  },
];

const FOOTER_LINKS = [
  {
    key: "signedInFooter.audioDescription",
    url: "https://www.netflix.com/accessibility",
  },
  { key: "signedInFooter.investorRelations", url: "https://ir.netflix.net" },
  {
    key: "signedInFooter.legalNotices",
    url: "https://www.netflix.com/legal/notices",
  },
  { key: "signedInFooter.helpCentre", url: "https://help.netflix.com" },
  { key: "signedInFooter.jobs", url: "https://jobs.netflix.com" },
  {
    key: "signedInFooter.cookiePreferences",
    url: "https://www.netflix.com/cookie-preferences",
  },
  {
    key: "signedInFooter.giftCards",
    url: "https://www.netflix.com/gift-cards",
  },
  {
    key: "signedInFooter.termsOfUse",
    url: "https://www.netflix.com/legal/termsofuse",
  },
  {
    key: "signedInFooter.corporateInformation",
    url: "https://www.netflix.com/legal/corpinfo",
  },
  { key: "signedInFooter.mediaCentre", url: "https://media.netflix.com" },
  { key: "signedInFooter.privacy", url: "https://www.netflix.com/privacy" },
  {
    key: "signedInFooter.contactUs",
    url: "https://help.netflix.com/contactus",
  },
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
        {SOCIAL_LINKS.map(({ icon, label, url }) => (
          <IconButton
            key={label}
            aria-label={label}
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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
        {FOOTER_LINKS.map(({ key, url }) => (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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
