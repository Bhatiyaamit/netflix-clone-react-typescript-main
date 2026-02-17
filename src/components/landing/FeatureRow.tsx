import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TvIcon from "@mui/icons-material/Tv";
import DownloadIcon from "@mui/icons-material/Download";
import DevicesIcon from "@mui/icons-material/Devices";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useTranslation } from "react-i18next";

const featureKeys = [
  {
    titleKey: "features.enjoyTvTitle",
    descKey: "features.enjoyTvDesc",
    icon: <TvIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    titleKey: "features.downloadTitle",
    descKey: "features.downloadDesc",
    icon: <DownloadIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    titleKey: "features.watchEverywhereTitle",
    descKey: "features.watchEverywhereDesc",
    icon: <DevicesIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    titleKey: "features.kidsTitle",
    descKey: "features.kidsDesc",
    icon: <ChildCareIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
];

export default function FeatureRow() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6, lg: 20 }, bgcolor: "#000" }}>
      <Typography variant="h4" fontWeight="500" mb={3} color="#fff">
        {t("features.title")}
      </Typography>
      <Grid container spacing={2}>
        {featureKeys.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                background:
                  "linear-gradient(149deg, #192247 0%, #210e17 96.86%)",
                borderRadius: "16px",
                p: 3,
                height: "100%",
                minHeight: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="500" mb={1} color="#fff">
                  {t(feature.titleKey)}
                </Typography>
                <Typography variant="body2" color="#rgba(255,255,255,0.7)">
                  {t(feature.descKey)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                {feature.icon}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
