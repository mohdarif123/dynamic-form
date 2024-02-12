import { Box, Typography, useMediaQuery } from "@mui/material";
import { drawerWidth, theme } from "utils/styles";
import appFooterStyles from "./AppFooter.styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

const AppFooter = () => {
  const classes = appFooterStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const bgcolor = useAppSelector(selectBackgroundColor);

  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <Box
      sx={{
        ...classes.footer,
        width: !isDesktop ? "100%" : `calc(100% - ${drawerWidth}px)`,
        height: !isDesktop ? "42px" : "60px ",
      }}
    >
      <Typography
        variant="h5"
        sx={classes.footerText}
        mt={{ xl: 2.5, lg: 0 }}
        style={{ color: !bgcolor ? "black" : "white" }}
      >
        &copy; {getYear()} RFPPro. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default AppFooter;
