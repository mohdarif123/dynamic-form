import { Grid, Typography, Box, FormHelperText } from "@mui/material";
import { CustomButton } from "global/components";
import urls from "global/constants/UrlConstants";
import forgotPasswordStyles from "./ForgotPassword.styles";
import { useRef, useState } from "react";
import { User } from "models/interfaces";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import strings from "global/constants/StringConstants";
import notifiers from "global/constants/NotificationConstants";
import CustomInput from "global/components/CustomInput/CustomInput";
import {
  forgotPasswordValidation,
  forgotPasswordValue,
} from "../LoginTypesAndValidation";
import { forgotPassword } from "../LandingPageService";
import history from "utils/history";
import ReCAPTCHA from "react-google-recaptcha";
import { useTitle } from "utils/UseTitle";
import { errorStyling } from "utils/styles";
import { getCustomError } from "utils/customError";

const ForgotPassword = () => {
  useTitle(strings.FORGOT_PASSWORD_TITLE);
  const classes = forgotPasswordStyles;
  const emailRegex = strings.regex;
  const [isForgotInProgress, setIsForgotInProgress] = useState(false);
  const [formField, setFormField] = useState(forgotPasswordValue);
  const [loading, setLoading] = useState(false);
  const reRef = useRef<ReCAPTCHA>(null);

  const logInPage = () => {
    history.push(urls.LOGIN_VIEW_PATH);
  };

  const handleOnchange = (event: React.ChangeEvent<any>) => {
    if (event.target.value !== undefined) {
      setFormField({
        ...formField,
        [event.target.name]: {
          ...formField[event.target.name],
          value: event.target.value,
        },
      });
    }
  };

  const onSubmit = async () => {
    const token: any = await reRef.current?.executeAsync();
    reRef.current && reRef.current.reset();
    const captchaToken = token;
    if (
      !isForgotInProgress &&
      handleValidation() &&
      emailRegex.test(formField.email.value) &&
      isTruthy(formField.email.value)
    ) {
      const userData: User = {
        firstName: "",
        id: "",
        pwd: "",
        newPwd: "",
        authToken: "",
        name: "",
        contactNo: "",
        email: formField.email.value.toLowerCase(),
        address: "",
        role: "",
        resources: [],
        apps: [],
        account: "",
        pwdType: "",
        roleLevel: 0,
        lastName: "",
        company: "",
        captchaToken: captchaToken,
      };
      try {
        setIsForgotInProgress(true);
        setLoading(true);
        await forgotPassword(userData);
        setLoading(false);
        openSuccessNotification(
          "We have sent you an email with instructions for reset the password"
        );
        setIsForgotInProgress(false);
        history.push(urls.LOGIN_VIEW_PATH);
      } catch (error: any) {
        setIsForgotInProgress(false);
        setLoading(false);
        getCustomError(error);
      }
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      forgotPasswordValidation(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  const getFooter = () => {
    return (
      <>
        <Box sx={classes.allRightReservedWrapper}>
          <Typography sx={classes.footerTypo} variant="subtitle1">
            &copy; {getYear()} RFPPro. All Rights Reserved
          </Typography>
        </Box>
      </>
    );
  };

  const getForgotPasswordScreen = () => {
    return (
      <Box sx={classes.mainWrapper}>
        <Box sx={classes.mainInnerWrapper}>
          <Typography sx={classes.getHeading} variant="h1">
            Reset Password
          </Typography>
          <Grid
            container
            sx={classes.formCenter}
            mt={{ xl: 5, lg: 5, md: 5, sm: 4, xs: 3 }}
          >
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} width={"100%"}>
              <CustomInput
                required
                label="Email"
                placeHolder="Enter your email"
                id="email"
                type="email"
                name="email"
                value={formField.email.value}
                onChange={handleOnchange}
                onKeyPress={handleKeypress}
                customClasses={classes.inputLabel}
                customInputClasses={classes.inputStyle}
                error={
                  !isTruthy(formField.email.value) && formField.email.error
                }
              />
              {!isTruthy(formField.email.value) && formField.email.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.email.error}
                </FormHelperText>
              )}
              {!emailRegex.test(formField.email.value) &&
                formField.email.value.length > 0 && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    Please enter valid email id
                  </FormHelperText>
                )}
              <Box mt={3} width={"100%"}>
                <CustomButton
                  onClick={onSubmit}
                  label={
                    <Typography variant="h6" sx={classes.submitText}>
                      Submit
                    </Typography>
                  }
                  loading={loading}
                  disabled={loading}
                  customClasses={classes.submitBtn}
                />
              </Box>
              <Box display="flex" justifyContent={"center"}>
                <Typography
                  mt={2}
                  variant="subtitle1"
                  onClick={logInPage}
                  sx={classes.backBtn}
                  component="span"
                >
                  Back to login
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {getFooter()}
      </Box>
    );
  };

  return getForgotPasswordScreen();
};

export default ForgotPassword;
