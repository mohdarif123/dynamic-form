import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Stack, Avatar, Tooltip } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomTable,
} from "global/components";
import EditIcon from "@mui/icons-material/Edit";
import { initalField } from "./AwardUpdateTabTypes";
import { isTruthy } from "helpers/methods";

import CustomLoader from "global/components/CustomLoader/CustomLoader";
import ViewProposalStyles from "./ViewProposal.styles";
import view from "assets/icons/viewdoc.svg";
import moment from "moment";
import {
  downloadDocument,
  fetchDocumentProposal,
  viewDocumentProposal,
} from "../AddProposal/AddProposal.service";
import notifiers from "global/constants/NotificationConstants";
import strings from "global/constants/StringConstants";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import download from "assets/icons/download.svg";
import NoData from "global/components/NoData/NoData";
import {
  cornflowerBlueColor,
  primaryBlackColor,
  pureWhiteColor,
  semiTransparentBlack,
  semiTransparentWhite,
} from "utils/styles";
import { getCustomError } from "utils/customError";
interface AwardProps {
  data: any;
  fetchDocumentHandler?: any;
  evaluationTableData?: any;
  addProposalAward?: any;
  viewEvaluationTable?: any;
  proposalId?: any;
}
const AwardUpdateTab = (props: AwardProps) => {
  const classes = ViewProposalStyles;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [evaluationTableData, setEvaluationTableData] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [tableData, setTableData] = useState<any>([]);
  const [formField, setFormField] = useState<any>(initalField(props?.data));
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [uploadedDocumentFileExtension, setUploadedDocumentFileExtension] =
    useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const websiteRegex = strings.websiteRegex;
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
  };
  const pageVisited = (page - 1) * pageSize;
  const displayRows = props?.data?.proposalEvaluation?.comments?.slice(
    pageVisited,
    pageVisited + pageSize
  );

  useEffect(() => {
    fetchDocumentHandler();
  }, [!props.addProposalAward]);

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
        tags: null,
        issueDate: "",
        expiryDate: "",
        expiryMandatory: null,
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

  const handleClose = () => {
    setShowDialog!(false);
  };
  const getDialogTitle = () => {
    return (
      <Typography variant="h2" sx={{ color: bgcolor ? "#ffffff" : "#ffffff" }}>
        View File
      </Typography>
    );
  };
  const fetchDocumentHandler = async () => {
    try {
      setLoading(true);
      const res = await fetchDocumentProposal(props.proposalId);
      setEvaluationTableData(res);
      const finalTableData = res
        .filter(
          (item: any) =>
            item.type === "Email" ||
            item.type === "Debrief" ||
            item.type === "Bid Tabulation" ||
            item.type === "Other"
        )
        .map((item: any, index: any) => {
          return {
            issueDate: {
              component: item.issueDate
                ? moment(item.issueDate).format("MM/DD/YYYY")
                : item.issueDate,
            },
            expiryDate: {
              component: item.expiryDate
                ? moment(item.expiryDate).format("MM/DD/YYYY")
                : item.expiryDate,
            },
            id: { tooltip: item.id },
            title: { tooltip: item.title },
            type: { tooltip: item.type },
            path: { tooltip: item.path },
            action: {
              component: (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ cursor: "pointer" }}>
                      <Tooltip title="View" placement="top" arrow>
                        <CustomIcon
                          icon={<img src={view} alt="view" />}
                          onClick={() => {
                            handlerViewDocument(item);
                          }}
                        />
                      </Tooltip>
                    </Box>
                    <Box ml={2}>
                      <Tooltip title="Download" placement="top" arrow>
                        <CustomIcon
                          icon={<img src={download} alt="Download" />}
                          onClick={() => handleDownload(item)}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </>
              ),
            },
          };
        });
      setTableData(finalTableData);
      setLoading(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const edit = () => {
    return (
      <>
        {!editMode && (
          <>
            <Box
              pt={1}
              display={"flex"}
              justifyContent={"flex-end"}
              alignContent={"flex-end"}
              mb={2}
              mr={4}
            >
              <CustomButton
                customClasses={{
                  width: "10%",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setEditMode(true)}
                label={
                  !props?.data?.proposalEvaluation?.title ? "Create" : "Edit"
                }
                icon={<EditIcon />}
              />
            </Box>
          </>
        )}
      </>
    );
  };
  const answerData = (items: any) => {
    const text = items;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 60 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items.length > 50) {
      truncatedString = text.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = text;
    }
    return truncatedString;
  };
  const agencyInformationScreen = () => {
    return (
      <>
        <Box sx={classes.innerBoxCard}>
          <Box
            sx={{
              ...classes.innerWrapper,
              borderBottom: bgcolor
                ? `1.5px dashed ${semiTransparentWhite}`
                : `1.5px dashed ${semiTransparentBlack}`,
            }}
          >
            <Typography
              sx={bgcolor ? classes.awardTextStyle : classes.awardTextStyle1}
              variant="h2"
            >
              Agency Information
            </Typography>
          </Box>
          <Box sx={{ padding: "0 10px 10px 10px" }} mt={4}>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Agency Name :
              </Typography>
              <Typography
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                variant="h5"
              >
                {props?.data?.agency?.name}
              </Typography>
            </Box>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Agency Web :
              </Typography>
              <Typography
                sx={{
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                  wordBreak: "break-all",
                }}
                variant="h5"
              >
                {props?.data?.agency?.webSite}
              </Typography>
            </Box>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Address :
              </Typography>
              <Typography
                sx={{
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                  wordBreak: "break-all",
                }}
                variant="h5"
              >
                {props?.data?.agency?.address?.line1}
              </Typography>
            </Box>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                City :
              </Typography>
              <Typography
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                variant="h5"
              >
                {props?.data?.agency?.address?.city}
              </Typography>
            </Box>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Country :
              </Typography>
              <Typography
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                variant="h5"
              >
                {props?.data?.agency?.address?.country}
              </Typography>
            </Box>
            <Box sx={classes.innerTextBox}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Zip Code :
              </Typography>
              <Typography
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                variant="h5"
              >
                {props?.data?.agency?.address?.pinCode}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const rfpInformationScreen = () => {
    return (
      <>
        <Box sx={classes.innerBoxCard}>
          <Box
            sx={{
              ...classes.innerWrapper,
              borderBottom: bgcolor
                ? `1.5px dashed ${semiTransparentWhite}`
                : `1.5px dashed ${semiTransparentBlack}`,
            }}
          >
            <Typography
              sx={bgcolor ? classes.awardTextStyle : classes.awardTextStyle1}
              variant="h2"
            >
              RFP Information
            </Typography>
          </Box>
          <Box sx={{ padding: "0 10px 10px 10px" }} mt={4}>
            <Box display={"flex"} mt={1}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Title :
              </Typography>
              <Typography
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                variant="h5"
              >
                {props?.data?.proposalEvaluation?.title}
              </Typography>
            </Box>
            <Box display={"flex"} mt={2}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Contract Details Urls :
              </Typography>
              <Typography
                sx={{
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                  wordBreak: "break-all",
                }}
                variant="h5"
              >
                {props?.data?.proposalEvaluation?.contractDetailsUrl &&
                  answerData(
                    props?.data?.proposalEvaluation?.contractDetailsUrl
                  )}
              </Typography>
            </Box>
            <Box display={"flex"} mt={2}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Contract Price :
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
              >
                {props?.data?.proposalEvaluation?.price}
              </Typography>
            </Box>
            <Box display={"flex"} mt={2}>
              <Typography
                sx={bgcolor ? classes.innerTextStye : classes.innerTextStye1}
                variant="h5"
              >
                Lost Reason :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                  wordBreak: "break-all",
                }}
              >
                {props?.data?.proposalEvaluation?.reason}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  const commentTableData = () => {
    const data = displayRows?.map((item: any, index: number) => {
      const text = document.createElement("div");
      text.innerHTML = item?.text;
      return {
        by: {
          component: (
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
                    sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
                    variant="h4"
                    pl={1}
                  >
                    {item.by}
                  </Typography>
                </Box>
              </Box>
            </>
          ),
        },
        on: {
          component: (
            <>
              <Box>
                <Typography
                  sx={{
                    fontSize: "",
                    fontWeight: 400,
                    marginLeft: 4,
                    color: bgcolor ? "#ffffff" : "#000000",
                  }}
                  variant="h5"
                >
                  {moment(item.on).format("MM/DD/YYYY")}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      marginLeft: "10px",
                      color: "#6F7190",
                    }}
                    variant="h5"
                    component={"span"}
                  >
                    {moment(item.on).format("hh:mm:ss")}
                  </Typography>
                </Typography>
              </Box>
            </>
          ),
        },
        text: { tooltip: text.innerText },
        // by: { tooltip: item.by },
      };
    });
    return data;
  };
  const commentText = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{ color: bgcolor ? "#fff" : "#000" }}
          mb={1}
        >
          Comments
        </Typography>
      </>
    );
  };
  const evaluationText = () => {
    return (
      <>
        <Typography variant="h1" sx={{ color: bgcolor ? "#fff" : "#000000" }}>
          Documents
        </Typography>
      </>
    );
  };
  const evaluationTable = () => {
    return (
      <>
        <Box mt={2}>
          <Box sx={classes.tasksTableStyle}>
            <CustomTable
              headers={[
                {
                  name: "Source",
                  field: "type",
                },
                {
                  name: "Action",
                  field: "action",
                },
              ]}
              rows={tableData}
              tableHeaderTextStart={true}
              paginationCount={tableData?.length}
              isRowPerPageEnable={true}
              pageNumber={page}
              setPage={setPage}
              setPageSize={setPageSize}
              pageSize={pageSize}
              rowsPerPage={pageSize}
              headerData={evaluationText()}
              tooltipEnabled
            />
          </Box>
        </Box>
      </>
    );
  };
  const commentTable = () => {
    return (
      <>
        <Box mt={2}>
          <Box sx={classes.tasksTableStyle}>
            <CustomTable
              headers={[
                {
                  name: "Comment By",
                  field: "by",
                },
                {
                  name: "Comment on",
                  field: "on",
                },
                {
                  name: "Comment",
                  field: "text",
                },
              ]}
              rows={commentTableData()}
              paginationCount={
                props?.data?.proposalEvaluation?.comments?.length
              }
              tableHeaderTextStart={true}
              paginationHideShow
              isRowPerPageEnable={true}
              pageNumber={page}
              setPage={setPage}
              setPageSize={setPageSize}
              pageSize={pageSize}
              rowsPerPage={pageSize}
              headerData={commentText()}
              tooltipEnabled
            />
          </Box>
        </Box>
      </>
    );
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
  const showDialogs = () => {
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
  return (
    <>
      <>
        {!props?.data?.proposalEvaluation?.title ? (
          <Box textAlign="center">
            <NoData />
          </Box>
        ) : (
          <>
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sx={{
                background: bgcolor ? "#282945" : "#ffffff",
                borderRadius: "0 0px 36px 36px",
              }}
            >
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                sx={{
                  borderRight: `1px solid ${
                    bgcolor
                      ? "rgba(255, 255, 255, 0.18)"
                      : "rgba(0, 0, 0, 0.18)"
                  }`,
                }}
              >
                {rfpInformationScreen()}
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                {agencyInformationScreen()}
              </Grid>
            </Grid>
            {evaluationTable()}
            {commentTable()}
            {showDialogs()}
            <CustomLoader isLoading={loading} />
          </>
        )}
      </>
    </>
  );
};
export default React.memo(AwardUpdateTab);
