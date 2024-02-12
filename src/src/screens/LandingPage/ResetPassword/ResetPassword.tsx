import React, { useEffect, useRef, useState } from "react";
import ResetPasswordStyle from "./ResetPassword.style";
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import { CustomButton, CustomInput } from "global/components";
import hidePasswordIcon from "assets/images/HideEye.svg";
import showPasswordIcon from "assets/images/ActiveEye.svg";
import { handleResetValidation } from "./ResetValidation";
import notifiers from "global/constants/NotificationConstants";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { forgetPassword, verifyTempPwd } from "../LandingPageService";
import { User } from "models/interfaces";
import { useLocation } from "react-router-dom";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import ReCAPTCHA from "react-google-recaptcha";
import strings from "global/constants/StringConstants";
import { errorStyling } from "utils/styles";
import { getCustomError } from "utils/customError";

const ResetPassword = () => {
  const classes = ResetPasswordStyle;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isResetInProgress, setIsResetInProgress] = useState(false);
  const context = new URLSearchParams(useLocation().search).get("context");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const reRef = useRef<ReCAPTCHA>(null);
  const siteKeyReCaptch = strings.siteKey;

  const [formFields, setFormFields] = useState<any>({
    newPassword: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  useEffect(() => {
    verifyPwd(context);
  }, []);

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
  const verifyPwd = async (token: any) => {
    const userData: User = {
      firstName: "",
      id: "",
      pwd: "",
      newPwd: "",
      authToken: token,
      name: "",
      contactNo: "",
      email: "",
      address: "",
      role: "",
      resources: [],
      apps: [],
      account: "",
      pwdType: "",
      roleLevel: 0,
      lastName: "",
      company: "",
    };
    try {
      const response: any = await verifyTempPwd(userData);
      setUser(response);
    } catch (error: any) {
      history.push(urls.LOGIN_VIEW_PATH);
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleNewShowPassword = () => {
    setShowNewPassword(showNewPassword);
  };
  const handleConfirmShowPassword = () => {
    setShowConfirmPassword(showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowNewPassword(!showNewPassword);
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowConfirmPassword(!showConfirmPassword);
    event.preventDefault();
  };

  const handleValidation = () => {
    const { isValid, errors } = handleResetValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };
  const handleSubmitButton = () => {
    if (
      !isResetInProgress &&
      handleValidation() &&
      formFields.newPassword.value === formFields.confirmPassword.value &&
      formFields.newPassword.value.length > 7
    ) {
      updatePassword();
    }
  };

  const updatePassword = async () => {
    try {
      setIsResetInProgress(true);
      setLoading(true);
      user.pwd = formFields.newPassword.value;
      let captchaToken: any = "";
      if (urls.PROD) {
        captchaToken = await reRef.current?.executeAsync();
      }
      setLoading(true);
      reRef.current && reRef.current.reset();
      const token = user.authToken;
      await forgetPassword(user, token);
      openSuccessNotification(
        "Your new password has been updated successfully"
      );
      history.push(urls.LOGIN_VIEW_PATH);
      setLoading(false);
      setIsResetInProgress(false);
    } catch (error: any) {
      setIsResetInProgress(false);
      setLoading(false);
      getCustomError(error);
    } finally {
      history.push(urls.LOGIN_VIEW_PATH);
    }
  };

  const geResetPasswordScreen = () => {
    return (
      <Box sx={classes.getResetScreen}>
        <Box sx={classes.innerGetLoginBox}>
          <Typography sx={classes.getHeading} variant="h1">
            Change Password
          </Typography>
          <Grid container sx={classes.formCenter} spacing={2} mt={3}>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <CustomInput
                required
                label="New Password"
                placeHolder="Enter your new password"
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formFields.newPassword.value}
                customClasses={classes.inputLabel}
                customInputClasses={{
                  ...classes.inputStyle,
                  "& input::-ms-reveal": { display: "none" },
                }}
                isPasswordVisible={formFields.newPassword.value ? true : false}
                onChange={handleOnChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleNewShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <Box
                          component="img"
                          src={
                            showNewPassword
                              ? showPasswordIcon
                              : hidePasswordIcon
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* {formFields.newPassword.value.length < 8 &&
                formFields.newPassword.value.length > 0 && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    New password must be 8 character
                  </FormHelperText>
                )}
              {!isTruthy(formFields.newPassword.value) &&
                formFields.newPassword.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formFields.newPassword.error}
                  </FormHelperText>
                )} */}
              {((!isTruthy(formFields.newPassword.value) &&
                formFields.newPassword.error) ||
                !strings.passwordValidationRegex.test(
                  formFields.newPassword.value
                )) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formFields.newPassword.error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <CustomInput
                required
                label="Confirm Password"
                sx={classes.textRadious}
                placeHolder="Enter your confirm password"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                customClasses={classes.inputLabel}
                customInputClasses={{
                  ...classes.inputStyle,
                  "& input::-ms-reveal": { display: "none" },
                }}
                value={formFields.confirmPassword.value}
                onChange={handleOnChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleConfirmShowPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        <Box
                          component="img"
                          src={
                            showConfirmPassword
                              ? showPasswordIcon
                              : hidePasswordIcon
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formFields.confirmPassword.value !==
                formFields.newPassword.value &&
                formFields.confirmPassword.value.length > 0 && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    Confirm password doesn't match
                  </FormHelperText>
                )}
              {!isTruthy(formFields.confirmPassword.value) &&
                formFields.confirmPassword.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formFields.confirmPassword.error}
                  </FormHelperText>
                )}
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} mt={2}>
              <CustomButton
                label="Submit"
                onClick={handleSubmitButton}
                customClasses={classes.signBtn}
              />
            </Grid>
          </Grid>
        </Box>
        {getFooter()}
      </Box>
    );
  };

  return (
    <Box sx={classes.resetMainWrapper}>
      <ReCAPTCHA sitekey={siteKeyReCaptch} size="invisible" ref={reRef} />
      {geResetPasswordScreen()}
      <CustomLoader isLoading={loading} />
    </Box>
  );
};

export default ResetPassword;
