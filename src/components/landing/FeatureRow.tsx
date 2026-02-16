import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TvIcon from "@mui/icons-material/Tv";
import DownloadIcon from "@mui/icons-material/Download";
import DevicesIcon from "@mui/icons-material/Devices";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const features = [
  {
    title: "Enjoy on your TV",
    description: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: <TvIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    title: "Download your shows to watch offline",
    description: "Save your favourites easily and always have something to watch.",
    icon: <DownloadIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    title: "Watch everywhere",
    description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: <DevicesIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
  {
    title: "Create profiles for kids",
    description: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    icon: <ChildCareIcon sx={{ fontSize: 64, color: "#e50914" }} />,
  },
];

export default function FeatureRow() {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6, lg: 20 }, bgcolor: "#000" }}>
      <Typography variant="h4" fontWeight="500" mb={3} color="#fff">
        More reasons to join
      </Typography>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                background: "linear-gradient(149deg, #192247 0%, #210e17 96.86%)",
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
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="#rgba(255,255,255,0.7)">
                  {feature.description}
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
