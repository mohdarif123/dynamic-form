const PageNotFoundStyles = {
  mainContainer: {
    backgroundColor: "rgba(20, 20, 45, 1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "92vh",
  },
  mainContainer1: {
    backgroundColor: "rgba(249, 249, 255, 1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  imgStyle: {
    width: { xl: "auto", lg: "auto", md: "1auto", sm: "100px", xs: "100px" },
    height: "",
  },
} as const;

export default PageNotFoundStyles;
