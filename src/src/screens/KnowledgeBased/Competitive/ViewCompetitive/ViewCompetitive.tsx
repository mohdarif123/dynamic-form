import {
  Box,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import CompetitiveStyle from "../Competitive.styel";
import {
  isTruthy,
  openSuccessNotification,
  openInfoNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  getCompetitiveData,
  getDocumentData,
} from "./ViewCompetitiveData.service";
import view from "assets/icons/viewdoc.svg";
import download from "assets/icons/download.svg";
import { useLocation } from "react-router-dom";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomTable,
} from "global/components";
import EditProposalIcon from "assets/icons/EditProposalIcon.svg";
import AddIcon from "assets/icons/AddIcon.svg";
import DeleteIcon from "assets/icons/deletedoc.svg";
import AddDocumentModal from "./AddDocumentModel";
import { deleteDocument, downloadDocument } from "../Competitive.service";
import history from "utils/history";
import { viewDocumentProposal } from "../../../Proposals/AddProposal/AddProposal.service";
import {
  cornflowerBlueColor,
  primaryBlackColor,
  pureWhiteColor,
} from "utils/styles";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import ViewDeleteModal from "../Component/ViewDeleteModal";
import AddCompetitives from "../AddCpmpetitive/AddCompettitve";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import urls from "global/constants/UrlConstants";
import { getCustomError } from "utils/customError";

