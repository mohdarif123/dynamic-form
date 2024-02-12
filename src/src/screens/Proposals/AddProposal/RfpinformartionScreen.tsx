import {
  Box,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CustomButton, CustomInput } from "global/components";
import ProposalStyles from "../Proppsals.style";
import { isTruthy } from "helpers/methods";
import urls from "global/constants/UrlConstants";
import { useLocation } from "react-router-dom";
import {
  menuPropsDarkStyle,
  menuPropsLightStyle,
  appColor,
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
import strings from "global/constants/StringConstants";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import React from "react";

interface RFPProps {
  regionType: string[];
  user: string[];
  type: string[];
  source: string[];
  setAddProposalValue: any;
  addProposalValue: any;
  domainType: string[];
  subDomain: string[];
  activeStep: any;
  nextStep: any;
  editState: any;
  handleClose?: any;
}

const RfpinformartionScreen = (props: RFPProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = ProposalStyles;

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

  const onChangeAssigneeToHandler = (e: any) => {
    const name = e.target.value.name;
    const email = e.target.value.email;
    props.setAddProposalValue({
      ...props.addProposalValue,
      [e.target.name]: {
        ...props.addProposalValue[e.target.name],
        value: name,
        error: "",
      },
      [urls.PROPOSAL_OWNER_EMAIL]: {
        ...props.addProposalValue[urls.PROPOSAL_OWNER_EMAIL],
        value: email,
        error: "",
      },
    });
  };
  const onChangeHandlerSelect = (e: any, Type: any) => {
    switch (Type) {
      case "region": {
        props.setAddProposalValue({
          ...props.addProposalValue,
          [e.target.name]: {
            ...props.addProposalValue[e.target.name],
            value: e.target?.value,
            error: "",
          },
          country: {
            value: e.target?.value === "US" ? "United States" : e.target?.value,
            error: "",
          },
          state: {
            value: "",
            error: "",
          },
          city: {
            value: "",
            error: "",
          },
          domain: {
            value: "",
            error: "",
          },
          subDomain: {
            value: "",
            error: "",
          },
        });
        break;
      }

      case "domain": {
        props.setAddProposalValue({
          ...props.addProposalValue,
          [e.target.name]: {
            ...props.addProposalValue[e.target.name],
            value: e.target?.value,
            error: "",
          },
          subDomain: {
            value: "",
            error: "",
          },
        });
        break;
      }
    }
  };
  return (
    <>
      <Box sx={{ backgroundColor: bgcolor ? appColor : "#ffffff" }}>
        <Container
          maxWidth="md"
          sx={{ backgroundColor: bgcolor ? appColor : "#ffffff" }}
        >
          <Box sx={{ backgroundColor: bgcolor ? appColor : "#ffffff" }}>
            <Box mt={{ xl: 4 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomInput
                  required
                  id="requestId"
                  disabled={props.editState}
                  label="Solicitation"
                  placeHolder="Enter solicitation"
                  type="text"
                  name="requestId"
                  propsToInputElement={{ maxLength: 50 }}
                  value={props.addProposalValue.requestId?.value}
                  onChange={onChangeHandler}
                  error={
                    !isTruthy(props?.addProposalValue?.requestId?.value) &&
                    props?.addProposalValue?.requestId?.error
                  }
                />
                {!isTruthy(props?.addProposalValue?.requestId?.value) && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {props?.addProposalValue?.requestId?.error}
                  </FormHelperText>
                )}
              </Grid>
            </Box>

            {/* Display Name input box*/}
            <Box mt={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomInput
                  label="Title"
                  required
                  disabled={props.editState}
                  id="title"
                  type="text"
                  name="title"
                  placeHolder="Enter your title"
                  propsToInputElement={{ maxLength: 100 }}
                  value={props.addProposalValue?.title?.value}
                  onChange={onChangeHandler}
                  error={
                    !isTruthy(props?.addProposalValue?.title?.value) &&
                    props?.addProposalValue?.title?.error
                  }
                />
                {!isTruthy(props?.addProposalValue?.title?.value) && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {props?.addProposalValue?.title?.error}
                  </FormHelperText>
                )}
              </Grid>
            </Box>

            <Box mt={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box gap={2} sx={classes.inputFlexStyle}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Region
                      </Typography>
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
                    </InputLabel>
                    <Select
                      id="region"
                      name="region"
                      value={props.addProposalValue.region?.value}
                      onChange={(e: any) => {
                        onChangeHandlerSelect(e, "region");
                      }}
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
                          {props.addProposalValue.region?.value ||
                            "Select region"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.region?.value?.length < 2 &&
                        props?.addProposalValue?.region?.error?.length !== 0
                      }
                    >
                      {props.regionType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.region?.value) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {props?.addProposalValue?.region?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Domain
                      </Typography>
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
                    </InputLabel>
                    <Select
                      id="domain"
                      name="domain"
                      value={props.addProposalValue.domain?.value}
                      onChange={(e: any) => onChangeHandlerSelect(e, "domain")}
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
                          {props.addProposalValue.domain?.value ||
                            "Select domain"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.domain?.value?.length < 4 &&
                        props?.addProposalValue?.domain?.error?.length !== 0
                      }
                    >
                      {props.domainType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.domain?.value) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {props?.addProposalValue?.domain?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={classes.inputFlexStyle} gap={2}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Sub Domain
                      </Typography>
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
                    </InputLabel>
                    <Select
                      id="subDomain"
                      name="subDomain"
                      value={props.addProposalValue.subDomain?.value}
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
                          {props.addProposalValue.subDomain?.value ||
                            "Select sub domain"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.subDomain?.value?.length < 4 &&
                        props?.addProposalValue?.subDomain?.error?.length !== 0
                      }
                    >
                      {props.subDomain?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.subDomain?.value) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {props?.addProposalValue?.subDomain?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Complexity Level
                      </Typography>
                    </InputLabel>
                    <Select
                      id="complexity"
                      name="complexity"
                      value={props.addProposalValue.complexity?.value}
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
                          {props.addProposalValue.complexity?.value ||
                            "Select complexity"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {["High", "Medium", "Low"]?.map(
                        (item: any, index: any) => (
                          <MenuItem
                            key={index}
                            sx={
                              !bgcolor ? meneItemLightStyle : meneItemDarkStyle
                            }
                            value={item}
                          >
                            <Typography variant="subtitle1">{item}</Typography>
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={classes.inputFlexStyle} gap={2}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Source
                      </Typography>
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
                    </InputLabel>
                    <Select
                      id="source"
                      name="source"
                      value={props.addProposalValue.source?.value}
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
                          {props.addProposalValue.source?.value ||
                            "Select source"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.source?.value?.length < 4 &&
                        props?.addProposalValue?.source?.error?.length !== 0
                      }
                    >
                      {props.source?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.source?.value) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {props?.addProposalValue?.source?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Type
                      </Typography>
                      <Box ml={0.4} sx={classes.star}>
                        *
                      </Box>
                    </InputLabel>
                    <Select
                      id="type"
                      name="type"
                      value={props.addProposalValue.type?.value}
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
                          {props.addProposalValue.type?.value || "Select type"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addProposalValue?.type?.value?.length < 3 &&
                        props?.addProposalValue?.type?.error?.length !== 0
                      }
                    >
                      {props.type?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item.name}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addProposalValue?.type?.value) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {props?.addProposalValue?.type?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={classes.inputFlexStyle} gap={2}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Assigned To
                      </Typography>
                    </InputLabel>
                    <Select
                      id="owner"
                      name="owner"
                      value={props.addProposalValue.owner?.value}
                      onChange={onChangeAssigneeToHandler}
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
                          {props.addProposalValue.owner?.value ||
                            "Select Assigned To"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {props.user?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                          value={item}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1.5 }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Competition Type
                      </Typography>
                    </InputLabel>
                    <Select
                      id="competitionType"
                      name="competitionType"
                      value={props.addProposalValue.competitionType?.value}
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
                          {props.addProposalValue.competitionType?.value ||
                            "Select competition type"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {["Open Enrollment", "Competitive", "Exclusive"]?.map(
                        (item: any, index: any) => (
                          <MenuItem
                            key={index}
                            sx={
                              !bgcolor ? meneItemLightStyle : meneItemDarkStyle
                            }
                            value={item}
                          >
                            <Typography variant="subtitle1">{item}</Typography>
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Stack>
                </Box>
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
export default React.memo(RfpinformartionScreen);
