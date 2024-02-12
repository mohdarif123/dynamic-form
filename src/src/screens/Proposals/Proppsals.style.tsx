import {
  appColor,
  boldFont,
  buttonWhiteBg,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  lightDropDownColor,
  mediumFont,
  pureWhiteColor,
  purplePrimaryColor,
  regularFont,
  sidebarColor,
  skyPrimaryColor,
  theme,
  verdanaFamily,
} from "../../utils/styles";

const ProposalStyles = {
  heading: {
    [theme.breakpoints.up("xl")]: {
      fontSize: "28px",
    },
  },
  popOverListItem: {
    padding: "10px 10px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
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
  assigneePaper: {
    borderRadius: "36px",
  },
  ViewPopOverWrapper: { backgroundColor: appColor, borderRadius: "24px" },
  ViewPopOverWrapper1: { backgroundColor: "#ffffff", borderRadius: "24px" },
  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Verdana !important",
      padding: "0, 9px",
      height: "47px",
      borderRadius: "12px !important",
      "&.Mui-focused fieldset": {
        borderColor: "#282945",
      },
    },
  },

  lableSecondClass: {
    color: "#ffffff",
  },
  stepperHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(2),
    color: "#474747",
  },
  stepperDesc: {
    ...regularFont,
    color: "#ffffff",
    fontSize: getRelativeFontSize(),
    maxWidth: "140px",
  },
  stepColors: {
    ...regularFont,
    "& .MuiStepLabel-root .Mui-active": {
      color: "#8569BB ",
    },
    "& .MuiStepLabel-root .Mui-completed": {
      color: "#8569BB ", // circle color (COMPLETED)
    },
  },
  inputFlexStyle: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  inputLabel1: {
    display: "flex",
    // color: "rgba(0, 0, 0, 0.85)",
    fontWeight: 500,
    color: "#000000",
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
    borderRadius: "25px",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
      marginTop: "-5px",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  inputLabel: {
    display: "flex",
    // color: "rgba(0, 0, 0, 0.85)",
    fontWeight: 500,
    color: "#ffffff",
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
  textField: {
    borderRadius: "38px",
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
  textField1: {
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
  labelText: {
    fontWeight: 500,
    color: "#ffffff",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  labelText1: {
    fontWeight: 500,
    color: "#000000",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  inputLable: { display: "flex" },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "5px",
    fontSize: "12px",
  },
  select: {
    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "34px",
      fontFamily: "Verdana !important",
      fontSize: "15px",

      "&.Mui-focused fieldset": {
        borderColor: "#282945",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    ...regularFont,
    fontSize: "12px",
    marginLeft: "2px",
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
    height: "42px",
    borderRadius: "38px",
    fontFamily: "Verdana !important",
    // "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
    //   color: "#ffffff",
    // },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
      "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
        color: pureWhiteColor,
      },
    },
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
  dropDownStyle: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    color: "#ffffff",
    background: "#373854",
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
  dropDownStyledocument: {
    height: "47px",
    borderRadius: "12px",
    fontFamily: "Verdana !important",
    width: "100%",
    color: "#ffffff",
    background: "#ffffff",
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  dropDownStyle1document: {
    height: "47px",
    borderRadius: "12px",
    fontFamily: "Verdana !important",
    width: "100%",
    color: "#ffffff",
    background: "#282945",
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  dropDownStyle1: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: lightDropDownColor,
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#373854",
    },
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
  titleStyle: {
    color: skyPrimaryColor,
    fontWeight: 600,
    cursor: "pointer",
  },
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    textAlign: "center",
  },
  dialogContent: {
    fontSize: getRelativeFontSize(2),
    ...mediumFont,
    textAlign: "center",
    "& span": {
      ...boldFont,
    },
  },
  dialogFooter: {
    width: "100%",
    marginBottom: "20px",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    mt: 3,
    gap: 2,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
    gap: 2,
  },
  buttonWrapperStyle: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },
  buttonWhiteBg: {
    background: "none",
    border: "1px solid",
    borderColor: buttonWhiteBg,
    color: purplePrimaryColor,
    "&:hover": {
      background: "none",
    },
  },
  titleRight: {
    color: "#ffffff",
    ...boldFont,
  },
  titleRight1: {
    color: "#000000",
    ...boldFont,
  },
  stepHeader: {
    height: "120px",
    padding: "0 23px",
    background: "White",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  stepperResponsive: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  mainContainer: {
    // marginTop: "20px",
  },
  stepperWrapper: {
    overflow: "auto",
    backgroundColor: "#7A81FD",
    [theme.breakpoints.up("sm")]: {
      ...centerItemFlex,
    },
    [theme.breakpoints.down("lg")]: {
      height: "50px",
    },
  },
  createCampaignInnerWrapper: {
    padding: "10px",
    background: "none",
    height: "100%",
    margin: "0 10px",
  },
  submitButtonStyle: {
    width: "20%",
  },
  addBtnStyle: {
    width: "20%",
    whiteSpace: "nowrap",
  },
  textAreaInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "5px",
    },
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "20px",
      backgroundColor: "#373854",
      borderRadius: "37px",
    },
  },
  formInput1: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "37px",
    },
  },
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  label: {
    marginBottom: "8px",
    fontWeight: 500,
  },
  labelcontact: {
    ...boldFont,
    display: "flex",
  },
  commentStyle: {
    marginLeft: {
      lg: "70px",
      xl: "0px",
    },
  },
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "43vh",
      height: "11vh",
      fontSize: "12px",
      borderRadius: "37px",
      borderWidth: "3px",
    },
    "& .MuiDropzoneArea-icon": {
      height: "65px",
      width: "75px",
      textAlign: "center",
      marginTop: "9px",
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
  buttonStyle: {
    [theme.breakpoints.down("xl")]: {
      marginTop: "7px",
    },
  },
  // delete modal css
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  fontText: {
    ...regularFont,
  },
  modalTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(6),
    textAlign: "center",
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
  testAreaLight: {
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
  testAreaDark: {
    borderRadius: "38px",
    color: "#ffffff",
    backgroundColor: "#373854",
    width: "100%",
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
      borderRadius: "38px",
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
  // for add task modal css
  textFieldLight: {
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
  textFieldDark: {
    borderRadius: "38px",
    background: "#373854",
    width: "100%",
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px #373854 inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: "#373854 ! important",
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
    // "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    //   backgroundColor: "#282945",
    //   color: "#BEBEBE",
    // },
  },
  commentLightStyle: {
    background: "#E6E7FF",
    "& .MuiInputBase-input": {
      height: "100px",
    },
  },
  commentDarkStyle: {
    background: "#373854",
    "& .MuiInputBase-input": {
      height: "100px",
    },
  },
  dropzoneLight2: {
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
  dropzoneLight: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      height: { xl: "11vh", lg: "12vh" },
      fontSize: "12px",
      borderRadius: "30px",
      borderWidth: "3px",
      background: "#F0ECFF",
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      height: "70px",
      width: "70px",
      marginLeft: "50px",
      borderRadius: "25px",
      background: "white",
      color: "#7A81FD",
      margin: "15px",
      paddingLeft: "26px",
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
  dropzoneDark: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      height: { xl: "11vh", lg: "12vh" },
      fontSize: "12px",
      borderRadius: "30px",
      background: "#F0ECFF",
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      height: "70px",
      width: "70px",
      marginLeft: "50px",
      borderRadius: "25px",
      background: "white",
      color: "#7A81FD",
      margin: "15px",
      paddingLeft: "26px",
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
} as const;

export default ProposalStyles;
