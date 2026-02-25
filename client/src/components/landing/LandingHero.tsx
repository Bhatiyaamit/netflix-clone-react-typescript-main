import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { authAPI } from "src/services/authAPI";
import Alert from "@mui/material/Alert";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";

export default function LandingHero() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("=== Google Login Flow ===");
        console.log("Step 1: Fetching user info from Google...");

        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );

        console.log("Step 2: User info received:", userInfo.data);

        // Persist user info to localStorage
        if (userInfo.data.picture) {
          localStorage.setItem("userPicture", userInfo.data.picture);
          console.log("✓ User picture saved");
        }
        if (userInfo.data.name) {
          localStorage.setItem("userName", userInfo.data.name);
          console.log("✓ User name saved");
        }
        if (userInfo.data.email) {
          localStorage.setItem("userEmail", userInfo.data.email);
          console.log("✓ User email saved");
        }

        setError("");
        console.log("Step 3: Redirecting to browse page...");

        // Use window.location.href to ensure the redirect works
        setTimeout(() => {
          window.location.href = `/${MAIN_PATH.browse}`;
        }, 300);
      } catch (err: any) {
        console.error("✗ Google login error:", err);
        setError("Failed to sign in with Google. Please try again.");
      }
    },
    onError: () => {
      console.log("✗ Google Login Failed - User cancelled or error occurred");
      setError("Failed to sign in with Google. Please try again.");
    },
  });

  const handleGetStarted = async () => {
    setError("");

    if (!email) {
      setError(t("hero.emailRequired") || "Please enter an email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("hero.invalidEmail") || "Please enter a valid email");
      return;
    }

    setLoading(true);
    console.log("=== Get Started Flow ===");
    console.log("Email entered:", email);

    try {
      // Step 1: Check if user exists
      console.log("Step 1: Checking if user exists...");
      const userCheckResponse = await authAPI.checkUserExists(email);
      console.log("User exists response:", userCheckResponse);

      if (!userCheckResponse.exists) {
        // User doesn't exist, redirect to signup with email
        console.log("✓ User does NOT exist. Redirecting to signup...");
        setTimeout(() => {
          window.location.href = `/${MAIN_PATH.signup}?email=${encodeURIComponent(email)}`;
        }, 200);
        return;
      }

      // Step 2: User exists, check for valid token/cookie
      console.log("Step 2: User exists. Checking for valid token...");
      try {
        const tokenResponse = await authAPI.verifyToken();
        console.log("Token verification response:", tokenResponse);

        if (tokenResponse.valid) {
          // Token is valid, save auth data and redirect to browse
          console.log("✓ Valid token found. Saving auth data...");
          if (tokenResponse.user && tokenResponse.token) {
            authAPI.setAuthData(tokenResponse.token, tokenResponse.user);
          }
          console.log("✓ Redirecting to browse...");
          setTimeout(() => {
            window.location.href = `/${MAIN_PATH.browse}`;
          }, 200);
          return;
        } else {
          // User exists but no valid token, redirect to signin
          console.log("✗ No valid token found. Redirecting to signin...");
          setTimeout(() => {
            window.location.href = `/${MAIN_PATH.signin}?email=${encodeURIComponent(email)}`;
          }, 200);
          return;
        }
      } catch (tokenErr: any) {
        // Error verifying token, redirect to signin
        console.log("✗ Token verification error:", tokenErr.message);
        setTimeout(() => {
          window.location.href = `/${MAIN_PATH.signin}?email=${encodeURIComponent(email)}`;
        }, 200);
        return;
      }
    } catch (err: any) {
      console.error("Get started error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "700px",
        height: "100vh",
        position: "relative",
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('/assets/signin-bg.png')",
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
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
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
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              ".MuiSvgIcon-root": { color: "white" },
              height: "32px",
              minWidth: "120px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <MenuItem value="en">{t("common.english")}</MenuItem>
            <MenuItem value="hi">{t("common.hindi")}</MenuItem>
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
            {t("common.signIn")}
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
          {t("hero.title")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.125rem", md: "1.5rem" },
            fontWeight: 400,
            mb: 3,
          }}
        >
          {t("hero.subtitle")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.125rem", md: "1.25rem" },
            fontWeight: 400,
            mb: 2,
          }}
        >
          {t("hero.cta")}
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
          sx={{ width: "100%", maxWidth: "600px", mt: 2 }}
        >
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGetStarted()}
            variant="filled"
            label={t("hero.emailLabel")}
            fullWidth
            disabled={loading}
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
            onClick={handleGetStarted}
            disabled={loading}
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
              "&:disabled": { bgcolor: "#999" },
            }}
          >
            {loading ? "..." : t("hero.getStarted")}
          </Button>
        </Stack>

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2, maxWidth: "600px", width: "100%" }}
          >
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
