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
import { CustomButton, CustomInput } from "global/components";
import InputMask from "react-input-mask";
import { isPhoneValid, isTruthy } from "helpers/methods";
import CompetitiveStyle from "../Competitive.styel";
import strings from "global/constants/StringConstants";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { appColor, errorStyling, primaryGray, pureWhiteColor } from "utils/styles";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";

interface AgencyProps {
  setAddProposalValue: any;
  addProposalValue: any;
  country: any;
  state: string[];
  handleBackStep: any;
  nextStep: any;
  collectAddProposalData: any;
  editState: any;
  setVisitedContactFelid?: any;
  isVisitedContactField?: boolean;
}

const AgencyInformartionScreen = (props: AgencyProps) => {
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const emailRegex = strings.regex;
  const websiteRegex = strings.websiteRegex;
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 190,
      },
    },
  };
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
  return (
    <>
      <Box
        sx={{
          backgroundColor: bgcolor ? "#282844" : "#ffffff",
          borderBottomLeftRadius: "34px",
          borderBottomRightRadius: "34px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ backgroundColor: bgcolor ? "#282844" : pureWhiteColor }}
        >
          <Box sx={{ backgroundColor: bgcolor ? "#282844" : pureWhiteColor }}>
            <Box>
              <Grid container spacing={2} pt={2} mt={0}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    required
                    id="agencyName"
                    label="AgencyName"
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
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
                      (!isTruthy(props?.addProposalValue?.agencyEmail?.value) &&
                        props?.addProposalValue?.agencyEmail?.error) ||
                      (isTruthy(props?.addProposalValue?.agencyEmail?.value) &&
                        !strings.regex.test(
                          props?.addProposalValue?.agencyEmail?.value
                        ))
                    }
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
                  />
                  {!emailRegex.test(
                    props?.addProposalValue?.agencyEmail?.value
                  ) &&
                  props?.addProposalValue?.agencyEmail?.value.length > 0 ? (
                    <FormHelperText error sx={{...errorStyling}}>
                      Please enter correct agency email
                    </FormHelperText>
                  ) : !isTruthy(props?.addProposalValue?.agencyEmail?.value) &&
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
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
                    label="Agency Contact Number"
                    name="agencyContactNo"
                    value={props.addProposalValue.agencyContactNo.value}
                    placeHolder="(###) ###-####"
                    customInputTextFieldClasses={{
                      borderRadius: "38px",
                      background: !bgcolor ? "#E6E7FF" : appColor,
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
                              props.addProposalValue.agencyContactNo.value
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
                          props.addProposalValue.agencyContactNo.value
                        )
                      )
                    }
                  />
                  {isTruthy(props.addProposalValue.agencyContactNo.value) &&
                    props.addProposalValue.agencyContactNo.error && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props.addProposalValue.agencyContactNo.error}
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Stack direction="column">
                    <InputLabel
                      sx={bgcolor ? classes.labelText : classes.labelText1}
                    >
                      <Typography variant="h6">Country</Typography>
                    </InputLabel>
                    <Select
                      sx={
                        bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                      }
                      id="country"
                      name="country"
                      value={props.addProposalValue.country.value}
                      onChange={onChangeHandler}
                      renderValue={() => (
                        <Typography
                          variant="h4"
                          sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                        >
                          {props.addProposalValue.country.value ||
                            "Select Region"}
                        </Typography>
                      )}
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            "& .MuiMenuItem-root": {
                              margin: "4px 0",
                            },
                            "& .MuiMenuItem-root.Mui-selected": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              borderRadius: "40px !important",
                              color: pureWhiteColor,
                            },
                            "& .MuiMenuItem-root:hover": {
                              color: pureWhiteColor,
                              backgroundColor: bgcolor ? appColor : "#ffffff",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                          },
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 190,
                          },
                        },
                        MenuListProps: {
                          sx: {
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                            borderRadius: "34px",
                          },
                        },
                      }}
                    >
                      {props.country?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: bgcolor ? "#ffffff" : "#000000",
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {" "}
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <CustomInput
                    id="state"
                    label="State"
                    placeHolder="Enter state"
                    type="text"
                    name="state"
                    value={props.addProposalValue.state?.value}
                    onChange={onChangeHandler}
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <CustomInput
                    id="city"
                    label="City"
                    placeHolder="Enter your city"
                    type="text"
                    name="city"
                    value={props.addProposalValue.city?.value}
                    onChange={onChangeHandler}
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
                  />
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
                    customInputClasses={
                      !bgcolor
                        ? classes.inputLightStyle
                        : classes.inputDarkStyle
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={3}>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  alignContent={"center"}
                  justifyContent={"center"}
                  gap={3}
                  pb={3}
                >
                  <CustomButton
                    label="Back"
                    onClick={() => props.handleBackStep()}
                    customClasses={{ width: "110px" }}
                    buttonType={"outlined"}
                  />
                  <CustomButton
                    label={props.editState ? "Next" : "Submit"}
                    onClick={() =>
                      props.editState
                        ? props.nextStep()
                        : props.collectAddProposalData()
                    }
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
export default AgencyInformartionScreen;
