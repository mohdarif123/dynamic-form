import {
  centerItemFlex,
  customButtonStyle,
  disabledBackgroundColor,
  regularFont,
} from "utils/styles";

const customButtonStyles = {
  btnStyle: {
    ...customButtonStyle,
    ...regularFont,
    width: "80%",
    fontFamily: "Verdana !important",
    padding: "10px 20px",
    ...centerItemFlex,
    "&:disabled": {
      color: "rgb(255 255 255 / 50%)",
    },
  },
  glydeGif: {
    width: "15px",
    height: "15px",
  },
  loadingStyle: {
    color: "white",
    width: "25px !important",
    height: "25px !important",
  },
  outlinedBtn: {
    borderRadius: "34px",
    textAlign: "center",
    background: "#373854",
    fontStyle: "normal",
    fontWeight: 600,
    fontFamily: "Poppins",
    "&:hover": {
      background: "#282945",
    },
  },

  buttonTextStyle: {
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    /* identical to box height */

    color: "$FFFFFF",
  },
  containedBtn: {
    borderRadius: "34px",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 600,
    fontFamily: "Poppins",
  },
  disabled: {
    color: disabledBackgroundColor,
  },
};

export default customButtonStyles;
