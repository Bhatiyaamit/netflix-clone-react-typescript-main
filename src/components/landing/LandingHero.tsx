import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "700px",
        height: "100vh",
        position: "relative",
        backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('/assets/signin-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderBottom: "8px solid #232323",
        display: "flex",
        flexDirection: "column",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 1,
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: { xs: 2, md: 6, lg: 20 },
          py: 3,
          zIndex: 10,
        }}
      >
        <Box
          component="img"
          src="/assets/netflix-logo.png"
          alt="Netflix"
          sx={{
            height: { xs: 24, md: 40 },
            width: "auto",
          }}
        />
        <Stack direction="row" spacing={2}>
          <Select
            value="en"
            size="small"
            variant="outlined"
            startAdornment={
              <InputAdornment position="start">
                <LanguageIcon fontSize="small" sx={{ color: "#fff" }} />
              </InputAdornment>
            }
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
              ".MuiSvgIcon-root": { color: "white" },
              height: "32px",
              minWidth: "120px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={() => navigate(`/${MAIN_PATH.signin}`)}
            sx={{
              bgcolor: "#e50914",
              color: "#fff",
              fontWeight: "500",
              textTransform: "none",
              px: 2,
              height: "32px",
              "&:hover": { bgcolor: "#f40612" },
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Stack>

      {/* Hero Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
          px: 2,
          pb: 8,
          color: "#fff",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
            fontWeight: 900,
            mb: 2,
            maxWidth: "800px",
          }}
        >
          Unlimited movies, shows, and more
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.125rem", md: "1.5rem" },
            fontWeight: 400,
            mb: 3,
          }}
        >
          Starts at ₹149. Cancel at any time.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.125rem", md: "1.25rem" },
            fontWeight: 400,
            mb: 2,
          }}
        >
          Ready to watch? Enter your email to create or restart your membership.
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
          sx={{ width: "100%", maxWidth: "600px", mt: 2 }}
        >
          <TextField
            variant="filled"
            label="Email address"
            fullWidth
            InputLabelProps={{
              style: { color: "#b3b3b3" },
            }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "rgba(22, 22, 22, 0.7)" },
              disableUnderline: true,
            }}
            sx={{
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
              fontSize: "1.25rem",
              textTransform: "none",
              px: 4,
              minWidth: "200px",
              height: "56px",
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
