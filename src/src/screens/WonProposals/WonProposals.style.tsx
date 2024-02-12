import {
  appColor,
  boldFont,
  buttonWhiteBg,
  getRelativeFontSize,
  mediumFont,
  purplePrimaryColor,
  theme,
} from "utils/styles";

const WonProposalsStyles = {
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "end",
    [`@media screen and (max-width: ${323}px)`]: {
      width: "200px",
    },
    ml: 1,
  },
  assigneePaper: {
    borderRadius: "36px",
  },
  ViewPopOverWrapper: {
    backgroundColor: appColor,
    borderRadius: "24px",
  },
  ViewPopOverWrapper1: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
  },
  tableTextStyle: {
    fontWeight: 400,
  },
  dropdonwLightStyle: {
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
  heading: {
    [theme.breakpoints.up("xl")]: {
      fontSize: "28px",
    },
    marginLeft: "22px",
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
  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      borderRadius: "12px !important",
      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
    },
  },
  popOverListItem: {
    padding: "10px 10px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  select: {
    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "12px",
      fontSize: "15px",

      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
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
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    textAlign: "center",
  },
  dialogContent: {
    fontSize: getRelativeFontSize(2),
    ...mediumFont,
    textAlign: "center",
    "& span": {
      ...boldFont,
    },
  },
  dialogFooter: {
    width: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
    "& button": {
      width: "120px",
    },
  },
  buttonWhiteBg: {
    background: "none",
    border: "1px solid",
    borderColor: buttonWhiteBg,
    color: purplePrimaryColor,
    "&:hover": {
      background: "none",
    },
  },
  titleRight: {
    color: " rgba(0,0,0,.85)",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
} as const;

export default WonProposalsStyles;
