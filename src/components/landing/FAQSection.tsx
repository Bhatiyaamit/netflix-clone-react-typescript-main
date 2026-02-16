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

const faqs = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.",
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "Is Netflix good for kids?",
    answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

export default function FAQSection() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6, lg: 20 }, bgcolor: "#000", color: "#fff" }}>
      <Typography variant="h4" fontWeight="500" mb={3}>
        Frequently Asked Questions
      </Typography>

      <Box sx={{ mb: 6 }}>
        {faqs.map((faq, index) => (
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
                {faq.question}
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
              <Typography variant="h6" fontWeight="400" sx={{ whiteSpace: "pre-line" }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", pt: 4 }}>
        <Typography variant="h6" fontWeight="400" mb={2}>
          Ready to watch? Enter your email to create or restart your membership.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
             variant="filled"
            label="Email address"
            InputLabelProps={{
              style: { color: "#b3b3b3" },
            }}
            InputProps={{
               style: { color: "#fff", backgroundColor: "rgba(22, 22, 22, 0.7)" },
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
                "&.Mui-focused": { backgroundColor: "rgba(22, 22, 22, 0.7)", border: "1px solid #fff" },
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
            Get Started
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
