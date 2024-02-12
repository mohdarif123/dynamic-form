import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  paperStyleAdmin,
  pureWhiteColor,
  regularFont,
  theme,
} from "utils/styles";

const AdminStyle = {
  dialogFooter: {
    ...centerItemFlex,
    gap: "10px",
    paddingBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },
  getStepperWrapper: {
    display: "flex",
    justifyContent: "space-start",
    flexWrap: "wrap",
    gap: 1,
    mb: 1,
  },
  button: {
    padding: "0px 0px",
    width: "11.11%",
    backgroundColor: "#282945",
  },
  tabWidth: {
    "& .css-18tds51-MuiGrid-root": {
      maxWidth: "11.9%",
    },
  },
  tabWidth1: {
    overflow: "auto",
    "& .MuiGrid-root": {
      maxWidth: "100%",
    },
    "& .MuiTabs-root .MuiTabs-scrollButtons": {
      width: 0,
    },
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
    "&:hover": {
      background: "none",
    },
  },
  dropDownStyle: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    color: "#ffffff",
    background: "#373854",
    "& .MuiInputBase-input": {
      borderColor: "#282945",
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
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: "10px !important",
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
  dropDownStyle1: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: "#E6E7FF",
    "& .MuiInputBase-input": {
      borderColor: "#282945",
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
  dataCardStyleTotal: {
    ...paperStyleAdmin,
    p: 2,
    // direction: "row",
    display: "flex",
    backgroundColor: "#00c49f",
  },
  modalTitle: {
    ...boldFont,
    textAlign: "center",
  },
  textBold: {
    ...boldFont,
    wordBreak: "break-all",
    marginLeft: "5px",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  fontText: {
    ...regularFont,
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    spacing: 2,
    gap: 1,
  },
  dialogFooterClass: {
    backgroundColor: "red !important",
    alignItem: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonWrapper: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
  buttonStye: {
    width: "110px",
    [`@media screen and (max-width: ${324}px)`]: {
      width: "190px",
    },
  },
} as const;
export default AdminStyle;
