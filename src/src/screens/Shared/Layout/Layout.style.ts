import {
  appColor,
  boldFont,
  cornflowerBlueColor,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pinkDarkColor,
  primaryBackgroundColor,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  theme,
  verdanaFamily,
  warningColor,
} from "utils/styles";

const layoutStyles = {
  mainWrapper: {
    width: "100%",
    // height:"100vh",
    height: {
      xs: "calc(100vh - 35px)",
      sm: "calc(100vh - 35px)",
      md: "calc(100vh - 35px - 55px)",
      lg: "calc(100vh - 35px)",
      xl: "calc(100vh - 35px)",
      [`@media screen and (max-width: ${1390}px)`]: {
        height: "calc(100vh - 35px)",
      },
    },
    
  },
  logoBox: {
    display: "flex",
    cursor: "pointer",
    height: "50px",
    width: "60px",
  },
  content: {
    width: "100%",
    height: "100vh",
    overflowX: "auto",
    backgroundColor: primaryBackgroundColor,
  },
  root: {
    display: "flex",
    position: "absolute",
    width: "100%",
    height: "100vh",
  },
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "70px",
      fontSize: "12px",
      borderRadius: "10px",
      borderWidth: "3px",
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
  logoButton: {
    width: "55px",
    height: "45px",
  },
  logOutWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
    [theme.breakpoints.down("xl")]: {},
  },
  warningContent: {
    color: warningColor,
    fontSize: getRelativeFontSize(),
    margin: "10px 0",
    ...mediumFont,
  },
  supportTicket: {
    position: "absolute",
    right: "25px",
    bottom: "5px",
    marginBottom: "25px",
    cursor: "pointer",
  },
  supportTicketClose: {
    position: "absolute",
    right: "10px",
    zIndex: "1",
  },
  supportTicketIcon: {
    position: "relative",
    marginBottom: "10px",
  },
  supportTicketTitleWrapper: {
    width: "100%",
    background: "#FCF5FF",
    display: "flex",
    justifyContent: "center",
    "& img": {
      [theme.breakpoints.down("lg")]: {
        width: "50%",
      },
    },
  },
  supportTicketTitle: {
    textAlign: "center",
    ...boldFont,
    color: "#ffffff",
    fontSize: getRelativeFontSize(14),
  },
  supportTicketTitle1: {
    textAlign: "center",
    ...boldFont,

    fontSize: getRelativeFontSize(14),
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "5px",
    },
  },
  label: {
    marginBottom: "4px",
    marginLeft: "4px",
  },
  label1: {
    marginBottom: "4px",
    marginLeft: "4px",
    color: "#ffffff",
  },
  dropZoneWrapperDoc: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "25px",
      borderWidth: "3px",
      background: "#F0ECFF",
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      height: "77px",
      width: "70px",
      marginLeft: "50px",
      borderRadius: "25px",
      background: "white",
      color: "#7A81FD",
      margin: "15px",
      paddingLeft: "26px",
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
  dropDownLightStyle: {
    height: "47px",
    color: "#F5FAFF",
    width: "100%",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    fontFamily: "Verdana !important",
    borderRadius: "38px",
    backgroundColor: "#ffffff",
    border: "1px solid #C1C1C1",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "black",
    },
  },
  dropDownStyle: {
    height: "47px",
    color: "#F5FAFF",
    width: "100%",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    fontFamily: "Verdana !important",
    borderRadius: "38px",
    backgroundColor: appColor,
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  dropDownStyle1: {
    height: "47px",
    borderRadius: "12px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: "#ffffff",
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
    fontSize: "12px",
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
  selectStyle: {
    width: "100%",
    height: "45px",
    borderRadius: "10px",
    ...mediumFont,
    "&.Mui-focused fieldset": {
      // borderColor: "#4B0150 !important",
      border: "0px",
    },
    backgroundColor: appColor,
  },
  selectStyleLight: {
    height: "42px",
    borderRadius: "38px",
    fontFamily: "Verdana !important",
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD",
    },

    ".MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
      "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
        color: pureWhiteColor,
      },
    },
  },
  optionStyle: {
    ...mediumFont,
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
  testAreaStyleError: {
    borderColor: warningColor,
    borderRadius: "12px",
    background: "none",
    padding: "10px",
  },
  submitButton: {
    width: "110px",
  },
  previewChip: {
    marginTop: 1,
    padding: "15px 0px",
    justifyContent: "space-between",
    "& .MuiChip-deleteIcon": {
      color: "white",
    },
  },
  previewChipLight: {
    marginTop: 1,
    padding: "15px 0px",
    justifyContent: "space-between",
  },
  errorStyle: {
    paddingLeft: "15px",
  },
  styledrop: {
    color: "#FFFFFF",
    fontSize: "12px",
    borderRadius: "34px",
    fontWeight: 200,
    "&:hover": {
      "&& fieldset": {
        border: "3px solid green",
      },
    },
  },
  nameText: {
    fontWeight: 700,
    display: "flex",
    justifyContent: "end",
    wordBreak: "break-all",
  },
  roleText: {
    fontWeight: 200,
    display: "flex",
    wordBreak: "break-all",
    justifyContent: "end",
    // mr: 2.6,
    mt: 0.3,
  },
  squareBox: {
    width: "35px",
    height: "35px",
    borderRadius: "20px",
    background: "rgb(122, 129, 253)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  squareProfileBox: {
    width: "80px",
    height: "80px",
    borderRadius: "60px",
    background: "#DBDBDB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuMobile: {
    width: "100vw",
  },
  avatarStyle: {
    ...boldFont,
  },
  styleTExt: {
    "& .MuiPopover-paper": {
      borderRadius: "16px",
    },
  },
  cardToggleContent: {
    padding: "15px 15px 15px 30px",
    gap: 2,
    background: "#8388FF",
    color: pureWhiteColor,
    width: "140px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none !important",
    // height: "180px",
    "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
      backgroundColor: "black !important",
    },
  },
  hamberStyle: {
    [`@media screen and (min-width: ${360}px)`]: {
      ml: 4,
    },
  },
  cardToggleTextWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    // margin: "5px",
  },
  ToggleContent: {
    fontWeight: 400,
    lineHeight: "27px",
    cursor: "pointer",
    wordBreak: "break-all",
  },
  ToggleContentColor: {
    color: pinkDarkColor,
  },
  keyboardIconStyle: {
    color: cornflowerBlueColor,
    marginTop: "5px",
    cursor: "pointer",
  },
} as const;

export default layoutStyles;
