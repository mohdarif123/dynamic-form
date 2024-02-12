import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CustomButton, CustomDialog, CustomInput } from "global/components";
import strings from "global/constants/StringConstants";
import { useTitle } from "utils/UseTitle";
import AddCompetitiveModalStyle from "./AddCompetitiveStyle";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import {
  addCompetitiveInitialState,
  addCompetitiveInitialStateReset,
  handleAddCompetitiveValidation,
} from "./AddCompetitiveTypeValidation";
import { useState } from "react";
import { addCompetitive } from "./AddCompetitiveServices";
import {
  dropDownDarkForSx,
  errorStyling,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import { countries } from "./CountryData";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { getCustomError } from "utils/customError";

interface customProps {
  openAddCompetitiveModal: boolean;
  setOpenAddCompetitiveModal: Function;
  domainType: any;
  regionType: any;
  typeValue: any;
  sourceValue: any;
  getCompetitiveTableData: any;
  dropdownValue?: any;
  page?: any;
}
const AddCompetitive = (props: customProps) => {
  useTitle(strings.COMPETITIVE);
  const websiteRegex = strings.websiteRegex;
  const emailRegex = strings.regex;
  const classes = AddCompetitiveModalStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [loading, setLoading] = useState<boolean>(false);
  const [competitiveData, setCompetitiveData] = useState<any>();
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const [joiData, setJoiData] = useState<any>([]);
  const [addCompetitiveValue, setAddCompetitiveValue] = useState<any>(
    addCompetitiveInitialState
  );
  const handleClose = () => {
    setAddCompetitiveValue(addCompetitiveInitialStateReset);
    props.setOpenAddCompetitiveModal!(false);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const handleOnchange = (event: any) => {
    setAddCompetitiveValue({
      ...addCompetitiveValue,
      [event.target.name]: {
        ...addCompetitiveValue[event.target.name],
        value: event.target?.value,
        error: "",
      },
    });
  };
  const handleSubmitCompetitive = async (data: any) => {
    try {
      setLoading(true);
      await addCompetitive(data);
      openSuccessNotification("Comparision has been added successfully");
      props.setOpenAddCompetitiveModal!(false);
      await props.getCompetitiveTableData(
        props.dropdownValue?.region?.value,
        props.dropdownValue?.domain?.value,
        props?.page
      );
      setAddCompetitiveValue(addCompetitiveInitialState(""));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(getCustomError(error));
      console.log(error);
      getCustomError(error);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: any =
      handleAddCompetitiveValidation(addCompetitiveValue);
    setAddCompetitiveValue({ ...errors });
    return isValid;
  };
  const handleSubmit = () => {
    if (
      handleValidation() &&
      (addCompetitiveValue?.aggencyContactNo?.error === "" ||
        !addCompetitiveValue.aggencyContactNo.value)
    ) {
      const joiValue: any[] = [];
      joiValue.push({
        text: addCompetitiveValue?.comment?.value,
      });
      const data = {
        requestId: addCompetitiveValue.solicitation?.value,
        source: addCompetitiveValue.source?.value,
        title: addCompetitiveValue.title?.value,
        agency: {
          name: addCompetitiveValue.aggencyName?.value,
          email: addCompetitiveValue.aggencyEmail?.value,
          webSite: addCompetitiveValue.aggencyWebsite?.value,
          contactNo:
            isPhoneValid(addCompetitiveValue.aggencyContactNo.value) &&
            isVisitedContactField
              ? addCompetitiveValue.aggencyContactNo.value
              : "",
          address: {
            line1: addCompetitiveValue.line1?.value,
            line2: addCompetitiveValue.line2?.value,
            line3: addCompetitiveValue.line3?.value,
            // line4: addCompetitiveValue.line4?.value,
            city: addCompetitiveValue.city?.value,
            country: addCompetitiveValue.country?.value,
            pinCode: addCompetitiveValue.Zip?.value,
            state: addCompetitiveValue.state?.value,
          },
        },
        price: addCompetitiveValue.price.value,
        type: addCompetitiveValue.type?.value,
        region: addCompetitiveValue.region?.value,
        domain: addCompetitiveValue.domain?.value,
        comments:
          addCompetitiveValue?.comment?.value?.length > 1 ? joiValue : joiData,
      };
      handleSubmitCompetitive(data);
    }
  };

  const addUserHeaderContent = () => {
    return (
      <Typography variant="h2" sx={{ color: "white" }}>
        Add Comparison
      </Typography>
    );
  };
  const agencyInformation = () => {
    return (
      <>
        <Grid
          item
          xl={5.8}
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          sx={{
            backgroundColor: !bgcolor ? "" : "#373854",
            margin: "5px",
            borderRadius: "20px",
            boxShadow: !bgcolor ? "0 8px 16px 0 rgba(0,0,0,0.3)" : "",
          }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              m={3}
              sx={{ color: !bgcolor ? "black" : pureWhiteColor }}
              variant="h2"
            >
              Agency Information
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2}>
            <CustomInput
              required
              id="aggencyName"
              label="Agency Name"
              placeHolder="Enter agency name"
              type="text"
              name="aggencyName"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.aggencyName.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.aggencyName.value) &&
                addCompetitiveValue.aggencyName.error
              }
            />
            {!isTruthy(addCompetitiveValue.aggencyName.value) &&
              addCompetitiveValue.aggencyName.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addCompetitiveValue.aggencyName.error}
                </FormHelperText>
              )}
          </Grid>

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2} mt={1.5}>
            <CustomInput
              required
              id="aggencyEmail"
              label="Agency Email"
              placeHolder="Enter agency email"
              type="text"
              name="aggencyEmail"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.aggencyEmail.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.aggencyEmail.value) &&
                addCompetitiveValue.aggencyEmail.error
              }
            />
            {!emailRegex.test(addCompetitiveValue.aggencyEmail?.value) &&
            addCompetitiveValue.aggencyEmail?.value.length > 0 ? (
              <FormHelperText error sx={{ ...errorStyling }}>
                Please enter correct agency email
              </FormHelperText>
            ) : !isTruthy(addCompetitiveValue.aggencyEmail?.value) &&
              addCompetitiveValue?.aggencyEmail?.error ? (
              <FormHelperText error sx={{ ...errorStyling }}>
                {addCompetitiveValue?.aggencyEmail?.error}
              </FormHelperText>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2} mt={1.5}>
            <CustomInput
              id="aggencyWebsite"
              label="Agency Website"
              placeHolder="Enter agency website"
              type="text"
              name="aggencyWebsite"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.aggencyWebsite.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.aggencyWebsite.value) &&
                addCompetitiveValue.aggencyWebsite.error
              }
            />
            {!websiteRegex.test(addCompetitiveValue.aggencyWebsite?.value) &&
            addCompetitiveValue.aggencyWebsite?.value ? (
              <FormHelperText error sx={{ ...errorStyling }}>
                Please enter correct agency website
              </FormHelperText>
            ) : (
              ""
            )}
          </Grid>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomContactInput
                id="aggencyContactNo"
                label="Agency Contact Number"
                name="aggencyContactNo"
                textfieldDisabled={competitiveData ? true : false}
                selectDisabled={competitiveData ? true : false}
                value={addCompetitiveValue.aggencyContactNo.value}
                placeHolder="(###) ###-####"
                customInputTextFieldClasses={{
                  borderRadius: "38px",
                  ".MuiSvgIcon-root ": {
                    fill: "#7A81FD",
                  },
                }}
                customSxSelectClasses={classes.customSxSelectStyle}
                onChange={(phone: string) => {
                  setAddCompetitiveValue({
                    ...addCompetitiveValue,
                    aggencyContactNo: {
                      value: phone,
                      error:
                        isTruthy(addCompetitiveValue.aggencyContactNo.value) &&
                        isVisitedContactField &&
                        !isPhoneValid(phone)
                          ? "Please enter a valid contact No"
                          : "",
                    },
                  });
                }}
                onClick={() => setVisitedContactFelid(true)}
                onBlur={() => {
                  setVisitedContactFelid(
                    isPhoneValid(addCompetitiveValue.aggencyContactNo.value)
                  );
                }}
              />
              {isTruthy(addCompetitiveValue.aggencyContactNo.value) &&
                addCompetitiveValue.aggencyContactNo.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.aggencyContactNo.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomInput
                id="line1"
                label="Address Line 1"
                placeHolder="Enter address line 1"
                type="text"
                name="line1"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.line1.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.line1.value) &&
                  addCompetitiveValue.line1.error
                }
              />
              {!isTruthy(addCompetitiveValue.line1.value) &&
                addCompetitiveValue.line1.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.line1.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomInput
                id="line2"
                label="Address Line 2"
                placeHolder="Enter address line 2"
                type="text"
                name="line2"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.line2.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.line2.value) &&
                  addCompetitiveValue.line2.error
                }
              />
              {!isTruthy(addCompetitiveValue.line2.value) &&
                addCompetitiveValue.line2.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.line2.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomInput
                id="line3"
                label="Address Line 3"
                placeHolder="Enter address line 3"
                type="text"
                name="line3"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.line3.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.line3.value) &&
                  addCompetitiveValue.line3.error
                }
              />
              {!isTruthy(addCompetitiveValue.line3.value) &&
                addCompetitiveValue.line3.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.line3.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <Stack sx={{ borderRadius: "34px" }}>
                <InputLabel sx={classes.inputLabel}>
                  <Typography
                    variant="h6"
                    sx={{ color: !bgcolor ? "black" : "#ffffff" }}
                  >
                    Country
                  </Typography>
                </InputLabel>
                <Select
                  sx={!bgcolor ? classes.dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="country"
                  name="country"
                  onChange={handleOnchange}
                  value={addCompetitiveValue.country.value}
                  displayEmpty
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addCompetitiveValue.country?.value || "Select country"}
                    </Typography>
                  )}
                >
                  {countries?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              {!isTruthy(addCompetitiveValue.country.value) &&
                addCompetitiveValue.country.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.country.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomInput
                id="state"
                label="State"
                placeHolder="Enter state"
                type="text"
                name="state"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.state.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.state.value) &&
                  addCompetitiveValue.state.error
                }
              />
              {!isTruthy(addCompetitiveValue.state.value) &&
                addCompetitiveValue.state.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.state.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <CustomInput
                id="city"
                label="City"
                placeHolder="Enter city"
                type="text"
                name="city"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.city.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.city.value) &&
                  addCompetitiveValue.city.error
                }
              />
              {!isTruthy(addCompetitiveValue.city.value) &&
                addCompetitiveValue.city.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.city.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5, marginBottom: 2 }}
            >
              <CustomInput
                id="Zip"
                label="Zip Code"
                placeHolder="Enter zip"
                type="text"
                name="Zip"
                disabled={competitiveData ? true : false}
                value={addCompetitiveValue.Zip.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addCompetitiveValue.Zip.value) &&
                  addCompetitiveValue.Zip.error
                }
              />
              {!isTruthy(addCompetitiveValue.Zip.value) &&
                addCompetitiveValue.Zip.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.Zip.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  const dialogFooterContent = () => {
    return (
      <>
        <Grid container sx={{ justifyContent: "center" }} py={2}>
          <Box sx={classes.buttonWrapper}>
            <CustomButton
              label={strings.CANCEL}
              onClick={handleClose}
              buttonType={"outlined"}
              customClasses={{
                width: "110px",
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
                border: !bgcolor
                  ? "1.5px solid #C1C1C1"
                  : "1.5px solid #fff !important",
              }}
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
        </Grid>
      </>
    );
  };
  const rfpInformation = () => {
    return (
      <>
        <Grid
          item
          xl={5.8}
          lg={5.8}
          md={5.8}
          sm={12}
          xs={12}
          sx={{
            backgroundColor: !bgcolor ? "" : "#373854",
            margin: "5px",
            borderRadius: "20px",
            boxShadow: !bgcolor ? "0 8px 16px 0 rgba(0,0,0,0.3)" : "",
          }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography
              sx={{ color: !bgcolor ? "black" : pureWhiteColor }}
              m={3}
              variant="h2"
            >
              RFP Information
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2}>
            <CustomInput
              required
              id="solicitation"
              label="Solicitation"
              placeHolder="Enter solicitation"
              type="text"
              name="solicitation"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.solicitation.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.solicitation.value) &&
                addCompetitiveValue.solicitation.error
              }
            />
            {!isTruthy(addCompetitiveValue.solicitation.value) &&
              addCompetitiveValue.solicitation.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addCompetitiveValue.solicitation.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2} mt={1.5}>
            <CustomInput
              required
              id="title"
              label="Title"
              placeHolder="Enter title"
              type="text"
              name="title"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.title.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.title.value) &&
                addCompetitiveValue.title.error
              }
            />
            {!isTruthy(addCompetitiveValue.title.value) &&
              addCompetitiveValue.title.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addCompetitiveValue.title.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <Stack sx={{ borderRadius: "34px" }}>
                <InputLabel
                  sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                >
                  <Typography variant="h6">Region</Typography>
                  <Box sx={classes.star}>*</Box>
                </InputLabel>
                <Select
                  sx={!bgcolor ? classes.dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="region"
                  name="region"
                  onChange={handleOnchange}
                  value={addCompetitiveValue.region.value}
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addCompetitiveValue.region?.value || "Select region"}
                    </Typography>
                  )}
                  displayEmpty
                >
                  {props.regionType?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              {!isTruthy(addCompetitiveValue.region.value) &&
                addCompetitiveValue.region.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.region.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <Stack sx={{ borderRadius: "34px" }}>
                <InputLabel
                  sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                >
                  <Typography variant="h6">Domain</Typography>
                  <Box sx={classes.star}>*</Box>
                </InputLabel>
                <Select
                  sx={!bgcolor ? classes.dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="domain"
                  name="domain"
                  onChange={handleOnchange}
                  value={addCompetitiveValue.domain.value}
                  displayEmpty
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addCompetitiveValue.domain?.value || "Select domain"}
                    </Typography>
                  )}
                >
                  {props.domainType?.map((item: any, index: number) => (
                    <MenuItem
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                      key={index}
                      value={item.name}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              {!isTruthy(addCompetitiveValue.domain.value) &&
                addCompetitiveValue.domain.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.domain.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: 3.2 }}
            px={2}
          >
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <Stack sx={{ borderRadius: "34px" }}>
                <InputLabel
                  sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                >
                  <Typography variant="h6">Source</Typography>
                  <Box sx={classes.star}>*</Box>
                </InputLabel>
                <Select
                  sx={!bgcolor ? classes.dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="source"
                  name="source"
                  onChange={handleOnchange}
                  value={addCompetitiveValue.source.value}
                  displayEmpty
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addCompetitiveValue.source?.value || "Select source"}
                    </Typography>
                  )}
                >
                  {props.sourceValue?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              {!isTruthy(addCompetitiveValue.source.value) &&
                addCompetitiveValue.source.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.source.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid
              item
              xl={5.7}
              lg={5.7}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: 1.5 }}
            >
              <Stack sx={{ borderRadius: "34px" }}>
                <InputLabel
                  sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                >
                  <Typography variant="h6">Type</Typography>
                  <Box sx={classes.star}>*</Box>
                </InputLabel>
                <Select
                  sx={!bgcolor ? classes.dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="type"
                  name="type"
                  onChange={handleOnchange}
                  value={addCompetitiveValue.type.value}
                  displayEmpty
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addCompetitiveValue.type?.value || "Select type"}
                    </Typography>
                  )}
                >
                  {props.typeValue?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              {!isTruthy(addCompetitiveValue.type.value) &&
                addCompetitiveValue.type.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addCompetitiveValue.type.error}
                  </FormHelperText>
                )}
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={2} mt={1.5}>
            <CustomInput
              id="price"
              label="Contract Price"
              placeHolder="Enter contract price"
              type="number"
              name="price"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.price.value}
              InputProps={{
                inputProps: {
                  min: 0, // Add your minimum value here
                },
              }}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.price.value) &&
                addCompetitiveValue.price.error
              }
            />
            {!isTruthy(addCompetitiveValue.price.value) &&
              addCompetitiveValue.price.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addCompetitiveValue.price.error}
                </FormHelperText>
              )}
          </Grid>
          <Grid
            sx={{ marginBottom: 8 }}
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            px={2}
            mt={1.5}
          >
            <CustomInput
              id="comment"
              label="Comment"
              placeHolder="Enter comment"
              type="text"
              name="comment"
              disabled={competitiveData ? true : false}
              value={addCompetitiveValue.comment.value}
              onChange={handleOnchange}
              error={
                !isTruthy(addCompetitiveValue.comment.value) &&
                addCompetitiveValue.comment.error
              }
            />
            {!isTruthy(addCompetitiveValue.comment.value) &&
              addCompetitiveValue.comment.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {addCompetitiveValue.comment.error}
                </FormHelperText>
              )}
          </Grid>
        </Grid>
      </>
    );
  };
  const dialogBodyContent = () => {
    return (
      <>
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ backgroundColor: !bgcolor ? "white" : "#282844" }}
        >
          {rfpInformation()}
          {agencyInformation()}
        </Grid>
      </>
    );
  };
  return (
    <>
      <CustomDialog
        isDialogOpen={props.openAddCompetitiveModal}
        closeButtonVisibility
        closable
        dialogHeaderContent={addUserHeaderContent()}
        dialogBodyContent={dialogBodyContent()}
        dialogFooterContent={dialogFooterContent()}
        handleDialogClose={handleClose}
        width={"1200px"}
        borderRadius="33px"
        hideBgColor
        dialogFooterClass
      />
      <CustomLoader isLoading={loading} />
    </>
  );
};
export default AddCompetitive;
