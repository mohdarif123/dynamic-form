import { red } from "@material-ui/core/colors";
import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  primaryColorBlack,
  regularFont,
  theme,
} from "utils/styles";

const roleManagementStyles = {
  heading: {
    ...boldFont,
    fontSize: getRelativeFontSize(12),
  },
  mainBox: {
    marginTop: "80px",
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  outerTabBox: {
    borderBottom: "none",
  },
  titleText: {
    ...boldFont,
    fontSize: getRelativeFontSize(12),
  },
  input: {
    border: "1px solid #E7E7E7",
  },
  centerItem: {
    ...centerItemFlex,
    ml: 1,
  },
  addUserTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
    textAlign: "center",
  },
  nameField: {
    ...boldFont,
    fontSize: getRelativeFontSize(),
    color: primaryColorBlack,
    textTransform: "capitalize",
    "& .MuiFormLabel-asterisk": {
      // color: primaryColorBlue,
    },
  },
  mobileNumber: {
    width: "100%",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        ...regularFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      borderColor: "#DFDFDF",
      "&.Mui-focused fieldset": {},
    },
  },
  errorStyling: {
    paddingLeft: "14px",
  },
  select: {
    width: "100%",
    borderRadius: "10px",
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      position: "relative",
      padding: "12px 12px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&.Mui-focused fieldset": {
        border: "2px solid  #24CBC7",
      },
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderRadius: "10px",
      border: "2px solid  #24CBC7",
    },
  },
  placeholderText: {
    ...regularFont,
    color: "#999",
  },
  addTagChip: {
    ...mediumFont,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "5px",
    fontSize: getRelativeFontSize(),
  },
  resourceName: {
    ...regularFont,
  },
  optionStyle: {
    ...regularFont,
  },
  checkbox: {
    "&.Mui-checked": {},
  },
  roleName: {
    ...boldFont,
    cursor: "pointer",
  },
  permissionText: {
    ...boldFont,
    color: red,
    fontSize: getRelativeFontSize(2),
    "& .MuiFormLabel-asterisk": {},
  },
  deleteButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    padding: "12px 12px",
    cursor: "pointer",
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    ...regularFont,
    marginRight: "7px",
  },
  inputLabel: {
    display: "flex",
    color: "#212121",
    fontSize: getRelativeFontSize(2),
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
};

export default roleManagementStyles;
