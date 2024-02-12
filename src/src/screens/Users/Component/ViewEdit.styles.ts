import { centerItemFlex, mediumFont, regularFont, skyPrimaryColor } from "utils/styles";

const ViewEditStyles = {
  viewModalWrapper: {
    backgroundColor: "#f7f9fb",
    borderRadius: "8px",
    padding: "10px 12px",
    marginBottom: "10px",
    alignContent: "center",
    display: "flex",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  textStyle: {
    color: skyPrimaryColor,
    fontSize: "20px",
    fontWeight: "500",
  },
  modalTitle: {
    ...mediumFont,
    textAlign: "center",
  },
  fontText: {
    ...regularFont,
  },
  dialogFooter: {
    gap: "10px",
    width: "100%",
    display: "flex",
    marginBottom: "20px",
    justifyContent: "center",
    "& button": {
      width: "120px",
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
} as const;
export default ViewEditStyles;
