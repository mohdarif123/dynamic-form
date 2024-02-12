import {
  appColor,
  cornflowerBlueColor,
  getRelativeFontSize,
  primaryBlackColor,
  pureWhiteColor,
  sournceSansFamily,
  theme,
  verdanaFamily,
} from "utils/styles";

const customTableStyles = {
  table: {
    borderCollapse: "separate",
    width: "100%",
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },
  responseTable: {
    borderCollapse: "separate",
    "& .MuiTableCell-root": {
      borderBottom: "none !important",
    },
    width: "100%",
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },
  NoDataStyle: { borderBottom: "1px solid rgb(224, 224, 224)" },
  perPageText: {
    fontSize: "14px",
    fontWeight: 400,
  },
  dropDownDarkStyle: {
    height: "30px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    boxShadow: "none",
    fontSize: "12px",
    fontWeight: 200,
    color: pureWhiteColor,
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
      fontSize: getRelativeFontSize(),
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: pureWhiteColor,
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
  },
  dropDownLightStyle: {
    height: "30px",
    borderRadius: "34px",
    color: "#373854",
    fontFamily: "Verdana !important",
    boxShadow: "none",
    fontSize: "12px",
    fontWeight: 200,
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: pureWhiteColor,
    },
    ".MuiSvgIcon-root ": {
      fill: "#7A81FD !important",
    },
  },
  dropDownStylePerPage: {
    height: "30px",
    borderRadius: "6px",
    fontFamily: "Verdana !important",
    backgroundColor: cornflowerBlueColor,
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiSvgIcon-root ": {
      fill: "#fff !important",
    },
  },
  dropDownPerPageLight: {
    height: "30px",
    borderRadius: "6px",
    fontFamily: "Verdana !important",
    backgroundColor: cornflowerBlueColor,
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    ".MuiSvgIcon-root ": {
      fill: "#fff !important",
    },
  },
  styledrop: {
    fontSize: "12px",
    fontWeight: 200,
    "&:hover": {
      "&& fieldset": {
        border: "3px solid green",
      },
    },
  },
  tableBody: {
    maxHeight: "500px",
    overflow: "auto",
  },
  noBorderBottom: {
    "& .MuiTableCell-root": {
      borderBottom: "none !important",
    },
  },
  tableHeaderCell: {
    fontSize: "16px",
    height: "35px",
    fontWeight: 700,
    textAlign: "center",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableHeaderCellStart: {
    fontSize: "16px",
    height: "35px",
    fontWeight: 700,
    textAlign: "start",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableHeaderCellDropdown: {
    color: "#ffffff",
    fontSize: "16px",
    // maxWidth: "0px",
    // maxWidth: "0px",
    fontWeight: 700,
    backgroundColor: "#282945",
    textAlign: "center",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableHeaderCellDropdown1: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    backgroundColor: "#282945",
    textAlign: "start",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  dropDownHeaderStyle: {
    minWidth: "100px",
    height: "47px",
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#ffffff",
    },
    fontFamily: "Verdana !important",
    border: "none",
    "& .MuiInputBase-input": {
      fontSize: getRelativeFontSize(),
      border: "none",
      color: "#ffffff",
    },
    // "& .css-1dmqq7i-MuiNativeSelect-select-MuiInputBase-input": {
    //   backgroundColor: "red !important",
    // },
  },
  headerTextStyle: {
    fontWeight: 700,
    fontFamily: sournceSansFamily,
    fontStyle: "normal",
    // position: "absolute",
  },
  tableHeaderDropdown: {
    fontSize: "16px",
    fontWeight: 700,
    margin: "5px",
  },
  tableHeaderDropdownStart: {
    fontSize: "16px",
    fontWeight: 700,
    margin: "5px",
    display: "flex",
    justifyContent: "start",
  },
  headerTextStyle1: {
    fontWeight: 700,
    fontFamily: sournceSansFamily,
    fontStyle: "normal",
    display: "flex",
    justifyContent: "start",
  },
  tableCell: {
    // textAlign: "center",
    borderBottom: "none",
  },
  tableCellCustom3: {
    // textAlign: "center",
    borderBottom: "none",
    padding: { xl: "23px", lg: "16px", md: "23px", sm: "23px", xs: "23px" },
  },
  tableRow: {
    margin: "10px 0",
    backgroundColor: "#282945",
    "&:hover": {
      cursor: "pointer",
    },
  },
  tableRowOdd: {
    backgroundColor: "#282945",
    // boxShadow: "inset 50px 50px 50px 50px #373854",
    boxShadow: "inset 0 0 99999px #373854",
    borderRadius: "37px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  checkBoxStyle: {
    paddingRight: "50px",
  },
  checkbox: {
    color: "#ffffff",
  },
  mediumFonts: {
    fontFamily: verdanaFamily,
    fontWeight: 700,
    LineHeight: "39.7px",
    color: "rgba(255, 255, 255, 1)",
    [theme.breakpoints.up("xl")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "25px",
    },
  },
  exportButtonStyle: {
    width: { xl: "110px", lg: "110px", md: "110px", sm: "100px", xs: "100px" },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
    border: "none",
    background: "rgba(38, 49, 96, 1)",
  },
  tableRowCell: {
    borderBottom: "none",
  },
  rowPerPageStyle: {
    height: "28px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "2px",
  },
  paginationDropdownWrapper: {
    display: "flex",
    marginTop: "8px",
  },
  rowText: {
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "23px",
  },
  rowText2: {
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "23px",
    display: "flex",
    justifyContent: "center",
  },
  tableRowTextStart: {
    display: "flex",
    justifyContent: "start",
  },
  seeMoreTextDarkStyle: {
    fontSize: "20px",
    fontWeight: "500",
    color: pureWhiteColor,
    wordBreak: "break-all",
  },
  seeMoreTextLightStyle: {
    fontSize: "20px",
    fontWeight: "500",
    wordBreak: "break-all",
    color: primaryBlackColor,
  },
} as const;

export default customTableStyles;
