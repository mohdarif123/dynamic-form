import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { completeTasks, upload } from "./ticketService";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import dropZoneDropZone from "assets/icons/DownlaodsIcon.svg";
import { CustomButton, CustomDialog } from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import ticketsStyles from "./Tickets.styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import strings from "global/constants/StringConstants";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import urls from "global/constants/UrlConstants";
import { getCustomError } from "utils/customError";

interface customProps {
  openActionModal: boolean;
  setOpenActionModal: Function;
  rowsActionData?: any;
  getTableData?: any;
}
const ActionModals = (props: customProps) => {
  const classes = ticketsStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const [commentValue, setCommentValue] = useState("");

  const payload = {
    processInstanceId: props.rowsActionData.processInstanceId,
    id: props.rowsActionData.id,
    account: props.rowsActionData.account,
    defId: props.rowsActionData.defId,
    name: props.rowsActionData.name,
    description: props.rowsActionData.description,
    assigneeId: props.rowsActionData.assigneeId,
    assigneeName: props.rowsActionData.assigneeName,
    comments: [
      {
        text: commentValue,
      },
    ],
    status: props.rowsActionData.status,
    process: props.rowsActionData.process,
    businessKey: props.rowsActionData.businessKey,
    data: props.rowsActionData.data,
    assignorName: props.rowsActionData.assignorName,
    dueDate: props.rowsActionData.dueDate,
    activationDate: props.rowsActionData.activationDate,
    docUrls: [
      `${window.location.origin}${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${props.rowsActionData.businessKey}`,
    ],
    url: `${window.location.origin}/tasks`,
  };

  const handleCloseModel = () => {
    props.setOpenActionModal(false);
    setUploadDocumentObject({});
    setCommentValue("");
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Box>
          <Typography variant="h2" sx={{ color: "white" }}>
            Complete Task
          </Typography>
        </Box>
      </>
    );
  };

  const uploadDocumentFileHandler = async (event: any) => {
    try {
      setLoading(true);
      const fileData = event[0];
      const data = new FormData();
      const fileImagePath = fileData?.file;
      data.append("file", fileImagePath);
      const response = await upload(props?.rowsActionData?.businessKey, data);
      setUploadDocumentObject({
        ...uploadDocumentObject,
        res: response,
        name: fileData?.file?.name,
      });
      setLoading(false);
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const handleComment = (event: any) => {
    setCommentValue(event.target.value);
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      const response = await completeTasks(payload);
      props.setOpenActionModal(false);
      props.getTableData(1, strings.assignedToMe);
      openSuccessNotification(response.message);
      setLoading(false);
      setCommentValue("");
      setUploadDocumentObject({});
    } catch (error: any) {
      props.setOpenActionModal(false);
      setLoading(false);
      getCustomError(error);
    }
  };

  const dialogBody = () => {
    return (
      <>
        <Grid container xl={12} gap={2}>
          <Grid xl={8} lg={8} md={8} sm={12} xs={12}>
            <Box>
              <Typography
                sx={bgcolor ? classes.label : classes.label1}
                variant="h5"
              >
                Comments :
              </Typography>
            </Box>
            <TextField
              sx={
                !bgcolor ? classes.testAreaLightStyle : classes.testAreaStyle1
              }
              placeholder="Write comment"
              multiline
              minRows={3}
              inputProps={{ maxLength: 500, color: "#ffffff" }}
              name="comment"
              id="comment"
              style={{ color: bgcolor ? "#000000" : "#000000" }}
              value={commentValue}
              onChange={handleComment}
            />
          </Grid>
          <Grid xl={3} lg={3} md={3} sm={12} xs={12} sx={classes.formInput}>
            <Typography
              sx={bgcolor ? classes.label : classes.label1}
              variant="h5"
            >
              Upload File
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
              onAdd={uploadDocumentFileHandler}
              maxFileSize={10485760}
              index={0}
              dropzoneIconStyle={true}
              iconWrapperStyle={classes.dropzoneIconStyle}
              dropzoneCustomClasses={{
                background: bgcolor ? "#282945" : "#E6E7FF",
                border: !bgcolor ? "1px solid #C1C1C1" : "none",
                display: "flex",
              }}
              uploadedFileName={uploadDocumentObject?.name}
            />
            {/* <Box sx={classes.dropZoneWrapper}>
              <DropzoneAreaBase
                fileObjects={[]}
                maxFileSize={10485760}
                acceptedFiles={[
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
                onAdd={uploadDocumentFileHandler}
                showAlerts={true}
                showPreviewsInDropzone={true}
                showFileNames={true}
                filesLimit={1}
                Icon={dropZoneDropZone}
                dropzoneText={``}
              />
              {uploadDocumentObject?.name && (
                <>
                  <Box mt={1}>
                    <Chip
                      sx={{ color: bgcolor ? "#FFF" : "#000000" }}
                      label={uploadDocumentObject.name}
                      variant="filled"
                    />
                  </Box>
                </>
              )}
            </Box> */}
          </Grid>
        </Grid>
      </>
    );
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Box mt={2} mb={2}>
          <CustomButton
            label="Complete"
            onClick={handleComplete}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Box>
        <CustomDialog
          isDialogOpen={props.openActionModal}
          closable
          closeButtonVisibility
          handleDialogClose={handleCloseModel}
          dialogHeaderContent={dialogTitleContent()}
          dialogBodyContent={dialogBody()}
          dialogFooterContent={dialogFooterContent()}
          width="700px"
          borderRadius="33px"
        />
      </Box>
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(ActionModals);
