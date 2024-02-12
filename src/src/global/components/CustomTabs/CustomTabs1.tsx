import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import customTabsStyles from "./CustomTabs.styles";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import { useAppSelector } from "../../../utils/hooks";

interface TabConfig {
  value: string;
  label: string;
  count?: number | null;
  // [key: string]: string[];
}

interface CustomProps {
  changeValue: Function;
  selected: string;
  tabConfig: any;
  redirectTabValue?: string;
  state?: any;
  classes?: any;
  buttonStyle?: any;
  sx?: any;
  width?: any;
  data?: any;
  borderRadius?: any;
}

const CustomTabs1 = (props: CustomProps) => {
  const classes = customTabsStyles;
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
    // return isActive
    //   ? { background: "#7A81FD", color: "#Ffffff" }
    //   : { backgroundColor: "#ffffff", color: "#000000" };
  };
  return (
    <Box>
      <Grid container>
        <Grid item sx={props.width}>
          <Tabs
            value={value}
            sx={{ borderRadius: "36px" }}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {props.tabConfig?.map((tab: TabConfig) => {
              return (
                <Tab
                  sx={props.sx}
                  label={
                    <Box
                      sx={props.borderRadius ? classes.tabBox1 : classes.tabBox}
                      style={getStyle(
                        value === tab.label || value === tab.value
                      )}
                    >
                      <Box display={"flex"}>
                        <Typography sx={classes.text} variant="h5">
                          {tab.label}
                          {tab.count !== 0 && <Box> {tab.count} </Box>}
                        </Typography>
                        <Typography sx={classes.text1} variant="h5">
                          {props?.data}
                        </Typography>
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

export default CustomTabs1;
