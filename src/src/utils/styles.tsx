import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Radio, { RadioProps } from "@mui/material/Radio";
import { createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Switch from "@mui/material/Switch";
import { CSSProperties, withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { useAppSelector } from "./hooks";
import { selectBackgroundColor } from "../redux/themeChangeSlice";
import { store } from "./store";
const borderRadius = "30px";
const primaryColor = "#0d3057";
const primaryBackgroundColor = "#F5F5F5";
const borderColor = "rgba(0, 0, 0, 0.12)";
const borderStyle = "1px solid " + borderColor;
const infoTextColor = "#888888";
const disabledBackgroundColor = "#888888";
const defaultFontSize = 14;
const primaryActiveTabBgColor = "#F0ECFF";
const primaryColorPurple = "#6842EF";
const primaryColorOrange = "#D64430";
const primaryColorWhite = "#FFFFFF";
const primaryColorBlue = "#24CBC7";
const primaryGray = "#808080";
const semiTransparentWhite = "#ffffff30";
const semiTransparentBlack = "#00000030";

const defaultBoxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%)";
const drawerWidth = 276;
const textLightColor = "#666666";
const primaryColorBlack = "#202730";
const purplePrimaryColor = "#E83745 ";
const skyPrimaryColor = "#13b4ca";
const pinkDarkColor = "#c11986";
const pureWhiteColor = "#ffffff";
const primaryHeadingColor = "#001529";
const primaryGreenColor = "#adc804";
const primaryBlackColor = "#000000";
const primaryBlue = "#1a0224";
const lightTextColor = "#666";
const lightPinkColor = "#FCF5FF";
const activeMenuColor = "#1A0224";
const darkPurpledColor = "#4b0150";
const inputLabelRequiredColor = "red";
const buttonWhiteBg = "#E7E7E7";
const lightBgColor = "#ffffff";
const mainColor = "#F9F9FF";
const lightDropDownColor = "#E9E9FF";
const inputColor = "#373854";
const chipBackgroundColor = "#FFF1F9";
const completeChipBackgroundColor = "#E7EEBD";
const warningColor = "red";
const primaryBorderColor = "#E7E7E7";
const lowSkyPrimaryColor = "#40a9ff";

const ModelColor = "#282844";
const sidebarColor = "#282945";
const appColor = "#14142D";
const ModelHeader = "#7A81FD";
const cornflowerBlueColor = "#7A81FD";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};
// font family
const verdanaFamily = "Verdana";
const sournceSansFamily = "Source Sans 3";
const boldFamily = "MyriadPro_Bold";
const regularFamily = "MyriadPro_Regular";
const proLightFamily = "TT_Norms_Pro_Light";
const mediumFamily = "MyriadPro_Medium";
const digitalMonoFamily = "Digital-7 Mono";
const sansSerif = "sans-serif";

const mainContainer: CSSProperties = {
  margin: "20px",
};
const mainFlexContainer: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const blackFont: CSSProperties = {
  // fontFamily: "SourceSans3_Black",
  fontWeight: 900,
  fontStyle: "normal",
};

const boldFont: CSSProperties = {
  // fontFamily: "SourceSans3_Bold",
  fontWeight: 700,
};
const leftItemFlex: CSSProperties = {
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
};

const mediumFontDashboard: CSSProperties = {
  // fontFamily: "SourceSans3_Medium",
  fontWeight: 700,
};
const mediumFont: CSSProperties = {
  // fontFamily: "SourceSans3_Medium",
  fontWeight: 500,
};
const rowItemFlex: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};
const regularFont: CSSProperties = {
  // fontFamily: "SourceSans3_Regular",
  fontWeight: 400,
};

const errorStyling: CSSProperties = {
  paddingLeft: "6px",
};

export const breakpoints: any = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    lg2: 1326,
    xl: 1536,
  },
};

const theme = createTheme({
  typography: {
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   "Poppins_Regular",
    //   "Poppins_Medium",
    //   "Poppins_Bold",
    //   "Poppins_Black",
    //   "sans-serif",
    // ].join(","),
  },
});

