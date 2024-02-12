import {
  getRelativeFontSize,
  inputLabelRequiredColor,
  lightDropDownColor,
  pureWhiteColor,
} from "utils/styles";

const AddResponsesModalStyle = {
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
  CustomRequired: {
    color: inputLabelRequiredColor,
    marginLeft: "3px",
    fontSize: "12px",
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
    backgroundColor: "#373854",
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
    ".MuiOutlinedInput-notchedOutline": { border: "black" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    fontFamily: "Verdana !important",
    borderRadius: "38px",
    // backgroundColor: lightDropDownColor,
    border: "1px solid #C1C1C1",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
    "& .css-1e49gll-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":
      {
        color: "black",
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
  selectStyleDark: {
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    height: "42px",
    borderRadius: "38px",
    fontFamily: "Verdana !important",
    // "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
    //   // color: "#ffffff",
    // },
    ".MuiSvgIcon-root ": {
      fill: pureWhiteColor,
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
      fill: "#383A51",
    },
    // ".MuiOutlinedInput-notchedOutline": {
    //   borderColor: pureWhiteColor,
    // },
    // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //   borderColor: pureWhiteColor,
    // },
    // "&:hover .MuiOutlinedInput-notchedOutline": {
    //   borderColor: pureWhiteColor,
    // },
    "& .MuiInputBase-input": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
      "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
        color: pureWhiteColor,
      },
    },
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "end",
  },
  submitButtonStyle: {
    width: "10%",
  },
} as const;

export default AddResponsesModalStyle;
