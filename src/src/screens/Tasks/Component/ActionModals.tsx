import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomButton, CustomDialog } from "global/components";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  selectBgLight,
} from "utils/styles";
import TasksStyle from "../Tasks.styles";
import dropZoneDropZone from "assets/icons/DownlaodsIcon.svg";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import React, { useState } from "react";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { addDocumentService, completeTasks, upload } from "../TasksService";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { dicision } from "../TasksData";
import { viewProposal } from "../../Proposals/AddProposal/AddProposal.service";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import urls from "global/constants/UrlConstants";
import { getCustomError } from "utils/customError";

interface customProps {
  openActionModal: boolean;
  setOpenActionModal: Function;
  rowsActionData?: any;
  getTableData?: any;
  loggedInRole?: any;
  getCountOverAll?: any;
}
const ActionModals = (props: customProps) => {
  const classes = TasksStyle;
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const [commentValue, setCommentValue] = useState("");
  const [bidDicision, setBidDicision] = useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const payload = {
    processInstanceId: props.rowsActionData.processInstanceId,
    id: props.rowsActionData.id,
    account: props.rowsActionData.account,
    defId: props.rowsActionData.defId,
    name: props.rowsActionData.name,
    description: props.rowsActionData.description,
    assigneeId: props.rowsActionData.assigneeId,
    assigneeName: props.rowsActionData.assigneeName,
    comments: commentValue
      ? [
          {
            text: commentValue,
          },
        ]
      : null,
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
    setBidDicision("");
  };

  const handleDicision = (event: any) => {
    setBidDicision(event.target.value);
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Box>
          <Typography variant="h2" sx={{ color: "white" }}>
            Task Complete
          </Typography>
        </Box>
      </>
    );
  };
  const bisDicision = () => {
    if (
      props.loggedInRole === "StaffingBidDecisionMaker" ||
      props.loggedInRole === "NetworkingBidDecisionMaker" ||
      props.loggedInRole === "TechBidDecisionMaker" ||
      props.loggedInRole === "SecurityBidDecisionMaker"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const dicisionValue = (res: any) => {
    if (bisDicision()) {
      if (!bidDicision) {
        if (res.action) {
          return res.action;
        } else {
          return "Pending";
        }
      }
      return bidDicision;
    } else {
      if (res.action) {
        return res.action;
      } else {
        return "Pending";
      }
    }
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
      const res = await viewProposal(props.rowsActionData.businessKey);
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
        ownerId: props.rowsActionData.businessKey,
        path: uploadDocumentObject?.res?.path,
        status: "Active",
        title: uploadDocumentObject.name,
        type: "Project Info",
      };

      const action = dicisionValue(res);
      if (uploadDocumentObject?.res?.path) {
        await addDocumentService(doc);
      }
      setBidDicision("");
      const response = await completeTasks(payload, action);
      props.setOpenActionModal(false);
      openSuccessNotification(response.errorMessage);
      props.getCountOverAll();
      setLoading(false);
      setCommentValue("");
      setUploadDocumentObject({});
      props.getTableData();
    } catch (error: any) {
      setBidDicision("");
      props.setOpenActionModal(false);
      setLoading(false);
      getCustomError(error);
    }
  };

  const dialogBody = () => {
    return (
      <>
        <Grid container xl={12} px={2} gap={2}>
          <Grid xl={7.5} lg={7.5} md={7.5} sm={12} xs={12}>
            <Box>
              <Typography
                sx={{
                  color: !bgcolor ? "#000000" : "#ffffff",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "28.48px",
                }}
                variant="h5"
              >
                Comments
              </Typography>
            </Box>
            <TextField
              sx={!bgcolor ? classes.testAreaLightStyle : classes.testAreaDark}
              placeholder="Write comment"
              multiline
              minRows={3}
              inputProps={{
                maxLength: 500,
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              name="comment"
              id="comment"
              value={commentValue}
              onChange={handleComment}
            />
          </Grid>
          <Grid sx={classes.formInput} xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography
              sx={{ color: !bgcolor ? "black" : "white", marginBottom: "5px" }}
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
                background: bgcolor ? "#373854" : "#E6E7FF",
                border: !bgcolor ? "1px solid #C1C1C1" : "none",
                display: "flex",
              }}
              uploadedFileName={uploadDocumentObject?.name}
            />
          </Grid>
          <Grid sx={classes.formInput} xl={12} lg={12} md={12} sm={12} xs={12}>
            {bisDicision() && (
              <>
                <Typography
                  sx={{
                    color: !bgcolor ? "black" : "white",
                    marginBottom: "2px",
                  }}
                  variant="h5"
                >
                  Bid Decision
                </Typography>
                <Box>
                  <Select
                    sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                    style={!bgcolor ? selectBgLight : { background: "#373854" }}
                    MenuProps={
                      !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                    }
                    renderValue={() => (
                      <Typography
                        sx={{ color: bgcolor ? "#CBCBCB" : "#000000" }}
                        variant="h4"
                      >
                        {bidDicision || "Select Assigned To"}
                      </Typography>
                    )}
                    displayEmpty
                    id="bidDicision"
                    name="bidDicision"
                    value={bidDicision}
                    onChange={handleDicision}
                  >
                    {dicision.map((items: any, index: number) => (
                      <MenuItem
                        value={items.value}
                        key={index}
                        sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                      >
                        <Typography variant="subtitle1">
                          {items.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </>
    );
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Grid container sx={{ justifyContent: "center" }}>
          <Box mt={3} mb={2}>
            <CustomButton
              label="Complete"
              onClick={handleComplete}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
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
          hideBgColor
          dialogFooterClass
          cancelIconColor
        />
      </Box>
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(ActionModals);
