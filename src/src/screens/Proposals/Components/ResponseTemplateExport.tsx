import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ResponseTabStyles } from "../ViewProposal/ResponseTab.styles";
import { CustomButton, CustomDialog } from "global/components";
import SSTemplate from "assets/images/softsagesRFPCoverTemplate.png";
import SSTemplateMedical from "assets/images/softSagesMedicalTemplate.png";
import SSTemplateCommon from "assets/images/softsagesRFPCommonTemplate.png";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import {
  isTruthy,
  openInfoNotification,
  openWarningNotification,
} from "helpers/methods";
import { responseExport, upload } from "../Proposals.service";
import { useLocation } from "react-router-dom";
import history from "utils/history";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import urls from "global/constants/UrlConstants";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { store } from "utils/store";
import SSTrialUserWordTemplate from "assets/images/TrialUserWordTemplate.png";
import SSTrialUserWordFrencyTemplate from "assets/images/TrialUserFrencyTemplate.png";
import { CustomIcon } from "global/components";
import exportIcon from "assets/icons/exportData.svg";
import { getCustomError } from "utils/customError";
import { Jodit } from "jodit-react";
import "jodit/build/jodit.min.css";
interface CustomProps {
  location: any;
}

const ResponseTemplateExport = (props: CustomProps) => {
  const classes = ResponseTabStyles;
  const urlParams = useLocation().search;
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const proposalId = new URLSearchParams(urlParams).get("id");
  const selectedResponse = props?.location.state?.selectedResponse;
  const interval = props?.location.state?.interval;
  const typeData = props?.location.state?.type;
  const regionData = props?.location.state?.region;
  const domainData = props?.location.state?.domain;
  const statusValue = props?.location.state?.status;
  const page = props?.location.state?.page;
  const searchValue = props?.location.state?.searchValue;
  const redirectUrls = props?.location.state?.redirect;
  const proposalTitle = props?.location.state?.title;
  const [templateData, setTemplateData] = useState("");
  const [isActiveTemplate, setIsActiveTemplate] = useState(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isActiveTemplateThrid, setIsActiveTemplateThird] = useState(false);
  const [isTrial, setIsTrial] = useState(false);
  const [isActiveTrialTemplate, setIsActiveTrialTemplate] = useState(false);
  const [isActiveBackImageTrialTemplate, setIsActiveBackImageTrialTemplate] =
    useState(false);
  const trial = store.getState().auth.trial;
  const [opneModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsTrial(trial);
  }, []);

  const headerData = () => {
    return (
      <>
        <Box
          onClick={() => handleBack()}
          sx={{ cursor: "pointer", ml: "30px" }}
        >
          <CustomIcon
            icon={
              <ArrowBackIcon sx={{ color: bgcolor ? "#ffffff" : "#000000" }} />
            }
          />
          <Typography
            sx={{
              fontSize: "32x",
              fontWeight: 400,
              color: bgcolor ? "#ffffff" : "#000000",
            }}
            variant="h6"
          >
            Back
          </Typography>
        </Box>
        <Box display={"flex"} mb={2} justifyContent={"center"}>
          <Box
            width={"400px"}
            marginLeft={{ xl: 0, lg: 0, md: 0, sm: 16, xs: 8 }}
            justifyContent={"center"}
          >
            <CustomButton
              label="List Of Templates"
              onClick={() => {}}
              buttonType={"contained"}
              customClasses={{ width: "250px", borderRadius: "10px" }}
            />
          </Box>
        </Box>
      </>
    );
  };

  const handleBack = () => {
    history.push(
      urls.VIEW_PROPOSAL_VIEW_PATH +
        `?&id=` +
        proposalId +
        `&type=` +
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
        searchValue +
        `&tabValue=` +
        `Create Response` +
        `&redirect=` +
        redirectUrls
    );
  };

  const exportWordFileWithoutTemplate = async () => {
    let content: any = "";
    for (let ans of selectedResponse) {
      content = content + ans.answer;
    }
    exportWord(content, proposalTitle);
  };
  
  const exportWordFile = async () => {
    let content: any = "";
    for (let ans of selectedResponse) {
      content = content + ans.answer;
    }
    exportWordwithTemplate(content, proposalTitle);
  };

  const exportWordwithTemplate = async (editor: Jodit, filename: string) => {
    setLoading(true);
    if (editor) {
      const preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const postHtml = "</body></html>";
      const content = editor;
      const html = preHtml + content + postHtml;
      const blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      filename = filename ? filename + ".doc" : "document.doc";

      if ((navigator as any).msSaveOrOpenBlob) {
        (navigator as any).msSaveOrOpenBlob(blob, filename);
      } else {
        const formData = new FormData();
        formData.append("file", blob, "filename.doc");
        const response = await upload(
          store.getState().auth.userEmail,
          formData
        );
      
        const exportData: any = {
          audit: {
            fromZ: new Date(),
            thruZ: new Date(),
            createdBy: "",
            updatedBy: "",
          },
          content: selectedResponse,
          order: 0,
          proposalId: proposalId,
          templateName: templateData,
          docPath: response.path,
        };
        await responseExport(exportData, proposalTitle);
        let a = document.createElement("a");
        // @ts-ignore
        a.style = "display:none";
        a.click();
        a.remove();
        history.push(
          urls.VIEW_PROPOSAL_VIEW_PATH +
            `?&id=` +
            proposalId +
            `&type=` +
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
            searchValue +
            `&redirect=` +
            redirectUrls
        );
        setLoading(false);
      }
    } else {
      getCustomError("JoditEditor instance not found");
      setLoading(false);
    }
  };

  const exportWord = async (editor: Jodit, filename: string) => {
    setLoading(true);
    if (editor) {
      const preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const postHtml = "</body></html>";
      const content = editor;
      const html = preHtml + content + postHtml;
      const blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      filename = filename ? filename + ".doc" : "document.doc";

      if ((navigator as any).msSaveOrOpenBlob) {
        (navigator as any).msSaveOrOpenBlob(blob, filename);
      } else {
        const downloadLink = document.createElement("a");
        downloadLink.href =
          "data:application/vnd.ms-word;charset=utf-8," +
          encodeURIComponent(html);
       
        downloadLink.download = filename || "mergedDocument.doc";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      history.push(
        urls.VIEW_PROPOSAL_VIEW_PATH +
          `?&id=` +
          proposalId +
          `&type=` +
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
          searchValue +
          `&redirect=` +
          redirectUrls
      );
      setOpenModal(false);
      setLoading(false);
    } else {
      getCustomError("JoditEditor instance not found");
      setLoading(false);
    }
  };

  const exportData = async () => {
    if (selectedResponse.length > 0) {
      if (templateData === "") {
        setOpenModal(true);
      } else {
        exportWordFile();
      }
    } else {
      openWarningNotification("Please select at least one document");
    }
  };

  const handleWordTemplate = () => {
    setIsActive(false);
    setIsActiveTemplate(true);
    setIsActiveTemplateThird(false);
    setTemplateData("WordTemplate.docx");
  };

  const handleWordTemplateTrial = () => {
    setIsActive(false);
    setIsActiveTemplate(false);
    setIsActiveTemplateThird(false);
    setIsActiveTrialTemplate(true);
    setIsActiveBackImageTrialTemplate(false);
    setTemplateData("TrialUserWordTempate.docx");
  };

  const handleWordTemplateBackImageTrial = () => {
    setIsActive(false);
    setIsActiveTemplate(false);
    setIsActiveTemplateThird(false);
    setIsActiveTrialTemplate(false);
    setIsActiveBackImageTrialTemplate(true);
    setTemplateData("TiralWordtemplateFrency.docx");
  };

  const handleWordTemplateRFPMedical = () => {
    setIsActiveTemplate(false);
    setIsActive(true);
    setIsActiveTemplateThird(false);
    setTemplateData("RFPResponseMedicalTemplate.docx");
  };

  const handleWordTemplateCommon = () => {
    setIsActive(false);
    setIsActiveTemplate(false);
    setIsActiveTemplateThird(true);
    setTemplateData("RFPCommonTemplate.docx");
  };

  const handleClose = () => {
    setOpenModal!(false);
  };

  const dialogContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon icon={<img src={exportIcon} alt="exportIcon" />} />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Without Template Export RFP
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Are you sure want to export the response without template?
          </Typography>
        </Box>
      </>
    );
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Grid container>
          <Box sx={classes.dialogFooter}>
            <CustomButton
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
              label="No"
              onClick={handleClose}
            />
            <CustomButton
              label="Yes"
              onClick={() => exportWordFileWithoutTemplate()}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const responseData = () => {
    return (
      <>
        <Grid container justifyContent={"center"}>
          {isTrial || window.location.hostname === urls.DEMO_HOSTNAME ? (
            <>
              <Grid item xl={4} lg={4.6} md={6}>
                <Box sx={{ margin: "25px 25px 25px 50px" }}>
                  <Card sx={classes.card}>
                    <Box
                      sx={classes.cardBox}
                      component="img"
                      src={SSTrialUserWordTemplate}
                      onClick={() => {
                        handleWordTemplateTrial();
                      }}
                      height={isActiveTrialTemplate ? "410px" : "430px"}
                      width={isActiveTrialTemplate ? "350px" : "370px"}
                      border={
                        isActiveTrialTemplate
                          ? "10px solid rgb(122, 129, 253)"
                          : ""
                      }
                      alt="Template Format Image"
                    />
                  </Card>
                  <Box mt={2} ml={5}>
                    <CustomButton
                      label={"Template One"}
                      onClick={handleWordTemplateTrial}
                      customClasses={{
                        width: "240px",
                        borderRadius: "10px",
                        backgroundColor:
                          isActiveTrialTemplate && "rgb(61,70,237) !important",
                      }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={4} lg={4.6} md={6}>
                <Box sx={{ margin: "25px 25px 25px 50px" }}>
                  <Card sx={classes.card}>
                    <Box
                      sx={classes.cardBox}
                      component="img"
                      src={SSTrialUserWordFrencyTemplate}
                      onClick={() => {
                        handleWordTemplateBackImageTrial();
                      }}
                      height={
                        isActiveBackImageTrialTemplate ? "410px" : "430px"
                      }
                      width={isActiveBackImageTrialTemplate ? "350px" : "370px"}
                      border={
                        isActiveBackImageTrialTemplate
                          ? "10px solid rgb(122, 129, 253)"
                          : ""
                      }
                      alt="Template Format Image"
                    />
                  </Card>
                  <Box mt={2} ml={5}>
                    <CustomButton
                      label={"Template Two"}
                      onClick={handleWordTemplateBackImageTrial}
                      customClasses={{
                        width: "240px",
                        borderRadius: "10px",
                        backgroundColor:
                          isActiveBackImageTrialTemplate &&
                          "rgb(61,70,237) !important",
                      }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xl={4} lg={4.6} md={6}>
                <Box sx={{ margin: "25px 25px 25px 50px" }}>
                  <Card sx={classes.card}>
                    <Box
                      sx={classes.cardBox}
                      component="img"
                      src={SSTemplate}
                      onClick={() => {
                        handleWordTemplate();
                      }}
                      height={isActiveTemplate ? "410px" : "430px"}
                      width={isActiveTemplate ? "350px" : "370px"}
                      border={
                        isActiveTemplate ? "10px solid rgb(122, 129, 253)" : ""
                      }
                      alt="Template Format Image"
                    />
                  </Card>
                  <Box mt={2} ml={5}>
                    <CustomButton
                      label={"Template One"}
                      onClick={handleWordTemplate}
                      customClasses={{
                        width: "240px",
                        borderRadius: "10px",
                        backgroundColor:
                          isActiveTemplate && "rgb(61,70,237) !important",
                      }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={4} lg={4.6} md={6}>
                <Box sx={{ margin: "25px 25px 25px 50px" }}>
                  <Card sx={classes.card}>
                    <Box
                      sx={classes.cardBox}
                      component="img"
                      border={isActive ? "10px solid rgb(122, 129, 253)" : ""}
                      onClick={() => {
                        handleWordTemplateRFPMedical();
                      }}
                      height={isActive ? "410px" : "430px"}
                      width={isActive ? "350px" : "370px"}
                      src={SSTemplateMedical}
                      alt="Template Format Image"
                    />
                  </Card>
                  <Box mt={2} ml={5}>
                    <CustomButton
                      label={"Template Two"}
                      onClick={handleWordTemplateRFPMedical}
                      customClasses={{
                        width: "250px",
                        borderRadius: "10px",
                        backgroundColor:
                          isActive && "rgb(61,70,237) !important",
                      }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={4} lg={4.6} md={6}>
                <Box sx={{ margin: "25px 25px 25px 50px" }}>
                  <Card sx={classes.card}>
                    <Box
                      sx={classes.cardBox}
                      component="img"
                      border={
                        isActiveTemplateThrid
                          ? "10px solid rgb(122, 129, 253)"
                          : ""
                      }
                      height={isActiveTemplateThrid ? "410px" : "430px"}
                      width={isActiveTemplateThrid ? "350px" : "370px"}
                      onClick={() => {
                        handleWordTemplateCommon();
                      }}
                      src={SSTemplateCommon}
                      alt="Template Format Image"
                    />
                  </Card>

                  <Box mt={2} ml={5}>
                    <CustomButton
                      label={"Template Three"}
                      onClick={handleWordTemplateCommon}
                      customClasses={{
                        width: "250px",
                        borderRadius: "10px",
                        backgroundColor:
                          isActiveTemplateThrid && "rgb(61,70,237) !important",
                      }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        <CustomDialog
          isDialogOpen={opneModal}
          closable
          handleDialogClose={handleClose}
          dialogBodyContent={dialogContent()}
          dialogFooterContent={dialogFooterContent()}
          width="460px"
          borderRadius="33px"
          closeButtonVisibility
        />
      </>
    );
  };

  const exportDataButton = () => {
    return (
      <>
        <Box mt={5} display={"flex"} justifyContent={"center"}>
          <CustomButton
            label="Export"
            onClick={() => exportData()}
            buttonType={"contained"}
            customClasses={{ width: "150px", borderRadius: "10px" }}
          />
        </Box>
      </>
    );
  };
  const responseView = () => {
    return (
      <>
        <Box mt={11}>
          {headerData()}
          {responseData()}
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            If you do not want to select any of the given templates, you can
            directly click on Export button
          </Typography>
          {exportDataButton()}
        </Box>
        <CustomLoader isLoading={loading} />
      </>
    );
  };
  return responseView();
};

export default React.memo(ResponseTemplateExport);
