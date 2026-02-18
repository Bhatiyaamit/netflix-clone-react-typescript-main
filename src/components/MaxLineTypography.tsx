import { forwardRef } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

const MaxLineTypography = forwardRef<
  HTMLDivElement,
  TypographyProps & { maxLine: number }
>(({ maxLine, children, sx, ...others }, ref) => {
  // Extract `display` from sx so it doesn't override `-webkit-box`
  // which is required for WebkitLineClamp to work.
  const sxObj = (sx ?? {}) as Record<string, unknown>;
  const { display, ...restSx } = sxObj;

  const inner = (
    <Typography
      ref={display ? undefined : ref}
      sx={
        {
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: maxLine,
          WebkitBoxOrient: "vertical",
          wordBreak: "break-word",
          ...restSx,
        } as SxProps<Theme>
      }
      {...others}
    >
      {children}
    </Typography>
  );

  // If a display value was provided (e.g. responsive visibility),
  // wrap in a Box that handles visibility without breaking line-clamp.
  if (display) {
    return (
      <Box ref={ref} sx={{ display } as SxProps<Theme>}>
        {inner}
      </Box>
    );
  }

  return inner;
});

export default MaxLineTypography;
