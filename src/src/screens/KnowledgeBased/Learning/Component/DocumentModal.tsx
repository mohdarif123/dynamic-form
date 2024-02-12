import { Box, Stack, Tooltip, Typography } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomTable,
} from "global/components";
import { useEffect, useState } from "react";
import view from "assets/icons/viewdoc.svg";
import download from "assets/icons/download.svg";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { downloadDocument, viewDocumentProposal } from "../Learning.services";
import { getRelativeFontSize } from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { getCustomError } from "utils/customError";

interface CustomProps {
  data: any;
  setDocumentModal?: any;
  documentModal?: any;
  indexDocument?: any;
}
const DocumentModal = (props: CustomProps) => {
  const [tableData, setTable] = useState<any>();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedDocument, setUploadedDocument] = useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);
  const documentHeader = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Type",
      field: "type",
    },
    { name: "Action", field: "action" },
  ];
  useEffect(() => {
    setTable(convertDataToTableFormat(props.data));
  }, []);
  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
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
  const handlerViewDocument = async (item: any) => {
    try {
      const data = {
        app: "RFP",
        path: item.path,
        status: item.status,
      };
      setLoading(true);
      const res = await viewDocumentProposal(data);
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
  const convertDataToTableFormat = (data: any) => {
    return data[props.indexDocument]?.documents?.tooltip?.map(
      (items: any, index: any) => {
        return {
          title: items.title,
          type: (
            <Typography
              onClick={() => {}}
              variant="h6"
              sx={{ cursor: "pointer" }}
            >
              {items.type}
            </Typography>
          ),
          action: (
            <Box sx={{ display: "flex" }}>
              <Box>
                <Tooltip title="View" placement="top" arrow>
                  <CustomIcon
                    icon={<img src={view} alt="view" />}
                    onClick={() => {
                      handlerViewDocument(items);
                    }}
                  />
                </Tooltip>
              </Box>
              <Box sx={{ marginLeft: "5px" }}>
                <Tooltip title="Download" placement="top" arrow>
                  <CustomIcon
                    icon={<img src={download} alt="view" />}
                    onClick={() => {
                      handleDownload(items);
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          ),
        };
      }
    );
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

  const getDocumentStatusTitle = () => {
    return (
      <Typography
        sx={{
          fontSize: getRelativeFontSize(7),
          color: bgcolor ? "#ffffff" : "#ffffff",
        }}
      >
        Document Status
      </Typography>
    );
  };
  const handleClose = () => {
    setShowDialog!(false);
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
  const handleCloseModel = () => {
    props.setDocumentModal(false);
  };
  const documentData = () => {
    return (
      <CustomTable
        headers={documentHeader}
        rows={convertDataToTableFormat(props.data)}
        isRowPerPageEnable={true}
        paginationHideShow={true}
        tableRowsDataCenter={true}
      />
    );
  };
  const customDialog = () => {
    return (
      <>
        <CustomDialog
          isDialogOpen={props.documentModal}
          closable
          handleDialogClose={handleCloseModel}
          dialogBodyContent={documentData()}
          dialogHeaderContent={getDocumentStatusTitle()}
          width="600px"
          hideBgColor
          closeButtonVisibility
          borderRadius="33px"
        />
        <CustomDialog
          isDialogOpen={showDialog}
          handleDialogClose={handleClose}
          dialogBodyContent={getDialogBody()}
          dialogFooterContent={getDialogFooter()}
          dialogHeaderContent={getDialogTitle()}
          closable
          closeButtonVisibility={true}
          width="600px"
          borderRadius="33px"
        />
        <CustomLoader isLoading={loading} />
      </>
    );
  };
  return customDialog();
};
export default DocumentModal;
