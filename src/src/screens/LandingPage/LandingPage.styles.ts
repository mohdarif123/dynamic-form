import { theme } from "../../utils/styles";
import loginScreenImage from "../../assets/images/loginScreenImage.svg";

const landingPageStyles = {
  mainWrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#14142D",
  },
  staticImageComponentWrapper:{
    minHeight: "12vh"
  },
  getComponentBasedOnURLWrapper:{
    height: `calc(100-12)vh`,
    marginBottom: {
      xl: "10vh",
      lg: "2vh",
      md: "2vh",
      sm: "2vh",
      xs: "5vh",
    },
  },
  secondWrapper: {
    alignItems: "center",
    height: "auto",
  },
  imageLoginContainer: {
    backgroundColor: "#e8fcff",
    height: "auto",
  },
  componentStyle: {
    height: "100%",
    display: "flex",
  },
  boxBackImg: {
    display: "flex",
    justifyContent: "center",
  },
  boxImage: {
    backgroundColor: "#e8fcff",
  },
  radiusRight: {
    borderRadius: "13px 0px 0px 13px",
    border: "none",
    boxShadow: "rgb(0 0 0 / 5%) -6px 0px 15px 1px",
    width: "100%",
  },
  innerWrapper: {
    backgroundImage: "url(" + loginScreenImage + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xl")]: {
      mt: 0,
    },
  },
  staticHeaderWrapper: {
    display: "flex",
    justifyContent: { sm: "space-between", xs: "center" },
    px: 5,
    py: {xl:4,lg:2,md:2,sm:2,xs:2},
    gap: { sm: 0, xs: 2 },
  },
  textStyle: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "27px",
    fontStyle: "normal",
    cursor: "pointer",
  },
  headerButtonStyle: {
    width: { sm: "175px", xs: "160px" },
    background: "#7A81FD",
    borderRadius: "35px",
    padding: "0 20px",
  },
} as const;

export default landingPageStyles;
