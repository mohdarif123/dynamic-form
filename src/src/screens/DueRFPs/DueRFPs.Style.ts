import {
  appColor,
  boldFont,
  buttonWhiteBg,
  getRelativeFontSize,
  mediumFont,
  pureWhiteColor,
  purplePrimaryColor,
  skyPrimaryColor,
  theme,
} from "utils/styles";

const DueProposalsStyles = {
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
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
  popOverListItem: {
    padding: "10px 10px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  popOverHeading: {
    padding: "5px 16px 5px",
    // borderRadius: "36px",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
    color: "#ffffff",
    backgroundColor: "#7A81FD !important",
  },

  tableTextStyle: {
    fontWeight: 400,
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

export default DueProposalsStyles;
