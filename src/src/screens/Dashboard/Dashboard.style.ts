import {
  appColor,
  boldFont,
  customScrollCssInner,
  customScrollCssOuter,
  getRelativeFontSize,
  iconBoxStyle,
  mediumFont,
  mediumFontDashboard,
  sidebarColor,
  sournceSansFamily,
  theme,
} from "utils/styles";

const DashboardStyle = {
  mainWrapper: {
    mt: { xl: 11, lg: 11, md: 11, sm: 11, xs: 13 },
    px: 3,
    overflow: "auto",
    height: "calc(100vh - 131px)",
    ...customScrollCssOuter,
  },
  headerStyle: {
    margin: "35px",
  },
  timingStyle: {
    fontSize: "16px",
    fontWeight: 400,
    marginLeft: 1,
    color: "#6F7190",
  },
  timingStyleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  tableClass: {
    marginTop: "20px",
    marginBottom: "20px",
    // backgroundColor: "#282945",
  },
  assigneePaper: {
    borderRadius: "36px",
  },
  noOfItems: {
    color: "#ffffff",
    opacity: "22%",
  },
  noOfItems1: {
    color: "#373854",
    opacity: "13%",
  },
  ViewPopOverWrapper: { backgroundColor: appColor, borderRadius: "24px" },
  ViewPopOverWrapper1: { backgroundColor: "#ffffff", borderRadius: "24px" },
  popOverHeading: {
    padding: "5px 16px 5px",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
    color: "#ffffff",
    backgroundColor: "#7A81FD !important",
    fontWeight: 700,
    fontFamily: sournceSansFamily,
    fontStyle: "normal",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    alignSelf: "center",
  },

  popOverListItem: {
    padding: "10px 10px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  // view Result dashBoard css
  dashBoardHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: "50px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "37px",
    fontWeight: "700",
    color: "#ffffff",
    [theme.breakpoints.up("xl")]: {
      fontSize: "30px",
    },
  },
  squareBox: {
    ...iconBoxStyle,
    background: "#EFEFFF",
    textAlign: "center",
  },
  tasksStyle: {
    textAlign: "center",
  },
  cardText: {
    fontWeight: 400,
    fontSize: "18px",

    [theme.breakpoints.down("xl")]: {
      fontSize: "14px",
      fontWeight: "500",
      paddingLeft: "10px",
    },
  },
  dataCardStyleTotal: {
    // ...paperStyleDashboard,
    paddingY: 1.5,
    paddingX: 1,
    direction: "row",
    borderRadius: "25px",
    display: "flex",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  dataCardStyleyes: {
    // ...paperStyleDashboard,
    paddingY: 1.5,
    paddingX: 1,
    direction: "row",
    borderRadius: "25px",
    display: "flex",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  dataCardStyleNo: {
    // ...paperStyleDashboard,
    paddingY: 1.5,
    paddingX: 1,
    borderRadius: "25px",
    direction: "row",
    display: "flex",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  dashboardTopCardTextAndImageWrapper: {
    display: "flex",
    justifyContent: "space-between",
    px: { md: 0.8, sm: 2, xs: 2 },
  },
  tasksstylegrid: {
    minHeight: "115px",
    boxShadow: "none",
    borderRadius: "30px",
  },
  documentCard: {
    borderRadius: "37px",
    minHeight: "65px",
  },
  myTaskInnerStyle: {
    width: {
      xl: "200px",
      lg: "150px",
      md: "200px",
      sm: "200px",
      xs: "200px",
    },
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "0 25px 25px 0",
    background: `linear-gradient(to left, rgba(232, 140, 124, 1), rgba(232, 140, 124, 0))`,
  },
  openTaskInnerStyle: {
    width: {
      xl: "200px",
      lg: "150px",
      md: "200px",
      sm: "200px",
      xs: "200px",
    },
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "0 25px 25px 0",
    background: `linear-gradient(to left, rgba(81, 179, 223, 1), rgba(81, 179, 223, 0))`,
  },
  dataCardStylePending: {
    // ...paperStyleDashboard,
    paddingY: 1.5,
    paddingX: 1,
    borderRadius: "25px",
    direction: "row",
    display: "flex",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  dataCardStyleDue: {
    // ...paperStyleDashboard,
    paddingY: 1.5,
    paddingX: 1,
    borderRadius: "25px",
    direction: "row",
    display: "flex",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  selectCardStyle: {
    paddingY: 1.5,
    paddingX: 1,
    border: "1px solid rgb(122, 129, 253)",
    borderRadius: "25px",
    direction: "row",
    display: "flex",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  cardSelectStyle: {
    height: "47px",
    borderRadius: "34px",
    fontFamily: "Verdana !important",
    width: "100%",
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "#C1C1C1 !important",
    },
  },
  GraphStyle: {
    minHeight: "200px",
    borderRadius: "37px",
    paddingX: "16px",
    paddingY: "10px",
    backgroundColor: sidebarColor,
    [theme.breakpoints.up("xl")]: {
      minHeight: "200px",
      // maxHeight: "320px",
    },
    [theme.breakpoints.down("xl")]: {
      minHeight: "200px",
    },
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
    cursor: "pointer",
  },
  GraphStyle2: {
    // minHeight: "300px",
    borderRadius: "37px",
    overFlow: "auto",
    maxHeight: "260px",
    paddingX: "16px",
    paddingY: "9px",
    backgroundColor: sidebarColor,
    [theme.breakpoints.up("xl")]: {
      minHeight: "320px",
    },
    [theme.breakpoints.down("xl")]: {
      minHeight: "250px",
    },
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
    cursor: "pointer",
  },
  GraphStyle1: {
    borderRadius: "37px",
    overFlow: "auto",
    maxHeight: "65vh",
    paddingX: "16px",
    paddingY: "9px",
    backgroundColor: sidebarColor,
    [theme.breakpoints.up("xl")]: {
      minHeight: "360px",
    },
    [theme.breakpoints.down("xl")]: {
      minHeight: "360px",
    },
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  lostRfpStyleWrapper: {
    borderRadius: "37px",
    overflowY: { xl: "hidden", lg: "auto", md: "auto", sm: "auto", xs: "auto" },
    height: {
      xl: "267px",
      lg: "267px",
      md: "245px",
      sm: "245px",
      xs: "245px",
    },
    ...customScrollCssInner,
    paddingX: "16px",
    paddingY: "9px",

    backgroundColor: sidebarColor,
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  },
  openMyStyleWrapper: {
    borderRadius: "37px",
    overflow: "hidden",
    height: {
      xl: "267px",
      lg: "267px",
      md: "245px",
      sm: "245px",
      xs: "245px",
    },
    ...customScrollCssInner,
    paddingX: "16px",
    paddingY: "9px",
    backgroundColor: sidebarColor,
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  },
  upgradePlanMainWrapper: {
    borderRadius: "37px",
    overflow: "hidden",
    height: {
      xl: "267px",
      lg: "267px",
      md: "245px",
      sm: "245px",
      xs: "245px",
    },
    ...customScrollCssInner,
    paddingX: "16px",
    paddingY: "9px",
    backgroundColor: sidebarColor,
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  },
  byDomainCardStyle: {
    borderRadius: "37px",
    overFlow: "auto",
    maxHeight: {
      xl: "360px",
      lg: "350px",
      md: "560px",
      sm: "560px",
      xs: "560px",
    },
    paddingX: "16px",
    paddingY: "9px",
    backgroundColor: sidebarColor,
    [theme.breakpoints.up("xl")]: {
      minHeight: "360px",
    },
    [theme.breakpoints.down("xl")]: {
      maxHeight: {
        xl: "360px",
        lg: "350px",
        md: "360px",
        sm: "560px",
        xs: "560px",
      },
    },
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  cardHeaderTextStyle: {
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "34.18px",
    padding: "9px 0px 0px 16px",
    marginLeft: 1,
  },
  containerTitle: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "34.18px",
    padding: "9px 16px",
    [theme.breakpoints.down("md")]: {
      fontSize: getRelativeFontSize(),
    },
  },
  allCardMargin: {
    [`@media screen and (max-width: ${1199}px)`]: {
      mt: 3,
    },
  },
  byTypeProgessTypeWrapper2: {
    transform: "rotateZ(-90deg)",
    [`@media screen and (max-width: ${570}px)`]: {
      marginTop: "-60px",
    },
    [`@media screen and (max-width: ${400}px)`]: {
      marginTop: "-1px",
    },
    [`@media screen and (max-width: ${380}px)`]: {
      marginTop: "-17px",
    },
  },
  byTypeProgesssType: {
    [`@media screen and (max-width: ${570}px)`]: {
      p: 3,
    },
    [`@media screen and (max-width: ${427}px)`]: {
      p: 1.7,
      mt: 2,
    },
    [`@media screen and (max-width: ${400}px)`]: {
      p: 2,
    },
    [`@media screen and (max-width: ${380}px)`]: {
      p: 1,
    },
  },
  byTypeCardStyle: {
    cursor: "pointer",
    [`@media screen and (max-width: ${570}px)`]: {
      marginLeft: "100px",
    },
    [`@media screen and (max-width: ${400}px)`]: {
      marginLeft: "100px",
    },
  },
  byTypeCardTextStyle: {
    [`@media screen and (max-width: ${570}px)`]: {
      // marginLeft: "100px",
      // marginTop: "100px",
      marginTop: "-80px",
      marginLeft: "-150px",
    },
    [`@media screen and (max-width: ${400}px)`]: {
      marginLeft: "260px",
      marginTop: "-60px",
    },
    [`@media screen and (max-width: ${380}px)`]: {
      marginLeft: "-170px",
      marginTop: "-50px",
    },
  },
  byCardTextStyle2: {
    [`@media screen and (max-width: ${570}px)`]: {
      marginLeft: 10,
    },
    [`@media screen and (max-width: ${515}px)`]: {
      marginLeft: 8,
    },
    [`@media screen and (max-width: ${400}px)`]: {
      marginLeft: -10,
    },
    [`@media screen and (max-width: ${427}px)`]: {
      marginLeft: 7,
    },
    [`@media screen and (max-width: ${380}px)`]: {
      marginLeft: 6.7,
    },
  },
  containerTitleCount: {
    fontWeight: 500,
    // padding: "30px",
    wordBreak: "break-all",
    // color: "#ffffff",
    [theme.breakpoints.down("md")]: {
      fontSize: getRelativeFontSize(),
    },
  },
  byRegionUsaStyle: {
    [`@media screen and (max-width: ${429}px)`]: {
      marginLeft: "35px",
    },
  },
  byRegionCanadaStyle: {
    [`@media screen and (max-width: ${429}px)`]: {
      marginRight: "35px !important",
    },
  },
  custompaperstatus: {
    backgroundColor: "#373854",
    borderRadius: "19px",
    boxShadow: "none",
  },
  containertasks: {
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.85)",
    opacity: "0.7",
    textAlign: "center",
  },
  containertasksCount: {
    color: "#000000",
    textAlign: "center",
    fontWeight: 600,
  },
  dataCardStyleYes: {
    // ...paperStyleDashboard,
    p: 2,
    direction: "row",
    backgroundColor: "#13b4ca",
  },
  mediumFonts: {
    textAlign: "center",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.85)",
  },
  mediumFontsSubmission: {
    ...mediumFontDashboard,
    fontSize: getRelativeFontSize(11),
    color: " rgba(0,0,0,.85)",
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(8),
    },
  },
  mediumFontsRole: {
    ...mediumFont,
    fontSize: getRelativeFontSize(5),
    textAlign: "center",
  },
  mediumFontsStatus: {
    fontWeight: 600,
    padding: "10px",
    color: "rgba(0, 0, 0, 0.85)",
    [theme.breakpoints.down("md")]: {
      fontSize: getRelativeFontSize(),
    },
  },
  wonProposal: {
    Width: "auto",
    height: "580px",
    borderRadius: "15px",
  },
  wonTitle: {
    minHeight: "170px",
    position: "relative",
    top: "9%",
    background: "rgba(19,180,202,.15)",
    borderRadius: "15px",
    width: "92%",
    padding: "80px 10px 15px",
    textAlign: "center",
    margin: "30px 0 0",
    marginTop: "-80px",
    alignItem: "center",
    marginLeft: "5px",
  },
  mediumFontsWon: {
    textAlign: "center",
    fontWeight: 600,
  },
  dropdown: {
    height: 40,
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    color: "#22222C",
    border: 0,
    boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      border: 0,
    },
    [theme.breakpoints.down("sm")]: {
      width: "45vw",
    },
  },
  tasksTableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "auto",
  },
  percentTextStyle: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  dropDownStyle: {
    height: "47px",
    width: "160px",

    fontFamily: "Verdana !important",
    borderRadius: "12px",
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
      color: "#ffffff",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  dropdownStyling: {
    height: "39px",
    width: "160px",
    fontFamily: "Verdana !important",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    borderRadius: "34px",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  dropdonwLightStyle: {
    height: "39px",
    width: "160px",
    fontFamily: "Verdana !important",
    ".MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    borderRadius: "34px",
    "& .MuiSelect-icon": {
      color: "#7A81FD",
    },
    "& .MuiInputBase-input": {
      borderColor: "#4B0150",
      fontSize: getRelativeFontSize(),
    },
  },
  linearProgressByTypeLinearColor: {
    "& .css-5xe99f-MuiLinearProgress-bar1": {
      background:
        "linear-gradient(to left,rgba(122, 129, 253, 1), rgba(122, 129, 253, 0))",
    },
  },
  lostRfpTableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "auto",
    borderRadius: "37px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
  openMyTextStyle: {
    fontWeight: 600,
    padding: "10px",
    color: "rgba(0, 0, 0, 0.85)",
    [theme.breakpoints.down("md")]: {
      fontSize: getRelativeFontSize(),
    },
  },
  dueRfpTableStyle: {
    width: "100%",
    overflow: "auto",
    borderRadius: "37px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    },
  },
} as const;
export default DashboardStyle;
