import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import appHeaderStyles from "./AppHeader.styles";
import AppDrawer from "../AppDrawer/AppDrawer";
import { drawerWidth, skyPrimaryColor, theme } from "utils/styles";
import { useAppDispatch } from "utils/hooks";
import RFPLogo from "assets/images/logo.png";
import LogoutIcon from "assets/images/Logout.png";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
interface CustomProps {
  toggleDrawer: Function;
  handleLogout?: any;
}

const AppHeader = (props: CustomProps) => {
  const classes = appHeaderStyles;
  const [menuMobileVisible, setMenuMobileVisible] = useState<boolean>(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useAppDispatch();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuMobileVisibility = (event: any) => {
    setMenuMobileVisible(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

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
  const getRFPLogo = () => {
    return (
      <Box sx={classes.logoBox}>
        <img src={RFPLogo} width="220px" alt="RFPLogo" />
      </Box>
    );
  };
  const getMobileMenuDrawer = () => {
    return (
      <Drawer
        open={menuMobileVisible}
        onClose={toggleDrawer}
        sx={{
          paper: classes.menuMobile,
        }}
      >
        <AppDrawer
          setMenuMobileVisible={setMenuMobileVisible}
          menuMobileVisible={menuMobileVisible}
        />
      </Drawer>
    );
  };
  const getLogoutButton = () => {
    return (
      <Box sx={classes.logOutWrapper}>
        <img
          src={LogoutIcon}
          alt="LogoutIcon"
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
      </Box>
    );
  };
  const getAppHeader = () => {
    return (
      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% )` },
            ml: { md: `${drawerWidth}px` },
            height: "35px",
            bgcolor: skyPrimaryColor,
            boxShadow: "none",
            [`@media screen and (max-width: ${1390}px)`]: {
              height: "55px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#13b4ca",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            {isDesktop ? (
              <Box
                onClick={() => {
                  history.push(urls.DASHBOARD_VIEW_PATH);
                }}
              >
                {getRFPLogo()}
              </Box>
            ) : (
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  sx={{ mr: 2, display: { md: "none" } }}
                  // onClick={() => props.toggleDrawer()}
                  onClick={handleMenuMobileVisibility}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            )}

            <Box sx={classes.iconWrapper} onClick={() => props?.handleLogout()}>
              {getLogoutButton()}
            </Box>
          </Box>
        </AppBar>

        {getMobileMenuDrawer()}
      </Box>
    );
  };

  return getAppHeader();
};

export default AppHeader;
