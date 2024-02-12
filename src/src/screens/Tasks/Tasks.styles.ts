import {
  appColor,
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  mediumFont,
  primaryBorderColor,
  regularFont,
  theme,
  verdanaFamily,
} from "utils/styles";

const TasksStyle = {
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchWrapperStyle: {
    [`@media screen and (max-width: ${332}px)`]: {
      width: "250px",
    },
    [`@media screen and (max-width: ${284}px)`]: {
      width: "200px",
    },
    width: "300px",
    mb: 1,
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "15px",
    },
    "& .css-mp38g9-MuiGrid-root .MuiDropzoneArea-root": {
      borderRadius: "37px",
    },
  },
  dropZone: {
    width: "50px",
  },
  tabWidth1: {
    "& .css-18tds51-MuiGrid-root": {
      width: "70% !important",
    },
  },
  button: {
    padding: "0px 0px",
    width: "100%",
    backgroundColor: "#282945",
    borderBottom: "1px solid #7A81FD",
  },
  inputClass: {
    border: "none",
  },
  dropjone: { width: "20px" },
  styleDrop: {
    color: "red",
    fontSize: "12px",
    // borderRadius: "34px",
    fontWeight: 200,
    "&:hover": {
      "&& fieldset": {
        border: "3px solid green",
      },
    },
  },
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "100px",
      fontSize: "12px",
      borderRadius: "37px",
      borderWidth: "3px",
      backgroundColor: "#F0ECFF",
      border: "none",
    },
    "& .MuiDropzoneArea-icon": {
      height: "85px",
      width: "70px",
      marginLeft: "50px",
      borderRadius: "25px",
      background: "white",
      color: "#7A81FD",
      margin: "15px",
      paddingLeft: "26px",
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
    "& .MuiDropzoneArea-text": {
      fontSize: getRelativeFontSize(2),
      ...mediumFont,
    },
  },
  dropzoneIcon: {
    fontSize: "48px", // Set the desired size of the icon
    color: "blue", // Set the desired color of the icon
    marginBottom: "37px", // Add any additional styling as needed
    width: "80px",
  },
  // dropzoneIcon: {
  //   width: "30px",
  // },
  tasksTableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  label: {
    marginBottom: "8px",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "28.48px",
  },
  selectMenu: {
    width: "150px",
    borderRadius: "10px",
    "& .MuiInputBase-input": {
      padding: "12px 12px",
    },
    "& .MuiOutlinedInput-input": {
      "&.MuiSelect-select": {
        borderColor: "#24CBC7",
      },
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderColor: primaryBorderColor,
    },
  },
  dropDownStyleTasks: {
    height: "47px",
    width: "100%",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
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
  selectMenu2: {
    width: "100px",
    fontFamily: "Verdana !important",
    borderRadius: "10px",
    "& .MuiInputBase-input": {
      padding: "12px 12px",
    },
    "& .MuiOutlinedInput-input": {
      "&.MuiSelect-select": {
        borderColor: "#24CBC7",
      },
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderColor: primaryBorderColor,
    },
  },
  dropDownStyleBid: {
    borderRadius: "26px",
    width: "100%",
    fontFamily: "Verdana !important",
    // backgroundColor: appColor,
    border: "1px solid #F5FAFF",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
  dropDownStyle: {
    height: "30px",
    borderRadius: "6px",
    fontFamily: "Verdana !important",
    // backgroundColor: "appColor",
    "& .MuiOutlinedInput-input.MuiSelect-select": {
      padding: "16px 25px 16px 0px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
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
    backgroundColor: "#ffffff",
    border: "1px solid #C1C1C1",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#7A81FD",
    },
  },
  dropDownStyleOdd: {
    height: "30px",
    borderRadius: "6px",
    fontFamily: "Verdana !important",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373854",
    },
    "& .MuiOutlinedInput-input.MuiSelect-select": {
      padding: "16px 25px 16px 0px",
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373854",
    },
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },

  testAreaDark: {
    width: "100%",
    borderRadius: "38px",
    borderColor: "#ffffff",
    background: "#373854",
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    border: "none",
    ".MuiOutlinedInput-notchedOutline": { border: "0px" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .css-1oywd2p-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      position: "relative",
      color: "#ffffff",
      fontSize: "16px",
      lineHeight: "28px",
      ...regularFont,
      fontFamily: "Source Sans 3",
      "&::placeholder": {
        ...regularFont,
        fontFamily: "Source Sans 3",
        fontSize: "16px",
        lineHeight: "28px",
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "38px",
      color: "#ffffff",
      fontFamily: verdanaFamily,
      fontSize: "16px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  testAreaLightStyle: {
    width: "100%",
    borderRadius: "38px",
    borderColor: "#ffffff",
    background: "#E6E7FF",
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#ffffff",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputBase-input": {
      position: "relative",
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
    "& .MuiOutlinedInput-root": {
      borderRadius: "38px",
      color: "#ffffff",
      fontFamily: verdanaFamily,
      fontSize: "16px",
      lineHeight: "1.5715",
      "&.Mui-focused fieldset": {
        borderColor: appColor,
      },
    },
  },
  tableDataStyle: {
    color: "#13b4ca",
    fontWeight: "600",
  },
  modalTitle: {
    ...mediumFont,
    textAlign: "center",
    color: "#ffffff",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  centerItemFlex1: {
    ...centerItemFlex,
    flexDirection: "column",
    color: "#000000",
  },
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
  dropzoneIconStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55px",
    width: "55px",
    borderRadius: "20px",
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
} as const;

export default TasksStyle;
