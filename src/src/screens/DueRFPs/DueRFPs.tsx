import {
  Avatar,
  Box,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import DueProposalsStyles from "./DueRFPs.Style";
import { CustomInput, CustomPaper, CustomTable } from "global/components";
import { debounceEventHandler, handleSort, isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import _ from "lodash";
import {
  getCountDueRFPs,
  getCountDueRFPsSearch,
  getProjectTopDataValue,
  getProjectTopDataValueSearch,
  getUser,
} from "./DueRFPs.Service";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { handleCalculateDifference } from "./DueRFPs.Data";
import moment from "moment";
import strings from "global/constants/StringConstants";
import { useLocation } from "react-router-dom";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { useTitle } from "utils/UseTitle";
import {
  cornflowerBlueColor,
  primaryBlackColor,
  pureWhiteColor,
  sidebarColor,
} from "utils/styles";
import { getCustomError } from "utils/customError";

const DueRFPs: React.FC<any> = () => {
  useTitle(strings.DUEPROPOSALS);
  const classes = DueProposalsStyles;
  const urlParams = useLocation().search;
  const currentPage = new URLSearchParams(urlParams).get("page") || 1;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [projectTop, setProjectTop] = useState([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const searchValueData = new URLSearchParams(urlParams).get("searchValue");
  const [searchText, setSearchText] = useState<string>(searchValueData ?? "");
  const [assignee, setAssignee] = useState([]);
  const [count, setCount] = useState<any>("");
  const [page, setPage] = useState<number>(Number(currentPage));
  const dashboardProjectTop: any[] = [
    {
      name: "RFP Title/Agency Name",
      field: "title",
    },
    {
      name: "Current Status",
      field: "status",
    },
    {
      name: "Progress",
      field: "totalProgress",
    },
    {
      name: "Assigned To",
      field: "assigneeName",
      dropdownType: assignee,
    },
    {
      name: "Due In",
      field: "nearestDueDate",
    },
  ];
  const [dropdown, setdropdown] = useState({
    assigneename: { value: "All" },
  });

  useEffect(() => {
    getAssignee();
  }, []);

  useEffect(() => {
    if (searchText) {
      getProjectTopDataSearch();
    } else {
      getProjectTopData();
    }
  }, [dropdown, searchText, page, pageSize]);

  const emailData = (email: any) => {
    const data: any = assignee?.find((item: any, index: any) => {
      if (item.name == email) {
        return item?.email;
      }
    });
    if (email === "All") {
      return "All";
    } else {
      return data?.email;
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

  const getAssignee = async () => {
    try {
      setIsLoading(true);
      const domain = await getUser();
      const filterDomainValue: any = _.unionBy(domain, "name");
      const filterData = convertAssigneeData(handleSort(filterDomainValue));
      setAssignee(filterData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getProjectTopData = async () => {
    try {
      setIsLoading(true);
      const [peojectTop, count] = await Promise.all([
        getProjectTopDataValue(
          emailData(dropdown.assigneename.value),
          pageSize,
          page
        ),
        getCountDueRFPs(emailData(dropdown.assigneename.value)),
      ]);

      setProjectTop(peojectTop);
      setCount(count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getProjectTopDataSearch = async () => {
    try {
      setIsLoading(true);
      const [peojectTop, count] = await Promise.all([
        getProjectTopDataValueSearch(
          emailData(dropdown.assigneename.value),
          pageSize,
          page,
          searchText
        ),
        getCountDueRFPsSearch(
          emailData(dropdown.assigneename.value),
          searchText
        ),
      ]);

      setProjectTop(peojectTop);
      setCount(count);
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
          `&page=` +
          page +
          `&searchValue=` +
          searchText +
          `&redirect=` +
          "duerfp"
      );
    }
  };

  const assigneeNameData = (items: any) => {
    const text = items;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items.length > 15) {
      truncatedString = text.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = text;
    }
    return truncatedString;
  };
  const handleOnchange = (event: any) => {
    setSearchText(event.target.value);
  };
  const listAssigneeName = (namesString: any) => {
    const namesArray = namesString?.split(",");
    return namesArray;
  };
  const AssigneeData = (assigneeName: any) => {
    let campaignCount: any = {};
    listAssigneeName(assigneeName).map((eachCount: any) => {
      campaignCount[eachCount?.name] = eachCount?.count;
    });
    return (
      <CustomPaper className={classes.assigneePaper}>
        <Box
          sx={
            bgcolor ? classes.ViewPopOverWrapper : classes.ViewPopOverWrapper1
          }
        >
          <Typography sx={classes.popOverHeading} variant="h3">
            Assignee
          </Typography>
          <Divider />
          <Box sx={classes.popOverListItem}>
            <List sx={classes.popOverListItem}>
              {listAssigneeName(assigneeName).map((item: any, index: any) => (
                <ListItem disablePadding sx={{ marginBottom: 1 }} key={index}>
                  <img src={item.img} alt="" />
                  <Avatar
                    sx={{
                      background: cornflowerBlueColor,
                      textTransform: "capitalize",
                    }}
                  >
                    {item?.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="h4"
                    sx={{
                      ml: 1,
                      color: bgcolor ? pureWhiteColor : primaryBlackColor,
                    }}
                  >
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CustomPaper>
    );
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

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: !bgcolor
        ? "rgba(233, 233, 255, 1)"
        : "rgba(55, 56, 84, 1)",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "46px",
    },
  }));
  const convertProgressData = (data: any) => {
    return data.map((items: any, index: number) => {
      return {
        ...items,
        totalProgress: (
          <>
            <Box display={"flex"}>
              <Box width={150}>
                <BorderLinearProgress
                  variant="determinate"
                  value={parseInt(items.progress)}
                  sx={
                    index % 2 == 0
                      ? {
                          "& .MuiLinearProgress-bar1": {
                            background:
                              "linear-gradient(to left,rgba(255, 93, 140, 1), rgba(255, 93, 140, 0))",
                          },
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: "46px",
                            background:
                              "linear-gradient(to left,rgba(255, 93, 140, 1), rgba(255, 93, 140, 0))",
                          },
                        }
                      : {
                          background: !bgcolor
                            ? "rgba(197, 197, 255, 1) !important"
                            : "#282945 !important",
                          "& .MuiLinearProgress-bar1": {
                            background:
                              "linear-gradient(to left,rgba(255, 93, 140, 1), rgba(255, 93, 140, 0))",
                          },
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: "46px",
                            background:
                              "linear-gradient(to left,rgba(255, 93, 140, 1), rgba(255, 93, 140, 0))",
                          },
                        }
                  }
                />
              </Box>
              <Box marginLeft={1} marginTop={-0.3}>
                <Typography sx={{ color: "#68697D" }} variant="h5">
                  {items.progress}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        assigneeName: (
          <>
            <Box sx={{ cursor: "pointer" }}>
              <Tooltip
                title={AssigneeData(items.assigneeName)}
                arrow
                placement="left"
                componentsProps={{
                  tooltip: {
                    sx: {
                      background: "none",
                    },
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#7A81FD", fontWeight: 600 }}
                >
                  {assigneeNameData(items?.assigneeName)}
                </Typography>
              </Tooltip>
            </Box>
          </>
        ),
        nearestDueDate: (
          <>
            <Box display={"flex"}>
              {handleCalculateDifference(
                moment(items.dueDate).format("MM-DD-YYYY"),
                moment().format("MM-DD-YYYY")
              ) !== 0 ? (
                <>
                  <Tooltip
                    title={dueDateConverter(items.dueDate)}
                    arrow
                    placement="left"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          background: "none",
                        },
                      },
                    }}
                  >
                    <Box display={"flex"}>
                      <Box>
                        {handleCalculateDifference(
                          moment(items.dueDate).format("MM-DD-YYYY"),
                          moment().format("MM-DD-YYYY")
                        )}
                      </Box>
                      <Box marginLeft={1}>
                        <Typography variant="h5">Days</Typography>
                      </Box>
                    </Box>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Box marginLeft={1}>
                    <Typography variant="h5">Today</Typography>
                  </Box>
                </>
              )}
            </Box>
          </>
        ),
        title: (
          <>
            <Typography
              variant="h5"
              onClick={(e: any) => {
                handleClick(e, items);
              }}
              sx={{ cursor: "pointer", fontWeight: "bold", color: "#7A81FD" }}
            >
              {items.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: bgcolor ? "#7B7C9C" : "#7B7C9C" }}
            >
              {items?.agency?.name}
            </Typography>
          </>
        ),
      };
    });
  };
  const headerData = () => {
    return (
      <Typography
        variant="h1"
        style={{
          color: !bgcolor ? "black" : "white",
        }}
        mb={2}
      >
        Due RFPs
      </Typography>
    );
  };

  const tableHeaderData = () => {
    return (
      <>
        <Grid
          item
          sx={{
            width: {
              xs: "280px",
              sm: "190px",
              md: "200px",
              lg: "200px",
              xl: "230px",
            },
            [`@media screen and (max-width: ${320}px)`]: {
              width: "190px",
            },
          }}
          mb={1}
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
              handleOnchange,
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
      </>
    );
  };

  const getTableData = () => {
    return (
      <>
        <Box sx={classes.tableStyle}>
          <CustomTable
            headers={dashboardProjectTop}
            rows={convertProgressData(projectTop)}
            paginationCount={count}
            isRowPerPageEnable={true}
            pageNumber={page}
            rowsPerPage={pageSize}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
            headerData={tableHeaderData()}
            dropdownValue={dropdown}
            setPage={setPage}
            setdropdownValue={setdropdown}
            tableHeaderTextStart
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Box px={3} mt={11}>
        {headerData()}
        {getTableData()}
      </Box>
      <CustomLoader isLoading={isLoading} />
    </>
  );
};
export default DueRFPs;
