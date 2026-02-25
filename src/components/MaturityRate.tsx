import Box from "@mui/material/Box";
import { ReactNode } from "react";

export default function MaturityRate({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        py: { xs: 0.3, sm: 1 },
        pl: { xs: 0.8, sm: 1.5 },
        pr: { xs: 1.5, sm: 3 },
        fontSize: { xs: 12, sm: 22 },
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        border: { xs: "2px #dcdcdc", sm: "3px #dcdcdc" },
        borderLeftStyle: "solid",
        bgcolor: "#33333399",
      }}
    >
      {children}
    </Box>
  );
}
