import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import appDrawerStyles from "./AppDrawer.styles";
import { useEffect, useState } from "react";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import {
  primaryBlackColor,
  pureWhiteColor,
  sidebarColor,
  theme,
} from "utils/styles";
import { NavLink, useParams } from "react-router-dom";
import { store } from "utils/store";
import { CloseButton } from "global/components";
import { logOutAction, selectRole } from "redux/authSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import React from "react";
import { GenerateMainMenu } from "utils/AuthorizationManager";
import { selectBackgroundColor } from "redux/themeChangeSlice";

import AppDrawerLogo from "assets/icons/AppDrawerLogo.svg";

interface CustomProps {
  setMenuMobileVisible?: Function;
  isActive?: boolean;
  menuMobileVisible?: boolean;
}

const AppDrawer = (props: CustomProps) => {
  // const appAccess = useAppSelector(selectAppAccess);
  const classes = appDrawerStyles;
  const isMediumOrLargerScreen = useMediaQuery("(min-width:960px)"); // Adjust the breakpoint as needed

  const [url, setUrl] = useState<string>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const appName = appNames.charAt(0).toUpperCase() + appNames.slice(1);

  let value = 0;
  window.location.pathname.split("/").map((item: any, index: number) => {
    if (item === "clients") {
      value = index;
    }
  });
  let data = true;
  if (value) {
    data = value + 1 === window.location.pathname.split("/").length;
  }
  const [optionItems, setOptionItems] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedOption, setSelectedOption] = useState({
    mainMenu: "/dashboard",
    subMenu: "",
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const userType: string = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const params = useParams<any>();
  const bgcolor = useAppSelector(selectBackgroundColor);
  useEffect(() => {
    generateAppDrawer();
  }, [userType]);

  useEffect(() => {
    getUrl();
  });

  const getUrl = () => {
    let tempUrl = window.location.pathname;
    tempUrl = tempUrl.substring(0, tempUrl.indexOf("/", 1));
    setUrl(tempUrl);
  };

  const generateAppDrawer = () => {
    setOptionItems([...GenerateMainMenu()]);
  };

  const handleRedirection = (
    redirectionURL: string,
    option?: any,
    isSubMenu?: boolean
  ) => {
    if (isSubMenu && option) {
      setSelectedOption({
        ...selectedOption,
        subMenu: option.key,
      });
    } else {
      setSelectedOption({
        mainMenu: option ? option.key : "",
        subMenu: "",
      });

      // Perform the redirection only if it's not a submenu click
      if (!isSubMenu) {
        history.push(redirectionURL);
      }
    }

    // Close the mobile menu if available
    // props.setMenuMobileVisible && props.setMenuMobileVisible(false);
  };

  const isActiveTab = (pathName: string) => {
    return window.location.pathname
      .toLocaleLowerCase()
      .includes(pathName.toLocaleLowerCase());
  };

  const getRedirect = (data: any) => {
    history.push(data[0].key);
  };

  const getRFPLogo = () => {
    return (
      <Box
        sx={
          isDrawerOpen || props.menuMobileVisible
            ? classes.logoBox
            : classes.logoBoxHide
        }
        onClick={() => {
          history.push(urls.DASHBOARD_VIEW_PATH);
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={"img"}
            src={AppDrawerLogo}
            sx={{ maxWidth: "37px" }}
          />
          {isDrawerOpen || props.menuMobileVisible ? (
            <>
              <Typography
                variant="h1"
                sx={classes.rfpTextStyle}
                style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
              >
                RFP
                <Typography
                  component={"span"}
                  variant="h1"
                  sx={classes.proTextStyle}
                >
                  PRO
                </Typography>
              </Typography>
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    );
  };

  const getListItemClassName = (option: any) => {
    if (isActiveTab(option.key)) {
      if (isDrawerOpen || props.menuMobileVisible) {
        return bgcolor
          ? classes.listItemOpenDrawerLight
          : classes.listItemOpenDrawerDark;
      } else {
        return !bgcolor ? classes.listItemHideLight : classes.listItemHideDark;
      }
    } else {
      return isDrawerOpen
        ? classes.listItemStyleInner
        : classes.listItemStyleInnerHide;
    }
  };

  const handleSubmenuToggle = (index: number, isOpen: boolean) => {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      setActiveIndex(-1);
    }
  };

  const renderSubmenuItems = (subMenuOptions: any, parentIndex: any) => {
    if (!subMenuOptions) return null;
    return (
      <Collapse
        in={activeIndex === parentIndex}
        sx={{
          marginTop: { xl: "-10px", lg: "-7px" },
          paddingBottom: { xl: "10px", lg: "7px" },
          position: "relative",
        }}
      >
        {subMenuOptions.map((data: any, index: number) => (
          <NavLink
            to={data.link}
            key={index}
            activeStyle={classes.selectedMenuOptionListItem}
            onMouseEnter={() => handleSubmenuToggle(parentIndex, true)}
            onMouseLeave={() => handleSubmenuToggle(parentIndex, false)}
            style={(isActive) =>
              isActive
                ? {
                    ...classes.selectedMenuOption,
                  }
                : { ...classes.menuOption }
            }
          >
            <Box
              sx={{
                ...classes.dividerStyleY,
                backgroundColor: !bgcolor
                  ? sidebarColor
                  : "rgba(255, 255, 255, 1)",
                height: index === subMenuOptions.length - 1 ? "27.3px" : "44px",
              }}
            />
            <ListItem
              sx={{
                marginLeft: {
                  xl: "50px",
                  lg: "50px",
                  md: "50px",
                  sm: "65px",
                  xs: "78px",
                },
                marginTop: "10px",
              }}
            >
              <Box
                sx={{
                  ...classes.dividerStyleX,
                  backgroundColor: !bgcolor
                    ? sidebarColor
                    : "rgba(255, 255, 255, 1)",
                }}
              />
              <ListItemIcon
                sx={{ ...classes.listItemIconStyle, marginLeft: "8px" }}
              >
                {isActiveTab(data.key) ? (
                  <img
                    src={!bgcolor ? data.lightActiveIcon : data.activeIcon}
                    alt="activeIcon"
                  />
                ) : (
                  <img
                    src={!bgcolor ? data.lightIcon : data.icon}
                    alt="option"
                  />
                )}
              </ListItemIcon>
              <ListItemText>
                {!bgcolor ? (
                  <>
                    <Typography
                      sx={
                        isDrawerOpen
                          ? classes.navBarLabel
                          : props.menuMobileVisible
                          ? classes.navBarLabel
                          : classes.navBarLabelHide
                      }
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "12px",
                        color: isActiveTab(data.key)
                          ? "rgba(122, 129, 253, 1)"
                          : "black",
                      }}
                    >
                      {data.text}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={
                        isDrawerOpen
                          ? classes.navBarLabel
                          : props.menuMobileVisible
                          ? classes.navBarLabel
                          : classes.navBarLabelHide
                      }
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "12px",
                        color: isActiveTab(data.key)
                          ? "rgba(122, 129, 253, 1)"
                          : "white",
                      }}
                    >
                      {data.text}
                    </Typography>
                  </>
                )}
              </ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </Collapse>
    );
  };
  const getMenuOptions = (option: any, index: number) => {
    return (
      <React.Fragment key={index}>
        <NavLink
          to={option.key}
          style={(isActive) =>
            isActive
              ? {
                  ...classes.selectedMenuOption,
                }
              : { ...classes.menuOption }
          }
          onMouseEnter={() => handleSubmenuToggle(index, true)}
          onMouseLeave={() => handleSubmenuToggle(index, false)}
          onClick={() => handleSubmenuToggle(index, true)}
        >
          <ListItem
            onClick={() => handleRedirection(option.link, option)}
            sx={getListItemClassName(option)}
          >
            <ListItemIcon sx={classes.listItemIconStyle}>
              {isActiveTab(option.key) ? (
                <img
                  src={!bgcolor ? option.lightActiveIcon : option.activeIcon}
                  alt="activeIcon"
                />
              ) : (
                <img
                  src={!bgcolor ? option.lightIcon : option.icon}
                  alt="option"
                />
              )}
            </ListItemIcon>
            <ListItemText>
              {!bgcolor ? (
                <>
                  <Typography
                    sx={
                      isDrawerOpen
                        ? classes.navBarLabel
                        : props.menuMobileVisible
                        ? classes.navBarLabel
                        : classes.navBarLabelHide
                    }
                    style={{
                      fontFamily: "Verdana",
                      color: isActiveTab(option.key)
                        ? "rgba(122, 129, 253, 1)"
                        : "black",
                    }}
                    variant="h5"
                  >
                    {option.text}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={
                      isDrawerOpen
                        ? classes.navBarLabel
                        : props.menuMobileVisible
                        ? classes.navBarLabel
                        : classes.navBarLabelHide
                    }
                    style={{
                      fontFamily: "Verdana",
                      color: isActiveTab(option.key)
                        ? "rgba(122, 129, 253, 1)"
                        : "white",
                    }}
                    variant="h5"
                  >
                    {option.text}
                  </Typography>
                </>
              )}
            </ListItemText>
          </ListItem>
        </NavLink>
        {renderSubmenuItems(option.subMenu, index)}
      </React.Fragment>
    );
  };

  const getNewMenuOptions = () => {
    return (
      <List dense>
        {optionItems.map((option, index) => {
          return <>{getMenuOptions(option, index)}</>;
        })}
      </List>
    );
  };

  const getCloseButton = () => {
    return (
      <CloseButton
        onClick={() =>
          props.setMenuMobileVisible && props.setMenuMobileVisible(false)
        }
      />
    );
  };
  const handleLogout = () => {
    setTimeout(() => {
      history.push(urls.LANDING_VIEW_PATH);
      store.dispatch(logOutAction());
    }, 1000);
  };
  const handleMouseEnter = () => {
    if (isMediumOrLargerScreen) {
      setIsDrawerOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isMediumOrLargerScreen) {
      setIsDrawerOpen(false);
    }
  };

  const getAppDrawer = () => {
    return (
      <>
        <Box
          sx={
            isDrawerOpen || props.menuMobileVisible
              ? { ...classes.drawer }
              : classes.drawerHideStyle
          }
          component={"div"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            background: !bgcolor ? pureWhiteColor : sidebarColor,
                      }}
        >
          <Box sx={classes.drawerWidth}>
            <Box>
              {!isDesktop && getCloseButton()}
              {getRFPLogo()}
            </Box>
            <Box
              sx={
                isDrawerOpen
                  ? classes.menuOptionsHeight
                  : classes.menuOptionsHeightHide
              }
            >
              {getNewMenuOptions()}
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return getAppDrawer();
};

export default AppDrawer;
