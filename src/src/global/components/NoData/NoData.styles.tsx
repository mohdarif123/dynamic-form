import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme, verdanaFamily } from "../../../utils/styles";

const noDataStyles = {
  noDataImageWrapper: {
    minHeight: "55vh",
    borderBottomLeftRadius: "36px",
    borderBottomRightRadius: "36px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  noDataTextStyle:{
    color: "rgba(153, 153, 153, 1)",
    mt:1
  },
  mediumFonts: {
    fontFamily: verdanaFamily,
    fontWeight: 700,
    LineHeight: "39.7px",
    color: "rgba(255, 255, 255, 1)",
    [theme.breakpoints.up("xl")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "25px",
    },
  },
  exportButtonStyle: {
    width: { xl: "110px", lg: "110px", md: "110px", sm: "100px", xs: "100px" },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
    border: "none",
    background: "rgba(38, 49, 96, 1)",
  },
};

export default noDataStyles;
