import React, { useEffect, useRef, useState } from "react";
import { Switch } from "react-router";
import { Box, useMediaQuery } from "@mui/material";
import { appColor, mainColor, theme } from "utils/styles";
import PrivateRoute from "global/components/PrivateRoute/PrivateRoute";
import urls from "global/constants/UrlConstants";
import strings from "global/constants/StringConstants";
import Dashboard from "../../Dashboard/Dashboard";
import AppDrawer from "../AppDrawer/AppDrawer";
import Loading from "../Loading";
import layoutStyles from "./Layout.style";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  currentPreviousVisitedUrlAction,
  selectAuthenticated,
} from "redux/authSlice";
import Proposals from "../../Proposals/Proposals";
import Tasks from "../../Tasks/Tasks";
import Users from "../../Users/Users";
import Admin from "../../Admin/Admin";
import WonProposals from "../../WonProposals/WonProposal";
import UserRFPReport from "../../UserRFPReports/UserRFPReports";
import MonthlyReports from "../../MonthlyReports/MonthlyReports";
import ViewProposal from "../../Proposals/ViewProposal/ViewProposal";
import KnowledgeBased from "../../KnowledgeBased/KnowledgeBased";
import Responses from "../../KnowledgeBased/Responses/Responses";
import Learning from "../../KnowledgeBased/Learning/Learning";
import Competitive from "../../KnowledgeBased/Competitive/Competitive";
import AddResponses from "../../KnowledgeBased/Responses/AddResponses/AddResponses";
import StatusContent from "../../KnowledgeBased/Responses/StatusContent/StatusContent";
import ViewCompettitive from "../../KnowledgeBased/Competitive/ViewCompetitive/ViewCompetitive";
import AppFooter from "../AppFooter/AppFooter";
import RoleManagement from "../../RoleManagement/RoleManagement";
import AppHeader from "./AppHeader";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import UserRfpReportSingle from "../../UserRFPReports/UserRfpReportSingle";
import ViewHistoryModal from "../../KnowledgeBased/Responses/Components/ViewHistoryModal";
import UserProfile from "../../UserProfile/UserProfile";
import DueRFPs from "../../DueRFPs/DueRFPs";
import PageNotFound from "../../PageNotFound/PageNotFound";
import ResponseTemplateExport from "../../Proposals/Components/ResponseTemplateExport";
import BillingDetails from "../../BillingDetails/BillingDetail";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const classes = layoutStyles;
  const urlParams = useLocation();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const { pathname, search } = urlParams;

  dispatch(
    currentPreviousVisitedUrlAction({
      currentVisitedUrl: pathname + search,
    })
  );

  const getContent = () => {
    return (
      <>
        <Box
          sx={{
            ...classes.mainWrapper,
            background: !bgcolor ? mainColor : appColor,
            "&::-webkit-scrollbar": {
              width: "7px",
              borderRadius: "10px",
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#7A81FD",
              borderRadius: "10px",
              width: "7px",
            },
            overflow: urlParams?.pathname === "/dashboard" ? "hidden" : "auto",
          }}
          component={"div"}
        >
          <Switch>
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.DASHBOARD_VIEW_PATH}
              component={Dashboard}
              componentName={strings.DASHBOARD}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.PROPOSAL_VIEW_PATH}
              component={Proposals}
              componentName={strings.AddProposal}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.VIEW_PROPOSAL_VIEW_PATH}
              component={ViewProposal}
              componentName={strings.ViewProposal}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.TASK_VIEW_PATH}
              component={Tasks}
              componentName={strings.TASKS}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.USERS_VIEW_PATH}
              component={Users}
              componentName={strings.USER}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.ROLE_MANAGEMENT_VIEW_PATH}
              component={RoleManagement}
              componentName={strings.ROLEMANAGEMENT}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.WON_PROPOSAL_VIEW_PATH}
              component={WonProposals}
              componentName={strings.WONPROPOSALS}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.DUE_PROPOSAL_VIEW_PATH}
              component={DueRFPs}
              componentName={strings.DUEPROPOSALS}
            />

            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.KNOWLEDGE_BASE_VIEW_PATH}
              component={KnowledgeBased}
              componentName={strings.KNOWLEDGEBASE}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.RESPONSE_VIEW_PATH}
              component={Responses}
              componentName={strings.RESPONSES}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.ADD_RESPONSE_VIEW_PATH}
              component={AddResponses}
              componentName={strings.ADDRESPONSE}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.CONTENT_VIEW_PATH}
              component={StatusContent}
              componentName={strings.STATUSCONTENT}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.LEARNING_VIEW_PATH}
              component={Learning}
              componentName={strings.LEARNING}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.RESPONSE_HISTORY_VIEW_PATH}
              component={ViewHistoryModal}
              componentName={strings.RESPONSES}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.RESPONSE_EDIT_PATH}
              component={AddResponses}
              componentName={strings.RESPONSEEDIT}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.RESPONSE_ADD_PATH}
              component={AddResponses}
              componentName={strings.RESPONSEEDIT}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.COMPETITIVE_VIEW_PATH}
              component={Competitive}
              componentName={strings.COMPETITIVE}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.ADMIN_VIEW_PATH}
              component={Admin}
              componentName={strings.ADMIN}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.USER_PROPOSAL_REPORTS}
              component={UserRFPReport}
              componentName={strings.USERRFPREPORTS}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.USER_PROPOSAL_HISTORY_REPORT}
              component={UserRfpReportSingle}
              componentName={strings.USERRFPREPORTS}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.PROPOSAL_MONTHLY_REPORTS}
              component={MonthlyReports}
              componentName={strings.MONTHLYREPORTS}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.DETAILS_COMPETITIVE_VIEW_PATH}
              component={ViewCompettitive}
              componentName={strings.VIEWCOMPETITIVE}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.USER_PROFILE_VIEW_PATH}
              component={UserProfile}
              componentName={strings.Userprofile}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.viewBillingDetails}
              component={BillingDetails}
              componentName={strings.BillingDetails}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={urls.RESPONSE_TEMPLATE_VIEW_PATH}
              component={ResponseTemplateExport}
              componentName={strings.ViewProposal}
            />
            <PrivateRoute
              exact
              isLoggedIn={isAuthenticated}
              path={""}
              component={PageNotFound}
              componentName={strings.PAGENOTFOUND}
            />
          </Switch>
        </Box>
      </>
    );
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const getLayout = () => {
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <Box
          sx={{ ...classes.root, background: !bgcolor ? mainColor : appColor }}
          component={"div"}
        >
          <AppHeader />
          {isDesktop ? <AppDrawer /> : null}
          {getContent()}
          <AppFooter />
        </Box>
      </>
    );
  };
  return <>{getLayout()}</>;
};
export default React.memo(Layout);
