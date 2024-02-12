import {
  boldFont,
  getRelativeFontSize,
  lightTextColor,
  mainContainer,
  mediumFont,
  primaryColorBlack,
  primaryHeadingColor,
  primaryColorWhite,
  regularFont,
  textLightColor,
  theme,
  infoTextColor,
  primaryBackgroundColor,
  primaryColorPurple,
  primaryColorOrange,
  verdanaFamily,
  appColor,
  centerItemFlex,
} from "utils/styles";

const ticketsStyles = {
  mainSection: {
    ...mainContainer,
    marginTop: theme.spacing(2),
  },
  headerBackgroundColor: {
    backgroundColor: "#fcf5ff",
    padding: "8px 13px 18px 5px",
  },
  button: {
    padding: "0px 0px",
    width: "25%",
    backgroundColor: "#282945",
    "& .css-1kauyiq-MuiButtonBase-root-MuiTab-root": {
      maxWidth: "391px",
    },
  },
  dropzoneIconStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55px",
    width: "55px",
    borderRadius: "20px",
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "15px",
    },
    "& .css-mp38g9-MuiGrid-root .MuiDropzoneArea-root": {
      borderRadius: "37px",
    },
  },
  modalTitle: {
    ...mediumFont,
    textAlign: "center",
    color: "#ffffff",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
    color: "#ffffff",
  },
  centerItemFlex1: {
    ...centerItemFlex,
    flexDirection: "column",
    color: "#000000",
  },
  dialogFooter: {
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
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "25px",
      borderWidth: "3px",
      backgroundColor: "#F0ECFF",
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      height: "85px",
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
  testAreaStyle1: {
    width: "100%",
    borderRadius: "38px",
    borderColor: "#ffffff",
    background: appColor,
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    "& .MuiInputBase-input": {
      position: "relative",
      color: "#ffffff",
      fontSize: "16px",
      lineHeight: "28px",
      ...regularFont,
      fontFamily: "Source Sans 3",
      "&::placeholder": {
        ...regularFont,
        fontFamily: "Source Sans 3",
        fontSize: "16px",
        lineHeight: "28px",
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "38px",
      color: "#ffffff",
      fontFamily: verdanaFamily,
      fontSize: "16px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  testAreaLightStyle: {
    width: "100%",
    borderRadius: "38px",
    borderColor: "#ffffff",
    background: "#E6E7FF",
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      position: "relative",
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
      color: "#ffffff",
      fontFamily: verdanaFamily,
      fontSize: "16px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  label: {
    marginBottom: "8px",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "28.48px",
  },
  button2: {
    padding: "0px 0px",
    width: "100%",
    borderBottom: "1px solid #7A81FD",
    backgroundColor: "#282945",
  },
  label1: {
    marginBottom: "8px",
    color: "#000000",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "28.48px",
  },
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  headerBox: {
    background: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {},
  },
  mainBox: {
    padding: "15px 30px",
  },
  ticketsText: {
    ...boldFont,
  },
  heading: {
    ...boldFont,
    margin: "32px 0 8px 0",
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },
  outerTabBox: {
    borderBottom: "none",
    marginTop: "8px",
  },
  tab: {
    "& .MuiButtonBase-root-MuiTab-root": {
      padding: "12px 2px",
    },
  },
  tabBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px",
    borderRadius: "10px",
    height: "40px",
    width: "100%",
  },
  active: {
    backgroundColor: "#F0ECFF",
    color: "#F9F9F9",
    textDecoration: "none",
  },
  inActive: {
    backgroundColor: "#F9F9F9",
    color: "#828282",
  },
  tabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...mediumFont,
    marginLeft: theme.spacing(1),
    textTransform: "none",
  },
  counts: {
    marginLeft: theme.spacing(2),
    opacity: "0.5",
    marginRight: theme.spacing(1),
  },

  searchIcon: {
    marginLeft: theme.spacing(1),
  },

  alignmentStyle: {
    display: "flex",
    alignItems: "center",
    marginRight: "8px",
  },

  input: {
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
      fontFamily: "Verdana",
      "&::placeholder": {
        ...mediumFont,
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
      height: "47px",
      border: "1px solid #E7E7E7",
      [theme.breakpoints.down("md")]: {
        marginTop: theme.spacing(3),
      },
    },
  },
  outerBox: {
    width: "95px",
  },

  iframeTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(7),
  },

  btnBox: {
    color: "white",
    textTransform: "none",
    justifyContent: "space-between",
  },
  addBox: {
    background: "#4F31BC",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    color: "#FFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  titleWrapper: {
    height: "100px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  },

  drawerTitle: {
    color: "#212121",
    ...boldFont,
    fontSize: getRelativeFontSize(10),
  },

  cancelButtonStyle: {
    background: "none",
    border: "1px solid",
    color: primaryColorPurple,
    borderColor: primaryBackgroundColor,
    "&:hover": {
      background: "none",
    },
  },
  closeButton: {
    background: "none",
    color: textLightColor,
    border: "none",
    "&:hover": {
      background: "none",
    },
  },
  bodyWrapper: {
    marginTop: "20px",
    paddingBottom: "50px",
  },

  dropDownStyle: {
    backgroundColor: primaryColorWhite,
    height: "47px",
    padding: "2px",
    minWidth: "100%",
    borderRadius: "12px",

    ...regularFont,
  },

  optionStyle: {
    ...regularFont,
  },

  titleBodyWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },

  bodyTitle: {
    color: "#1A0224",
    fontSize: getRelativeFontSize(8),
    ...boldFont,
  },

  bodyText: {
    ...regularFont,
    color: lightTextColor,
    wordBreak: "break-word",
  },

  spanBold: {
    ...boldFont,
    marginRight: "10px",
  },

  spanComments: {
    ...mediumFont,
    marginLeft: "5px",
    wordBreak: "break-word",
  },

  ticketInfoText: {
    ...regularFont,
    display: "flex",
    alignItems: "flex-start",
    marginTop: "10px",
  },

  commentWrapper: {
    borderRadius: "20px",
    backgroundColor: "#F8F8F8",
    marginBottom: "10px",
    padding: "15px",
    wordBreak: "break-word",
  },

  commentBy: {
    ...boldFont,
  },

  dotSeparate: {
    backgroundColor: "#9a9a9a",
    height: "7px",
    width: "7px",
    borderRadius: "50%",
    marginRight: "10px",
    marginLeft: "10px",
  },

  commentDate: {
    ...boldFont,
    fontSize: "14px",
    color: infoTextColor,
  },

  listWrapper: {
    "& .listItem:before ": {
      content: "-",
    },
  },

  uploadFileTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(4),
  },
  uploadFileName: {
    ...regularFont,
    color: lightTextColor,
  },

  uploadGroup: {
    display: "flex",
  },

  uploadWrapper: {
    display: "flex",
    flexDirection: "column",
    background: "#F8F8F8",
    padding: "15px",
    borderRadius: "20px",
  },

  fileNotFoundWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
  },

  fileNotFoundText: {
    ...mediumFont,
    color: infoTextColor,
  },

  uploadFile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },

  buttonStyle: {
    width: 0,
    background: "none",
    color: primaryColorBlack,
    outline: "none",
    border: "none",
    boxShadow: "none",
    fontSize: getRelativeFontSize(2),
    "&:hover": {
      background: "none",
    },
  },

  uploadButtons: {
    display: "flex",
    gap: "20px",
  },

  inputLabel: {
    ...boldFont,
    marginBottom: "10px",
  },

  checkLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: "-6px",
    "& .css-ahj2mt-MuiTypography-root": {
      ...mediumFont,
    },
  },

  star: {
    color: primaryColorOrange,
    ...boldFont,
  },

  testAreaStyle: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
    },
  },

  testAreaStyleError: {
    padding: "10px ",
    borderRadius: "12px",
    borderColor: primaryColorOrange,
  },

  titleStyle: {
    ...mediumFont,
    color: primaryColorPurple,
    padding: "0",
    fontSize: "14px",
    wordBreak: "break-all",
    minWidth: "150px",
  },

  paperStyle: {
    gap: "10px",
    borderRadius: "0",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
  },

  chipStyle: {
    background: primaryColorPurple,
    textTransform: "uppercase",
    ...boldFont,
    display: "flex",
    justifyContent: "center",
  },

  errorStyle: {
    paddingLeft: "15px",
  },
} as any;

export default ticketsStyles;
