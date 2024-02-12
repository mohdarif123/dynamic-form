import React, { useEffect, useState } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  Stack,
  FormHelperText,
} from "@mui/material";
import AddResponsesStyle from "./AddResponses.styles";
import strings from "global/constants/StringConstants";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import JoditEditor, { Jodit } from "jodit-react";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "helpers/methods";
import {
  addResponsesApi,
  getDomainData,
  getRegionData,
  getResponseData,
  getSubDomainData,
} from "./AddResponses.services";
import {
  addResponsesInitialState,
  handleAddResponsesValidation,
} from "./AddResponsesTypeAndValidation";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useTitle } from "utils/UseTitle";
import { useLocation } from "react-router";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import 'jodit/build/jodit.min.css';
import { getCustomError } from "utils/customError";

interface customProps {
  location?: any;
}
const AddResponses = (props: customProps) => {
  useTitle(strings.RESPONSES);
  const classes = AddResponsesStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
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
  }, []);

  useEffect(() => {
    getRegionsHandler();
  }, []);

  useEffect(() => {
    if (!responseId) {
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

  const arrowBackHandler = () => {
    history.push({
      pathname: urls.RESPONSE_VIEW_PATH,
      state: {
        prevPageNumber: props?.location?.state?.paginationNumber,
      },
    });
  };

  const addUserHeaderContent = () => {
    return (
      <>
        <Box onClick={arrowBackHandler} sx={{ cursor: "pointer" }}>
          <CustomIcon
            icon={
              <ArrowBackIcon sx={{ color: bgcolor ? "#ffffff" : "#000000" }} />
            }
          />
        </Box>
        <Typography
          variant="h2"
          sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
        >
          {responseId ? "Edit" : "Add"} Content
        </Typography>
      </>
    );
  };


  const handleJodItEditorOnchange = (event: any) => {
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
          openSuccessNotification("Content has been updated successfully");
          history.push(urls.RESPONSE_VIEW_PATH);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          await addResponsesApi(addResponsesPayload);
          openSuccessNotification("Content has been added successfully");
          history.push(urls.RESPONSE_VIEW_PATH);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    }
  };
  const dialogBodyContent = () => {
    return (
      <>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
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
                  sx={
                    !bgcolor
                      ? classes.selectStyleLight
                      : classes.selectStyleDark
                  }
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                                    id="region"
                  name="region"
                  value={addResponsesValue.region.value}
                  displayEmpty
                  onChange={handleOnchange}
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue.region.value}
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
                  sx={
                    !bgcolor
                      ? classes.selectStyleLight
                      : classes.selectStyleDark
                  }
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="domain"
                  name="domain"
                  value={addResponsesValue.domain.value}
                  displayEmpty
                  onChange={handleOnchange}
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue?.domain?.value
                        ? addResponsesValue?.domain?.value
                        : "Select domain"}
                    </Typography>
                  )}
                  error={
                    !isTruthy(addResponsesValue.domain.value) &&
                    addResponsesValue.domain.error
                  }
                  disabled={responseData}
                >
                  {domain.map((item: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
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
                  sx={
                    !bgcolor
                      ? classes.selectStyleLight
                      : classes.selectStyleDark
                  }
                  style={!bgcolor ? selectBgLight : selectBgDark}
                  MenuProps={
                    !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                  }
                  id="subDomain"
                  name="subDomain"
                  value={addResponsesValue.subDomain.value}
                  onChange={handleOnchange}
                  renderValue={() => (
                    <Typography
                      sx={
                        !bgcolor ? renderValueLightStyle : renderValueDarkStyle
                      }
                      variant="h4"
                    >
                      {addResponsesValue?.subDomain?.value
                        ? addResponsesValue?.subDomain?.value
                        : "Select sub domain"}
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
                      key={index}
                      value={item.name}
                      sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
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
                placeHolder="Enter your question!"
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
          <Grid item xs={12}>
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
                  onChange={handleJodItEditorOnchange}
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
          <Box mt={3} width={"100%"} justifyContent={"center"} mb={3}>
            <Box sx={classes.buttonWrapper} gap={3}>
              <CustomButton
                label={strings.CANCEL}
                onClick={arrowBackHandler}
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
          </Box>
        </Grid>
      </>
    );
  };

  const getAddResponses = () => {
    return (
      <>
        <Box mt={11} ml={3} mr={3}>
          {addUserHeaderContent()}
          {dialogBodyContent()}
          <CustomLoader isLoading={isLoading} />
        </Box>
      </>
    );
  };

  return getAddResponses();
};

export default AddResponses;
