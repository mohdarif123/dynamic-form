import { useEffect, useState } from "react";
import layoutStyles from "./Layout.style";
import SupportIcon from "assets/images/supportTicket.svg";
import {
  CustomButton,
  CustomDialogs2,
  CustomIcon,
  CustomInput,
} from "global/components";
import supportTicketImg from "assets/images/support-ticket.svg";
import { DropzoneAreaBase } from "react-mui-dropzone";
import {
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
  Box,
  Chip,
  TextField,
} from "@mui/material";
import { addNewSupportTicket, attachFileUpload } from "./createTicketService";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { ReactComponent as dropZoneDropZone } from "assets/icons/dropZoneDropZone.svg";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import strings from "global/constants/StringConstants";
import { getCustomError } from "utils/customError";

const CreateTicket = () => {
  const classes = layoutStyles;
  const [openModel, setOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filePath, setFilePath] = useState<string[]>([]);
  const [uploadFileName, setUploadFileName] = useState<any>([]);
  const [ticketForm, setTicketForm] = useState<any>({
    process: {
      value: "",
      error: "",
    },
    title: {
      value: "",
      error: "",
    },
    comment: {
      value: "",
      error: "",
    },
  });
  useEffect(() => {
    setTicketForm({
      process: {
        value: "",
        error: "",
      },
      title: {
        value: "",
        error: "",
      },
      comment: {
        value: "",
        error: "",
      },
    });
    setFilePath([]);
    setUploadFileName([]);
  }, [openModel]);

  const handleSupportTicketModal = () => {
    setOpenModel(true);
  };

  const dialogHeaderContent = () => {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        style={{ flexDirection: "column" }}
      >
        <img src={supportTicketImg} alt="" />
        <Typography
          sx={{ color: !bgcolor ? "#000000" : "white" }}
          variant="h2"
          mt={3}
        >
          HELP DESK
        </Typography>
      </Box>
    );
  };

  const handleOnChange = (event: any) => {
    setTicketForm({
      ...ticketForm,
      [event.target.name]: {
        ...ticketForm[event.target.name],
        value: event.target.value,
        error: false,
      },
    });
  };

  const handleDropRejected = (files: any, event: any) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const rejectedFiles = files.filter(
      (file: any) => file.size > MAX_FILE_SIZE
    );
    if (rejectedFiles.length > 0) {
      const rejectedFileNames = rejectedFiles
        .map((file: any) => file.name)
        .join(", ");
      openErrorNotification(
        `The following files exceed the maximum allowed size of 2 MB: ${rejectedFileNames}`
      );
    }
  };

  const handleValidation = () => {
    let errors = ticketForm;
    let isValid = true;
    const process = ticketForm.process.value;
    const title = ticketForm.title.value.trim();
    const comment = ticketForm.comment.value.trim();
    if (!process && !title && !comment) {
      // Set the fields as error true
      errors.process.error = "Please select process";
      errors.title.error = "Please enter title";
      errors.comment.error = "Please enter description";
      isValid = false;
    } else if (!process) {
      errors.process.error = "Please select process";
      isValid = false;
    } else if (!title) {
      errors.title.error = "Please enter title";
      isValid = false;
    } else if (!comment) {
      errors.comment.error = "Please enter issue description";
      isValid = false;
    }
    setTicketForm({ ...errors });
    return isValid;
  };

  const handleClose = () => {
    setOpenModel(false);
  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (handleValidation() && ticketForm?.comment?.value?.length < 500) {
        // const docUrl = ticketForm?.fileName;
        await addNewSupportTicket(
          ticketForm.process.value,
          ticketForm.title.value,
          ticketForm.comment.value,
          ticketForm.docUrl
        );
        openSuccessNotification("Your Response has been submitted");
        const ticket = ticketForm;
        ticket.process = "";
        ticket.title = "";
        ticket.comment = "";
        setFilePath([]);
        setUploadFileName([]);
        setTicketForm(ticket);
        setIsLoading(false);
        setOpenModel(false);
        // history.push({
        //   pathname: urls.ticketsViewPath,
        //   state: { fromPageTableValue: strings.RaisedByMe, loadingState: true },
        // });
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const handleDeleteFile = (index: any) => {
    setUploadFileName(
      uploadFileName.filter((item: any, i: number) => i !== index)
    );
    setFilePath(filePath.filter((item: any, i: number) => i !== index));
  };

  const uploadFile = async (event: any) => {
    try {
      let fileNameArray: any[] = [];
      let uploadFilePath: any[] = [];
      const fileData = event?.filter((data: any) => {
        return !uploadFileName?.includes(data?.file?.name);
      });
      const isExits = checkIsExitsFileName(fileData);
      if (!isExits) {
        for (const element of fileData) {
          setIsLoading(true);
          let fileNames = element?.file?.name;
          const data = new FormData();
          data.append("file", element?.file);
          data.append("fileName", element?.file?.name);
          const [res] = await Promise.all([attachFileUpload(data)]);
          setTicketForm({
            ...ticketForm,
            docUrl: res?.path,
          });
          fileNameArray.push(...uploadFileName, fileNames);
          setIsLoading(false);
        }
        setFilePath(uploadFilePath);
        setUploadFileName(fileNameArray);
      }
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const checkIsExitsFileName = (files: any) => {
    const data: any = [];
    return files.every((item: any) => {
      if (uploadFileName?.includes!(item?.file?.name)) {
        data.push(item?.file?.name);
      }
      return uploadFileName?.includes(item?.file?.name);
    });
  };
  const bgcolor = useAppSelector(selectBackgroundColor);
  const supportTicketContent = () => {
    return (
      <>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} sm={12} md={6} lg={5.9} xl={5.9} item mt={1.4}>
            <CustomInput
              required
              id="title"
              placeHolder="Enter title"
              type="text"
              name="title"
              label="Title"
              onChange={handleOnChange}
              value={ticketForm.title.value}
              propsToInputElement={{ minLength: 5, maxLength: 50 }}
              error={
                !isTruthy(ticketForm.title.value) && ticketForm.title.error
              }
            />
            {!isTruthy(ticketForm.title.value) && ticketForm.title.error && (
              <FormHelperText error sx={{ ...errorStyling }}>
                {ticketForm.title.error}
              </FormHelperText>
            )}
            {/* {isTruthy(ticketForm.title.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {`Title cannot be more than ${strings.TICKET_USER_TITLE_LIMIT} characters`}
                </FormHelperText>
              )} */}
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
            <Box sx={classes.formInput} mt={"9px"}>
              <Box display={"flex"}>
                <Typography
                  sx={bgcolor ? classes.nameField : classes.nameField1}
                  variant="h6"
                >
                  Type
                </Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <Select
                id="process"
                name="process"
                onChange={handleOnChange}
                value={ticketForm.process.value}
                displayEmpty
                sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                style={!bgcolor ? selectBgLight : selectBgDark}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                renderValue={() => (
                  <Typography
                    sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                    variant="h4"
                  >
                    {ticketForm.process.value || "Select Type"}
                  </Typography>
                )}
              >
                <MenuItem
                  value={"RFP Support Process"}
                  sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                >
                  <Typography variant="subtitle1">
                    RFP Support Process
                  </Typography>
                </MenuItem>
              </Select>
              {!isTruthy(ticketForm.process.value) &&
                ticketForm.process.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {ticketForm.process.error}
                  </FormHelperText>
                )}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Box
              sx={classes.formInput}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box display={"flex"}>
                <Typography
                  sx={bgcolor ? classes.nameField : classes.nameField1}
                  variant="h6"
                >
                  Description{" "}
                </Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <TextField
                multiline
                minRows={3}
                inputProps={{ maxLength: 500 }}
                sx={bgcolor ? classes.testAreaStyle1 : classes.testAreaStyle}
                name="comment"
                id="comment"
                error={ticketForm.comment.error}
                placeholder="Enter your comment"
                value={ticketForm.comment.value}
                onChange={(event: any) => handleOnChange(event)}
                onBlur={(event: any) => {
                  setTicketForm({
                    ...ticketForm,
                    [event.target.name]: {
                      ...ticketForm[event.target.name],
                      error: false,
                    },
                  });
                }}
              />
              {!isTruthy(ticketForm.comment.value) &&
                ticketForm.comment.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {ticketForm.comment.error}
                  </FormHelperText>
                )}
              {/* {isTruthy(ticketForm.comment.value) &&
                ticketForm.comment.value.length >=
                  strings.USER_DESCRIPTION_LIMIT && (
                  <FormHelperText error sx={classes.errorStyle}>
                    {`Description cannot be more than ${strings.USER_DESCRIPTION_LIMIT} characters`}
                  </FormHelperText>
                )} */}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Box sx={classes.formInput}>
              <Typography
                sx={bgcolor ? classes.nameField : classes.nameField1}
                variant="h6"
              >
                Upload File{" "}
              </Typography>
              <Box sx={classes.dropZoneWrapperDoc}>
                <DropzoneAreaBase
                  fileObjects={[]}
                  onAdd={uploadFile}
                  dropzoneText={``}
                  maxFileSize={2097152}
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
                  showAlerts={false}
                  showPreviewsInDropzone={true}
                  showFileNames={true}
                  filesLimit={1}
                  Icon={dropZoneDropZone}
                  onDropRejected={handleDropRejected}
                />
                <Box>
                  {uploadFileName &&
                    uploadFileName
                      ?.filter(
                        (item1: any, index: number) =>
                          uploadFileName.indexOf(item1) === index
                      )
                      ?.map((item: any, index2: number) => {
                        return (
                          <>
                            <Chip
                              sx={
                                bgcolor
                                  ? classes.previewChip
                                  : classes.previewChipLight
                              }
                              style={{
                                color: bgcolor ? "#FFF" : "#000000",
                              }}
                              label={item}
                              variant="filled"
                              onDelete={() => handleDeleteFile(index2)}
                            />
                          </>
                        );
                      })}
                </Box>

                <Typography sx={classes.warningContent}>
                  The file should be in .doc/.pdf/.png/.jpg/.jpeg/.xlsx and size
                  should not be more than 2MB
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            item
            display="flex"
            justifyContent="center"
          >
            <Box>
              {" "}
              <CustomButton
                label={strings.CANCEL}
                onClick={() => handleClose()}
                customClasses={{
                  width: "110px",
                  border: !bgcolor
                    ? "1.5px solid #C1C1C1"
                    : "1.5px solid #fff !important",
                }}
                buttonType={"outlined"}
              />
            </Box>
            <Box ml={1}>
              <CustomButton
                label="Submit"
                onClick={() => handleSubmit()}
                customClasses={classes.submitButton}
                buttonType={"contained"}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const supportTicketModal = () => {
    return (
      <>
        <CustomDialogs2
          dialogHeaderContent={dialogHeaderContent()}
          isDialogOpen={openModel}
          dialogHeaderContentClass={true}
          handleDialogClose={() => setOpenModel(false)}
          closable
          dialogBodyContent={supportTicketContent()}
          closeButtonVisibility={true}
          width="600px"
          borderRadius="33px"
        />
      </>
    );
  };

  return (
    <Box mt={11}>
      <Box style={classes.supportTicket}>
        <Box sx={classes.supportTicketIcon} onClick={handleSupportTicketModal}>
          <CustomIcon
            icon={
              <img
                src={SupportIcon}
                alt="Support Icon"
                style={{ width: "70px" }}
              />
            }
            onClick={() => {
              handleSupportTicketModal();
            }}
          />
        </Box>
      </Box>
      {supportTicketModal()}
      <CustomLoader isLoading={isLoading} />
    </Box>
  );
};

export default CreateTicket;
