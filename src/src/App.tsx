import history from "utils/history";
import { Router, Switch, Route } from "react-router-dom";
import urls from "global/constants/UrlConstants";
import withClearCache from "./ClearCache";
import PageNotFound from "screens/PageNotFound/PageNotFound";
import Notifications from "utils/notifications";
import LandingPage from "screens/LandingPage/LandingPage";
import Layout from "screens/Shared/Layout/Layout";
import { Box, ThemeProvider } from "@mui/material";
import { themes } from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectAuthenticated } from "redux/authSlice";
import RegisterSuccessFully from "screens/LandingPage/Register/RegisterSuccessFully";
import Onboard from "screens/Onboarding/Onboard";

const App = () => {
  return <ClearCacheComponent />;
};

const MainApp = () => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  return (
    <ThemeProvider theme={themes}>
      <Box>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={[
                urls.LANDING_VIEW_PATH,
                urls.LOGIN_VIEW_PATH,
                urls.FORGOT_PASSWORD_VIEW_PATH,
                urls.REGISTER_VIEW_PATH,
                urls.RESET_PASSWORD_VIEW_PATH,
              ]}
              component={LandingPage}
            />
            <Route exact path={urls.onBoardViewPath} component={Onboard} />
            <Route exact path={"/plan"} component={Onboard} />
            <Route exact path={"/registered"} component={RegisterSuccessFully} />
            <Layout />
            <Route path={""} component={PageNotFound} />
          </Switch>
        </Router>
        <Notifications />
      </Box>
    </ThemeProvider>
  );
};

const ClearCacheComponent = withClearCache(MainApp);

export default App;
