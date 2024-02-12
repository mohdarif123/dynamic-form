import React from "react";
import {
  Box,
  Container,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import ProposalStyles from "../Proppsals.style";
import moment from "moment-timezone";
import { isTruthy } from "helpers/methods";
import { makeStyles } from "@material-ui/core/styles";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import strings from "global/constants/StringConstants";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

interface ContractProps {
  setAddProposalValue: any;
  addProposalValue: any;
  contractType: string[];
  submissionType: string[];
  nextStep: any;
  handleBackStep: any;
  editState: any;
  action: any;
  status: any;
  handleClose?: any;
  rfpCloneTableRowData?: any;
}
const useStyles = makeStyles({
  iconColor: {
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter:
        "invert(24%) sepia(47%) saturate(7299%) hue-rotate(237deg) brightness(97%) contrast(73.5%)", // Change the color using CSS filter
      color: "#7A81FD",
      fontSize: "20px",
    },
  },
});

const ContactInfromationScreen = (props: ContractProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = ProposalStyles;
  const classes1 = useStyles();
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const onChangeHandler = (e: any) => {
    props.setAddProposalValue({
      ...props.addProposalValue,
      [e.target.name]: {
        ...props.addProposalValue[e.target.name],
        value: e.target?.value,
      },
    });
  };

  const handleOnChangeInputFieldNumberType = (event: any) => {
    const inputValue = event.target.value;
    const regexPattern = /^[0-9]{0,14}$/;
    const regexPattern1 = /^\d*\.?\d*$/;
    const isValidInput =
      regexPattern1.test(inputValue) && regexPattern.test(inputValue);
    if (isValidInput) {
      props.setAddProposalValue({
        ...props.addProposalValue,
        [event.target.name]: {
          ...props.addProposalValue[event.target.name],
          value: inputValue,
        },
      });
    }
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
          <Box mt={4}>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Stack direction="column">
                    <Box sx={classes.labelcontact}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Contract Type
                      </Typography>
                      <Typography sx={classes.star}>*</Typography>
                    </Box>
                    <Select
                      id="contractType"
                      name="contractType"
                      readOnly={props.editState}
                      value={props.addProposalValue.contractType?.value}
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
                          {props.addProposalValue.contractType?.value ||
                            "Select Contract Type"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.contractType?.value?.length <
                          2 &&
                        props?.addProposalValue?.contractType?.error?.length !==
                          0
                      }
                    >
                      {props.contractType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item?.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(
                      props?.addProposalValue?.contractType?.value
                    ) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addProposalValue?.contractType?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Stack direction="column">
                    <Box sx={classes.labelcontact}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Submission Type
                      </Typography>
                      <Typography sx={classes.star}>*</Typography>
                    </Box>
                    <Select
                      id="submissionType"
                      name="submissionType"
                      value={props.addProposalValue.submissionType.value}
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
                          {props.addProposalValue.submissionType.value ||
                            "Select Submission Type"}
                        </Typography>
                      )}
                      error={
                        props?.addProposalValue?.submissionType?.value?.length <
                          2 &&
                        props?.addProposalValue?.submissionType?.error
                          ?.length !== 0
                      }
                      displayEmpty
                    >
                      {props.submissionType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {" "}
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(
                      props?.addProposalValue?.submissionType?.value
                    ) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addProposalValue?.submissionType?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CustomInput
                    id="contractDetailsUrl"
                    label="Contract Detail Url"
                    placeHolder="Enter your contract detail url"
                    type="text"
                    name="contractDetailsUrl"
                    value={props.addProposalValue.contractDetailsUrl?.value}
                    propsToInputElement={{ maxLength: 500 }}
                    onChange={onChangeHandler}
                  />
                </Grid>
                {(props.editState || props.rfpCloneTableRowData) && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Stack direction="column">
                        <Typography
                          variant="h6"
                          sx={
                            bgcolor ? classes.inputLabel : classes.inputLabel1
                          }
                        >
                          Status
                        </Typography>

                        <Select
                          id="status"
                          name="status"
                          value={props.addProposalValue.status?.value}
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
                              {props.addProposalValue.status?.value ||
                                "Select Status Type"}
                            </Typography>
                          )}
                          error={
                            props?.addProposalValue?.status?.value?.length <
                              2 &&
                            props?.addProposalValue?.status?.error?.length !== 0
                          }
                        >
                          {props.status?.map((item: any, index: any) => (
                            <MenuItem
                              key={index}
                              sx={
                                !bgcolor
                                  ? meneItemLightStyle
                                  : meneItemDarkStyle
                              }
                              value={item?.name}
                            >
                              <Typography variant="subtitle1">
                                {item.name}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                        {!isTruthy(props?.addProposalValue?.status?.value) && (
                          <FormHelperText error sx={{...errorStyling}}>
                            {props?.addProposalValue?.status?.error}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Stack direction="column">
                        <Typography
                          variant="h6"
                          sx={
                            bgcolor ? classes.inputLabel : classes.inputLabel1
                          }
                        >
                          Bid Decision
                        </Typography>
                        <Select
                          id="bidDecision"
                          name="bidDecision"
                          value={props.addProposalValue.bidDecision.value}
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
                              {props.addProposalValue.bidDecision.value ||
                                "Select Submission Type"}
                            </Typography>
                          )}
                          error={
                            props?.addProposalValue?.bidDecision?.value
                              ?.length < 2 &&
                            props?.addProposalValue?.bidDecision?.error
                              ?.length !== 0
                          }
                          displayEmpty
                        >
                          {props.action?.map((item: any, index: any) => (
                            <MenuItem
                              key={index}
                              sx={
                                !bgcolor
                                  ? meneItemLightStyle
                                  : meneItemDarkStyle
                              }
                              value={item.name}
                            >
                              <Typography variant="subtitle1">
                                {item.name}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                        {!isTruthy(
                          props?.addProposalValue?.bidDecision?.value
                        ) && (
                          <FormHelperText error sx={{...errorStyling}}>
                            {props?.addProposalValue?.bidDecision?.error}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    type="date"
                    required
                    id="dueDate"
                    name="dueDate"
                    label="Due Date"
                    propsToInputElement={{
                      min: moment().format("YYYY-MM-DD"),
                    }}
                    value={props?.addProposalValue?.dueDate?.value}
                    onChange={onChangeHandler}
                    error={
                      !isTruthy(props.addProposalValue.dueDate?.value) &&
                      props.addProposalValue.dueDate?.error
                    }
                    customInputClasses={{
                      '& input[type="date"]::-webkit-calendar-picker-indicator':
                        {
                          filter:
                            "invert(24%) sepia(47%) saturate(7299%) hue-rotate(237deg) brightness(97%) contrast(73.5%)", // Change the color using CSS filter
                          color: "#7A81FD",
                          fontSize: "20px",
                        },
                    }}
                  />
                  {!isTruthy(props.addProposalValue.dueDate?.value) && (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props.addProposalValue.dueDate?.error}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomInput
                    type="number"
                    label="Contract Price"
                    placeHolder="Enter Contract Price"
                    id="contractPrice"
                    name="contractPrice"
                    value={props.addProposalValue.contractPrice?.value}
                    onChange={handleOnChangeInputFieldNumberType}
                    InputProps={{ inputMode: "number", min: 0, max: 10 }}
                    error={
                      !isTruthy(
                        props.addProposalValue.contractPrice?.value < 0
                      ) && props.addProposalValue.contractPrice?.error
                    }
                  />
                  {isTruthy(
                    props.addProposalValue.contractPrice?.value < 0
                  ) && (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props.addProposalValue.contractPrice?.error}
                    </FormHelperText>
                  )}
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
                    label="Next"
                    onClick={() => props.nextStep()}
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
export default React.memo(ContactInfromationScreen);
