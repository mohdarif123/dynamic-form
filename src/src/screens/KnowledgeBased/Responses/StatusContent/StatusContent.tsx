import { Box, Grid, InputLabel, Stack, Typography } from "@mui/material";
import StatusContentStyle from "./StatusContent.styles";
import { CustomButton, CustomDialog, CustomInput } from "global/components";
import JoditEditor from "jodit-react";
import urls from "global/constants/UrlConstants";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { useEffect, useState } from "react";
import {
  approvedContent,
  getResponseData,
  rejectContent,
} from "./StatusContent.services";
import history from "utils/history";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import ContentRejectModal from "../Components/ContentRejectModal";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { useLocation } from "react-router";
import { inputColor, mainColor } from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { doesLoggedInUserHasAccessToResource } from "utils/AuthorizationManager";
import { getCustomError } from "utils/customError";

interface customProps {
  setStatusApprove?: any;
  statusApprove?: any;
  responseId?: any;
  getResponseTableData?: any;
}
const StatusContent = (props: customProps) => {
  useTitle(strings.RESPONSES);
  const classes = StatusContentStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const urlParams = useLocation().search;
  const responseId = props.responseId;
  const [statusData, setStatusData] = useState<any>();
  const [oldContent, setOldContent] = useState<any>();
  const [newContent, setNewContent] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    if (responseId) {
      viewResponsesHandler();
    }
  }, [responseId]);
  const viewResponsesHandler = async () => {
    try {
      setIsLoading(true);
      const [newContent] = await Promise.all([getResponseData(responseId)]);
      setStatusData(newContent);
      setNewContent(newContent);
      setOldContent(newContent);
      if (newContent.count > 1) {
        const [oldContent] = await Promise.all([
          getResponseData(responseId - 1),
        ]);
        setOldContent(oldContent);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };
  const handleCloseModel = () => {
    props.setStatusApprove(false);
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      setOpenRejectModal(false);
      await rejectContent(statusData);
      openSuccessNotification("Content has been rejected successfully.");
      history.push(urls.RESPONSE_VIEW_PATH);
      setIsLoading(false);
      handleCloseModel();
      props.getResponseTableData();
    } catch (error: any) {
      handleCloseModel();
      setIsLoading(false);
    }
  };

  const handleApproved = async () => {
    try {
      setIsLoading(true);
      await approvedContent(statusData);
      openSuccessNotification("Content has been approved successfully.");
      history.push(urls.RESPONSE_VIEW_PATH);
      handleCloseModel();
      setIsLoading(false);
      props.getResponseTableData();
    } catch (error: any) {
      handleCloseModel();
    }
  };

  const handleEdit = () => {
    setEditButton(true);
  };
  const getDialogTitle = () => {
    return (
      <Typography variant="h2" sx={{ color: "white" }}>
        Content Details
      </Typography>
    );
  };
  const handleChange = (e: any) => {
    setStatusData({
      ...statusData,
      answer: e,
    });
  };
  const getNewOldCard = () => {
    return (
      <>
        <Grid container mt={2} gap={{ xl: 3, lg: 1, md: 1, sm: 1, xs: 1 }}>
          <Grid
            item
            xl={5.9}
            lg={5.9}
            md={12}
            sm={12}
            xs={12}
            sx={classes.cardMainWrapper}
            style={{ backgroundColor: !bgcolor ? mainColor : inputColor }}
          >
            <Box m={2} pb={8}>
              <Typography
                sx={classes.cardText}
                variant="h2"
                style={{ color: !bgcolor ? "black" : "white" }}
              >
                Old Content
              </Typography>
              <Box m={2}>
                <Box>
                  <CustomInput
                    required
                    id="question"
                    label="Question"
                    placeHolder="Question"
                    type="text"
                    name="email"
                    value={statusData?.question}
                    customClasses={{
                      color: !bgcolor ? "black" : "white",
                    }}
                    disabled={true}
                  />
                </Box>
                <Box mt={1}>
                  <Stack direction="column" style={{ width: "100%" }}>
                    <InputLabel sx={classes.nameField}>
                      <Typography
                        variant="h6"
                        sx={{ color: !bgcolor ? "black" : "white" }}
                      >
                        Answer
                      </Typography>
                    </InputLabel>
                    <JoditEditor
                      value={oldContent?.answer}
                      config={{ readonly: true }}
                      onChange={() => {}}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xl={5.9}
            lg={5.9}
            md={12}
            sm={12}
            xs={12}
            sx={classes.cardMainWrapper}
            style={{ backgroundColor: !bgcolor ? mainColor : inputColor }}
          >
            <Box m={2} pb={8}>
              <Typography
                sx={classes.cardText}
                variant="h2"
                style={{ color: !bgcolor ? "black" : "white" }}
              >
                New Content
              </Typography>
              <Box m={2}>
                <Box>
                  <CustomInput
                    required
                    id="question"
                    label="Question"
                    placeHolder="Question"
                    type="text"
                    name="email"
                    value={statusData?.question}
                    disabled={true}
                  />
                </Box>
                <Box mt={1}>
                  <Stack direction="column" style={{ width: "100%" }}>
                    <InputLabel sx={classes.nameField}>
                      <Typography
                        variant="h6"
                        sx={{ color: !bgcolor ? "black" : "white" }}
                      >
                        Answer
                      </Typography>
                    </InputLabel>
                    <JoditEditor
                      value={statusData?.answer}
                      onChange={(e: any) => handleChange(e)}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Box display={"flex"} width={"100%"} justifyContent={"center"} mt={1}>
            {doesLoggedInUserHasAccessToResource(
              strings.reject,
              strings.RESPONSE
            ) && (
              <>
                <Box>
                  <CustomButton
                    onClick={() => handleReject()}
                    label={"Reject"}
                    disabled={editButton === true ? true : false}
                    customClasses={{
                      border: !bgcolor
                        ? "1.5px solid #C1C1C1"
                        : "1.5px solid #fff !important",
                      width: {
                        xl: "110px",
                        lg: "110px",
                        md: "110px",
                        sm: "90px",
                        xs: "90px",
                      },
                      height: {
                        xl: "47px",
                        lg: "40px",
                        md: "38px",
                        sm: "38px",
                        xs: "38px",
                      },
                    }}
                    buttonType={"outlined"}
                  />
                </Box>
              </>
            )}

            <Box marginLeft={3}>
              <CustomButton
                onClick={handleApproved}
                label={"Approve"}
                disabled={editButton === true ? true : false}
                customClasses={{
                  width: {
                    xl: "110px",
                    lg: "110px",
                    md: "110px",
                    sm: "90px",
                    xs: "90px",
                  },
                  height: {
                    xl: "47px",
                    lg: "40px",
                    md: "38px",
                    sm: "38px",
                    xs: "38px",
                  },
                }}
                buttonType={"contained"}
              />
            </Box>
          </Box>
        </Grid>
      </>
    );
  };

  const getRejectModal = () => {
    return (
      <>
        <ContentRejectModal
          openRejectModal={openRejectModal}
          setOpenRejectModal={setOpenRejectModal}
          handleReject={handleReject}
        />
      </>
    );
  };
  const getStatusContent = () => {
    return (
      <>
        <CustomDialog
          isDialogOpen={props.statusApprove}
          closable
          handleDialogClose={handleCloseModel}
          dialogHeaderContent={getDialogTitle()}
          dialogBodyContent={getNewOldCard()}
          width="1500px"
          closeButtonVisibility
          borderRadius="33px"
          hideBgColor={true}
          cancelIconColor={true}
        />
        {/* <Box mt={4} p={2}>
          <Grid container>
            <Grid item xl={12} mx={1} mt={6}>
              {getHeaderText()}
              {getNewOldCard()}
            </Grid>
          </Grid>
        </Box> */}
        {getRejectModal()}
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return getStatusContent();
};

export default StatusContent;
