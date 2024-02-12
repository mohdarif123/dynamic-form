import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  regularFont,
  theme,
} from "../../utils/styles";

export const billingDetailsStyle = {
  mainContainer: {
    display: "contents",
    height: "95vh",
  },
  secondMainContainer: {
    spacing: 3,
    direction: "row",
    display: "flex",
    justifyContent: "center",
    mt: 12,
  },
  billingDetailsTableWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  billingDetailsBox: {
    borderRadius: "37px",
    boxShadow: "0px 8px 30px 0px #00000012",
    ...centerItemFlex,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      p: 1,
      m: 1,
      justifyContent: "center",
    },
    [theme.breakpoints.down("md")]: {
      width: "auto",
      p: 1,
      m: 1,
      justifyContent: "center",
    },
  },
  planCard: {
    borderRadius: "37px",
    ml: 1,
    mr: 1,
  },
  cardRecommends: {
    backgroundColor: "#fff",
    color: "#2596be",
    textAlign: "center",
    padding: "8px !important",
  },
  WihtoutcontenetCard: {
    backgroundColor: "#373854",
    textAlign: "center",
    paddingBottom: "15px",
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    "& .MuiCardHeader-title": {
      fontSize: "20px !important",
      fontWeight: "bold !important",
    },
  },
  cardFont: {
    // "& .css-11a3foo-MuiTypography-root" :{fontFamily:"sans-serif !important", fontSize:"1rem"},
    "& .MuiTypography-root": {
      fontFamily: "sans-serif !important",
      fontSize: "1rem !important",
    },
    marginBottom: "6px",
    // "& .css-1x0r1rb-MuiTypography-root" :{fontFamily:"sans-serif !important", fontSize:"1rem"},
    // "& .css-1u9ybmp-MuiTypography-root" :{fontFamily:"sans-serif !important", fontSize:"1rem"}
  },
  cardBody: {
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "15.96px",
    textAlign: "center",
    borderBottomLeftRadius: "9px",
    borderBottomRightRadius: "9px",
    minHeight: "295px",
  },
  tasksTableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "auto",
  },
  centerItemFlexStyle: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  buttonWrapper3: {
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
  buttonWrapper: {
    display: "flex",
    marginLeft: "3px",
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },
  centerItemFlexBilling: {
    ...centerItemFlex,
    flexDirection: "column",
  },
  deleteDialogFooter: {
    ...centerItemFlex,
    gap: "10px",
    paddingBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },
  fontText: {
    ...regularFont,
  },
  titleRight: {
    color: "#CBCBCB",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  billingCardBody: {
    minHeight: "370px",
    maxHeight: "370px",
    overflowY: "auto",
  },
  customBtn: {
    backgroundColor: "#13b4ca",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
  },
  addCardBtn: {
    backgroundColor: "#13b4ca",
    marginTop: "20px",
    marginRight: "30px",
    borderRadius: "37px",
    minWidth: "100px",
    width: "120px",
  },
  content: {
    fontWeight: 500,
    fontSize: "20px",
    wordBreak: "break-all",
  },
  icon: { display: "flex" },
  statusTextStyle: {
    fontWeight: 600,
    color: "rgb(122, 129, 253)",
  },
  cardNumber: {
    color: "rgb(122, 129, 253)",
    fontSize: "14px",
    padding: " 0",
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  billingCardBodyWrapper: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "50px",
    padding: "10px",
    width: "100%",
    minWidth: "120px",
    display: { xl: "flex", lg: "flex", md: "flex", sm: "block", sx: "block" },
    mb: 2,
    ml: 4,
    mr: 4,
    mt: 2,
    justifyContent: "space-between",
  },
  buttonWrapper2: {
    cursor: "pointer",
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    spacing: 2,
  },
  cardBtn: { width: "fit-content", height: "40px" },
  noDataImg: { overflow: "auto", height: "100px", width: "100%" },
};
