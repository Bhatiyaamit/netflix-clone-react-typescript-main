import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { MAIN_PATH } from "src/constant";

export function Component() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const pic = localStorage.getItem("userPicture");
    const name = localStorage.getItem("userName");
    if (pic) setProfilePicture(pic);
    if (name) setUserName(name);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#141414",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        // Radial fade background like Netflix profile screen
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at center, rgba(30,30,30,1) 0%, rgba(20,20,20,1) 50%, rgba(0,0,0,1) 100%)",
          zIndex: 0,
        },
      }}
    >
      <Stack
        alignItems="center"
        spacing={3}
        sx={{ zIndex: 1, textAlign: "center", px: 2 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 400,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            letterSpacing: "0.02em",
          }}
        >
          Manage Profiles:
        </Typography>

        {/* Profile Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            group: "profile",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 100, sm: 120, md: 144 },
              height: { xs: 100, sm: 120, md: 144 },
              borderRadius: "4px",
              overflow: "hidden",
              border: "2px solid transparent",
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "white",
              },
              "&:hover .edit-overlay": {
                opacity: 1,
              },
            }}
          >
            <Avatar
              alt={userName}
              src={profilePicture || "/assets/avatar.png"}
              variant="square"
              sx={{
                width: "100%",
                height: "100%",
                fontSize: { xs: 40, sm: 48, md: 56 },
              }}
            />
            {/* Edit overlay */}
            <Box
              className="edit-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
            >
              <EditIcon
                sx={{
                  color: "white",
                  fontSize: { xs: 28, sm: 36, md: 44 },
                }}
              />
            </Box>
          </Box>

          {/* Profile Name */}
          <Typography
            sx={{
              color: "grey.400",
              mt: 1,
              fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" },
            }}
          >
            {userName}
          </Typography>
        </Box>

        {/* Done Button */}
        <Button
          variant="outlined"
          onClick={() => navigate(`/${MAIN_PATH.browse}`)}
          sx={{
            mt: 3,
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 0.8, sm: 1 },
            color: "white",
            borderColor: "grey.500",
            borderWidth: "1px",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "none",
            borderRadius: 0,
            "&:hover": {
              borderColor: "white",
              bgcolor: "transparent",
            },
          }}
        >
          Done
        </Button>
      </Stack>
    </Box>
  );
}

Component.displayName = "ManageProfilesPage";
