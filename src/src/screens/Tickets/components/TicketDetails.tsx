import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  TextField,
} from "@mui/material";
import { CustomButton, CustomDialog } from "global/components";
import CustomDrawer from "global/components/CustomDrawer/CustomDrawer";
import ticketsStyles from "../Tickets.styles";
import DueDateIcon from "assets/icons/Due-date.svg";
import ticketCommentIcon from "assets/icons/ticket-comment.svg";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  assignedCount,
  completedSearchCount,
  completedTicket,
  completeTicket,
  downloadDocument,
  getAssigned,
  getTicketInfoById,
  reAssigneeTicket,
  updateTicket,
  viewUploadedDocument,
} from "../ticketService";
import {
  insertTicketField,
  reAssignFropDownValidation,
  validateReassign,
  validateComment,
} from "../TicketTypesAndValidtion";
import { ticketDownload } from "models/interfaces";
import Divider from "@mui/material/Divider";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import paper1 from "assets/icons/paper1.svg";
import commentImg from "assets/icons/linkedin-comment.png";
import { ReactComponent as ShowIcon } from "assets/icons/Show.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/download.svg";
import strings from "global/constants/StringConstants";
import {
  boldFont,
  completeChipBackgroundColor,
  errorStyling,
  primaryActiveTabBgColor,
  primaryColor,
} from "utils/styles";
import moment from "moment";
import { getCustomError } from "utils/customError";
// import deepClone from "lodash/cloneDeep";

interface customProps {
  isOpenCustomDrawer?: any;
  ticketDetailsHandler?: any;
  getTicketInfo?: any;
  pageNumber: number;
  getTabClick?: string;
  newAssignee?: any;
  setIsOpenCustomDrawer: any;
  getTableData?: any;
  apiHandler: Function;
  getPage?: number;
  drawerOpenHandler?: Function;
  getAssignedTicketsData?: Function;
  setGetTabClick?: any;
  currentSelectedTab?: any;
  rowsPerPage: number;
}

