import {
  cornflowerBlueColor,
  getRelativeFontSize,
  pureWhiteColor,
  sournceSansFamily,
  theme,
} from "utils/styles";

const customTableStyles1 = {
  table: {
    borderCollapse: "separate",
    width: "100%",
    borderShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },
  exportButtonStyle: {
    width: { xl: "110px", lg: "110px", md: "110px", sm: "100px", xs: "100px" },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
    border: "none",
    background: "rgba(38, 49, 96, 1)",
  },
  perPageText: {
    fontSize: "14px",
    fontWeight: 400,
    color: pureWhiteColor,
  },
  dropDownLightStyle: {
    height: "30px",
    borderRadius: "6px",
    color: "#373854",
    "& .MuiOutlinedInput-input.MuiSelect-select": {
      padding: "16px 30px 16px 0px",
    },
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
  dropDownStyle: {
    height: "30px",
    borderRadius: "6px",
    fontFamily: "Verdana !important",
    "& .MuiOutlinedInput-input.MuiSelect-select": {
      padding: "16px 25px 16px 0px",
    },
    // backgroundColor: "appColor",
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#282945",
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

  styledrop: {
    color: "#FFFFFF",
    fontSize: "12px",
    // borderRadius: "34px",
    fontWeight: 200,
    "&:hover": {
      "&& fieldset": {
        border: "3px solid green",
      },
    },
  },
  borderRadiusTable: {
    borderBottomLeftRadius: "37px",
    borderBottomRightRadius: "37px",
  },
  borderRadiusTable1: {
    borderRadius: "37px",
  },
  tableBody: {
    maxHeight: "500px",
    overflow: "auto",
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: "16px",
    height: "35px",
    fontWeight: 700,
    backgroundColor: "#282945",
    // textAlign: "center",
    borderBottom: "1.2px dashed rgba(255, 255, 255, 0.07)",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableHeaderCellCheckBox: {
    color: "#ffffff",
    fontSize: "16px",
    height: "35px",
    fontWeight: 700,
    backgroundColor: "#282945",
    textAlignLast: "center",
    // textAlign: "center",
    borderBottom: "1.2px dashed rgba(255, 255, 255, 0.07)",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableHeaderCell1: {
    color: "#000000",
    fontSize: "16px",
    height: "35px",
    fontWeight: 700,
    backgroundColor: "#ffffff",
    // textAlign: "center",
    borderBottom: "1.2px dashed rgb(215, 215, 221)",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
    "& .css-1649q4u-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-1649q4u-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
      {
        color: "black",
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
    borderBottom: "1px dashed rgba(255, 255, 255, 0.07)",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
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
  tableCell: {
    // textAlign: "center",
    borderBottom: "none",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
  },
  tableRow: {
    margin: "10px 0",
    backgroundColor: "#282945",
    "&:hover": {
      cursor: "pointer",
    },
  },
  tableRow1: {
    margin: "10px 0",
    color: "#000000",
    backgroundColor: "#ffffff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  tableRowOdd: {
    backgroundColor: "#282945",
    // boxShadow: "inset 50px 50px 50px 50px #373854",
    boxShadow: "inset 0 0 99999px #373854",
    // borderRadius: "37px",
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
  checkbox1: {
    color: "#000000",
  },
  tableRowCell: {
    borderBottom: "none",
    borderRight: "1px solid rgba(255, 255, 255, 0.07)",
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
    color: "#FFFFFF",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "23px",
  },
  rowText1: {
    color: "#000000",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "23px",
  },
} as const;

export default customTableStyles1;
