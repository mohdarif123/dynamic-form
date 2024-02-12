import { Box, Grid } from "@mui/material";
import landingPageStyles from "./LandingPage.styles";
import { useAppSelector } from "utils/hooks";
import { currentVisitedUrl, selectAuthenticated } from "redux/authSlice";
import strings from "global/constants/StringConstants";
import urls from "global/constants/UrlConstants";
import { CustomButton } from "global/components";
import history from "utils/history";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import Register from "./Register/Register";
import Login from "./Login";
import loginLogo from "assets/images/loginLogo.svg";

interface CustomProps {
  location?: Location;
}

const LandingPage = (props: CustomProps) => {
  const classes = landingPageStyles;
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const visitedCurrentUrl = useAppSelector(currentVisitedUrl);

  const redirectRfProOfficialSite = () => {
    window.open("https://rfppro.app/", "_blank");
  };

  const staticImageComponent = () => {
    return (
      <>
        <Grid container sx={classes.staticHeaderWrapper}>
          <Grid item>
            <img src={loginLogo} width="100%" height={"auto"} alt="loginLogo" />
          </Grid>
          <Grid item display={"flex"} gap={2}>
            <Box>
              <CustomButton
                onClick={() => {
                  redirectRfProOfficialSite();
                }}
                label={"Request a Demo"}
                customClasses={classes.headerButtonStyle}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const getComponentBasedOnURL = () => {
    const location = props.location?.pathname?.split("/")[1].toLowerCase();
    switch (location) {
      case strings.LOGIN: {
        return <Login />;
      }
      case strings.FORGOT_PASSWORD: {
        return <ForgotPassword />;
      }
      case strings.RESET_PASSWORD: {
        return <ResetPassword />;
      }
      case strings.REGISTER: {
        return <Register />;
      }
      default: {
        return <Login />;
      }
    }
  };

  const getLandingPage = () => {
    return (
      <>
        <Grid container sx={classes.mainWrapper}>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={classes.staticImageComponentWrapper}
          >
            {staticImageComponent()}
          </Grid>

          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={classes.getComponentBasedOnURLWrapper}
          >
            <Grid
              container
              sx={{
                ...classes.innerWrapper,
              }}
            >
              <Grid item xl={3.4} lg={4.5} md={6} sm={9} xs={10}>
                {getComponentBasedOnURL()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  if (isAuthenticated && visitedCurrentUrl) {
    history.push(visitedCurrentUrl);
    return null;
  } else {
    if (isAuthenticated) {
      history.push(urls.DASHBOARD_VIEW_PATH);
      return null;
    }
  }

  return getLandingPage();
};

export default LandingPage;
