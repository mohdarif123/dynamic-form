import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
  TextField,
  InputLabel,
  FormHelperText,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  inputBoxDark,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  pureWhiteColor,
  selectBgDark,
  selectBgLight,
  theme,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import ArrowWhiteIcon from "assets/icons/ArrowWhiteIcon.svg";
import DropzoneIconWhite from "assets/icons/uploadpaymentIcon.svg";
import strings from "global/constants/StringConstants";
import OnboardingStyles from "../Onboard.styles";
import { handlePaymentFormValidation } from "../../Plan/data";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  getAddProposalCountriesOnBording,
  getCity,
  getState,
  updateProfile,
  upload,
} from "../OnboardServices";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import { profileInitialState } from "../../Profile/ProfileTypeAndValidation";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { getCustomError } from "utils/customError";

interface CustomProps {
  nextStep: Function;
  user?: any;
  back?: () => void | undefined;
  token?: any;
  paymentFormData: any;
  setPaymentFormData: any;
}

const OnboardStep4 = ({
  paymentFormData,
  setPaymentFormData,
  nextStep,
  user,
  back,
  token,
}: CustomProps) => {
  const classes = OnboardingStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const postalCode = strings.postalCodeRegex;
  const name = strings.nameRegex;
  const [isLoading, setIsLoading] = useState(false);
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const [countryList, setCountry] = useState([]);
  const [state, seState] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (paymentFormData.country?.value) {
      fetchState();
    }
  }, [paymentFormData.country?.value]);

  useEffect(() => {
    if (paymentFormData.state?.value) {
      fetchCity();
    }
  }, [paymentFormData.state?.value]);

  const fetchCountry = async () => {
    try {
      setIsLoading(true);
      const res = await getAddProposalCountriesOnBording(token);
      setCountry(res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const fetchState = async () => {
    try {
      setIsLoading(true);
      const res = await getState(paymentFormData.country?.value, token);
      seState(res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const fetchCity = async () => {
    try {
      setIsLoading(true);
      const res = await getCity(
        paymentFormData.country?.value,
        paymentFormData.state?.value,
        token
      );
      setCity(res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const onChangeHandler = (event: any) => {
    setPaymentFormData({
      ...paymentFormData,
      [event.target.name]: {
        ...paymentFormData[event.target.name],
        value: event.target?.value,
      },
    });
  };

  const onChangeCompanyNameHandler = (event: any) => {
    if (event.target.value === "" || name.test(event.target.value)) {
      setPaymentFormData({
        ...paymentFormData,
        [event.target.name]: {
          ...paymentFormData[event.target.name],
          value: event.target?.value,
        },
      });
    }
  };

  const onChangePostalCodeHandler = (event: any) => {
    if (event.target.value === "" || postalCode.test(event.target.value)) {
      setPaymentFormData({
        ...paymentFormData,
        [event.target.name]: {
          ...paymentFormData[event.target.name],
          value: event.target?.value,
        },
      });
    }
  };
  const handleValidation = () => {
    const { isValid, errors } = handlePaymentFormValidation(paymentFormData);
    setPaymentFormData({ ...errors });
    return isValid;
  };

  const handleSubmit = async () => {
    if (
      handleValidation() &&
      !paymentFormData.contactNumber.error &&
      !paymentFormData.faxNumber.error &&
      !paymentFormData.phoneNumber.error
    ) {
      const data = {
        companyName: paymentFormData.companyName.value,
        companyDetails: paymentFormData.companyDetails.value,
        email: paymentFormData.email.value,
        companyAddress: paymentFormData.companyAddress.value,
        contactNumber: paymentFormData.contactNumber.value,
        faxNumber: paymentFormData.faxNumber.value,
        phoneNumber: paymentFormData.phoneNumber.value,
        website: paymentFormData.website.value,
        location: {
          country: paymentFormData?.country?.value,
          state: paymentFormData?.state?.value,
          city: paymentFormData?.city?.value,
          zipCode: paymentFormData?.zipCode?.value,
        },
        logoPath: paymentFormData.logoPath.value,
      };
      try {
        setIsLoading(true);
        await updateProfile(data, user.account, user.authToken);
        openSuccessNotification("Profile has been added successfully");
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
      nextStep?.();
    }
  };

  const uploadFile = async (event: any) => {
    try {
      setIsLoading(true);
      const fileData = event[0];
      const data = new FormData();
      const fileImagePath = fileData?.file;
      data.append("file", fileImagePath);
      const response = await upload(user.email, data, user.authToken);
      setPaymentFormData({
        ...paymentFormData,
        ["logoPath"]: {
          ...paymentFormData["logoPath"],
          value: response.path,
        },
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const handleChipDelete = () => {
    setPaymentFormData({
      ...paymentFormData,
      logoPath: {
        ...paymentFormData.logoPath,
        value: "",
      },
    });
  };
  const goBack = () => {
    back?.();
  };

  const headerHandler = () => {
    return (
      <>
        <Box sx={classes.headerWrapper}>
          <IconButton
            onClick={() => {
              goBack();
            }}
          >
            <CustomIcon
              icon={
                <img
                  src={ArrowWhiteIcon}
                  alt="usaIcon"
                  style={{ height: "15px", width: "22px" }}
                />
              }
            />
          </IconButton>
          <Typography sx={{ color: "white" }} variant="h1">
            Company Details
          </Typography>
        </Box>
      </>
    );
  };

  const getPayment = () => {
    return (
      <>
        <Grid container sx={classes.companyDetailsWrapper} pb={4}>
          <Grid item xs={11} mt={{ xl: 8, lg: 4, md: 1, sm: 1, xs: 1 }}>
            {headerHandler()}
            <Grid
              container
              rowSpacing={3}
              columnSpacing={2}
              px={1.7}
              mt={{ xl: 5, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomInput
                  required
                  id="companyName"
                  propsToInputElement={{ maxLength: 100 }}
                  label="Company Name"
                  placeHolder="Enter company name"
                  type="text"
                  name="companyName"
                  value={paymentFormData.companyName.value}
                  customInputClasses={classes.inputStyle}
                  customClasses={classes.inputLabelStyle}
                  onChange={onChangeCompanyNameHandler}
                  error={
                    !isTruthy(paymentFormData.companyName.value) &&
                    paymentFormData.companyName.error
                  }
                />
                {!isTruthy(paymentFormData.companyName.value) &&
                  paymentFormData.companyName.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      <Typography variant="h5">
                        {paymentFormData.companyName.error}
                      </Typography>
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomInput
                  id="companyDetails"
                  propsToInputElement={{ maxLength: 200 }}
                  label="Company details"
                  placeHolder="Enter company details"
                  type="text"
                  name="companyDetails"
                  value={paymentFormData.companyDetails.value}
                  customClasses={classes.inputLabelStyle}
                  onChange={onChangeHandler}
                  customInputClasses={classes.inputStyle}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomInput
                  id="website"
                  propsToInputElement={{ maxLength: 150 }}
                  label="Website"
                  placeHolder="Enter website"
                  customClasses={classes.inputLabelStyle}
                  type="text"
                  name="website"
                  value={paymentFormData.website.value}
                  onChange={onChangeHandler}
                  customInputClasses={classes.inputStyle}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomContactInput
                  required
                  id="contactNumber"
                  label="Contact Number"
                  customInputTextFieldClasses={{ borderRadius: "38px" }}
                  name="contactNumber"
                  value={paymentFormData.contactNumber.value}
                  menuPropsStyling={true}
                  placeHolder="(###) ###-####"
                  customSxSelectClasses={classes.customSxSelectStyle}
                  onChange={(phone: string) => {
                    setPaymentFormData({
                      ...paymentFormData,
                      contactNumber: {
                        value: phone,
                        error:
                          isTruthy(paymentFormData.contactNumber.value) &&
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
                      isPhoneValid(paymentFormData.contactNumber.value)
                    )
                  }
                />
                {/* !isTruthy(paymentFormData.contactNumber.value) && */}
                {paymentFormData.contactNumber.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {paymentFormData.contactNumber.error}
                  </FormHelperText>
                )}
                {/* {isTruthy(paymentFormData.contactNumber.value) &&
                  paymentFormData.contactNumber.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {paymentFormData.contactNumber.error}
                    </FormHelperText>
                  )} */}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomContactInput
                  // required
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  customInputTextFieldClasses={{ borderRadius: "38px" }}
                  value={paymentFormData.phoneNumber.value}
                  menuPropsStyling={true}
                  placeHolder="(###) ###-####"
                  customSxSelectClasses={classes.customSxSelectStyle}
                  onChange={(phone: string) => {
                    setPaymentFormData({
                      ...paymentFormData,
                      phoneNumber: {
                        value: phone,
                        error:
                          isTruthy(paymentFormData.phoneNumber.value) &&
                          isVisitedContactField &&
                          !isPhoneValid(phone)
                            ? "Please enter a valid phone No"
                            : "",
                      },
                    });
                  }}
                  onClick={() => setVisitedContactFelid(true)}
                  onBlur={() =>
                    setVisitedContactFelid(
                      isPhoneValid(paymentFormData.phoneNumber.value)
                    )
                  }
                />
                {/* !isTruthy(paymentFormData.phoneNumber.value) && */}
                {paymentFormData.phoneNumber.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {paymentFormData.phoneNumber.error}
                  </FormHelperText>
                )}
                {/* {isTruthy(paymentFormData.phoneNumber.value) &&
                  paymentFormData.phoneNumber.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {paymentFormData.phoneNumber.error}
                    </FormHelperText>
                  )} */}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomContactInput
                  // required
                  label="Fax Number"
                  id="faxNumber"
                  name="faxNumber"
                  value={paymentFormData.faxNumber.value}
                  menuPropsStyling={true}
                  placeHolder="(###) ###-####"
                  customInputTextFieldClasses={{ borderRadius: "38px" }}
                  customSxSelectClasses={classes.customSxSelectStyle}
                  onChange={(phone: string) => {
                    setPaymentFormData({
                      ...paymentFormData,
                      faxNumber: {
                        value: phone,
                        error:
                          isTruthy(paymentFormData.faxNumber.value) &&
                          isVisitedContactField &&
                          !isPhoneValid(phone)
                            ? "Please enter a valid fax No"
                            : "",
                      },
                    });
                  }}
                  onClick={() => setVisitedContactFelid(true)}
                  onBlur={() =>
                    setVisitedContactFelid(
                      isPhoneValid(paymentFormData.faxNumber.value)
                    )
                  }
                />
                {/* !isTruthy(paymentFormData.faxNumber.value) && */}
                {paymentFormData.faxNumber.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {paymentFormData.faxNumber.error}
                  </FormHelperText>
                )}
                {/* {isTruthy(paymentFormData.faxNumber.value) &&
                  paymentFormData.faxNumber.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {paymentFormData.faxNumber.error}
                    </FormHelperText>
                  )} */}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomInput
                  required
                  id="email"
                  propsToInputElement={{ maxLength: 100 }}
                  label="Email"
                  placeHolder="Enter email"
                  customClasses={classes.inputLabelStyle}
                  type="text"
                  name="email"
                  value={paymentFormData.email.value}
                  customInputClasses={classes.inputStyle}
                  onChange={onChangeHandler}
                  error={
                    (!isTruthy(paymentFormData.email.value) &&
                      paymentFormData.email.error) ||
                    (isTruthy(paymentFormData.email.value) &&
                      !strings.regex.test(paymentFormData.email.value))
                  }
                />
                {!strings.regex.test(paymentFormData.email.value) &&
                paymentFormData.email.value.length > 0 ? (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    <Typography variant="h5">
                      Please enter correct email
                    </Typography>
                  </FormHelperText>
                ) : !isTruthy(paymentFormData.email.value) &&
                  paymentFormData.email?.error ? (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    <Typography variant="h5">
                      {paymentFormData.email?.error}
                    </Typography>
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <CustomInput
                  required
                  id="address"
                  label="Address"
                  propsToInputElement={{ maxLength: 300 }}
                  placeHolder="Enter your address"
                  type="text"
                  name="companyAddress"
                  value={paymentFormData.companyAddress.value}
                  onChange={onChangeHandler}
                  customInputClasses={classes.inputStyle}
                  customClasses={classes.inputLabelStyle}
                  error={
                    !isTruthy(paymentFormData.companyAddress.value) &&
                    paymentFormData.companyAddress.error
                  }
                />
                {!isTruthy(paymentFormData.companyAddress.value) &&
                  paymentFormData.companyAddress.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {paymentFormData.companyAddress.error}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel}>
                    <Typography
                      variant="h6"
                      sx={classes.inputLabel}
                      style={{ color: "#ffffff" }}
                    >
                      Country
                    </Typography>
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    id="country"
                    name="country"
                    value={paymentFormData.country.value}
                    onChange={onChangeHandler}
                    sx={dropDownDarkForSx}
                    style={selectBgDark}
                    MenuProps={menuPropsDarkStyle}
                    renderValue={() => (
                      <Typography variant="h4">
                        {paymentFormData.country.value || "Select Country"}
                      </Typography>
                    )}
                    displayEmpty
                  >
                    {countryList?.map((item: any, index: any) => (
                      <MenuItem key={index} sx={meneItemDarkStyle} value={item}>
                        <Typography variant="subtitle1">{item}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                {!isTruthy(paymentFormData.country.value) &&
                  paymentFormData.country.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      <Typography variant="h5">
                        {paymentFormData.country.error}
                      </Typography>
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel}>
                    <Typography
                      variant="h6"
                      sx={classes.inputLabel}
                      style={{ color: pureWhiteColor }}
                    >
                      State
                    </Typography>
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    id="state"
                    name="state"
                    value={paymentFormData.state.value}
                    onChange={onChangeHandler}
                    sx={dropDownDarkForSx}
                    style={selectBgDark}
                    MenuProps={menuPropsDarkStyle}
                    renderValue={() => (
                      <Typography variant="h4">
                        {paymentFormData.state.value || "Select State"}
                      </Typography>
                    )}
                    displayEmpty
                  >
                    {state?.map((item: any, index: any) => (
                      <MenuItem key={index} sx={meneItemDarkStyle} value={item}>
                        <Typography variant="subtitle1">{item}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                {!isTruthy(paymentFormData.state.value) &&
                  paymentFormData.state.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      <Typography variant="h5">
                        {paymentFormData.state.error}
                      </Typography>
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel}>
                    <Typography
                      variant="h6"
                      sx={classes.inputLabel}
                      style={{ color: pureWhiteColor }}
                    >
                      City
                    </Typography>
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    id="city"
                    name="city"
                    value={paymentFormData.city.value}
                    onChange={onChangeHandler}
                    sx={dropDownDarkForSx}
                    style={selectBgDark}
                    MenuProps={menuPropsDarkStyle}
                    renderValue={() => (
                      <Typography variant="h4">
                        {paymentFormData.city.value || "Select City"}
                      </Typography>
                    )}
                    displayEmpty
                  >
                    {city?.map((item: any, index: any) => (
                      <MenuItem key={index} sx={meneItemDarkStyle} value={item}>
                        <Typography variant="subtitle1">{item}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                {!isTruthy(paymentFormData.city.value) &&
                  paymentFormData.city.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      <Typography variant="h5">
                        {paymentFormData.city.error}
                      </Typography>
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Box>
                  <CustomInput
                    id="zipCode"
                    label="Zip Code"
                    propsToInputElement={{ maxLength: 6 }}
                    placeHolder="Enter your zipCode "
                    type="text"
                    name="zipCode"
                    value={paymentFormData.zipCode.value}
                    onChange={onChangePostalCodeHandler}
                    customInputClasses={classes.inputStyle}
                    customClasses={classes.inputLabelStyle}
                    error={
                      !isTruthy(paymentFormData.zipCode.value) &&
                      paymentFormData.zipCode.error
                    }
                  />
                  {!isTruthy(paymentFormData.zipCode.value) &&
                    paymentFormData.zipCode.error && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        <Typography variant="h5">
                          {paymentFormData.zipCode.error}
                        </Typography>
                      </FormHelperText>
                    )}
                </Box>
              </Grid>

              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                sx={classes.formInput}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography style={{ color: pureWhiteColor }} variant="h6">
                    Upload Company Logo
                  </Typography>
                  <Typography sx={classes.star}>*</Typography>
                </Box>
                <CustomDropzone
                  acceptedFileTypes={[".jpeg", ".jpg", ".png", ".svg"]}
                  dropzoneIcon={DropzoneIconWhite}
                  onAdd={uploadFile}
                  maxFileSize={10485760}
                  dropzoneCustomClasses={{
                    background: "black",
                  }}
                  index={0}
                  uploadedFileName={paymentFormData?.logoPath?.value
                    ?.split("_")
                    .slice(1)
                    .join("_")}
                  removeUploadedFileName={handleChipDelete}
                  iconWrapperStyle={classes.dropzoneIconStyle}
                />
                <Box pl={1}>
                  <Typography sx={classes.warningContent} variant="subtitle2">
                    Click and upload a document and max size is 10MB.
                    <Typography sx={classes.warningContent} variant="subtitle2">
                      file format [png, jpg, svg, jpeg].
                    </Typography>
                  </Typography>
                </Box>
                {!isTruthy(paymentFormData.logoPath.value) &&
                  paymentFormData.logoPath.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      <Typography variant="h5">
                        {paymentFormData.logoPath.error}
                      </Typography>
                    </FormHelperText>
                  )}
              </Grid>
            </Grid>

            <Box mt={3} mb={3}>
              <Box sx={classes.buttonWrapper} gap={3}>
                <CustomButton
                  label={strings.SAVE}
                  onClick={() => {
                    handleSubmit();
                  }}
                  customClasses={{
                    width: "110px",
                    background: "black !important",
                    borderRadius: "34px",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return getPayment();
};

export default OnboardStep4;
