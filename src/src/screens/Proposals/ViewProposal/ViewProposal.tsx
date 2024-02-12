import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  deleteDocument,
  downloadZipDocument,
  fetchDocumentProposal,
  getAddProposalUserPage,
  updateProposalService,
  viewProposal,
} from "../AddProposal/AddProposal.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { Box, Grid, Typography, Tooltip, IconButton } from "@mui/material";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import GeneralTab from "./GeneralTab";
import ResponseTab from "./ResponseTab";
import DocumentTab from "./DocumentTab";
import AwardUpdateTab from "./AwardUpdateTab";
import zipIcon from "assets/icons/zipdoc.svg";
import DeleteIcon from "assets/icons/deletedoc.svg";
import AddTaskModal from "../Components/AddTaskModal";
import AddCommentModal from "../Components/AddCommentModal";
import urls from "global/constants/UrlConstants";
import history from "utils/history";
import { stepOneFormDataInitialState } from "../ProposalValidationType";
import { ProposalRequest } from "../AddProposal/AddProposal.model";
import { store } from "utils/store";
import moment from "moment";
import {
  isTruthy,
  openSuccessNotification,
  openInfoNotification,
  openWarningNotification,
} from "helpers/methods";
import addContent from "assets/icons/addContent.svg";
import downloadDoc from "assets/icons/exportdoc.svg";
import notifiers from "global/constants/NotificationConstants";
import ViewProposalStyles from "./ViewProposal.styles";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { doesLoggedInUserHasAccessToResource } from "utils/AuthorizationManager";
import { CustomIcon } from "global/components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditProposalIcon from "assets/icons/EditProposalIcon.svg";
import AddCommentIcon from "assets/icons/AddCommentIcon.svg";
import AwradUpdateAdd from "./AwardUpdateAdd";
import AddProposal from "../AddProposal/AddProposal";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import RightSignIcon from "assets/icons/RightSignIcon.svg";
import DeleteDocumentModal from "../Components/DeleteDocumentModal";
import { semiTransparentBlack, semiTransparentWhite } from "utils/styles";
import { getCustomError } from "utils/customError";
const tasksTabContent = [
  {
    label: "General",
    count: 0,
  },
  {
    label: "Create Response",
    count: 0,
  },
  {
    label: "Documents",
    count: 0,
  },
  {
    label: "Evaluation Update",
    count: 0,
  },
];
interface ViewPropsal {
  location?: any;
}
const ViewProposal = (props: ViewPropsal) => {
  useTitle(strings.PROPOSALS);
  const classes = ViewProposalStyles;
  const urlParams = useLocation().search;
  const redirectURL = new URLSearchParams(urlParams).get("redirect");
  const tabValue = new URLSearchParams(urlParams).get("tabValue");
  const proposalId = new URLSearchParams(urlParams).get("id");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewData, setViewData] = useState<any>();
  const [status, setStatus] = useState<string>(tabValue ? tabValue : "General");
  const [openModal, setOpenModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [addProposalValue, setAddProposalValue] = useState<any>(
    stepOneFormDataInitialState
  );
  const typeData = new URLSearchParams(urlParams).get("type");
  const regionData = new URLSearchParams(urlParams).get("region");
  const domainData = new URLSearchParams(urlParams).get("domain");
  const statusValue = new URLSearchParams(urlParams).get("status");
  const interval = new URLSearchParams(urlParams).get("interval");
  const page = new URLSearchParams(urlParams).get("page");
  const searchValue = new URLSearchParams(urlParams).get("searchValue");
  const redirectUrls = new URLSearchParams(urlParams).get("redirect");
  const [documnetTableDataFetch, setDocumnetTableDataFetch] = useState(false);
  const [addProposalModal, setAddProposalModal] = useState(false);
  const [addProposalAward, setAddProposalAward] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const [contactDetail, setContactDetail] = useState([]);
  const [joiData, setJoiData] = useState<any>([]);
  const [evaluationTableData, setEvaluationTableData] = useState([]);
  const [createdByUser, setCreatedByUser] = useState("");
  const [openModalTemplate, setOpenModalTemplate] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [openModalResponse, setOpenResponse] = useState<boolean>(false);
  const [responseSelect, setResponseSelect] = useState<boolean>(false);
  const proposalPayload = new ProposalRequest();
  const [selectedResponse, setSelectedResponse] = useState<any>([]);
  const [deleteDocumentModal, setDeleteDocumentModal] =
    useState<boolean>(false);
  const [templateData, setTemplateData] = useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);
  useEffect(() => {
    if (proposalId) {
      viewProposalHandler();
    }
  }, [proposalId]);

  useEffect(() => {
    viewEvaluationTable();
  }, []);

  const viewEvaluationTable = async () => {
    try {
      setLoading(true);
      const res = await fetchDocumentProposal(proposalId);
      setEvaluationTableData(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const viewProposalHandler = async () => {
    try {
      setLoading(true);
      const [res, userValue] = await Promise.all([
        viewProposal(proposalId),
        getAddProposalUserPage(),
      ]);
      setAddProposalValue(stepOneFormDataInitialState(res));
      setViewData(res);
      res?.comments?.map((item: any) => {
        joiData?.push(item);
      });
      setContactDetail(res.contacts);
      const userName = userValue.map((item: any) => {
        if (res?.audit?.createdBy === item.email) {
          return item.name;
        }
      });
      setCreatedByUser(userName);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleValidation = () => {
    let invalid = true;
    const commentValue = addProposalValue?.text?.value;
    if (!commentValue) {
      setCommentError("Please enter comment");
      invalid = false;
    }
    return invalid;
  };

  const collectUpdateProposalData = async () => {
    const updateJoiData: any[] = [
      // ...joiData,
      {
        text: addProposalValue?.text?.value,
      },
    ];
    proposalPayload.id = proposalId!;
    proposalPayload.action = addProposalValue.bidDecision?.value;
    proposalPayload.status = addProposalValue.status?.value;
    proposalPayload.requestId = addProposalValue.requestId?.value;
    proposalPayload.source = addProposalValue.source?.value;
    proposalPayload.title = addProposalValue.title?.value;
    proposalPayload.agency = {
      name: addProposalValue.agencyName?.value,
      email: addProposalValue.agencyEmail?.value,
      webSite: addProposalValue.agencyWebsite?.value,
      contactNo: addProposalValue.agencyContactNo?.value,
      address: {
        line1: addProposalValue.line1?.value,
        line2: addProposalValue.line2?.value,
        line3: addProposalValue.line3?.value,
        line4: addProposalValue.line4?.value,
        city: addProposalValue.city?.value,
        country: addProposalValue.country?.value,
        pinCode: addProposalValue.postalCode?.value,
        state: addProposalValue.state?.value,
      },
    };
    proposalPayload.price = addProposalValue.contractPrice.value;
    proposalPayload.contacts = contactDetail;
    proposalPayload.type = addProposalValue.type?.value;
    proposalPayload.domain = addProposalValue.domain?.value;
    proposalPayload.subDomain = addProposalValue.subDomain?.value;
    proposalPayload.contractType = addProposalValue.contractType?.value;
    proposalPayload.submissionType = addProposalValue.submissionType?.value;
    proposalPayload.issueDate = moment(
      addProposalValue.issueDate?.value
    ).format("MM/DD/YYYY");
    proposalPayload.dueDate = moment(addProposalValue.dueDate?.value).format(
      "MM/DD/YYYY"
    );
    proposalPayload.comments = updateJoiData;
    proposalPayload.region = addProposalValue.region?.value;
    proposalPayload.ownerName = addProposalValue.owner?.value;
    proposalPayload.ownerEmail = store.getState().auth.userEmail;
    proposalPayload.complexity = addProposalValue.complexity?.value;
    await updatePropsalHandler();
  };
  const updatePropsalHandler = async () => {
    if (handleValidation()) {
      try {
        setLoading(true);
        setOpenCommentModal(false);
        await updateProposalService(proposalPayload);
        openSuccessNotification("Comment has been added in RFP successfully");
        setCommentError("");
        await viewProposalHandler();
        setLoading(false);
      } catch (error: any) {
        setCommentError("");
        setLoading(false);
        getCustomError(error);
      }
    }
  };

  const addProposal = () => {
    return (
      <AddProposal
        addProposalModal={addProposalModal}
        setAddProposalModal={setAddProposalModal}
        proposalId={proposalId}
        fetchViewProposal={viewProposalHandler}
      />
    );
  };
  const titleHeader = () => {
    return (
      <>
        <Box sx={classes.headerWrapper}>
          <IconButton>
            <CustomIcon
              icon={
                <ArrowBackIcon
                  sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                />
              }
              onClick={() => {
                if (redirectUrls === "wonProposal") {
                  history.push(
                    urls.WON_PROPOSAL_VIEW_PATH +
                      `?&searchValue=` +
                      searchValue +
                      `&page=` +
                      page
                  );
                } else if (redirectUrls === "proposal") {
                  history.push(
                    urls.PROPOSAL_VIEW_PATH +
                      `?&type=` +
                      typeData +
                      `&interval=` +
                      interval +
                      `&region=` +
                      regionData +
                      `&domain=` +
                      domainData +
                      `&status=` +
                      statusValue +
                      `&page=` +
                      page +
                      `&searchValue=` +
                      searchValue
                  );
                } else if (redirectURL === "userRfpReport") {
                  history.push(
                    urls.USER_PROPOSAL_HISTORY_REPORT +
                      `?&id=` +
                      props?.location?.state?.email,
                    {
                      region: props?.location?.state?.region,
                      domain: props?.location?.state?.domain,
                      status: props?.location?.state?.status,
                      page: props?.location?.state?.page,
                      type: props?.location?.state?.type,
                      dateTo: props?.location?.state?.dateTo,
                      dateFrom: props?.location?.state?.dateFrom,
                    }
                  );
                } else if (redirectURL === "duerfp") {
                  history.push(
                    urls.DUE_PROPOSAL_VIEW_PATH +
                      `?&page=` +
                      page +
                      `&searchValue=` +
                      searchValue
                  );
                } else if (redirectURL === "lostrfp") {
                  history.push(
                    urls.LEARNING_VIEW_PATH +
                      `?&page=` +
                      page +
                      `&searchValue=` +
                      searchValue
                  );
                } else {
                  history.push(urls.PROPOSAL_VIEW_PATH);
                }
              }}
            />
          </IconButton>
          <Typography
            variant="h2"
            sx={{ color: bgcolor ? "white" : "#000000" }}
          >
            {viewData?.title}
          </Typography>
        </Box>
      </>
    );
  };
  const handleOpenAddModal = () => {
    viewProposalHandler();
    setAddProposalModal(true);
  };

  const handleExportTemplate = () => {
    if (selectedResponse?.length > 0) {
      setOpenModalTemplate(true);
    } else {
      openWarningNotification("Please select at least one response");
    }
  };
  const headerSectionViewer = () => {
    return (
      <>
        <Grid container mt={1}>
          <Grid
            item
            xl={9.5}
            lg={9.5}
            xs={12}
            sm={12}
            md={12}
            sx={classes.viewProposalheader}
            style={{
              border: bgcolor
                ? `1.5px dashed ${semiTransparentWhite}`
                : `1.5px dashed ${semiTransparentBlack}`,
            }}
          >
            <Grid container xl={12} lg={12} md={12} px={3} py={2}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box display={"flex"}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Domain :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.domain}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Solicitation :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.requestId}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Complexity Level:
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.complexity}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                mt={{ xl: 0, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Box display={"flex"}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Status :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.status}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Source :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.source}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Type :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.type}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                mt={{ xl: 0, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Box display={"flex"}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Competition Type :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.competitionType}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Created By :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {createdByUser}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.textStyleHeader
                        : classes.textStyleHeader1
                    }
                    variant="h5"
                  >
                    Assigned To :
                  </Typography>
                  <Typography
                    sx={
                      bgcolor
                        ? classes.innerTextHeader
                        : classes.innerTextHeader1
                    }
                    variant="h5"
                  >
                    {viewData?.ownerName}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            sm={6}
            md={2}
            lg={2}
            xl={2}
            mt={{ xl: 0, lg: 0, md: 1, sm: 1, xs: 1 }}
            ml={{ xl: 5, lg: 2 }}
          >
            {tabWiseIconHandler()}
          </Grid>
        </Grid>
      </>
    );
  };

  const generalTabIconHandler = () => {
    return (
      <>
        <Grid container gap={0.5}>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <CustomIcon
              icon={
                <img
                  src={RightSignIcon}
                  alt="AddTaskIcon"
                  style={{ cursor: "pointer" }}
                />
              }
              onClick={() => {
                setOpenModal(true);
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#373854" }}
              >
                Add Task
              </Typography>
            </Box>
          </Grid>
          {doesLoggedInUserHasAccessToResource(
            strings.UPDATE,
            strings.PROPOSAL
          ) && (
            <>
              <Grid
                item
                sm={12}
                sx={{ display: "flex", justifyContent: "start" }}
              >
                <CustomIcon
                  icon={
                    <img
                      src={EditProposalIcon}
                      alt="EditProposalIcon"
                      style={{ cursor: "pointer" }}
                    />
                  }
                  onClick={() => handleOpenAddModal()}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: bgcolor ? "white" : "#373854" }}
                  >
                    Edit RFP
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                sm={12}
                sx={{ display: "flex", justifyContent: "start" }}
              >
                <CustomIcon
                  icon={
                    <img
                      src={AddCommentIcon}
                      alt="AddCommentIcon"
                      style={{ cursor: "pointer" }}
                    />
                  }
                  onClick={() => {
                    setOpenCommentModal(true);
                  }}
                />
                <Box
                  sx={{ display: "flex", alignItems: "center", margin: "10px" }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: bgcolor ? "white" : "#373854" }}
                  >
                    Add Comment
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  };

  const addTaskModal = () => {
    return (
      <>
        <AddTaskModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handlerSave={() => {}}
          viewProposalData={viewData}
          viewProposalHandler={viewProposalHandler}
        />
      </>
    );
  };

  const addCommentModal = () => {
    return (
      <>
        <AddCommentModal
          openModal={openCommentModal}
          setOpenModal={setOpenCommentModal}
          handlerSave={collectUpdateProposalData}
          setAddProposalValue={setAddProposalValue}
          addProposalValue={addProposalValue}
          commentError={commentError}
          setCommentError={setCommentError}
        />
      </>
    );
  };

  // add document modal

  const responseTabIconHandler = () => {
    return (
      <>
        <Grid container gap={0.5}>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <CustomIcon
              icon={<img src={addContent} alt="addContent" />}
              onClick={() => setOpenResponse(true)}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Add Response
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <Box
              component={"div"}
              onClick={() => {
                handleExportTemplate();
              }}
            >
              <CustomIcon icon={<img src={downloadDoc} alt="addContent" />} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Select Template
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  const awardTabIconHandler = () => {
    return (
      <>
        <Grid container gap={0.5}>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <Tooltip arrow placement="top" title="Export Document">
              <CustomIcon
                icon={<img src={addContent} alt="addContent" />}
                onClick={() => awardUpdateAdd()}
              />
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Evaluation Update
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const documentTabHanlder = () => {
    return (
      <>
        <Grid container gap={0.5}>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <Tooltip arrow placement="top" title="Add New Document">
              <CustomIcon
                icon={<img src={addContent} alt="addContent" />}
                onClick={() => setOpenDocumentModal(true)}
              />
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Add Document
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <Tooltip arrow placement="top" title="Delete">
              <CustomIcon
                icon={<img src={DeleteIcon} alt="DeleteContent" />}
                onClick={() => {
                  if (selected.length === 0) {
                    openWarningNotification(
                      "Please select at least one document"
                    );
                  } else {
                    setDeleteDocumentModal(true);
                  }
                }}
              />
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Delete
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <Tooltip arrow placement="top" title="Zip Document">
              <CustomIcon
                icon={<img src={zipIcon} alt="zipIcon" />}
                onClick={() => {
                  if (selected?.length < 2) {
                    openWarningNotification(
                      "Please select at least two documents"
                    );
                  } else {
                    downloadZip();
                  }
                }}
              />
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px !important",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? "white" : "#000000" }}
              >
                Zip Document
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const tabWiseIconHandler = () => {
    switch (status) {
      case "General":
        return generalTabIconHandler();
      case "Create Response":
        return responseTabIconHandler();
      case "Documents":
        return documentTabHanlder();
      default:
        return awardTabIconHandler();
    }
  };

  const handleTabs = (tabVal: string) => {
    setStatus(tabVal);
  };

  const isSelected = (id: any) => {
    const findValue = selected.map((item: any) => item.id);
    return findValue.indexOf(id) !== -1;
  };

  const singleCheckboxHandler = (event: any, row: any) => {
    const selectedCheckBoxValue: any[] = [];
    if (isSelected(row.id)) {
      const removeSelectedArrayValue = selected?.filter((element: any) => {
        return element.id !== row.id;
      });
      setSelected(removeSelectedArrayValue);
    } else {
      if (event?.target?.checked) {
        selectedCheckBoxValue.push(...selected, {
          id: row.id,
          path: row.path.tooltip,
        });
        setSelected(selectedCheckBoxValue);
      }
    }
  };

  const selectAllCheckBoxHandler = (event: any, tableData: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = tableData.map((item: any) => {
        return {
          id: item.id,
          path: item.path,
        };
      });
      setSelected(newSelected);
      checkBoxValue.push(...selected, ...newSelected);
      setSelected(checkBoxValue);
      return;
    }
    let newSelected = tableData.map((item: any) => item.id);
    let unCheckSelectAll = selected?.filter(
      (item: any) => !newSelected.includes(item.id)
    );
    setSelected(unCheckSelectAll);
  };

  const downloadZip = async () => {
    try {
      const transformedData = selected.map((item: any) => ({
        id: item.id,
        path: item.path,
      }));
      setLoading(true);
      const res = await downloadZipDocument(transformedData);
      let a = document.createElement("a");
      // @ts-ignore
      a.style = "display:none";
      let url = window.URL.createObjectURL(res);
      a.href = url;
      a.click();
      // @ts-ignore
      window.URL.revokeObjectURL(url);
      a.remove();
      setSelected([]);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const deleteDocumentHandler = async () => {
    const transformedData = selected.map((item: any) => ({
      id: item.id,
      path: item.path,
    }));

    try {
      setLoading(true);
      for (const item of transformedData) {
        await deleteDocument(item);
        openSuccessNotification("Document has been deleted successfully");
      }
      await setDocumnetTableDataFetch(!documnetTableDataFetch);
      setSelected([]);
      setDeleteDocumentModal(false);
      setLoading(false);
    } catch (error: any) {
      setDeleteDocumentModal(true);
      setLoading(false);
      getCustomError(error);
    }
  };
  const awardUpdateAdd = () => {
    setAddProposalAward(true);
  };
  const updateAddAward = () => {
    return (
      <>
        <AwradUpdateAdd
          data={viewData}
          setOpenModalAward={setAddProposalAward}
          openModalAward={addProposalAward}
          proposalId={proposalId}
          viewProposalHandler={viewProposalHandler}
          viewTabData={viewTabData}
          setEvaluationTableData={setEvaluationTableData}
          viewEvaluationTable={viewEvaluationTable}
        />
      </>
    );
  };

  const documentDeleteModalHandler = () => {
    return (
      <>
        <DeleteDocumentModal
          openDeleteModal={deleteDocumentModal}
          setOpenDeleteModal={setDeleteDocumentModal}
          handleDeleteSubmit={deleteDocumentHandler}
        />
      </>
    );
  };

  const viewTabData = () => {
    switch (status) {
      case "General":
        return <GeneralTab data={viewData} />;
      case "Create Response":
        return (
          <ResponseTab
            setOpenResponse={setOpenResponse}
            response={openModalResponse}
            selectedResponse={selectedResponse}
            setOpenModalTemplate={setOpenModalTemplate}
            openModalTemplate={openModalTemplate}
            viewData={viewData}
            setSelectedResponse={setSelectedResponse}
            responseSelect={responseSelect}
            setTemplateData={setTemplateData}
            templateData={templateData}
            searchValue={searchValue}
            page={page}
            statusValue={statusValue}
            domainData={domainData}
            regionData={regionData}
            interval={interval}
            typeData={typeData}
            redirect={redirectUrls}
          />
        );
      case "Documents":
        return (
          <DocumentTab
            isSelected={isSelected}
            selected={selected}
            selectAllCheckBoxHandler={selectAllCheckBoxHandler}
            singleCheckboxHandler={singleCheckboxHandler}
            openDocumentModal={openDocumentModal}
            setOpenDocumentModal={setOpenDocumentModal}
            viewData={viewData}
            documnetTableDataFetch={documnetTableDataFetch}
            Status={viewData?.status}
          />
        );
      case "Evaluation Update":
        return (
          <AwardUpdateTab
            data={viewData}
            evaluationTableData={evaluationTableData}
            addProposalAward={addProposalAward}
            viewEvaluationTable={viewEvaluationTable}
            proposalId={proposalId}
          />
        );
      default:
        break;
    }
  };

  const customTabs = () => {
    return (
      <>
        <Box sx={{ borderBottom: "0.8px solid #7A81FD", marginTop: "20px" }}>
          <CustomTabs
            changeValue={handleTabs}
            sx={classes.button}
            selected={status}
            tabConfig={tasksTabContent}
            classes={{ width: "100%" }}
            width={classes.tabWidth1}
          />
        </Box>
        {viewTabData()}
      </>
    );
  };
  return (
    <>
      <Box mt={11} ml={2.5} mr={2.5}>
        <Box>{titleHeader()}</Box>
        {headerSectionViewer()}
        {customTabs()}
        {addProposal()}
        {updateAddAward()}
        {addTaskModal()}
        {addCommentModal()}
        {documentDeleteModalHandler()}
        <CustomLoader isLoading={loading} />
      </Box>
    </>
  );
};

export default React.memo(ViewProposal);
