import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";

const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];

export default function FAQSection() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { t } = useTranslation();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6, lg: 20 },
        bgcolor: "#000",
        color: "#fff",
      }}
    >
      <Typography variant="h4" fontWeight="500" mb={3}>
        {t("faq.title")}
      </Typography>

      <Box sx={{ mb: 6 }}>
        {FAQ_KEYS.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              bgcolor: "#2d2d2d",
              color: "#fff",
              mb: 1,
              "&:before": { display: "none" },
              "&.Mui-expanded": { margin: "0 0 8px 0" },
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon sx={{ color: "#fff", fontSize: 36 }} />}
              sx={{
                px: 3,
                py: 1,
                "& .MuiAccordionSummary-content": { my: 2 },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(45deg)",
                },
                "&:hover": { bgcolor: "#414141" },
              }}
            >
              <Typography variant="h5" fontWeight="400">
                {t(faq.q)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: 3,
                py: 3,
                borderTop: "1px solid #000",
                bgcolor: "#2d2d2d",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                sx={{ whiteSpace: "pre-line" }}
              >
                {t(faq.a)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", pt: 4 }}>
        <Typography variant="h6" fontWeight="400" mb={2}>
          {t("hero.cta")}
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            variant="filled"
            label={t("hero.emailLabel")}
            InputLabelProps={{
              style: { color: "#b3b3b3" },
            }}
            InputProps={{
              style: {
                color: "#fff",
                backgroundColor: "rgba(22, 22, 22, 0.7)",
              },
              disableUnderline: true,
            }}
            sx={{
              width: { xs: "100%", md: "400px" },
              "& .MuiFilledInput-root": {
                borderRadius: "4px",
                border: "1px solid rgba(128, 128, 128, 0.7)",
                backgroundColor: "rgba(22, 22, 22, 0.7)",
                height: "56px",
                "&:hover": { backgroundColor: "rgba(22, 22, 22, 0.7)" },
                "&.Mui-focused": {
                  backgroundColor: "rgba(22, 22, 22, 0.7)",
                  border: "1px solid #fff",
                },
              },
            }}
          />
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon fontSize="small" />}
            sx={{
              bgcolor: "#e50914",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.5rem",
              textTransform: "none",
              px: 4,
              height: "56px",
              minWidth: "200px",
              "&:hover": { bgcolor: "#f40612" },
            }}
          >
            {t("hero.getStarted")}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
