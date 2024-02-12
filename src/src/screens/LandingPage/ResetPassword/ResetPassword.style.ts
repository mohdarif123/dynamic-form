import {
  boldFont,
  centerItemFlex,
  theme,
  sidebarColor,
  pureWhiteColor,
  regularFont,
  appColor,
  verdanaFamily,
} from "utils/styles";

const ResetPasswordStyle = {
  resetMainWrapper: {
    height: "100%",
    width: "100%",
    marginTop: { xs: "10px", md: "0" },
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
  inputLabel: {
    fontWeight: 600,
    color: "#fff !important",
    "&.Mui-focused": {
      border: "2px solid red",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
  inputStyle: {
    caretColor: pureWhiteColor,
    borderRadius: "12px",
    background: sidebarColor,
    width: "100%",
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
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: ` 0 0 0 1000px  ${sidebarColor}  inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: `${sidebarColor} ! important`,
        "-webkit-text-fill-color": "#fff !important",
      },
    },
  },
  formCenter: {
    ...centerItemFlex,
  },
  textRadious: {
    borderRadius: "100px",
  },
  center: {
    ...boldFont,
    alignItem: "center",
  },
  getResetScreen: {
    backgroundColor: "#373854",
    borderRadius: "46px",
    pt: { xl: 0.5, lg: 1, md: 3, sm: 3, xs: 3 },
    pb: { xl: 3, lg: 2, md: 3, sm: 3, xs: 3 },
  },
  allRightReservedWrapper: {
    display: "flex",
    justifyContent: "center",
    mt: { xl: 7, lg: 6, md: 6, sm: 6, xs: 4 },
  },
  innerGetLoginBox: { maxWidth: "100%", maxHeight: "100%" },
  forgetPasswordWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  getHeading1: {
    fontFamily: "Source Sans 3",
    width: "82%",
    color: "#ffffff",
    margin: "0 auto",
    lineHeight: "50px",
    mt: 5,
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "32px",
    },
    [theme.breakpoints.down("md")]: {
      mt: 0,
    },
  },
  getHeading2: {
    color: "#6842EF",
    fontFamily: "Source Sans 3",
    width: "82%",
    margin: "0 auto",
    lineHeight: "50px",
    mt: 5,
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "32px",
    },
    [theme.breakpoints.down("md")]: {
      mt: 0,
    },
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
  getHeading3: {
    ...boldFont,
    width: "100%",
    color: "#ffffff",
    mt: 0,
    mb: 5,
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "26px",
    },
  },
  signBtn: {
    width: "100%",
    fontSize: "18px !important",
    fontWeight: 500,
    fontFamily: "Verdana !important",
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
    wordBreak: "break-all",
  },
} as const;

export default ResetPasswordStyle;