const customTypography = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "MyriadPro_Light",
      "MyriadPro_Bold",
      "MyriadPro_Medium",
      "MyriadPro_Regular",
      "sans-serif",
      "Digital-7 Mono",
    ].join(","),
  },
  // for heading 24.8px to 20.8px
  h1: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "1.30rem", //20.8px
      fontWeight: 700,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "1.30rem", //20.8px
      fontWeight: 700,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "1.45rem", //23.2px
      fontWeight: 700,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "1.50rem", //24px
      fontWeight: 700,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1.625rem", //25.92px
      fontWeight: 700,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
  },
  // for 22px
  h2: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "1.063rem", //17px
      fontWeight: 600,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "1.188rem", //19.008px
      fontWeight: 600,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "1.25rem", //20px
      fontWeight: 600,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "1.313rem", //21.008px
      fontWeight: 600,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1.375rem", //22px
      fontWeight: 600,
      fontFamily:
        "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif",
    },
  },
  // 17.008px
  h3: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.938rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.938rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "1rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "1rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1.063rem",
      fontFamily: sournceSansFamily,
    },
  },
  // for table header 16px
  h4: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.91rem",
      // fontFamily: boldFamily,
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.92rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.94rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.94rem",
      fontFamily: sournceSansFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1rem",
      fontFamily: sournceSansFamily,
    },
  },
  // for table row 14px
  h5: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.781rem", //12.496px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.813rem", // 13px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "0.875rem", //14px
      fontFamily: "Verdana",
    },
  },
  // for input label //16px
  h6: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.813rem", //13.008
      fontFamily: "sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.875rem", //14px
      fontFamily: "sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "1rem", //16px
      fontFamily: "sans-serif",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1rem", //16px
      fontFamily: "sans-serif",
    },
  },
  // for normal text 16px
  body1: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.844rem",
      fontFamily: sansSerif,
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.875rem",
      fontFamily: sansSerif,
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.906rem",
      fontFamily: sansSerif,
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.938rem",
      fontFamily: sansSerif,
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "1rem",
      fontFamily: sansSerif,
    },
  },
  // stepper  14px
  body2: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.813rem",
      fontFamily: regularFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.844rem",
      fontFamily: regularFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.875rem",
      fontFamily: regularFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.906rem",
      fontFamily: regularFamily,
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "0.938rem",
      fontFamily: regularFamily,
    },
  },
  // for  14px
  subtitle1: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.813rem", //13px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.813rem", //13px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "0.875rem", // 14px
      fontFamily: "Verdana",
    },
  },

  subtitle2: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.563rem", //9px
      // lineHeight: 1.2,
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.625rem", //10px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.625rem", //10px
      fontFamily: "Verdana",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
      lineHeight: 1.2,
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "0.75rem", //12px
      fontFamily: "Verdana",
      lineHeight: 1.2,
    },
  },
  // for button 16px
  button: {
    [`@media screen and (min-width: ${breakpoints.values.xs}px)`]: {
      fontSize: "0.875rem",
      fontFamily: regularFamily,
      textTransform: "capitalize",
    },
    [`@media screen and (min-width: ${breakpoints.values.sm}px)`]: {
      fontSize: "0.875rem",
      fontFamily: regularFamily,
      textTransform: "capitalize",
    },
    [`@media screen and (min-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.813rem",
      fontFamily: regularFamily,
      textTransform: "capitalize",
    },
    [`@media screen and (min-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.875rem",
      fontFamily: regularFamily,
      textTransform: "capitalize",
    },
    [`@media screen and (min-width: ${breakpoints.values.xl}px)`]: {
      fontSize: "0.938rem",
      fontFamily: regularFamily,
      textTransform: "capitalize",
    },
  },
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "TT_Norms_Pro_Regular",
    "TT_Norms_Pro_Thin",
    "TT_Norms_Pro_Bold",
    "TT_Norms_Pro_Light",
    "TT_Norms_Pro_Medium",
    "sans-serif",
  ].join(","),
};

const themes = createTheme({
  // breakpoints,
  typography: {
    ...customTypography,
    // overrides: {
    //   MuiCssBaseline: {
    //     "@global": {
    //       "@font-face": [raleway],
    //     },
    //   },
    // },
  },
});
const getRelativeFontSize = (value: number = 0) => {
  let size = defaultFontSize + value;
  return size + "px";
};

