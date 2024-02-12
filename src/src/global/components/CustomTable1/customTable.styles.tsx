import {
  boldFont,
  getRelativeFontSize,
  mediumFont,
  regularFont,
  theme,
} from "utils/styles";

const customTableStyles = {
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 5px",
    borderTopRadius: "15px",
    borderBottomRadius: "15px",
    // overflow: "auto",
    width: "100%",
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
      // overflowY: "auto",
      // width: "100%",
    },
  },
  exportButtonStyle: {
    width: { xl: "110px", lg: "110px", md: "110px", sm: "100px", xs: "100px" },
    height: { xl: "47px", lg: "40px", md: "38px", sm: "38px", xs: "38px" },
    border: "none",
    background: "rgba(38, 49, 96, 1)",
  },
  tableBody: {
    // backgroundColor: "#FFFFFF",
    // backgroundColor: contrastBackgroundColor,
    maxHeight: "500px",
    overflow: "auto",
  },
  tableHeaderCell: {
    ...boldFont,
    color: "#ffffff",
    backgroundColor: "#1a0224",
    borderTop: "1px solid #F0F0F0",
    borderBottom: "1px solid #F0F0F0",
    "&:first-child": {
      borderRadius: "10px 0px 0px 10px",
    },
    "&:last-child": {
      borderRadius: "0px 10px 10px 0px",
    },
    // padding: "6px 24px 6px 16px",
  },
  tableCell: {
    ...regularFont,
    height: "40px",
    borderTop: "1px solid #F0F0F0",
    borderBottom: "1px solid #F0F0F0",
  },
  tableRow: {
    margin: "10px 0",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      // backgroundColor: "rgba(237,237,237,0.7)",
      cursor: "pointer",
      // backgroundColor: contrastBackgroundColor,
    },
  },
  checkboxStyle: {
    color: "#ffffff",
  },
  mediumFonts: {
    ...mediumFont,
    fontSize: getRelativeFontSize(5),
  },
} as const;

export default customTableStyles;
