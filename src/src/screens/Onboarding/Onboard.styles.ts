import {
  appColor,
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  primaryBlackColor,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  theme,
  verdanaFamily,
} from "utils/styles";
import step1background from "assets/icons/step1background.svg";

const OnboardingStyles = {
  mainWrapper: {
    backgroundColor: "rgba(20, 20, 45, 1)",
    height: "100vh",
    [theme.breakpoints.down("lg")]: {
      height: "auto",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  companyDetailsWrapper: {
    "&::-webkit-scrollbar": {
      width: "10px",
      borderRadius: "10px",
      height: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: sidebarColor,
      borderRadius: "10px",
      width: "10px",
    },
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(131, 136, 255, 1)",
    height: {
      xl: "100%",
      lg: "100%",
      md: "100vh",
      sm: "100vh",
      xs: "100vh",
    },
    overflowY: "auto",
    backgroundImage: `url('${step1background}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  stepperMainBox: {
    flex: 1,
    ...centerItemFlex,
  },
  copyRightFooterStyle: {
    fontSize: "10px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "4vh",
    width: "100%",
    position: "absolute",
    bottom: "0",
    background: "rgba(20, 20, 45, 1)",
  },
  btn: {
    mt: 4,
    width: "200px",
  },
  inputLabels: {
    ...mediumFont,
    fontSize: getRelativeFontSize(4),
    color: "rgba(255, 255, 255, 1)",
  },
  descriptionText: {
    ...regularFont,
    fontSize: getRelativeFontSize(4),
    color: "#666666",
  },
  WihtoutcontenetCard: {
    backgroundColor: "#373854",
    textAlign: "center",
    paddingBottom: "38px",
  },
  cardRecommends: {
    backgroundColor: "#fff",
    color: "#2596be",
    textAlign: "center",
    padding: "16px !important",
  },
  cardTitle: {
    backgroundColor: "#373854",
    color: "#fff",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "20px !important",
      fontWeight: "bold !important",
    },
    "& .MuiCardHeader-subheader": {
      color: "rgba(255, 255, 255, 1)",
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  footerText: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
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
  cardBody: {
    backgroundColor: "#282945",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "15.96px",
    color: "#fff",
    textAlign: "center",
  },
  proTextStyle: {
    color: "rgba(122, 129, 253, 1)",
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: {
      fontSize: "28px",
    },
  },
  rfpTextStyle: {
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: { fontSize: "28px" },
    marginLeft: "4px",
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
  testStyle: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "35px",
    },
    color: "#ffffff",
  },
  centerItem: {
    ...centerItemFlex,
  },
  stepColors: {
    ...regularFont,
    "& .MuiStepLabel-root .Mui-active": {
      color: "#8569BB ",
    },
    "& .MuiStepLabel-root .Mui-completed": {
      color: "#8569BB ", // circle color (COMPLETED)
    },
    "& .MuiStepIcon-root": {
      color: "rgba(213, 213, 213, 1)",
    },
  },
  shortdesc: {
    color: "#666666",
    ...regularFont,
    fontSize: getRelativeFontSize(),
  },
  validity: {
    ...regularFont,
    display: "flex",
    fontSize: getRelativeFontSize(2),
    color: "#212121",
  },
  smallFontText: {
    ...regularFont,
    fontSize: getRelativeFontSize(2),
    color: "#666666",
  },
  purpleHeadingText: {
    color: "#462682",
    fontSize: getRelativeFontSize(10),
    ...boldFont,
  },
  headingText: {
    color: "#212121",
    fontSize: getRelativeFontSize(15),
    ...boldFont,
  },
  cardElementStyle: {
    marginTop: "10px",
    border: "rgba(255, 255, 255, 0.1) solid 1px",
    borderRadius: "9px",
    padding: "12px",
    backgroundColor: "rgba(40, 41, 69, 1)",
  },
  whiteHeadingText: {
    color: "#FFFFFF",
    fontSize: getRelativeFontSize(15),
    ...boldFont,
  },
  mediumText: {
    color: "#212121",
    fontSize: getRelativeFontSize(6),
    ...mediumFont,
    justifyContent: "center",
    alignItems: "center",
  },
  lastStepContainer: {
    backgroundColor: "#5A3C97",
    height: "100vh",
    ...centerItemFlex,
  },
  stepperHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(2),
    color: "rgba(255, 255, 255, 1)",
  },
  stepperDesc2: {
    color: "#ffffff",
    maxWidth: "270px",
  },
  whiteDescText: {
    ...regularFont,
    fontSize: getRelativeFontSize(2),
    color: "#FFFFFF",
  },
  borderBox: {
    p: 3,
    backgroundColor: "rgba(40, 41, 69, 1)",
    height: "500px",
    border: "1px solid #B7B7B7",
    borderRadius: "10px",
    width: "550px",
  },
  headerWrapper: {
    display: "flex",
    mb: 1,
    alignItems: "center",
    ml: 2,
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "5px",
    },
  },
  nameField: {
    fontWeight: 500,
    color: "#ffffff",
    marginLeft: "4px",
    display: "flex",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
      fontSize: "11px",
    },
  },
  nameField1: {
    fontWeight: 500,
    color: "#000000",
    marginLeft: "4px",
    display: "flex",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
      fontSize: "11px",
    },
  },
  dropzoneWrapper: {
    width: "60%",
    minHeight: "100px",
    borderRadius: "25px",
    borderWidth: "3px",
    background: primaryBlackColor,
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropzoneIconStyle: {
    width: "55px",
    height: "55px",
    display: "flex",
  },
  dropZoneWrapperDoc: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "25px",
      borderWidth: "3px",
      background: primaryBlackColor,
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      borderRadius: "15px",
      color: "#7A81FD",
      margin: "15px",
      padding: "20px",
    },
    "& .css-6vrhsn-MuiGrid-root .MuiDropzoneArea-textContainer": {
      marginTop: "0px",
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiDropzoneArea-text": {
      fontSize: getRelativeFontSize(2),
      ...mediumFont,
    },
  },
  warningContent: {
    color: "black",
    fontSize: getRelativeFontSize(),
    margin: "10px 0",
    ...mediumFont,
  },
  previewChipLight: {
    marginTop: 1,
    padding: "15px 0px",
    justifyContent: "space-between",
  },
  form4testHeading: {
    [theme.breakpoints.up("lg")]: {
      fontSize: "39px",
      fontWeight: 700,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "39px",
      fontWeight: 700,
    },

    [theme.breakpoints.up("md")]: {
      fontSize: "39px",
      fontWeight: 700,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "39px",
      fontWeight: 700,
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "39px",
      fontWeight: 700,
    },
    color: "#000000",
  },
  form4test: {
    [theme.breakpoints.up("lg")]: {
      fontSize: "16px",
      fontWeight: 400,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "16px",
      fontWeight: 400,
    },

    [theme.breakpoints.up("md")]: {
      fontSize: "16px",
      fontWeight: 400,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px",
      fontWeight: 400,
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "16px",
      fontWeight: 400,
    },
    color: "#ffffff",
    borderBottom: "1px solid #ffffff",
  },
  testAreaStyle1: {
    borderRadius: "25px",
    background: "none",
    color: "#ffffff",
    backgroundColor: sidebarColor,
    border: "none",
    ".MuiOutlinedInput-notchedOutline": { border: "0px" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-1oywd2p-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
      color: pureWhiteColor,
      fontFamily: verdanaFamily,
      fontColor: "#BEBEBE",
      fontSize: "16px",
      lineHeight: "28px",
      ...regularFont,
      "&::placeholder": {
        ...regularFont,
        fontFamily: "Source Sans 3",
        color: "#7A7A7A",
        fontSize: "160px",
        lineHeight: "28px",
      },
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  testAreaStyle: {
    borderRadius: "25px",
    border: "none",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    background: "#E6E7FF",
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
      color: "#7A7A7A",
      fontFamily: verdanaFamily,
      fontColor: "#BEBEBE",
      fontSize: "16px",
      lineHeight: "28px",
      ...regularFont,
      "&::placeholder": {
        ...regularFont,
        fontFamily: "Source Sans 3",
        color: "#7A7A7A",
        fontSize: "160px",
        lineHeight: "28px",
      },
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
    fontSize: "12px",
  },
  customSxSelectStyle: {
    height: "39px",
    borderRadius: "38px",
    width: "70px",
    fontFamily: "Verdana !important",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      color: "#7A81FD",
      marginTop: "-5px",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  inputLabel: {
    fontWeight: 500,
    display: "flex",
    color: "#6c6c6c",
    // fontColor: theme.palette.common.black + " !important",
    variant: "standard",
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
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  inputStyle: {
    borderRadius: "38px",
    curetColor: "black",
    background: sidebarColor,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "38px",
      color: "#ffffff",
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
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: ` 0 0 0 1000px  ${sidebarColor}  inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: `${sidebarColor} ! important`,
        "-webkit-text-fill-color": "#fff !important",
      },
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
    // for placeholder style at disbled button
    "& .Mui-disabled": {
      "& .MuiInputBase-input.MuiOutlinedInput-input": {
        "-webkit-text-fill-color": "#808080",
      },
    },
  },
  inputLabelStyle: {
    fontWeight: 500,
    color: "#ffffff",
    marginLeft: "4px",
    display: "flex",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
      fontSize: "11px",
    },
  },
} as const;
export default OnboardingStyles;
