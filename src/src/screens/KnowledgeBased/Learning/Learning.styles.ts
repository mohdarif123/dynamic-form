import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  regularFont,
  theme,
} from "utils/styles";

const LearningStyle = {
  heading: {
    [theme.breakpoints.up("xl")]: {
      fontSize: "28px",
    },
  },
  searchBoxWrapper: {
    width: {
      xl: "250px",
      lg: "200px",
      md: "200px",
      sm: "200px",
      xs: "260px",
    },
    [`@media screen and (max-width: ${324}px)`]: {
      width: "190px",
    },
  },
  buttonWrapper: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
  exportButtonStyle: {
    width: { xl: "150px", lg: "140px", md: "120px", sm: "100px", xs: "90px" },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
  },
  tableTextStyle: {
    fontWeight: 400,
  },
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  dropDownStyle: {
    fontFamily: "Verdana !important",
    minWidth: "150px",
    height: "47px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  labelText: {
    color: "#ffffff",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    ...regularFont,
    marginRight: "12px",
    fontSize: "12px",
  },
  inputLabel: {
    display: "flex",
    color: "#212121",
    fontSize: getRelativeFontSize(7),
    fontColor: theme.palette.common.black + " !important",
    variant: "standard",
    ...boldFont,
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
  labelText1: {
    color: "#000000",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  dropDownStyle1: {
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#000000",
    },
    height: "47px",
    // background: "#282945",
    border: "1px solid #C1C1C1",
    background: "#fff",
    fontFamily: "Verdana !important",
    borderRadius: "34px",
    width: "100%",
    "& .MuiInputBase-input": {
      borderColor: "#ffffff",
      fontSize: getRelativeFontSize(),
    },
  },
  dropDownStyleExport: {
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "white",
    },
    height: "47px",
    fontFamily: "Verdana !important",
    borderRadius: "34px",
    // background: "#282945",
    background: "#14142D",
    width: "100%",
    "& .MuiInputBase-input": {
      // borderColor: appColor,
      // background: "#282945",
      fontSize: getRelativeFontSize(),
    },
  },
} as const;
export default LearningStyle;
