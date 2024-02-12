import {
  Box,
  Grid,
  MenuItem,
  Select,
  Typography,
  Stack,
  Avatar,
  Tooltip,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { handleSort } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import TotalIcons from "assets/icons/DashBoard/TotalIcon.svg";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomPaper,
  CustomTable,
} from "global/components";
import CampaignRecipientPieChart from "global/components/Chart/CampaignRecipientPieChart";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import DashboardStyle from "./Dashboard.style";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { isProcessIsAdmin } from "../Tasks/TasksService";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import NoDataImage from "assets/images/NoDataImage.svg";
import NoDataLight from "assets/images/NoDataLight.svg";
import {
  getByDomainValue,
  getDocumentExpiryValue,
  getDomainData,
  getMyTasksCount,
  getOpenTasksCount,
  getProjectData,
  getProjectTopDataValue,
  getRegionData,
  getRfpByDomainWithDomain,
  getRfpByStatusWithDomain,
  getRfpByTypeWithDomain,
  getRfpDomainCount,
  getRfpDueCountwithDomain,
  getTotalRFPsCountMethod,
  getUser,
  getWonProposalTableDataCount,
  getlostRfpData,
} from "./Dashboard.service";
import {
  cornflowerBlueColor,
  customScrollCssOuter,
  dropDownDarkForSx,
  lightBgColor,
  lightDropDownColor,
  primaryBlackColor,
  primaryColorBlack,
  primaryGray,
  pureWhiteColor,
  sidebarColor,
  theme,
} from "utils/styles";
import MyTaskIcon from "assets/icons/MyTaskIcon.svg";
import MyTaskIconLight from "assets/icons/MyTaskIconLight.svg";
import OpenTaskIconLight from "assets/icons/OpenTaskIconLight.svg";
import TotalDashboardIcon from "assets/icons/TotalDashboardIcon.svg";
import OpenTaskIcon from "assets/icons/OpenTaskIcon.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import moment from "moment";
import RfpLostDataComment from "./RfpLostDataComment";
import CustomDatePicker from "global/components/CustomDatePicker/CustomDatePicker";
import { CustomDateRange } from "../UserRFPReports/UserRFPReports.Type";
import {
  handleCalculateDifference,
  weekValue,
  weekValueNextMonth,
} from "./DashboardData";
import DomainByChart from "./Component/DomainByChart";
import { SemiCircularChart } from "./Component/StatusByChart";
import UpgradePlan from "./UpgradePlan";
import { selectTrial } from "redux/authSlice";
import DueColorIcon from "assets/icons/DueColorIcon.svg";
import PendingColorIcon from "assets/icons/PendingColorIcon.svg";
import WonColorIcon from "assets/icons/WonColorIcon.svg";
import NoBidColorIcon from "assets/icons/NoBidsColorIcon.svg";
import BidsColorIcon from "assets/icons/BidsColorIcon.svg";
import DocumentStatusChart from "./Component/DocumentStatusChart";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const Dashboard: React.FC<any> = () => {
  useTitle(strings.DASHBOARD);
  const initialState: any = {
    fromDate: moment().subtract(10, "year").format("L").replaceAll("/", "-"),
    toDate: weekValueNextMonth(),
  };
  const [openModal, setOpenModal] = useState(false);
  const classes = DashboardStyle;
  const [regionValue, setRegionValue] = useState("All");
  const [domainValue, setDomainValue] = useState("All");
  const [timeIntervalValue, setTimeIntervalValue] = useState<any>(3650);
  const [regionDropdown, setRegionDropdown] = useState([]);
  const [projectVolumn, setProjectVolumn] = useState([]);
  const [domainDropdown, setDomainDropdown] = useState([]);
  const [documentTypeStatus, setDocumentTypeStatus] = useState([]);
  const [projectTop, setProjectTop] = useState([]);
  const [page, setPage] = useState(-1);
  const [timeinterval, setTimeinterval] = useState("12");
  const [showDialogComment, setShowDialogComment] = useState(false);
  const [items, setItem] = useState<any>();
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [dashboardValue, setDashboardValue] = useState<any>({
    ProposalCount: [],
    Due: [],
    Total: "",
    Graph1: [],
    Graph2: [],
    Graph3: [],
    MyTasks: [],
    OpenTasks: [],
    ByDomainValue: [],
    totalRfpCount: [],
    openTasksCount: [],
    myTasksCount: [],
  });
  const [dropdown, setdropdown] = useState({
    assigneename: { value: "All" },
  });
  const weekMonthData = [
    {
      name: "1 Week",
      value: 7,
    },
    {
      name: "2 Months",
      value: 60,
    },
    {
      name: "This Year",
      value: "year",
    },
    {
      name: "All",
      value: 3650,
    },
    {
      name: "Custom Date",
      value: "Custom",
    },
  ];
  const [loggedInRole, setLoggedInRole] = useState<boolean>(false);
  const [assignee, setAssignee] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const isTrialUser = useAppSelector(selectTrial);
  const [lostRfp, setLostRfp] = useState([]);
  const responseHeader = [
    {
      name: "Priority",
      field: "priority",
    },
    {
      name: "Reason",
      field: "reason",
    },
    {
      name: "Comment",
      field: "comments",
    },
    {
      name: "Region",
      field: "region",
      dropdownType: regionDropdown,
    },
    {
      name: "Domain",
      field: "domain",
      dropdownType: domainDropdown,
    },
  ];
  const documentHeader = [
    {
      name: "Days",
      field: "days",
    },
    {
      name: "No of Doc",
      field: "docNumber",
    },
  ];

  const [dropdownValue, setdropdownValue] = useState({
    region: { value: "All" },
    domain: { value: "All" },
  });
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
  const myCountData = dashboardValue?.myTasksCount
    ?.filter((item: any) => item.name === "Open")
    ?.reduce((acc: any, value: any) => {
      return acc + value.count;
    }, 0);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    if (!openModal) {
      getValues(regionValue, domainValue, timeIntervalValue);
    }
  }, [dateRange, openModal]);

  useEffect(() => {
    getRegion();
    getDomain(regionValue);
    getProcessAdmin();
    getAssignee();
    getDocumentExpiry();
  }, []);

  useEffect(() => {
    if (!openModal) {
      getLostRfpData();
    }
  }, [dateRange, openModal, dropdownValue]);

  useEffect(() => {
    getProjectTopData();
  }, [dropdown]);

  useEffect(() => {
    getProject();
  }, [timeinterval]);

  const ByType = [
    { name: "Current Month", value: 1 },
    { name: "3 Months", value: 3 },
    { name: "6 Months", value: 6 },
    { name: "9 Months", value: 9 },
    { name: "12 Months", value: 12 },
  ];

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

  const getRegion = async () => {
    try {
      setIsLoading(true);
      const region = await getRegionData();
      const filterData = convertAssigneeData(handleSort(region));
      setRegionDropdown(filterData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const handleCloseModel = () => {
    setOpenModal(false);
  };
  const getDomain = async (regionValue: any) => {
    try {
      setIsLoading(true);
      const domain = await getDomainData(regionValue);
      const filterDomainValue: any = _.unionBy(domain, "name");
      const filterData = convertAssigneeData(handleSort(filterDomainValue));
      setDomainDropdown(filterData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
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

  const getProjectTopData = async () => {
    try {
      setIsLoading(true);
      const projectTop = await getProjectTopDataValue(
        emailData(dropdown.assigneename.value)
      );
      setProjectTop(projectTop);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getDocumentExpiry = async () => {
    try {
      setIsLoading(true);
      const documentExpiry = await getDocumentExpiryValue("Project Agreement");
      setDocumentTypeStatus(documentExpiry);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getLostRfpData = async () => {
    try {
      setIsLoading(true);
      const peojectTop = await getlostRfpData(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        dateRange
      );
      setLostRfp(peojectTop);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getProject = async () => {
    try {
      setIsLoading(true);
      const project = await getProjectData(timeinterval);
      setProjectVolumn(project);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getProcessAdmin = async () => {
    try {
      setIsLoading(true);
      const isProcessAdmin = await isProcessIsAdmin();
      setLoggedInRole(isProcessAdmin);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const answerData = (items: any) => {
    const answertext = document.createElement("div");
    answertext.innerHTML = items?.text;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";

    if (items?.text) {
      if (items?.text?.length > 20) {
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

  const reasonData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 15 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > 15) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };

  const priorityData = (data: any, items: any) => {
    switch (data) {
      case 0: {
        return (items["priority"] = "High");
      }
      case 1: {
        return (items["priority"] = "Medium");
      }
      case 2: {
        return (items["priority"] = "Low");
      }
    }
  };

  const NoDataMethod = (typeValue?: any) => {
    return (
      <Box textAlign="center">
        <Box
          component="img"
          src={!bgcolor ? NoDataLight : NoDataImage}
          overflow="auto"
          height={typeValue ? "100px" : "200px"}
          width="100%"
        />
        <Typography
          mt={1}
          variant="h4"
          style={{
            color: !bgcolor ? primaryColorBlack : pureWhiteColor,
          }}
        >
          We've got nothing for you, sorry!
        </Typography>
      </Box>
    );
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
  const showComment = (items: any) => {
    setItem(items);
    setShowDialogComment(true);
  };

  const convertLostRfpData = (data: any) => {
    return data.map((items: any, index: any) => {
      const lostRfpData = JSON.parse(data[index].lost_comment);
      return {
        ...items,
        priority: {
          component: (
            <Typography
              sx={{ color: bgcolor ? "ffffff" : "#000000" }}
              variant="h5"
            >
              {priorityData(index, items)}
            </Typography>
          ),
        },
        reason: { tooltip: items.lost_reason },
        comments: {
          component: (
            <Box
              onClick={() => {
                showComment(items);
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#7A81FD", cursor: "pointer" }}
              >
                {answerData(lostRfpData[0])}
              </Typography>
            </Box>
          ),
        },
        region: {
          component: <Typography variant="h5">{items?.region}</Typography>,
        },
        domain: {
          component: <Typography variant="h5">{items?.domain}</Typography>,
        },
      };
    });
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

                      <Box
                        marginLeft={1}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
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
              onClick={() => {
                history.push(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${items.id}`);
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
  const getValues = async (region: any, domain: any, interval: any) => {
    try {
      setIsLoading(true);
      const [
        ProposalCount,
        Due,
        Total,
        Graph1,
        Graph2,
        Graph3,
        ByDomain,
        totalCountValue,
        myTasks,
        openTasks,
      ] = await Promise.all([
        getRfpDomainCount(region, domain, dateRange),
        getRfpDueCountwithDomain(region, domain, dateRange),
        getWonProposalTableDataCount(dateRange),
        getRfpByStatusWithDomain(region, domain, dateRange),
        getRfpByTypeWithDomain(region, domain, dateRange),
        getRfpByDomainWithDomain(),
        getByDomainValue(dateRange),
        getTotalRFPsCountMethod(dateRange),
        getMyTasksCount(),
        getOpenTasksCount(),
      ]);
      setDashboardValue({
        ProposalCount: ProposalCount,
        Due: Due,
        Total: Total,
        Graph1: Graph1,
        Graph2: Graph2,
        Graph3: Graph3,
        ByDomainValue: ByDomain,
        totalRfpCount: totalCountValue,
        myTasksCount: myTasks,
        openTasksCount: openTasks,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const fromDateData = (event: any) => {
    if (event == "year") {
      const lastWeekYear = new Date().getFullYear();
      const lastWeekDate =
        "01".slice(-2) +
        "-" +
        "01".slice(-2) +
        "-" +
        ("0000" + lastWeekYear.toString()).slice(-4);
      return lastWeekDate;
    }
    if (event == "Custom") {
      setOpenModal(true);
      return dateRange.fromDate;
    } else {
      return weekValue(event);
    }
  };
  const toDateSelect = (event: any) => {
    if (event == "Custom") {
      return dateRange.toDate;
    } else if (event == 3650) {
      return weekValueNextMonth();
    } else {
      return moment().format("MM-DD-YYYY");
    }
  };

  const IntervalChange = (event: any) => {
    const data = fromDateData(event);
    const toDate = toDateSelect(event);
    setDateRange({
      ...dateRange,
      fromDate: data,
      toDate: toDateSelect(event),
    });
    setTimeIntervalValue(event);
  };

  const CustomChange = () => {
    const data = fromDateData("Custom");
    setDateRange({
      ...dateRange,
      fromDate: data,
      toDate: dateRange.toDate,
    });
    setTimeIntervalValue("Custom");
  };

  const getCards = () => {
    return (
      <Grid
        container
        style={{ display: "flex" }}
        justifyContent={{
          xl: "space-between",
          lg: "space-between",
          md: "start",
          sm: "start",
          xs: "start",
        }}
        gap={1}
      >
        {dashboardValue?.totalRfpCount.length > 0 ? (
          <>
            {dashboardValue?.totalRfpCount.map((totalValue: any) => {
              return (
                <>
                  <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
                    <Box
                      onClick={() => {
                        history.push(
                          `${urls.PROPOSAL_VIEW_PATH}?region=${regionValue}&domain=${domainValue}&interval=-1&action=All&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                        );
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <CustomPaper
                        className={classes.dataCardStyleNo}
                        style={{
                          backgroundColor: !bgcolor
                            ? lightBgColor
                            : sidebarColor,
                        }}
                      >
                        <Grid
                          container
                          sx={classes.dashboardTopCardTextAndImageWrapper}
                        >
                          <Grid item>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: "18px",
                                color: !bgcolor ? "black" : "white",
                                [theme.breakpoints.down("xl")]: {
                                  fontSize: "14px",
                                  fontWeight: "500",
                                },
                              }}
                              variant="h6"
                            >
                              Total
                            </Typography>
                            <Box sx={{ display: "flex" }} mt={1}>
                              <Typography
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontWeight: 600,
                                  color: !bgcolor ? "black" : "white",
                                }}
                                variant="h4"
                              >
                                {totalValue?.count}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Box
                              sx={{
                                height: { xl: "50px", xs: "37px" },
                                width: { xl: "50px", xs: "37px" },
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "50%",
                                backgroundColor: !bgcolor
                                  ? "#EFEFFF"
                                  : "#383A51",
                              }}
                            >
                              <CustomIcon
                                icon={
                                  <img
                                    src={TotalDashboardIcon}
                                    alt="TotalDashboardIcon"
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                }
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CustomPaper>
                    </Box>
                  </Grid>
                </>
              );
            })}
          </>
        ) : (
          <>
            <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
              <CustomPaper
                className={classes.dataCardStyleNo}
                style={{
                  backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                }}
              >
                <Grid
                  container
                  sx={classes.dashboardTopCardTextAndImageWrapper}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: !bgcolor ? "black" : "white",
                        [theme.breakpoints.down("xl")]: {
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                      variant="h6"
                    >
                      Total
                    </Typography>
                    <Box sx={{ display: "flex" }} mt={1}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                          color: !bgcolor ? "black" : "white",
                        }}
                        variant="h4"
                      >
                        0
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: { xl: "50px", xs: "37px" },
                        width: { xl: "50px", xs: "37px" },
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                      }}
                    >
                      <CustomIcon
                        icon={
                          <img
                            src={TotalDashboardIcon}
                            alt="TotalDashboardIcon"
                            style={{ height: "20px", width: "20px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CustomPaper>
            </Grid>
          </>
        )}

        {dashboardValue?.ProposalCount.find((x: any) => {
          if (x.name === "Yes") {
            return x.name;
          }
        }) ? (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <Box
              onClick={() => {
                history.push(
                  `${urls.PROPOSAL_VIEW_PATH}?region=${regionValue}&domain=${domainValue}&interval=-1&action=Yes&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <CustomPaper
                className={classes.dataCardStyleNo}
                style={{
                  backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                }}
              >
                <Grid
                  container
                  sx={classes.dashboardTopCardTextAndImageWrapper}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: !bgcolor ? "black" : "white",
                        [theme.breakpoints.down("xl")]: {
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                      variant="h6"
                    >
                      Bids
                    </Typography>
                    <Box sx={{ display: "flex" }} mt={1}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                          color: !bgcolor ? "black" : "white",
                        }}
                        variant="h4"
                      >
                        {
                          dashboardValue?.ProposalCount.find((x: any) => {
                            if (x.name === "Yes") {
                              return x.name;
                            }
                          }).count
                        }
                      </Typography>

                      {/* <CustomIcon
                        icon={
                          percentageValue
                            .find((obj: any) => obj.name === "Yes")
                            ?.percentage?.startsWith("-") ? (
                            <SouthEastIcon
                              color="success"
                              style={{ fontSize: "14px", color: "#E73644" }}
                            />
                          ) : (
                            <NorthEastIcon
                              color="success"
                              style={{ fontSize: "15px" }}
                            />
                          )
                        }
                      /> */}
                      {/* <Box sx={classes.percentTextStyle}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: percentageValue
                              .find((obj: any) => obj.name === "Yes")
                              ?.percentage?.startsWith("-")
                              ? "red"
                              : "#41CD00",
                            fontSize: "14px",
                          }}
                        >
                          {
                            percentageValue.find(
                              (obj: any) => obj.name === "Yes"
                            )?.percentage
                          }
                        </Typography>
                      </Box> */}
                    </Box>
                  </Grid>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: { xl: "50px", xs: "37px" },
                        width: { xl: "50px", xs: "37px" },
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                      }}
                    >
                      <CustomIcon
                        icon={
                          <img
                            src={BidsColorIcon}
                            alt="BidsColorIcon"
                            style={{ height: "18px", width: "18px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CustomPaper>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <CustomPaper
              className={classes.dataCardStyleNo}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px",
                      color: !bgcolor ? "black" : "white",
                      [theme.breakpoints.down("xl")]: {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    variant="h6"
                  >
                    Bids
                  </Typography>
                  <Box sx={{ display: "flex" }} mt={1}>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 600,
                        color: !bgcolor ? "black" : "white",
                      }}
                      variant="h4"
                    >
                      0
                    </Typography>
                    {/* <Box sx={classes.percentTextStyle} ml={1}>
                      <NorthEastIcon
                        color="success"
                        style={{ fontSize: "15px" }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontSize: "14px",
                          color: "green",
                        }}
                      >
                        {"0%"}
                      </Typography>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: { xl: "50px", xs: "37px" },
                      width: { xl: "50px", xs: "37px" },
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                    }}
                  >
                    <CustomIcon
                      icon={
                        <img
                          src={BidsColorIcon}
                          alt="BidsColorIcon"
                          style={{ height: "18px", width: "18px" }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </CustomPaper>
          </Grid>
        )}

        {dashboardValue?.ProposalCount.find((x: any) => {
          if (x.name === "No") {
            return x.name;
          }
        }) ? (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <Box
              onClick={() => {
                history.push(
                  `${urls.PROPOSAL_VIEW_PATH}?region=${regionValue}&domain=${domainValue}&interval=-1&action=No&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <CustomPaper
                className={classes.dataCardStyleyes}
                style={{
                  backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                }}
              >
                <Grid
                  container
                  sx={classes.dashboardTopCardTextAndImageWrapper}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: !bgcolor ? "black" : "white",
                        [theme.breakpoints.down("xl")]: {
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                      variant="h6"
                    >
                      No Bids
                    </Typography>
                    <Box sx={{ display: "flex" }} mt={1}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                          color: !bgcolor ? "black" : "white",
                        }}
                        variant="h4"
                      >
                        {
                          dashboardValue?.ProposalCount.find((x: any) => {
                            if (x.name === "No") {
                              return x.name;
                            }
                          }).count
                        }
                      </Typography>

                      {/* <CustomIcon
                        icon={
                          percentageValue
                            .find((obj: any) => obj.name === "No")
                            ?.percentage.startsWith("-") ? (
                            <SouthEastIcon
                              color="success"
                              style={{ fontSize: "14px", color: "#E73644" }}
                            />
                          ) : (
                            <NorthEastIcon
                              color="success"
                              style={{ fontSize: "15px" }}
                            />
                          )
                        }
                      />
                      <Box sx={classes.percentTextStyle}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: percentageValue
                              ?.find((obj: any) => obj.name === "No")
                              ?.percentage?.startsWith("-")
                              ? "red"
                              : "#41CD00",
                            fontSize: "14px",
                          }}
                        >
                          {
                            percentageValue.find(
                              (obj: any) => obj.name === "No"
                            )?.percentage
                          }
                        </Typography>
                      </Box> */}
                    </Box>
                  </Grid>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: { xl: "50px", xs: "37px" },
                        width: { xl: "50px", xs: "37px" },
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                      }}
                    >
                      <CustomIcon
                        icon={
                          <img
                            src={NoBidColorIcon}
                            alt="NoBidColorIcon"
                            style={{ height: "18px", width: "18px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CustomPaper>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <CustomPaper
              className={classes.dataCardStyleyes}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px",
                      color: !bgcolor ? "black" : "white",
                      [theme.breakpoints.down("xl")]: {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    variant="h6"
                  >
                    No Bids
                  </Typography>
                  <Box sx={{ display: "flex" }} mt={1}>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 600,
                        color: !bgcolor ? "black" : "white",
                      }}
                      variant="h4"
                    >
                      0
                    </Typography>
                    {/* <Box sx={classes.percentTextStyle} ml={1}>
                      <CustomIcon
                        icon={
                          <NorthEastIcon
                            color="success"
                            style={{ fontSize: "14px" }}
                          />
                        }
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: percentageValue
                            ?.find((obj: any) => obj.name === "No")
                            ?.percentage?.startsWith("-")
                            ? "red"
                            : "#41CD00",
                          fontSize: "14px",
                        }}
                      >
                        {"0%"}
                      </Typography>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: { xl: "50px", xs: "37px" },
                      width: { xl: "50px", xs: "37px" },
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                    }}
                  >
                    <CustomIcon
                      icon={
                        <img
                          src={NoBidColorIcon}
                          alt="NoBidColorIcon"
                          style={{ height: "18px", width: "18px" }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </CustomPaper>
          </Grid>
        )}

        <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
          <Box
            onClick={() => {
              history.push(
                `${urls.PROPOSAL_VIEW_PATH}?status=Won&to=${dateRange.toDate}&from=${dateRange.fromDate}`
              );
            }}
            sx={{ cursor: "pointer" }}
          >
            <CustomPaper
              className={classes.dataCardStyleTotal}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid item>
                  {dashboardValue?.Total ? (
                    <>
                      <Box
                        onClick={() => {
                          history.push(`${urls.PROPOSAL_VIEW_PATH}?status=Won`);
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: "18px",
                            color: !bgcolor ? "black" : "white",
                            [theme.breakpoints.down("xl")]: {
                              fontSize: "14px",
                              fontWeight: "500",
                            },
                          }}
                          variant="h6"
                        >
                          Won
                        </Typography>
                        <Box sx={{ display: "flex" }} mt={1}>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontWeight: 600,
                              color: !bgcolor ? "black" : "white",
                            }}
                            variant="h4"
                          >
                            {dashboardValue?.Total}
                          </Typography>
                          {/* <Box sx={classes.percentTextStyle}>
                            <CustomIcon
                              icon={
                                wonPercentageValue
                                  .find((obj: any) => obj.name === "Won")
                                  ?.percentage.startsWith("-") ? (
                                  <SouthEastIcon
                                    color="success"
                                    style={{
                                      fontSize: "14px",
                                      color: "#E73644",
                                    }}
                                  />
                                ) : (
                                  <NorthEastIcon
                                    color="success"
                                    style={{ fontSize: "15px" }}
                                  />
                                )
                              }
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: wonPercentageValue
                                  .find((obj: any) => obj.name === "Won")
                                  ?.percentage.startsWith("-")
                                  ? "red"
                                  : "#41CD00",
                                fontSize: "14px",
                              }}
                            >
                              {
                                wonPercentageValue.find(
                                  (obj: any) => obj.name === "Won"
                                )?.percentage
                              }
                            </Typography>
                          </Box> */}
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "18px",
                          color: !bgcolor ? "black" : "white",
                          [theme.breakpoints.down("xl")]: {
                            fontSize: "14px",
                            fontWeight: "500",
                          },
                        }}
                        variant="h6"
                      >
                        Won
                      </Typography>
                      <Box sx={{ display: "flex" }} mt={1}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: 600,
                            color: !bgcolor ? "black" : "white",
                          }}
                          variant="h4"
                        >
                          {0}
                        </Typography>
                        {/* <Box sx={classes.percentTextStyle} ml={1}>
                          <NorthEastIcon
                            color="success"
                            style={{ fontSize: "15px" }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "14px", color: "green" }}
                          >
                            {"0%"}
                          </Typography>
                        </Box> */}
                      </Box>
                    </>
                  )}
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: { xl: "50px", xs: "37px" },
                      width: { xl: "50px", xs: "37px" },
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                    }}
                  >
                    <CustomIcon
                      icon={
                        <img
                          src={WonColorIcon}
                          alt="winIcon"
                          style={{ height: "18px", width: "18px" }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </CustomPaper>
          </Box>
        </Grid>

        {dashboardValue?.ProposalCount.find((x: any) => {
          if (x.name === "Pending") {
            return x.name;
          }
        }) ? (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <Box
              onClick={() => {
                history.push(
                  `${urls.PROPOSAL_VIEW_PATH}?region=${regionValue}&domain=${domainValue}&interval=-1&action=Pending&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <CustomPaper
                className={classes.dataCardStylePending}
                style={{
                  backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                }}
              >
                <Grid
                  container
                  sx={classes.dashboardTopCardTextAndImageWrapper}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: !bgcolor ? "black" : "white",
                        [theme.breakpoints.down("xl")]: {
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                      variant="h6"
                    >
                      {
                        dashboardValue?.ProposalCount.find((x: any) => {
                          if (x.name === "Pending") {
                            return x.name;
                          }
                        }).name
                      }
                    </Typography>
                    <Box sx={{ display: "flex" }} mt={1}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                          color: !bgcolor ? "black" : "white",
                        }}
                        variant="h4"
                      >
                        {
                          dashboardValue?.ProposalCount.find((x: any) => {
                            if (x.name === "Pending") {
                              return x.name;
                            }
                          }).count
                        }
                      </Typography>
                      <Box sx={classes.percentTextStyle}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "red",
                            fontSize: "14px",
                            visibility: "hidden",
                          }}
                        >
                          16.2%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: { xl: "50px", xs: "37px" },
                        width: { xl: "50px", xs: "37px" },
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                      }}
                    >
                      <CustomIcon
                        icon={
                          <img
                            src={PendingColorIcon}
                            alt="PendingColorIcon"
                            style={{ height: "18px", width: "18px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CustomPaper>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <CustomPaper
              className={classes.dataCardStylePending}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px",
                      color: !bgcolor ? "black" : "white",
                      [theme.breakpoints.down("xl")]: {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    variant="h6"
                  >
                    Pending
                  </Typography>
                  <Box sx={{ display: "flex" }} mt={1}>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 600,
                        color: !bgcolor ? "black" : "white",
                      }}
                      variant="h4"
                    >
                      0
                    </Typography>
                  </Box>
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: { xl: "50px", xs: "37px" },
                      width: { xl: "50px", xs: "37px" },
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                    }}
                  >
                    <CustomIcon
                      icon={
                        <img
                          src={PendingColorIcon}
                          alt="PendingIcon"
                          style={{ height: "18px", width: "18px" }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </CustomPaper>
          </Grid>
        )}

        {dashboardValue?.Due.find((x: any) => {
          if (x.name === "Due") {
            return x.name;
          }
        }) ? (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <Box
              onClick={() => {
                history.push(
                  `${urls.PROPOSAL_VIEW_PATH}?status=Due&region=${regionValue}&domain=${domainValue}&interval=-1&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                );
              }}
              sx={{ cursor: "pointer" }}
            >
              <CustomPaper
                className={classes.dataCardStyleDue}
                style={{
                  backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                }}
              >
                <Grid
                  container
                  sx={classes.dashboardTopCardTextAndImageWrapper}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        color: !bgcolor ? "black" : "white",
                        [theme.breakpoints.down("xl")]: {
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                      variant="h6"
                    >
                      {dashboardValue?.Due[0]?.name}
                    </Typography>
                    <Box sx={{ display: "flex" }} mt={1}>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 600,
                          color: !bgcolor ? "black" : "white",
                        }}
                        variant="h4"
                      >
                        {dashboardValue?.Due[0]?.count}
                      </Typography>
                      <Box sx={classes.percentTextStyle}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "green",
                            fontSize: "14px",
                            visibility: "hidden",
                          }}
                        >
                          26.2%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        height: { xl: "50px", xs: "37px" },
                        width: { xl: "50px", xs: "37px" },
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                      }}
                    >
                      <CustomIcon
                        icon={
                          <img
                            src={DueColorIcon}
                            alt="DueColorIcon"
                            style={{ height: "18px", width: "18px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CustomPaper>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
            <CustomPaper
              className={classes.dataCardStyleDue}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px",
                      color: !bgcolor ? "black" : "white",
                      [theme.breakpoints.down("xl")]: {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    variant="h6"
                  >
                    Due
                  </Typography>
                  <Box sx={{ display: "flex" }} mt={1}>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 600,
                        color: !bgcolor ? "black" : "white",
                      }}
                      variant="h4"
                    >
                      0
                    </Typography>
                  </Box>
                  <Box>
                    {/* <CustomIcon
                      icon={
                        <NorthEastIcon
                          color="success"
                          style={{ fontSize: "14px", visibility: "hidden" }}
                        />
                      }
                    /> */}
                  </Box>
                </Grid>
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: { xl: "50px", xs: "37px" },
                      width: { xl: "50px", xs: "37px" },
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: !bgcolor ? "#EFEFFF" : "#383A51",
                    }}
                  >
                    <CustomIcon
                      icon={
                        <img
                          src={DueColorIcon}
                          alt="DueColorIcon"
                          style={{ height: "18px", width: "18px" }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </CustomPaper>
          </Grid>
        )}

        <Grid item xs={12} sm={5.9} md={3.9} lg={1.6} xl={1.6}>
          <Box>
            <CustomPaper
              className={classes.selectCardStyle}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
                <Grid item xs={12}>
                  <Select
                    id="type"
                    name="type"
                    value={timeIntervalValue}
                    onChange={(e: any) => {
                      if (e.target.value == "Custom") {
                        CustomChange();
                      }
                      IntervalChange(e.target.value);
                    }}
                    onClick={(e: any) => {
                      if (e.target.outerText == "Custom Date") {
                        CustomChange();
                      }
                    }}
                    displayEmpty
                    sx={!bgcolor ? classes.cardSelectStyle : dropDownDarkForSx}
                    style={{
                      backgroundColor: !bgcolor
                        ? lightDropDownColor
                        : "#20213D",
                    }}
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
                            backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                            borderRadius: "40px !important",
                            color: pureWhiteColor,
                          },
                          "& .MuiMenuItem-root.Mui-selected:hover": {
                            backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                            color: pureWhiteColor,
                          },
                          borderRadius: "34px",
                          backgroundColor: !bgcolor ? "#E6E7FF" : "#282945",
                          "::-webkit-scrollbar": {
                            display: "none",
                          },
                          MenuListProps: {
                            sx: {
                              backgroundColor: lightDropDownColor,
                              borderRadius: "34px",
                            },
                          },
                        },
                      },
                    }}
                    renderValue={() => (
                      <Typography
                        sx={{ color: !bgcolor ? "#000" : "#fff" }}
                        variant="h5"
                      >
                        {
                          weekMonthData?.find((item: any) => {
                            if (item.value == timeIntervalValue) {
                              return item;
                            }
                          })?.name
                        }
                      </Typography>
                    )}
                  >
                    {weekMonthData?.map((item: any, index) => (
                      <MenuItem
                        key={index}
                        value={item.value}
                        sx={{
                          color: !bgcolor ? "black" : "white",
                          backgroundColor: !bgcolor
                            ? lightDropDownColor
                            : sidebarColor,
                        }}
                      >
                        <Typography variant="subtitle1">{item.name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </CustomPaper>
          </Box>
        </Grid>
      </Grid>
    );
  };
  const rfpVolumn = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomPaper
            className={classes.GraphStyle}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
            }}
          >
            <Grid container sx={classes.dashboardTopCardTextAndImageWrapper}>
              <Grid item>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "34.18px",
                    color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                  }}
                  gutterBottom
                  variant="h2"
                  marginLeft={1}
                >
                  RFP Volume
                </Typography>
              </Grid>
              <Grid item>
                <Stack>
                  <Select
                    sx={
                      !bgcolor
                        ? classes.dropdonwLightStyle
                        : classes.dropdownStyling
                    }
                    id="timeinterval"
                    name="timeinterval"
                    value={timeinterval}
                    style={{
                      backgroundColor: !bgcolor
                        ? lightDropDownColor
                        : "#20213D",
                    }}
                    onChange={(e) => {
                      setTimeinterval(e.target.value);
                    }}
                    renderValue={() => (
                      <Box sx={{ color: !bgcolor ? "black" : "white" }}>
                        {
                          ByType.find((items: any) => {
                            if (items.value === Number(timeinterval)) {
                              return items?.name;
                            }
                          })?.name
                        }
                      </Box>
                    )}
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
                            backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                            borderRadius: "40px !important",
                            color: pureWhiteColor,
                          },
                          "& .MuiMenuItem-root.Mui-selected:hover": {
                            backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                            color: pureWhiteColor,
                          },
                          width: "160px",
                          borderRadius: "34px",
                          backgroundColor: !bgcolor ? "#E6E7FF" : "#282945",
                          "::-webkit-scrollbar": {
                            display: "none",
                          },
                          MenuListProps: {
                            sx: {
                              backgroundColor: lightDropDownColor,
                              borderRadius: "34px",
                            },
                          },
                        },
                      },
                    }}
                    displayEmpty
                  >
                    {ByType?.map((item: any) => (
                      <MenuItem
                        key={item.name}
                        value={item.value}
                        sx={{
                          color: !bgcolor ? "black" : "white",
                          backgroundColor: !bgcolor
                            ? lightDropDownColor
                            : sidebarColor,
                        }}
                      >
                        <Typography variant="subtitle1">{item.name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
            </Grid>
            <Box
              sx={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
                borderRadius: "37px",
              }}
            >
              <CampaignRecipientPieChart
                data={Object.values(projectVolumn)}
                region={regionValue}
                domain={domainValue}
                interval={timeIntervalValue}
              />
            </Box>
          </CustomPaper>
        </Grid>
      </>
    );
  };

  const getGraph = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <CustomPaper
            className={classes.byDomainCardStyle}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "34.18px",
                  color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                }}
                gutterBottom
                variant="h2"
                marginLeft={1}
              >
                RFP By Domain
              </Typography>
            </Box>
            <Box>
              {dashboardValue?.ByDomainValue?.length > 0 ? (
                <DomainByChart
                  domainData={dashboardValue?.ByDomainValue}
                  dateRange={dateRange}
                />
              ) : (
                <Box mt={2}>{NoDataMethod()}</Box>
              )}
            </Box>
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <CustomPaper
            className={classes.byDomainCardStyle}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "34.18px",
                  color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                }}
                gutterBottom
                variant="h2"
                marginLeft={1}
              >
                RFP By Status
              </Typography>
            </Box>
            <Box>
              {dashboardValue.Graph1?.length > 0 ? (
                <SemiCircularChart
                  data={dashboardValue.Graph1}
                  dateRange={dateRange}
                />
              ) : (
                <Box mt={2}>{NoDataMethod()}</Box>
              )}
            </Box>
          </CustomPaper>
        </Grid>
      </Grid>
    );
  };
  const listAssigneeName = (namesString: any) => {
    const namesArray = namesString?.split(",");
    return namesArray;
  };
  const AssigneeData = (assigneeName: any) => {
    let campaignCount: any = {};
    listAssigneeName(assigneeName)?.map((eachCount: any) => {
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
            Assignees
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
                    variant="h5"
                    sx={{ ml: 1, color: bgcolor ? "#ffffff" : "#000000" }}
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
                variant="h5"
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

  const reasonConverter = (reason: any) => {
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
                variant="h5"
                sx={{ ml: 1, color: bgcolor ? "#ffffff" : "#000000" }}
                fontSize={"14px"}
              >
                {reason}
              </Typography>
            </List>
          </Box>
        </Box>
      </CustomPaper>
    );
  };

  const rfpLostDataComment = () => {
    return (
      <>
        <RfpLostDataComment
          items={items}
          setShowDialogComment={setShowDialogComment}
          showDialogComment={showDialogComment}
        />
      </>
    );
  };

  const tableHeaderData = () => {
    return (
      <>
        <Box>
          <Typography
            sx={{
              ...classes.cardHeaderTextStyle,
              color: !bgcolor ? primaryBlackColor : pureWhiteColor,
            }}
            gutterBottom
            variant="h2"
          >
            Due RFPs
          </Typography>
        </Box>
      </>
    );
  };
  const tableHeaderDataLost = () => {
    return (
      <>
        <Box display={"flex"}>
          <Typography
            marginLeft={1.3}
            marginTop={0.5}
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              color: !bgcolor ? primaryBlackColor : pureWhiteColor,
            }}
            gutterBottom
            variant="h2"
          >
            Lost RFP
            <Typography
              marginLeft={1}
              component={"span"}
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: "24px",
                color: bgcolor ? pureWhiteColor : "#373854",
              }}
            >
              (Common reason why we lost RFP)
            </Typography>
          </Typography>
        </Box>
      </>
    );
  };
  const getProjectTop = () => {
    return (
      <>
        <Box sx={classes.dueRfpTableStyle}>
          <CustomTable
            headers={dashboardProjectTop}
            rows={convertProgressData(projectTop)}
            isRowPerPageEnable={true}
            isLoading={isLoading}
            paginationHideShow={true}
            tableHeaderData={tableHeaderData()}
            tableRightBorderShowHide={true}
            dropdownValue={dropdown}
            setPage={setPage}
            setdropdownValue={setdropdown}
            noDataImageHeight={true}
            seeMore={true}
            tableHeaderTextStart
            noDataImageHeightHide={true}
          />
        </Box>
      </>
    );
  };
  const tasksData = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <CustomPaper
            className={classes.openMyStyleWrapper}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container gap={2}>
              <Grid
                item
                sm={12}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  onClick={() => {
                    history.push(`${urls.TASK_VIEW_PATH}`);
                  }}
                >
                  <CustomPaper
                    className={classes.tasksstylegrid}
                    style={{
                      background: !bgcolor
                        ? "rgba(233, 233, 255, 1)"
                        : "#373854",
                    }}
                  >
                    <Box
                      px={9}
                      py={1}
                      component={"img"}
                      src={bgcolor ? MyTaskIcon : MyTaskIconLight}
                      style={{ height: "30px", width: "30px" }}
                    />
                    <Grid container>
                      <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Box sx={classes.myTaskInnerStyle}>
                          <Typography
                            variant="h2"
                            sx={{
                              color: !bgcolor
                                ? primaryBlackColor
                                : pureWhiteColor,
                            }}
                            p={1}
                          >
                            My Tasks
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: !bgcolor ? "black" : "white",
                            wordBreak: "break-all",
                          }}
                          p={1}
                        >
                          {myCountData}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CustomPaper>
                </Box>
              </Grid>

              {loggedInRole && (
                <>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      onClick={() => {
                        history.push(`${urls.TASK_VIEW_PATH}?action=Open`);
                      }}
                    >
                      <CustomPaper
                        className={classes.tasksstylegrid}
                        style={{
                          background: !bgcolor
                            ? "rgba(233, 233, 255, 1)"
                            : "#373854",
                        }}
                      >
                        <Box
                          px={9}
                          py={1}
                          component={"img"}
                          src={!bgcolor ? OpenTaskIconLight : OpenTaskIcon}
                          style={{ height: "30px", width: "30px" }}
                        />
                        <Grid container>
                          <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                            <Box sx={classes.openTaskInnerStyle}>
                              <Typography
                                variant="h2"
                                sx={{
                                  color: !bgcolor
                                    ? primaryBlackColor
                                    : pureWhiteColor,
                                }}
                                p={1}
                              >
                                Open Tasks
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                            <Typography
                              variant="h3"
                              sx={{
                                color: !bgcolor ? "black" : "white",
                                wordBreak: "break-all",
                              }}
                              p={1}
                            >
                              {dashboardValue?.openTasksCount?.find(
                                (data: any) => data?.name === "Open"
                              )?.count ?? 0}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CustomPaper>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </CustomPaper>
        </Grid>
      </>
    );
  };

  const documentStatusHandler = () => {
    return (
      <>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <CustomPaper
            className={{
              ...classes.openMyStyleWrapper,
              ...customScrollCssOuter,
            }}
            style={{
              backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
            }}
          >
            <Typography
              sx={{
                marginTop: "3px",
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              marginLeft={1}
              fontWeight={700}
              gutterBottom
              variant="h2"
            >
              Document Expire Status
            </Typography>
            <Box>
              {documentTypeStatus.length > 0 ? (
                <DocumentStatusChart
                  domainData={documentTypeStatus}
                  dateRange={dateRange}
                />
              ) : (
                <Box mt={2}>{NoDataMethod(true)}</Box>
              )}
            </Box>
          </CustomPaper>
        </Grid>
      </>
    );
  };

  const getLostRfpDetails = () => {
    return (
      <>
        <Grid container spacing={2} pb={1}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <CustomPaper
              className={{
                ...classes.lostRfpStyleWrapper,
                ...customScrollCssOuter,
              }}
              style={{
                backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
              }}
            >
              <CustomTable
                headers={responseHeader}
                rows={convertLostRfpData(lostRfp)}
                isRowPerPageEnable={true}
                isLoading={isLoading}
                paginationHideShow={true}
                tableHeaderData={tableHeaderDataLost()}
                setdropdownValue={setdropdownValue}
                dropdownValue={dropdownValue}
                setPage={setPage}
                tableRightBorderShowHide={true}
                tableHeaderTextStart={true}
                noDataImageHeight={true}
                tooltipEnabled
                noDataImageHeightHide={true}
              />
            </CustomPaper>
          </Grid>
          {documentStatusHandler()}
          {tasksData()}
        </Grid>
      </>
    );
  };

  const handleDaterangeChange = (value: string, date: string) => {
    const formattedDate =
      value && value != "Invalid Date"
        ? moment(value).format("MM-DD-YYYY")
        : moment().format("MM-DD-YYYY");
    const year = moment(value).format("YYYY") > "1999" ? true : false;
    setDateRange({
      ...dateRange,
      [date]: formattedDate,
    });
  };
  const customDate = () => {
    return (
      <>
        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <CustomDatePicker
              handleDaterangeChange={handleDaterangeChange}
              dateRange={dateRange}
              customWidth={{
                xl: "370px",
                lg: "330px",
                md: "320px",
                sm: "260px",
                xs: "260px",
              }}
              toDate="toDate"
              fromDate="fromDate"
              labelFirst="From"
              labelSecond="To"
              labelWidth={{
                xl: "185px",
                lg: "165px",
                md: "160px",
                sm: "130px",
                xs: "130px",
              }}
              placeholderstart="Select From Date"
              placeholderend="Select To Date"
            />
          </Box>
        </Box>
      </>
    );
  };

  const datePickerChanged = () => {
    handleCloseModel();
  };
  const addEmailsDialogFooter = () => {
    return (
      <>
        <Box mt={3} width={"100%"} mb={3}>
          <Box sx={classes.buttonWrapper} gap={3}>
            <CustomButton
              label="Cancel"
              onClick={() => handleCloseModel()}
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
            />
            <CustomButton
              label={"Submit"}
              onClick={() => {
                datePickerChanged();
              }}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Box>
      </>
    );
  };

  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={customDate()}
        dialogFooterContent={addEmailsDialogFooter()}
        width="460px"
        closable={true}
        closeIcon={true}
        closeButtonVisibility
        cancelIcon={true}
        borderRadius="33px"
      />
    );
  };

  const getDashboard = () => {
    return (
      <Box sx={classes.mainWrapper}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            {getCards()}
          </Grid>
          <Grid item xs={12} mt={2}>
            {rfpVolumn()}
          </Grid>
          {!isTrialUser ? (
            <>
              <Grid item xs={12} mt={2}>
                {getGraph()}
              </Grid>
              <Grid item xs={12} mt={2}>
                {getProjectTop()}
              </Grid>
              <Grid item xs={12} mt={2}>
                {getLostRfpDetails()}
              </Grid>
            </>
          ) : (
            <Grid container xs={12} mt={2} pb={2}>
              {tasksData()}
              <Grid
                item
                xl={8.8}
                lg={8.8}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  marginTop: {
                    md: "15px",
                    xl: "0px",
                    lg: "0px",
                    xs: "15px",
                    sm: "15px",
                  },
                  marginLeft: {
                    xl: 2.9,
                    lg: 2.1,
                    md: 0,
                    xs: 0,
                    sm: 0,
                  },
                }}
              >
                <UpgradePlan />
              </Grid>
            </Grid>
          )}
        </Grid>
        {rfpLostDataComment()}
        {customDialog()}
        <CustomLoader isLoading={isLoading} />
      </Box>
    );
  };

  return getDashboard();
};
export default React.memo(Dashboard);
