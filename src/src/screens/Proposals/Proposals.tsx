import {
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import SearchIcon from "@mui/icons-material/Search";
import ProposalStyles from "./Proppsals.style";
import {
  CustomButton,
  CustomInput,
  CustomTable,
  CustomIcon,
} from "global/components";
import AddIcon from "@mui/icons-material/Add";
import {
  getProposalAction,
  getProposalDomain,
  getProposalRegion,
  getProposalContract,
  getProposalDomainAll,
  getProposalStatus,
  getProposalSubmission,
  getProposalTableCount,
  getProposalTableData,
  getProposalTypes,
  deleteProps,
  followUpProposal,
  getProposalSearch,
  getProposalSearchCount,
  getProposalTableDataByDateRange,
  getProposalTableCountByDateRange,
} from "./Proposals.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CycloneIcon from "@mui/icons-material/Cyclone";
import ServiceAgencyModel from "./Components/ServiceAgencyModal";
import {
  debounceEventHandler,
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import TitleModel from "./Components/TitleDataModal";
import notifiers from "global/constants/NotificationConstants";
import _ from "lodash";
import ViewCallDetailModel from "./Components/ViewCallDetailsModal";
import { useLocation } from "react-router-dom";
import strings from "global/constants/StringConstants";
import { useTitle } from "utils/UseTitle";
import DeleteModal from "./Components/DeleteModal";
import { doesLoggedInUserHasAccessToResource } from "utils/AuthorizationManager";
import moment from "moment";
import AddProposal from "./AddProposal/AddProposal";
import {
  menuPropsDarkStyle,
  menuPropsLightStyle,
  dropDownDarkForSx,
  dropDownLightForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  selectBgDark,
  selectBgLight,
  primaryBlackColor,
  pureWhiteColor,
  sidebarColor,
} from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { CustomDateRange } from "../UserRFPReports/UserRFPReports.Type";
import { weekValue } from "../Dashboard/DashboardData";
import { getUser } from "../Dashboard/Dashboard.service";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const Proposals: React.FC<any> = () => {
  useTitle(strings.PROPOSALS);
  const classes = ProposalStyles;
  const urlParams = useLocation().search;
  const [addProposalModal, setAddProposalModal] = useState<any>(false);
  const [rfpCloneTableRowData, setRfpCloneTableRowData] = useState();
  const actionNo = new URLSearchParams(urlParams).get("action");
  const toDate = new URLSearchParams(urlParams).get("to");
  const fromDate = new URLSearchParams(urlParams).get("from");
  const typeData = new URLSearchParams(urlParams).get("type");
  const regionData = new URLSearchParams(urlParams).get("region");
  const domainData = new URLSearchParams(urlParams).get("domain");
  const status = new URLSearchParams(urlParams).get("status");
  const ownerName = new URLSearchParams(urlParams).get("ownerName");
  const month = new URLSearchParams(urlParams).get("month");
  const weekFromDate = new URLSearchParams(urlParams).get("fromDate");
  const weekToDate = new URLSearchParams(urlParams).get("toDate");
  const year = new URLSearchParams(urlParams).get("year");
  const [pageSize, setPageSize] = useState<number>(10);
  const interVal = new URLSearchParams(urlParams).get("interval");
  const subDomainData = new URLSearchParams(urlParams).get("subDomain");
  const contractValue = new URLSearchParams(urlParams).get("contract");
  const submissionValue = new URLSearchParams(urlParams).get("submission");
  const createdValueData = new URLSearchParams(urlParams).get("createdValue");
  const currentPage = new URLSearchParams(urlParams).get("page") || 1;
  const searchValueData = new URLSearchParams(urlParams).get("searchValue");
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [monthValue, setMonthValue] = useState<any>(month);
  const [yearValue, setYearValue] = useState<any>(year);
  const [actionType, setActionType] = useState<any>([]);
  const [domainType, setDomianType] = useState<any>([]);
  const [regionType, setRegionType] = useState<any>([]);
  const [contratType, setContractType] = useState<any>([]);
  const [domainAllType, setDomainAllType] = useState<any>([]);
  const [statusType, setStatusType] = useState<any>([]);
  const [submissionType, setSubmissionType] = useState<any>([]);
  const [tableCount, setTableCount] = useState<number>(0);
  const [typeValue, setTypeValue] = useState([]);
  const [page, setPage] = useState(Number(currentPage));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTitleModal, setOpenTitleModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const initialState: any = {
    fromDate:
      fromDate ??
      moment().subtract(10, "year").format("L").replaceAll("/", "-"),
    toDate: toDate ?? moment().format("L").replaceAll("/", "-"),
  };
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [dropdownValue, setdropdownValue] = useState({
    region: { value: regionData ?? "All" },
    domain: { value: domainData ?? "All" },
    type: { value: typeData ?? "All" },
    status: { value: status ?? "All" },
    ownerName: { value: ownerName ?? "All" },
  });
  const [headerInitalType, setInitalType] = useState<any>({
    createdValue: createdValueData ?? "created",
    weekDataValue: interVal ?? -1,
    type: dropdownValue?.type?.value,
    region: dropdownValue?.region?.value,
    domian: dropdownValue?.domain?.value,
    subDomain: "All",
    contract: "All",
    action: actionNo ?? "All",
    submission: "All",
    status: dropdownValue?.status?.value,
    ownerEmail: dropdownValue?.ownerName?.value,
  });
  const [dueValue, setDueValue] = useState("All");
  const [rowData, setRowData] = useState<any>();
  const [rowTitleData, setRowTitleData] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>(searchValueData ?? "");
  const [viewCallDetail, setViewCallDetail] = useState(false);
  const [callDetailData, setCallDetailData] = useState([]);
  const [searchDropdownValue, setSearchDropdownValue] = useState("yesterday");
  const [assignee, setAssignee] = useState([]);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 4;
  const proposalTableHeader: any[] = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Agency",
      field: "agency",
    },
    {
      name: "Type",
      field: "type",
      dropdownType: typeValue,
    },
    {
      name: "Region",
      field: "region",
      dropdownType: regionType,
    },
    {
      name: "Domain",
      field: "domain",
      dropdownType: domainType,
    },
    {
      name: "Due Date",
      field: "dueDate",
    },
    {
      name: "Status",
      field: "status",
      dropdownType: statusType,
    },
    {
      name: "Assigned To",
      field: "ownerName",
      dropdownType: assignee,
    },
    {
      name: "Clone RFP",
      field: "cloneRfp",
    },
  ];

  const weekMonthData = [
    {
      name: "All",
      value: -1,
    },
    {
      name: "1 Week",
      value: 7,
    },
    {
      name: "2 Weeks",
      value: 14,
    },
    {
      name: "3 Weeks",
      value: 21,
    },
    {
      name: "1 Month",
      value: 30,
    },
  ];

  const timeValue = [
    {
      name: "Yesterday",
      value: "yesterday",
    },
    {
      name: "Today",
      value: "today",
    },
    {
      name: "Month",
      value: "month",
    },
    { name: "Year", value: "year" },
  ];

  useEffect(() => {
    if (searchText) {
      handlerSearching();
    } else {
      getAssignee();
      fetchTableDataHandler();
    }
  }, [headerInitalType, page, searchText, dueValue, pageSize]);
  useEffect(() => {
    proposalApiHandler();
  }, []);

  const handleSort = (type: any) => {
    type.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    return type;
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

  const getAssignee = async () => {
    try {
      setIsLoading(true);
      const users = await getUser();
      const filterUsersValue: any = _.unionBy(users, "email");
      const data = convertAssigneeData(handleSort(filterUsersValue));
      setAssignee(data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  useEffect(() => {
    setInitalType({
      ...headerInitalType,
      type: dropdownValue?.type?.value,
      region: dropdownValue?.region?.value,
      domian: dropdownValue?.domain?.value,
      status: dropdownValue?.status?.value,
      ownerEmail: dropdownValue?.ownerName?.value,
    });
  }, [dropdownValue]);

  const deleteProposalHandler = async () => {
    try {
      setIsLoading(true);
      setOpenDeleteModal(false);
      const res = await deleteProps(selected);
      openSuccessNotification(res?.value);
      setSelected([]);
      if (searchText) {
        await handlerSearching();
      } else {
        await fetchTableDataHandler();
      }
      setIsLoading(false);
    } catch (error: any) {
      setOpenDeleteModal(false);
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const followUpProspsal = async () => {
    if (selected.length > 0) {
      try {
        setIsLoading(true);
        const res = await followUpProposal(selected);
        if (res.value) {
          openSuccessNotification(res.value);
          setSelected([]);
          setIsLoading(false);
        }
      } catch (error: any) {
        setSelected([]);
        setIsLoading(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification("Please select atleast one RFP");
    }
  };

  const fetchTableDataHandler = async () => {
    try {
      setIsLoading(true);
      if (monthValue && yearValue) {
        const date = new Date(yearValue, monthValue - 1);
        const fromDate = moment(
          new Date(date.getFullYear(), date.getMonth(), 1)
        ).format("MM-DD-YYYY");
        const toDate = moment(
          new Date(date.getFullYear(), date.getMonth() + 1, 0)
        ).format("MM-DD-YYYY");
        const [countValue, tableValuessss] = await Promise.all([
          getProposalTableCountByDateRange(
            status,
            actionNo,
            domainData,
            fromDate,
            toDate,
            regionData
          ),
          getProposalTableDataByDateRange(
            status,
            Number(page),
            actionNo,
            domainData,
            fromDate,
            toDate,
            regionData,
            pageSize
          ),
        ]);
        tableValueViewer(tableValuessss);
        setTableCount(countValue);
      } else if (weekFromDate && weekToDate) {
        const fromDate = moment(weekFromDate).format("MM-DD-YYYY");
        const toDate = moment(weekToDate).format("MM-DD-YYYY");
        const [countValue, tableValuessss] = await Promise.all([
          getProposalTableCountByDateRange(
            status,
            actionNo,
            domainData,
            fromDate,
            toDate,
            regionData
          ),
          getProposalTableDataByDateRange(
            status,
            Number(page),
            actionNo,
            domainData,
            fromDate,
            toDate,
            regionData,
            pageSize
          ),
        ]);
        tableValueViewer(tableValuessss);
        setTableCount(countValue);
      } else {
        const [countValue, tableValuessss] = await Promise.all([
          getProposalTableCount(page, headerInitalType, dueValue, dateRange),
          getProposalTableData(
            page,
            headerInitalType,
            dueValue,
            pageSize,
            dateRange
          ),
        ]);
        tableValueViewer(tableValuessss);
        setTableCount(countValue);
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const proposalApiHandler = async () => {
    try {
      setIsLoading(true);
      const [
        action,
        domain,
        region,
        contract,
        domainAll,
        status,
        submission,
        type,
      ] = await Promise.all([
        getProposalAction(),
        getProposalDomain(),
        getProposalRegion(),
        getProposalContract(),
        getProposalDomainAll(),
        getProposalStatus(),
        getProposalSubmission(),
        getProposalTypes(),
      ]);
      setActionType(action);
      setDomianType(convertAssigneeData(handleSort(domain)));
      setRegionType(convertAssigneeData(handleSort(region)));
      setContractType(contract);
      setDomainAllType(domainAll);
      setStatusType(convertAssigneeData(handleSort(status)));
      setSubmissionType(submission);
      setTypeValue(convertAssigneeData(handleSort(type)));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handlerSearching = async () => {
    try {
      setIsLoading(true);
      const [res, count] = await Promise.all([
        getProposalSearch(
          page,
          headerInitalType,
          searchText,
          pageSize,
          dateRange
        ),
        getProposalSearchCount(headerInitalType, searchText, dateRange),
      ]);
      tableValueViewer(res);
      setTableCount(count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const handleOnchange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleClick = (event: any, data: any) => {
    event.preventDefault();

    const documentID = data.id;

    if (event.ctrlKey) {
      window.open(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}`, "_blank");
    } else {
      history.push(
        `${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}` +
          `&interval=` +
          headerInitalType.weekDataValue +
          `&type=` +
          headerInitalType.type +
          `&region=` +
          headerInitalType.region +
          `&domain=` +
          headerInitalType.domian +
          `&status=` +
          headerInitalType.status +
          `&page=` +
          page +
          `&searchValue=` +
          searchText +
          `&redirect=` +
          "proposal"
      );
    }
  };

  const answerData = (items: any) => {
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

  const rfpCloneHandler = (tableRow: any) => {
    setAddProposalModal(true);
    setRfpCloneTableRowData(tableRow);
  };

  const tableValueViewer = (finalTableValue: any) => {
    const data = finalTableValue.map((item: any, index: number) => {
      return {
        id: item.id,
        agency: { tooltip: item?.agency?.name },
        title: {
          component: (
            <>
              <Box
                display={"flex"}
                alignContent={"center"}
                alignItems={"center"}
                gap={2}
                sx={{ cursor: "pointer" }}
                onClick={(e) => handleClick(e, item)}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#7A81FD",
                    }}
                  >
                    {answerData(item?.title)}
                  </Typography>
                </Box>
              </Box>
            </>
          ),
        },
        type: { tooltip: item.type },
        region: { tooltip: item.region },
        domain: { tooltip: item.domain },
        dueDate: { tooltip: item.dueDate },
        status: { tooltip: item.status },
        ownerName: { tooltip: item.ownerName },
        cloneRfp: {
          component: (
            <>
              <Box
                gap={3}
                onClick={() => rfpCloneHandler(item)}
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "7px",
                  background: "#7A81FD",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <CycloneIcon
                  htmlColor={"#ffffff"}
                  sx={{ width: "20px", height: "20px" }}
                />
              </Box>
            </>
          ),
        },
      };
    });
    setTableData(data);
  };

  const viewTitleData = React.useCallback((item) => {
    setOpenTitleModal(true);
    setRowTitleData({
      ...rowTitleData,
      title: item?.title,
      dueDate: item?.dueDate,
      issueDate: item?.issueDate,
    });
  }, []);

  const getRowData = React.useCallback((item) => {
    setOpenModal(true);
    setRowData({
      ...rowData,
      line1: item?.agency?.address?.line1,
      line2: item?.agency?.address?.line2,
      line3: item?.agency?.address?.line3,
      city: item?.agency?.address?.city,
      state: item?.agency?.address?.state,
      country: item?.agency?.address?.country,
      pinCode: item?.agency?.address?.pinCode,
    });
  }, []);

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value) {
      setSearchText(value?.trim());
      setPage(1);
    } else {
      setSearchText("");
    }
  };

  const viewCallModal = () => {
    return (
      <>
        <ViewCallDetailModel
          setOpenModal={setViewCallDetail}
          openModal={viewCallDetail}
          item={callDetailData}
        />
      </>
    );
  };

  const customTitleDialogBox = () => {
    return (
      <>
        <TitleModel
          setOpenModal={setOpenTitleModal}
          openModal={openTitleModal}
          item={rowTitleData}
        />
      </>
    );
  };

  const deleteModalHandler = () => {
    return (
      <>
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDeleteSubmit={deleteProposalHandler}
        />
      </>
    );
  };
  const customDialogBox = () => {
    return (
      <>
        <ServiceAgencyModel
          setOpenModal={setOpenModal}
          openModal={openModal}
          item={rowData}
        />
      </>
    );
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
      const newSelected = tableData.map((item: any) => {
        return {
          id: item.id,
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

  const handleDelete = () => {
    selected.length > 0
      ? setOpenDeleteModal(true)
      : openWarningNotification("Please select at least one RFP");
  };

  const addProposal = () => {
    return (
      <AddProposal
        addProposalModal={addProposalModal}
        setAddProposalModal={setAddProposalModal}
        // proposalId={proposalId}
        rfpCloneTableRowData={rfpCloneTableRowData}
        setRfpCloneTableRowData={setRfpCloneTableRowData}
      />
    );
  };
  const headerData = () => {
    return (
      <>
        <Grid
          container
          spacing={1}
          sx={classes.buttonWrapperStyle}
          justifyContent={{ xl: "start", lg: "start", md: "start" }}
          mb={1}
        >
          {doesLoggedInUserHasAccessToResource(
            strings.ADD,
            strings.PROPOSAL
          ) && (
            <Grid item>
              {" "}
              <Box>
                <CustomButton
                  label={"Add RFP"}
                  icon={<AddIcon htmlColor="#7A81FD" />}
                  onClick={() => {
                    setAddProposalModal(true);
                  }}
                  customClasses={{
                    width: {
                      xs: "260px",
                      sm: "170px",
                      md: "140px",
                      lg: "170px",
                      xl: "170px",
                    },
                    [`@media screen and (max-width: ${320}px)`]: {
                      width: "190px",
                    },
                  }}
                  buttonType={"outlined"}
                />
              </Box>
            </Grid>
          )}
          <Grid item>
            <Box>
              <CustomButton
                label={"Follow Up"}
                icon={<FollowTheSignsIcon htmlColor="#7A81FD" />}
                onClick={() => followUpProspsal()}
                customClasses={{
                  width: {
                    xs: "260px",
                    sm: "160px",
                    md: "140px",
                    lg: "160px",
                    xl: "160px",
                  },
                  [`@media screen and (max-width: ${320}px)`]: {
                    width: "190px",
                  },
                }}
                // disabled={selected.length === 0}
                buttonType={"outlined"}
              />
            </Box>
          </Grid>
          {doesLoggedInUserHasAccessToResource(
            strings.DELETE,
            strings.PROPOSAL
          ) && (
            <Grid item>
              <Box>
                <CustomButton
                  label={"Delete"}
                  icon={<DeleteIcon htmlColor="#7A81FD" />}
                  onClick={handleDelete}
                  customClasses={{
                    width: {
                      xs: "260px",
                      sm: "140px",
                      md: "140px",
                      lg: "140px",
                      xl: "140px",
                    },
                    [`@media screen and (max-width: ${320}px)`]: {
                      width: "190px",
                    },
                  }}
                  buttonType={"outlined"}
                />
              </Box>
            </Grid>
          )}
          <Grid
            item
            sx={{
              width: {
                xs: "275px",
                sm: "190px",
                md: "200px",
                lg: "200px",
                xl: "230px",
              },
              [`@media screen and (max-width: ${320}px)`]: {
                width: "210px",
              },
            }}
          >
            <CustomInput
              placeHolder="Search"
              name="searchValue"
              id="searchValue"
              sx={{ width: "200px" }}
              customInputClasses={{
                border: "1.5px solid rgb(122, 129, 253)",
                background: !bgcolor ? pureWhiteColor : sidebarColor,
              }}
              onChange={debounceEventHandler(
                handleChange,
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
          </Grid>
          <Grid
            item
            sx={{
              width: {
                xs: "275px",
                sm: "170px",
                md: "200px",
                lg: "200px",
                xl: "200px",
              },
              [`@media screen and (max-width: ${320}px)`]: {
                width: "180px",
              },
            }}
          >
            <Select
              id="type"
              name="type"
              value={headerInitalType.weekDataValue}
              onChange={(e) => {
                setInitalType({
                  ...headerInitalType,
                  weekDataValue: parseInt(e.target.value),
                });
                setPage(1);
                setDateRange({
                  fromDate: weekValue(
                    e.target.value == "-1" ? 3650 : e.target.value
                  ),
                  toDate: moment().format("L").replaceAll("/", "-"),
                });
                setMonthValue("");
                setYearValue("");
              }}
              displayEmpty
              sx={{
                ...(!bgcolor ? dropDownLightForSx : dropDownDarkForSx),
                border: "1.5px solid rgb(122, 129, 253)",
              }}
              style={{
                background: !bgcolor ? pureWhiteColor : sidebarColor,
              }}
              MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
            >
              {weekMonthData?.map((item: any, index) => (
                <MenuItem
                  key={index}
                  value={item.value}
                  sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                >
                  <Typography variant="subtitle1">{item.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </>
    );
  };

  const typeSelector = () => {
    return (
      <>
        <Grid container spacing={2} mt={0.5} xl={12}>
          <Grid item xs={12} sm={6} md={3} lg={1.6} xl={1.5}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.nameField}>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Type
                  </Typography>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="type"
                  name="type"
                  value={headerInitalType.type}
                  onChange={(e) => {
                    setInitalType({
                      ...headerInitalType,
                      type: e.target.value,
                    });
                    setMonthValue("");
                    setYearValue("");
                    setPage(1);
                  }}
                  renderValue={() => headerInitalType.type}
                  displayEmpty
                >
                  <MenuItem value={"All"}>
                    <Typography variant="subtitle1">All</Typography>
                  </MenuItem>
                  {typeValue?.map((item: any, index) => (
                    <MenuItem key={index} value={item.name}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={1.6} xl={1.5}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.nameField}>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Region
                  </Typography>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="region"
                  name="region"
                  value={headerInitalType.region}
                  onChange={(e) => {
                    setInitalType({
                      ...headerInitalType,
                      region: e.target.value,
                    });
                    setMonthValue("");
                    setYearValue("");
                    setPage(1);
                  }}
                  renderValue={() => headerInitalType.region}
                  displayEmpty
                >
                  <MenuItem value={"All"}>
                    <Typography variant="subtitle1">All</Typography>
                  </MenuItem>
                  {regionType?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.name}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={1.6} xl={1.5}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.nameField}>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Domain
                  </Typography>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="role"
                  name="role"
                  value={headerInitalType.domian}
                  onChange={(e) => {
                    setInitalType({
                      ...headerInitalType,
                      domian: e.target.value,
                    });
                    setMonthValue("");
                    setYearValue("");
                    setPage(1);
                  }}
                  renderValue={() => headerInitalType.domian}
                  displayEmpty
                >
                  <MenuItem value={"All"}>
                    <Typography variant="subtitle1">All</Typography>
                  </MenuItem>
                  {domainType.map((role: any, index: number) => (
                    <MenuItem key={index} value={role.name}>
                      <Typography variant="subtitle1">{role.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={1.6} xl={1.5}>
            <Box>
              <Stack direction="column">
                <InputLabel sx={classes.nameField}>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Status
                  </Typography>
                </InputLabel>
                <Select
                  sx={classes.dropDownStyle}
                  id="role"
                  name="role"
                  value={headerInitalType.status}
                  onChange={(e) => {
                    setInitalType({
                      ...headerInitalType,
                      status: e.target.value,
                    });
                    setMonthValue("");
                    setYearValue("");
                    setPage(1);
                  }}
                  renderValue={() => headerInitalType.status}
                  displayEmpty
                >
                  <MenuItem value={"All"}>
                    <Typography variant="subtitle1">All</Typography>
                  </MenuItem>
                  <MenuItem value={"Due"}>
                    <Typography variant="subtitle1">Due</Typography>
                  </MenuItem>
                  {statusType?.map((role: any, index: number) => (
                    <MenuItem key={index} value={role.name}>
                      <Typography variant="subtitle1">{role.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
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
  const checkboxSelectionCondition = () => {
    if (
      doesLoggedInUserHasAccessToResource(strings.ADD, strings.PROPOSAL) ||
      doesLoggedInUserHasAccessToResource(strings.DELETE, strings.PROPOSAL)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const tableHandler = () => {
    return (
      <>
        <Box sx={classes.tableStyle}>
          <CustomTable
            headers={proposalTableHeader}
            rows={tableData}
            checkboxSelection={checkboxSelectionCondition()}
            paginationCount={tableCount}
            isRowPerPageEnable={true}
            pageNumber={Number(page)}
            handlePageChange={handleChangePage}
            isLoading={isLoading}
            setPage={setPage}
            handleClick={singleCheckboxHandler}
            isSelected={isSelected}
            rowsPerPage={pageSize}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onSelectAllClick={selectAllCheckBoxHandler}
            isSelectAll={selected.map((item: any) => item.id)}
            headerData={headerData()}
            setdropdownValue={setdropdownValue}
            dropdownValue={dropdownValue}
            tooltipEnabled
            tableHeaderTextStart
          />
        </Box>
      </>
    );
  };
  const proposalHeaders = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{
            color: !bgcolor ? primaryBlackColor : pureWhiteColor,
          }}
          mb={2}
        >
          All RFPs
        </Typography>
      </>
    );
  };
  return (
    <>
      <Box mt={11} px={3}>
        {proposalHeaders()}
        {tableHandler()}
        {addProposal()}
        {customDialogBox()}
        {customTitleDialogBox()}
        {viewCallModal()}
        {deleteModalHandler()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};
export default React.memo(Proposals);
