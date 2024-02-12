import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomTable,
} from "global/components";
import { getDocumentData } from "../ViewCompetitive/ViewCompetitiveData.service";
import { useLocation } from "react-router-dom";
import {
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import view from "assets/icons/viewdoc.svg";
import download from "assets/icons/download.svg";
import {
  deleteDocument,
  downloadDocument,
  viewDocumentProposal,
} from "../../../Proposals/AddProposal/AddProposal.service";
import AddIcon from "@mui/icons-material/Add";
import { getRelativeFontSize } from "utils/styles";
import AddDocumentModal from "../../../Proposals/Components/AddDocumentModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { getCustomError } from "utils/customError";

interface DocumentProps {
  nextStep: any;
  handleBackStep: any;
}

const DocumentAddCompetitve = (props: DocumentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [documentData, setDocumentData] = useState<any>();
  const urlParams = useLocation().search;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [page, setPage] = useState(1);
  const CompetitiveId = new URLSearchParams(urlParams).get("id");
  const [selected, setSelected] = useState<any>([]);
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [uploadedDocumentFileExtension, setUploadedDocumentFileExtension] =
    useState("");
  const pageVisited = (page - 1) * pageSize;
  const displaytable = documentData?.slice(pageVisited, pageVisited + pageSize);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [documentData] = await Promise.all([
        getDocumentData(CompetitiveId),
      ]);
      const finalTableData = documentData?.map((item: any, index: any) => {
        return {
          id: item.id,
          title: item.title,
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
      setDocumentData(finalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
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

  const addDocumentModal = () => {
    return (
      <>
        <AddDocumentModal
          openModal={openDocumentModal}
          setOpenModal={setOpenDocumentModal}
          fetchDocumentHandler={fetchData}
        />
      </>
    );
  };
  const handlerViewDocument = async (item: any) => {
    try {
      const data = {
        app: "RFP",
        path: item.path,
        status: item.status,
      };
      setIsLoading(true);
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
        setIsLoading(false);
      } else {
        setUploadedDocument(res.message);
        setShowDialog(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const handleClose = () => {
    setShowDialog!(false);
  };

  const getDialogTitle = () => {
    return (
      <Typography
        sx={{
          fontSize: getRelativeFontSize(7),
          color: bgcolor ? "#ffffff" : "#ffffff",
        }}
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
            onClick={() => setShowDialog(false)}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
          />
        </Stack>
      </Box>
    );
  };
  const handleDownload = async (item: any) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const deleteDocumentHandler = async () => {
    if (selected.length > 0) {
      try {
        setIsLoading(true);
        for (const item of selected) {
          await deleteDocument(item);
          openSuccessNotification("Document has been deleted successfully");
        }
        setIsLoading(false);
        fetchData();
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification("Please select at least one document");
    }
  };

  const tableHeaderData = () => {
    return (
      <Box display={"flex"} mb={1}>
        <Box>
          <Tooltip arrow placement="top" title="Add New Document">
            <CustomButton
              label={"Add"}
              onClick={() => setOpenDocumentModal(true)}
              icon={<AddIcon htmlColor={"#7A81FD"} />}
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
            />
          </Tooltip>
        </Box>
        <Box ml={3}>
          <Tooltip arrow placement="top" title="Delete">
            <CustomButton
              label={"Delete"}
              onClick={() => deleteDocumentHandler()}
              icon={<DeleteIcon htmlColor={"#7A81FD"} />}
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
            />
          </Tooltip>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box mt={2}>
        <CustomTable
          headers={viewCompetitiveTableHeader}
          rows={displaytable}
          checkboxSelection={true}
          isRowPerPageEnable={true}
          isLoading={isLoading}
          paginationCount={documentData?.length}
          setPage={setPage}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          headerData={tableHeaderData()}
          onSelectAllClick={selectAllCheckBoxHandler}
          pageNumber={page}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handlePageChange={handleChangePage}
          rowsPerPage={pageSize}
          isSelectAll={selected.map((item: any) => item.id)}
          noDataImageHeightHide={true}
        />
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"center"}
        gap={3}
        mt={1}
      >
        <CustomButton
          label="Back"
          onClick={() => {
            props.handleBackStep();
          }}
          customClasses={{ width: "110px" }}
          buttonType={"outlined"}
        />
        <CustomButton
          label="Next"
          onClick={props.nextStep}
          customClasses={{ width: "110px" }}
          buttonType={"contained"}
        />
      </Box>
      <CustomDialog
        isDialogOpen={showDialog}
        handleDialogClose={handleClose}
        dialogHeaderContent={getDialogTitle()}
        dialogBodyContent={getDialogBody()}
        dialogFooterContent={getDialogFooter()}
        closable
        closeButtonVisibility={true}
        width="600px"
      />
      {addDocumentModal()}
      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default DocumentAddCompetitve;
