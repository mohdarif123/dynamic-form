import React, { ChangeEvent, useEffect, useState } from "react";
/*eslint-disable*/
import TasksStyle from "./Tasks.styles";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { CustomButton, CustomInput, CustomTable } from "global/components";
import SearchIcon from "@mui/icons-material/Search";
import strings from "global/constants/StringConstants";
import { CustomTabConfig, tasksHeader } from "./TasksData";
import {
  dueByDateChange,
  getAssigneeValue,
  getMyTaskCount,
  getMyTaskDataFromApi,
  getMyTaskSearchApi,
  getMyTasksCount,
  getOpenTaskCount,
  getOpenTaskCountSearch,
  getOpenTaskDataFromApi,
  getOpenTaskSearchApi,
  isProcessIsAdmin,
  updateAssignName,
} from "./TasksService";
import {
  debounceEventHandler,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import DatePickerModal from "./Component/DatePickerModal";
import AssignNameModal from "./Component/AssignNameModal";
import ActionModals from "./Component/ActionModals";
import moment from "moment";
import { useTitle } from "utils/UseTitle";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "utils/hooks";
import { selectRole } from "redux/authSlice";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import {
  lightDropDownColor,
  primaryGray,
  pureWhiteColor,
  sidebarColor,
} from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { makeStyles } from "@material-ui/core/styles";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const useStyles = makeStyles({
  iconColor: {
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter:
        "invert(24%) sepia(47%) saturate(7299%) hue-rotate(237deg) brightness(97%) contrast(73.5%)",
      color: "#7A81FD",
      fontSize: "20px",
      cursor: "pointer",
    },
  },
});
const Tasks = () => {
  useTitle(strings.TASKS);
  const classes = TasksStyle;
  const classes1 = useStyles();
  const urlParams = useLocation().search;
  const reduxUserRole = useAppSelector(selectRole);
  const action = new URLSearchParams(urlParams).get("action");
  const [status, setStatus] = useState<string>(action ?? strings.MY);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any>([]);
  const [open, setOpen] = useState<any>(false);
  const [perPageData, setPerPageData] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableCount, setTableCount] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [tableCountOpen, setTableCountOpen] = useState<number>(1);
  const [tableCountMy, setTableCountMy] = useState<number>(1);
  const [totalCountOpen, setTotalCountOpen] = useState<number>(1);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);
  const [assignNameModal, setAssignNameModal] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowsActionData, setActionRowsData] = useState([]);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState<any>(reduxUserRole);
  const [assigneeData, setAssigneeData] = useState<number>(1);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 20;

  useEffect(() => {
    getCountOverAll();
    if (searchValue) {
      getSearchTasksData(status, page);
    } else {
      getTableData();
    }
  }, [status, page, searchValue, pageSize]);

  useEffect(() => {
    getOpenMyCountValue(status);
    setPage(1);
  }, [status]);

  useEffect(() => {
    getProcessAdmin();
  }, []);

  const handleSeachOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    setSearchValue(searchText);
    setPage(1);
  };

  const getProcessAdmin = async () => {
    try {
      const isProcessAdmin = await isProcessIsAdmin();
      if (isProcessAdmin) {
        setLoggedInRole("Process Admin");
      } else {
        setLoggedInRole(reduxUserRole);
      }
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const getOpenCount = async () => {
    try {
      const [openCount] = await Promise.all([getOpenTaskCount()]);
      const response = openCount?.find(
        (items: any) => items?.name === strings.OPEN
      );
      setTableCount(response?.count);
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const getMyCount = async () => {
    try {
      const [myCount] = await Promise.all([getMyTaskCount()]);
      const count = myCount
        .filter((item: any) => item.name === "Open")
        .reduce((acc: any, value: any) => {
          return acc + value.count;
        }, 0);

      setTableCount(count);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getOpenMyCountValue = async (tabValue: string) => {
    switch (tabValue) {
      case strings.MY:
        getMyCount();
        break;
      case strings.OPEN:
        getOpenCount();
        break;
      default:
        break;
    }
  };

  const getMyTask = async (tabValue: string, pageNumber: number) => {
    try {
      setIsLoading(true);
      const [myTasksData, listAssignValue] = await Promise.all([
        getMyTaskDataFromApi(tabValue, pageNumber, pageSize),
        getAssigneeValue(),
      ]);

      setActiveData(myTasksData);
      setAssigneeData(listAssignValue);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getOpenTask = async (tabValue: string, pageNumber: number) => {
    try {
      setIsLoading(true);
      const [openTasksData, assignName] = await Promise.all([
        getOpenTaskDataFromApi(tabValue, pageNumber, pageSize),
        getAssigneeValue(),
      ]);
      setActiveData(openTasksData);
      setAssigneeData(assignName);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getCountOverAll = async () => {
    try {
      setIsLoading(true);
      const [myCount, OpenCount] = await Promise.all([
        getMyTaskCount(),
        getOpenTaskCount(),
      ]);
      const count = myCount
        .filter((item: any) => item.name === "Open")
        .reduce((acc: any, value: any) => {
          return acc + value.count;
        }, 0);
      const countTotal = myCount
        .filter((item: any) => item.name !== "Skipped")
        .reduce((acc: any, value: any) => {
          return acc + value.count;
        }, 0);
      const countOpen = OpenCount.filter(
        (item: any) => item.name === "Open"
      ).reduce((acc: any, value: any) => {
        return acc + value.count;
      }, 0);
      const countTotalOpen = OpenCount.filter(
        (item: any) => item.name !== "Skipped"
      ).reduce((acc: any, value: any) => {
        return acc + value.count;
      }, 0);
      setTotalCount(countTotal);
      setTableCountMy(count);
      setTableCountOpen(countOpen);
      setTotalCountOpen(countTotalOpen);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getMyTaskSearch = async (
    tabValue: string,
    pageNumber: number,
    pageSize: number
  ) => {
    try {
      setIsLoading(true);
      const [myTasksData, assignName, count] = await Promise.all([
        getMyTaskSearchApi(tabValue, pageNumber, searchValue, pageSize),
        getAssigneeValue(),
        getMyTasksCount(searchValue),
      ]);
      const countvalue = count
        .filter((item: any) => item.name === "Open")
        .reduce((acc: any, value: any) => {
          return acc + value.count;
        }, 0);

      setActiveData(myTasksData);
      setAssigneeData(assignName);
      setTableCount(countvalue);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getOpenTaskSearch = async (
    tabValue: string,
    pageNumber: number,
    pageSize: number
  ) => {
    try {
      setIsLoading(true);
      const [openTasksData, assignName, count] = await Promise.all([
        getOpenTaskSearchApi(tabValue, pageNumber, searchValue, pageSize),
        getAssigneeValue(),
        getOpenTaskCountSearch(searchValue),
      ]);
      const countvalue = count
        .filter((item: any) => item.name === "Open")
        .reduce((acc: any, value: any) => {
          return acc + value.count;
        }, 0);

      setActiveData(openTasksData);
      setAssigneeData(assignName);
      setTableCount(countvalue);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSearchTasksData = async (tabValue: string, pageNumber: number) => {
    switch (tabValue) {
      case strings.MY:
        await getMyTaskSearch(tabValue, pageNumber, pageSize);
        break;
      case strings.OPEN:
        await getOpenTaskSearch(tabValue, pageNumber, pageSize);
        break;
      default:
        break;
    }
  };

  const getTableData = async () => {
    switch (status) {
      case strings.MY:
        await getMyTask(status, page);
        break;
      case strings.OPEN:
        await getOpenTask(status, page);
        break;
      default:
        break;
    }
  };

  const handleDatePickerOnchange = (updatedDate: any, item: any) => {
    const formatedDate = moment(updatedDate).format("MM/DD/YYYY");
    setOpenDatePickerModal(true);
    const data = {
      ...item,
      dueDate: formatedDate,
    };
    setRowsData(data);
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
  const handleAction = (data: any) => {
    setOpenActionModal(true);
    setActionRowsData(data);
  };

  const getDatePicketModal = () => {
    return (
      <>
        <DatePickerModal
          openDatePickerModal={openDatePickerModal}
          setOpenDatePickerModal={setOpenDatePickerModal}
          handleDateUpdate={handleUpdateDate}
        />
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
  const actionModal = () => {
    return (
      <>
        <ActionModals
          openActionModal={openActionModal}
          setOpenActionModal={setOpenActionModal}
          rowsActionData={rowsActionData}
          getTableData={getTableData}
          loggedInRole={loggedInRole}
          getCountOverAll={getCountOverAll}
        />
      </>
    );
  };
  const answerData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 14 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items.length > 14) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };
  const assignedColumn = (items: any, data: any, index: any) => {
    const removeDublicacy: any = _.unionBy(data, "name");
    return (
      <>
        <Box>
          <Select
            sx={!bgcolor ? classes.dropDownStyle : classes.dropDownStyleOdd}
            id={items.assigneeName}
            name={items.assigneeName}
            style={classes.styleDrop}
            onChange={(e) => {
              const { value } = e.target;
              handleAssignNameOnchange(items, value, data);
            }}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    margin: "4px 0",
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                    borderRadius: "40px !important",
                    color: pureWhiteColor,
                  },
                  "& .MuiMenuItem-root:hover": {
                    color: pureWhiteColor,
                    backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                    borderRadius: "40px !important",
                  },
                  "& .MuiMenuItem-root.Mui-selected:hover": {
                    backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                    color: pureWhiteColor,
                  },
                  borderRadius: "34px",
                  backgroundColor: !bgcolor ? "#E6E7FF" : "#282945",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#7A81FD",
                    borderRadius: "10px",
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-button:start": { display: "block" },
                  "&::-webkit-scrollbar-button:end": { display: "block" },
                },
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 100,
                },
              },
              MenuListProps: {
                sx: {
                  backgroundColor: !bgcolor ? lightDropDownColor : sidebarColor,
                  borderRadius: "34px",
                },
              },
            }}
            renderValue={() => (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 400,
                  margin: "5px",
                  color: !bgcolor ? "#000000" : "#ffffff",
                }}
              >
                {answerData(items.assigneeName)}
              </Typography>
            )}
          >
            {removeDublicacy?.map((item: any, index: number) => (
              <MenuItem
                key={index}
                value={item.name}
                sx={{
                  color: !bgcolor ? "#000000" : "#ffffff",
                }}
              >
                <Typography variant="subtitle1">
                  {<CustomTooltip item={item.name} />}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </>
    );
  };

  const dueDateData = (items: any, index: number) => {
    return (
      <>
        <CustomInput
          type="date"
          id="scheduleTime"
          customInputClasses={{
            border: "1px solid #7A81FD",
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter:
                "invert(24%) sepia(47%) saturate(7299%) hue-rotate(237deg) brightness(97%) contrast(73.5%)",
              color: "#7A81FD",
              fontSize: "20px",
              cursor: "pointer",
            },
          }}
          name="scheduleTime"
          propsToInputElement={{
            min: moment().format("YYYY-MM-DD"),
          }}
          value={moment(items.dueDate).format("YYYY-MM-DD")}
          onChange={(e: any) => handleDatePickerOnchange(e.target.value, items)}
        />
      </>
    );
  };

  const actionColumn = (data: any) => {
    return (
      <>
        <Box>
          {data?.status !== strings.COMPLETE && (
            <CustomButton
              label={"Complete"}
              onClick={(e: any) => handleAction(data)}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          )}
        </Box>
      </>
    );
  };

  const handleClick = (event: any, data: any) => {
    event.preventDefault();

    const documentID = data.businessKey;

    if (event.ctrlKey) {
      window.open(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}`, "_blank");
    } else {
      history.push(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${documentID}`);
    }
  };

  const convertDataToTableFormat = (data: any, assignName: any) => {
    return data.map((items: any, index: any) => {
      return {
        name: { tooltip: items?.name },
        description: { tooltip: items?.description },
        rfpTitle: {
          component: (
            <Box onClick={(e: any) => handleClick(e, items)}>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#7A81FD",
                }}
                variant="h5"
              >
                {items?.data ? items?.data[0]?.value : "No Data Available"}
              </Typography>
            </Box>
          ),
        },
        agencyName: {
          tooltip: items?.data ? items?.data[2]?.value : "No Data Available",
        },
        rfpDueDate: {
          tooltip: items?.data ? items?.data[1]?.value : "No Data Available",
        },
        assignorName: { component: assignedColumn(items, assignName, index) },
        dueDate: { component: dueDateData(items, index) },
        action: { component: actionColumn(items) },
        id: { tooltip: items.id },
      };
    });
  };
  const handleUpdateDate = async () => {
    try {
      setIsLoading(true);
      await dueByDateChange(rowsData);
      openSuccessNotification(
        "RFP task due date has been updated successfully"
      );
      setOpenDatePickerModal(false);
      setRowsData([]);
      setIsLoading(false);
      await getTableData();
    } catch (error: any) {
      setOpenDatePickerModal(false);
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await updateAssignName(rowsData);
      openSuccessNotification(response?.message);
      setAssignNameModal(false);
      await getTableData();
      setRowsData([]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleTabs = (tabVal: string) => {
    if (tabVal === "Open Tasks") {
      setStatus(strings.OPEN);
    } else {
      setStatus(strings.MY);
    }
  };

  const getTable = () => {
    return (
      <Box sx={classes.tasksTableStyle}>
        <CustomTable
          headers={tasksHeader}
          rows={convertDataToTableFormat(activeData, assigneeData)}
          checkboxSelection={false}
          paginationCount={tableCount}
          isRowPerPageEnable={true}
          headerTopLeftRightRadius={true}
          headerData={searchData()}
          pageNumber={page}
          rowsPerPage={pageSize}
          setPage={setPage}
          handlePageChange={handleChangePage}
          isLoading={isLoading}
          supportTicket={getTab()}
          pageSize={pageSize}
          setPageSize={setPageSize}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
    );
  };
  const tasksValue = () => {
    const data = [{ myOpen: tableCountMy }, { myOpen: tableCountOpen }];
    return data;
  };

  const getTab = () => {
    return (
      <>
        <Box width={"100%"}>
          <CustomTabs
            changeValue={(newVaue: string) => {
              handleTabs(newVaue);
            }}
            selected={status}
            tabConfig={CustomTabConfig[loggedInRole]}
            buttonStyle={{ padding: "0px" }}
            sx={classes.button}
            classes={{ width: "100%" }}
            width={{
              "& .MuiButtonBase-root.MuiTab-root": {
                maxWidth:
                  CustomTabConfig[loggedInRole]?.length === 2 ? "50%" : "100%",
              },
              width: "100%",
            }}
            data={tasksValue()}
            changeVariant={true}
            textOneLine={true}
            hideTotalText={true}
          />
        </Box>
      </>
    );
  };
  const searchData = () => {
    return (
      <>
        <Grid item sx={classes.searchWrapperStyle}>
          <Box>
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
        </Grid>
      </>
    );
  };
  const getHeader = () => {
    return (
      <Typography
        variant="h1"
        style={{
          color: !bgcolor ? "black" : "white",
        }}
        mb={2}
      >
        Tasks
      </Typography>
    );
  };
  const getTasks = () => {
    return (
      <>
        <Box px={3} mt={11}>
          {getHeader()}
          {getTable()}
          {getDatePicketModal()}
          {assignNamesModal()}
          {actionModal()}
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return getTasks();
};

export default React.memo(Tasks);
