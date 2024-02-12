import { boldFont, mediumFont, theme } from "../../../utils/styles";

const customTabsStyles = {
  headerBox: {
    background: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {},
  },
  mainBox: {
    padding: "15px 30px",
  },
  customTabsText: {
    ...boldFont,
  },
  outerTabBox: {
    marginTop: "10px",
    borderBottom: "none",
  },
  tab: {
    "& .MuiButtonBase-root-MuiTab-root": {
      padding: "12px 2px",
    },
  },
  button: {
    padding: "0px 0px",
    width: "12.5%",
    // backgroundColor: "#282945",
  },
  tabBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "2px",
    // borderRadius: "8px",

    height: "60px",
    width: "100%",
  },
  tabBox1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "2px",
    // borderRadius: "8px",
    borderRadius: "37px",
    height: "60px",
    width: "100%",
  },
  active: {
    // backgroundColor: primaryActiveTabBgColor,
    // color: primaryColorPurple,
    background: "#7A81FD",
    color: "#Ffffff",
  },
  inActive: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  active1: {
    // backgroundColor: primaryActiveTabBgColor,
    // color: primaryColorPurple,
    background: "#7A81FD",
    color: "#Ffffff",
  },
  inActive1: {
    backgroundColor: "#282945",
    color: "#FFFFFF",
  },
  activeStyle: {
    background: "white",
    color: "#7A81FD",
    borderBottom: "4px solid #7A81FD",
  },
  inActiveStyle: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderBottom: "4px solid gray",
  },
  active1Style: {
    background: "#282945",
    color: "#7A81FD",
    borderBottom: "4px solid #7A81FD",
  },
  inActive1Style: {
    backgroundColor: "#282945",
    color: "#FFFFFF",
    borderBottom: "4px solid gray",
  },
  text: {
    fontSize: "23px",
    weight: 600,
    lineHeight: "32.75px",
    marginLeft: "30px",
    marginRight: "20px",
  },
  textOneLine: {
    display: "flex",
    alignItems: "center",
  },
  text1: {
    fontSize: "19px",
    weight: 300,
    lineHeight: "27.06px",
    margin: "5px",
    marginLeft: "20px",
  },

  tabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // fontFamily: "SourceSans3_Medium",
    fontWeight: 500,
    margin: theme.spacing(1),
    textTransform: "none",
    color: "#13b4ca!important",
  },
  counts: {
    marginLeft: theme.spacing(1),
    width: "26px",
    opacity: "0.5",
    borderRadius: "6px",
    ...mediumFont,
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
  },
  input: {
    border: "1px solid #E7E7E7",
  },
  btnBox: {
    color: "white",
    textTransform: "none",
    justifyContent: "space-between",
  },
  addBox: {
    background: "#4F31BC",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    color: "#FFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default customTabsStyles;
