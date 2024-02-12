import {
  mediumFont,
  centerItemFlex,
  getRelativeFontSize,
  regularFont,
  lightDropDownColor,
} from "utils/styles";

const ModalStyle = {
  textStyle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#ffffff",
  },
  previewChip: {
    marginTop: 1,
    mr: 1,
    padding: "15px 0px",
    cursor: "pointer",
    justifyContent: "space-between",
    "& .MuiChip-deleteIcon": {
      color: "#ffffff",
    },
  },
  textStyle1: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#000000",
  },
  dropDownLight: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    background: lightDropDownColor,
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "#7A7A7A !important",
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
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
      whiteSpace: "wrap",
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
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "#CBCBCB !important",
    },
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
      whiteSpace: "wrap",
    },
  },
  tableDataStyle: {
    color: "#ffffff",
    fontWeight: 500,
    cursor: "pointer",
  },
  tableDataStyle1: {
    color: "#000000",
    fontWeight: 500,
    cursor: "pointer",
  },
  modalTitle: {
    ...mediumFont,
    textAlign: "center",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  fontText: {
    ...regularFont,
  },
  dialogFooter: {
    pb: 2,
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
} as const;
export default ModalStyle;
