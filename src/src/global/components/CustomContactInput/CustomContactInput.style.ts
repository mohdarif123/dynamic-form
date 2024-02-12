import {
  appColor,
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  theme,
  verdanaFamily,
} from "../../../utils/styles";

const customContactNumberStyles = {
  textField2: {
    borderRadius: "38px",
    curetColor: "black",
    background: sidebarColor,
    width: "100%",
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
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: ` 0 0 0 1000px  ${sidebarColor}  inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: `${sidebarColor} ! important`,
        "-webkit-text-fill-color": "#fff !important",
      },
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
    // for placeholder style at disbled button
    "& .Mui-disabled": {
      "& .MuiInputBase-input.MuiOutlinedInput-input": {
        "-webkit-text-fill-color": "#808080",
      },
    },
  },

  textField: {
    width: "100%",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      backgroundColor: "#fff",
      "&::placeholder": {
        ...mediumFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
    },
  },
  nameField: {
    ...boldFont,
    display: "flex",
    color: "#212121",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  textFieldLight: {
    borderRadius: "38px",
    curetColor: "white",
    background: "#E6E7FF",
    width: "100%",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
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
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: ` 0 0 0 1000px #E6E7FF inset`,
        transition: "background-color 5000s ease-in-out 0s !important",
        backgroundColor: "#E6E7FF ! important",
        "-webkit-text-fill-color": "#7A7A7A !important",
      },
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    // for placeholder style at disbled button
    "& .Mui-disabled": {
      "& .MuiInputBase-input.MuiOutlinedInput-input": {
        "-webkit-text-fill-color": "#C1C1C1",
      },
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
  },
  textFieldStyle: {
    borderRadius: "12px",
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
    "& .MuiSelect-icon": {
      // color: pureWhiteColor,
      color: "#7A81FD",
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
  inputLabel: {
    display: "flex",
    marginLeft: "6px",
    fontWeight: 500,
    fontColor: theme.palette.common.black + " !important",
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
  dropDownStyling: {
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
      // color: pureWhiteColor,
      color: "#7A81FD",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  dropDownLightStyle: {
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
      // color: "#373854",
      color: "#7A81FD",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
} as const;

export default customContactNumberStyles;
