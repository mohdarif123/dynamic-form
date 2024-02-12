import {
  AppBar,
  Box,
  Card,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { CustomIcon } from "global/components";
import layoutStyles from "./Layout.style";
import divider from "assets/icons/divider.svg";
import DividerGray from "assets/icons/DividerGray.svg";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  clearVisitedUrlAction,
  logOutAction,
  selectRole,
  selectUserName,
} from "redux/authSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import profileImage from "assets/icons/profileImage.svg";
import logout from "assets/icons/logout.svg";
import UserStorage from "assets/icons/usersStorage.svg";
import {
  appColor,
  drawerWidth,
  mainColor,
  primaryBlackColor,
  primaryColorBlack,
  pureWhiteColor,
  sidebarColor,
  theme,
} from "utils/styles";
import Subscription from "assets/icons/Subscription.svg";
import sun from "assets/images/sun.svg";
import WhiteMoon from "assets/images/Moon.svg";
import {
  selectBackgroundColor,
  themeChangeAction,
} from "redux/themeChangeSlice";
import { store } from "utils/store";
import urls from "global/constants/UrlConstants";
import history from "utils/history";

import { useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { appAdminUserSpecificPermission } from "utils/AuthorizationManager";
import AppDrawer from "../AppDrawer/AppDrawer";

const AppHeader = () => {
  const classes = layoutStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const loggedInUserName = useAppSelector(selectUserName);
  const [menuMobileVisible, setMenuMobileVisible] = useState<boolean>(false);
  const loggedInUserRole = useAppSelector(selectRole);
  const [profile, setProfile] = useState<boolean>(false);
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dispatch = useAppDispatch();
  const handleClose = () => {
    setProfile(false);
  };

  const handleMenuMobileVisibility = () => {
    setMenuMobileVisible(true);
  };
  const handleLogout = () => {
    setTimeout(() => {
      store.dispatch(logOutAction());
      dispatch(clearVisitedUrlAction());
      history.push(urls.LANDING_VIEW_PATH);
    }, 1000);
    setProfile(false);
  };

  const handleViewClick = () => {
    setProfile(false);
    history.push(urls.USER_PROFILE_VIEW_PATH);
  };

  const themeSwitchHandler = () => {
    setProfile(false);
    dispatch(
      themeChangeAction({
        backgroundColor: !bgcolor,
      })
    );
  };
  const handleUserStoreClick = () => {
    setProfile(false);
    history.push(urls.viewBillingDetails);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setMenuMobileVisible(false);
    };

  const getMobileMenuDrawer = () => {
    return (
      <Drawer
        open={menuMobileVisible}
        onClose={toggleDrawer}
        sx={{
          paper: classes.menuMobile,
          "& .MuiDrawer-paper": {
            background: !bgcolor ? "white" :"none",
          },
        }}
      >
        <AppDrawer
          setMenuMobileVisible={setMenuMobileVisible}
          menuMobileVisible={menuMobileVisible}
        />
      </Drawer>
    );
  };

  const AppHeaderData = () => {
    return (
      <>
        <Box mt={3}>
          <Grid container>
            <Grid
              item
              xl={0}
              lg={0}
              md={0}
              sm={1}
              xs={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box ml={2} sx={classes.hamberStyle}>
                {!menuMobileVisible && !isDesktop && (
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={handleMenuMobileVisibility}
                  >
                    <MenuIcon
                      style={{
                        color: !bgcolor ? primaryColorBlack : pureWhiteColor,
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={11} xs={11}>
              <Grid
                container
                style={{ display: "flex" }}
                justifyContent="flex-end"
              >
                <Grid
                  item
                  mr={1.5}
                  sm={loggedInUserName?.length >= 25 ? 6 : 4}
                  xs={loggedInUserName?.length >= 25 ? 7 : 6}
                  md={loggedInUserName?.length >= 25 ? 4 : 3}
                  lg={loggedInUserName?.length >= 25 ? 2.9 : 2}
                  xl={loggedInUserName?.length >= 25 ? 2.5 : 1.4}
                >
                  <Typography
                    sx={classes.nameText}
                    variant="h3"
                    style={{
                      color: !bgcolor ? primaryBlackColor : "#8F8F8F",
                    }}
                  >
                    {loggedInUserName}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Typography
                      sx={classes.roleText}
                      variant="h4"
                      style={{
                        color: !bgcolor ? "#20213D" : pureWhiteColor,
                        width: "35vh",
                      }}
                    >
                      {loggedInUserRole}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item  xs={1.5} sm={0.8} md={0.5} lg={0.4} xl={0.3}>
                  <Box sx={classes.squareBox}>
                    <Typography sx={classes.avatarStyle} variant="h5">
                      {loggedInUserName.charAt(0)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xl={0.4} lg={0.4} md={0.6} sm={0.9} xs={1}>
                  <CustomIcon
                    icon={
                      <KeyboardArrowDownIcon sx={classes.keyboardIconStyle} />
                    }
                    onClick={() => {
                      setProfile(true);
                    }}
                  />
                </Grid>
                {
                  <Popover
                    open={profile}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    style={{
                      marginTop: "60px",
                      marginLeft: "-15px",
                    }}
                    sx={classes.styleTExt}
                  >
                    <Card sx={classes.cardToggleContent}>
                      <Box sx={classes.cardToggleTextWrapper}>
                        <Typography
                          sx={classes.ToggleContent}
                          onClick={() => handleViewClick()}
                          variant="h3"
                        >
                          Profile
                        </Typography>
                        <Box
                          margin="5px"
                          marginLeft="20px"
                          component={"div"}
                          onClick={() => handleViewClick()}
                        >
                          <CustomIcon
                            icon={<img src={profileImage} alt="profile" />}
                          />
                        </Box>
                      </Box>
                      {appAdminUserSpecificPermission() && (
                        <Box sx={classes.cardToggleTextWrapper}>
                          <Typography
                            sx={classes.ToggleContent}
                            onClick={() => handleUserStoreClick()}
                            variant="h3"
                          >
                            Billing Detail
                          </Typography>
                          <Box margin="5px" marginLeft="15px" onClick={() => handleUserStoreClick()}>
                            <CustomIcon
                              icon={<img src={Subscription} alt="UserStorage" />}
                            />
                          </Box>
                        </Box>
                      )}
                      {/* <Box sx={classes.cardToggleTextWrapper}>
                        <Typography
                          sx={classes.ToggleContent}
                          onClick={() => handleViewClick()}
                          variant="h3"
                        >
                          Pricing
                        </Typography>
                        <Box marginLeft="20px">
                          <CustomIcon
                            icon={<img src={pricing} alt="UserStorage" />}
                          />
                        </Box>
                      </Box> */}
                      {/* <Box
                        sx={{
                          border: !bgcolor
                            ? "1px solid #BFBFFE"
                            : "1px solid #5E5F7B",
                          borderRadius: "21px",
                          padding: "2px",
                          marginLeft: "70px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          height: "30px",
                        }}
                      > */}
                      <Box sx={classes.cardToggleTextWrapper}>
                        <Typography
                          sx={classes.ToggleContent}
                          variant="h3"
                          onClick={themeSwitchHandler}
                        >
                          Theme
                        </Typography>
                        <Box
                          component={"img"}
                          src={bgcolor ? sun : WhiteMoon}
                          style={{
                            margin: "5px",
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                          onClick={themeSwitchHandler}
                        />
                      </Box>
                      <Box sx={classes.cardToggleTextWrapper} component={"div"}>
                        <Typography
                          sx={classes.ToggleContent}
                          onClick={() => {
                            handleLogout();
                          }}
                          variant="h3"
                        >
                          Logout
                        </Typography>
                        <Box
                          marginLeft="20px"
                          component={"div"}
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          <CustomIcon
                            icon={<img src={logout} alt="UserStorage" />}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Popover>
                }
              </Grid>
            </Grid>
          </Grid>
          {!isDesktop && getMobileMenuDrawer()}
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          width: `calc(100% - ${"220"}px)`,
          height: "25px",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            ml: { md: `${drawerWidth}px` },
            height: { xl: "78px", lg: "78px", md: "78px" },
            bgcolor: !bgcolor ? mainColor : appColor,
            boxShadow: "none",
            borderBottom: "none",
          }}
        >
          {AppHeaderData()}
          <Divider
            sx={{
              color: !bgcolor ? "#A4A6E2" : sidebarColor,
              backgroundColor: !bgcolor ? "#A4A6E2" : sidebarColor,
              marginTop: 1.5,
              marginLeft: { xl: 4, lg: 4, md: 3, sm: 1, xs: 0 },
            }}
          />
        </AppBar>
      </Box>
    </>
  );
};
export default AppHeader;
