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

const loginStyles = {
  mainLoginWrapper: {
    height: "100%",
    width: "100%",
  },
  select: {
    borderRadius: "20px",
    border: "1px solid black",
    width: "100% !important",
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
  },
  inputstyle: {
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
  textCenter: {
    ...mediumFont,
    margin: "20px 0px",
    fontSize: getRelativeFontSize(),
    textAlign: "center",
    cursor: "pointer",
    color: "#212121",
  },
  textRadious: {
    borderRadius: "100px",
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
  getLoginScreen: {
    backgroundColor: "#373854",
    borderRadius: "46px",
    pt: { xl: 3, lg: 3, md: 4, sm: 4, xs: 4 },
    pb: { xl: 3, lg: 2, md: 3, sm: 3, xs: 3 },
  },
  allRightReservedWrapper: {
    display: "flex",
    justifyContent: "center",
    mt: { xl: 7, lg: 6, md: 6, sm: 6, xs: 4 },
  },
  innerGetLoginBox: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  forgetPasswordWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    marginTop: "10px",
  },
  checkBoxStyle: {
    color: "#7A81FD",
    height: "3px",
    width: "4px",
    borderRadius: "50px !important",
    "&.Mui-checked": {
      color: " #7A81FD",
      background: pureWhiteColor,
      height: "3px",
      width: "4px",
    },
    "& .MuiSvgIcon-root": {
      borderRadius: "20px !important",
    },
  },
  buttonWrapper: {
    mt: { xl: 6, lg: 4, md: 4, sm: 4, xs: 4 },
    width: "100%",
  },
  signInText: {
    fontWeight: 600,
    textAlign: "center",
    fontStyle: "normal",
    lineHeight: "23px",
  },
  signBtn: {
    width: "100%",
    background: "#7A81FD",
    borderRadius: "8px",
    fontSize: "18px !important",
    fontWeight: 500,
    fontFamily: "Verdana !important",
  },
  footerTypo: {
    textAlign: "center",
    color: "#BEBEBE",
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.0em",
    wordBreak: "break-all",
  },
  errorStyling: {
    paddingLeft: "5px",
  },
  headingCenter: {
    color: "rgba(0, 0, 0, 0.85)",
    mt: 2,
    fontVariant: "tabular-nums",
  },
  getHeading: {
    width: "82%",
    color: "#ffffff",
    margin: "0 auto",
    lineHeight: "51.26px",
    fontWeight: 700,
    fontFamily: "Source Sans 3",
    [theme.breakpoints.up("xl")]: {
      mt: 5,
      fontSize: "36px",
    },
    [theme.breakpoints.up("lg")]: {
      mt: 3,
    },
    [theme.breakpoints.down("md")]: {
      mt: 0,
    },
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "32px",
    },
  },
  getHeading2: {
    color: "#6842EF",
    width: "82%",
    margin: "0 auto",
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "32px",
    },
    lineHeight: "50px",
    mt: 5,
    [theme.breakpoints.down("md")]: {
      mt: 0,
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
  checkboxText: {
    color: "#BEBEBE",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "20px",
  },
  inputLabel: {
    // color: pureWhiteColor,
    fontWeight: 600,
    color: "#fff !important",
    "&.Mui-focused": {
      border: "2px solid red",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
} as const;

export default loginStyles;
