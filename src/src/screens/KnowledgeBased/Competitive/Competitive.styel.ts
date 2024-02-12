import {
  appColor,
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  lightDropDownColor,
  mediumFont,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  skyPrimaryColor,
  theme,
  verdanaFamily,
} from "utils/styles";

const CompetitiveStyle = {
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  searchBoxWrapper: {
    width: {
      xl: "250px",
      lg: "200px",
      md: "200px",
      sm: "200px",
      xs: "260px",
    },
    [`@media screen and (max-width: ${320}px)`]: {
      width: "190px",
    },
  },
  inputLable: { display: "flex" },
  headerWrapper: {
    display: "flex",
    mb: 1,
    // alignContent: "center",
    alignItems: "center",
    // gap: 3,
    // pt: 3,
    // pl: 3,
  },
  textField: {
    width: "100%",
    borderRadius: "38px",
    background: appColor,
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        fontWeight: 500,
        fontFamily: verdanaFamily,
      },
    },

    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      fontSize: "14px",
      borderRadius: "38px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: "#40a9ff",
      },
      color: "#CBCBCB !important",
    },
  },
  textField1: {
    width: "100%",
    borderRadius: "38px",
    background: "#ffffff",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        fontWeight: 500,
        fontFamily: verdanaFamily,
      },
    },

    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      fontSize: "14px",
      borderRadius: "38px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: "#40a9ff",
      },
      color: "#000000 !important",
    },
  },
  labelcontact: {
    ...boldFont,
    display: "flex",
  },
  labelText: {
    color: "#ffffff",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  inputLightStyle: {
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
      color: "red",
      fontFamily: verdanaFamily,
      fontColor: "#BEBEBE",
      fontSize: "14px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
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
  inputDarkStyle: {
    borderRadius: "38px",
    background: appColor,
    width: "100%",
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: ` 0 0 0 1000px  ${appColor}  inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: `${appColor} ! important`,
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
  labelText1: {
    color: "#000000",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  typeStar: {
    color: inputLabelRequiredColor,
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: "10px !important",
  },
  nameField: {
    marginBottom: "0",
    display: "flex",
  },
  headerText: {
    color: "#13b4ca",
    lineHeight: "36px",
    fontWeight: " 600",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  viewHeaderStyle: {
    borderRadius: "37px",
  },
  submitButtonStyle: {
    width: "20%",
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
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "37px",
      borderWidth: "3px",
      backgroundColor: "#F0ECFF",
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
  dialogFooter: {
    width: "100%",
    display: "flex",
    alignItem: "center",
    marginTop: "20px",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
    "& button": {
      width: "120px",
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
    width: "95%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "20px",
      backgroundColor: "#F0ECFF",
      borderRadius: "37px",
    },
  },
  addBtnStyle: {
    width: "20%",
    whiteSpace: "nowrap",
  },
  titleRight: {
    color: "#ffffff",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  titleRight1: {
    color: "#000000",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    textAlign: "center",
  },
  testAreaStyle: {
    width: "100%",
    // borderColor: appColor,
    borderRadius: "37px",
    height: "46px",
    background: sidebarColor,
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      // borderRadius: "12px !important",
    },
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
  testAreaStyleComment: {
    width: "100%",
    borderRadius: "37px",
    height: "100px",
    background: appColor,
    "& .MuiOutlinedInput-root": {
      borderRadius: "38px",
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
      color: "#fff",
      fontSize: "16px",
      lineHeight: "28px",
      ...regularFont,
      fontFamily: "Source Sans 3",
      "&::placeholder": {
        ...regularFont,
        fontFamily: "Source Sans 3",
        color: "white",
        fontSize: "16px",
        lineHeight: "28px",
      },
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  commentInfo: {
    backgroundColor: "#282844",
    borderBottomLeftRadius: "34px",
    borderBottomRightRadius: "34px",
  },
  commentInfo1: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: "34px",
    borderBottomRightRadius: "34px",
  },
  testAreaStyleComment1: {
    width: "100%",
    borderRadius: "37px",
    height: "100px",
    background: "#E6E7FF",
    color: "#000000",
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },

  testAreaStyle1: {
    width: "100%",
    // borderColor: "#ffffff",
    background: "#ffffff",
    borderRadius: "37px",
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      borderRadius: "12px !important",
    },
  },
  inputLabel: {
    fontWeight: 500,
    display: "flex",
    color: "#ffffff",
    marginLeft: "7px",
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
  inputFlexStyle: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  inputLabel1: {
    fontWeight: 500,
    display: "flex",
    color: "#000000",
    marginLeft: "7px",
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
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: appColor,
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#7A81FD",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  dropDownStyle1: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: lightDropDownColor,
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#7A81FD",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  buttonContainer: {
    display: "flex",
    spacing: 2,
    gap: 2,
    [theme.breakpoints.down("lg")]: {
      marginTop: "10px",
    },
  },
  titleStyle: {
    fontWeight: 600,
  },
  titleStyleheading: {
    fontWeight: 700,
  },
  innerWrapper: {
    borderBottom: "1.2px dashed #FFFFFF",
    color: "white",
    background: "#7A81FD",
    fontSize: "23px",
    height: "60px",
  },
  normalStyleheader: {
    ml: 1,
  },
  iconBoxStyle: {
    border: "1px solid transparent",
    padding: "10px 9px 9px 8px",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: skyPrimaryColor,
    // backgroundColor: "#d0f0f4",
    // "&:hover": {
    //   backgroundColor: "white",
    //   borderColor: lowSkyPrimaryColor,
    // },
  },
  titleStyleBody: {
    marginLeft: "7px",
    fontWeight: 600,
  },
  titleInnerBody: {
    ml: 2,
  },
  titleBody: {
    ...boldFont,
    padding: "9px",
    ml: 2,
  },
  mainContainer: {
    marginTop: "10px",
  },
  createCampaignInnerWrapper: {
    padding: "10px",
    // background: "#f6fcff",
    background: "none",
    height: "100%",
    minHeight: "90vh",
    margin: "0 10px",
  },
  stepHeader: {
    height: "100px",
    padding: "0 23px",
    background: "White",
  },
  button: {
    padding: "0px 0px",
    width: "25%",
    backgroundColor: "#282945",
  },
  tabWidth: {
    "& .css-18tds51-MuiGrid-root": {
      maxWidth: "11.9%",
    },
  },
  tabWidth1: {
    overflow: "auto",
    "& .css-18tds51-MuiGrid-root": {
      maxWidth: "100%",
    },
  },
  stepperResponsive: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  agencyInfo: {
    backgroundColor: appColor,
    borderBottomLeftRadius: "34px",
    borderBottomRightRadius: "34px",
  },
  agencyInfo1: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: "34px",
    borderBottomRightRadius: "34px",
  },
  normalStyle: {
    fontWeight: 400,
  },
  modalTitle: {
    ...boldFont,
  },
  textStyle: {
    fontWeight: 400,
  },
  // dropDownStyle: {
  //   minWidth: "150px",
  //   width: "100%",
  //   height: "47px",
  //   fontFamily: "Verdana !important",
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: "12px",
  //   "& .MuiInputBase-input": {
  //     borderColor: "#4B0150",
  //     fontSize: getRelativeFontSize(),
  //   },
  // },
  // delete modal css
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  fontText: {
    ...regularFont,
  },
  deleteModalTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(6),
    textAlign: "center",
  },
  deleteDialogFooter: {
    ...centerItemFlex,
    gap: "10px",
    width: "100%",
    display: "flex",
    pb: 2,
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
    "&:hover": {
      background: "none",
    },
  },
  // viewcompetitive style
  mainWrapper: {
    borderRadius: "13px",
    mt: 11,
    // mx: 2,
  },
  tableWrapper: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  // viewcompetitive delete modal
} as const;
export default CompetitiveStyle;