const TicketDetails = (props: customProps) => {
  const classes = ticketsStyles;
  const [reassign, setReassign] = useState(reAssignFropDownValidation);
  const [reassignID, setReassignID] = useState("");
  const [reassignName, setReassignName] = useState("");
  const [selectOption, setSelectOption] = useState<any>([]);
  const [ticketDetailForm, setDetailTicketForm] = useState(insertTicketField());
  const [uploadedDocumentFileExtension, setUploadedDocumentFileExtension] =
    useState("");
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticketInfo, setTicketInfo] = useState<any>(props.getTicketInfo);

  useEffect(() => {
    if (!isTruthy(ticketInfo)) {
      setTicketInfo(props.getTicketInfo);
    }
    if (props.isOpenCustomDrawer && isTruthy(props.getTicketInfo)) {
      getTicketFullInfo();
    }
    setDetailTicketForm(insertTicketField());
    setReassign(reAssignFropDownValidation());
    if (props.newAssignee) {
      findAssigneeList();
    }
  }, [props]);

  // useEffect(() => {
  // }, [props.isOpenCustomDrawer]);
  // useEffect(() => {
  // }, [props.newAssignee]);

  const getTicketFullInfo = async () => {
    try {
      setIsLoading(true);
      const res = await getTicketInfoById(props.getTicketInfo.id);
      setTicketInfo(res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const findAssigneeList = () => {
    let result: any =
      props.newAssignee &&
      props.newAssignee.find(
        (item: any) => item.description === props.getTicketInfo.process
      );
    setSelectOption(result?.assignees);
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      validateComment(ticketDetailForm);
    setDetailTicketForm({ ...errors });
    return isValid;
  };

  const handleReassignValidtion = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      validateReassign(reassign);
    setReassign({ ...errors });
    return isValid;
  };
  const handleCompleteCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailTicketForm({
      ...ticketDetailForm,
      [e.target.name]: {
        ...ticketDetailForm[e.target.name],
        value: e.target.checked,
      },
    });
  };

  const handleOnChange = (event: any) => {
    setDetailTicketForm({
      ...ticketDetailForm,
      [event.target.name]: {
        ...ticketDetailForm[event.target.name],
        value: event.target.value,
        error: false,
      },
    });
  };

  const handleClose = () => {
    setShowDialog!(false);
  };

  const getDialogTitle = () => {
    return <Typography sx={classes.iframeTitle}>View File</Typography>;
  };

  const getDialogBody = () => {
    return (
      <iframe
        src={uploadedDocument}
        width="100%"
        height="600px"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    );
  };

  // downloadFile File
  const getDialogFooter = () => {
    return (
      <Box sx={classes.outerBox}>
        <Stack direction="row" justifyContent="center">
          <CustomButton label={"Close"} onClick={() => setShowDialog(false)} />
        </Stack>
      </Box>
    );
  };
  const handleSubmit = async () => {
    if (handleValidation()) {
      setIsLoading(true);
      try {
        const publish = { text: ticketDetailForm?.comment?.value };
        const complete = ticketDetailForm?.complete?.value;
        let taskInfo = JSON.parse(JSON.stringify(ticketInfo));
        taskInfo.comments.push(publish);
        if (complete) {
          await completeTicket(taskInfo, complete);
          await completedTicket();
          await completedSearchCount();
          await assignedCount();
          await getAssigned(props.pageNumber, props.rowsPerPage);
        } else {
          await updateTicket(taskInfo);
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      } finally {
        setDetailTicketForm(insertTicketField());
        props.setIsOpenCustomDrawer(!props.isOpenCustomDrawer);
        await props.getTableData(props.pageNumber, props.currentSelectedTab);
      }
    }
  };

  const reAssignTicketHandler = async () => {
    try {
      setIsLoading(true);
      const updateInfo = ticketInfo;
      updateInfo.assigneeId = reassignID;
      updateInfo.assigneeName = reassignName;
      await reAssigneeTicket(updateInfo);
      setReassign(reassign);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    } finally {
      await props.setIsOpenCustomDrawer(!props.isOpenCustomDrawer);
      await props.getTableData(props.pageNumber, props.currentSelectedTab);
    }
  };

  const handleOptionChange = (event: any) => {
    setReassignID(event.target.value.email);
    setReassignName(event.target.value.name);
    setReassign({
      ...reassign,
      [event.target.name]: {
        ...reassign[event.target.name],
        value: event.target.value.name,
      },
    });
  };
  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
  };

  const handleViewUploadDocument = async (item: any) => {
    try {
      setIsLoading(true);
      const document = {
        app: "mailzzy",
        path: `${item}`,
        status: ticketInfo.status,
      };
      const data = await viewUploadedDocument(document);
      const fileExtension = getFileExtension(data.value);
      setUploadedDocumentFileExtension(fileExtension);
      const splitUploadPath = item.path.split(".");
      const extensionName = splitUploadPath[splitUploadPath.length - 1];
      const uploadedFileExtensionList = [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
      ];
      if (uploadedFileExtensionList.includes(extensionName)) {
        setUploadedDocument(
          `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            data.value
          )}`
        );
        setShowDialog(true);
        setIsLoading(false);
      } else {
        setUploadedDocument(data.value);
        setShowDialog(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleDownloadFile = async (item: string) => {
    try {
      setIsLoading(true);
      const ticketDownload: ticketDownload = {
        app: "workforce",
        path: item,
        status: ticketInfo.status,
        id: null,
        type: null,
        audit: null,
        title: null,
        ownerId: null,
        ownerEmail: null,
        ownerName: null,
        ownerType: null,
        contextId: null,
        metadata: null,
        content: null,
        tagss: null,
        issueDate: "",
        expiryDate: "",
        expriyMandatory: null,
        issueMandatory: null,
      };
      const data = await downloadDocument(ticketDownload);
      let file: any = document.createElement("a");
      file.style = "display:none";
      let url = window.URL.createObjectURL(data);
      file.href = url;
      file.download = `${item.split("_").slice(1).join("_")}`;
      file.click();
      // @ts-ignore
      window.URL.revokeObjectURL(url);
      file.remove();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const drawerBody = () => {
    switch (props.getTabClick) {
      case strings.assignData:
        return assignGetBody();
      case strings.RaisedData:
        return RaisedGetBody();
      case strings.openData:
        return assignGetBody();
      case strings.completedData:
        return RaisedGetBody();
      case "action":
        return ReassignGetBody();
      default:
        break;
    }
  };

  const drawerTitle = (title: string) => {
    return (
      <Grid
        container
        justifyContent={"space-between"}
        padding="0 20px"
        alignItems={"center"}
        sx={classes.titleWrapper}
      >
        <Grid item>
          <Typography sx={classes.drawerTitle}>{title}</Typography>
        </Grid>
        <Grid item display={"flex"} gap={"10px"}>
          <CustomButton
            label={"Cancel"}
            customClasses={classes.cancelButtonStyle}
            onClick={() => props.drawerOpenHandler && props.drawerOpenHandler()}
          />
          <CustomButton
            label={"Submit"}
            onClick={() => {
              if (title === strings.ReassignTitleValue) {
                if (handleReassignValidtion()) {
                  reAssignTicketHandler();
                }
              } else {
                handleSubmit();
              }
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const drawerTitleWithCloseButton = (title: string) => {
    return (
      <Grid
        container
        justifyContent={"space-between"}
        padding="0 20px"
        alignItems={"center"}
        sx={classes.titleWrapper}
      >
        <Grid item>
          <Typography sx={classes.drawerTitle}>{title}</Typography>
        </Grid>
        <Grid item display={"flex"} gap={"10px"}>
          <CustomButton
            label={"Close"}
            customClasses={classes.cancelButtonStyle}
            onClick={() => {
              props.drawerOpenHandler && props.drawerOpenHandler();
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const fileAvailable = () => {
    return (
      <Box sx={classes.uploadWrapper}>
        <Box sx={classes.uploadFile}>
          <Typography sx={classes.uploadFileTitle}>Uploaded File</Typography>

          {ticketInfo.docUrls &&
            ticketInfo.docUrls?.map((item: any, index: number) => {
              let imageName: string = item.split("_").slice(1).join("_");
              return (
                <>
                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={classes.uploadFileName}
                      style={{ wordBreak: "break-all" }}
                    >
                      {imageName}
                    </Typography>
                    <Box sx={classes.uploadButtons}>
                      <CustomButton
                        icon={<ShowIcon />}
                        customClasses={classes.buttonStyle}
                        label={"View"}
                        onClick={() => {
                          handleViewUploadDocument(item);
                        }}
                      />
                      <Box style={{ marginTop: "10px", marginRight: "15px" }}>
                        |
                      </Box>
                      <CustomButton
                        icon={<DownloadIcon />}
                        customClasses={classes.buttonStyle}
                        label={"Download"}
                        onClick={() => {
                          handleDownloadFile(item);
                        }}
                      />
                    </Box>
                  </Box>
                </>
              );
            })}
        </Box>
      </Box>
    );
  };

  const fileNotFound = () => {
    return (
      <Box sx={classes.uploadWrapper}>
        <Box sx={classes.fileNotFoundWrapper}>
          <img src={paper1} alt="file not found " />
          <Typography sx={classes.fileNotFoundText}>
            No Uploaded File
          </Typography>
        </Box>
      </Box>
    );
  };

  const getTicketDescription = () => {
    return (
      <Grid item xs={12}>
        <Box sx={classes.titleBodyWrapper}>
          <Box>
            <Typography sx={classes.bodyTitle}>{ticketInfo?.name}</Typography>
          </Box>
          <Box>
            {ticketInfo?.status === "Complete" ? (
              <Chip
                label={ticketInfo.status}
                style={{
                  padding: "0 10px",
                  background: completeChipBackgroundColor,
                  textTransform: "uppercase",
                  ...boldFont,
                }}
              />
            ) : (
              <Chip
                label={ticketInfo?.status}
                style={{
                  padding: "0 10px",
                  background: primaryActiveTabBgColor,
                  color: primaryColor,
                  textTransform: "uppercase",
                  ...boldFont,
                }}
              />
            )}
          </Box>
        </Box>

        <Typography sx={classes.bodyText}>{ticketInfo?.description}</Typography>
      </Grid>
    );
  };

  const getCommentSection = () => {
    return (
      <>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Box display={"flex"} alignItems={"flex-start"} gap={"20px"}>
            <Box>
              <img src={DueDateIcon} alt="Due-date-icon" />
            </Box>
            <Box>
              <Typography sx={classes.ticketInfoText}>
                <Box component={"span"} sx={classes.spanBold}>
                  Due Date:
                  <Box component={"span"} sx={classes.spanComments}>
                    {moment(ticketInfo?.dueDate).format("MMM DD, YYYY")}
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            gap={"20px"}
            sx={{ mt: 1 }}
          >
            <Box>
              <img src={ticketCommentIcon} alt="ticket-Comment-Icon" />
            </Box>
            <Box>
              <Typography sx={classes.ticketInfoText}>
                <Box component={"span"} sx={classes.spanBold}>
                  Comments:
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box>
            {ticketInfo?.comments?.length === 0 ? (
              <Box sx={classes.uploadWrapper}>
                <Box sx={classes.fileNotFoundWrapper}>
                  <img src={commentImg} alt="No comments" />
                  <Typography sx={classes.fileNotFoundText}>
                    No Comments
                  </Typography>
                </Box>
              </Box>
            ) : (
              ticketInfo?.comments?.map((comment: any) => {
                return (
                  <Box sx={classes.commentWrapper}>
                    <Stack direction="row" alignItems="center">
                      <Typography sx={classes.commentBy}>
                        {comment.by}
                      </Typography>
                      <Box sx={classes.dotSeparate}></Box>
                      <Typography sx={classes.commentDate}>
                        {moment(comment.on).format("MMM DD, YYYY")}
                      </Typography>
                    </Stack>
                    <Typography mt={1}>{comment.text}</Typography>
                  </Box>
                );
              })
            )}
          </Box>
        </Grid>
      </>
    );
  };

  const assignGetBody = () => {
    return (
      <>
        {drawerTitle(strings.DrawerTitle)}
        <Grid
          container
          padding="0 20px"
          sx={classes.bodyWrapper}
          overflow={"auto"}
          display={"flex"}
          justifyContent={"flex-start"}
        >
          {getTicketDescription()}
          {getCommentSection()}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {ticketInfo?.docUrls?.length === 0
              ? fileNotFound()
              : fileAvailable()}
          </Grid>

          <Grid
            item
            display={"flex"}
            flexDirection={"column"}
            xs={12}
            sx={{ mt: 3 }}
          >
            <Box sx={{ my: 3 }}>
              <Divider />
            </Box>

            <Box display={"flex"}>
              <Typography sx={classes.inputLabel}>Add Comment</Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={4}
              inputProps={{ maxLength: 500 }}
              placeholder="Enter comment"
              error={ticketDetailForm.comment.error}
              sx={classes.testAreaStyle}
              name="comment"
              onChange={(event: any) => handleOnChange(event)}
              value={ticketDetailForm?.comment?.value}
              onBlur={(event: any) => {
                setDetailTicketForm({
                  ...ticketDetailForm,
                  [event.target.name]: {
                    ...ticketDetailForm[event.target.name],
                    error: false,
                  },
                });
              }}
            />
            {!isTruthy(ticketDetailForm.comment.value) && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {ticketDetailForm.comment.error}
              </FormHelperText>
            )}
            {isTruthy(ticketDetailForm.comment.value) &&
              ticketDetailForm.comment.value.length >=
                strings.USER_DESCRIPTION_LIMIT && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {`Comment cannot be more than ${strings.USER_DESCRIPTION_LIMIT} characters`}
                </FormHelperText>
              )}
          </Grid>
          <Grid>
            <Box sx={classes.checkLabel}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCompleteCheck}
                    name="complete"
                    checked={ticketDetailForm?.complete?.value}
                  />
                }
                label="Mark As Complete"
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const RaisedGetBody = () => {
    return (
      <>
        {drawerTitleWithCloseButton(strings.DrawerTitle)}
        <Grid
          container
          padding="0 20px"
          sx={classes.bodyWrapper}
          overflow={"auto"}
        >
          {getTicketDescription()}
          {getCommentSection()}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {ticketInfo?.docUrls?.length === 0
              ? fileNotFound()
              : fileAvailable()}
          </Grid>
        </Grid>
      </>
    );
  };

  const ReassignGetBody = () => {
    return (
      <>
        {drawerTitle(strings.ReassignTitleValue)}
        <Grid
          container
          padding="0 20px"
          sx={classes.bodyWrapper}
          overflow={"auto"}
        >
          {getTicketDescription()}
          {getCommentSection()}

          <Grid item xs={12} sx={{ mt: 2 }}>
            {ticketInfo?.docUrls?.length === 0
              ? fileNotFound()
              : fileAvailable()}
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Box display={"flex"}>
              <Typography sx={classes.inputLabel}>New Assignee</Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <Box>
              <Select
                sx={classes.dropDownStyle}
                name="reassign"
                id="reassign"
                value={reassign?.reassign?.value.name}
                onChange={(e) => handleOptionChange(e)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                renderValue={
                  reassign?.reassign?.value !== ""
                    ? undefined
                    : () => "Select new assignee"
                }
                error={
                  reassign?.reassign?.value?.length < 4 &&
                  reassign?.reassign?.error.length !== 0
                }
              >
                {selectOption?.map((data: any) => (
                  <MenuItem key={data.id} value={data} sx={classes.optionStyle}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(reassign?.reassign?.value) && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {reassign?.reassign?.error}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <div>
      <CustomDrawer
        isOpen={props.isOpenCustomDrawer}
        drawerBody={drawerBody()}
        side={"right"}
        toggleDrawer={() => {
          props.drawerOpenHandler && props.drawerOpenHandler();
        }}
      />
      <CustomDialog
        isDialogOpen={showDialog}
        handleDialogClose={handleClose}
        dialogTitleContent={getDialogTitle()}
        dialogBodyContent={getDialogBody()}
        dialogFooterContent={getDialogFooter()}
        closable
        closeButtonVisibility={true}
        width="600px"
        borderRadius="33px"
      />
      <CustomLoader isLoading={isLoading} />
    </div>
  );
};

export default TicketDetails;
