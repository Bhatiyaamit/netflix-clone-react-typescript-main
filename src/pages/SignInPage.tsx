import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LanguageIcon from "@mui/icons-material/Language";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { MAIN_PATH } from "src/constant";
import { useTranslation } from "react-i18next";

const SIGNIN_FOOTER_LINK_KEYS = [
  "footer.faq",
  "footer.helpCenter",
  "footer.termsOfUse",
  "footer.privacy",
  "footer.cookiePreferences",
  "footer.corporateInformation",
  "footer.cancelMembership",
  "footer.netflixShop",
  "footer.impressum",
] as const;

export function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );
        // Persist user picture for MainHeader
        if (userInfo.data.picture) {
          localStorage.setItem("userPicture", userInfo.data.picture);
        }
        if (userInfo.data.name) {
          localStorage.setItem("userName", userInfo.data.name);
        }
        navigate(`/${MAIN_PATH.browse}`);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        bgcolor: "#000",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/signin-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        },
      }}
    >
      {/* Header / Logo */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: 2,
          zIndex: 10,
        }}
      >
        <RouterLink to="/">
          <Box
            component="img"
            src="/assets/netflix-logo.png"
            alt="Netflix"
            sx={{
              height: { xs: 24, sm: 30, md: 45 },
              width: "auto",
            }}
          />
        </RouterLink>
      </Box>

      {/* Main Content - Sign In Form */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", sm: "center" },
          zIndex: 10,
          px: 2,
          py: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px",
            bgcolor: "rgba(0, 0, 0, 0.75)",
            p: { xs: 3, md: 6 },
            borderRadius: "4px",
            color: "#fff",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="700" mb={3}>
            {t("signIn.title")}
          </Typography>

          <Stack spacing={2}>
            <TextField
              variant="filled"
              label={t("signIn.emailLabel")}
              fullWidth
              InputLabelProps={{
                style: { color: "#8c8c8c" },
              }}
              InputProps={{
                style: { color: "#fff", backgroundColor: "#333" },
              }}
              sx={{
                "& .MuiFilledInput-root": {
                  borderRadius: "4px",
                  backgroundColor: "#333",
                  "&:hover": { backgroundColor: "#333" },
                  "&.Mui-focused": { backgroundColor: "#454545" },
                  "&:before, &:after": { borderBottom: "none !important" },
                },
              }}
            />

            <TextField
              variant="filled"
              label={t("signIn.passwordLabel")}
              type={showPassword ? "text" : "password"}
              fullWidth
              InputLabelProps={{
                style: { color: "#8c8c8c" },
              }}
              InputProps={{
                style: { color: "#fff", backgroundColor: "#333" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#8c8c8c" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiFilledInput-root": {
                  borderRadius: "4px",
                  backgroundColor: "#333",
                  "&:hover": { backgroundColor: "#333" },
                  "&.Mui-focused": { backgroundColor: "#454545" },
                  "&:before, &:after": { borderBottom: "none !important" },
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#e50914",
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                py: 1.5,
                mt: 1,
                textTransform: "none",
                "&:hover": { bgcolor: "#f40612" },
              }}
            >
              {t("signIn.signInButton")}
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={() => login()}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                fontWeight: "700",
                fontSize: "1rem",
                py: 1.5,
                mt: 1,
                textTransform: "none",
                "&:hover": { bgcolor: "#e6e6e6" },
              }}
            >
              {t("signIn.signInWithGoogle")}
            </Button>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ color: "#b3b3b3", fontSize: "0.8rem" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    defaultChecked
                    sx={{
                      color: "#b3b3b3",
                      p: 0.5,
                      "&.Mui-checked": { color: "#b3b3b3" },
                    }}
                  />
                }
                label={
                  <Typography fontSize="0.8rem">
                    {t("signIn.rememberMe")}
                  </Typography>
                }
              />
              <Link href="#" underline="hover" color="inherit">
                {t("signIn.needHelp")}
              </Link>
            </Stack>
          </Stack>

          <Box mt={4}>
            <Typography color="#737373" fontSize="1rem">
              {t("signIn.newToNetflix")}{" "}
              <Link href="#" underline="hover" color="#fff" fontWeight="500">
                {t("signIn.signUpNow")}
              </Link>
            </Typography>
            <Typography color="#8c8c8c" fontSize="0.8rem" mt={2}>
              {t("signIn.recaptcha")}{" "}
              <Link href="#" underline="hover" color="#0071eb">
                {t("signIn.learnMore")}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          zIndex: 10,
          px: { xs: 2, md: 6, lg: 20 },
          py: 2,
          color: "#737373",
          width: "100%",
          mt: "auto",
        }}
      >
        <Typography mb={1}>{t("signIn.questionsContact")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
            gap: 1,
            fontSize: "0.8rem",
            mb: 2,
          }}
        >
          {SIGNIN_FOOTER_LINK_KEYS.map((key) => (
            <Link key={key} href="#" underline="hover" color="inherit">
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
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
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
      </Box>
    </Box>
  );
}

Component.displayName = "SignInPage";
