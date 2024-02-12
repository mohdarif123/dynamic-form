import DashboardStyle from "./Dashboard.style";
import { Box, Grid, Typography } from "@mui/material";
import { CustomButton, CustomPaper } from "global/components";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import UpgradePlanImage from "assets/images/UpgradePlanImage.svg";
import {
  lightBgColor,
  primaryBlackColor,
  pureWhiteColor,
  sidebarColor,
} from "utils/styles";
import history from "utils/history";
import urls from "global/constants/UrlConstants";

const UpgradePlan = () => {
  const classes = DashboardStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const paidPlanFeature = ["Due RFP", "Lost RFP Reason", "Customize Graph"];

  const getUpradePlanCard = () => {
    return (
      <>
        <Box>
          <CustomPaper
            className={classes.upgradePlanMainWrapper}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              alignItem: "flex-end",
            }}
          >
            <Grid container>
              <Grid item xs={7.5} py={{ xl: 2, lg: 1, xs: 1 }}>
                <Typography
                  variant="h2"
                  sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                >
                  In paid plan you will get below details for better analytics.
                </Typography>
                <ul>
                  {paidPlanFeature.map((info: string) => (
                    <li
                      style={{
                        color: bgcolor ? pureWhiteColor : primaryBlackColor,
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "start" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            wordBreak: "break-all",
                            color: bgcolor ? pureWhiteColor : primaryBlackColor,
                          }}
                        >
                          {info}
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
                <Box mt={{ xl: 7, lg: 5.5, md: 6, sm: 5, xs: 5 }}>
                  <CustomButton
                    onClick={() => {
                      history.push(urls.viewBillingDetails);
                    }}
                    label="Upgrade Plan"
                    customClasses={{ width: "150px" }}
                    buttonType={"contained"}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={4.5}
                mt={{ xl: 7.2, lg: 7.1, md: 6, sm: 7.5, xs: 13.5 }}
              >
                <Box
                  component={"img"}
                  src={UpgradePlanImage}
                  sx={{ width: "100%", maxWidth: "250px", height: "auto" }}
                />
              </Grid>
            </Grid>
          </CustomPaper>
        </Box>
      </>
    );
  };
  return getUpradePlanCard();
};
export default UpgradePlan;
