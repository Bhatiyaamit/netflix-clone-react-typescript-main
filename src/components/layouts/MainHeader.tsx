import * as React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT, MAIN_PATH } from "src/constant";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import NetflixNavigationLink from "../NetflixNavigationLink";
import { useTranslation } from "react-i18next";

const NAV_LINK_KEYS = [
  { key: "nav.home", path: `/${MAIN_PATH.browse}` },
  { key: "nav.shows", path: `/${MAIN_PATH.shows}` },
  { key: "nav.movies", path: `/${MAIN_PATH.movies}` },
  { key: "nav.newPopular", path: `/${MAIN_PATH.newPopular}` },
  { key: "nav.myList", path: `/${MAIN_PATH.myList}` },
  { key: "nav.browseByLanguages", path: `/${MAIN_PATH.browseByLanguages}` },
];

const USER_MENU_KEYS = [
  "userMenu.manageProfiles",
  // "userMenu.transferProfile",
  // "userMenu.account",
  // "userMenu.helpCentre",
] as const;

const MainHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);
  const { t, i18n } = useTranslation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  // User Profile Picture
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const storedPic = localStorage.getItem("userPicture");
    if (storedPic) {
      setProfilePicture(storedPic);
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    googleLogout();
    localStorage.removeItem("userPicture");
    localStorage.removeItem("userName");
    navigate(`/${MAIN_PATH.signin}`);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      sx={{
        px: { xs: "16px", md: "60px" },
        py: { xs: "0px", md: "0px" },
        height: APP_BAR_HEIGHT,
        backgroundImage: "none",
        ...(isOffset
          ? {
              bgcolor: "primary.main",
              boxShadow: (theme) => theme.shadows[4],
            }
          : { boxShadow: 0, bgcolor: "transparent" }),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: `${APP_BAR_HEIGHT}px !important`,
          height: APP_BAR_HEIGHT,
          alignItems: "center",
        }}
      >
        <Logo sx={{ mr: { xs: 2, sm: 4 } }} />

        {/* Mobile hamburger menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                bgcolor: "rgba(0, 0, 0, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {NAV_LINK_KEYS.map((link) => (
              <MenuItem
                key={link.key}
                onClick={() => {
                  navigate(link.path);
                  handleCloseNavMenu();
                }}
                sx={{
                  bgcolor: isActive(link.path)
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                }}
              >
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: isActive(link.path) ? 700 : 400,
                  }}
                >
                  {t(link.key)}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Mobile Netflix text - hidden since Logo component already shows */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: "none",
            flexGrow: 1,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Netflix
        </Typography>

        {/* Desktop nav links */}
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {NAV_LINK_KEYS.map((link) => (
            <NetflixNavigationLink
              key={link.key}
              to={link.path}
              variant="subtitle2"
              sx={{
                fontWeight: isActive(link.path) ? 700 : 400,
                color: isActive(link.path)
                  ? "white"
                  : "rgba(255, 255, 255, 0.7)",
                whiteSpace: "nowrap",
                fontSize: "0.82rem",
                transition: "color 0.3s",
                "&:hover": {
                  color: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              {t(link.key)}
            </NetflixNavigationLink>
          ))}
        </Stack>

        {/* Right side: language, search, notifications, avatar */}
        <Box
          sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1.5 }}
        >
          {/* Language Switcher */}
          <Select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            size="small"
            variant="standard"
            disableUnderline
            IconComponent={() => null}
            renderValue={() => (
              <LanguageIcon
                sx={{ color: "white", fontSize: 22, display: "flex" }}
              />
            )}
            sx={{
              color: "white",
              minWidth: "auto",
              ".MuiSelect-select": {
                p: "4px !important",
                display: "flex",
                alignItems: "center",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(0,0,0,0.95)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  "& .MuiMenuItem-root": {
                    color: "white",
                    fontSize: "0.85rem",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  },
                },
              },
            }}
          >
            <MenuItem value="en">{t("common.english")}</MenuItem>
            <MenuItem value="hi">{t("common.hindi")}</MenuItem>
          </Select>

          <SearchBox />

          {/* Avatar + dropdown */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
              <Avatar
                alt="user_avatar"
                src={profilePicture || "/assets/avatar.png"}
                variant="rounded"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: "45px",
              "& .MuiPaper-root": {
                bgcolor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              },
            }}
            id="avatar-menu"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {USER_MENU_KEYS.map((key) => (
              <MenuItem
                key={key}
                onClick={() => {
                  handleCloseUserMenu();
                  if (key === "userMenu.manageProfiles") {
                    navigate(`/${MAIN_PATH.manageProfiles}`);
                  }
                }}
              >
                <Typography textAlign="center" sx={{ color: "text.primary" }}>
                  {t(key)}
                </Typography>
              </MenuItem>
            ))}
            <MenuItem
              onClick={handleSignOut}
              sx={{
                borderTop: "1px solid rgba(255,255,255,0.15)",
                mt: 1,
                pt: 1.5,
              }}
            >
              <Typography textAlign="center" sx={{ color: "text.primary" }}>
                {t("common.signOut")}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
