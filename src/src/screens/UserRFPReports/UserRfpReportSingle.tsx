import { Box } from "@mui/system";
import { CustomIcon, CustomTable } from "global/components";
import { useEffect, useState } from "react";
import { getTableDataUser } from "./UserRFPReports.service";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { Typography } from "@mui/material";
import { useLocation } from "react-router";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import {
  cornflowerBlueColor,
  primaryBlackColor,
  pureWhiteColor,
} from "utils/styles";
import { getCustomError } from "utils/customError";

interface CustomProps {
  location?: any;
}

const UserRfpReportSingle = (props: CustomProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const urlParams = useLocation().search;
  const pageValue = props?.location?.state?.page ?? 1;
  const [page, setPage] = useState(Number(pageValue));
  const [viewAll, setViewAll] = useState<any>([]);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [pageSize, setPageSize] = useState(10);

  const status = props?.location?.state?.status;
  const domain = props?.location?.state?.domain;
  const region = props?.location?.state?.region;
  const type = props?.location?.state?.type;
  const dateTo = props?.location?.state?.dateTo;
  const dateFrom = props?.location?.state?.dateFrom;
  const email = new URLSearchParams(urlParams).get("id");
  const userRFPTableHeader: any[] = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Region",
      field: "region",
    },
    {
      name: "Status",
      field: "status",
    },
    {
      name: "Submission Type",
      field: "type",
    },
  ];

  const pageVisitedViewAll = (page - 1) * pageSize;
  const displayRows = viewAll?.slice(
    pageVisitedViewAll,
    pageVisitedViewAll + pageSize
  );

  useEffect(() => {
    viewAllData();
  }, []);

  const viewAllData = async () => {
    try {
      setIsLoading(true);
      const formatedEmail = email?.replace(/\s+/g, "+");
      const response = await getTableDataUser(
        dateFrom,
        dateTo,
        type,
        region,
        domain,
        status,
        formatedEmail
      );
      const tabledata = ViewAllDataChange(response);
      setViewAll(tabledata);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleOnclick = (event: any, item: any) => {
    if (event.ctrlKey) {
      window.open(
        `${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${item.request_id}`,
        "_blank"
      );
    } else {
      history.push(
        `${urls.VIEW_PROPOSAL_VIEW_PATH}?id=` +
          item.request_id +
          `&redirect=` +
          "userRfpReport",
        {
          domain,
          region,
          status,
          type,
          dateTo,
          dateFrom,
          email,
          page,
        }
      );
    }
  };

  const ViewAllDataChange = (item: any) => {
    return item.map((item: any) => {
      return {
        ...item,
        title: (
          <>
            <Box
              onClick={(e) => handleOnclick(e, item)}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                variant="h5"
                sx={{ color: cornflowerBlueColor, fontWeight: 600 }}
              >
                {item.title}
              </Typography>
            </Box>
          </>
        ),
      };
    });
  };
  const handleChangePageViewAll = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const headerData = () => {
    return (
      <>
        <Box display={"flex"} mb={2}>
          <Box sx={{ cursor: "pointer" }}>
            <CustomIcon
              onClick={() => history.push(urls.USER_PROPOSAL_REPORTS)}
              icon={
                <ArrowBackIcon
                  sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                />
              }
            />
          </Box>
          <Box marginLeft={2} width={"400px"}>
            <Typography
              sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
              variant="h1"
            >
              Proposal request status details
            </Typography>
          </Box>
        </Box>
      </>
    );
  };
  const getTable = () => {
    return (
      <>
        <Box sx={{ minWidth: "300px", width: "100%", overflow: "auto" }}>
          <CustomTable
            headers={userRFPTableHeader}
            rows={displayRows}
            isRowPerPageEnable={true}
            isLoading={isLoading}
            paginationCount={viewAll?.length}
            pageNumber={page}
            handlePageChange={handleChangePageViewAll}
            rowsPerPage={pageSize}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            headerData={headerData()}
            tableHeaderTextStart
          />
        </Box>
      </>
    );
  };
  const UserData = () => {
    return (
      <>
        <Box mt={16} px={3}>
          {getTable()}
        </Box>
      </>
    );
  };
  return UserData();
};
export default UserRfpReportSingle;
