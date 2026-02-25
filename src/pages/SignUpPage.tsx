import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LanguageIcon from "@mui/icons-material/Language";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/providers/AuthProvider";
import { MAIN_PATH } from "src/constant";
import { useEffect } from "react";

const SIGNUP_FOOTER_LINK_KEYS = [
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
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: searchParams.get("email") || "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromParams,
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate(`/${MAIN_PATH.browse}`);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again.",
      );
    }
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

      {/* Main Content - Sign Up Form */}
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
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Stack spacing={2} component="form" onSubmit={handleSignUp}>
            <TextField
              variant="filled"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
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
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
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
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
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

            <TextField
              variant="filled"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
              InputLabelProps={{
                style: { color: "#8c8c8c" },
              }}
              InputProps={{
                style: { color: "#fff", backgroundColor: "#333" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#8c8c8c" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              type="submit"
              disabled={isLoading}
              sx={{
                bgcolor: "#e50914",
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                py: 1.5,
                mt: 1,
                textTransform: "none",
                "&:hover": { bgcolor: "#f40612" },
                "&:disabled": { bgcolor: "#666" },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Stack>

          <Box mt={4}>
            <Typography color="#737373" fontSize="1rem">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to={`/${MAIN_PATH.signin}`}
                underline="hover"
                color="#fff"
                fontWeight="500"
              >
                Sign In
              </Link>
            </Typography>
            <Typography color="#8c8c8c" fontSize="0.8rem" mt={2}>
              By signing up, you agree to our{" "}
              <Link href="#" underline="hover" color="#0071eb">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" underline="hover" color="#0071eb">
                Privacy Policy
              </Link>
              .
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
        <Typography mb={1}>Questions? Contact us.</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
            gap: 1,
            fontSize: "0.8rem",
            mb: 2,
          }}
        >
          {SIGNUP_FOOTER_LINK_KEYS.map((key) => (
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

Component.displayName = "SignUpPage";
