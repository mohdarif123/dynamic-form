import {
  boldFont,
  cornflowerBlueColor,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  primaryBlackColor,
  pureWhiteColor,
  verdanaFamily,
} from "utils/styles";

const UserProfileStyles = {
  mainWrapper: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
    borderRadius: "13px",
  },
  personDetailHeading: {
    mb: 3,
    marginTop: "30px",
  },
  companyDetailsHeading: {
    mb: 3,
    marginTop: "20px",
  },
  testStyle: {
    fontWeight: "600",
  },
  submitButtonStyle: {
    width: "10%",
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
  buttonWrapper: {
    display: "flex",
    justifyContent: "end",
  },
  dropDownStyle: {
    fontFamily: "Verdana !important",
    height: "47px",
    borderRadius: "38px",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": "white",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
  },
  dropDownLightStyle: {
    fontFamily: "Verdana !important",
    height: "47px",
    borderRadius: "38px",
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": "red !import",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: primaryBlackColor,
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
  select: {
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      height: "47px",
      borderRadius: "38px",
      color: pureWhiteColor,
      fontSize: getRelativeFontSize(),
      "&.Mui-focused fieldset": {
        borderColor: "#373854",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  selectLight: {
    ".MuiOutlinedInput-notchedOutline": { border: "1px solid #C1C1C1" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: verdanaFamily,
      height: "47px",
      borderRadius: "38px",
      fontSize: getRelativeFontSize(),

      color: "rgb(118, 118, 118) !important",
      "&.Mui-focused fieldset": {
        borderColor: "#373854",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  nameField: {
    marginBottom: "0",
    display: "flex",
  },
  avatarStyle: {
    ...boldFont,
    color: pureWhiteColor,
  },
  squareProfileBox: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: cornflowerBlueColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    marginRight: "7px",
    fontSize: "12px",
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
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "5px",
    fontSize: "12px",
  },
  warningContent: {
    fontSize: getRelativeFontSize(),
    margin: "10px 0",
    ...mediumFont,
  },
  dropzoneIconStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55px",
    width: "55px",
    borderRadius: "20px",
  },
} as const;

export default UserProfileStyles;
