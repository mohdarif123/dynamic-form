import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomInput from "global/components/CustomInput/CustomInput";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import DropzoneIconWhite from "assets/icons/uploadpaymentIcon.svg";
import DownloadsIcon from "assets/icons/DownlaodsIcon.svg";
import InputMask from "react-input-mask";
import {
  convertResourceToObjectFormat,
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import strings from "global/constants/StringConstants";
import UserProfileStyles from "./UserProfile.styles";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "../../redux/themeChangeSlice";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryBlackColor,
  pureWhiteColor,
  selectBgDark,
  selectBgLight,
} from "../../utils/styles";
import {
  updateProfile,
  userProfileUpdated,
} from "../Users/AddUser/AddUsersService";
import notifiers from "../../global/constants/NotificationConstants";
import CustomButton from "../../global/components/CustomButton/CustomButton";
import { addUserInitailState } from "../Users/AddUser/AddUserTypeAndValidation";
import { store } from "../../utils/store";
import { getProfile, getUserById } from "../Users/UsersService";
import urls from "../../global/constants/UrlConstants";
import history from "utils/history";
import {
  handleAddUserValidation,
  handleProfileValidation,
  profileInitialState,
} from "../Profile/ProfileTypeAndValidation";
import { upload } from "../Proposals/Proposals.service";
import { useLocation } from "react-router-dom";
import {
  loginAction,
  selectEmail,
  selectUserName,
} from "../../redux/authSlice";
import {
  getAddProposalCountries,
  getCity,
  getState,
} from "../Proposals/AddProposal/AddProposal.service";
import CustomDropzone from "../../global/components/CustomDropzone/CustomDropzone";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { useTitle } from "utils/UseTitle";
import { getCustomError } from "utils/customError";