const ViewCompettitive = () => {
  useTitle(strings.COMPETITIVE);
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isLoading, setIsLoading] = useState(false);
  const urlParams = useLocation().search;
  const [showDialog, setShowDialog] = useState(false);
  const CompetitiveId = new URLSearchParams(urlParams).get("id");
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageComment, setPageComment] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editCompetitiveModal, setEditCompetitiveModal] = useState<any>(false);
  const [editId, setEditId] = useState<any>();
  const [competitiveData, setCompetitiveData] = useState<any>();
  const [documentData, setDocumentData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSizeComment, setPageSizeComment] = useState<number>(10);
  const userPerPage = 10;
  const pageVisited = (page - 1) * pageSize;
  const displaytable = documentData?.slice(pageVisited, pageVisited + pageSize);
  const pageVisitedComment = (pageComment - 1) * pageSizeComment;
  const displaytableComment = competitiveData?.comments?.slice(
    pageVisitedComment,
    pageVisitedComment + pageSizeComment
  );
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [uploadedDocumentFileExtension, setUploadedDocumentFileExtension] =
    useState("");
  const [selected, setSelected] = useState<any>([]);
  const viewCompetitiveTableHeader: any[] = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Type",
      field: "type",
    },
    {
      name: "Action",
      field: "action",
    },
  ];

  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangePageComment = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageComment(newPage);
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
        });
        setSelected(selectedCheckBoxValue);
      }
    }
  };
  const selectAllCheckBoxHandler = (event: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = documentData.map((item: any) => {
        return {
          id: item.id,
        };
      });
      setSelected(newSelected);
      checkBoxValue.push(...selected, ...newSelected);
      setSelected(checkBoxValue);
      return;
    }
    let newSelected = documentData.map((item: any) => item.id);
    let unCheckSelectAll = selected?.filter(
      (item: any) => !newSelected.includes(item.id)
    );
    setSelected(unCheckSelectAll);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const [response, documentData] = await Promise.all([
        getCompetitiveData(CompetitiveId),
        getDocumentData(CompetitiveId),
      ]);
      setCompetitiveData(response);
      setDocumentData(documentData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const commentTableData = (comment: any) => {
    return comment?.map((item: any, index: number) => {
      const text = document.createElement("div");
      text.innerHTML = item.text;
      return {
        by: (
          <>
            <Box display={"flex"} alignItems={"center"}>
              <Box>
                <Avatar
                  sx={{
                    background: cornflowerBlueColor,
                    textTransform: "capitalize",
                  }}
                >
                  {item?.by?.charAt(0)}
                </Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{ color: bgcolor ? "#ffffff" : "000000" }}
                  variant="h4"
                  pl={1}
                >
                  {item.by}
                </Typography>
              </Box>
            </Box>
          </>
        ),

        on: (
          <Box>
            <Typography
              sx={{
                fontSize: "",
                fontWeight: 400,
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              variant="h5"
            >
              {moment(item.on).format("MM/DD/YYYY")}
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#6F7190",
                  marginLeft: "10px",
                }}
                variant="h5"
              >
                {moment(item.on).format("hh:mm:ss")}
              </Typography>
            </Typography>
          </Box>
        ),
        text: (
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "#ffffff" : "000000",
              wordBreak: "break-all",
            }}
          >
            {text.innerText}
          </Typography>
        ),
        // by: item.by,
      };
    });
  };

  const convertDOcumentData = (documentData: any) => {
    return documentData?.map((item: any, index: any) => {
      return {
        id: item.id,
        title: item.title,
        comments: item.comments,
        type: item.type,
        path: item.path,
        action: (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="View" placement="top" arrow>
              <CustomIcon
                icon={<img src={view} alt="view" />}
                onClick={() => {
                  handlerViewDocument(item);
                }}
              />
            </Tooltip>
            <Box sx={{ marginLeft: "5px" }}>
              <Tooltip title="Download" placement="top" arrow>
                <CustomIcon
                  icon={<img src={download} alt="Download" />}
                  onClick={() => {
                    handleDownload(item);
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        ),
      };
    });
  };
  const getDocumentValue = async () => {
    try {
      setLoading(true);
      const [documentData] = await Promise.all([
        getDocumentData(CompetitiveId),
      ]);
      setDocumentData(documentData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const deleteHandler = () => {
    if (selected.length > 0) {
      setOpenDeleteModal(true);
    } else {
      openWarningNotification("Please select at least one document");
    }
  };
  const deleteDocumentHandler = async () => {
    if (selected.length > 0) {
      try {
        setLoading(true);
        for (const item of selected) {
          await deleteDocument(item);
          openSuccessNotification("Document has been deleted successfully");
          getDocumentValue();
        }
        setOpenDeleteModal(false);
        setSelected([]);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setOpenDeleteModal(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification("Please select at least one document");
    }
  };
  const handlerViewDocument = async (item: any) => {
    try {
      const data = {
        app: "RFP",
        path: item.path,
        status: item.status,
      };
      setLoading(true);
      const res = await viewDocumentProposal(data);
      const fileExtension = getFileExtension(res.message);
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
            res.message
          )}`
        );
        setShowDialog(true);
        setLoading(false);
      } else {
        setUploadedDocument(res.message);
        setShowDialog(true);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleClose = () => {
    setShowDialog!(false);
  };
  const getDialogFooter = () => {
    return (
      <Box
        sx={{
          width: "95px",
        }}
      >
        <Stack direction="row" justifyContent="center">
          <CustomButton
            label={"Close"}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
            onClick={() => setShowDialog(false)}
          />
        </Stack>
      </Box>
    );
  };
  const titleHeader = () => {
    return (
      <>
        <Box sx={classes.headerWrapper}>
          <IconButton>
            <CustomIcon
              onClick={() => history.push(urls.COMPETITIVE_VIEW_PATH)}
              icon={
                <ArrowBackIcon
                  sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                />
              }
            />
          </IconButton>
          <Typography
            sx={{ color: !bgcolor ? primaryBlackColor : "white" }}
            variant="h2"
          >
            {competitiveData?.title}
          </Typography>
        </Box>
      </>
    );
  };
  const addTaskModal = () => {
    return <></>;
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
  const getDialogTitle = () => {
    return (
      <Typography variant="h2" sx={{ color: bgcolor ? "#ffffff" : "#ffffff" }}>
        View File
      </Typography>
    );
  };
  const handleDownload = async (item: any) => {
    try {
      setLoading(true);
      const data = {
        id: null,
        app: "RFP",
        type: null,
        audit: null,
        title: item.title,
        status: item.status,
        ownerId: null,
        ownerEmail: null,
        ownerName: null,
        ownerType: null,
        contextId: null,
        path: item.path,
        metadata: null,
        content: null,
        tagss: null,
        issueDate: "",
        expiryDate: "",
        expriyMandatory: null,
        issueMandatory: null,
      };
      const res = await downloadDocument(data);
      let file: any = document.createElement("a");
      file.style = "display:none";
      let url = window.URL.createObjectURL(res);
      file.href = url;
      file.download = item.path.replace(`${item.ownerId}_`, "");
      file.click();
      // @ts-ignore
      window.URL.revokeObjectURL(url);
      file.remove();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const showDialoge = () => {
    return (
      <>
        <CustomDialog
          isDialogOpen={showDialog}
          handleDialogClose={handleClose}
          dialogHeaderContent={getDialogTitle()}
          dialogBodyContent={getDialogBody()}
          dialogFooterContent={getDialogFooter()}
          closable
          closeButtonVisibility={true}
          width="600px"
          borderRadius="33px"
        />
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ViewDeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          handleDeleteSubmit={deleteDocumentHandler}
        />
      </>
    );
  };
  const editCompetitiveModalOpen = (e: any) => {
    setEditId(CompetitiveId);
    setEditCompetitiveModal(true);
  };
  const genralTabIconHandler = () => {
    return (
      <>
        <Grid container gap={0.5}>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <CustomIcon
              icon={
                <img
                  src={AddIcon}
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
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                Add Document
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <CustomIcon
              icon={
                <img
                  src={EditProposalIcon}
                  alt="editIcon"
                  style={{ cursor: "pointer" }}
                />
              }
              onClick={(e: any) => editCompetitiveModalOpen(e)}
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
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                Edit Comparison
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "start" }}>
            <CustomIcon
              icon={<img src={DeleteIcon} alt="DeleteContent" />}
              onClick={() => deleteHandler()}
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
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                Delete
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  const headerSectionViewer = () => {
    return (
      <>
        <Grid container mt={0.5}>
          <Grid
            item
            xl={9.5}
            lg={9.5}
            xs={12}
            sm={12}
            md={12}
            sx={classes.viewHeaderStyle}
            style={{
              border: !bgcolor ? "1.2px dashed #373854" : "1.2px dashed white",
            }}
          >
            <Grid container xl={12} lg={12} md={12} px={3} py={2}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box display={"flex"}>
                  <Typography
                    variant="h5"
                    sx={classes.titleStyleheading}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    Solicitation
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={classes.normalStyleheader}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    : {competitiveData?.requestId}
                  </Typography>
                </Box>
                <Box display={"flex"} mt={1.3}>
                  <Typography
                    variant="h5"
                    sx={classes.titleStyleheading}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    Source
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={classes.normalStyleheader}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    : {competitiveData?.source}
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
                    variant="h5"
                    sx={classes.titleStyleheading}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    Domain
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={classes.normalStyleheader}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    : {competitiveData?.domain}
                  </Typography>
                </Box>
                <Box display={"flex"}>
                  <Typography
                    variant="h5"
                    sx={classes.titleStyleheading}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    Type
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={classes.normalStyleheader}
                    style={{ color: !bgcolor ? primaryBlackColor : "white" }}
                  >
                    : {competitiveData?.type}
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
            {genralTabIconHandler()}
          </Grid>
        </Grid>
      </>
    );
  };

  const bodyData = () => {
    return (
      <>
        <Grid
          sx={{
            background: !bgcolor ? pureWhiteColor : "#282945",
            borderRadius: "36px",
          }}
          mt={2}
          container
        >
          <Grid
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            sx={{
              borderRight: !bgcolor
                ? "1px solid #D1D1DB"
                : "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <Box
              sx={classes.innerWrapper}
              style={{ borderTopLeftRadius: "36px" }}
            >
              {" "}
              <Typography sx={classes.titleBody} variant="h2">
                Agency Information
              </Typography>
            </Box>

            <Box display={"flex"} mt={2} ml={2}>
              <Typography
                sx={classes.titleStyleBody}
                variant="h5"
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                Name
              </Typography>
              <Typography
                variant="h5"
                sx={classes.titleInnerBody}
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                : {competitiveData?.title}
              </Typography>
            </Box>
            <Box display={"flex"} mt={2} ml={2}>
              <Typography
                sx={classes.titleStyleBody}
                variant="h5"
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
              >
                Address
              </Typography>
              <Typography
                variant="h5"
                ml={1}
                style={{
                  wordBreak: "break-all",
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                }}
              >
                :{" "}
                {competitiveData?.agency?.address === undefined
                  ? ""
                  : `${competitiveData?.agency?.address?.line1}
                ${competitiveData?.agency?.address?.line2}
                ${competitiveData?.agency?.address?.line3}
                ${competitiveData?.agency?.address?.city}
                ${competitiveData?.agency?.address?.state}
                ${competitiveData?.agency?.address?.pinCode}
                ${competitiveData?.agency.address.country}`}
              </Typography>
            </Box>
          </Grid>
          <Grid
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.18)" }}
          >
            <Box
              sx={classes.innerWrapper}
              style={{ borderTopRightRadius: "36px" }}
            >
              <Typography sx={classes.titleBody} variant="h2">
                Document
              </Typography>
            </Box>
            <Box sx={classes.tableWrapper}>
              <CustomTable
                headers={viewCompetitiveTableHeader}
                rows={convertDOcumentData(displaytable)}
                checkboxSelection={true}
                isRowPerPageEnable={true}
                isLoading={isLoading}
                paginationCount={documentData?.length}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleClick={singleCheckboxHandler}
                isSelected={isSelected}
                onSelectAllClick={selectAllCheckBoxHandler}
                pageNumber={page}
                handlePageChange={handleChangePage}
                rowsPerPage={pageSize}
                paginationDirection={"down"}
                isSelectAll={selected.map((item: any) => item.id)}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const editCompetitive = () => {
    return (
      <AddCompetitives
        editComeptitiveModal={editCompetitiveModal}
        setEditCompetitiveModal={setEditCompetitiveModal}
        editId={editId}
        fetchData={fetchData}
      />
    );
  };

  const commentText = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
        >
          Comments
        </Typography>
      </>
    );
  };

  const commentTable = () => {
    return (
      <>
        <Box mt={2}>
          <Box sx={classes.tableWrapper}>
            <CustomTable
              headers={[
                {
                  name: "Comment By",
                  field: "by",
                },
                {
                  name: "Comment On",
                  field: "on",
                },
                {
                  name: "Comment",
                  field: "text",
                },
              ]}
              headerData={commentText()}
              rows={commentTableData(displaytableComment)}
              paginationCount={competitiveData?.comments?.length}
              isRowPerPageEnable={true}
              pageNumber={pageComment}
              setPage={setPageComment}
              setPageSize={setPageSizeComment}
              pageSize={pageSizeComment}
              handlePageChange={handleChangePageComment}
              rowsPerPage={pageSizeComment}
              tableHeaderTextStart
            />
          </Box>
        </Box>
      </>
    );
  };
  const addDocumentModal = () => {
    return (
      <>
        <AddDocumentModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handlerSave={() => {}}
          viewProposalData={competitiveData}
          viewProposalHandler={fetchData}
        />
      </>
    );
  };

  const ViewCompetitiveData = () => {
    return (
      <>
        <Box sx={classes.mainWrapper} ml={2.5} mr={2.5}>
          {titleHeader()}
          {headerSectionViewer()}
          {bodyData()}
          {commentTable()}
          {addTaskModal()}
          {addDocumentModal()}
          {showDialoge()}
          {DeleteModal()}
          {editCompetitive()}
          <CustomLoader isLoading={loading} />
        </Box>
      </>
    );
  };
  return ViewCompetitiveData();
};
export default ViewCompettitive;