const customButtonStyle: CSSProperties = {
  borderRadius: "8px",
  border: "none",
  fontSize: getRelativeFontSize(),
  textAlign: "center",
  backgroundColor: "#13b4ca",
  padding: "10px 15px",
  // boxShadow: " 4px 4px 30px rgba(0, 0, 0, 0.03)",
  boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
  color: "#FFFFFF",
  cursor: "pointer",
  textTransform: "none",
  height: "47px",
  transition: "all .3s ease",
  "&:hover": {
    background: "#13b4ca",
  },
};

const customButton1Style: CSSProperties = {
  borderRadius: "10px",
  padding: "0px 27px",
  border: "1px solid #0D3057",
  fontSize: getRelativeFontSize(),
  textAlign: "center",
  backgroundColor: "transparent",
  boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
  color: "#0D3057",
  cursor: "pointer",
  textTransform: "none",
  width: "100%",
  height: "42px",
  transition: "all .3s ease",
  "&:hover": {
    color: "#ffffff",
    background: "#0D3057",
  },
};

const paperStyle = {
  p: 2,
  backgroundColor: "#ffffff",
  margin: "10px",
  textAlign: "center",
  borderRadius: "15px",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 5%)",
  display: "block",
  width: "60%",
};

const paperStyleDashboard = {
  cursor: "pointer",
  backgroundColor: "#ffffff",
  margin: "10px",
  borderRadius: "8px",
  boxShadow: " 0px 8px 30px rgba(0, 0, 0, 0.07)",
  width: "100%",
};
const paperStyleAdmin = {
  cursor: "pointer",
  backgroundColor: "#ffffff",
  // margin: "5px",
  borderRadius: "10px",
  boxShadow: " 0px 8px 30px rgba(0, 0, 0, 0.07)",
  width: "22px",
};

const iconBoxStyle: CSSProperties = {
  width: "60px",
  height: "60px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperIconsStyle: CSSProperties = {
  width: "24px",
  height: "24px",
  background: "#F0F0F0",
  borderRadius: "5px",
  paddingTop: "3px",
  paddingRight: "2px",
  paddingLeft: "2px",
  marginRight: "5px",
  cursor: "pointer",
  textAlign: "center",
};

const paperTextStyle: CSSProperties = {
  // fontFamily: "SourceSans3_Bold",
  fontstyle: "normal",
  fontWeight: "600",
  fontSize: "15px",
  lineHeight: "22px",
  color: "#4F4F4F",
  padding: "15px 0",
  overflow: "hidden",
  display: "inline-block",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  whiteSpace: "nowrap",
};

const customTextFieldStyle: CSSProperties = {
  borderRadius: borderRadius,
  position: "relative",
  border: "none",
  fontSize: getRelativeFontSize(2),
  backgroundColor: primaryBackgroundColor,
  padding: "10px 15px",
  boxShadow: "none",
  width: "100%",
};

const headingText: CSSProperties = {
  display: "inline-block",
  fontSize: getRelativeFontSize(8),
};

const centerItemFlex: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const centerItemAbsolute: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const CustomInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      backgroundColor: theme.palette.common.black,
      border: "1px solid #ced4da",
      borderRadius: borderRadius,
      padding: "0 5px",
    },
    input: {
      position: "relative",
      fontSize: getRelativeFontSize(),
      width: "100%",
      padding: "10px 12px",
    },
  })
)(InputBase);

const CustomSwitch = withStyles({
  switchBase: {
    color: "grey",
    "&$checked": {
      color: primaryColor,
      "& + $track": {
        backgroundColor: primaryColor,
      },
    },
    "&$checked + $track": {
      color: primaryColor,
    },
  },
  track: { backgroundColor: "grey" },
  checked: {},
})(Switch);

