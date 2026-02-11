import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT, MAIN_PATH } from "src/constant";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import NetflixNavigationLink from "../NetflixNavigationLink";

const MainHeader = () => {
  const navigate = useNavigate();
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElBrowse, setAnchorElBrowse] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenBrowseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBrowse(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseBrowseMenu = () => {
    setAnchorElBrowse(null);
  };

  const handleGenreClick = (genreId: number | string) => {
    navigate(`/${MAIN_PATH.genreExplore}/${genreId}`);
    handleCloseBrowseMenu();
  };

  return (
    <AppBar
      sx={{
        // px: "4%",
        px: "60px",
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

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
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
            }}
          >
            <MenuItem onClick={() => { navigate(`/${MAIN_PATH.browse}`); handleCloseNavMenu(); }}>
              <Typography textAlign="center">Home</Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center" sx={{ fontWeight: 600 }}>Browse</Typography>
            </MenuItem>
            {genres?.map((genre) => (
              <MenuItem 
                key={genre.id} 
                onClick={() => { handleGenreClick(genre.id); handleCloseNavMenu(); }}
                sx={{ pl: 4 }}
              >
                <Typography textAlign="center">{genre.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Netflix
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          <NetflixNavigationLink
            to={`/${MAIN_PATH.browse}`}
            variant="subtitle1"
          >
            Home
          </NetflixNavigationLink>
          
          <Box
            onClick={handleOpenBrowseMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Browse
            </Typography>
            <ArrowDropDownIcon sx={{ color: "text.primary" }} />
          </Box>
          
          <Menu
            anchorEl={anchorElBrowse}
            open={Boolean(anchorElBrowse)}
            onClose={handleCloseBrowseMenu}
            sx={{
              mt: 1,
              "& .MuiPaper-root": {
                bgcolor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {genres?.map((genre) => (
              <MenuItem
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Typography sx={{ color: "text.primary" }}>
                  {genre.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
          <SearchBox />
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="user_avatar" src="/avatar.png" variant="rounded" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
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
            {["Account", "Logout"].map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
