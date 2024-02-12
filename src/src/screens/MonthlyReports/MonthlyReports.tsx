import { Box, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import * as monthlyReportServices from "./MonthlyReports.services";
import MonthlyReportsStyle from "./MonthlyReports.style";
import React, { useEffect, useState } from "react";
import { handleSort } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { Month, Years, weekValue } from "./MonthlyReports.Data";
import { CustomButton, CustomTable } from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { pureWhiteColor } from "utils/styles";
import ExportModal from "./ExportModal";
import moment from "moment";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomDatePicker1 from "global/components/CustomDatePicker/CustomDatePicker1";
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const MonthlyReports = () => {
  useTitle(strings.MONTHLYREPORTS);
  const classes = MonthlyReportsStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pageTable2, setPageTable2] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [indexValue, setIndex] = useState(0);
  const weekDropDown = [
    weekValue(7),
    weekValue(14),
    weekValue(21),
    weekValue(28),
  ];
  const weekDropDown2 = [
    weekValue(13),
    weekValue(20),
    weekValue(27),
    weekValue(34),
  ];
  const [dropdown, setdropdown] = useState({
    context: { value: "US" },
  });
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [weekValueData, setWeekValueData] = useState<any>("");
  const [dateValue, setDateValue] = useState<any>("");
  const [exportModal, setExportModal] = useState<any>(false);
  const [headerInitalType, setInitalType] = useState<any>({
    year: currentYear,
    region: dropdown.context.value,
    month: currentMonth,
    toDate: new Date(),
  });
  const [dropdownValue, setDropDownValue] = useState<any>({
    region: [],
    year: Years,
    month: Month,
    tablevalues: [],
    tablevalues2: [],
  });
  const userPerPage = 10;
  const pageVisited = (page - 1) * pageSize;
  const displaytable = dropdownValue.tablevalues?.slice(
    pageVisited,
    pageVisited + pageSize
  );
  const monthlyReportsTableHeader: any[] = [
    {
      name: "Domain",
      field: "name",
    },
    {
      name: "Region",
      field: "context",
      dropdownType: dropdownValue?.region,
    },
    {
      name: "Scrubbed RFPs",
      field: "scrapped",
    },
    {
      name: "Bidded RFPs",
      field: "bid",
    },
    {
      name: "Submitted RFPs",
      field: "submitted",
    },
  ];
  const monthlyReportsWonLostTableHeader: any[] = [
    {
      name: "Won",
      field: "won",
    },
    {
      name: "Lost",
      field: "lost",
    },
    {
      name: "Cancelled RFPs",
      field: "cancelled",
    },
  ];

  useEffect(() => {
    getTableData();
  }, [dateValue, dropdown]);

  const handleClick = (event: any, url: any) => {
    event.preventDefault();
    if (event.ctrlKey) {
      window.open(url, "_blank");
    } else {
      history.push(url);
    }
  };

  const handleDatePickerOnchange = (updatedDate: any) => {
    const formatedDate = moment(updatedDate).format("MM/DD/YYYY");
    setInitalType({
      year: moment(formatedDate).format("YYYY"),
      month: moment(formatedDate).format("MM"),
      toDate: moment(updatedDate),
    });
    setDateValue(formatedDate);
  };
  const handleDaterangeChange = (value: string, date: string) => {
    const formattedDate =
      value == "Invalid Date" || !value
        ? moment().format("MM-DD-YYYY")
        : moment(value).format("MM-DD-YYYY");
    setDateValue(
      value == "Invalid Date" || !value
        ? moment().format("MM-DD-YYYY")
        : moment(value).format("MM-DD-YYYY")
    );
    if (date === "toDate") {
      setInitalType({
        ...headerInitalType,
        year: moment(formattedDate).format("YYYY"),
        month: moment(formattedDate).format("MM"),
        toDate: value == "Invalid Date" || !value ? moment() : moment(value),
      });
    }
  };

  const dueDateData = () => {
    return (
      <>
        <Box marginLeft={0.5} sx={{ display: "flex", alignItems: "center" }}>
          <CustomDatePicker1
            handleDaterangeChange={(value: any, type: any) =>
              handleDaterangeChange(value, type)
            }
            toDate="toDate"
            dateRange={headerInitalType}
            customWidth={{
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "none",
                borderRadius: "0px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "none",
                borderRadius: "0px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "none",
                borderRadius: "0px",
              },
              "& .MuiInputBase-root-MuiOutlinedInput-root": {
                borderColor: "none",
                borderRadius: "0px",
              },
              ".MuiSvgIcon-root ": {
                fill: "#7A81FD !important",
              },
            }}
            lableSecond="Expiry Date"
            gridScreenValue={true}
          />
        </Box>
      </>
    );
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

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const [region, tablevalues] = await Promise.all([
        monthlyReportServices.getRegion(),
        monthlyReportServices.getData(
          headerInitalType.month,
          headerInitalType.year,
          dropdown.context.value
        ),
      ]);
      const tablevaluesData = Table1OnChange(
        tablevalues,
        headerInitalType.month,
        headerInitalType.year
      );
      const filterData = convertAssigneeData(handleSort(region));
      setDropDownValue({
        region: filterData,
        tablevalues: tablevaluesData,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const Table1OnChange2 = (data: any) => {
    return data.map((data: any) => {
      return {
        ...data,
        name: (
          <>
            <Box>
              <Typography sx={classes.headertableStyleName} variant="h5">
                {data.name}
              </Typography>
            </Box>
          </>
        ),
        scrapped: (
          <>
            <Box>
              <Typography sx={classes.headertableStylescrapped} variant="h5">
                {data.scrapped}
              </Typography>
            </Box>
          </>
        ),
        submitted: (
          <>
            <Box>
              <Typography sx={classes.headertableStylescrapped} variant="h5">
                {data.submitted}
              </Typography>
            </Box>
          </>
        ),
      };
    });
  };
  const Table1OnChangeWeekly = (data: any, first: any, second: any) => {
    return data.map((data: any) => {
      return {
        ...data,
        name: (
          <>
            <Box>
              <Box sx={classes.headertableStyleName}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.name}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        context: (
          <>
            <Box>
              <Box sx={classes.headertableStyleName}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.context}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        won: (
          <>
            <Box>
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.won} /{data.lost} /{data.cancelled}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        submitted: (
          <>
            {data.submitted === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.submitted}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=Submitted&fromDate=` +
                      first +
                      "&toDate=" +
                      second +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.submitted}
                </Typography>
              </Box>
            )}
          </>
        ),
        bid: (
          <>
            {data.bid === 0 ? (
              <Box sx={classes.headertableStyle}>
                {" "}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.bid}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=Yes&status=All&&fromDate=` +
                      first +
                      "&toDate=" +
                      second +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.bid}
                </Typography>
              </Box>
            )}
          </>
        ),
        scrapped: (
          <>
            {data.scrapped === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.scrapped}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=All&&fromDate=` +
                      first +
                      "&toDate=" +
                      second +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.scrapped}
                </Typography>
              </Box>
            )}
          </>
        ),
      };
    });
  };
  const Table1OnChange = (data: any, month: any, year: any) => {
    return data.map((data: any) => {
      return {
        ...data,
        name: (
          <>
            <Box>
              <Typography
                variant="h5"
                // onClick={() => history.push(urls.ProposalViewPath)}
              >
                {data.name}
              </Typography>
            </Box>
          </>
        ),
        context: (
          <>
            <Box>
              <Typography variant="h5">{data.context}</Typography>
            </Box>
          </>
        ),
        won: (
          <>
            <Box>
              {data.won === 0 ? (
                <Box sx={classes.headertableStyle}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {data.won}
                  </Typography>{" "}
                </Box>
              ) : (
                <Box
                  sx={classes.headertableStylesky}
                  onClick={(e: any) =>
                    handleClick(
                      e,
                      `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                        data.name +
                        `&action=No&status=Won&month=` +
                        month +
                        `&year=` +
                        year +
                        `&region=` +
                        dropdown.context.value
                    )
                  }
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {data.won}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        ),
        lost: (
          <Box>
            {data.lost === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.lost}
                </Typography>{" "}
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=Lost&month=` +
                      month +
                      `&year=` +
                      year +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.lost}
                </Typography>
              </Box>
            )}
          </Box>
        ),
        cancelled: (
          <Box>
            {data.cancelled === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.cancelled}
                </Typography>{" "}
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=Cancelled&month=` +
                      month +
                      `&year=` +
                      year +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.cancelled}
                </Typography>
              </Box>
            )}
          </Box>
        ),
        submitted: (
          <>
            {data.submitted === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.submitted}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=Submitted&month=` +
                      month +
                      `&year=` +
                      year +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.submitted}
                </Typography>
              </Box>
            )}
          </>
        ),
        bid: (
          <>
            {data.bid === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.bid}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=Yes&status=No&month=` +
                      month +
                      `&year=` +
                      year +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.bid}
                </Typography>
              </Box>
            )}
          </>
        ),
        scrapped: (
          <>
            {data.scrapped === 0 ? (
              <Box sx={classes.headertableStyle}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.scrapped}
                </Typography>{" "}
              </Box>
            ) : (
              <Box
                sx={classes.headertableStylesky}
                onClick={(e: any) =>
                  handleClick(
                    e,
                    `${urls.PROPOSAL_VIEW_PATH}?domain=` +
                      data.name +
                      `&action=No&status=All&month=` +
                      month +
                      `&year=` +
                      year +
                      `&region=` +
                      dropdown.context.value
                  )
                }
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.scrapped}
                </Typography>
              </Box>
            )}
          </>
        ),
      };
    });
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangePageTable2 = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageTable2(newPage);
  };
  const getTablevalues = async (month: any, year: any, region: any) => {
    try {
      setIsLoading(true);
      const [tablevalues] = await Promise.all([
        monthlyReportServices.getData(month, year, region),
      ]);
      const [tablevalues2] = await Promise.all([
        monthlyReportServices.getDataTarget(month, year),
      ]);

      const tablevaluesData = Table1OnChange(tablevalues, month, year);
      const tablevalues2value = Table1OnChange2(tablevalues2.value);
      setDropDownValue({
        ...dropdownValue,
        tablevalues: tablevaluesData,
        tablevalues2: tablevalues2value,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getWeeklyData = async (index: any, value: any) => {
    try {
      setIsLoading(true);
      const [tablevalues] = await Promise.all([
        monthlyReportServices.getDataWeek(
          weekDropDown2[index],
          value,
          dropdown.context.value
        ),
      ]);
      const tablevaluesData = Table1OnChangeWeekly(
        tablevalues,
        weekDropDown2[index],
        value
      );
      setDropDownValue({
        ...dropdownValue,
        tablevalues: tablevaluesData,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getWekkValueOnCall = (index: any, value: any) => {
    getWeeklyData(index, value);
  };
  const changeYear = (event: any) => {
    setInitalType({
      ...headerInitalType,
      year: event.target.value,
    });
    getTablevalues(
      headerInitalType.month,
      event.target.value,
      dropdown.context.value
    );
  };
  const changeRegion = (event: any) => {
    setWeekValueData("");
    setInitalType({
      ...headerInitalType,
      region: event.target.value,
    });
    getTablevalues(
      headerInitalType.month,
      headerInitalType.year,
      event.target.value
    );
  };
  const changeMonth = (event: any) => {
    setInitalType({
      ...headerInitalType,
      month: event.target.value,
    });
    getTablevalues(
      event.target.value,
      headerInitalType.year,
      dropdown.context.value
    );
  };
  const exportModalData = () => {
    setExportModal(true);
  };
  const exportButton = () => {
    return (
      <>
        <Box sx={classes.buttonWrapper}>
          <CustomButton
            onClick={() => {
              exportModalData();
            }}
            buttonType="outlined"
            label="Export"
            customClasses={{
              width: {
                xl: "130px",
                lg: "130px",
                md: "130px",
                sm: "130px",
                xs: "270px",
              },
              border: !bgcolor
                ? "1px solid #7A81FD !important"
                : "1.5px solid #7A81FD !important",
            }}
            icon={<AddIcon htmlColor={"#7A81FD"} />}
          />
          {dueDateData()}
        </Box>
      </>
    );
  };
  const emptyBox = () => {
    return (
      <>
        <Box mt={6}></Box>
      </>
    );
  };
  const dropdownOnchange = (event: any) => {
    changeRegion(event);
  };
  const tableValue = () => {
    return (
      <>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
          gap={1}
        >
          <Grid
            item
            sx={{ minWidth: "200px", width: "100%", overflow: "auto" }}
            xl={8}
            lg={7.5}
          >
            <CustomTable
              headers={monthlyReportsTableHeader}
              rows={displaytable}
              isRowPerPageEnable={true}
              isLoading={isLoading}
              paginationCount={dropdownValue.tablevalues?.length}
              handlePageChange={handleChangePage}
              rowsPerPage={userPerPage}
              headerData={exportButton()}
              setPage={setPage}
              paginationHideShow={true}
              dropdownValue={dropdown}
              setdropdownValue={setdropdown}
              tableHeaderTextStart
              tableRowTextStart
            />
          </Grid>
          <Grid
            item
            sx={{ minWidth: "100px", width: "100%", overflow: "auto" }}
            xl={3.8}
            lg={4.4}
            mt={
              isLoading && dropdownValue.tablevalues?.length === 0
                ? 6.7
                : displaytable?.length === 0
                ? 7
                : 1
            }
          >
            <CustomTable
              headers={monthlyReportsWonLostTableHeader}
              rows={displaytable}
              isRowPerPageEnable={true}
              isLoading={isLoading}
              paginationCount={dropdownValue.tablevalues?.length}
              pageNumber={page}
              handlePageChange={handleChangePage}
              rowsPerPage={pageSize}
              headerData={emptyBox()}
              monthlyReportPagination={true}
              setPageSize={setPageSize}
              pageSize={pageSize}
              setPage={setPage}
              removePaginationWhiteSpace={true}
              tableHeaderTextStart
              tableRowTextStart
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getCards = () => {
    return (
      <>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
            <Box>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="region"
                  name="region"
                  value={dropdown.context.value}
                  onChange={(e: any) => {
                    setInitalType({
                      ...headerInitalType,
                      region: e.target.value,
                    });
                    changeRegion(e);
                  }}
                  renderValue={() => dropdown.context.value}
                  displayEmpty
                >
                  {dropdownValue?.region?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.name}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
            <Box>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="year"
                  name="year"
                  value={headerInitalType.year}
                  onChange={(e: any) => {
                    setInitalType({
                      ...headerInitalType,
                      year: e.target.value,
                    });
                    setWeekValueData("");
                    changeYear(e);
                  }}
                  renderValue={() => headerInitalType.year}
                  displayEmpty
                >
                  {Years?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.value}>
                      <Typography variant="subtitle1">{item.label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
            <Box>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="month"
                  name="month"
                  value={parseInt(headerInitalType.month)}
                  onChange={(e) => {
                    setWeekValueData("");
                    changeMonth(e);
                  }}
                  renderValue={() => headerInitalType.month}
                  displayEmpty
                >
                  {Month?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item.value}>
                      <Typography variant="subtitle1">{item.label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
            <Box>
              <Stack direction="column">
                <Select
                  sx={classes.dropDownStyle}
                  id="week"
                  name="week"
                  value={weekValueData}
                  onChange={(e) => {
                    weekDropDown.find((item: any, index: any) => {
                      if (e.target.value === item) {
                        setIndex(index);
                        getWekkValueOnCall(index, e.target.value);
                      }
                    });
                    setWeekValueData(e.target.value);
                  }}
                  renderValue={() => weekValueData}
                  displayEmpty
                >
                  {weekDropDown?.map((item: any, index: any) => (
                    <MenuItem key={index} value={item}>
                      <Typography variant="subtitle1">
                        {" "}
                        Week Ending {item}
                      </Typography>
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

  const getHeader = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{
            color: !bgcolor ? "#000000" : pureWhiteColor,
          }}
          mb={2}
        >
          Monthly Reports
        </Typography>
      </>
    );
  };

  const ExportOnclick = () => {
    return (
      <ExportModal
        setExportModal={setExportModal}
        exportModal={exportModal}
        region={dropdown.context.value}
        month={headerInitalType.month}
        year={headerInitalType.year}
        displaytable={displaytable}
      />
    );
  };

  return (
    <>
      <Box mt={11} px={3}>
        {getHeader()}
        {tableValue()}
        {ExportOnclick()}
        <CustomLoader isLoading={isLoading} />
      </Box>
    </>
  );
};
export default React.memo(MonthlyReports);
