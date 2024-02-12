import { getRelativeFontSize, theme } from "utils/styles";

const ResponseStyle = {
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  buttonStyle: {
    width: { xl: "170px", lg: "158px", md: "160px", sm: "160px", xs: "310px" },
    [`@media screen and (max-width: ${351}px)`]: {
      width: "190px",
    },
  },
  deleteButtonStyle: {
    width: {
      xs: "310px",
      sm: "140px",
      md: "140px",
      lg: "140px",
      xl: "140px",
    },
    [`@media screen and (max-width: ${351}px)`]: {
      width: "190px",
    },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
  },
  tabWidth1: {
    "& .css-18tds51-MuiGrid-root": {
      maxWidth: "100%",
    },
    width: "100%",
  },
  dropDownLightForSx: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    // minWidth: "200px",
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
  button: {
    padding: "0px 0px",
    width: "100%",
    backgroundColor: "#282945",
    borderBottom: "1px solid #7A81FD",
  },
  headerStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    gap: 0.8,
    mb: 1,
    flexWrap: "wrap",
    [theme.breakpoints.down("lg")]: {
      marginTop: "7px",
    },
  },
  dropDownWrapper: {
    display: "flex",
    justifyContent: "column",
    [theme.breakpoints.up("xl")]: {
      gap: 3,
    },
    [theme.breakpoints.down("xl")]: {
      gap: 2,
    },
  },
  dropDownStyle: {
    fontFamily: "Verdana !important",
    minWidth: "150px",
    height: "47px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  tableDataStyle: {
    color: "#ffffff",
    fontWeight: 600,
  },
  tableDataStyle1: {
    color: "#000000",
    fontWeight: 600,
  },
  rightLeftArrowWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    pb: 2,
  },
  leftSideArrowWrapper: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#7A81FD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  rightSideArrowWrapper: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#7A81FD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapperStyle: {
    display: "flex",
    gap: 1,
    pt: 2,
    pl: 3,
    pr: 3,
  },
  mainAnswerTableStyle: {
    // boxShadow: "0px 8px 15px 0px rgba(0, 0, 0, 0)",
    boxShadow: "rgba(0, 0, 0, 0.01) 0px 5px 15px 0px",
    borderRadius: "37px",
    display: "flex",
    justifyContent: "space-between",
    maxHeight: {
      xl: "75vh",
      lg: "87vh",
      md: "75vh",
      sm: "75vh",
      xs: "75vh",
    },
    dataCardStyleNo: {
      // ...paperStyleDashboard,
      paddingY: 1.5,
      paddingX: 1,
      borderRadius: "25px",
      direction: "row",
      display: "flex",

      "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
      },
    },
    minHeight: {
      xl: "75vh",
      lg: "87vh",
      md: "75vh",
      sm: "75vh",
      xs: "75vh",
    },
    width: "100%",
    flexDirection: "column",
  },
  answerBoxStyle: {
    pl: 3,
    pr: 3,
    maxHeight: {
      xl: "62vh",
      lg: "70vh",
      md: "62vh",
      sm: "62vh",
      xs: "62vh",
    },
    "& .jodit-container:not(.jodit_inline) .jodit-wysiwyg": {
      overflow: "auto",
      "&::-webkit-scrollbar": {
        height: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#7A81FD",
        borderRadius: "10px",
        width: "4px",
      },
    },
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#7A81FD",
      borderRadius: "10px",
      width: "4px",
    },
    "&::-webkit-scrollbar-button:start": { display: "block" },
    "&::-webkit-scrollbar-button:end": { display: "block" },
  },
  headerMainStyle: {
    mb: 2,
  },
  answerTextStyle: {
    wordBreak: "break-all",
    lineHeight: 1.7,
  },
  secondTableStyleWrapper: {
    minWidth: "100px",
    width: "100%",
    overflow: "auto",
  },
  firstTableStyleWrapper: {
    minWidth: "200px",
    width: "100%",
    overflow: "auto",
  },
  mainTableWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
  },
  dropdownWrapper: {
    width: {
      xl: "200px",
      lg: "140px",
      md: "200px",
      sm: "180px",
      xs: "320px",
    },
  },
  searchInputWrapper: {
    width: {
      xl: "250px",
      lg: "170px",
      md: "200px",
      sm: "180px",
      xs: "320px",
    },
  },
} as const;
export default ResponseStyle;
