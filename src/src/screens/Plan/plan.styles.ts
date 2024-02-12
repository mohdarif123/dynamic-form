import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pureWhiteColor,
  theme,
  verdanaFamily,
} from "utils/styles";

export const planStyle = {
  mianContainer: {
    backgroundColor: "#14142D",
    height: { xl: "100vh", lg: "100vh", md: "100%", sm: "100%", xs: "100%" },
  },
  mainWrapper: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
    borderRadius: "13px",
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
  inputstyle: {
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
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
    [theme.breakpoints.down("xl")]: {
      height: "55vh",
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
  getLoginScreen: {
    display: "grid",
    height: "100%",
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
  footer: {
    position: "fixed",
    alignItems: "center",
    left: "50%",
    transform: " translate(-50%, 0)",
    width: "50%",
    [theme.breakpoints.up("xl")]: {
      pt: 6,
    },
    [theme.breakpoints.up("lg")]: {
      pt: 4,
    },
    [theme.breakpoints.up("md")]: {
      pt: 8,
    },
    [theme.breakpoints.up("sm")]: {
      pt: 6,
    },
    [theme.breakpoints.up("xs")]: {
      pt: 6,
    },
    [`@media screen and (max-width: ${375}px)`]: {
      pt: 2,
    },
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
    mt: 3,
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
    cursor: "pointer",
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
  cardTitle: {
    backgroundColor: "#373854",
    color: "#fff",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "20px !important",
      fontWeight: "bold !important",
    },
  },
  cardTitle1: {
    backgroundColor: "#E6E7FF",
    color: "#000",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "20px !important",
      fontWeight: "bold !important",
    },
  },
  cardPrice: {
    backgroundColor: "#373854",
    color: "#fff",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "16px !important",
      fontWeight: "bold !important",
    },
  },

  cardPrice1: {
    backgroundColor: "#ffffff",
    color: "#000",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "16px !important",
      fontWeight: "bold !important",
    },
  },
  cardDetails: {
    backgroundColor: "#373854",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "15.96px",
    color: "#fff",
    textAlign: "center",
  },
  WihtoutcontenetCard: {
    backgroundColor: "#373854",
    textAlign: "center",
    paddingBottom: "38px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },

  WihtoutcontenetCard1: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    paddingBottom: "38px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  cardRecommends: {
    backgroundColor: "#fff",
    color: "#2596be",
    textAlign: "center",
    padding: "16px !important",
  },
  footerText: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
  },
  cardBody: {
    height: "100%",
    backgroundColor: "#282945",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "15.96px",
    color: "#fff",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },

  cardBody1: {
    height: "100%",
    backgroundColor: "#ffffff",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "15.96px",
    color: "#000",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  cardContent: {
    backgroundColor: "#282945",
    padding: "0px !important",
  },
  cardTitleStyle: {
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
    height: {
      xl: "230px",
      lg: "150px",
      md: "150px",
      sm: "150px",
      xs: "150px",
    },
  },

  titleRight: {
    color: "#CBCBCB",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },

  buttonWrapper: {
    display: "flex",
    marginLeft: "3px",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },

  deleteDialogFooter: {
    ...centerItemFlex,
    gap: "10px",
    paddingBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },

  dialogFooterClass: {
    backgroundColor: "red !important",
    alignItem: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
};
