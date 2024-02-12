import React, { useEffect, useState } from "react";
import AddUsersStyle from "./AddUser.styles";
import { Box, Stack } from "@mui/system";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomButton, CustomDialogs2, CustomInput } from "global/components";
import strings from "global/constants/StringConstants";
import InputMask from "react-input-mask";
import {
  addUserInitailState,
  handleAddUserValidation,
} from "./AddUserTypeAndValidation";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import AddUserIcon from "assets/icons/AddUserIcon.svg";
import notifiers from "global/constants/NotificationConstants";
import { addUser } from "./AddUsersService";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useTitle } from "utils/UseTitle";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  inputBoxDark,
  inputBoxLight,
  meneItemDarkStyle,
  meneItemLightStyle,
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
import { store } from "utils/store";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { getCustomError } from "utils/customError";

interface customProps {
  openAddUsersModal: boolean;
  setOpenAddUsersModal: Function;
  item?: any;
  setItems?: any;
  getUserTableData?: any;
  allRoles?: any;
  userData?: any;
}

const AddUser = (props: customProps) => {
  useTitle(strings.USER);
  const classes = AddUsersStyle;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const emailRegex = strings.regex;
  const [addUsersValue, setAddUsersValue] = useState<any>(
    addUserInitailState()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);

  useEffect(() => {
    setAddUsersValue(addUserInitailState());
  }, [props.openAddUsersModal]);

  const handleOnchange = (event: any) => {
    setAddUsersValue({
      ...addUsersValue,
      [event.target.name]: {
        ...addUsersValue[event.target.name],
        value: event.target?.value,
        error: "",
      },
    });
  };

  const RoleName = () => {
    if (addUsersValue.role.value) {
      return props.allRoles?.find(
        (item: any) => item.id === addUsersValue.role.value
      )?.name;
    }
    return "";
  };

  const handleValidation = () => {
    const { isValid, errors } = handleAddUserValidation(
      addUsersValue,
      isVisitedContactField
    );
    setAddUsersValue({ ...errors });
    return isValid;
  };
  const handleClose = () => {
    props.setOpenAddUsersModal!(false);
    setAddUsersValue(addUserInitailState());
  };

  const handleSubmit = async () => {
    const addUserPayload = {
      id: "",
      pwd: "",
      newPwd: "",
      authToken: "",
      name: addUsersValue?.name?.value.trim(),
      contactNo: addUsersValue?.contactNumber?.value,
      email: addUsersValue?.email?.value,
      role: addUsersValue?.role?.value,
      resources: [],
      notifyActivation: true,
      account: store.getState().auth.userAccount,
      pwdType: "",
      roleIds: [addUsersValue?.role?.value],
      status: "Active",
    };
    if (handleValidation()) {
      try {
        setIsLoading(true);
        await addUser(addUserPayload);
        openSuccessNotification("User has been added successfully");
        setAddUsersValue(addUserInitailState());
        props.setOpenAddUsersModal(false);
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
          Add User
        </Typography>
      </Box>
    );
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
                propsToInputElement={{ maxLength: 100 }}
                label="Email"
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
              {!emailRegex.test(addUsersValue.email.value) &&
              addUsersValue.email.value.length > 0 ? (
                <FormHelperText error sx={{ ...errorStyling }}>
                  Please enter correct email
                </FormHelperText>
              ) : !isTruthy(addUsersValue.email.value) &&
                addUsersValue.email?.error ? (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addUsersValue.email?.error}
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
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <CustomContactInput
              required
              label="Contact Number"
              name="contactNumber"
              id="contactNumber"
              value={addUsersValue.contactNumber.value}
              customInputTextFieldClasses={{ borderRadius: "38px" }}
              customSxSelectClasses={classes.customSxSelectStyle}
              placeHolder="(###) ###-####"
              onChange={(phone: string) => {
                setAddUsersValue({
                  ...addUsersValue,
                  contactNumber: {
                    value: phone,
                    error:
                      isTruthy(addUsersValue.contactNumber.value) &&
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
            {!isTruthy(addUsersValue.contactNumber.value) &&
              addUsersValue.contactNumber.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addUsersValue.contactNumber.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Stack direction="column" style={{ width: "100%" }}>
                <InputLabel sx={classes.nameField}>
                  <Typography
                    variant="h6"
                    sx={classes.inputLabel}
                    style={{
                      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                    }}
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
                  id="role"
                  name="role"
                  value={RoleName()}
                  onChange={(e: any) => {
                    handleOnchange(e);
                  }}
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addUsersValue.role.value !== ""
                        ? RoleName()
                        : "Select Role"}
                    </Typography>
                  )}
                  displayEmpty
                  error={
                    !isTruthy(addUsersValue.role.value) &&
                    addUsersValue.role.error
                  }
                >
                  {props.allRoles.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item.id}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                {!isTruthy(addUsersValue.role.value) &&
                  addUsersValue.role.error && (
                    <FormHelperText error style={{ paddingLeft: "5px" }}>
                      {addUsersValue.role.error}
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
            customClasses={{
              width: "110px",
              [`@media screen and (max-width: ${324}px)`]: {
                width: "190px",
              },
              border: !bgcolor
                ? "1.5px solid #C1C1C1"
                : "1.5px solid #fff !important",
            }}
            buttonType={"outlined"}
          />
          <CustomButton
            label={strings.SAVE}
            onClick={handleSubmit}
            customClasses={{
              width: "110px",
              [`@media screen and (max-width: ${324}px)`]: {
                width: "190px",
              },
            }}
            buttonType={"contained"}
          />
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return (
    <CustomDialogs2
      isDialogOpen={props.openAddUsersModal}
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

export default AddUser;
