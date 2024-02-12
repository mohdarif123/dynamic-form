import {
  Box,
  Grid,
  InputAdornment,
  List,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CustomIcon,
  CustomInput,
  CustomPaper,
  CustomTable,
} from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import React, { useEffect, useState } from "react";
import {
  getContinueWon,
  getContinueWonCount,
  getContinueWonCountSearch,
  getContinueWonSearch,
  getExpiredWon,
  getExpiredWonCount,
  getExpiredWonCountSearch,
  getExpiredWonSearch,
  getRegion,
  getState,
  getWon,
  getWonCount,
  getWonCountSearch,
  getWonSearch,
} from "./WonProposal.service";
import WonProposalsStyles from "./WonProposals.style";

import SearchIcon from "@mui/icons-material/Search";

import strings from "global/constants/StringConstants";
import { debounceEventHandler, handleSort, isTruthy } from "helpers/methods";

import notifiers from "global/constants/NotificationConstants";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useTitle } from "utils/UseTitle";
import globe from "assets/icons/Globe.svg";
import phone from "assets/icons/Phone.svg";

import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import {
  dropDownDarkForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
  sidebarColor,
} from "utils/styles";
import { useLocation } from "react-router";
import moment from "moment";
import DocumentModal from "./DocumentModal";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const dropdown: any[] = [
  {
    name: "Expired",
    field: "Expired",
  },
  {
    name: "Continue",
    field: "Continue",
  },
];
const continueInterval: any[] = [
  {
    name: "All",
    field: "0",
  },
  {
    name: "7 Days",
    field: "7",
  },
  {
    name: "15 Days",
    field: "15",
  },
  {
    name: "30 Days",
    field: "30",
  },
];
const intervalData = (interval: any) => {
  return continueInterval?.find((item: any) => {
    if (item.name === interval) {
      return item;
    }
  })?.field;
};
const WonProposals = () => {
  useTitle(strings.WONPROPOSALS);
  const classes = WonProposalsStyles;
  const urlParams = useLocation().search;
  const [regionType, setRegionType] = useState<any>([]);
  const [stateType, setStateType] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const pageValue = new URLSearchParams(urlParams).get("page") || 1;
  const [indexDocument, setIndexDocument] = useState<any>();
  const regionData = new URLSearchParams(urlParams).get("region");
  const stateData = new URLSearchParams(urlParams).get("state");
  const interval = new URLSearchParams(urlParams).get("interval");
  const searchValue = new URLSearchParams(urlParams).get("searchValue") || "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(Number(pageValue));
  const [dropdownValue, setDropdownValue] = useState<any>(
    interval ? "Continue" : "All"
  );
  const [continueIntervalValue, setcontinueIntervalValue] = useState<any>(
    interval ? intervalData(interval) : "0"
  );
  const [tableCount, setTableCount] = useState<number>(0);
  const [dropdownSelectValue, setDropdownSelectValue] = useState<any>({
    region: { value: regionData ?? "All" },
    state: { value: stateData ?? "All" },
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTxt, setSearchTxt] = useState<string>(searchValue);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [documentModal, setDocumentModal] = useState<any>(false);
  const wonProposalsTableHeader: any[] = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Agency",
      field: "agency",
    },
    {
      name: "Region",
      field: "region",
      dropdownType: regionType,
    },
    {
      name: "State",
      field: "state",
      dropdownType:
        dropdownSelectValue.region.value !== "All"
          ? stateType
          : [{ names: "All", name: "All" }],
    },
    {
      name: "Domain",
      field: "domain",
    },
    {
      name: "Document Status",
      field: "action",
    },
  ];

  useEffect(() => {
    if (searchTxt) {
      if (dropdownValue === "Expired") {
        getExpiredWonDataSearch();
      }
      if (dropdownValue === "Continue") {
        getContinueWonDataSearch();
      }
      if (dropdownValue === "All") {
        getWonDataSearch();
      }
    } else {
      if (dropdownValue === "Expired") {
        getExpiredWonData();
      }
      if (dropdownValue === "Continue") {
        getContinueWonData();
      }
      if (dropdownValue === "All") {
        getWonData();
      }
    }
  }, [
    page,
    searchTxt,
    pageSize,
    dropdownValue,
    dropdownSelectValue,
    continueIntervalValue,
  ]);

  useEffect(() => {
    getRegionData();
  }, []);

  useEffect(() => {
    setDropdownSelectValue({
      ...dropdownSelectValue,
      state: { value: "All" },
    });
    if (dropdownSelectValue.region.value) {
      getStateData();
    }
  }, [dropdownSelectValue.region.value]);

  const getContactDetail = React.useCallback((item) => {
    window.open(`tel:${item}`, "_self");
  }, []);

  const expiryDateValue = (date: any) => {
    const date1 = moment(date).format("DD-MM-YYYY");
    const date2 = moment().format("DD-MM-YYYY");
    const diff = moment(date1, "DD-MM-YYYY").diff(moment(date2, "DD-MM-YYYY"));
    const diffDuration = moment.duration(diff);
    const daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffInMonths = diffDuration.months();
    const monthsDifference = Math.floor(daysDifference / 30);
    const remainingDays = daysDifference % 30;
    const diffInDays = diffDuration.days();
    return {
      days: diffInDays,
      month: diffInMonths,
      monthsDifference: monthsDifference,
      remainingDays: remainingDays,
      daysDifference: daysDifference,
    };
  };

  const dueDateConverter = (date: any) => {
    const dueDate = moment(date).format("MMM DD,YYYY");

    return (
      <CustomPaper className={classes.assigneePaper}>
        <Box
          sx={
            bgcolor ? classes.ViewPopOverWrapper : classes.ViewPopOverWrapper1
          }
        >
          <Box sx={classes.popOverListItem}>
            <List sx={classes.popOverListItem}>
              <Typography
                variant="subtitle2"
                sx={{ ml: 1, color: bgcolor ? "#ffffff" : "#000000" }}
              >
                {dueDate}
              </Typography>
            </List>
          </Box>
        </Box>
      </CustomPaper>
    );
  };

  const convertDataToTableFormat = (data: any) => {
    return data.map((items: any, index: any) => {
      return {
        documents: { tooltip: items?.documents },
        domain: { tooltip: items.domain },
        state: { tooltip: items.agency?.address?.state },
        region: { tooltip: items.region },
        type: { tooltip: items.type },
        contractType: { tooltip: items.contractType },
        agency: { tooltip: items.agency.name },
        action: {
          component: (
            <>
              <Box
                onClick={() => {
                  setDocumentModal(true);
                  setIndexDocument(index);
                }}
                sx={{ cursor: "pointer" }}
              >
                {items?.documents?.length > 0 &&
                items.documents[0]?.expiryDate ? (
                  <Tooltip
                    title={dueDateConverter(items.documents[0].expiryDate)}
                    arrow
                    placement="left"
                    componentsProps={{
                      tooltip: { sx: { background: "none" } },
                    }}
                  >
                    {expiryDateValue(items.documents[0].expiryDate)
                      .daysDifference > 0 &&
                    expiryDateValue(items.documents[0].expiryDate)
                      .daysDifference > 0 ? (
                      <Box display={"flex"} gap={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: "rgb(122, 129, 253)",
                          }}
                        >
                          {`Expires in
                          ${
                            expiryDateValue(items.documents[0].expiryDate)
                              .daysDifference <= 90
                              ? `${
                                  expiryDateValue(items.documents[0].expiryDate)
                                    .daysDifference
                                } ${
                                  -expiryDateValue(
                                    items.documents[0].expiryDate
                                  ).daysDifference == 1 ||
                                  expiryDateValue(items.documents[0].expiryDate)
                                    .daysDifference == 1
                                    ? "Day"
                                    : "Days"
                                }`
                              : `${
                                  expiryDateValue(items.documents[0].expiryDate)
                                    .monthsDifference
                                } month
                                `
                          }
                           `}
                        </Typography>
                      </Box>
                    ) : (
                      <Box display={"flex"} gap={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: "rgb(122, 129, 253)",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 600,
                              color: "red",
                            }}
                            component={"span"}
                          >
                            Expired
                          </Typography>
                          {`
                          ${
                            expiryDateValue(items.documents[0].expiryDate)
                              .daysDifference >= -90
                              ? `${
                                  expiryDateValue(items.documents[0].expiryDate)
                                    .daysDifference < 0
                                    ? -expiryDateValue(
                                        items.documents[0].expiryDate
                                      ).daysDifference
                                    : expiryDateValue(
                                        items.documents[0].expiryDate
                                      ).daysDifference
                                }
                                ${
                                  -expiryDateValue(
                                    items.documents[0].expiryDate
                                  ).daysDifference == 1 ||
                                  expiryDateValue(items.documents[0].expiryDate)
                                    .daysDifference == 1
                                    ? "Day"
                                    : "Days"
                                }`
                              : `${-expiryDateValue(
                                  items.documents[0].expiryDate
                                ).monthsDifference} month 
                                `
                          }`}
                        </Typography>
                      </Box>
                    )}
                  </Tooltip>
                ) : (
                  ""
                )}
              </Box>
            </>
          ),
        },

        title: { component: redirectToProposalEdit(items) },
        contacts: {
          component: (
            <>
              <Box display={"flex"} gap={3}>
                {items?.agency?.webSite && (
                  <Box
                    onClick={() => {
                      window.open(`${items.agency.webSite}`, "_blank");
                    }}
                  >
                    {<CustomIcon icon={<img src={globe} alt="globe" />} />}
                  </Box>
                )}
                {items.contacts.length > 0 && (
                  <CustomIcon
                    icon={<img src={phone} alt="phone" />}
                    onClick={() => getContactDetail(items.contacts)}
                  />
                )}
              </Box>
            </>
          ),
        },
      };
    });
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value) {
      setSearchTxt(value?.trim());
    } else {
      setSearchTxt("");
    }
  };

  const getExpiredWonData = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getExpiredWon(
          pageSize,
          page,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
        getExpiredWonCount(
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getWonData = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getWon(
          pageSize,
          page,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
        getWonCount(
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getContinueWonData = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getContinueWon(
          pageSize,
          page,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value,
          continueIntervalValue
        ),
        getContinueWonCount(
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value,
          continueIntervalValue
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const convertAssigneeData = (data: any) => {
    return data.map((item: any, index: number) => {
      return {
        ...item,
        names: (
          <>
            <CustomTooltip item={item.name} />
          </>
        ),
        name: item.name,
      };
    });
  };

  const convertStateData = (data: any) => {
    return data.map((item: any, index: number) => {
      return {
        names: (
          <>
            <CustomTooltip item={item} />
          </>
        ),
        name: item,
      };
    });
  };

  const getRegionData = async () => {
    try {
      setIsLoading(true);
      const region = await getRegion();
      setRegionType(convertAssigneeData(handleSort(region)));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getStateData = async () => {
    try {
      setIsLoading(true);
      const state = await getState(dropdownSelectValue.region.value);
      setStateType(convertStateData(state));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getWonDataSearch = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getWonSearch(
          pageSize,
          page,
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
        getWonCountSearch(
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getExpiredWonDataSearch = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getExpiredWonSearch(
          pageSize,
          page,
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
        getExpiredWonCountSearch(
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getContinueWonDataSearch = async () => {
    try {
      setIsLoading(true);
      const [wonProposalTableData, count] = await Promise.all([
        getContinueWonSearch(
          pageSize,
          page,
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value,
          continueIntervalValue
        ),
        getContinueWonCountSearch(
          searchTxt,
          dropdownSelectValue.region.value,
          dropdownSelectValue.state.value,
          continueIntervalValue
        ),
      ]);
      setTableCount(count);
      setTableData(wonProposalTableData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleClick = (event: any, data: any) => {
    event.preventDefault();

    const documentID = data.id;

    if (event.ctrlKey) {
      window.open(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}`, "_blank");
    } else {
      history.push(
        `${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}` +
          `&searchValue=` +
          searchTxt +
          `&page=` +
          page +
          `&redirect=` +
          "wonProposal"
      );
    }
  };

  const answerData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 30 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > 30) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };

  const redirectToProposalEdit = (items: any) => {
    return (
      <>
        <Box sx={{ cursor: "pointer" }}>
          <Typography
            onClick={(e: any) => {
              handleClick(e, items);
            }}
            variant="h5"
            sx={{ fontWeight: 600, color: "#7A81FD" }}
          >
            {answerData(items.title)}
          </Typography>
        </Box>
      </>
    );
  };

  const handleOnchange = (event: any) => {
    setDropdownValue(event?.target.value);
  };
  const handleOnchangeInterval = (event: any) => {
    setcontinueIntervalValue(event?.target.value);
  };
  const dropDownData = () => {
    return (
      <>
        <Select
          id="region"
          name="region"
          onChange={handleOnchange}
          value={dropdownValue}
          sx={{
            ...(!bgcolor ? classes.dropdonwLightStyle : dropDownDarkForSx),
            border: "1.5px solid rgb(122, 129, 253)",
          }}
          style={{
            background: !bgcolor ? pureWhiteColor : sidebarColor,
          }}
          MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
          renderValue={() => (
            <Typography
              sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
              variant="h4"
            >
              {dropdownValue || "Select Region"}
            </Typography>
          )}
          displayEmpty
        >
          <MenuItem
            value={"All"}
            sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
          >
            <Typography variant="subtitle1">All</Typography>
          </MenuItem>
          {dropdown?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              value={item.name}
              sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
            >
              <Typography variant="subtitle1">{item.name}</Typography>
            </MenuItem>
          ))}
        </Select>
        {dropdownValue == "Continue" && (
          <Select
            id="continueIntervalValue"
            name="continueIntervalValue"
            onChange={handleOnchangeInterval}
            value={continueIntervalValue}
            sx={{
              ...(!bgcolor ? classes.dropdonwLightStyle : dropDownDarkForSx),
              border: "1.5px solid rgb(122, 129, 253)",
            }}
            style={{
              background: !bgcolor ? pureWhiteColor : sidebarColor,
            }}
            MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
            renderValue={() => (
              <Typography
                sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                variant="h4"
              >
                {
                  continueInterval?.find((item: any) => {
                    if (item.field == continueIntervalValue) {
                      return item;
                    }
                  })?.name
                }
              </Typography>
            )}
            displayEmpty
          >
            {continueInterval?.map((item: any, index: number) => (
              <MenuItem
                key={index}
                value={item.field}
                sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
              >
                <Typography variant="subtitle1">{item.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        )}
      </>
    );
  };
  const headerData = () => {
    return (
      <>
        <Box
          sx={{ flexWrap: "wrap", display: "flex", width: "100%" }}
          mb={1}
          gap={0.7}
        >
          <Box
            width={
              dropdownValue == "Continue"
                ? "370px"
                : {
                    xs: "250px",
                    sm: "180px",
                    md: "180px",
                    lg: "180px",
                    xl: "180px",
                  }
            }
            sx={{
              [`@media screen and (max-width: ${323}px)`]: {
                width: "190px",
              },
            }}
            display={"flex"}
            gap={dropdownValue == "Continue" ? 1 : 0}
          >
            {dropDownData()}
          </Box>
          <Box sx={classes.searchWrapper}>{searchData()}</Box>
        </Box>
      </>
    );
  };
  const searchData = () => {
    return (
      <>
        <CustomInput
          placeHolder="Search"
          name="searchValue"
          id="searchValue"
          sx={{
            width: {
              xs: "280px",
              sm: "190px",
              md: "200px",
              lg: "200px",
              xl: "230px",
            },
          }}
          customInputClasses={{
            border: "1.5px solid rgb(122, 129, 253)",
            background: !bgcolor ? pureWhiteColor : sidebarColor,
          }}
          onChange={debounceEventHandler(handleChange, strings.SEARCH_TIME_OUT)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#7A81FD" }} />
              </InputAdornment>
            ),
            disableUnderline: false,
          }}
        />
      </>
    );
  };
  const tableHandler = () => {
    return (
      <>
        <Box sx={classes.tableStyle}>
          <CustomTable
            headers={wonProposalsTableHeader}
            rows={convertDataToTableFormat(tableData)}
            isRowPerPageEnable={true}
            pageNumber={page}
            paginationCount={tableCount}
            isLoading={isLoading}
            setPage={setPage}
            headerData={headerData()}
            setPageSize={setPageSize}
            pageSize={pageSize}
            rowsPerPage={pageSize}
            setdropdownValue={setDropdownSelectValue}
            dropdownValue={dropdownSelectValue}
            tooltipEnabled
            tableHeaderTextStart
          />
        </Box>
      </>
    );
  };
  const documentModalData = () => {
    return (
      <DocumentModal
        data={convertDataToTableFormat(tableData)}
        documentModal={documentModal}
        setDocumentModal={setDocumentModal}
        indexDocument={indexDocument}
      />
    );
  };
  const usersHeaders = () => {
    return (
      <Typography
        variant="h1"
        style={{
          color: !bgcolor ? "black" : "white",
        }}
        mb={2}
      >
        Won RFPs
      </Typography>
    );
  };
  return (
    <>
      <Box px={3} mt={11}>
        {usersHeaders()}
        {tableHandler()}
        {documentModalData()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};
export default React.memo(WonProposals);
