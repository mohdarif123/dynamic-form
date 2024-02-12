import {
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  sidebarColor,
  verdanaFamily,
} from "utils/styles";

const ProfileStyle = {
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
    display: "flex",
    justifyContent: "end",
  },
  dropDownStyle: {
    fontFamily: "Verdana !important",
    height: "47px",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  inputLabel: {
    fontWeight: 500,
    display: "flex",
    color: "#FFF",
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
  inputLabel1: {
    fontWeight: 500,
    display: "flex",
    color: "#000",
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
  select: {
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      background: "#373854",
      height: "47px",
      borderRadius: "12px",
      fontSize: getRelativeFontSize(),
      color: "rgb(118, 118, 118) !important",
      "&.Mui-focused fieldset": {
        borderColor: "#373854",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
      "&.MuiOutlinedInput-input ": {
        color: "#fff !important",
      },
    },
  },
  nameField: {
    marginBottom: "0",
    display: "flex",
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    // ...regularFont,
    marginRight: "7px",
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "10px",
    },
  },
  label: {
    marginBottom: "8px",
    fontWeight: 500,
    color: "#FFF",
  },
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "80%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "37px",
      borderWidth: "3px",
      backgroundColor: "#F0ECFF",
    },
    "& .MuiDropzoneArea-icon": {
      height: "113px",
      width: "119px",
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
    "& .MuiDropzoneArea-root-2": {
      minHeight: "0px !important",
    },
    "& .MuiDropzoneArea-text": {
      fontSize: getRelativeFontSize(2),
      ...mediumFont,
    },
  },
  textField: {
    width: "100%",
    borderRadius: "38px",
    background: sidebarColor,
    ".MuiOutlinedInput-notchedOutline": { border: "0px" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
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
} as const;

export default ProfileStyle;
