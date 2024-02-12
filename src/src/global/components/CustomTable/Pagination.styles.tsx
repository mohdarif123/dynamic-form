import { cornflowerBlueColor } from "utils/styles";

const paginationStyles = {
  pageBtn: {
    display: "flex",
    margin: "10px", // marginBottom: "15px",
    marginTop: "4px",
    justifyContent: "end",
    "& .Mui-selected": {
      color: "white !important",
      backgroundColor: `${cornflowerBlueColor} !important`,
      borderRadius: "8px",
      fontFamily: "Myriad Pro",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17px",
      textAlign: "center",
    },
    "& .css-1x35jed-MuiButtonBase-root-MuiPaginationItem-root": {
      color: "white !important",
    },
    "& .css-hw0e1v-MuiPaginationItem-root": {
      color: "white !important",
    },
    "& .css-40d3lv": {
      color: "white !important",
    },
    "& .css-1ddzrdz": {
      color: "white !important",
    },
  },
  pageBtnLightTheme: {
    display: "flex",
    margin: "10px", // marginBottom: "15px",
    marginTop: "4px",
    justifyContent: "end",
    "& .Mui-selected": {
      color: "white !important",
      backgroundColor: "rgba(122, 129, 253, 1) !important",
      borderRadius: "8px",
      fontFamily: "Myriad Pro",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17px",
      textAlign: "center",
    },
    "& .MuiButtonBase-root-MuiPaginationItem-root": {
      color: "white !important",
    },
  },
} as const;
export default paginationStyles;
