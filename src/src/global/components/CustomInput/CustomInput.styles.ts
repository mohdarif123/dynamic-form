import {
  appColor,
  inputLabelRequiredColor,
  primaryBlackColor,
  pureWhiteColor,
  regularFont,
  sidebarColor,
  verdanaFamily,
} from "utils/styles";

const customInputStyles = {
  textFieldLight: {
    // animation: "curetColor 3s linear infinite",
    // "@keyframes curetColor": {
    //   "0%": {
    //     caretColor: pureWhiteColor,
    //   },
    //   "25%": {
    //     caretColor: "red",
    //   },
    //   "50%": {
    //     caretColor: "yellow",
    //   },
    //   "75%": {
    //     caretColor: "#7A81FD",
    //   },
    //   "100%": {
    //     caretColor: "green",
    //   },
    // },
    caretColor: primaryBlackColor,
    borderRadius: "38px",
    curetColor: "white",
    background: "#E6E7FF",
    width: "100%",
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
  textField: {
    //animation: "curetColor 2s linear infinite",
    // "@keyframes curetColor": {
    //   "0%": {
    //     caretColor: "#7A81FD",
    //   },
    //   "25%": {
    //     caretColor: "#7A81FD",
    //   },
    //   "50%": {
    //     caretColor: "yellow",
    //   },
    //   "75%": {
    //     caretColor: "#fff",
    //   },
    //   "100%": {
    //     caretColor: "green",
    //   },
    // },
    caretColor: pureWhiteColor,
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
  errorStyle: {
    fontSize: "0.75rem",
    color: "#d32f2f",
  },
  nameField: {
    fontWeight: 500,
    color: "#ffffff",
    marginLeft: "4px",
    display: "flex",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
      fontSize: "11px",
    },
  },
  nameField1: {
    fontWeight: 500,
    color: "#000000",
    marginLeft: "4px",
    display: "flex",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
      fontSize: "11px",
    },
  },
} as const;

export default customInputStyles;
