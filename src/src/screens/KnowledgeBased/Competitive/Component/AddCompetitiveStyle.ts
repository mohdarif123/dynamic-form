import {
  getRelativeFontSize,
  inputLabelRequiredColor,
  pureWhiteColor,
} from "utils/styles";

const AddCompetitiveModalStyle = {
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
  selectStyleDark: {
    "& .MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": pureWhiteColor,
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
  customSxSelectStyle: {
    height: "39px",
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
    borderRadius: "25px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  inputLabel: {
    display: "flex",
    color: pureWhiteColor,
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
  },
  dropDownStyle: {
    height: "47px",
    width: "100%",
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
  dropDownLightStyle: {
    height: "47px",
    width: "100%",
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
      color: "black",
    },
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: "10px !important",
  },
  dropDownLightForSx: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
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
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "#C1C1C1 !important",
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
  buttonWrapper: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    mt: 3,
    gap: 2,
  },
  submitButtonStyle: {
    width: "10%",
  },
} as const;

export default AddCompetitiveModalStyle;
