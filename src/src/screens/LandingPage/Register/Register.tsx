import React, { useRef, useState } from "react";
import registerStyles from "./Register.styles";
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { CustomButton, CustomInput } from "global/components";
import {
  isPhoneValid,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import hidePasswordIcon from "assets/images/HideEye.svg";
import showPasswordIcon from "assets/images/ActiveEye.svg";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { addUserRegister } from "../LandingPageService";
import ReCAPTCHA from "react-google-recaptcha";
import RECAPTCHA from "react-google-recaptcha";
import strings from "global/constants/StringConstants";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { useTitle } from "utils/UseTitle";
import { errorStyling } from "utils/styles";
import {
  registerFormField,
  registrationValidation,
} from "./RegisterTypesAndValidation";

const Register = () => {
  useTitle(strings.REGISTER_TITLE);
  const classes = registerStyles;
  const emailRegex = strings.regex;
  const siteKey = "6LcfPTQiAAAAAEiV_UD6vAZCy2RkJ1heocnrPFSq";
  const siteKeyReCaptch = siteKey;
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterInProgress, setIsRegisterInProgress] = useState(false);
  const [formFields, setFormFields] = useState(registerFormField);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const reRef = useRef<RECAPTCHA>(null);

  const handleOnChangeInputField = (event: React.ChangeEvent<any>) => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(showPassword);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const user = {
        id: "",
        pwd: formFields?.pwd?.value,
        newPwd: "",
        authToken: "",
        name: formFields?.name?.value + " " + formFields?.lastName?.value,
        contactNo:
          isPhoneValid(formFields?.contactNo?.value) && isVisitedContactField
            ? formFields?.contactNo?.value
            : "",
        email: formFields?.email?.value,
        address: "",
        role: "",
        resources: [],
        pwdType: "",
        roleLevel: 0,
        status: "",
        company: formFields?.company?.value,
        captchaToken: "",
        category: "SoftSages",
        planId: "b24ce0cd392a5b0b8dedc66c25213594",
      };
      if (
        (handleValidation() &&
          !isRegisterInProgress &&
          emailRegex.test(formFields.email.value) &&
          formFields.email.value.length > 0 &&
          !formFields.contactNo.error) ||
        formFields.contactNo.value === ""
      ) {
        setIsRegisterInProgress(true);
        setIsLoading(true);
        let captchaToken: any = "";
        if (urls.PROD) {
          captchaToken = await reRef.current?.executeAsync();
        }
        user.captchaToken = captchaToken;
        await addUserRegister(user);
        openSuccessNotification(
          "User registration has been completed successfully"
        );
        history.push(urls.USER_REGISTERED_SUCCESSFUL_VIEW_PATH);
        setIsRegisterInProgress(false);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsRegisterInProgress(false);
      setIsLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.LOGIN_ERROR
      );
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleValidation = () => {
    const { isValid, errors } = registrationValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };

  const loginPage = () => {
    history.push(urls.LANDING_VIEW_PATH);
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

  const getRegisterScreen = () => {
    return (
      <Box sx={classes.getRegisterScreen}>
        <Box sx={classes.innerGetLoginBox}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h1" sx={classes.textHeading1}>
              Create Account
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={classes.heading5} variant="h5">
              Already have an account?{" "}
              <Typography
                sx={classes.heading6}
                component={"span"}
                variant="h5"
                onClick={loginPage}
              >
                Login
              </Typography>
            </Typography>
          </Box>
          <Grid
            container
            sx={classes.formCenter}
            spacing={2}
            mt={{ xl: 2, lg: 0.5, md: 0.5, sm: 0.5, xs: 0.5 }}
          >
            <Grid item xs={5.5}>
              <CustomInput
                required
                label="First Name"
                placeHolder="Enter first name"
                id="name"
                type="text"
                name="name"
                value={formFields.name.value}
                onChange={handleOnChangeInputField}
                customInputClasses={classes.inputStyle}
                customClasses={classes.inputLabel}
                onKeyPress={handleKeypress}
                propsToInputElement={{ maxLength: 20 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="h6" sx={{ color: "#7A7A7A" }}>
                        {formFields.name.value?.length} / 20
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {!isTruthy(formFields.name.value) && formFields.name.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formFields.name.error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={5.5}>
              <CustomInput
                required
                label="Last Name"
                placeHolder="Enter last name"
                id="lastName"
                type="text"
                name="lastName"
                value={formFields.lastName.value}
                onChange={handleOnChangeInputField}
                customInputClasses={classes.inputStyle}
                customClasses={classes.inputLabel}
                onKeyPress={handleKeypress}
                propsToInputElement={{ maxLength: 20 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#7A7A7A",
                        }}
                      >
                        {formFields.lastName.value?.length} / 20
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {!isTruthy(formFields.lastName.value) &&
                formFields.lastName.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formFields.lastName.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <CustomContactInput
                label="Contact Number"
                name="contactNo"
                value={formFields.contactNo.value}
                menuPropsStyling={true}
                placeHolder="(###) ###-####"
                customSxSelectClasses={classes.customSxSelectStyle}
                onChange={(phone: string) => {
                  setFormFields({
                    ...formFields,
                    contactNo: {
                      value: phone,
                      error:
                        isTruthy(formFields.contactNo.value) &&
                        isVisitedContactField &&
                        !isPhoneValid(phone)
                          ? "Please enter a valid contact No"
                          : "",
                    },
                  });
                }}
                onClick={() => setVisitedContactFelid(true)}
                onBlur={() =>
                  setVisitedContactFelid(
                    isPhoneValid(formFields.contactNo.value)
                  )
                }
              />
              {isTruthy(formFields.contactNo.value) &&
                formFields.contactNo.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formFields.contactNo.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <CustomInput
                required
                label="Email"
                placeHolder="Enter email address"
                id="email"
                type="email"
                autoComplete={"new-password"}
                propsToInputElement={{ maxLength: 35 }}
                name="email"
                value={formFields.email.value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#7A7A7A",
                        }}
                      >
                        {formFields.email.value?.length} / 35
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChangeInputField}
                customInputClasses={classes.inputStyle}
                customClasses={classes.inputLabel}
                onKeyPress={handleKeypress}
                error={
                  !isTruthy(formFields.email.value) && formFields.email.error
                }
              />
              {!isTruthy(formFields.email.value) && formFields.email.error && (
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
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <CustomInput
                label="Company Name"
                placeHolder="Enter company name"
                id="company"
                type="text"
                name="company"
                autoComplete={"new-password"}
                value={formFields.company.value}
                onChange={handleOnChangeInputField}
                customInputClasses={classes.inputStyle}
                customClasses={classes.inputLabel}
                propsToInputElement={{ maxLength: 45 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#7A7A7A",
                        }}
                      >
                        {formFields.company.value?.length} / 45
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <CustomInput
                required
                label="Password"
                placeHolder="••••••••"
                id="password"
                type={showPassword ? "text" : "password"}
                name="pwd"
                autoComplete={"new-password"}
                value={formFields.pwd.value}
                onChange={handleOnChangeInputField}
                customInputClasses={{
                  ...classes.inputStyle,
                  "& input::-ms-reveal": { display: "none" },
                }}
                isPasswordVisible ={formFields.pwd.value ? true : false}
                customClasses={classes.inputLabel}
                onKeyPress={handleKeypress}
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
              {((!isTruthy(formFields.pwd.value) && formFields.pwd.error) ||
                !strings.passwordValidationRegex.test(
                  formFields.pwd.value
                )) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formFields.pwd.error}
                </FormHelperText>
              )}
            </Grid>
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              lg={11}
              xl={11}
              mt={{ xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
            >
              <Box width={"100%"}>
                <CustomButton
                  label="Sign Up"
                  onClick={handleRegister}
                  disabled={isLoading}
                  loading={isLoading}
                  customClasses={classes.signBtn}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {getFooter()}
      </Box>
    );
  };

  return (
    <Box sx={classes.registerMainWrapper}>
      {getRegisterScreen()}
      <ReCAPTCHA sitekey={siteKeyReCaptch} size="invisible" ref={reRef} />
    </Box>
  );
};

export default Register;
