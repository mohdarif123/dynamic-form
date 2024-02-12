import {
  getRelativeFontSize,
  inputLabelRequiredColor,
  pureWhiteColor,
} from "utils/styles";

const AddResponsesStyle = {
  mainWrapper: {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    borderRadius: "13px",
  },
  testStyle: {
    fontWeight: "600",
    fontSize: "20px",
  },
  nameField: {
    marginBottom: "0",
    display: "flex",
    marginLeft: "5px",
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: "10px !important",
  },
  inputLabel: {
    display: "flex",
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
  selectStyleDark: {
    "& .MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": "#808080",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    height: "47px",
    borderRadius: "38px",
    fontFamily: "Verdana !important",
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD",
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
    height: "47px",
    borderRadius: "38px",
    fontFamily: "Verdana !important",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": "#C1C1C1",
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD",
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
    color: "#F5FAFF",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
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
  CustomRequired: {
    color: inputLabelRequiredColor,
    marginLeft: "3px",
    fontSize: "12px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  submitButtonStyle: {
    width: "10%",
  },
} as const;

export default AddResponsesStyle;
