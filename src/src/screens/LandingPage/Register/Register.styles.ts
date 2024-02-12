import {
  appColor,
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  theme,
  verdanaFamily,
} from "utils/styles";

const registerStyles = {
  registerMainWrapper: {
    height: "100%",
    width: "100%",
    marginTop: { xs: "10px", md: "0" },
  },
  select: {
    width: "100%",
    borderRadius: "12px",
    background: "#282945",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        ...mediumFont,
        fontFamily: "Source Sans 3",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: getRelativeFontSize(),
        lineHeight: "20px",
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      color: pureWhiteColor,
      fontFamily: verdanaFamily,
      fontSize: "14px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
    },
  },
  inputStyle: {
    caretColor: pureWhiteColor,
    borderRadius: "12px",
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
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
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
  },
  error: {
    borderRadius: "8px",
    outline: "none",
    borderColor: "red !important",
    width: "100% !important",
  },
  labelIcon: { color: "black" },
  formCenter: {
    ...centerItemFlex,
    height: "55vh",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      height: "40vh",
      overflowY: "auto",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  textCenter: {
    ...mediumFont,
    margin: "20px 0px",
    fontSize: getRelativeFontSize(),
    textAlign: "center",
    cursor: "pointer",
    color: "#212121",
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: getRelativeFontSize(5),
  },
  center: {
    ...boldFont,
    alignItem: "center",
  },
  getRegisterScreen: {
    backgroundColor: "#373854",
    borderRadius: "46px",
    pt: { xl: 1, lg: 0, md: 2, sm: 2, xs: 2 },
    pb: { xl: 3, lg: 1.5, md: 2, sm: 2, xs: 2 },
  },
  allRightReservedWrapper: {
    display: "flex",
    justifyContent: "center",
    mt: { xl: 6, lg: 4.5, md: 6, sm: 6, xs: 4 },
  },
  innerGetLoginBox: { maxWidth: "100%", maxHeight: "100%" },
  forgetPasswordWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  signBtn: {
    width: "100%",
    borderRadius: "8px",
    fontSize: "18px !important",
    fontWeight: 500,
    fontFamily: "Verdana !important",
    background: "#7A81FD",
  },
  errorStyling: {
    paddingLeft: "10px",
  },
  footerTypo: {
    textAlign: "center",
    color: "#BEBEBE",
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.0em",
  },
  nameField: {
    ...boldFont,
    color: "black",
    marginBottom: "0",
    display: "flex",
  },
  inputLabel: {
    display: "flex",
    marginLeft: "6px",
    fontWeight: 500,
    color: "#ffffff",
    fontColor: theme.palette.common.black + " !important",
    "& .MuiTextField-root": {
      color: "red",
    },
    "& .MuiInputLabel-root ": {
      color: "red",
    },
    "&:focus": {
      color: "red",
    },
    "& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "red",
    },
  },
  textHeading1: {
    color: "#ffffff",
    lineHeight: "50px",
    mt: 1,
    [theme.breakpoints.up("xl")]: {
      fontSize: "32px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.down("xl")]: {
      mt: 1,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25px",
    },
  },
  textHeading2: {
    color: "#6842EF",
    lineHeight: "50px",
    [theme.breakpoints.up("xl")]: {
      fontSize: "32px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25px",
    },
  },
  heading5: {
    color: "#E0E0E0",
    textAlign: "center",
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    display: "inline",
  },
  heading6: {
    textAlign: "center",
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    color: "#7A81FD",
    textDecoration: "underline",
    cursor: "pointer",
  },
  customSxSelectStyle: {
    height: "39px",
    width: "70px",
    fontFamily: "Verdana !important",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      color: "#7A81FD",
      marginTop: "-5px",
    },
    borderRadius: "25px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
} as const;

export default registerStyles;
