import React, { useEffect, useState } from "react";
import {
  fetchDocumentProposal,
  viewDocumentProposal,
  downloadDocument,
  updateDocumentProposal,
} from "../AddProposal/AddProposal.service";
import { useLocation } from "react-router-dom";
import { Box, Tooltip, Typography, Stack } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomTable,
} from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import view from "assets/icons/viewdoc.svg";
import download from "assets/icons/download.svg";
import edit from "assets/icons/Edit.svg";
import { getRelativeFontSize } from "utils/styles";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import AddDocumentModal from "../Components/AddDocumentModal";
import moment from "moment";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import ViewProposalStyles from "./ViewProposal.styles";
import { tasksTabContent } from "../ProposalValidationType";
import { getCustomError } from "utils/customError";

interface DocumentProps {
  isSelected: any;
  selected: any;
  selectAllCheckBoxHandler: any;
  singleCheckboxHandler: any;
  openDocumentModal: any;
  setOpenDocumentModal: any;
  viewData: any;
  documnetTableDataFetch: any;
  Status?: any;
}
const filterDocumentData = (tableData: any, status: any) => {
  return tableData.filter((item: any) =>
    status == "RFP Document"
      ? item.type != "Project Agreement"
      : item.type == "Project Agreement"
  );
};

const DocumentTab = (props: DocumentProps) => {
  const classes = ViewProposalStyles;
  const [loading, setLoading] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState<any>();
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState<string>("RFP Document");
  const urlParams = useLocation().search;
  const [uploadedDocumentFileExtension, setUploadedDocumentFileExtension] =
    useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);

  const proposalId = new URLSearchParams(urlParams).get("id");
  const [tableData, setTableData] = useState<any>([]);
  const [pageSize, setPageSize] = useState<any>(10);
  const [page, setPage] = useState<any>(1);
  const userPerPage = 10;
  const pageVisited = (page - 1) * pageSize;
  const displayRows = filterDocumentData(tableData, status)?.slice(
    pageVisited,
    pageVisited + pageSize
  );
  useEffect(() => {
    if (proposalId) {
      fetchDocumentHandler();
    }
  }, [proposalId, props.documnetTableDataFetch]);
  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
  };
  const handleTabs = (tabVal: string) => {
    setStatus(tabVal);
    setPage(1);
    setPageSize(10);
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
  const fileFormate = [
    "jpeg",
    "gif",
    "png",
    "jpeg",
    "jpg",
    "pdf",
    "png",
    "txt",
  ];
  const convertTableData = (tableData: any) => {
    return tableData
      .filter(
        (item: any) =>
          item.type != "Email" &&
          item.type != "Debrief" &&
          item.type != "Bid Tabulation" &&
          item.type != "Other"
      )
      .map((item: any, index: any) => {
        return {
          issueDate: {
            component: item.issueDate ? (
              <Typography sx={{ color: bgcolor ? "#ffffff" : "#000000" }}>
                {moment(item.issueDate).format("MM/DD/YYYY")}
              </Typography>
            ) : (
              <Typography sx={{ color: bgcolor ? "#ffffff" : "#000000" }}>
                NA
              </Typography>
            ),
          },
          expiryDate: {
            component:
              item?.expiryDate && item?.expiryDate != "12/31/9999" ? (
                <Typography sx={{ color: bgcolor ? "#ffffff" : "#000000" }}>
                  {moment(item?.expiryDate).format("MM/DD/YYYY")}
                </Typography>
              ) : (
                <Typography sx={{ color: bgcolor ? "#ffffff" : "#000000" }}>
                  NA
                </Typography>
              ),
          },
          id: item.id,
          title: { tooltip: item.title },
          type: { tooltip: item.type },
          path: { tooltip: item.path },
          status: { tooltip: item.status },
          action: {
            component: (
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Tooltip title="View" placement="top" arrow>
                    <CustomIcon
                      icon={<img src={view} alt="view" />}
                      onClick={() => {
                        handlerViewDocument(item);
                      }}
                    />
                  </Tooltip>
                </Box>
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
                {item.status == "Active" &&
                  item?.type === "Project Agreement" && (
                    <Box sx={{ marginLeft: "5px" }}>
                      <Tooltip title="Update" placement="top" arrow>
                        <CustomIcon
                          icon={<img src={edit} alt="Update" />}
                          onClick={() => {
                            handlerUpdateDocument(item);
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}
              </Box>
            ),
          },
        };
      });
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
      const splitUploadPath = item.path.split(".");
      const extensionName = splitUploadPath[splitUploadPath.length - 1];
      const extensionList = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
      if (extensionList.includes(extensionName)) {
        setUploadedDocument(
          `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            res.message
          )}`
        );
        setShowDialog(true);
        setLoading(false);
      } else {
        setUploadedDocumentFileExtension(fileExtension);
        setUploadedDocument(res.message);
        setShowDialog(true);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handlerUpdateDocument = async (item: any) => {
    setUpdateItem(item);
    props.setOpenDocumentModal(true);
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

  const fetchDocumentHandler = async () => {
    try {
      setLoading(true);
      const res = await fetchDocumentProposal(proposalId);
      setTableData(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setShowDialog!(false);
  };

  const addDocumentModal = () => {
    return (
      <>
        <AddDocumentModal
          openModal={props.openDocumentModal}
          setOpenModal={props.setOpenDocumentModal}
          viewProposalData={props.viewData}
          fetchDocumentHandler={fetchDocumentHandler}
          status={props.Status}
          updateData={updateItem}
          setUpdateItem={setUpdateItem}
        />
      </>
    );
  };

  const getDialogTitle = () => {
    return (
      <Typography
        sx={{
          fontSize: getRelativeFontSize(7),
          color: bgcolor ? "#ffffff" : "#ffffff",
        }}
        variant="h5"
      >
        View File
      </Typography>
    );
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

  const selectAllCheck = (e: any) => {
    props.selectAllCheckBoxHandler(e, displayRows);
  };
  const header = () => {
    if (props.Status !== "Won" || status == "RFP Document") {
      return [
        { name: "Title", field: "title" },
        { name: "Type", field: "type" },
        { name: "Action", field: "action" },
      ];
    } else {
      return [
        { name: "Title", field: "title" },
        { name: "Type", field: "type" },
        { name: "Start Date", field: "issueDate" },
        { name: "End Date", field: "expiryDate" },
        { name: "Status", field: "status" },
        { name: "Action", field: "action" },
      ];
    }
  };

  return (
    <>
      {props.Status === "Won" && (
        <Box>
          <CustomTabs
            changeValue={handleTabs}
            sx={classes.buttonDocumentTab}
            selected={status}
            tabConfig={tasksTabContent}
            classes={{ width: "100%" }}
            width={classes.tabWidth1}
            borderTopHide={true}
            backgroundTabColor={true}
          />
        </Box>
      )}
      <Box>
        <CustomTable
          headers={header()}
          rows={convertTableData(displayRows)}
          paginationCount={filterDocumentData(tableData, status)?.length}
          pageNumber={page}
          handlePageChange={handleChangePage}
          rowsPerPage={pageSize}
          isRowPerPageEnable={true}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          checkboxSelection={true}
          handleClick={props.singleCheckboxHandler}
          isSelected={props.isSelected}
          onSelectAllClick={selectAllCheck}
          isSelectAll={props?.selected?.map((item: any) => item.id)}
          paginationDirection={"down"}
          headerTopLeftRightRadius={true}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
      <CustomDialog
        isDialogOpen={showDialog}
        handleDialogClose={handleClose}
        dialogBodyContent={getDialogBody()}
        dialogFooterContent={getDialogFooter()}
        dialogHeaderContent={getDialogTitle()}
        closable
        closeButtonVisibility={true}
        width="900px"
        borderRadius="33px"
      />
      {addDocumentModal()}
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(DocumentTab);
