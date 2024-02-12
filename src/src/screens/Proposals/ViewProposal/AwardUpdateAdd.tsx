import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ViewProposalStyles from "./ViewProposal.styles";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import dropZoneDropZone from "assets/icons/DownlaodsIcon.svg";
import { CustomButton, CustomDialog, CustomInput } from "global/components";
import React, { useEffect, useState } from "react";
import { AwardValidation, initalField } from "./AwardUpdateTabTypes";
import strings from "global/constants/StringConstants";
import { getReason, proposalUpdate, upload } from "../Proposals.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  addDocumentService,
  getAddProposalCountries,
  getState,
} from "../AddProposal/AddProposal.service";
import notifiers from "global/constants/NotificationConstants";
import {
  menuPropsDarkStyle,
  menuPropsLightStyle,
  dropDownDarkForSx,
  dropDownLightForSx,
  inputBoxDark,
  inputBoxLight,
  meneItemDarkStyle,
  meneItemLightStyle,
  primaryBlackColor,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
  errorStyling,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useLocation } from "react-router";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import { getCustomError } from "utils/customError";

interface CustomProps {
  data: any;
  setOpenModalAward?: any;
  openModalAward?: any;
  proposalId?: any;
  viewTabData?: any;
  viewProposalHandler?: any;
  setEvaluationTableData?: any;
  viewEvaluationTable?: any;
}
const AwradUpdateAdd = (props: CustomProps) => {
  const classes = ViewProposalStyles;
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const urlParams = useLocation().search;
  const [reason, setReason] = useState([]);
  const proposalId = new URLSearchParams(urlParams).get("id");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const bgcolor = useAppSelector(selectBackgroundColor);

  const [state, seState] = useState([]);
  const [formField, setFormField] = useState<any>(initalField(props?.data));
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    setFormField(initalField(props?.data));
  }, [props.data]);

  useEffect(() => {
    fetchCountry();
    getReasonData();
  }, []);

  useEffect(() => {
    if (formField.country?.value) {
      fetchState();
    }
  }, [formField.country?.value]);
  const handleChangeInputType = (e: any) => {
    setFormField({
      ...formField,
      [e.target.name]: {
        ...formField[e.target.name],
        value: e.target.value,
        error: "",
      },
    });
  };

  const source = [
    { name: "Email", field: "Email" },
    { name: "Debrief", field: "Debrief" },
    { name: "Bid Tabulation", field: "Bid Tabulation" },
    { name: "Other", field: "Other" },
  ];
  const handleChangeInputTypeCountry = (e: any) => {
    setFormField({
      ...formField,
      [e.target.name]: {
        ...formField[e.target.name],
        value: e.target.value,
        error: "",
      },
      state: {
        value: "",
      },
    });
  };
  const dialogContent = () => {
    return (
      <>
        <Grid
          container
          style={{
            background: !bgcolor ? pureWhiteColor : "#282844",
          }}
        >
          <Box sx={classes.dialogFooter}>
            <CustomButton
              label="Cancel"
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
              onClick={() => handleCloseModel()}
            />
            <CustomButton
              label="Save"
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
              onClick={() => addCompetitveHandler()}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const handlevalidation = () => {
    const { isValid, errors }: any = AwardValidation(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const uploadDoccumentFileHandler = async (event: any) => {
    try {
      setLoading(true);
      const fileData = event[0];
      const data = new FormData();
      const fileImagePath = fileData?.file;
      data.append("file", fileImagePath);
      const response = await upload(proposalId, data);
      setUploadDocumentObject({
        ...uploadDocumentObject,
        res: response,
        name: fileData?.file?.name,
      });
      setFormField({
        ...formField,
        path: { value: response.path },
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const getReasonData = async () => {
    try {
      setLoading(true);
      const reason = await getReason();
      setReason(reason);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const addCompetitveHandler = async () => {
    if (handlevalidation()) {
      try {
        const data = {
          proposalEvaluation: {
            title: formField.title.value,
            reason: formField.reason.value,
            contractDetailsUrl: formField.contractDetailsUrl.value,
            price: formField.price.value,
            agency: {
              name: formField.agencyName?.value,
              webSite: formField.agencyWebsite?.value,
              address: {
                line1: formField.address?.value,
                city: formField.city?.value,
                state: formField.state?.value,
                country: formField.country?.value,
                pinCode: formField.pinCode?.value,
              },
            },
            comments: [
              {
                text: formField.comment?.value,
              },
            ],
          },
        };

        setLoading(true);
        await proposalUpdate(data.proposalEvaluation, props.data?.id);
        const doc = {
          audit: {
            fromZ: new Date(),
            thruZ: new Date(),
            createdBy: "",
            updatedBy: "",
          },
          comment: "",
          content: "",
          expiryDate: "",
          fileName: uploadDocumentObject.name,
          id: "",
          interval: 0,
          issueDate: "",
          metaData: [],
          ownerId: props.data.id,
          path: uploadDocumentObject?.res?.path,
          status: "Active",
          title: uploadDocumentObject.name,
          type: formField.source.value,
        };
        if (uploadDocumentObject?.res?.path) {
          await addDocumentService(doc);
        }
        props.viewEvaluationTable();
        openSuccessNotification(
          props?.data?.proposalEvaluation
            ? "RFP evaluation has been updated successfully"
            : "RFP evaluation has been added successfully"
        );
        props.viewTabData();
        props.viewProposalHandler();
        props.setEvaluationTableData();
        setFormField({
          ...formField,
          path: { value: "" },
        });
        handleCloseModel();
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        getCustomError(error);
      }
    }
  };
  const fetchCountry = async () => {
    try {
      setLoading(true);
      const [res] = await Promise.all([getAddProposalCountries()]);
      setCountry(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const fetchState = async () => {
    try {
      setLoading(true);
      const res = await getState(formField.country?.value);
      seState(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleCloseModel = () => {
    props.setOpenModalAward(false);
    setUploadDocumentObject({});
    setFormField({
      ...formField,
      source: {
        value: "",
        error: "",
      },
      path: {
        value: "",
        error: "",
      },
      fileName: {
        value: "",
        error: "",
      },
    });
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Box sx={classes.dialogTitleWrapper}>
          <Typography sx={classes.titleRight} variant="h2">
            Evaluation
          </Typography>
        </Box>
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
            backgroundColor: bgcolor ? "#373854" : "#fff",
            margin: "5px",
            borderRadius: "20px",
          }}
        >
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{ marginLeft: 3, marginRight: 3 }}
            mt={2}
          >
            <Box>
              <CustomInput
                required
                disabled
                label="Title"
                onChange={handleChangeInputType}
                name="title"
                id="title"
                value={formField.title.value}
                error={
                  !isTruthy(formField.title.value) && formField.title?.error
                }
              />
              {!isTruthy(formField.title.value) && formField.title?.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.title?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography
              sx={{
                color: pureWhiteColor,
                marginLeft: "22px",
                fontWeight: 600,
                fontSize: "26px",
                lineHeight: "20px",
              }}
              m={3}
              style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
              variant="h4"
            >
              Contract Information
            </Typography>
          </Grid>
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{ marginLeft: 3, marginRight: 3 }}
          >
            <Box>
              <CustomInput
                label="Contract Detail Url"
                onChange={handleChangeInputType}
                name="contractDetailsUrl"
                id="contractDetailsUrl"
                value={formField.contractDetailsUrl.value}
                propsToInputElement={{ maxLength: 500 }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{ marginLeft: 3, marginTop: 2, marginRight: 3 }}
          >
            <Box>
              <CustomInput
                label="Contract Price"
                onChange={handleChangeInputType}
                name="price"
                id="price"
                type="number"
                value={formField.price.value}
              />
              {formField.price.value < 0 && formField.price?.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.price?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              marginLeft: 3,
              marginBottom: 3,
              marginTop: 2,
              marginRight: 3,
            }}
          >
            <Box>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={classes.inputLable}>
                  <Typography
                    sx={bgcolor ? classes.label : classes.label1}
                    variant="h6"
                  >
                    Comment{" "}
                  </Typography>
                  <Typography sx={classes.star}>*</Typography>
                </Box>
                <TextField
                  multiline
                  minRows={3}
                  sx={!bgcolor ? inputBoxLight : inputBoxDark}
                  name="comment"
                  id="comment"
                  placeholder="Enter your comment"
                  value={formField.comment.value}
                  onChange={handleChangeInputType}
                />
                {!isTruthy(formField.comment.value) &&
                  formField.comment?.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {formField.comment?.error}
                    </FormHelperText>
                  )}
              </Grid>
            </Box>
            {/* <Box>
              <CustomInput
                label="Comment"
                onChange={handleChangeInputType}
                name="comment"
                value={formField.comment.value}
                customInputClasses={{
                  border: bgcolor ? "" : "1px solid #C1C1C1",
                  background: bgcolor ? "#282945" : "#ffffff",
                  "& .MuiInputBase-input": {
                    color: bgcolor ? "#CBCBCB" : "#000000",
                  },
                }}
              />
            </Box> */}
          </Grid>
        </Grid>
      </>
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
            backgroundColor: bgcolor ? "#373854" : "#ffffff",
            margin: "5px",
            borderRadius: "20px",
          }}
        >
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{ marginLeft: 3, marginRight: 3 }}
            mt={2}
          >
            <Stack direction="column">
              <InputLabel
                sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
              >
                <Typography variant="h6">Reason</Typography>
                <Box sx={classes.star}>*</Box>
              </InputLabel>
              <Select
                id="reason"
                name="reason"
                value={formField.reason.value}
                onChange={handleChangeInputTypeCountry}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography
                    sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                    variant="h4"
                  >
                    {formField.reason.value || "Select reason"}
                  </Typography>
                )}
                displayEmpty
                error={
                  !isTruthy(formField.reason.value) && formField.reason?.error
                }
              >
                {reason?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item.name}
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(formField.reason.value) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.reason?.error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{ marginLeft: 3, marginTop: 2, marginRight: 3 }}
          >
            <Stack direction="column">
              <InputLabel
                sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
              >
                <Typography variant="h6">Source</Typography>
              </InputLabel>
              <Select
                id="source"
                name="source"
                value={formField.source.value}
                onChange={handleChangeInputTypeCountry}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography
                    sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                    variant="h4"
                  >
                    {formField.source.value || "Select source"}
                  </Typography>
                )}
                displayEmpty
                error={
                  !isTruthy(formField.source.value) && formField.source?.error
                }
              >
                {source?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item.name}
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(formField.source.value) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.source?.error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              marginLeft: 3,
              marginTop: 2,
              marginBottom: 3,
              marginRight: 3,
            }}
          >
            <Box sx={classes.formInput}>
              <Box sx={classes.inputLable}>
                <Typography
                  variant="h6"
                  sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                >
                  Upload File
                </Typography>
              </Box>
              <CustomDropzone
                acceptedFileTypes={[
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
                dropzoneIcon={dropZoneDropZone}
                maxFileSize={10485760}
                index={0}
                dropzoneIconStyle={true}
                iconWrapperStyle={classes.dropzoneIconStyle}
                dropzoneCustomClasses={{
                  background: bgcolor ? "#282945" : "#E6E7FF",
                  border: !bgcolor ? "1px solid #C1C1C1" : "none",
                  display: "flex",
                }}
                onAdd={uploadDoccumentFileHandler}
                uploadedFileName={uploadDocumentObject?.name}
              />
              {!isTruthy(formField.path.value) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.path.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  const awardUpdateAddData = () => {
    return (
      <>
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}
        >
          {rfpInformation()}
          {agencyInformation()}
        </Grid>

        <CustomLoader isLoading={loading} />
      </>
    );
  };

  return (
    <>
      <CustomDialog
        dialogHeaderContent={dialogTitleContent()}
        isDialogOpen={props.openModalAward}
        closable
        closeButtonVisibility
        handleDialogClose={handleCloseModel}
        dialogBodyContent={awardUpdateAddData()}
        dialogFooterContent={dialogContent()}
        width="1200px"
        borderRadius="33px"
        cancelIconColor
        hideBgColor
        dialogFooterClass
      />
    </>
  );
};
export default React.memo(AwradUpdateAdd);
