import React, { useState } from "react";
import {
  Box,
  Chip,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ProfileStyle from "./Profile.styles";
import InputMask from "react-input-mask";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CustomButton from "global/components/CustomButton/CustomButton";
import strings from "global/constants/StringConstants";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import CustomInput from "global/components/CustomInput/CustomInput";
import { ReactComponent as dropZoneDropZone } from "assets/icons/dropZoneDropZone.svg";
import { DropzoneAreaBase } from "react-mui-dropzone";
import {
  handleProfileValidation,
  profileInitialState,
} from "./ProfileTypeAndValidation";
import notifiers from "global/constants/NotificationConstants";
import { updateProfile } from "../Users/AddUser/AddUsersService";
import { store } from "utils/store";
import { logOutAction } from "redux/authSlice";
import { upload } from "../Proposals/Proposals.service";
import { appColor, errorStyling, sidebarColor } from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { getCustomError } from "utils/customError";

const Profile = () => {
  const classes = ProfileStyle;
  const emailRegex = strings.regex;
  const [isLoading, setIsLoading] = useState(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const [profileValue, setProfileValue] = useState<any>(profileInitialState);

  const handleOnchange = (event: any) => {
    setProfileValue({
      ...profileValue,
      [event.target.name]: {
        ...profileValue[event.target.name],
        value: event.target?.value,
      },
    });
  };

  const handleValidation = () => {
    const { isValid, errors } = handleProfileValidation(profileValue);
    setProfileValue({ ...errors });
    return isValid;
  };

  const uploadDoccumentFileHandler = async (event: any) => {
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
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleSubmit = async () => {
    const accountProfile = {
      companyName: profileValue.companyName.value,
      companyDetails: profileValue.companyDetails.value,
      email: profileValue.email.value,
      companyAddress: profileValue.companyAddress.value,
      contactNumber: profileValue.contactNumber.value,
      faxNumber: profileValue.faxNumber.value,
      logoPath: uploadDocumentObject?.res?.path,
      phoneNumber: profileValue.phoneNumber.value,
      website: profileValue.website.value,
    };

    if (handleValidation()) {
      try {
        setIsLoading(true);
        await updateProfile(accountProfile);
        openSuccessNotification("Profile added successfully");
        store.dispatch(logOutAction());
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    }
  };

  const getAddProfile = () => {
    return (
      <>
        <Grid
          container
          sx={{ backgroundColor: bgcolor ? appColor : "#ffffff" }}
          height={"100vh"}
        >
          <Grid item xs={12} mx={3} my={6} sx={classes.mainWrapper} ml={8}>
            <Grid xl={12} mx={3} my={3}>
              <Typography
                variant="h1"
                sx={{ color: "#ffffff", marginLeft: "22px" }}
                mb={3}
              >
                Profile
              </Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
                mt={3}
              >
                <Grid item xs={6}>
                  <Box>
                    <CustomInput
                      required
                      id="name"
                      label="Company Name"
                      propsToInputElement={{ maxLength: 64 }}
                      placeHolder="Enter your company name"
                      type="text"
                      name="companyName"
                      value={profileValue.companyName.value}
                      onChange={handleOnchange}
                      error={
                        !isTruthy(profileValue.companyName.value) &&
                        profileValue.companyName.error
                      }
                      customInputClasses={{
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        background: bgcolor ? sidebarColor : "#ffffff",
                        "& .MuiInputBase-input": {
                          color: bgcolor ? "#CBCBCB" : "#000000",
                        },
                      }}
                    />
                    {!isTruthy(profileValue.companyName.value) &&
                      profileValue.companyName.error && (
                        <FormHelperText error sx={{ ...errorStyling }}>
                          {profileValue.companyName.error}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <CustomInput
                      id="name"
                      label="Company Details"
                      propsToInputElement={{ maxLength: 64 }}
                      placeHolder="Enter your company details"
                      type="text"
                      name="companyDetails"
                      value={profileValue.companyDetails.value}
                      onChange={handleOnchange}
                      error={
                        !isTruthy(profileValue.companyDetails.value) &&
                        profileValue.companyDetails.error
                      }
                      customInputClasses={{
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        background: bgcolor ? sidebarColor : "#ffffff",
                        "& .MuiInputBase-input": {
                          color: bgcolor ? "#CBCBCB" : "#000000",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={classes.formInput}>
                    <Typography sx={classes.label} variant="h6">
                      Upload Company Logo{" "}
                    </Typography>
                    <Box sx={classes.dropZoneWrapper}>
                      <DropzoneAreaBase
                        fileObjects={[]}
                        dropzoneText={
                          "Drag files here Or select files to upload"
                        }
                        onAdd={uploadDoccumentFileHandler}
                        maxFileSize={10485760}
                        acceptedFiles={[
                          ".jpeg",
                          ".jpg",
                          ".png",
                          ".gif",
                          ".bmp",
                          ".tiff",
                          ".pdf",
                          ".doc",
                          ".docx",
                          ".txt",
                          ".xls",
                          ".xlsx",
                        ]}
                        showAlerts={true}
                        showPreviewsInDropzone={true}
                        showFileNames={true}
                        filesLimit={1}
                        Icon={dropZoneDropZone}
                      />
                      {uploadDocumentObject?.name && (
                        <>
                          <Box mt={1}>
                            <Chip
                              sx={{ color: bgcolor ? "#FFF" : "#000000" }}
                              label={uploadDocumentObject.name}
                              variant="filled"
                            />
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <CustomInput
                      required
                      id="email"
                      propsToInputElement={{ maxLength: 100 }}
                      label="Email"
                      placeHolder="Enter your email!"
                      type="text"
                      name="email"
                      value={profileValue.email.value}
                      onChange={handleOnchange}
                      error={
                        (!isTruthy(profileValue.email.value) &&
                          profileValue.email.error) ||
                        (isTruthy(profileValue.email.value) &&
                          !strings.regex.test(profileValue.email.value))
                      }
                      customInputClasses={{
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        background: bgcolor ? sidebarColor : "#ffffff",
                        "& .MuiInputBase-input": {
                          color: bgcolor ? "#CBCBCB" : "#000000",
                        },
                      }}
                    />
                    {!emailRegex.test(profileValue.email.value) &&
                    profileValue.email.value.length > 0 ? (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        Please enter correct agency email
                      </FormHelperText>
                    ) : !isTruthy(profileValue.email.value) &&
                      profileValue.email?.error ? (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {profileValue.email?.error}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <CustomInput
                      required
                      id="name"
                      label="Company Address"
                      propsToInputElement={{ maxLength: 64 }}
                      placeHolder="Enter your company adderss"
                      type="text"
                      name="companyAddress"
                      value={profileValue.companyAddress.value}
                      onChange={handleOnchange}
                      error={
                        !isTruthy(profileValue.companyAddress.value) &&
                        profileValue.companyAddress.error
                      }
                      customInputClasses={{
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        background: bgcolor ? sidebarColor : "#ffffff",
                        "& .MuiInputBase-input": {
                          color: bgcolor ? "#CBCBCB" : "#000000",
                        },
                      }}
                    />
                    {!isTruthy(profileValue.companyAddress.value) &&
                      profileValue.companyAddress.error && (
                        <FormHelperText error sx={{ ...errorStyling }}>
                          {profileValue.companyAddress.error}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <InputLabel sx={classes.nameField}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Contact Number
                      </Typography>
                    </InputLabel>
                    <InputMask
                      height="50px"
                      mask="(999) 999-9999"
                      value={profileValue.contactNumber.value}
                      onChange={handleOnchange}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          sx={bgcolor ? classes.textField : classes.textField1}
                          placeholder="(###) ###-####"
                          name="contactNumber"
                        />
                      )}
                    </InputMask>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <InputLabel
                      sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                    >
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Fax Number
                      </Typography>
                    </InputLabel>
                    <InputMask
                      height="50px"
                      mask="(999) 999-9999"
                      value={profileValue.faxNumber.value}
                      onChange={handleOnchange}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          sx={bgcolor ? classes.textField : classes.textField1}
                          placeholder="(###) ###-####"
                          name="faxNumber"
                        />
                      )}
                    </InputMask>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <InputLabel sx={classes.nameField}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Phone Number
                      </Typography>
                    </InputLabel>
                    <InputMask
                      height="50px"
                      mask="(999) 999-9999"
                      value={profileValue.phoneNumber.value}
                      onChange={handleOnchange}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          sx={bgcolor ? classes.textField : classes.textField1}
                          placeholder="(###) ###-####"
                          name="phoneNumber"
                        />
                      )}
                    </InputMask>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <CustomInput
                      id="name"
                      label="Website"
                      propsToInputElement={{ maxLength: 64 }}
                      placeHolder="Enter your website"
                      type="text"
                      name="website"
                      value={profileValue.website.value}
                      onChange={handleOnchange}
                      error={
                        !isTruthy(profileValue.website.value) &&
                        profileValue.website.error
                      }
                      customInputClasses={{
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        background: bgcolor ? sidebarColor : "#ffffff",
                        "& .MuiInputBase-input": {
                          color: bgcolor ? "#CBCBCB" : "#000000",
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Box sx={classes.buttonWrapper} gap={3}>
                  <CustomButton
                    label={strings.CANCEL}
                    onClick={() => {
                      history.push(urls.DASHBOARD_VIEW_PATH);
                    }}
                    customClasses={{ width: "110px" }}
                    buttonType={"outlined"}
                  />
                  <CustomButton
                    label={strings.SUBMIT}
                    onClick={handleSubmit}
                    customClasses={{ width: "110px" }}
                    buttonType={"contained"}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return getAddProfile();
};

export default Profile;