const CustomCheckbox = withStyles({
  root: {
    color: primaryColor,
    "&$checked": {
      color: primaryColor,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CustomRadio = withStyles({
  root: {
    color: primaryColor,
    "&$checked": {
      color: primaryColor,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(4),
      },
      // backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      borderRadius: "15px",
      padding: "5px 5px",
      width: "300px",
    },
    input: {
      position: "relative",
      fontSize: getRelativeFontSize(),
      width: "100%",
      padding: "10px 12px",
      "&::placeholder ": {
        ...regularFont,
      },
    },
  })
)(InputBase);
// for sx use dark
const dropDownDarkForSx: CSSProperties = {
  height: "47px",
  borderRadius: "34px",
  fontFamily: "Verdana !important",
  width: "100%",
  color: "#ffffff",
  background: "#373854",
  "& .MuiInputBase-input": {
    borderColor: "#282945",
    fontSize: getRelativeFontSize(),
  },
  "& .MuiSelect-icon": {
    color: "#7A81FD",
  },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-disabled": {
    "-webkit-text-fill-color": "#808080 !important",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
  },
};
// for sx use light
const dropDownLightForSx: CSSProperties = {
  height: "47px",
  borderRadius: "34px",
  fontFamily: "Verdana !important",
  width: "100%",
  minWidth: "200px",
  "& .MuiInputBase-input": {
    borderColor: "#4B0150",
    fontSize: getRelativeFontSize(),
  },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "#7A81FD",
  },
  "&.Mui-disabled": {
    "-webkit-text-fill-color": "#C1C1C1 !important",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
  },
};
// for style tag use dark screen
const selectBgDark: CSSProperties = {
  backgroundColor: sidebarColor,
};
// for style tag use light screen select box
const selectBgLight: CSSProperties = {
  backgroundColor: lightDropDownColor,
};
//MenuItem style for dark screen opening area
const meneItemDarkStyle: CSSProperties = {
  color: pureWhiteColor,
  backgroundColor: sidebarColor,
};
//MenuItem style for light screen opening area
const meneItemLightStyle: CSSProperties = {
  color: primaryBlackColor,
  backgroundColor: lightDropDownColor,
};
//renderValue style for dark screen input text color
const renderValueDarkStyle: CSSProperties = {
  color: pureWhiteColor,
};
//renderValue style for light screen input text color
const renderValueLightStyle: CSSProperties = {
  color: "#7A7A7A",
  fontSize: "16px",
};
// menuProps for dark style
const menuPropsDarkStyle = {
  PaperProps: {
    sx: {
      "& .MuiMenuItem-root": {
        margin: "4px 0",
      },
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#2F3052",
        borderRadius: "40px !important",
        color: pureWhiteColor,
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "#2F3052",
        color: pureWhiteColor,
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#7A81FD",
        borderRadius: "40px !important",
        color: pureWhiteColor,
      },
      borderRadius: "34px",
      backgroundColor: "#282945",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#7A81FD",
        borderRadius: "10px",
        width: "5px",
      },
      "&::-webkit-scrollbar-button:start": { display: "block" },
      "&::-webkit-scrollbar-button:end": { display: "block" },
    },
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 190,
    },
  },
  // for the dafault select color
  MenuListProps: {
    sx: {
      backgroundColor: sidebarColor,
      borderRadius: "34px",
    },
  },
};
// menuProps for light style
const menuPropsLightStyle = {
  PaperProps: {
    sx: {
      "& .MuiMenuItem-root": {
        margin: "4px 0",
      },
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#969AFF",
        borderRadius: "40px !important",
        color: pureWhiteColor,
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "#969AFF",
        color: pureWhiteColor,
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#7A81FD",
        borderRadius: "40px !important",
        color: pureWhiteColor,
      },
      borderRadius: "34px",
      backgroundColor: "#E6E7FF",
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#7A81FD",
        borderRadius: "10px",
        width: "4px",
      },
      "&::-webkit-scrollbar-button:start": { display: "block" },
      "&::-webkit-scrollbar-button:end": { display: "block" },
    },
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 190,
    },
  },
  MenuListProps: {
    sx: {
      backgroundColor: lightDropDownColor,
      borderRadius: "34px",
    },
  },
};

