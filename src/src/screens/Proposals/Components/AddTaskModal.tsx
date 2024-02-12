/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { CustomButton, CustomDialog, CustomInput } from "global/components";
import ProposalStyles from "../Proppsals.style";
import { Box } from "@mui/system";
import {
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteImg from "assets/images/userUpdateImg.svg";
import dropZoneDropZone from "assets/icons/DownlaodsIcon.svg";
import { upload } from "../Proposals.service";
import { useLocation } from "react-router";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  addDocumentService,
  getAddProposalUserPage,
} from "../AddProposal/AddProposal.service";
import { addTaskViewProposal } from "../Proposals.service";
import _ from "lodash";
import { UserTask } from "../AddProposal/AddProposal.model";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  addTaskInitailState,
  handleAddTaskValidation,
} from "./ModalDataAndValidation";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  lightDropDownColor,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryBlackColor,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgLight,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import urls from "global/constants/UrlConstants";
import { getCustomError } from "utils/customError";
interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  handlerSave: any;
  viewProposalData: any;
  viewProposalHandler?: any;
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
const AddTaskModal = (props: customProps) => {
  const classes = ProposalStyles;
  const classes1 = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const [owner, setOwner] = useState([]);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 4;
  const urlParams = useLocation().search;
  const proposalId = new URLSearchParams(urlParams).get("id");
  const [formField, setFormField] = useState<any>(addTaskInitailState());
  const payloadAddtask = new UserTask();
  const [assigneId, setAssigneId] = useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);

  useEffect(() => {
    fetchOwnerDetail();
  }, []);

  const handleValidation = () => {
    const { isValid, errors } = handleAddTaskValidation(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const handleDeleteDropzoneChip = () => {
    setUploadDocumentObject({});
  };

  const addTaskHandler = async () => {
    try {
      if (handleValidation()) {
        const comment: any[] = [];
        const data: any[] = [];
        data.push(
          {
            name: "RFP Title",
            value: props?.viewProposalData?.title,
          },
          {
            name: "RFP Due Date",
            value: props?.viewProposalData.dueDate,
          },
          {
            name: "Agency Name",
            value: props?.viewProposalData?.agency?.name,
          }
        );
        comment.push({ text: formField.comment.value });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (payloadAddtask.name = formField.title?.value),
          (payloadAddtask.description = formField.description?.value),
          (payloadAddtask.assigneeName = formField.assign?.value),
          (payloadAddtask.dueDate = moment(formField.dueDate?.value).format(
            "MM/DD/YYYY"
          )),
          (payloadAddtask.comments = comment),
          (payloadAddtask.businessKey = proposalId!),
          (payloadAddtask.data = data),
          (payloadAddtask.formUrl = `${window.location.origin}${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${proposalId}`),
          (payloadAddtask.url = `${window.location.origin}/tasks`),
          payloadAddtask.docUrls.push(
            `${window.location.origin}${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${proposalId}`
          ),
          (payloadAddtask.assigneeId = assigneId);
        await addTaskViewProposal(payloadAddtask);
        await props.viewProposalHandler();
        if (Object.keys(uploadDocumentObject).length > 1) {
          await addDocument();
        }
        setFormField(addTaskInitailState());
        setUploadDocumentObject({});
        openSuccessNotification("Task added successfully");
        props.setOpenModal(false);
      }
    } catch (error: any) {
      setFormField(addTaskInitailState());
      setUploadDocumentObject({});
      props.setOpenModal(false);
      getCustomError(error);
    }
  };
  const addDocument = async () => {
    try {
      setLoading(true);
      const body = {
        audit: {
          fromZ: new Date(),
          thruZ: new Date(),
          createdBy: "",
          updatedBy: "",
        },
        comment: "",
        content: "",
        expiryDate: "12/31/9999",
        fileName: uploadDocumentObject?.name,
        id: 0,
        issueDate: "",
        metaData: [],
        ownerId: proposalId,
        path: uploadDocumentObject?.res?.path,
        status: "Active",
        title: uploadDocumentObject?.name,
        type: "Project Info",
      };
      await addDocumentService(body);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const fetchOwnerDetail = async () => {
    try {
      setLoading(true);
      const res = await getAddProposalUserPage();
      setOwner(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleCloseModel = () => {
    props.setOpenModal(false);
    setFormField(addTaskInitailState());
    setUploadDocumentObject({});
  };
  const dialogHeaderContent = () => {
    return (
      <Box display={"flex"}>
        <img src={DeleteImg} alt="delete Image" />
      </Box>
    );
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Box sx={classes.dialogTitleWrapper}>
          <Typography sx={classes.titleRight} variant="h2">
            Add Task
          </Typography>
        </Box>
      </>
    );
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
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleChange = (e: any) => {
    const value = owner?.find((item: any) => {
      if (item.name === e.target.value) {
        setAssigneId(item?.email);
      }
    });

    setFormField({
      ...formField,
      [e.target.name]: {
        ...formField[e.target.name],
        value: e.target.value,
        error: "",
      },
    });
  };
  const dialogBody = () => {
    return (
      <>
        <Grid
          container
          xl={12}
          lg={12}
          mt={2}
          gap={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xl={11} xs={11} lg={11} md={11} sm={11}>
            <CustomInput
              label="Title"
              propsToInputElement={{ maxLength: 49 }}
              placeHolder="Enter title"
              required
              onChange={handleChange}
              name="title"
              id="title"
              value={formField.title.value}
              error={!isTruthy(formField.title.value) && formField.title.error}
              customInputClasses={
                !bgcolor ? classes.textFieldLight : classes.textFieldDark
              }
            />
            {!isTruthy(formField.title.value) && formField.title.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {formField.title.error}
              </FormHelperText>
            )}
          </Grid>
          <Grid container xl={5.5} lg={5.5} md={11} sm={11} xs={11} gap={1}>
            <Grid item xl={5.8} lg={5.8} md={5.9} sm={5.8} xs={12}>
              <CustomInput
                label="Due Date"
                type="date"
                id="dueDate"
                name="dueDate"
                dateIconColor={classes1.iconColor}
                required
                propsToInputElement={{
                  min: moment().format("YYYY-MM-DD"),
                }}
                onChange={handleChange}
                value={formField.dueDate.value}
                error={
                  !isTruthy(formField.dueDate.value) && formField.dueDate.error
                }
                customInputClasses={
                  !bgcolor ? classes.textFieldLight : classes.textFieldDark
                }
              />
              {!isTruthy(formField.dueDate.value) &&
                formField.dueDate.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formField.dueDate.error}
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xl={5.8} lg={5.8} md={5.9} sm={5.8} xs={12}>
              <InputLabel sx={classes.inputLabel}>
                <Typography
                  variant="h6"
                  sx={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
                >
                  Assign To
                </Typography>
                <Box component={"span"} sx={classes.CustomRequired}>
                  *
                </Box>
              </InputLabel>
              <Select
                id="assign"
                name="assign"
                value={formField.assign.value}
                onChange={(e: any) => {
                  handleChange(e);
                }}
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : { background: "#373854" }}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography
                    sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                    variant="h4"
                  >
                    {formField.assign.value || "Select assignee"}
                  </Typography>
                )}
                displayEmpty
                error={formField.assign.value && formField.assign.error}
              >
                {_.unionBy(owner, "name")?.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                    value={item.name}
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(formField.assign.value) && formField.assign.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {formField.assign.error}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xl={5.8} lg={5.8} md={5.9} sm={5.8} xs={12} mt={2}>
              <CustomInput
                label="RFP Title"
                value={props?.viewProposalData?.title}
                placeHolder="Enter description"
                disabled
                onChange={handleChange}
                customInputClasses={
                  !bgcolor ? classes.textFieldLight : classes.textFieldDark
                }
              />
            </Grid>
            <Grid item xl={5.8} lg={5.8} md={5.9} sm={5.8} xs={12} mt={2}>
              <CustomInput
                label="RFP Due Date"
                value={props?.viewProposalData?.dueDate}
                placeHolder="Enter description"
                disabled
                onChange={handleChange}
                customInputClasses={
                  !bgcolor ? classes.textFieldLight : classes.textFieldDark
                }
              />
            </Grid>
          </Grid>
          <Grid item xl={5.5} lg={5.5} md={11} sm={11} xs={11}>
            <Box
              sx={classes.textAreaInput}
              display={"flex"}
              flexDirection={"column"}
            >
              <InputLabel sx={classes.inputLabel}>
                <Typography
                  variant="h6"
                  sx={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
                >
                  Description
                </Typography>
                <Box component={"span"} sx={classes.CustomRequired}>
                  *
                </Box>
              </InputLabel>
              <TextField
                multiline
                placeholder="Enter description"
                required
                inputProps={{ maxLength: 500 }}
                minRows={3}
                onChange={handleChange}
                name="description"
                value={formField.description.value}
                sx={bgcolor ? classes.testAreaDark : classes.testAreaLight}
              />
              {!isTruthy(formField.description.value) &&
                formField.description.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {formField.description.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid
            container
            xl={11.3}
            xs={11.3}
            lg={11.3}
            md={11.3}
            sm={11.3}
            gap={3}
          >
            <Grid item xl={5.8} lg={5.8} md={5.8} sm={12} xs={12}>
              <Box
                sx={classes.textAreaInput}
                display={"flex"}
                flexDirection={"column"}
              >
                <InputLabel sx={classes.inputLabel}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                    }}
                  >
                    Comment
                  </Typography>
                  <Box component={"span"} sx={classes.CustomRequired}>
                    *
                  </Box>
                </InputLabel>
                <TextField
                  placeholder="Enter comment"
                  onChange={handleChange}
                  minRows={3}
                  multiline
                  name="comment"
                  value={formField.comment.value}
                  sx={bgcolor ? classes.testAreaDark : classes.testAreaLight}
                />
                {!isTruthy(formField.comment.value) &&
                  formField.comment.error && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {formField.comment.error}
                    </FormHelperText>
                  )}
              </Box>
            </Grid>
            <Grid item xl={5.8} lg={5.8} md={5.8} sm={12} xs={12}>
              <Box sx={classes.formInput}>
                <Typography
                  sx={classes.label}
                  variant="h6"
                  style={{ color: !bgcolor ? "black" : "white" }}
                >
                  Upload File{" "}
                </Typography>
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
                  onAdd={uploadDoccumentFileHandler}
                  iconWrapperStyle={classes.dropzoneIconStyle}
                  index={0}
                  dropzoneIconStyle={true}
                  dropzoneCustomClasses={{
                    background: bgcolor ? "#373854" : "#E6E7FF",
                    border: !bgcolor ? "1px solid #C1C1C1" : "none",
                    display: "flex",
                  }}
                  maxFileSize={10485760}
                  uploadedFileName={uploadDocumentObject?.name}
                  removeUploadedFileName={handleDeleteDropzoneChip}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
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
              customClasses={{
                width: "110px",
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
              }}
              buttonType={"outlined"}
              onClick={() => handleCloseModel()}
            />
            <CustomButton
              label="Assign"
              customClasses={{
                width: "110px",
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
              }}
              buttonType={"contained"}
              onClick={() => addTaskHandler()}
            />
          </Box>
        </Grid>
      </>
    );
  };
  return (
    <>
      <CustomDialog
        dialogHeaderContent={dialogTitleContent()}
        isDialogOpen={props.openModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogBody()}
        dialogFooterContent={dialogContent()}
        width="900px"
        borderRadius="33px"
        hideBgColor
        dialogFooterClass
        cancelIconColor
      />
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(AddTaskModal);
