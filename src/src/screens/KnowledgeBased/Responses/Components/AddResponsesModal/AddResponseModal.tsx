import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import AddResponsesModalStyle from "./AddResponsesModal.styles";
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
import { isTruthy, openSuccessNotification } from "helpers/methods";
import JoditEditor from "jodit-react";
import { CustomButton, CustomDialogs2, CustomInput } from "global/components";

import {
  addResponsesInitialState,
  handleAddResponsesValidation,
} from "./AddResponsesTypeAndValidation";
import {
  addResponsesApi,
  getDomainData,
  getRegionData,
  getResponseData,
  getSubDomainData,
} from "./AddResponses.services";
import notifiers from "global/constants/NotificationConstants";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
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
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { getCustomError } from "utils/customError";

interface customProps {
  openAddResponseModal: boolean;
  setOpenAddResponseModal: Function;
  getResponseTableData?: any;
}

const AddResponseModal = (props: customProps) => {
  useTitle(strings.RESPONSES);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = AddResponsesModalStyle;
  const urlParams = useLocation().search;
  const responseId = new URLSearchParams(urlParams).get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [regionType, setRegionType] = useState<any>([]);
  const [domain, setDomain] = useState([]);
  const [subDomain, setSubDomain] = useState([]);
  const [responseData, setResponseData] = useState<any>();
  const [addResponsesValue, setAddResponseValue] = useState<any>(
    addResponsesInitialState
  );

  useEffect(() => {
    if (responseId) {
      viewResponsesHandler();
    }
  }, [responseId]);

  useEffect(() => {
    getRegionsHandler();
  }, []);

  useEffect(() => {
    if (addResponsesValue.region.value) {
      getDomainHandler(addResponsesValue.region.value);
    }
  }, [addResponsesValue.region.value]);

  useEffect(() => {
    if (!responseId && addResponsesValue.domain.value) {
      getSubDomainHandler(addResponsesValue.domain.value);
    }
  }, [addResponsesValue.domain.value]);

  const handleOnchange = (event: any) => {
    setAddResponseValue({
      ...addResponsesValue,
      [event.target.name]: {
        ...addResponsesValue[event.target.name],
        value: event.target?.value,
      },
    });
  };
  const handleJoditEditorOnchange = (event: any) => {
    setAddResponseValue({
      ...addResponsesValue,
      answer: {
        ...addResponsesValue["answer"],
        value: event,
      },
    });
  };

  const viewResponsesHandler = async () => {
    try {
      setIsLoading(true);
      const [data] = await Promise.all([getResponseData(responseId)]);
      setAddResponseValue(addResponsesInitialState(data));
      setResponseData(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSubDomainHandler = async (domainValue: string) => {
    try {
      setIsLoading(true);
      const [subDomainData] = await Promise.all([
        getSubDomainData(domainValue),
      ]);
      setSubDomain(subDomainData);
      if (!responseId) {
        setAddResponseValue({
          ...addResponsesValue,
          subDomain: {
            value: subDomainData[0]?.name,
            error: "",
          },
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getDomainHandler = async (regionValue: string) => {
    try {
      setIsLoading(true);
      const [domainData] = await Promise.all([getDomainData(regionValue)]);
      setDomain(domainData);
      if (!responseId) {
        setAddResponseValue({
          ...addResponsesValue,
          domain: {
            value: domainData[0]?.name,
            error: "",
          },
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getRegionsHandler = async () => {
    try {
      setIsLoading(true);
      const [region] = await Promise.all([getRegionData()]);
      setRegionType(region);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleValidation = () => {
    const { isValid, errors } = handleAddResponsesValidation(addResponsesValue);
    setAddResponseValue({ ...errors });
    return isValid;
  };

  const handleSubmit = async () => {
    const addResponsesPayload = {
      id: 0,
      parentId: 0,
      order: 1,
      region: addResponsesValue.region.value,
      domain: addResponsesValue.domain.value,
      subDomain: addResponsesValue.subDomain.value,
      question: addResponsesValue.question.value,
      answer: addResponsesValue.answer.value,
      number: "",
      proposals: [],
      audit: {
        fromZ: new Date(),
        thruZ: new Date(),
        createdBy: "",
        updatedBy: "",
      },
      status: "",
      count: 0,
    };

    const editResponsesPayload = {
      id: responseData?.id,
      parentId: responseData?.parentId,
      order: responseData?.order,
      region: addResponsesValue.region.value,
      domain: addResponsesValue.domain.value,
      subDomain: addResponsesValue.subDomain.value,
      question: addResponsesValue.question.value,
      answer: addResponsesValue.answer.value,
      number: responseData?.number,
      proposals: [],
      audit: {
        updatedOn: responseData?.updatedOn,
        thruZ: responseData?.thruZ,
        createdBy: responseData?.createdBy,
        updatedBy: "",
        createdOn: "",
      },
      status: responseData?.status,
      count: responseData?.count,
    };

    if (handleValidation()) {
      try {
        if (responseId) {
          setIsLoading(true);
          await addResponsesApi(editResponsesPayload);
          openSuccessNotification("Response updated successfully");
          props.setOpenAddResponseModal!(false);
          props.getResponseTableData();
          setIsLoading(false);
        } else {
          setIsLoading(true);
          await addResponsesApi(addResponsesPayload);
          openSuccessNotification("Response added successfully");
          handleClose();
          props.getResponseTableData();
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    }
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Box mt={2} mb={2}>
          <Box sx={classes.buttonWrapper} gap={3}>
            <CustomButton
              label={strings.CANCEL}
              onClick={handleClose}
              customClasses={{
                width: "110px",
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
              }}
              buttonType={"contained"}
            />
          </Box>
        </Box>
      </>
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
              <Stack direction="column" style={{ width: "100%" }}>
                <InputLabel sx={classes.nameField}>
                  <Typography
                    variant="h6"
                    sx={classes.inputLabel}
                    style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
                  >
                    Region
                  </Typography>
                  <Box component={"span"} sx={classes.CustomRequired}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  id="region"
                  name="region"
                  value={addResponsesValue.region.value}
                  displayEmpty
                  onChange={handleOnchange}
                  sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue.region.value || "Select region"}
                    </Typography>
                  )}
                  error={
                    !isTruthy(addResponsesValue.region.value) &&
                    addResponsesValue.region.error
                  }
                  disabled={responseData ? true : false}
                >
                  {regionType.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                {!isTruthy(addResponsesValue.region.value) &&
                  addResponsesValue.region.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {addResponsesValue.region.error}
                    </FormHelperText>
                  )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Stack direction="column" style={{ width: "100%" }}>
                <InputLabel sx={classes.nameField}>
                  <Typography
                    variant="h6"
                    sx={classes.inputLabel}
                    style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
                  >
                    Domain
                  </Typography>
                  <Box component={"span"} sx={classes.CustomRequired}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  id="domain"
                  name="domain"
                  value={addResponsesValue.domain.value}
                  displayEmpty
                  onChange={handleOnchange}
                  sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue?.domain?.value || "Select domain"}
                    </Typography>
                  )}
                  error={
                    !isTruthy(addResponsesValue.domain.value) &&
                    addResponsesValue.domain.error
                  }
                  disabled={responseData ? true : false}
                >
                  {domain.map((item: any, index: any) => (
                    <MenuItem
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                      key={index}
                      value={item.name}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                {!isTruthy(addResponsesValue.domain.value) &&
                  addResponsesValue.domain.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {addResponsesValue.domain.error}
                    </FormHelperText>
                  )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <Stack direction="column" style={{ width: "100%" }}>
                <InputLabel sx={classes.nameField}>
                  <Typography
                    variant="h6"
                    sx={classes.inputLabel}
                    style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
                  >
                    Sub Domain
                  </Typography>
                  <Box component={"span"} sx={classes.CustomRequired}>
                    *
                  </Box>
                </InputLabel>
                <Select
                  id="subDomain"
                  name="subDomain"
                  value={addResponsesValue.subDomain.value}
                  onChange={handleOnchange}
                  sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue?.subDomain?.value ||
                        "Select Subdomain"}
                    </Typography>
                  )}
                  displayEmpty
                  error={
                    !isTruthy(addResponsesValue.subDomain.value) &&
                    addResponsesValue.subDomain.error
                  }
                  disabled={responseData ? true : false}
                >
                  {subDomain.map((item: any, index: any) => (
                    <MenuItem
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {!isTruthy(addResponsesValue.subDomain.value) &&
                  addResponsesValue.subDomain.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {addResponsesValue.subDomain.error}
                    </FormHelperText>
                  )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              <CustomInput
                required
                id="question"
                label="Question"
                placeHolder="Write question!"
                type="text"
                name="question"
                disabled={responseData ? true : false}
                value={addResponsesValue.question.value}
                onChange={handleOnchange}
                error={
                  !isTruthy(addResponsesValue.question.value) &&
                  addResponsesValue.question.error
                }
              />
              {!isTruthy(addResponsesValue.question.value) &&
                addResponsesValue.question.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {addResponsesValue.question.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box>
              <Stack direction="column" style={{ width: "100%" }}>
                <Box display={"flex"}>
                  <Typography
                    variant="h6"
                    sx={classes.inputLabel}
                    style={{ color: !bgcolor ? "#383A51" : pureWhiteColor }}
                  >
                    Answer
                  </Typography>
                  <Box sx={classes.star}>*</Box>
                </Box>
                <JoditEditor
                  value={addResponsesValue.answer.value}
                  onChange={handleJoditEditorOnchange}
                />
                {!isTruthy(addResponsesValue.answer.value) &&
                  addResponsesValue.answer.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {addResponsesValue.answer.error}
                    </FormHelperText>
                  )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  const addUserHeaderContent = () => {
    return (
      <Typography variant="h2" sx={{ color: "white" }}>
        Add Response
      </Typography>
    );
  };

  const handleClose = () => {
    props.setOpenAddResponseModal!(false);
    setAddResponseValue(addResponsesInitialState());
  };
  return (
    <>
      <CustomDialogs2
        isDialogOpen={props.openAddResponseModal}
        closeButtonVisibility
        closable
        dialogHeaderContent={addUserHeaderContent()}
        dialogBodyContent={dialogBodyContent()}
        dialogFooterContent={dialogFooterContent()}
        handleDialogClose={handleClose}
        width={"1000px"}
        borderRadius="33px"
      />
      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default AddResponseModal;
