import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import notifiers from "global/constants/NotificationConstants";
import urls from "global/constants/UrlConstants";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import history from "utils/history";
import { Box, Typography } from "@mui/material";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import OnboardingStyles from "./Onboard.styles";
import { activateUser } from "./OnboardServices";
import { verifyTempPwdForActivateAccount } from "../LandingPage/LandingPageService";
import { getCustomError } from "utils/customError";

const Onboard = () => {
  const classes = OnboardingStyles;
  const [loading, setLoading] = useState<boolean>(false);
  const context = new URLSearchParams(useLocation().search).get("context");

  useEffect(() => {
    verifyTempPwd(context);
  }, []);

  const verifyTempPwd = async (token: any) => {
    try {
      setLoading(true);
      const response: any = await verifyTempPwdForActivateAccount(token);
      const finalUserDetails: any = {
        id: response.id,
        pwd: response.pwd,
        authToken: response.token,
        name: response.name,
        contactNo: response.contactNo,
        email: response.email,
        address: "",
        role: "",
        resources: [],
        apps: [],
        company: "",
        planId: "b24ce0cd392a5b0b8dedc66c25213594",
        paymentMethodId: "",
      };
      await activateUser(finalUserDetails, response.authToken);
      openSuccessNotification("Your account has been activated successfully");
    } catch (error: any) {
      getCustomError(error);
    } finally {
      history.push(urls.LOGIN_VIEW_PATH);
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" sx={classes.centerItem}>
      <Typography sx={classes.descriptionText}>
        Verifying your details. Please wait for a moment!
      </Typography>
      <CustomLoader isLoading={loading} />
    </Box>
  );
};

export default Onboard;
