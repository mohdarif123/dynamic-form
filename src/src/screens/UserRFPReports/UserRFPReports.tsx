import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as userRfpServices from "./UserRFPReports.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CustomDatePicker from "global/components/CustomDatePicker/CustomDatePicker";
import moment from "moment-timezone";
import strings from "global/constants/StringConstants";
import { CustomDateRange } from "./UserRFPReports.Type";
import UserRFPReportsStyle from "./UserRFPReports.style";
import { handleSort, isTruthy, openWarningNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { CustomButton, CustomTable } from "global/components";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useTitle } from "utils/UseTitle";
import _ from "lodash";
import { pureWhiteColor } from "utils/styles";
import AddIcon from "@mui/icons-material/Add";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import ExportModal from "./UserRfpReportExport";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const UserRFPReport = () => {
  useTitle(strings.USERRFPREPORTS);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const initialState: any = {
    fromDate: moment().subtract(1, "month").format("L").replaceAll("/", "-"),
    toDate: moment().format("L").replaceAll("/", "-"),
  };
  const [exportModal, setExportModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [dateRangeChanged, setDateRangeChanged] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Array<any>>([]);
  const classes = UserRFPReportsStyle;
  const [headerInitalType, setInitalType] = useState({
    type: "All",
    region: "All",
    domian: "All",
    status: "All",
    name: "All",
    email: "All",
  });

  const [regionValue, setRegionValue] = useState<any>("US");
  const [viewAll, setViewAll] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageViewAll, setPageViewAll] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const pageVisited = (page - 1) * pageSize;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  const displayData = tableData?.slice(pageVisited, pageVisited + pageSize);
  const [dropdownValue, setDropDownValue] = useState<any>({
    type: [],
    domain: [],
    region: [],
    status: [],
    name: [],
  });
  const [dropdown, setdropdown] = useState({
    region: { value: "All" },
    domain: { value: "All" },
    type: { value: "All" },
    status: { value: "All" },
    name: { value: "All" },
  });
  const proposalTableHeader: any[] = [
    {
      name: "Name",
      field: "name",
      dropdownType: dropdownValue.name,
    },
    {
      name: "Type",
      field: "type",
      dropdownType: dropdownValue.type,
    },
    {
      name: "Domain",
      field: "domain",
      dropdownType: dropdownValue.domain,
    },
    {
      name: "Region",
      field: "region",
      dropdownType: dropdownValue.region,
    },
    {
      name: "Status",
      field: "status",
      dropdownType: dropdownValue.status,
    },
    {
      name: "Total",
      field: "count",
    },
  ];
  useEffect(() => {
    proposalApiHandler();
    tablevalue();
  }, []);

  useEffect(() => {
    tablevalue();
  }, [dropdown, dateRange]);

  useEffect(() => {
    setPage(1);
  }, [dropdown]);

  useEffect(() => {
    setPageViewAll(0);
  }, [openModal]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const emailData = (email: any) => {
    const data = dropdownValue?.name?.find((item: any, index: any) => {
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

  const proposalApiHandler = async () => {
    try {
      setIsLoading(true);
      const [domain, region, type, status, name] = await Promise.all([
        userRfpServices.getDomain(regionValue),
        userRfpServices.getRegion(),
        userRfpServices.getType(),
        userRfpServices.getStatus(),
        userRfpServices.getName(),
      ]);
      const filternameValue: any = _.unionBy(name, "name");
      setDropDownValue({
        type: convertAssigneeData(handleSort(type)),
        domain: convertAssigneeData(handleSort(domain)),
        region: convertAssigneeData(handleSort(region)),
        status: convertAssigneeData(handleSort(status)),
        name: convertAssigneeData(handleSort(filternameValue)),
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const tablevalue = async () => {
    if (dateRange.fromDate && dateRange.toDate) {
      try {
        setIsLoading(true);

        const response = await userRfpServices.getTableData(
          dateRange.fromDate,
          dateRange.toDate,
          dropdown.type.value,
          dropdown.region.value,
          dropdown.domain.value,
          dropdown.status.value,
          emailData(dropdown.name.value)
        );
        const tabledata = convertDataToTableFormat(response);
        setTableData([...tabledata]);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification("Please select valid date range");
    }
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
    setDateRangeChanged(true);
    setSelectedTableData([]);
    tablevalue();
  };
  const handleView = (email: any, status: any) => {
    setViewAll(email);
    history.push(`${urls.USER_PROPOSAL_HISTORY_REPORT}?id=${email}`, {
      domain: dropdown?.domain?.value,
      region: dropdown?.region?.value,
      status: status,
      dateTo: dateRange?.toDate,
      dateFrom: dateRange?.fromDate,
      type: dropdown?.type?.value,
    });
  };
  const convertDataToTableFormat = (data: any) => {
    return data.map((data: any) => {
      return {
        name: { tooltip: data?.name },
        region: { tooltip: data.region },
        domain: { tooltip: data.domain },
        status: { tooltip: data.status },
        type: { tooltip: data.type },
        count: {
          component: (
            <>
              <Box
                onClick={() => {
                  handleView(data.created_by, data.status);
                }}
                sx={classes.headertableStylesky}
              >
                {data.count}
              </Box>
            </>
          ),
        },
      };
    });
  };

  const exportButton = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-start",
            flexWrap: "wrap",
          }}
        >
          <Box mb={1}>
            <CustomButton
              onClick={() => {
                setExportModal(true);
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
                [`@media screen and (max-width: ${320}px)`]: {
                  width: "220px",
                },
                border: !bgcolor
                  ? "1px solid #7A81FD !important"
                  : "1.5px solid #7A81FD !important",
              }}
              icon={<AddIcon htmlColor={"#7A81FD"} />}
            />
          </Box>
          <Box ml={{ sm: 1 }} mb={{ xs: 1 }}>
            <CustomDatePicker
              handleDaterangeChange={handleDaterangeChange}
              dateRange={dateRange}
              customWidth={{
                xl: "360px",
                lg: "330px",
                sm: "220px",
                md: "310px",
                xs: "270px",
                [`@media screen and (max-width: ${320}px)`]: {
                  width: "220px",
                },
              }}
              toDate="toDate"
              fromDate="fromDate"
              placeholderstart="Select From Date"
              placeholderend="Select To Date"
            />
          </Box>
        </Box>
      </>
    );
  };

  const ExportOnclick = () => {
    return (
      <ExportModal
        setExportModal={setExportModal}
        exportModal={exportModal}
        region={headerInitalType?.region}
        type={headerInitalType?.type}
        domain={headerInitalType?.domian}
        status={headerInitalType?.status}
        createdBy={headerInitalType?.name}
        toDate={dateRange.toDate}
        fromDate={dateRange.fromDate}
        displayData={displayData}
      />
    );
  };

  const getTable = () => {
    return (
      <>
        <Box sx={classes.tableStyle}>
          <CustomTable
            headers={proposalTableHeader}
            rows={displayData}
            isRowPerPageEnable={true}
            isLoading={isLoading}
            paginationCount={tableData?.length}
            pageNumber={page}
            handlePageChange={handleChangePage}
            rowsPerPage={pageSize}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            headerData={exportButton()}
            dropdownValue={dropdown}
            setdropdownValue={setdropdown}
            tooltipEnabled
            tableHeaderTextStart
          />
        </Box>
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
          User RFP Reports
        </Typography>
      </>
    );
  };

  const getUseRFPReportsData = () => {
    return (
      <Box mt={11} px={3}>
        {getHeader()}
        {getTable()}
        {ExportOnclick()}
        <CustomLoader isLoading={isLoading} />
      </Box>
    );
  };
  return getUseRFPReportsData();
};
export default React.memo(UserRFPReport);
