import {
  appColor,
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  theme,
  verdanaFamily,
} from "utils/styles";

const forgotPasswordStyles = {
  submitBtn: {
    width: "100%",
    background: "#7A81FD",
    borderRadius: "8px",
    fontSize: "18px !important",
    fontWeight: 500,
    fontFamily: "Verdana !important",
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
  
  backBtn: {
    cursor: "pointer",
    display: "inline",
    color: "#ffffff",
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

  loadingBgWrapper: {
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.2)",
    position: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
  },
  labelIcon: { color: "black" },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: getRelativeFontSize(5),
  },
  formCenter: {
    ...centerItemFlex,
    marginTop: "10px",
  },
  errorStyling: {
    paddingLeft: "10px",
  },
  mainStyle: {
    width: "100%",
    display: "grid",
    height: "100%",
  },
  mainWrapper: {
    backgroundColor: "#373854",
    borderRadius: "46px",
    pb: { xl: 3, lg: 2, md: 3, sm: 3, xs: 3 },
    pt: { xl: 0.5, lg: 2, md: 4, sm: 4, xs: 4 },
  },
  allRightReservedWrapper: {
    display: "flex",
    justifyContent: "center",
    mt: { xl: 9, lg: 6, md: 6, sm: 6, xs: 4 },
  },
  mainInnerWrapper: {
    width: "100%",
    height: "100%",
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
  },
  getHeading: {
    width: "82%",
    color: "#ffffff",
    margin: "0 auto",
    lineHeight: "51.26px",
    fontWeight: 700,
    fontFamily: "Source Sans 3",
    [theme.breakpoints.up("xl")]: {
      mt: 6,
      fontSize: "36px",
    },
    [theme.breakpoints.up("lg")]: {
      mt: 4,
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
    mt: 1.5,
    mb: 5,
    textAlign: "center",
    [`@media screen and (min-width: ${1200}px)`]: {
      fontSize: "26px",
    },
  },
  inputLabel: {
    color: pureWhiteColor,
    fontWeight: 600,
  },
  submitText: {
    fontWeight: 600,
    textAlign: "center",
    fontStyle: "normal",
    lineHeight: "23px",
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
} as const;

export default forgotPasswordStyles;
