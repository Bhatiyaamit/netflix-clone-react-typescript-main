import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const FOOTER_LINKS = [
  { key: "footer.faq", url: "https://help.netflix.com" },
  { key: "footer.helpCentre", url: "https://help.netflix.com" },
  { key: "footer.account", url: "https://www.netflix.com/youraccount" },
  { key: "footer.mediaCentre", url: "https://media.netflix.com" },
  { key: "footer.investorRelations", url: "https://ir.netflix.net" },
  { key: "footer.jobs", url: "https://jobs.netflix.com" },
  { key: "footer.waysToWatch", url: "https://www.netflix.com/watch" },
  { key: "footer.termsOfUse", url: "https://www.netflix.com/legal/termsofuse" },
  { key: "footer.privacy", url: "https://www.netflix.com/privacy" },
  {
    key: "footer.cookiePreferences",
    url: "https://www.netflix.com/cookie-preferences",
  },
  {
    key: "footer.corporateInformation",
    url: "https://www.netflix.com/legal/corpinfo",
  },
  { key: "footer.contactUs", url: "https://help.netflix.com/contactus" },
  { key: "footer.speedTest", url: "https://fast.com" },
  { key: "footer.legalNotices", url: "https://www.netflix.com/legal/notices" },
  {
    key: "footer.onlyOnNetflix",
    url: "https://www.netflix.com/browse/genre/839338",
  },
] as const;

export default function LandingFooter() {
  const { t, i18n } = useTranslation();

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
      <Typography mb={3}>{t("footer.questionsCall")}</Typography>
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
        {FOOTER_LINKS.map(({ key, url }) => (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              color: "#b3b3b3",
              "&:hover": { color: "#b3b3b3" },
            }}
          >
            {t(key)}
          </Link>
        ))}
      </Box>

      <Select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
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
        <MenuItem value="en">{t("common.english")}</MenuItem>
        <MenuItem value="hi">{t("common.hindi")}</MenuItem>
      </Select>

      <Typography fontSize="0.8rem">{t("common.netflixIndia")}</Typography>
    </Box>
  );
}
