import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  mediumFont,
  pureWhiteColor,
  regularFont,
  theme,
} from "utils/styles";
import LayerBg from "assets/images/bg_layer2.svg";

const registerSuccessFullyStyles = {
  container: {
    ...centerItemFlex,
    height: "100%",
    backgroundColor: "#14142D",
  },
  error: {
    borderRadius: "8px",
    outline: "none",
    borderColor: "red !important",
    width: "100% !important",
  },
  select: {
    borderRadius: "12px",
    border: "1px solid black",
    width: "100% !important",
    height: "50px",
  },
  formCenter: {
    ...centerItemFlex,
  },
  textCenter: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  getHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(14),
    mx: 4,
    mt: 8,
  },
  alreadyAccount: {
    ...mediumFont,
    fontSize: getRelativeFontSize(1),
    mx: 4,
    mb: 2,
  },
  centerBotton: {
    ...centerItemFlex,
    mt: 1,
    mb: 10,
  },
  signBtn: {
    width: "100%",
  },
  payButtonStyle: {
    width: "100%",
    marginTop: "16px",
  },
  contactInput: {
    backgroundColor: "white !important",
    color: "black !important",
    width: "100% !important",
    outline: "none",
    marginTop: "10px",

    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "12px",

      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
    },
  },
  label: {
    display: "flex",
    marginTop: "8px",
  },
  labelIcon: { color: "black" },
  labelText: { ...boldFont, marginLeft: "6px" },
  star: {
    color: "red",
    marginLeft: "4px",
    fontSize: getRelativeFontSize(2),
    ...boldFont,
  },
  payButton: {
    ...boldFont,
    width: "100%",
    backgroundColor: "#EFA185" + "!important",
    color: "black",
    marginTop: "25px",
    "&:hover": {
      backgroundColor: "#EFA185" + "!important",
      color: "white",
    },
  },
  registerPage: {
    display: "grid",
  },
  errorStyling: {
    paddingLeft: "10px",
  },
  cardElementStyle: {
    marginTop: "10px",
    border: "#dad3dd solid 1px",
    borderRadius: "9px",
    padding: "12px",
    backgroundColor: "#fff",
  },
  customPaperStyle: {
    display: "flex",
    padding: "10px",
  },
  planPriceStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  planNameStyle: {
    color: "#666666 !important",
  },
  priceStyle: {
    ...boldFont,
    fontSize: getRelativeFontSize(35),
    [theme.breakpoints.down("sm")]: {
      fontSize: getRelativeFontSize(13),
    },
  },
  stripeHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  stripeContainer: {
    display: "flex",
    height: "100% !important",
  },
  stripeContainerInner: {
    height: "100% !important",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  iconStyleBox: {
    display: "flex",
    mt: 3,
  },
  iconStyle: {
    padding: "8px",
    borderRadius: "50%",
  },
  modalTitle: {
    ...boldFont,
    color: "#7A81FD",
    fontSize: "28px !important  ",
    Weight: 600,
    textAlign: "center",
  },
  fontText: {
    ...regularFont,
    ...centerItemFlex,
    textAlign: "center",
    color: pureWhiteColor,
    mt: 1.5,
  },
  footerWrapper: {
    ...centerItemFlex,
    gap: "10px",
    paddingBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  didntGetEmail: {
    ...boldFont,
    fontSize: getRelativeFontSize(3),
  },
  instructions: {
    ...regularFont,
    color: "#fff",
    textAlign: "center",
  },
  mianContainer: {
    backgroundColor: "#14142D",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${LayerBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  footerText: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
  },
  coypRightFooterStyle: {
    fontSize: "10px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "4vh",
    width: "100%",
    position: "absolute",
    bottom: "0",
    background: "rgba(20, 20, 45, 1)",
  },
  rfpTextStyle: {
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: { fontSize: "28px" },
    marginLeft: "4px",
  },
  proTextStyle: {
    color: "rgba(122, 129, 253, 1)",
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: {
      fontSize: "28px",
    },
  },
  line: {
    width: "1206.5px",
    border: "1px solid",
    borderImageSource:
      "linear-gradient(90deg, rgba(122, 129, 253, 0) 0%, #7A81FD 50.38%, rgba(122, 129, 253, 0) 100.77%)",
    borderImageSlice: "1",
    borderImageRepeat: "stretch",
  },
} as const;

export default registerSuccessFullyStyles;
