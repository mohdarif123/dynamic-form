import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  regularFont,
  theme,
} from "utils/styles";

const MonthlyReportsStyle = {
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
  buttonWrapper: {
    display: "flex",
    mb: 1,
    gap: 1,
    "@media (max-width: 960px)": {
      flexWrap: "wrap",
    },
  },
  labelText: {
    color: "#ffffff",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  labelText1: {
    color: "#000000",
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
  tableStyle: {
    overflow: "auto",
    mt: 2,
  },
  headertableStyle: {
    ...boldFont,
    fontSize: getRelativeFontSize(5),
    display: "flex",
    justifyContent: "center",
  },
  headertableStyleName: {
    ...boldFont,
  },
  headertableStylescrapped: {
    ...mediumFont,
    fontSize: getRelativeFontSize(5),
  },
  headertableStylesky: {
    color: "#7A81FD",
    ...boldFont,
    display: "flex",
    justifyContent: "center",
    fontSize: getRelativeFontSize(6),
    cursor: "pointer",
  },
  dropDownStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#7A81FD",
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
  inputClass: {
    border: "none",
  },
  lableSecondClass: {
    color: "#ffffff",
  },
  datePicker: {
    backgroundColor: "rgb(55, 56, 84)",
    borderRadius: "36px",
    width: "50%",
    "& .css-o17ie0-MuiPaper-root": {
      backgroundColor: "red",
      background: "red",
    },
  },
};
export default MonthlyReportsStyle;