const UserProfile = () => {
  const userApp = store.getState().auth.app;
  useTitle(strings.PROFILE);
  const classes = UserProfileStyles;
  const emailRegex = strings.regex;
  const dispatch = useAppDispatch();
  const urlParams = useLocation().pathname;
  const loggedInUserName = useAppSelector(selectUserName);
  const loggedInUserEmail = useAppSelector(selectEmail);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  const [addUsersValue, setAddUsersValue] = useState<any>(
    addUserInitailState()
  );
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const [companyProfileValue, setCompanyProfileValue] =
    useState<any>(profileInitialState);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const [countryList, setCountry] = useState([]);
  const [state, seState] = useState([]);
  const [city, setCity] = useState([]);
  const [adminAccess, setAdminAccess] = useState(false);

  useEffect(() => {
    getUser();
    checkAccessAccount();
  }, []);

  useEffect(() => {
    if (companyProfileValue?.country?.value) {
      fetchState();
    }
  }, [companyProfileValue?.country?.value]);

  useEffect(() => {
    if (companyProfileValue.state?.value) {
      fetchCity();
    }
  }, [companyProfileValue.state?.value]);

  const checkAccessAccount = () => {
    if (store.getState().auth.userRole === strings.ADMIN) {
      setAdminAccess(true);
      getCompanyProfile();
      fetchCountry();
    } else {
      setAdminAccess(false);
    }
  };

  const fetchCountry = async () => {
    try {
      setIsLoading(true);
      const [res] = await Promise.all([getAddProposalCountries()]);
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
      const res = await getState(companyProfileValue.country?.value);
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
        companyProfileValue.country?.value,
        companyProfileValue.state?.value
      );
      setCity(res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  function setValuesFromObject(obj: any) {
    const newObj = {
      email: {
        value: obj.email || "",
        error: "",
      },
      name: {
        value: obj.name || "",
        error: "",
      },
      contactNumber: {
        value: obj.contactNo || "",
        error: "",
      },
      role: {
        value: obj.role || "",
        error: "",
      },
    };
    setAddUsersValue(newObj);
  }

  function setCompanyProfileObject(obj: any) {
    const companyProfileObj = {
      companyName: {
        value: obj?.companyName || "",
        error: "",
      },
      companyDetails: {
        value: obj?.companyDetails || "",
        error: "",
      },
      email: {
        value: obj?.email || "",
        error: "",
      },
      companyAddress: {
        value: obj?.companyAddress || "",
        error: "",
      },
      contactNumber: {
        value: obj?.contactNumber || "",
        error: "",
      },
      faxNumber: {
        value: obj?.faxNumber || "",
        error: "",
      },
      logoPath: {
        value: obj?.logoPath || "",
        error: "",
      },
      phoneNumber: {
        value: obj?.phoneNumber || "",
        error: "",
      },
      website: {
        value: obj?.website || "",
        error: "",
      },
      country: {
        value: obj.location?.country || "",
        error: "",
      },
      state: {
        value: obj.location?.state || "",
        error: "",
      },
      city: {
        value: obj.location?.city || "",
        error: "",
      },
      zipCode: {
        value: obj.location?.zipCode || "",
        error: "",
      },
    };
    setCompanyProfileValue(companyProfileObj);
  }

  const getUser = async () => {
    try {
      setIsLoading(true);
      const user = await getUserById(store.getState().auth.userEmail);
      setValuesFromObject(user);
      setUser(user);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getCompanyProfile = async () => {
    try {
      setIsLoading(true);
      const companyProfile = await getProfile();
      setCompanyProfileObject(companyProfile);
      setUser(user);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleOnchange = (event: any) => {
    setAddUsersValue({
      ...addUsersValue,
      [event.target.name]: {
        ...addUsersValue[event.target.name],
        value: event.target?.value,
      },
    });
  };

  const handleOnchangeCompanyDetails = (event: any) => {
    const { name, value } = event.target;
    if (name === "country") {
      setCompanyProfileValue({
        ...companyProfileValue,
        state: {
          value: "",
          error: "",
        },
        city: {
          value: "",
          error: "",
        },
        [name]: {
          ...companyProfileValue[name],
          value: value,
        },
      });
    } else if (name === "state") {
      setCompanyProfileValue({
        ...companyProfileValue,
        city: {
          value: "",
          error: "",
        },
        [name]: {
          ...companyProfileValue[name],
          value: value,
        },
      });
    } else {
      setCompanyProfileValue({
        ...companyProfileValue,
        [name]: {
          ...companyProfileValue[name],
          value: value,
        },
      });
    }
  };

  const handleChipDelete = () => {
    setCompanyProfileValue({
      ...companyProfileValue,
      logoPath: {
        ...companyProfileValue.logoPath,
        value: "",
      },
    });
  };

  const handleValidation = () => {
    const { isValid, errors } = handleAddUserValidation(addUsersValue);
    setAddUsersValue({ ...errors });
    return isValid;
  };

  const handleValidationCompanyProfile = () => {
    const { isValid, errors } = handleProfileValidation(companyProfileValue);
    handleValidation();
    setCompanyProfileValue({ ...errors });
    return isValid;
  };
  const handleClose = () => {
    history.push(urls.DASHBOARD_VIEW_PATH);
  };
  const handleSubmit = async () => {
    if (adminAccess) {
      if (
        handleValidationCompanyProfile() &&
        handleValidation() &&
        !companyProfileValue.contactNumber.error &&
        !companyProfileValue.faxNumber.error &&
        !companyProfileValue.phoneNumber.error &&
        !addUsersValue.contactNumber.error
      ) {
        editAccountDetails();
        editUserDetails();
      }
    } else {
      if (
        (handleValidation() && !addUsersValue.contactNumber.error) ||
        addUsersValue.contactNumber.value === ""
      ) {
        editUserDetails();
      }
    }
  };

  const editAccountDetails = async () => {
    const editCompanyDetails = {
      companyName: companyProfileValue?.companyName?.value,
      companyDetails: companyProfileValue?.companyDetails?.value,
      email: companyProfileValue?.email?.value,
      companyAddress: companyProfileValue?.companyAddress?.value,
      contactNumber: companyProfileValue?.contactNumber?.value,
      faxNumber: companyProfileValue?.faxNumber?.value,
      logoPath: companyProfileValue?.logoPath?.value,
      phoneNumber: companyProfileValue?.phoneNumber?.value,
      website: companyProfileValue?.website?.value,
      location: {
        country: companyProfileValue?.country?.value,
        state: companyProfileValue?.state?.value,
        city: companyProfileValue?.city?.value,
        zipCode: companyProfileValue?.zipCode?.value,
      },
    };
    try {
      setIsLoading(true);
      await updateProfile(editCompanyDetails);
      openSuccessNotification("User profile has been added successfully");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const editUserDetails = async () => {
    const editUser = {
      contactNo:
        isPhoneValid(addUsersValue?.contactNumber?.value) &&
        isVisitedContactField
          ? addUsersValue?.contactNumber?.value
          : "",
      email: addUsersValue?.email?.value,
      name: addUsersValue?.name?.value,
      roleIds: user.roleIds,
      account: user.account,
      app: userApp,
    };
    try {
      setIsLoading(true);
      await userProfileUpdated(editUser);
      // openSuccessNotification("User profile updated successfully");
      const formattedResources = convertResourceToObjectFormat(user.resources);
      dispatch(
        loginAction({
          authenticated: true,
          accessToken: store.getState().auth.accessToken,
          userName: addUsersValue?.name?.value,
          userRole: user.role,
          userAccount: user.account,
          userEmail: user.email,
          resources: formattedResources,
          trial: user.trial,
          app: user.app,
        })
      );
      history.push(urls.DASHBOARD_VIEW_PATH);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const uploadDocumentFileHandler = async (event: any) => {
    try {
      const userEmail = store.getState().auth.userEmail;
      setIsLoading(true);
      const fileData = event[0];
      const data = new FormData();
      const fileImagePath = fileData?.file;
      data.append("file", fileImagePath);
      const response = await upload(userEmail, data);
      setUploadDocumentObject({
        ...uploadDocumentObject,
        res: response,
        name: fileData?.file?.name,
      });
      setCompanyProfileValue({
        ...companyProfileValue,
        ["logoPath"]: {
          ...companyProfileValue["logoPath"],
          value: response.path,
        },
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getUserProfileHandler = () => {
    return (
      <>
        {urlParams === urls.USER_PROFILE_VIEW_PATH && (
          <Stack direction={"row"}>
            <Box sx={classes.squareProfileBox}>
              <Typography sx={classes.avatarStyle} variant="h1">
                {loggedInUserName.charAt(0)}
              </Typography>
            </Box>
            <Box>
              <Stack direction={"column"}>
                <Typography
                  variant="h1"
                  sx={{
                    color: !bgcolor ? "black" : "white",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  {loggedInUserName}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: !bgcolor ? "black" : "white",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  {loggedInUserEmail}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        )}
      </>
    );
  };

  const userDetails = () => {
    return (
      <>
        <Typography
          variant="h2"
          sx={{
            ...classes.personDetailHeading,
            color: !bgcolor ? primaryBlackColor : pureWhiteColor,
          }}
        >
          Personal Details
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="name"
                label="Name"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your first name"
                type="text"
                name="name"
                value={addUsersValue.name.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addUsersValue.name.value) &&
                  addUsersValue.name.error
                }
              />
              {!isTruthy(addUsersValue.name.value) &&
                addUsersValue.name.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addUsersValue.name.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="email"
                disabled
                propsToInputElement={{ maxLength: 100 }}
                label="Email Address"
                placeHolder="Enter your email"
                type="text"
                name="email"
                value={addUsersValue.email.value}
                onChange={handleOnchange}
                error={
                  (!isTruthy(addUsersValue.email.value) &&
                    addUsersValue.email.error) ||
                  (isTruthy(addUsersValue.email.value) &&
                    !strings.regex.test(addUsersValue.email.value))
                }
              />
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <CustomContactInput
              label="Contact"
              name="contactNumber"
              value={addUsersValue.contactNumber.value}
              placeHolder="(###) ###-####"
              customInputTextFieldClasses={{
                borderRadius: "38px",
              }}
              customSxSelectClasses={classes.customSxSelectStyle}
              onChange={(phone: string) => {
                setAddUsersValue({
                  ...addUsersValue,
                  contactNumber: {
                    value: phone,
                    error:
                      isTruthy(addUsersValue.contactNumber.value) &&
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
                  isPhoneValid(addUsersValue.contactNumber.value)
                )
              }
            />
            {isTruthy(addUsersValue.contactNumber.value) &&
              addUsersValue.contactNumber.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addUsersValue.contactNumber.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                disabled
                id="name"
                label="Role"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your first name"
                type="text"
                name="role"
                value={addUsersValue.role.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addUsersValue.role.value) &&
                  addUsersValue.name.error
                }
              />
            </Box>
          </Grid>
        </Grid>{" "}
      </>
    );
  };

  const companyDetails = () => {
    return (
      <>
        <Typography
          variant="h2"
          sx={{
            ...classes.companyDetailsHeading,
            color: !bgcolor ? primaryBlackColor : pureWhiteColor,
          }}
        >
          Company Details
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                disabled
                required
                id="name"
                label="Name"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your company name"
                type="text"
                name="companyName"
                value={companyProfileValue.companyName.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  !isTruthy(companyProfileValue.companyName.value) &&
                  companyProfileValue.companyName.error
                }
              />
              {!isTruthy(companyProfileValue.companyName.value) &&
                companyProfileValue.companyName.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {companyProfileValue.companyName.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="email"
                propsToInputElement={{ maxLength: 100 }}
                label="Email Address"
                placeHolder="Enter your company email"
                type="text"
                name="email"
                value={companyProfileValue.email.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  (!isTruthy(companyProfileValue.email.value) &&
                    companyProfileValue.email.error) ||
                  (isTruthy(companyProfileValue.email.value) &&
                    !strings.regex.test(companyProfileValue.email.value))
                }
              />
              {!isTruthy(companyProfileValue.email.value) &&
                companyProfileValue.email.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {companyProfileValue.email.error}
                  </FormHelperText>
                )}
              {!emailRegex.test(companyProfileValue.email.value) &&
                companyProfileValue.email.value.length > 0 && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    Please enter valid email id
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                id="companyDetails"
                label="Details"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your details"
                type="text"
                name="companyDetails"
                value={companyProfileValue.companyDetails.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  !isTruthy(companyProfileValue.companyDetails.value) &&
                  companyProfileValue.companyDetails.error
                }
              />
              {!isTruthy(companyProfileValue.companyDetails.value) &&
                companyProfileValue.companyDetails.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {companyProfileValue.companyDetails.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <CustomContactInput
              label="Contact Number"
              name="contactNumber"
              value={companyProfileValue.contactNumber.value}
              placeHolder="(###) ###-####"
              customInputTextFieldClasses={{
                borderRadius: "38px",
              }}
              customSxSelectClasses={classes.customSxSelectStyle}
              onChange={(phone: string) => {
                setCompanyProfileValue({
                  ...companyProfileValue,
                  contactNumber: {
                    value: phone,
                    error:
                      isTruthy(companyProfileValue.contactNumber.value) &&
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
                  isPhoneValid(companyProfileValue.contactNumber.value)
                )
              }
            />
            {/* isTruthy(companyProfileValue.contactNumber.value) && */}
            {companyProfileValue.contactNumber.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {companyProfileValue.contactNumber.error}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <CustomContactInput
              label="Fax Number"
              name="faxNumber"
              value={companyProfileValue.faxNumber.value}
              placeHolder="(###) ###-####"
              customInputTextFieldClasses={{
                borderRadius: "38px",
              }}
              customSxSelectClasses={classes.customSxSelectStyle}
              onChange={(phone: string) => {
                setCompanyProfileValue({
                  ...companyProfileValue,
                  faxNumber: {
                    value: phone,
                    error:
                      isTruthy(companyProfileValue.faxNumber.value) &&
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
                  isPhoneValid(companyProfileValue.faxNumber.value)
                )
              }
            />
            {/* isTruthy(companyProfileValue.faxNumber.value) && */}
            {companyProfileValue.faxNumber.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {companyProfileValue.faxNumber.error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <CustomContactInput
              label="Phone Number"
              name="phoneNumber"
              value={companyProfileValue.phoneNumber.value}
              placeHolder="(###) ###-####"
              customInputTextFieldClasses={{
                borderRadius: "38px",
              }}
              customSxSelectClasses={classes.customSxSelectStyle}
              onChange={(phone: string) => {
                setCompanyProfileValue({
                  ...companyProfileValue,
                  phoneNumber: {
                    value: phone,
                    error:
                      isTruthy(companyProfileValue.phoneNumber.value) &&
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
                  isPhoneValid(companyProfileValue.phoneNumber.value)
                )
              }
            />
            {/* isTruthy(companyProfileValue.phoneNumber.value) && */}
            {companyProfileValue.phoneNumber.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {companyProfileValue.phoneNumber.error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                id="name"
                label="Website"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your website"
                type="text"
                name="website"
                value={companyProfileValue.website.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  !isTruthy(companyProfileValue.website.value) &&
                  companyProfileValue.website.error
                }
              />
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="address"
                label="Address"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your address"
                type="text"
                name="companyAddress"
                value={companyProfileValue.companyAddress.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  !isTruthy(companyProfileValue.companyAddress.value) &&
                  companyProfileValue.companyAddress.error
                }
              />
              {!isTruthy(companyProfileValue.companyAddress.value) &&
                companyProfileValue.companyAddress.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {companyProfileValue.companyAddress.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12} sm={12}>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel}>
                <Typography
                  variant="h6"
                  sx={classes.inputLabel}
                  style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
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
                value={companyProfileValue?.country?.value}
                onChange={handleOnchangeCompanyDetails}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography variant="h4">
                    {companyProfileValue?.country?.value || "Select Country"}
                  </Typography>
                )}
                displayEmpty
              >
                {countryList?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item}
                  >
                    <Typography variant="subtitle1">{item}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {!isTruthy(companyProfileValue.country.value) &&
              companyProfileValue.country.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {companyProfileValue.country.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12} sm={12}>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel}>
                <Typography
                  variant="h6"
                  sx={classes.inputLabel}
                  style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
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
                value={companyProfileValue.state.value}
                onChange={handleOnchangeCompanyDetails}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography variant="h4">
                    {companyProfileValue.state.value || "Select State"}
                  </Typography>
                )}
                displayEmpty
              >
                {state?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item}
                  >
                    <Typography variant="subtitle1">{item}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {!isTruthy(companyProfileValue.state.value) &&
              companyProfileValue.state.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {companyProfileValue.state.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12} sm={12}>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel}>
                <Typography
                  variant="h6"
                  sx={classes.inputLabel}
                  style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
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
                value={companyProfileValue.city.value}
                onChange={handleOnchangeCompanyDetails}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography variant="h4">
                    {companyProfileValue.city.value || "Select City"}
                  </Typography>
                )}
                displayEmpty
              >
                {city?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item}
                  >
                    <Typography variant="subtitle1">{item}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {!isTruthy(companyProfileValue.city.value) &&
              companyProfileValue.city.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {companyProfileValue.city.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box>
              <CustomInput
                id="zipCode"
                label="Zip Code"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your zip code"
                type="text"
                name="zipCode"
                value={companyProfileValue.zipCode.value}
                onChange={handleOnchangeCompanyDetails}
                error={
                  !isTruthy(companyProfileValue.zipCode.value) &&
                  companyProfileValue.zipCode.error
                }
              />
              {!isTruthy(companyProfileValue.zipCode.value) &&
                companyProfileValue.zipCode.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {companyProfileValue.zipCode.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>

          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
                variant="h6"
              >
                Upload Company Logo
              </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <CustomDropzone
              acceptedFileTypes={[".jpeg", ".jpg", ".png", ".svg"]}
              dropzoneIcon={DownloadsIcon}
              onAdd={uploadDocumentFileHandler}
              maxFileSize={10485760}
              dropzoneCustomClasses={{
                background: bgcolor ? "#373854" : "#E6E7FF",
                border: !bgcolor ? "1px solid #C1C1C1" : "none",
                display: "flex",
                flexDirection: "column",
                py: 1.5,
              }}
              index={0}
              uploadedFileName={companyProfileValue?.logoPath?.value
                ?.split("_")
                .slice(1)
                .join("_")}
              removeUploadedFileName={handleChipDelete}
              customIconStyle={{
                height: "40px",
                width: "40px",
              }}
              iconWrapperStyle={classes.dropzoneIconStyle}
              labelText={
                <>
                  <Box px={1.5}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: bgcolor ? pureWhiteColor : primaryBlackColor,
                        }}
                      >
                        Click and upload a logo.
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: bgcolor ? pureWhiteColor : primaryBlackColor,
                        }}
                      >
                        and max size is 10MB
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: bgcolor ? pureWhiteColor : primaryBlackColor,
                        }}
                      >
                        File Format (doc, pdf, png, jpg, jpeg)
                      </Typography>
                    </Box>
                  </Box>
                </>
              }
            />
            {!isTruthy(companyProfileValue.logoPath.value) &&
              companyProfileValue.logoPath.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  <Typography variant="h5">
                    {companyProfileValue.logoPath.error}
                  </Typography>
                </FormHelperText>
              )}
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Grid container justifyContent={"center"} mt={12}>
      <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
        {getUserProfileHandler()}
        {adminAccess ? (
          <>
            {userDetails()}
            {companyDetails()}
          </>
        ) : (
          userDetails()
        )}
        <Grid container mt={5} sx={{ justifyContent: "center" }}>
          <Box sx={classes.buttonWrapper} gap={3} mb={3}>
            <CustomButton
              label={strings.CANCEL}
              onClick={handleClose}
              buttonType={"outlined"}
              customClasses={{
                width: "110px",
                border: !bgcolor
                  ? "1.5px solid #C1C1C1"
                  : "1.5px solid #fff !important",
              }}
            />
            <CustomButton
              label={strings.SAVE}
              onClick={handleSubmit}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </Grid>
      <CustomLoader isLoading={isLoading} />
    </Grid>
  );
};
export default React.memo(UserProfile);
