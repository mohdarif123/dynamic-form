import ProposalStyles from "../Proppsals.style";
import {
  Box,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import InputMask from "react-input-mask";
import { isPhoneValid, isTruthy } from "helpers/methods";
import strings from "global/constants/StringConstants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  menuPropsDarkStyle,
  menuPropsLightStyle,
  dropDownDarkForSx,
  dropDownLightForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
  errorStyling,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import React from "react";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";

interface AgencyProps {
  setAddProposalValue: any;
  addProposalValue: any;
  country: string[];
  state: string[];
  city: string[];
  handleBackStep: any;
  nextStep: any;
  handleClose?: any;
  setVisitedContactFelid?: any;
  isVisitedContactField?: boolean;
}

const AgencyInformartionScreen = (props: AgencyProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = ProposalStyles;
  const emailRegex = strings.regex;
  const websiteRegex = strings.websiteRegex;

  const onChangeHandler = (e: any) => {
    props.setAddProposalValue({
      ...props.addProposalValue,
      [e.target.name]: {
        ...props.addProposalValue[e.target.name],
        value: e.target?.value,
        error: "",
      },
    });
  };

  const onChangeState = (e: any) => {
    props.setAddProposalValue({
      ...props.addProposalValue,
      [e.target.name]: {
        ...props.addProposalValue[e.target.name],
        value: e.target?.value,
        error: "",
      },
      city: {
        value: "",
        error: "",
      },
    });
  };
  return (
    <>
      <Box>
        <Container maxWidth="md">
          <Box
            onClick={() => props.handleBackStep()}
            sx={{ cursor: "pointer" }}
          >
            <CustomIcon
              icon={
                <ArrowBackIcon
                  sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                />
              }
            />
            <Typography
              sx={{
                fontSize: "32x",
                fontWeight: 400,
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              variant="h6"
            >
              Back
            </Typography>
          </Box>
          <Box mt={3}>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    required
                    id="agencyName"
                    label="Agency Name"
                    placeHolder="Enter your agency name"
                    type="text"
                    name="agencyName"
                    propsToInputElement={{ maxLength: 100 }}
                    value={props.addProposalValue.agencyName?.value}
                    onChange={onChangeHandler}
                    error={
                      !isTruthy(props?.addProposalValue?.agencyName?.value) &&
                      props?.addProposalValue?.agencyName?.error
                    }
                  />
                  {!isTruthy(props?.addProposalValue?.agencyName?.value) &&
                    props?.addProposalValue?.agencyName?.error && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addProposalValue?.agencyName?.error}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    required
                    id="agencyEmail"
                    label="Agency Email"
                    placeHolder="Enter your agency email"
                    type="text"
                    name="agencyEmail"
                    propsToInputElement={{ maxLength: 50 }}
                    value={props.addProposalValue.agencyEmail?.value}
                    onChange={onChangeHandler}
                    error={
                      (!isTruthy(props.addProposalValue.agencyEmail?.value) &&
                        props?.addProposalValue?.agencyEmail?.error) ||
                      (isTruthy(props.addProposalValue.agencyEmail?.value) &&
                        !strings.regex.test(
                          props.addProposalValue.agencyEmail?.value
                        ))
                    }
                  />

                  {!emailRegex.test(
                    props.addProposalValue.agencyEmail?.value
                  ) && props.addProposalValue.agencyEmail?.value.length > 0 ? (
                    <FormHelperText error sx={{...errorStyling}}>
                      Please enter correct agency email
                    </FormHelperText>
                  ) : !isTruthy(props.addProposalValue.agencyEmail?.value) &&
                    props?.addProposalValue?.agencyEmail?.error ? (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props?.addProposalValue?.agencyEmail?.error}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    id="agencyWebsite"
                    label="Agency Website"
                    placeHolder="Enter your agency website"
                    type="text"
                    name="agencyWebsite"
                    propsToInputElement={{ maxLength: 500 }}
                    value={props.addProposalValue.agencyWebsite?.value}
                    onChange={onChangeHandler}
                  />
                  {!websiteRegex.test(
                    props.addProposalValue.agencyWebsite?.value
                  ) && props.addProposalValue.agencyWebsite?.value ? (
                    <FormHelperText error sx={{...errorStyling}}>
                      Please enter correct agency website
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomContactInput
                    id="agencyContactNo"
                    label="Agency Contact Number"
                    name="agencyContactNo"
                    value={props.addProposalValue.agencyContactNo?.value}
                    placeHolder="(###) ###-####"
                    customInputTextFieldClasses={{
                      borderRadius: "38px",
                      ".MuiSvgIcon-root ": {
                        fill: "#7A81FD",
                      },
                    }}
                    customSxSelectClasses={classes.customSxSelectStyle}
                    onChange={(phone: string) => {
                      props.setAddProposalValue({
                        ...props.addProposalValue,
                        agencyContactNo: {
                          value: phone,
                          error:
                            isTruthy(
                              props.addProposalValue.agencyContactNo?.value
                            ) &&
                            props?.isVisitedContactField &&
                            !isPhoneValid(phone)
                              ? "Please enter a valid contact No"
                              : "",
                        },
                      });
                    }}
                    onClick={() => props?.setVisitedContactFelid(true)}
                    onBlur={() =>
                      props?.setVisitedContactFelid(
                        isPhoneValid(
                          props.addProposalValue.agencyContactNo?.value
                        )
                      )
                    }
                  />
                  {isTruthy(props.addProposalValue.agencyContactNo?.value) &&
                    props.addProposalValue.agencyContactNo?.error && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props.addProposalValue.agencyContactNo?.error}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CustomInput
                    id="line1"
                    label="Address Line 1"
                    placeHolder="Enter your address line 1"
                    type="text"
                    name="line1"
                    value={props.addProposalValue.line1?.value}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    id="line2"
                    label="Address Line 2"
                    placeHolder="Enter your address line 2"
                    type="text"
                    name="line2"
                    value={props.addProposalValue.line2?.value}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    id="line3"
                    label="Address Line 3"
                    placeHolder="Enter your address line 3"
                    type="text"
                    name="line3"
                    value={props.addProposalValue.line3?.value}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Stack direction="column">
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Country
                      </Typography>
                    </InputLabel>
                    <Select
                      id="country"
                      name="country"
                      value={props.addProposalValue.country.value}
                      onChange={onChangeHandler}
                      sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                      style={!bgcolor ? selectBgLight : selectBgDark}
                      MenuProps={
                        !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                      }
                      readOnly
                      renderValue={() => (
                        <Typography
                          sx={
                            !bgcolor
                              ? renderValueLightStyle
                              : renderValueDarkStyle
                          }
                          variant="h4"
                        >
                          {props.addProposalValue.country.value ||
                            "Select Region"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {props.country?.map((item: any, index: any) => (
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
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Stack direction="column">
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
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
                      value={props.addProposalValue.state.value}
                      onChange={onChangeState}
                      sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                      style={!bgcolor ? selectBgLight : selectBgDark}
                      MenuProps={
                        !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                      }
                      renderValue={() => (
                        <Typography
                          sx={
                            !bgcolor
                              ? renderValueLightStyle
                              : renderValueDarkStyle
                          }
                          variant="h4"
                        >
                          {props.addProposalValue.state.value || "Select State"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {props.state?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item}
                        >
                          <Typography variant="subtitle1">{item}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.state?.value) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addProposalValue?.state?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  {/* <Stack direction="column">
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
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
                      value={props.addProposalValue.city?.value}
                      onChange={onChangeHandler}
                      sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                      style={!bgcolor ? selectBgLight : selectBgDark}
                      MenuProps={
                        !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                      }
                      renderValue={() => (
                        <Typography
                          sx={
                            !bgcolor
                              ? renderValueLightStyle
                              : renderValueDarkStyle
                          }
                          variant="h4"
                        >
                          {props.addProposalValue.city?.value || "Select city"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {props.city?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item}
                        >
                          <Typography variant="subtitle1">{item}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.city?.value) && (
                      <FormHelperText error>
                        {props?.addProposalValue?.city?.error}
                      </FormHelperText>
                    )}
                  </Stack> */}
                  <CustomInput
                    required
                    id="city"
                    label="City"
                    placeHolder="Enter your city"
                    type="text"
                    name="city"
                    value={props.addProposalValue.city?.value}
                    onChange={onChangeHandler}
                  />
                  {!isTruthy(props?.addProposalValue?.city?.value) && (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props?.addProposalValue?.city?.error}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <CustomInput
                    id="postalCode"
                    label="Postal Code"
                    placeHolder="Enter your postal code"
                    type="text"
                    name="postalCode"
                    propsToInputElement={{ maxLength: 6 }}
                    value={props.addProposalValue.postalCode.value}
                    onChange={onChangeHandler}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={3}>
              <Grid container mt={1} sx={{ justifyContent: "center" }}>
                <Box sx={classes.buttonWrapper} gap={3}>
                  <CustomButton
                    label={strings.CANCEL}
                    onClick={() => props.handleClose()}
                    customClasses={{ width: "110px" }}
                    buttonType={"outlined"}
                  />
                  <CustomButton
                    label={strings.NEXT}
                    onClick={() => {
                      props.nextStep();
                    }}
                    customClasses={{ width: "110px" }}
                    buttonType={"contained"}
                  />
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default React.memo(AgencyInformartionScreen);
