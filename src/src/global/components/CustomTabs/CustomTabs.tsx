import { Box, Grid, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import customTabsStyles from "./CustomTabs.styles";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import { useAppSelector } from "../../../utils/hooks";
import { pureWhiteColor, theme } from "../../../utils/styles";

interface TabConfig {
  value: string;
  label: string;
  count?: any;
  // [key: string]: string[];
}

interface CustomProps {
  changeValue: Function;
  selected?: string;
  tabConfig: any;
  redirectTabValue?: string;
  state?: any;
  classes?: any;
  tasksValue?: any;
  buttonStyle?: any;
  sx?: any;
  width?: any;
  data?: any;
  disabled?: any;
  changeVariant?: boolean;
  textOneLine?: boolean;
  hideTotalText?: boolean;
  borderTopHide?: boolean;
  backgroundTabColor?: boolean;
}

const CustomTabs = (props: CustomProps) => {
  const classes = customTabsStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [value, setValue] = useState(props.selected);
  const bgcolor = useAppSelector(selectBackgroundColor);
  useEffect(() => {
    if (props?.redirectTabValue) {
      setValue(props?.redirectTabValue);
    }
  }, [props?.redirectTabValue, props?.state]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.changeValue(newValue);
    setValue(newValue);
  };
  const getStyle = (isActive: boolean) => {
    if (!bgcolor) {
      return isActive ? classes.active : classes.inActive;
    } else {
      return isActive ? classes.active1 : classes.inActive1;
    }
  };

  const getTabStyle = (isActive: boolean) => {
    if (!bgcolor) {
      return isActive ? classes.activeStyle : classes.inActiveStyle;
    } else {
      return isActive ? classes.active1Style : classes.inActive1Style;
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} sx={props.width}>
          <Tabs
            value={value}
            sx={{
              borderTopLeftRadius: props.borderTopHide ? "0px" : "36px",
              borderTopRightRadius: props.borderTopHide ? "0px" : "36px",
            }}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {props.tabConfig?.map((tab: TabConfig, index: any) => {
              return (
                <Tab
                  sx={props.sx}
                  disabled={props?.disabled}
                  label={
                    <Box
                      sx={classes.tabBox}
                      style={
                        props.backgroundTabColor
                          ? getTabStyle(
                              value === tab.label || value === tab.value
                            )
                          : getStyle(value === tab.label || value === tab.value)
                      }
                    >
                      <Box display={"flex"}>
                        <Typography
                          sx={
                            props.textOneLine
                              ? classes.textOneLine
                              : classes.text
                          }
                          variant={"h2"}
                        >
                          <Typography variant={isDesktop ? "h2" : "h3"}>
                            {tab.label}
                          </Typography>
                          {tab.count !== 0 && (
                            <Typography
                              variant={props.changeVariant ? "h3" : "h2"}
                              style={{
                                marginLeft: "15px",
                                marginTop: props.changeVariant ? "5px" : 0,
                              }}
                            >
                              {" "}
                              {tab.count}
                            </Typography>
                          )}
                        </Typography>
                        {props?.data?.length > 0 && (
                          <Box display={"flex"} mt={1}>
                            <Typography
                              variant="h3"
                              sx={{
                                color: !bgcolor
                                  ? value === tab.label || value === tab.value
                                    ? pureWhiteColor
                                    : "#373854"
                                  : pureWhiteColor,
                              }}
                            >
                              {props?.hideTotalText ? "" : "Total :"}
                            </Typography>
                            <Typography
                              variant="h3"
                              sx={{
                                color: !bgcolor
                                  ? value === tab.label || value === tab.value
                                    ? pureWhiteColor
                                    : "#373854"
                                  : pureWhiteColor,
                              }}
                            >
                              {props?.hideTotalText
                                ? ""
                                : props.data[index].mytotal}
                            </Typography>
                            <Typography
                              variant="h3"
                              sx={{
                                color: !bgcolor
                                  ? value === tab.label || value === tab.value
                                    ? pureWhiteColor
                                    : "#373854"
                                  : pureWhiteColor,
                              }}
                            >
                              Pending :
                            </Typography>
                            <Typography
                              variant="h3"
                              sx={{
                                color: !bgcolor
                                  ? value === tab.label || value === tab.value
                                    ? pureWhiteColor
                                    : "#373854"
                                  : pureWhiteColor,
                                marginLeft: "3px",
                              }}
                            >
                              {props.data[index].myOpen}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  }
                  value={tab.label}
                />
              );
            })}
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomTabs;
