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
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT, MAIN_PATH } from "src/constant";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import NetflixNavigationLink from "../NetflixNavigationLink";

const NAV_LINKS = [
  { label: "Home", path: `/${MAIN_PATH.browse}` },
  { label: "Shows", path: `/${MAIN_PATH.shows}` },
  { label: "Movies", path: `/${MAIN_PATH.movies}` },
  { label: "New & Popular", path: `/${MAIN_PATH.newPopular}` },
  { label: "My List", path: `/${MAIN_PATH.myList}` },
  { label: "Browse by Languages", path: `/${MAIN_PATH.browseByLanguages}` },
];

const MainHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // User Profile Picture
  const [profilePicture, setProfilePicture] = React.useState<string | null>(null);

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
    navigate(`/${MAIN_PATH.signin}`);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      sx={{
        px: { xs: "16px", md: "60px" },
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
      <Toolbar disableGutters>
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
            {NAV_LINKS.map((link) => (
              <MenuItem
                key={link.label}
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
                  {link.label}
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
          {NAV_LINKS.map((link) => (
            <NetflixNavigationLink
              key={link.label}
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
              {link.label}
            </NetflixNavigationLink>
          ))}
        </Stack>

        {/* Right side: search, notifications, avatar */}
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1.5 }}>
          <SearchBox />

          {/* Notification Bell */}
          <IconButton sx={{ color: "white", p: 0.5 }}>
            <NotificationsNoneIcon />
          </IconButton>

          {/* Avatar + dropdown */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="user_avatar"
                src={profilePicture || "/assets/avatar.png"}
                variant="rounded"
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
            {["Manage Profiles", "Transfer Profile", "Account", "Help Centre"].map(
              (setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ color: "text.primary" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              )
            )}
            <MenuItem
              onClick={handleSignOut}
              sx={{
                borderTop: "1px solid rgba(255,255,255,0.15)",
                mt: 1,
                pt: 1.5,
              }}
            >
              <Typography textAlign="center" sx={{ color: "text.primary" }}>
                Sign out of Netflix
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
