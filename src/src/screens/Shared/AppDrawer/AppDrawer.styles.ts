import {
  boldFont,
  drawerWidth,
  getRelativeFontSize,
  mediumFont,
  regularFont,
  theme,
  pinkDarkColor,
  sidebarColor,
} from "utils/styles";
import BackgroundLightSelect from "assets/images/lightTheme.svg";
import BackgroundSelect from "assets/images/select.png";
import HideDrawerLogo from "assets/images/HideDrawerLogo.svg";
import DrawerHideLight from "assets/images/DrawerHideLight.svg";
const appDrawerStyles = {
  drawer: {
    display: "flex",
    [theme.breakpoints.up("xl")]: {
      height: `95vh`,
    },
    [theme.breakpoints.down("xl")]: {
      height: `92vh`,
    },
    boxShadow: " 0px 0px 40px rgba(0, 0, 0, 0.09)",
    [theme.breakpoints.up("xl")]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down("xl")]: {
      width: 255,
    },
    backgroundColor: sidebarColor,
    padding: 0,
    borderRadius: "37px",
    marginTop: 3,
    marginBottom: 3,
    marginRight: { xl: "0", lg: "0", md: "0", sm: "20px", xs: "20px" },
    marginLeft: 2,
    zIndex: 1,
  },
  drawerHideStyle: {
    display: "flex",
    [theme.breakpoints.up("xl")]: {
      height: `95vh`,
    },
    [theme.breakpoints.down("xl")]: {
      height: `92vh`,
    },
    boxShadow: " 0px 0px 40px rgba(0, 0, 0, 0.09)",
    [theme.breakpoints.up("xl")]: {
      width: 100,
    },
    [theme.breakpoints.down("xl")]: {
      width: 100,
    },
    backgroundColor: sidebarColor,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    padding: 0,
    borderRadius: "37px",
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 2,
    zIndex: 1,
  },
  drawerWidth: {
    [theme.breakpoints.up("xl")]: {
      width: drawerWidth,
    },
    display: "flex",
    flexDirection: "column",
    marginTop: "5%",
    overflowY: "hidden",
    overflowX: "hidden",
    [theme.breakpoints.down("xl")]: {
      width: drawerWidth,
      height: "89vh",
    },
    [theme.breakpoints.down("md")]: {
      width: 276,
    },
    [theme.breakpoints.down("sm")]: {
      width: 290,
    },
  },
  navLink: {
    textDecoration: "none",
  },
  menuItems: {
    margin: "0px",
  },
  listItemIconStyle: {
    minWidth: "35px",
  },
  subMenuItems: {
    borderLeft: "4px solid",
  },
  menuOptionsHeight: {
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      border: "none",
    },
    "&::-webkit-scrollbar-button:start": {display:"block"},
    "&::-webkit-scrollbar-button:end": {display:"block"},
    paddingLeft: { xl: "20px", lg: "10px" },
  },
  menuOptionsHeightHide: {
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    paddingTop: "40px",
    paddingLeft: { xl: "13px", lg: "14px", md: "14px" },
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
  },
  menuOptionListItem: {
    ...mediumFont,
    cursor: "pointer",
    borderLeft: "4px solid transparent",
  },
  selectedMenuOptionListItem: {
    color: "hsla(0,0%,100%,.65)",
    display: "flex",
  },
  menuOption: {
    display: "flex",
    textDecoration: "none",
    fontWeight: 400,
    color: "#ffffff",
    flexDirection: "column",
    gap: "37px",
  },
  selectedMenuOption: {
    display: "flex",
    fontWeight: 400,
    textDecoration: "none",
    color: "#7A81FD",
    flexDirection: "column",
  },
  appDrawerImage: {
    width: "100%",
    backgroundPosition: "center",
    backgroundImage: `url('${BackgroundSelect}')`,
    backgroundRepeat: "no-repeat",
  },
  appDrawerLightThemeImage: {
    width: "90%",
    backgroundPosition: "center",
    backgroundImage: `url('${BackgroundLightSelect}')`,
    backgroundRepeat: "no-repeat",
  },
  navBarLabel: {
    fontWeight: 400,
    fontSize: "18px",
  },
  navBarLabelHide: {
    ...mediumFont,
    display: "none",
  },
  logoBox: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("xl")]: {
      height: "3.5vh",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
    mt: 1,
  },
  logoBoxHide: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    mt: 1,
  },
  workText: {
    ...boldFont,
    display: "flex",
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
  },
  sageText: {
    ...boldFont,
    color: "#828282",
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
  },
  supportTicketBox: {
    borderRadius: "15px",
    mx: 5,
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {},
    marginBottom: "10%",
  },
  btnBox: {
    ...regularFont,
    textTransform: "none",
  },
  imgBox: {
    background: "#22BAB6",
    width: "32px",
    height: "32px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: pinkDarkColor,
    height: "8px",
    width: "8px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  getCampaignWrapper: {
    height: "25vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "16px",
    "& img": {
      width: "125px",
      height: "auto",
    },
  },
  getCampaignIcon: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  getCampaignImg: {
    width: "137px",
    height: "auto",
  },
  getCampaignPara: {
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "center",
    color: "#666666",
    ...regularFont,
    margin: "10px 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logOutWrapper: {
    height: "10vh",
    display: "flex",
    padding: "0 16px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: sidebarColor,
    borderRadius: "15px",
    [theme.breakpoints.down("xl")]: {},
  },
  logOutLeft: {
    display: "flex",
    alignItems: "center",
  },
  squareBox: {
    width: "46px",
    height: "46px",
    borderRadius: "15px",
    background: "#DBDBDB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarStyle: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
  },
  avatarFirstName: {
    color: "rgba(255, 255, 255, 0.65)",
    ...boldFont,
    fontSize: getRelativeFontSize(5),
    marginLeft: "8px",
    wordBreak: "break-all",
  },
  listItemStyleInner: {
    marginLeft: { xl: "13px", lg: "22px", md: "11px" },
    paddingTop: "0px",
    paddingLeft: { xl: "46px", lg: "41px", md: "40px" },
    paddingBottom: "18px",
  },
  listItemStyleInnerHide: {
    paddingLeft: { xl: "30px", lg: "20px", md: "20px", sm: "70px", xs: "85px" },
    paddingBottom: "18px",
  },
  listItemOpenDrawerLight: {
    backgroundPosition: "center",
    backgroundImage: `url('${BackgroundSelect}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "9vh",
    marginLeft: { xl: "13px", lg: "22px", md: "30px", sm: "30px", xs: "35px" },
    paddingLeft: { xl: "46px", lg: "41px", md: "40px", sm: "40px", xs: "50px" },
  },
  listItemOpenDrawerDark: {
    backgroundPosition: "center",
    backgroundImage: `url('${BackgroundLightSelect}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "9vh",
    marginLeft: { xl: "13px", lg: "22px", md: "30px", sm: "30px", xs: "35px" },
    paddingLeft: { xl: "46px", lg: "41px", md: "40px", sm: "40px", xs: "50px" },
  },
  listItemHideDark: {
    backgroundPosition: "center",
    backgroundImage: `url('${HideDrawerLogo}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "130px",
    height: "9vh",
    paddingLeft: { xl: "30px", lg: "20px", md: "20px" },
  },
  listItemHideLight: {
    backgroundPosition: "center",
    backgroundImage: `url('${DrawerHideLight}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "130px",
    height: "9vh",
    paddingLeft: { xl: "30px", lg: "20px", md: "20px" },
  },
  proTextStyle: {
    color: "rgba(122, 129, 253, 1)",
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: {
      fontSize: "28px",
    },
  },
  rfpTextStyle: {
    fontSize: "30px",
    fontFamily: "Verdana",
    [theme.breakpoints.up("xs")]: { fontSize: "28px" },
    marginLeft: "4px",
  },
  dividerStyleY: {
    width: "1px",
    position: "absolute",
    marginLeft: { md: "65px", sm: "80px", xs: "93px" },
  },
  dividerStyleX: {
    width: "6%",
    height: "1px",
  },
} as const;

export default appDrawerStyles;
