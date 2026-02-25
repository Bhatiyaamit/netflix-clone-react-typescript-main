import Box from "@mui/material/Box";
import LandingHero from "src/components/landing/LandingHero";
import FeatureRow from "src/components/landing/FeatureRow";
import FAQSection from "src/components/landing/FAQSection";
import LandingFooter from "src/components/landing/LandingFooter";
import Trending from "src/components/landing/Trending";

export function Component() {
  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
      <LandingHero />
      <Trending />
      <FeatureRow />
      <FAQSection />
      <LandingFooter />
    </Box>
  );
}

Component.displayName = "LandingPage";
