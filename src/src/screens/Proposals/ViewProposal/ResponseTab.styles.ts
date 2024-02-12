import { centerItemFlex, theme } from "utils/styles";

export const ResponseTabStyles = {
  headingLable: {
    color: "white",
    marginTop: "10px",
  },
  mainBox: {
    display: "flex",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },
  buttonWrapper: {
    display: "flex",
    marginLeft: "10px",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },
  card: {
    objectFit: "cover",
    backgroundColor: "#ffffff",
    height: "430px",
    width: "370px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.9)",
    // margin: "25px 25px 25px 50px",
  },
  cardBox: {
    cursor: "pointer",
    objectFit: "cover",
  },
  dialogFooterClass: {
    backgroundColor: "red !important",
    alignItem: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  stack: {
    paddingLeft: "80px",
  },
  centerItemFlex: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  dialogFooter: {
    width: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
    "& button": {
      width: "120px",
    },
  },
};
