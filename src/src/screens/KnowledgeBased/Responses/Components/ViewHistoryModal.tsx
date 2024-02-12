import { CustomButton, CustomIcon } from "global/components";
import { Box, Typography } from "@mui/material";
import ModalStyle from "./Modal.Style";
import { useEffect, useState } from "react";
import { getHistoryData } from "../Responses.services";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useLocation } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getResponseData } from "./AddResponsesModal/AddResponses.services";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import JoditEditor from "jodit-react";
import ArrowRightIcon from "assets/icons/ArrowRightIcon.svg";
import ArrowLeftIcon from "assets/icons/ArrowLeftIcon.svg";
import { getCustomError } from "utils/customError";

const ViewHistoryModal = () => {
  const classes = ModalStyle;
  const [page, setPage] = useState(1);
  const urlParams = useLocation().search;
  const responseId = new URLSearchParams(urlParams).get("id");
  const [pageSize, setPageSize] = useState<number>(10);
  const [viewHistoryTableData, setViewHistoryTableData] = useState<any>([]);
  const [responseData, setResponseData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [versionValue, setVersionValue] = useState("1.0");
  const [indexValue, setIndex] = useState(0);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const userPerPage = pageSize;
  const pageVisited = (page - 1) * pageSize;
  const displayRows = viewHistoryTableData?.slice(
    pageVisited,
    pageVisited + pageSize
  );

  useEffect(() => {
    viewResponsesHandler();
  }, [responseId]);

  useEffect(() => {
    if (responseData) {
      historyModalHandler(responseId, page, responseData?.question);
    }
  }, [responseData]);
  const viewHistoryModalHeader = [
    {
      name: "Question",
      field: "question",
    },
    {
      name: "Answer",
      field: "answer",
    },
    {
      name: "Version",
      field: "number",
    },
  ];
  const viewResponsesHandler = async () => {
    try {
      setIsLoading(true);
      const [data] = await Promise.all([getResponseData(responseId)]);
      setResponseData(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const historyModalHandler = async (
    responseId: any,
    page: number,
    question: any
  ) => {
    try {
      setIsLoading(true);
      const [historyData] = await Promise.all([
        getHistoryData(responseId, page, question),
      ]);
      const formateData = convertDataToTableFormat(historyData);
      setViewHistoryTableData(formateData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const answerData = (items: any) => {
    const answertext = document.createElement("div");
    answertext.innerHTML = items.answer;
    return answertext.innerText;
  };

  const convertDataToTableFormat = (responseData: any) => {
    return responseData.map((items: any) => {
      return {
        id: { tooltip: items.id },
        question: { tooltip: items.question },
        answer: { tooltip: items.answer },
        number: { tooltip: items.number },
      };
    });
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const backButton = () => {
    return (
      <>
        <Box
          onClick={() => history.push(urls.RESPONSE_VIEW_PATH)}
          sx={{ cursor: "pointer" }}
          margin={2}
          display={"flex"}
        >
          <CustomIcon
            icon={
              <ArrowBackIcon sx={{ color: bgcolor ? "#ffffff" : "#000000" }} />
            }
          />
          <Typography
            sx={{
              fontSize: "32x",
              fontWeight: 600,
              color: bgcolor ? "#ffffff" : "#000000",
            }}
            variant="h2"
          >
            {viewHistoryTableData[indexValue]?.question?.tooltip}
          </Typography>
        </Box>
      </>
    );
  };

  const handleVersionHandler = (versionNumber: string, index: number) => {
    setVersionValue(versionNumber);
    setIndex(index);
  };

  const handleBack = () => {
    if (indexValue > 0) {
      setIndex(indexValue - 1);
    }
  };
  const handleNext = () => {
    if (indexValue < viewHistoryTableData?.length - 1) {
      setIndex(indexValue + 1);
    }
  };

  const dialogBodyContent = () => {
    return (
      <>
        <Box mt={11} px={2}>
          <Box>{backButton()}</Box>

          <Box
            sx={{
              borderRadius: "37px",
              boxShadow: "0px 8px 15px 0px rgba(0, 0, 0, 0)",
              backgroundColor: bgcolor ? "#282945" : "#ffffff",
            }}
            px={4}
            py={2}
          >
            <Box
              sx={{
                borderBottom: "1.5px dotted rgba(255, 255, 255, 0.2)",
                display: "flex",
                gap: "10px",
              }}
              py={1}
            >
              <KeyboardArrowLeftIcon
                htmlColor={bgcolor ? "#ffffff" : "#000000"}
                sx={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => handleBack()}
              />

              {viewHistoryTableData?.map((items: any, index: number) => {
                return (
                  <>
                    <CustomButton
                      onClick={() =>
                        handleVersionHandler(items?.number?.tooltip, index)
                      }
                      buttonType={
                        indexValue === index ? "contained" : "outlined"
                      }
                      label={`Version ${items?.number?.tooltip}`}
                      customClasses={{
                        width: "130px",
                        borderRadius: "110px",
                        cursor: "pointer",
                      }}
                    />
                  </>
                );
              })}

              <KeyboardArrowRightIcon
                htmlColor={bgcolor ? "#ffffff" : "#000000"}
                sx={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => handleNext()}
              />
            </Box>

            <Box mt={4}>
              <Box>
                <Box>
                  <JoditEditor
                    value={viewHistoryTableData[indexValue]?.answer?.tooltip}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                  }}
                  mt={2}
                >
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        backgroundColor:
                          indexValue > 0
                            ? "#7A81FD"
                            : "rgba(122, 129, 253, 0.24)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => handleBack()}
                    >
                      <CustomIcon
                        icon={<img src={ArrowLeftIcon} alt="ArrowLeftIcon" />}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        // background: "#7A81FD",
                        // backgroundColor:
                        //   indexValue > 0
                        //     ? "#7A81FD"
                        //     : "rgba(122, 129, 253, 0.24)",
                        backgroundColor:
                          indexValue === viewHistoryTableData.length - 1
                            ? "rgba(122, 129, 253, 0.24)"
                            : "#7A81FD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => handleNext()}
                    >
                      <CustomIcon
                        icon={<img src={ArrowRightIcon} alt="ArrowLeftIcon" />}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return dialogBodyContent();
};

export default ViewHistoryModal;
