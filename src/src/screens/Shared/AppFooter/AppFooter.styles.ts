import {
  centerItemFlex,
  getRelativeFontSize,
  mediumFont,
  primaryColorBlack,
} from "utils/styles";

const appFooterStyles = {
  footer: {
    ...centerItemFlex,
    width: `calc(100% - ${"220"}px)`,
    height: "25px",
    position: "fixed",
    bottom: 0,
    right: 0,
    color: primaryColorBlack,
    [`@media screen and (max-width: ${1370}px)`]: {
      height: "30px",
    },
  },
  footerText: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: "0.01em",
    fontFamily: "Source Sans 3",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
  },
} as const;

export default appFooterStyles;
