import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { loginAction } from "redux/authSlice";
import {
  convertResourceToObjectFormat,
  isTruthy,
  openErrorNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { loginForm, loginValidation } from "./LoginTypesAndValidation";
import { CustomButton, CustomInput } from "global/components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "utils/hooks";
import strings from "global/constants/StringConstants";
import loginStyles from "./Login.styles";
import hidePasswordIcon from "assets/images/HideEye.svg";
import showPasswordIcon from "assets/images/ActiveEye.svg";
import { login } from "./LandingPageService";
import ReCAPTCHA from "react-google-recaptcha";
import { useTitle } from "utils/UseTitle";
import { errorStyling } from "utils/styles";

const Login = () => {
  useTitle(strings.LOGINTITLE);
  const classes = loginStyles;
  const emailRegex = strings.regex;
  const siteKeyReCaptch = strings.siteKey;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState(loginForm);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const url = window.location.href;
  const reRef = useRef<ReCAPTCHA>(null);
  const componentRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsLoading(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOnChangeInputField = (event: React.ChangeEvent<any>) => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value,
      },
    });
  };
  const handleLogin = async () => {
    try {
      if (
        handleValidation() &&
        emailRegex.test(formFields.email.value) &&
        formFields.email.value.length > 0 &&
        !isLoginInProgress
      ) {
        setIsLoginInProgress(true);
        const email = formFields.email.value.toLowerCase();
        const password = formFields.password.value;
        let captchaToken: any = "";
        if (urls.PROD) {
          captchaToken = await reRef.current?.executeAsync();
        }
        setIsLoading(true);
        reRef.current && reRef.current.reset();
        const user = await login(email, password, captchaToken);
        const formattedResources = convertResourceToObjectFormat(
          user.resources
        );
        dispatch(
          loginAction({
            authenticated: true,
            accessToken: user.authToken,
            userName: user.name,
            userRole: user.role,
            userAccount: user.account,
            userEmail: user.email,
            resources: formattedResources,
            trial: user.trial,
            app: user.app,
          })
        );
        setIsLoading(false);
        setIsLoginInProgress(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setIsLoginInProgress(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.LOGIN_ERROR
      );
    }
  };

  const forgetPassword = () => {
    history.push(urls.FORGOT_PASSWORD_VIEW_PATH);
  };

  const registerPage = () => {
    if (url == "https://softsages.rfppro.app/") {
      window.open("https://bid.rfppro.app/register", "_self");
    } else {
      history.push(urls.REGISTER_VIEW_PATH);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(showPassword);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleValidation = () => {
    const { isValid, errors } = loginValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  const getLoginScreen = () => {
    return (
      <Box sx={classes.getLoginScreen} ref={componentRef}>
        <Box sx={classes.innerGetLoginBox}>
          <Typography sx={classes.getHeading} variant="h1">
            Sign In
          </Typography>
          <Box sx={{ textAlign: "center" }} mt={1}>
            <Typography sx={classes.heading5} variant="h5">
              Hey, You don't have an account yet?{" "}
              <Typography
                sx={classes.heading6}
                component={"span"}
                variant="h5"
                onClick={registerPage}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Box>
              <Grid
                container
                sx={classes.formCenter}
                mt={{ xl: 5, lg: 1, md: 1, sm: 0.5, xs: 0.5 }}
              >
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                  <CustomInput
                    required
                    label="Email"
                    placeHolder="Enter email address"
                    id="email"
                    type="email"
                    name="email"
                    value={formFields.email.value}
                    onChange={handleOnChangeInputField}
                    onKeyPress={handleKeypress}
                    customClasses={classes.inputLabel}
                    customInputClasses={classes.inputstyle}
                    error={
                      !isTruthy(formFields.email.value) &&
                      formFields.email.error
                    }
                  />
                  {!isTruthy(formFields.email.value) &&
                    formFields.email.error && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {formFields.email.error}
                      </FormHelperText>
                    )}
                  {!emailRegex.test(formFields.email.value) &&
                    formFields.email.value.length > 0 && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        Please enter valid email id
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11} mt={2}>
                  <CustomInput
                    required
                    label="Password"
                    placeHolder="••••••••"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formFields.password.value}
                    onChange={handleOnChangeInputField}
                    onKeyPress={handleKeypress}
                    customClasses={classes.inputLabel}
                    customInputClasses={{
                      ...classes.inputstyle,
                      "& input::-ms-reveal": { display: "none" },
                    }}
                    error={
                      !isTruthy(formFields.password.value) &&
                      formFields.password.error
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            <Box
                              component="img"
                              src={
                                showPassword ? showPasswordIcon : hidePasswordIcon
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {!isTruthy(formFields.password.value) &&
                    formFields.password.error && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {formFields.password.error}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                  <Box sx={classes.forgetPasswordWrapper}>
                    <Typography
                      variant="h6"
                      onClick={forgetPassword}
                      sx={{ alignItems: "center", display: "flex" }}
                    >
                      <Link
                        to={""}
                        style={{
                          textDecoration: "none",
                          color: "#BEBEBE",
                          fontFamily: "Source Sans 3",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={classes.buttonWrapper}>
                    <CustomButton
                      label={
                        <Typography variant="h6" sx={classes.signInText}>
                          Sign In
                        </Typography>
                      }
                      onClick={handleLogin}
                      disabled={isLoading}
                      loading={isLoading}
                      customClasses={classes.signBtn}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box sx={classes.allRightReservedWrapper}>
          <Typography sx={classes.footerTypo} variant="subtitle1">
            &copy; {getYear()} RFPPro. All Rights Reserved
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={classes.mainLoginWrapper}>
      <ReCAPTCHA sitekey={siteKeyReCaptch} size="invisible" ref={reRef} />
      {getLoginScreen()}
    </Box>
  );
};

export default Login;
