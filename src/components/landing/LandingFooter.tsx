import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

const FOOTER_LINK_KEYS = [
  "footer.faq",
  "footer.helpCentre",
  "footer.account",
  "footer.mediaCentre",
  "footer.investorRelations",
  "footer.jobs",
  "footer.waysToWatch",
  "footer.termsOfUse",
  "footer.privacy",
  "footer.cookiePreferences",
  "footer.corporateInformation",
  "footer.contactUs",
  "footer.speedTest",
  "footer.legalNotices",
  "footer.onlyOnNetflix",
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
        {FOOTER_LINK_KEYS.map((key) => (
          <Link
            key={key}
            href="#"
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