const inputBoxLight: CSSProperties = {
  borderRadius: "38px",
  background: "#E6E7FF",
  width: "100%",
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: ` 0 0 0 1000px #E6E7FF inset`,
      transition: "background-color 5000s ease-in-out 0s !important",
      backgroundColor: "#E6E7FF ! important",
      "-webkit-text-fill-color": "#7A7A7A !important",
    },
  },
  // for placeholder style at disbled button
  "& .Mui-disabled": {
    "-webkit-text-fill-color": "#C1C1C1",
  },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    color: "#ffffff",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    padding: "12px 12px",
    color: "#7A7A7A",
    fontSize: "16px",
    lineHeight: "28px",
    ...regularFont,
    fontFamily: "Source Sans 3",
    "&::placeholder": {
      ...regularFont,
      fontFamily: "Source Sans 3",
      color: "#7A7A7A",
      fontSize: "16px",
      lineHeight: "28px",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "38px",
    color: "white",
    fontFamily: verdanaFamily,
    fontColor: "#BEBEBE",
    fontSize: "14px",
    lineHeight: "1.5715",
    "&.Mui-focused fieldset": {
      borderColor: appColor,
    },
  },
};
const inputBoxDark: CSSProperties = {
  borderRadius: "38px",
  background: sidebarColor,
  width: "100%",
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: ` 0 0 0 1000px  ${sidebarColor}  inset`,
      transition: "background-color 5000s ease-in-out 0s !important",
      backgroundColor: `${sidebarColor} ! important`,
      "-webkit-text-fill-color": "#fff !important",
    },
  },
  // for placeholder style at disbled button
  "& .Mui-disabled": {
    "-webkit-text-fill-color": "#C1C1C1",
  },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    color: "#ffffff",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    padding: "12px 12px",
    color: pureWhiteColor,
    "&::placeholder": {
      ...regularFont,
      color: "#F5FAFF",
      fontSize: "15px",
      lineHeight: "28px",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "38px",
    color: "#BEBEBE",
    fontFamily: verdanaFamily,
    fontColor: "#BEBEBE",
    fontSize: "14px",
    lineHeight: "1.5715",
    "&.Mui-focused fieldset": {
      borderColor: appColor,
    },
  },
};
const customScrollCssOuter = {
  "&::-webkit-scrollbar": {
    width: "7px",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#7A81FD",
    borderRadius: "10px",
    width: "7px",
  },
  "&::-webkit-scrollbar-button:start": { display: "block" },
  "&::-webkit-scrollbar-button:end": { display: "block" },
};
const customScrollCssInner = {
  "&::-webkit-scrollbar": {
    width: "3px",
    height: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#7A81FD",
    borderRadius: "10px",
    width: "3px",
    height: "10px",
  },
  "&::-webkit-scrollbar-button:start": { display: "block" },
  "&::-webkit-scrollbar-button:end": { display: "block" },
};
export {
  customScrollCssInner,
  customScrollCssOuter,
  inputBoxDark,
  inputBoxLight,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  renderValueDarkStyle,
  renderValueLightStyle,
  meneItemDarkStyle,
  meneItemLightStyle,
  selectBgDark,
  selectBgLight,
  dropDownDarkForSx,
  dropDownLightForSx,
  borderRadius,
  primaryColor,
  disabledBackgroundColor,
  primaryColorBlack,
  primaryBackgroundColor,
  borderColor,
  borderStyle,
  infoTextColor,
  primaryBorderColor,
  lowSkyPrimaryColor,
  verdanaFamily,
  inputColor,
  sournceSansFamily,
  defaultBoxShadow,
  customButtonStyle,
  customButton1Style,
  paperStyle,
  paperStyleDashboard,
  iconBoxStyle,
  paperIconsStyle,
  paperTextStyle,
  customTextFieldStyle,
  mainFlexContainer,
  rowItemFlex,
  leftItemFlex,
  headingText,
  centerItemFlex,
  centerItemAbsolute,
  CustomInput,
  CustomSwitch,
  CustomCheckbox,
  CustomRadio,
  regularFont,
  blackFont,
  boldFont,
  mediumFont,
  getRelativeFontSize,
  theme,
  themes,
  mainContainer,
  drawerWidth,
  textLightColor,
  purplePrimaryColor,
  pinkDarkColor,
  skyPrimaryColor,
  pureWhiteColor,
  primaryHeadingColor,
  primaryGreenColor,
  primaryBlue,
  lightTextColor,
  primaryBlackColor,
  errorStyling,
  lightPinkColor,
  activeMenuColor,
  darkPurpledColor,
  inputLabelRequiredColor,
  buttonWhiteBg,
  lightBgColor,
  chipBackgroundColor,
  completeChipBackgroundColor,
  warningColor,
  mediumFontDashboard,
  paperStyleAdmin,
  sidebarColor,
  appColor,
  ModelColor,
  ModelHeader,
  cornflowerBlueColor,
  lightDropDownColor,
  primaryActiveTabBgColor,
  primaryColorPurple,
  primaryColorOrange,
  primaryColorWhite,
  primaryColorBlue,
  primaryGray,
  mainColor,
  semiTransparentBlack,
  semiTransparentWhite,
};
