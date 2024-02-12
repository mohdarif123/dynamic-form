import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pureWhiteColor,
  semiTransparentBlack,
  semiTransparentWhite,
  sidebarColor,
  skyPrimaryColor,
  theme,
} from "utils/styles";

const ViewProposalStyles = {
  headerText: {
    color: "#13b4ca",
    lineHeight: "36px",
    fontWeight: 600,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  label: {
    marginBottom: "8px",
    color: pureWhiteColor,
    fontWeight: 500,
  },
  label1: {
    marginBottom: "8px",
    color: "#000000",
    fontWeight: 500,
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "5px",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  iconStyle: {
    border: "1px solid transparent",
    padding: "10px 9px 9px 8px",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: skyPrimaryColor,
  },
  responseTabIcon: {
    border: "1px solid transparent",
    borderRadius: "10px",
    padding: "14px 17px 7px 17px",
    cursor: "pointer",
  },
  tabWidth1: {
    overflow: "auto",
    "& .MuiGrid-root": {
      maxWidth: "100%",
    },
  },
  button: {
    padding: "0px 0px",
    width: "27%",
    backgroundColor: "#282945",
    maxWidth: "25%",
  },
  buttonDocumentTab: {
    padding: "0px 0px",
    width: "50%",
    backgroundColor: "#282945",
    maxWidth: "50%",
  },
  // view proposal card style
  mainWrapper: {
    minHeight: "405px",
    borderRadius: "15px",
    // background: appColor,
  },
  viewProposalheader: {
    borderRadius: "37px",
  },
  textStyleHeader: {
    color: pureWhiteColor,
    fontWeight: 700,
  },
  textStyleHeader1: {
    color: "#000000",
    fontWeight: 700,
  },
  innerTextHeader: {
    color: pureWhiteColor,
    ml: 1,
  },
  innerTextHeader1: {
    color: "#000000",
    ml: 1,
  },
  innerWrapper: {
    borderBottom: `1.5px dashed ${semiTransparentWhite}`,
    color: "white",
    marginTop: "8px",
    padding: "10px",
  },
  innerWrapper1: {
    borderBottom: `1.5px dashed ${semiTransparentBlack}`,
    color: "white",
    marginTop: "8px",
    padding: "10px",
  },
  tableStyle: {
    width: "100%",
    overflow: "auto",
    minWidth: "300px",
    pt: 1,
    "&::-webkit-scrollbar": {
      width: "10",
      display: "none",
    },
  },
  textStyle: {
    fontWeight: 700,
    textTransform: "capitalize",
  },

  textStyle1: {
    fontWeight: 700,
    textTransform: "capitalize",
    color: "#000000",
  },
  contactInformationButtonStyle: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: "10",
      display: "none",
    },
  },
  cardStyle: {
    borderRight: "1px solid rgba(255, 255, 255, 0.18)",
    [theme.breakpoints.down("md")]: {
      mt: 3,
    },
  },
  contactCardStyle: {
    [theme.breakpoints.down("lg")]: {
      mt: 3,
    },
    [theme.breakpoints.down("md")]: {
      mt: 3,
    },
  },
  cardStyleGeneral: { background: "#282945", borderRadius: "0 0px 36px 36px" },
  cardStyleGeneral1: { background: "#ffffff", borderRadius: "0 0px 36px 36px" },
  tasksTableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  // awardUpdateTab style
  awardCardStyle: {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    borderRadius: "12px",
  },
  titleRight: {
    color: "#ffffff",
    ...boldFont,
  },
  dialogFooter: {
    width: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
    "& button": {
      width: "120px",
    },
  },
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    textAlign: "center",
  },
  innerBoxCard: {
    minHeight: "350px",
  },
  awardTextStyle: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "35px",
    whiteSpace: "noWrap",
  },
  awardTextStyle1: {
    color: "#000000",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "35px",
    whiteSpace: "noWrap",
  },
  innerTextStye: {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "16px",
    minWidth: "200px",
    maxWidth: "200px",
    display: "inline-block",
  },
  innerTextStye1: {
    color: "#000000",
    fontWeight: 600,
    fontSize: "16px",
    minWidth: "200px",
    maxWidth: "200px",
    display: "inline-block",
  },
  innerTextBox: {
    display: "flex",
    mt: 3,
  },
  headingText: {
    color: "#2f2f2f",
    fontSize: "22px",
    fontWeight: "500",
    lineHeight: "35px",
    whiteSpace: "noWrap",
  },
  headingTextInfo: {
    color: "#2f2f2f",
    fontWeight: 600,
    lineHeight: "32px",
    whiteSpace: "noWrap",
  },
  inputLabel: {
    display: "flex",
    color: "#ffffff",
    fontSize: getRelativeFontSize(5),
    fontColor: theme.palette.common.black + " !important",
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
  inputLabel1: {
    display: "flex",
    color: "#000000",
    fontSize: getRelativeFontSize(5),
    fontColor: theme.palette.common.black + " !important",
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
  dropDownStyle: {
    height: "47px",
    color: "#F5FAFF",
    fontFamily: "Verdana !important",
    borderRadius: "38px",
    backgroundColor: "#282945",
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
    color: "#F5FAFF",
    fontFamily: "Verdana !important",
    borderRadius: "38px",
    backgroundColor: "#ffffff",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  dropzoneLight: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "37px",
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
  dropZoneWrapperDoc: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "37px",
      borderWidth: "3px",
      backgroundColor: sidebarColor,
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
  inputLable: { display: "flex" },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "20px",
      backgroundColor: "#373854",
      borderRadius: "37px",
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
  // general tab  style
  cardTextStyleHeaders: {
    fontWeight: 600,
    color: pureWhiteColor,
    minWidth: "150px",
    maxWidth: "150px",
    display: "inline-block",
  },
  cardTextStyleHeaders1: {
    fontWeight: 600,
    color: "#000000",
    minWidth: "150px",
    maxWidth: "150px",
    display: "inline-block",
  },
  iconsStyle: {
    width: "50px",
    backgroundColor: "#ffffff",
    height: "50px",
    cursor: "pointer",
    marginLeft: "7px",
  },
} as const;

export default ViewProposalStyles;
