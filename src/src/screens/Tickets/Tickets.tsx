import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Chip,
  Typography,
  Tooltip,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import {
  debounceEventHandler,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import strings from "global/constants/StringConstants";
import {
  CustomButton,
  CustomIcon,
  CustomPaper,
  CustomTable,
} from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import ticketsStyles from "./Tickets.styles";
import ArrowDownIcons from "assets/icons/ArrowDownIcons.svg";
import {
  appColor,
  boldFont,
  BootstrapInput,
  dropDownDarkForSx,
  dropDownLightForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryActiveTabBgColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import {
  assigneeGroupName,
  getAssigned,
  getAssignedCount,
  getAssigneeValue,
  getCompleted,
  getCompletedCount,
  getOpen,
  getOpenCount,
  getRaised,
  getRaisedCount,
  getSearchCountParams,
  getSearchParams,
  isProcessIsAdmin,
  updateAssignName,
} from "./ticketService";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import TicketDetails from "./components/TicketDetails";
import {
  assignedTicketHeader,
  completeTicketHeader,
  openTicketHeader,
  RaisedTicketHeader,
  tabConfig,
  TicketTabContent,
} from "./TicketData";
import { useAppSelector } from "utils/hooks";
import { selectRole } from "redux/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import ActionModals from "./TicketComplete";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import _ from "lodash";
import AssignNameModal from "./AssignNameModal";
import { useTitle } from "utils/UseTitle";
import { getCustomError } from "utils/customError";

interface customProps {
  location: any;
}

const Tickets = (props: customProps) => {
  useTitle(strings.TICKETS);
  const classes = ticketsStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const redirectTabValue = props?.location?.state?.fromPageTableValue;
  const loadingState = props?.location?.state?.loadingState;
  const [activeData, setActiveData] = useState<string[]>([]);
  const [count, setCount] = useState<number>();
  const [openActionModal, setOpenActionModal] = useState(false);
  const [assignedCount, setAssignedCount] = useState<number>(0);
  const [raisedCount, setRaisedCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [rowsActionData, setActionRowsData] = useState([]);
  const [openCount, setOpenCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(loadingState ?? false);
  const [searchParam, setSearchParam] = useState<string>("");
  const searchValue = useRef<any>("");
  const [getTicketInfo, setGetTicketInfo] = useState("");
  const [isOpenCustomDrawer, setIsOpenCustomDrawer] = useState<boolean>(false);
  const [headerData, setTableHeaderData] = useState(assignedTicketHeader);
  const [getTabClick, setGetTabClick] = useState<string>("assignData");
  const [processName, setProcessName] = useState<string>("");
  const [newAssignee, setNewAssignee] = useState<string>("");
  const [assignDataLoading, setAssignedDataLoading] = useState<boolean>(false);
  const reduxUserRole = useAppSelector(selectRole);
  const [getPage, setGetPage] = useState<number>(0);
  const [currentSelectedTab, setCurrentSelectedTab] = useState<string>(
    strings.assignedToMe
  );
  const [userRole, setUserRole] = useState<string>(reduxUserRole);
  const [perPageData, setPerPageData] = useState(10);
  const [assignNameModal, setAssignNameModal] = useState(false);
  const [rowsData, setRowsData] = useState([]);

  [
    // TicketTabContent.assignedToMee.count,
    TicketTabContent.raisedByMe.count,
    TicketTabContent.openTickets.count,
    TicketTabContent.completedTickets.count,
  ] = [assignedCount, raisedCount, openCount, completedCount];
  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 20;

  useEffect(() => {
    apiHandler();
  }, []);

  useEffect(() => {
    if (redirectTabValue) {
      getTableData(pageNumber, redirectTabValue);
      setCurrentSelectedTab(redirectTabValue);
    }
  }, [redirectTabValue, props?.location?.state]);

  useEffect(() => {
    if (currentSelectedTab) {
      setGetPage(0);
      setPageNumber(1);
    }
  }, [searchParam, currentSelectedTab, perPageData]);

  useEffect(() => {
    if (searchParam) {
      getSearchTicketsData(currentSelectedTab, searchParam);
    } else {
      getTableData(pageNumber, currentSelectedTab);
    }
  }, [
    pageNumber,
    searchValue,
    searchParam,
    currentSelectedTab,
    perPageData,
    bgcolor,
  ]);

  useEffect(() => {
    if (processName) {
      GetAssigneeGroupName();
    }
  }, [processName]);

  useEffect(() => {
    getProcessAdmin();
  }, []);

  const getProcessAdmin = async () => {
    try {
      const isProcessAdmin = await isProcessIsAdmin();
      if (isProcessAdmin) {
        setUserRole("Process Admin");
      } else {
        setUserRole(reduxUserRole);
      }
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const apiHandler = async () => {
    try {
      setIsLoading(true);
      const [
        assignedCountVal,
        raisedCount,
        completedCount,
        openCount,
        response,
      ] = await Promise.all([
        getAssignedCount(),
        getRaisedCount(),
        getCompletedCount(),
        getOpenCount(),
        getAssigneeValue(),
      ]);
      setAssignedCount(assignedCountVal);
      setRaisedCount(raisedCount);
      setCompletedCount(completedCount);
      setOpenCount(openCount);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleAssignNameOnchange = (
    item: any,
    updateValue: any,
    listAssign: any
  ) => {
    setAssignNameModal(true);
    const checkEmail = listAssign?.find(
      (item: any) => item.name === updateValue
    );
    const data = {
      ...item,
      assigneeName: updateValue,
      assigneeId: checkEmail?.email,
    };
    setRowsData(data);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await updateAssignName(rowsData);
      openSuccessNotification(response?.message);
      setAssignNameModal(false);
      await getTableData(pageNumber, currentSelectedTab);
      setRowsData([]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getTableData = (page: number, tab: string) => {
    switch (tab) {
      case strings.assignedToMe:
        getAssignedTicketsData(page);
        break;
      case strings.raisedByMe:
        getRaisedByMeTicketsData(page);
        break;
      case strings.completedTickets:
        getCompletedTicketsData(page);
        break;
      case strings.openTickets:
        getOpenTicketsData(page);
        break;
    }
  };

  const drawerOpenHandler = () => {
    setIsOpenCustomDrawer(!isOpenCustomDrawer);
  };

  const ticketDetailsHandler = (e: any, item: any, assignData: string) => {
    let value = e.target.innerText.toLowerCase();
    value = value.charAt(0).toUpperCase() + value.slice(1);
    if (assignData === "action") {
      setGetTicketInfo(item);
      setProcessName(item.process);
    } else {
      setGetTicketInfo(item);
    }
  };

  const getTicketDetail = () => {
    return (
      <TicketDetails
        isOpenCustomDrawer={isOpenCustomDrawer}
        ticketDetailsHandler={ticketDetailsHandler}
        getTicketInfo={getTicketInfo}
        pageNumber={pageNumber}
        rowsPerPage={perPageData}
        getTabClick={getTabClick}
        newAssignee={newAssignee}
        setIsOpenCustomDrawer={setIsOpenCustomDrawer}
        getTableData={getTableData}
        apiHandler={apiHandler}
        getPage={getPage}
        drawerOpenHandler={drawerOpenHandler}
        getAssignedTicketsData={getAssignedTicketsData}
        setGetTabClick={setGetTabClick}
        currentSelectedTab={currentSelectedTab}
      />
    );
  };
  const answerData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > 20) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };
  const assignedColumn = (items: any, index: any, users: any) => {
    const removeDublicacy: any = _.unionBy(users, "name");
    return (
      <>
        <Box>
          <Select
            id={items.assigneeName}
            name={items.assigneeName}
            onChange={(e) => {
              const { value } = e.target;
              handleAssignNameOnchange(items, value, users);
            }}
            sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
            style={!bgcolor ? selectBgLight : selectBgDark}
            MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
            displayEmpty
            renderValue={() => (
              <Typography
                sx={!bgcolor ? renderValueLightStyle : renderValueDarkStyle}
                variant="h4"
              >
                {answerData(items.assigneeName)}
              </Typography>
            )}
          >
            {removeDublicacy?.map((item: any, index: number) => (
              <MenuItem
                key={index}
                value={item.name}
                sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
              >
                <Typography variant="subtitle1">{item.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </>
    );
  };

  const getAssigneeTableCell = (assignees: any) => {
    const assigneesList = assignees.split(",");
    if (assigneesList?.length === 1) {
      return assigneesList[0];
    } else {
      return (
        <Tooltip
          title={showViewPopover(assigneesList)}
          componentsProps={{
            tooltip: {
              sx: {
                background: appColor,
                border: "none",
              },
            },
          }}
        >
          <Box display={"flex"}>
            <Typography minWidth={"100px"} variant="h5">
              {assigneesList[0]}
            </Typography>
            <Box component={"span"} sx={{ ml: 1 }}>
              <CustomIcon
                icon={<img src={ArrowDownIcons} alt="ArrowDownIcon" />}
              />
            </Box>
          </Box>
        </Tooltip>
      );
    }
  };
  const handleAction = (data: any) => {
    setOpenActionModal(true);
    setActionRowsData(data);
    // setSelectedComplet()
  };

  const tableDataShowHandler = (
    getAssignData: any,
    assignData: string,
    users: any
  ) => {
    const tableValue = getAssignData?.map((item: any, index: any) => {
      return {
        name: { tooltip: item.name },
        process: { tooltip: item.process },
        id: { tooltip: item.id },
        description: { tooltip: item.description },
        assignorName: { tooltip: item.assignorName },
        assigneeName: { component: assignedColumn(item, index, users) },
        status: {
          component: (
            <>
              <CustomButton
                label={"OPEN"}
                onClick={() => {}}
                customClasses={{ width: "110px" }}
                buttonType={"outlined"}
              />
            </>
          ),
        },
        dueDate: {
          component: (
            <Box
              style={{
                minWidth: "100px",
                color: bgcolor ? "#ffffff" : "#000000",
              }}
            >
              {moment(item.dueDate).format("MMM DD, YYYY")}
            </Box>
          ),
        },
        action: {
          component: (
            <Chip
              onClick={(e: any) => {
                ticketDetailsHandler(e, item, "action");
                setIsOpenCustomDrawer(true);
                setGetTabClick("action");
              }}
              label={"Reassign"}
              style={{
                background: primaryActiveTabBgColor,
                textTransform: "uppercase",
                ...boldFont,
                display: "flex",
                justifyContent: "center",
              }}
            />
          ),
        },
        actionComplete: {
          component: (
            <CustomButton
              label={"Complete"}
              onClick={(e: any) => handleAction(item)}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          ),
        },
      };
    });
    setActiveData(tableValue);
  };

  const showViewPopover = (assigneeNameSplitString: any) => {
    return (
      <>
        <CustomPaper className={classes.paperStyle}>
          {assigneeNameSplitString.map((item: any) => {
            return <Typography>{item}</Typography>;
          })}
        </CustomPaper>
      </>
    );
  };

  const GetAssigneeGroupName = async () => {
    try {
      setIsLoading(true);
      const newAssigneeList = await assigneeGroupName(processName);
      setNewAssignee(newAssigneeList);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getAssignedTicketsData = async (page: number) => {
    try {
      setIsLoading(true);
      const [assignedToMeTicketsData, assignedToMeTicketsCount, res] =
        await Promise.all([
          getAssigned(pageNumber - 1, perPageData),
          getAssignedCount(),
          getAssigneeValue(),
        ]);
      setCount(assignedToMeTicketsCount);
      setAssignedCount(assignedToMeTicketsCount);
      tableDataShowHandler(assignedToMeTicketsData, strings.assignData, res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getRaisedByMeTicketsData = async (page: number) => {
    try {
      setIsLoading(true);
      const [raisedByMeTicketsData, raisedByMeTicketsCount, res] =
        await Promise.all([
          getRaised(pageNumber - 1, perPageData),
          getRaisedCount(),
          getAssigneeValue(),
        ]);

      setCount(raisedByMeTicketsCount);
      setRaisedCount(raisedByMeTicketsCount);
      tableDataShowHandler(raisedByMeTicketsData, strings.RaisedData, res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getCompletedTicketsData = async (page: number) => {
    try {
      setIsLoading(true);
      const [completedTicketsData, completedTicketsCount, res] =
        await Promise.all([
          getCompleted(pageNumber - 1, perPageData),
          getCompletedCount(),
          getAssigneeValue(),
        ]);
      setCount(completedTicketsCount);
      setCompletedCount(completedTicketsCount);
      tableDataShowHandler(completedTicketsData, strings.completedData, res);
      setIsOpenCustomDrawer(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getOpenTicketsData = async (page: number) => {
    try {
      setIsLoading(true);
      const [openTicketsData, openTicketCount, res] = await Promise.all([
        getOpen(pageNumber - 1, perPageData),
        getOpenCount(),
        getAssigneeValue(),
      ]);
      setCount(openTicketCount);
      setOpenCount(openTicketCount);
      tableDataShowHandler(openTicketsData, strings.openData, res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSearchTicketsData = async (tab: string, search: any) => {
    try {
      setIsLoading(true);
      const [searchTicketsData, searchTicketsCount, res] = await Promise.all([
        getSearchParams(tab, search, pageNumber - 1, perPageData),
        getSearchCountParams(tab, search),
        getAssigneeValue,
      ]);
      setCount(searchTicketsCount);
      tableDataShowHandler(searchTicketsData, getTabClick, res);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handlePageChange = (event: any, pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleTabChange = async (newValue: string) => {
    setCurrentSelectedTab(newValue);
    searchValue.current.value = "";
    setSearchParam(searchValue.current.value);
    if (newValue === strings.assignedToMe) {
      setTableHeaderData(assignedTicketHeader);
      setPageNumber(1);
    } else if (newValue === strings.raisedByMe) {
      setTableHeaderData(RaisedTicketHeader);
      setPageNumber(1);
    } else if (newValue === strings.openTickets) {
      setTableHeaderData(openTicketHeader);
      setPageNumber(1);
    } else if (newValue === strings.completedTickets) {
      setTableHeaderData(completeTicketHeader);
      setPageNumber(1);
    }
    setPageNumber(1);
  };
  const handleSearchParams = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchText = event.target.value.trim();
    setSearchParam(searchText);
    setPerPageData(10);
  };

  const handlePerPageData = (event: any) => {
    setPerPageData(event.target.value);
  };

  const tabData = () => {
    return (
      <>
        <CustomTabs
          changeValue={(newVaue: string) => {
            handleTabChange(newVaue);
          }}
          selected={currentSelectedTab}
          tabConfig={tabConfig[userRole]}
          buttonStyle={{ padding: "3px" }}
          sx={classes.button2}
          classes={{ width: "100%" }}
          width={{
            "& .MuiButtonBase-root.MuiTab-root": {
              maxWidth:
                tabConfig[userRole]?.length === 4
                  ? "25%"
                  : tabConfig[userRole]?.length === 2
                  ? "50%"
                  : tabConfig[userRole]?.length === 3
                  ? "33.33%"
                  : "100%",
            },
            width: "100%",
          }}
          changeVariant={true}
          textOneLine={true}
          // redirectTabValue={redirectTabValue}
          // state={props?.location?.state}
        />
      </>
    );
  };
  const actionModal = () => {
    return (
      <>
        <ActionModals
          openActionModal={openActionModal}
          setOpenActionModal={setOpenActionModal}
          rowsActionData={rowsActionData}
          getTableData={getTableData}
        />
      </>
    );
  };
  const getSearchHandler = () => {
    return (
      <>
        <Box mb={1} ml={1.5}>
          <Box style={{ width: "300px" }}>
            <BootstrapInput
              placeholder="Search text"
              sx={classes.input}
              inputRef={searchValue}
              onChange={debounceEventHandler(
                handleSearchParams,
                strings.SEARCH_TIME_OUT
              )}
              style={{
                background: bgcolor ? "#282945" : "#E6E7FF",
                border: "none",
                color: bgcolor ? "#CBCBCB" : "#7A7A7A",
                borderRadius: "34px",
              }}
              endAdornment={
                <Box mr={1}>
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#7A81FD" }} />
                  </InputAdornment>
                </Box>
              }
            />
          </Box>
        </Box>
      </>
    );
  };
  const assignNamesModal = () => {
    return (
      <>
        <AssignNameModal
          assignNameModal={assignNameModal}
          setAssignNameModal={setAssignNameModal}
          handleSubmit={handleUpdate}
        />
      </>
    );
  };

  const getTable = () => {
    return (
      <>
        <Box sx={classes.tableStyle}>
          <CustomTable
            headers={headerData}
            rows={activeData}
            paginationCount={count}
            rowsPerPage={perPageData}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
            supportTicket={tabData()}
            isRowPerPageEnable={true}
            setPage={setPageNumber}
            handlePerPageData={handlePerPageData}
            perPageData={perPageData}
            pageSize={perPageData}
            setPageSize={setPerPageData}
            headerData={getSearchHandler()}
            headerTopLeftRightRadius={true}
            tooltipEnabled
          />
        </Box>
      </>
    );
  };
  const ticketHeaders = () => {
    return (
      <Typography
        variant="h2"
        style={{
          color: !bgcolor ? "black" : "white",
          marginLeft: "22px",
        }}
        mb={3}
      >
        Tickets
      </Typography>
    );
  };
  const getTicketsPage = () => {
    return (
      <>
        <Box mt={11} px={3}>
          {ticketHeaders()}
          {getTable()}
          {getTicketDetail()}
          {actionModal()}
          {assignNamesModal()}
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return getTicketsPage();
};

export default React.memo(Tickets);
