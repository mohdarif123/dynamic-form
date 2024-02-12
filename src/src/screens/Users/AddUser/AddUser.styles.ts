import {
  getRelativeFontSize,
  inputLabelRequiredColor,
  pureWhiteColor,
} from "utils/styles";

const AddUsersStyle = {
  mainWrapper: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
    borderRadius: "13px",
  },
  testStyle: {
    fontWeight: "600",
  },
  submitButtonStyle: {
    width: "10%",
  },
  buttonWrapper: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
  buttonStyle: {
    width: "110px",
    [`@media screen and (max-width: ${324}px)`]: {
      width: "190px",
    },
  },
  inputLabel: {
    fontWeight: 500,
    display: "flex",
    color: "#6c6c6c",
    // fontColor: theme.palette.common.black + " !important",
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
  nameField: {
    marginBottom: "0",
    display: "flex",
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    marginRight: "7px",
    fontSize: "12px",
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
    borderRadius: "38px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
} as const;

export default AddUsersStyle;
