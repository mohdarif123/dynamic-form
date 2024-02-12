import React, { useEffect, useState } from "react";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import LearningStyle from "./Learning.styles";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CustomButton, CustomInput, CustomTable } from "global/components";
import AddIcon from "@mui/icons-material/Add";
import { initialState } from "./LearningDataAndTypes";
import notifiers from "global/constants/NotificationConstants";
import { debounceEventHandler, handleSort, isTruthy } from "helpers/methods";
import {
  getDomainData,
  getReason,
  getRegionData,
  getSearchData,
  leaningData,
  learningCount,
  learningCountSearch,
} from "./Learning.services";
import SearchIcon from "@mui/icons-material/Search";
import { primaryBlackColor, pureWhiteColor, sidebarColor } from "utils/styles";
import LearningViewModal from "./Component/LearningViewModal";
import strings from "global/constants/StringConstants";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useTitle } from "utils/UseTitle";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import ExportModal from "./LostRfpReportExport";
import DocumentModal from "./Component/DocumentModal";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { getCustomError } from "utils/customError";

const Learning: React.FC<any> = () => {
  useTitle(strings.LEARNING);
  const classes = LearningStyle;
  const urlParams = useLocation().search;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [exportModal, setExportModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const [regionValue, setRegionValue] = useState<any>([]);
  const [domainValue, setDomainValue] = useState<any>([]);
  const currentPage = new URLSearchParams(urlParams).get("page") || 1;
  const searchValueData = new URLSearchParams(urlParams).get("searchValue");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(Number(currentPage));
  const [count, setCount] = useState(1);
  const [reason, setReason] = useState([]);
  const [searchDropdownValue, setSearchDropdownValue] = useState(
    initialState(searchValueData)
  );
  const [documentModal, setDocumentModal] = useState<any>(false);
  const [indexDocument, setIndexDocument] = useState<any>();
  const LearningHeader = [
    {
      name: "Title",
      field: "history",
    },
    {
      name: "Reason",
      field: "reason",
      dropdownType: reason,
      lostRfpReasonWidth: true,
    },
    {
      name: "Comment",
      field: "comment",
    },
    {
      name: "Region",
      field: "region",
      dropdownType: regionValue,
    },
    {
      name: "Domain",
      field: "domain",
      dropdownType: domainValue,
    },
    {
      name: "Document Status",
      field: "action",
    },
  ];
  const [dropdownValue, setdropdownValue] = useState({
    region: { value: "All" },
    domain: { value: "All" },
    reason: { value: "All" },
  });

  useEffect(() => {
    getRegionsHandler();
  }, []);

  useEffect(() => {
    if (dropdownValue.region.value) {
      getDomainHandler(dropdownValue.region.value);
    }
  }, [dropdownValue.region.value]);

  useEffect(() => {
    if (searchDropdownValue.searchValue.value) {
      getSearchHandler(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        searchDropdownValue.searchValue.value
      );
    } else {
      getLearningHandler(
        dropdownValue.region.value,
        dropdownValue.domain.value
      );
    }
  }, [searchDropdownValue.searchValue.value, dropdownValue, page, pageSize]);

  const handleOnchange = (event: any) => {
    setSearchDropdownValue({
      ...searchDropdownValue,
      [event.target.name]: {
        value: event.target.value,
      },
    });
  };
  const handleSeachOnChange = (event: any) => {
    setSearchDropdownValue({
      ...searchDropdownValue,
      searchValue: { value: event.target.value },
    });
    setPage(1);
  };
  const getLostRfpDetailsHeader = () => {
    return (
      <Typography
        sx={classes.heading}
        mb={2}
        variant="h1"
        style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
      >
        Lost RFP Details
      </Typography>
    );
  };
  const Export = () => {
    setExportModal(true);
  };
  const getButtonData = () => {
    return (
      <>
        <Box mb={1} sx={{ display: "flex", flexWrap: "wrap" }} gap={1}>
          <Box>
            <CustomButton
              label={"Export"}
              icon={<AddIcon />}
              onClick={Export}
              customClasses={{
                width: {
                  xl: "130px",
                  lg: "130px",
                  md: "130px",
                  sm: "130px",
                  xs: "260px",
                },
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
                border: !bgcolor
                  ? "1px solid #7A81FD !important"
                  : "1.5px solid #7A81FD !important",
              }}
              buttonType={"outlined"}
            />
          </Box>
          <Box>{searchData()}</Box>
        </Box>
      </>
    );
  };

  const shortData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > 15) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };

  const convertDataToTableFormat = (data: any) => {
    return data.map((items: any, index: any) => {
      return {
        title: { tooltip: items.title },
        documents: { tooltip: items.documents },
        history: {
          component: (
            <Typography
              onClick={() => handleHistory(items)}
              variant="h5"
              sx={{
                cursor: "pointer",
                fontWeight: 600,
                color: "#7A81FD",
              }}
            >
              {shortData(items.requestId)}
            </Typography>
          ),
        },
        reason: {
          tooltip: items?.proposalEvaluation?.reason,
        },
        comment: {
          component: (
            <Box
              onClick={() => {
                viewModalHandler(items);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ color: "#7A81FD" }}
              >
                {answerData(items)}
              </Typography>
            </Box>
          ),
        },
        region: { tooltip: items.region },
        domain: { tooltip: items.domain },
        action: {
          component: (
            <>
              {items?.documents && items?.documents[0]?.title ? (
                <Box
                  onClick={() => {
                    setDocumentModal(true);
                    setIndexDocument(index);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  {
                    <Box display={"flex"} gap={1}>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ color: "#7A81FD" }}
                      >
                        {shortData(items.documents[0].title)}
                      </Typography>
                    </Box>
                  }
                </Box>
              ) : (
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ color: "#7A81FD" }}
                >
                  NA
                </Typography>
              )}
            </>
          ),
        },
      };
    });
  };

  const convertAssigneeData = (data: any) => {
    return data.map((item: any, index: number) => {
      return {
        ...item,
        names: (
          <>
            <CustomTooltip item={item.name} length={true} />
          </>
        ),
        name: item.name,
      };
    });
  };

  const getRegionsHandler = async () => {
    try {
      // setIsLoading(true);
      const [region, reason] = await Promise.all([
        getRegionData(),
        getReason(),
      ]);
      setRegionValue(convertAssigneeData(handleSort(region)));
      setReason(convertAssigneeData(handleSort(reason)));
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getDomainHandler = async (regionValue: string) => {
    try {
      // setIsLoading(true);
      const domains = await getDomainData(regionValue);
      const filterDomainValue: any = _.unionBy(domains, "name");
      const filterData = convertAssigneeData(handleSort(filterDomainValue));
      setDomainValue(filterData);
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getLearningHandler = async (region: string, domain: string) => {
    try {
      setIsLoading(true);
      const [learningData, count] = await Promise.all([
        leaningData(region, domain, dropdownValue.reason.value, page, pageSize),
        learningCount(region, domain, dropdownValue.reason.value),
      ]);
      const formatedData = convertDataToTableFormat(learningData);
      setTableData(formatedData);
      setCount(count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSearchHandler = async (
    region: string,
    domain: string,
    searchValue: string
  ) => {
    try {
      setIsLoading(true);
      const [learningData, count] = await Promise.all([
        getSearchData(
          region,
          domain,
          searchValue,
          dropdownValue.reason.value,
          page,
          pageSize
        ),
        learningCountSearch(
          region,
          domain,
          searchDropdownValue.searchValue.value,
          dropdownValue.reason.value
        ),
      ]);
      const formatedData = convertDataToTableFormat(learningData);
      setTableData(formatedData);
      setCount(count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const answerData = (items: any) => {
    const answertext = document.createElement("div");
    answertext.innerHTML = items?.proposalEvaluation?.comments[0]?.text;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";

    if (items?.proposalEvaluation?.comments[0]?.text) {
      if (items?.proposalEvaluation?.comments[0]?.text?.length > 20) {
        truncatedString =
          answertext.innerText.substr(0, frontLength) + ellipsis;
      } else {
        truncatedString = answertext.innerText;
      }
    } else {
      truncatedString = "Data is not available...";
    }
    return truncatedString;
  };

  const viewModalHandler = (item: any) => {
    setOpenViewModal(true);
    setRowData(item);
  };

  const handleHistory = (data: any) => {
    history.push(
      `${urls.VIEW_PROPOSAL_VIEW_PATH}?id=` +
        data.id +
        `&searchValue=` +
        searchDropdownValue.searchValue.value +
        `&page=` +
        page +
        `&redirect=lostrfp`
    );
  };
  const getHeader = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={2.2} xl={2.2}>
            <Stack direction="column">
              <Select
                sx={classes.dropDownStyle}
                id="region"
                name="region"
                value={searchDropdownValue.region.value}
                onChange={handleOnchange}
                displayEmpty
                renderValue={() => searchDropdownValue.region.value}
              >
                {regionValue?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.name}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={2.2} xl={2.2}>
            <Stack direction="column">
              <Select
                sx={classes.dropDownStyle}
                id="domain"
                name="domain"
                onChange={handleOnchange}
                value={searchDropdownValue.domain.value}
                displayEmpty
                renderValue={() => searchDropdownValue.domain.value}
              >
                {domainValue?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.name}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={2.2} xl={2.2}>
            <CustomInput
              placeHolder="Search"
              name="searchValue"
              id="searchValue"
              sx={{ border: "1.5px solid rgb(122, 129, 253)" }}
              onChange={debounceEventHandler(
                handleOnchange,
                strings.SEARCH_TIME_OUT
              )}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#7A81FD" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const searchData = () => {
    return (
      <>
        <Box sx={classes.searchBoxWrapper}>
          <CustomInput
            placeHolder="Search"
            name="searchValue"
            id="searchValue"
            customInputClasses={{
              border: "1.5px solid rgb(122, 129, 253)",
              background: !bgcolor ? pureWhiteColor : sidebarColor,
            }}
            onChange={debounceEventHandler(
              handleSeachOnChange,
              strings.SEARCH_TIME_OUT
            )}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7A81FD" }} />
                </InputAdornment>
              ),
              disableUnderline: false,
            }}
          />
        </Box>
      </>
    );
  };
  const getTable = () => {
    return (
      <Box sx={classes.tableStyle}>
        <CustomTable
          headers={LearningHeader}
          rows={tableData}
          paginationCount={count}
          isLoading={isLoading}
          handlePageChange={handleChangePage}
          isRowPerPageEnable={true}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          setPageSize={setPageSize}
          pageNumber={page}
          pageSize={pageSize}
          rowsPerPage={pageSize}
          setPage={setPage}
          headerData={getButtonData()}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
    );
  };

  const getViewModalDialog = () => {
    return (
      <>
        <LearningViewModal
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          rowData={rowData}
        />
      </>
    );
  };
  const ExportOnclick = () => {
    return (
      <ExportModal
        setExportModal={setExportModal}
        exportModal={exportModal}
        region={dropdownValue.region.value}
        domain={dropdownValue.domain.value}
        reason={dropdownValue.reason.value}
        tableData={tableData}
      />
    );
  };
  const documentModalData = () => {
    return (
      <DocumentModal
        data={tableData}
        documentModal={documentModal}
        setDocumentModal={setDocumentModal}
        indexDocument={indexDocument}
      />
    );
  };

  const getLearning = () => {
    return (
      <>
        <Box mt={11} px={3}>
          {getLostRfpDetailsHeader()}
          {documentModalData()}
          {getTable()}
          {getViewModalDialog()}
          {ExportOnclick()}
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return getLearning();
};

export default React.memo(Learning);
