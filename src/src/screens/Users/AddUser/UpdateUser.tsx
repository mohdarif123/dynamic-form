import React, { useEffect, useState } from "react";
import AddUsersStyle from "./AddUser.styles";
import { Box, Stack } from "@mui/system";
import {
  Grid,
  InputLabel,
  FormHelperText,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomButton, CustomDialogs2, CustomInput } from "global/components";
import strings from "global/constants/StringConstants";
import InputMask from "react-input-mask";
import {
  handleAddUserValidation,
  UpadteUserInitailState,
} from "./UpdateUserType";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { userUpdated } from "./AddUsersService";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useTitle } from "utils/UseTitle";
import AddUserIcon from "assets/icons/AddUserIcon.svg";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  inputBoxDark,
  inputBoxLight,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryBlackColor,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { getCustomError } from "utils/customError";

interface customProps {
  openUpdateUsers: boolean;
  setOpenUpdateUsers: Function;
  setItems?: any;
  item?: any;
  handleClose?: any;
  getUserTableData?: any;
  allRoles?: any;
}

const UpdateUser = (props: customProps) => {
  useTitle(strings.USER);
  const classes = AddUsersStyle;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const emailRegex = strings.regex;
  const item = props.item;
  const [updateUsersValue, setUpdateUsersValue] = useState<any>(
    UpadteUserInitailState(props.item)
  );
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const disable = item ? true : false;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUpdateUsersValue(UpadteUserInitailState(props.item));
  }, [props.item]);

  const handleOnchange = (event: any) => {
    setUpdateUsersValue({
      ...updateUsersValue,
      [event.target.name]: {
        ...updateUsersValue[event.target.name],
        value: event.target?.value,
        error: "",
      },
    });
  };
  const RoleName = () => {
    if (updateUsersValue.role.value) {
      return props.allRoles?.find(
        (item: any) => item.id === updateUsersValue.role.value
      )?.name;
    }
    return "";
  };
  const handleValidation = () => {
    const { isValid, errors } = handleAddUserValidation(updateUsersValue);
    setUpdateUsersValue({ ...errors });
    return isValid;
  };

  const handleSubmit = async () => {
    const editUserPayload = {
      account: item?.account,
      authToken: "",
      contactNo: updateUsersValue?.contactNumber?.value,
      email: updateUsersValue?.email?.value,
      id: "",
      name: updateUsersValue?.name?.value?.trim(),
      pwd: "",
      newPwd: "",
      resources: [],
      role: updateUsersValue?.role?.value,
      roleIds: item?.roleIds,
      status: item?.status,
    };

    const contactValidation =
      isTruthy(updateUsersValue?.contactNumber?.value) &&
      !isPhoneValid(updateUsersValue.contactNumber.value)
        ? true
        : false;
    if (handleValidation() && contactValidation === false) {
      try {
        setIsLoading(true);
        await userUpdated(editUserPayload);
        openSuccessNotification("User has been updated successfully");
        props.handleClose();
        props.getUserTableData();
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    }
  };
  const addUserHeaderContent = () => {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        style={{ flexDirection: "column" }}
      >
        <img
          src={AddUserIcon}
          alt="AddUserIcon"
          height={"200px"}
          width={"200px"}
        />
        <Typography sx={{ color: !bgcolor ? "#000000" : "white" }} variant="h2">
          Edit User
        </Typography>
      </Box>
    );
  };

  const handleClose = () => {
    props.handleClose();
  };

  const dialogBodyContent = () => {
    return (
      <>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          px={1.7}
        >
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="email"
                customInputClasses={{
                  cursor: "not-allowed",
                }}
                disabled={disable}
                propsToInputElement={{ maxLength: 100 }}
                label="Email"
                placeHolder="Enter your email"
                type="text"
                name="email"
                value={updateUsersValue?.email?.value}
                onChange={handleOnchange}
                error={
                  (!isTruthy(updateUsersValue.email.value) &&
                    updateUsersValue.email.error) ||
                  (isTruthy(updateUsersValue.email.value) &&
                    !strings.regex.test(updateUsersValue.email.value))
                }
              />
              {!emailRegex.test(updateUsersValue.email.value) &&
              updateUsersValue.email.value.length > 0 ? (
                <FormHelperText error sx={{ ...errorStyling }}>
                  Please enter correct agency email
                </FormHelperText>
              ) : !isTruthy(updateUsersValue.email.value) &&
                updateUsersValue.email?.error ? (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {updateUsersValue.email?.error}
                </FormHelperText>
              ) : (
                ""
              )}
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="name"
                label="Name"
                propsToInputElement={{ maxLength: 64 }}
                placeHolder="Enter your name"
                type="text"
                name="name"
                value={updateUsersValue.name.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(updateUsersValue.name.value) &&
                  updateUsersValue.name.error
                }
              />
              {!isTruthy(updateUsersValue.name.value) &&
                updateUsersValue.name.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {updateUsersValue.name.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <CustomContactInput
              required
              label="Contact Number"
              name="contactNumber"
              value={updateUsersValue.contactNumber.value}
              customInputTextFieldClasses={{ borderRadius: "38px" }}
              placeHolder="(###) ###-####"
              customSxSelectClasses={classes.customSxSelectStyle}
              onChange={(phone: string) => {
                setUpdateUsersValue({
                  ...updateUsersValue,
                  contactNumber: {
                    value: phone,
                    error:
                      isTruthy(updateUsersValue.contactNumber.value) &&
                      !isPhoneValid(phone)
                        ? "Please enter a valid contact No"
                        : "",
                  },
                });
              }}
              onClick={() => setVisitedContactFelid(true)}
              onBlur={() =>
                setVisitedContactFelid(
                  isPhoneValid(updateUsersValue.contactNumber.value)
                )
              }
            />
            {updateUsersValue.contactNumber.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {updateUsersValue.contactNumber.error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Stack direction="column" style={{ width: "100%" }}>
                <InputLabel sx={classes.nameField}>
                  <Typography
                    style={{
                      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                    }}
                    variant="h6"
                    sx={classes.inputLabel}
                  >
                    Role
                  </Typography>
                  <Box component={"span"} sx={classes.CustomRequired}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  readOnly={disable}
                  id="role"
                  name="role"
                  value={RoleName()}
                  onChange={(e: any) => {
                    handleOnchange(e);
                  }}
                  renderValue={() => (
                    <Typography
                      sx={{
                        ...(!bgcolor
                          ? renderValueLightStyle
                          : renderValueDarkStyle),
                        cursor: "not-allowed",
                      }}
                      variant="h4"
                    >
                      {updateUsersValue.role.value !== ""
                        ? RoleName()
                        : () => "Select Role"}
                    </Typography>
                  )}
                  displayEmpty
                  error={
                    !isTruthy(updateUsersValue.role.value) &&
                    updateUsersValue.role.error
                  }
                ></Select>
                {!isTruthy(updateUsersValue.role.value) &&
                  updateUsersValue.role.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {updateUsersValue.role.error}
                    </FormHelperText>
                  )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Box sx={classes.buttonWrapper}>
          <CustomButton
            label={strings.CANCEL}
            onClick={handleClose}
            customClasses={classes.buttonStyle}
            buttonType={"outlined"}
          />
          <CustomButton
            label={strings.SAVE}
            onClick={handleSubmit}
            customClasses={classes.buttonStyle}
            buttonType={"contained"}
          />
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return (
    <CustomDialogs2
      isDialogOpen={props.openUpdateUsers}
      closeButtonVisibility
      closable
      dialogHeaderContent={addUserHeaderContent()}
      dialogHeaderContentClass={true}
      dialogBodyContent={dialogBodyContent()}
      handleDialogClose={handleClose}
      dialogFooterClass={true}
      width={"800px"}
      borderRadius="33px"
    />
  );
};

export default UpdateUser;
