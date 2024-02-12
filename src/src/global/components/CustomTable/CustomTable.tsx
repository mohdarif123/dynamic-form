import { useEffect, useState } from "react";
import customTableStyles from "./customTable.styles";
import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import NoDataImage from "assets/images/NoDataImage.svg";
import NoDataLight from "assets/images/NoDataLight.svg";
import Pagination from "@mui/material/Pagination";
import divider from "assets/icons/divider.svg";
import usePagination from "./Pagination";
import paginationStyles from "./Pagination.styles";
import { perPageValue } from "./custompaginationData";
import CustomIcon from "../CustomIcon/CustomIcon";
import {
  cornflowerBlueColor,
  lightDropDownColor,
  primaryColorBlack,
  primaryGray,
  pureWhiteColor,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import React from "react";
import ViewMoreModal from "./ViewMoreModal";
import { withStyles } from "@mui/styles";

type Props = {
  headers: any[];
  rows: any[];
  customClasses?: { headerCellClass?: string; rowClass?: string };
  size?: any;
  searchFields?: string[];
  handleRowClick?: Function;
  handlePageChange?: Function;
  handleRowsPerPage?: Function;
  paginationCount?: number;
  rowsPerPage?: any;
  pageNumber?: number;
  currentSelectedTab?: string;
  checkboxSelection?: boolean;
  handleClick?: any;
  onSelectAllClick?: any;
  isSelected?: any;
  isSelectAll?: any;
  isLoading?: boolean;
  searchParam?: string;
  setPage?: any;
  handlePerPageData?: any;
  perPageData?: any;
  isRowPerPageEnable?: boolean;
  headerData?: any;
  setPageSize?: any;
  pageSize?: any;
  headerDropdownValue?: any;
  dropdownOnchange?: any;
  setdropdownValue?: any;
  dropdownValue?: any;
  paginationDirection?: any;
  paginationHideShow?: boolean;
  tableHeaderData?: any;
  supportTicket?: any;
  tableRightBorderShowHide?: boolean;
  tableRowsDataCenter?: boolean;
  tableHeaderTextStart?: boolean;
  headerTopLeftRightRadius?: boolean;
  monthlyReportPagination?: any;
  noDataImageHeight?: boolean;
  seeMore?: any;
  tooltipEnabled?: boolean;
  removePaginationWhiteSpace?: boolean;
  tableRowTextStart?: boolean;
  noDataImageHeightHide?: boolean;
};

const CustomTable: React.FC<Props> = ({
  headers,
  rows,
  checkboxSelection,
  children,
  currentSelectedTab,
  customClasses,
  dropdownOnchange,
  dropdownValue,
  handleClick,
  handlePageChange,
  handlePerPageData,
  handleRowClick,
  handleRowsPerPage,
  headerData,
  headerDropdownValue,
  headerTopLeftRightRadius,
  isLoading,
  isRowPerPageEnable,
  isSelectAll,
  isSelected,
  monthlyReportPagination,
  noDataImageHeight,
  onSelectAllClick,
  pageNumber,
  pageSize,
  paginationCount,
  paginationDirection,
  paginationHideShow,
  perPageData,
  removePaginationWhiteSpace,
  rowsPerPage,
  searchFields,
  searchParam,
  seeMore,
  setPage,
  setPageSize,
  setdropdownValue,
  size,
  supportTicket,
  tableHeaderData,
  tableHeaderTextStart,
  tableRightBorderShowHide,
  tableRowsDataCenter,
  tableRowTextStart,
  tooltipEnabled,
  noDataImageHeightHide,
}) => {
  const classes = customTableStyles;
  const pagination = paginationStyles;
  // const [page, setPage] = useState<number>(1);
  const [rowData, setRowData] = useState(rows);
  const [selected, setSelected] = useState<any>();
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [seeMoreData, setSeeMoreData] = useState("");
  const [headerName, setHeaderName] = useState("");
  // const [perPage, setPerPage] = useState<any>(pageSize);
  const rowPerPageData = [10, 15, 20, 25];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  useEffect(() => {
    setSelected(
      rows?.map((item: any) => item?.id || item?.email || item?.name)
    );
    setRowData(rows);
  }, [rows]);

  useEffect(() => {
    setRowData(rows);
  }, [headers]);

  const NoDataMethod = () => {
    return (
      <Box textAlign="center">
        <Box
          component="img"
          src={!bgcolor ? NoDataLight : NoDataImage}
          overflow="auto"
          height={noDataImageHeight ? "100px" : "200px"}
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
  const WhiteCheckbox = withStyles({
    root: {
      color: "rgb(122, 129, 253)",
      "&$checked": {
        color: "rgb(122, 129, 253) !important",
        background: "white",
        width: "17px",
        height: "17px",
      },
    },
    checked: {},
  })((props: any) => <Checkbox color="default" {...props} />);

  const NoDataImagFullHeight = () => {
    return (
      <>
        <Box
          sx={{
            minHeight: noDataImageHeightHide
              ? ""
              : {
                  xl: "calc(100vh - 395px)",
                  lg: "calc(100vh - 445px)",
                  md: "calc(100vh - 395px)",
                  sm: "calc(100vh - 395px)",
                  xs: "calc(100vh - 395px)",
                },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={!bgcolor ? NoDataLight : NoDataImage}
            overflow="auto"
            height={noDataImageHeight ? "100px" : "200px"}
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
      </>
    );
  };

  const getRowOnClickHandler = (row: any) => {
    let handleRowClicks = handleRowClick
      ? {
          onClick: () => handleRowClick && handleRowClick(row),
        }
      : {};
    return handleRowClicks;
  };

  const handleClicks = () => {
    history.push(urls.DUE_PROPOSAL_VIEW_PATH);
  };

  const PER_PAGE = rowsPerPage ?? 10;
  const dataCount = Math.ceil(paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  const BootstrapTooltip = styled(
    ({ className, children, ...props }: TooltipProps) => (
      <Tooltip
        {...props}
        arrow
        classes={{ popper: className }}
        placement="bottom-end"
      >
        {children}
      </Tooltip>
    )
  )(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#7A81FD",
      marginLeft: "40%",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#7A81FD",
    },
  }));

  const getViewMoreModal = () => {
    return (
      <>
        <ViewMoreModal
          openViewMore={openViewMore}
          setOpenViewMore={setOpenViewMore}
          seeMoreData={seeMoreData}
          headerName={headerName}
        />
      </>
    );
  };
  const viewMoreHandler = (seeMoreData: any, i: number) => {
    const columnHeaderName = headers[i].name;
    setOpenViewMore(true);
    setSeeMoreData(seeMoreData);
    setHeaderName(columnHeaderName);
  };

  const answerData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 25 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > 25) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };

  const getRowData = (row: any) => {
    return headers?.map((column, index) => {
      const data = tooltipEnabled
        ? row[column["field"]]?.tooltip
        : row[column["field"]];
      return (
        <React.Fragment key={index}>
          <TableCell
            sx={classes.tableCell}
            align={column["align"]}
            key={index}
            style={{
              borderRight:
                tableRightBorderShowHide || headers.length - 1 === index
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
            }}
          >
            {tooltipEnabled ? (
              <>
                <Box display={"flex"}>
                  <Box>
                    <BootstrapTooltip
                      title={
                        data?.length > 25 ? (
                          <Typography
                            color="inherit"
                            variant="h6"
                            sx={{ cursor: "pointer" }}
                            onClick={() => viewMoreHandler(data, index)}
                          >
                            View more...
                          </Typography>
                        ) : null
                      }
                    >
                      <Box display={"flex"}>
                        <Typography
                          variant="h6"
                          sx={
                            index >= 1 && tableRowsDataCenter
                              ? classes.rowText2
                              : classes.rowText
                          }
                          style={{
                            color: !bgcolor ? "#373854" : pureWhiteColor,
                            display: "inline",
                          }}
                        >
                          {row[column["field"]].component &&
                            row[column["field"]].component}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center" }}
                          ml={0.7}
                        >
                          <Typography
                            variant="h6"
                            sx={
                              index >= 1 && tableRowsDataCenter
                                ? classes.rowText2
                                : classes.rowText
                            }
                            style={{
                              color: !bgcolor ? "#373854" : pureWhiteColor,
                              display: "inline",
                            }}
                          >
                            {answerData(data)}
                          </Typography>
                        </Box>
                      </Box>
                    </BootstrapTooltip>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography
                variant="h6"
                sx={
                  index >= 1 && tableRowsDataCenter
                    ? classes.rowText2
                    : classes.rowText
                }
                style={{
                  ...(tableRowTextStart && classes.tableRowTextStart),

                  color: !bgcolor ? "#373854" : pureWhiteColor,
                }}
              >
                {data}
              </Typography>
            )}
          </TableCell>
        </React.Fragment>
      );
    });
  };
  const headerDropdownOnchange = (event: any) => {
    setdropdownValue({
      ...dropdownValue,
      [event.target.name]: { value: event.target.value },
    });
    setPage(1);
    dropdownOnchange && dropdownOnchange(event);
  };
  const getHeaders = () => {
    let checkValue: boolean | null = null;
    if (isSelectAll?.length) {
      checkValue = selected?.every((item: any) => isSelectAll?.includes(item));
    }
    return (
      <TableHead>
        <TableRow>
          {checkboxSelection && (
            <TableCell
              padding="checkbox"
              sx={classes.tableHeaderCell}
              style={{
                background: !bgcolor ? pureWhiteColor : "#282945",
                borderBottom: !bgcolor
                  ? "1.2px dashed #D7D7DD"
                  : "1.2px dashed rgba(255, 255, 255, 0.07)",
                borderRight: tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              <WhiteCheckbox
                checked={checkValue ?? false}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )}
          {headers.map((column, index) => (
            <>
              {column?.dropdownType ? (
                <>
                  <TableCell
                    sx={
                      tableHeaderTextStart
                        ? classes.tableHeaderCellDropdown1
                        : classes.tableHeaderCellDropdown
                    }
                    align={column["align"]}
                    key={index}
                    style={{
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      borderBottom: !bgcolor
                        ? "1.2px dashed #D7D7DD"
                        : "1.2px dashed rgba(255, 255, 255, 0.07)",
                      borderRight:
                        tableRightBorderShowHide || headers.length - 1 === index
                          ? "none"
                          : !bgcolor
                          ? "1px solid #D7D7DD"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                      padding: tableHeaderTextStart ? "0px" : "16px",
                    }}
                  >
                    {column?.field == urls.PROPOSAL_OWNER_NAME ? (
                      <Select
                        sx={
                          !bgcolor
                            ? classes.dropDownLightStyle
                            : classes.dropDownDarkStyle
                        }
                        id={column.name}
                        name={column.field}
                        style={classes.styledrop}
                        onChange={(e: any) => headerDropdownOnchange(e)}
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: 200,
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                margin: "4px 0",
                              },
                              "& .MuiMenuItem-root.Mui-selected": {
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root:hover": {
                                borderRadius: "40px !important",
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root.Mui-selected:hover": {
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                color: pureWhiteColor,
                              },
                              borderRadius: "34px",
                              backgroundColor: !bgcolor ? "#E6E7FF" : "#20213D",
                              "&::-webkit-scrollbar": {
                                width: "4px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                background: "#7A81FD",
                                borderRadius: "10px",
                                width: "4px",
                              },
                              "&::-webkit-scrollbar-button:start": {
                                display: "block",
                              },
                              "&::-webkit-scrollbar-button:end": {
                                display: "block",
                              },
                            },
                          },
                          MenuListProps: {
                            sx: {
                              backgroundColor: !bgcolor
                                ? lightDropDownColor
                                : "#20213D",
                            },
                          },
                        }}
                        renderValue={() => (
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                              margin: "5px",
                            }}
                          >
                            {column.name}
                          </Typography>
                        )}
                      >
                        {column?.dropdownType?.map(
                          (item: any, index: number) => (
                            <MenuItem
                              key={index}
                              value={item.email}
                              sx={{
                                color: !bgcolor ? "#373854" : pureWhiteColor,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {item.names}
                              </Typography>
                            </MenuItem>
                          )
                        )}
                      </Select>
                    ) : (
                      <Select
                        sx={
                          !bgcolor
                            ? classes.dropDownLightStyle
                            : classes.dropDownDarkStyle
                        }
                        id={column.name}
                        name={column.field.toLowerCase()}
                        style={classes.styledrop}
                        onChange={(e: any) => headerDropdownOnchange(e)}
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: column?.lostRfpReasonWidth ? 300 : 200,
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                margin: "4px 0",
                              },
                              "& .MuiMenuItem-root.Mui-selected": {
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root:hover": {
                                borderRadius: "40px !important",
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root.Mui-selected:hover": {
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                color: pureWhiteColor,
                              },
                              borderRadius: "34px",
                              backgroundColor: !bgcolor ? "#E6E7FF" : "#20213D",
                              "&::-webkit-scrollbar": {
                                width: "4px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                background: "#7A81FD",
                                borderRadius: "10px",
                                width: "4px",
                              },
                              "&::-webkit-scrollbar-button:start": {
                                display: "block",
                              },
                              "&::-webkit-scrollbar-button:end": {
                                display: "block",
                              },
                            },
                          },
                          MenuListProps: {
                            sx: {
                              backgroundColor: !bgcolor
                                ? lightDropDownColor
                                : "#20213D",
                            },
                          },
                        }}
                        renderValue={() => (
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                              margin: "5px",
                            }}
                          >
                            {column.name}
                          </Typography>
                        )}
                      >
                        {column?.dropdownType?.map(
                          (item: any, index: number) => (
                            <MenuItem
                              key={index}
                              value={item.name}
                              sx={{
                                color: !bgcolor ? "#373854" : pureWhiteColor,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {item.names}
                              </Typography>
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell
                    sx={
                      index === 0
                        ? classes.tableHeaderCellStart
                        : classes.tableHeaderCell
                    }
                    align={column["align"]}
                    key={index}
                    style={{
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      borderBottom: !bgcolor
                        ? "1.2px dashed #D7D7DD"
                        : "1.2px dashed rgba(255, 255, 255, 0.07)",

                      borderRight:
                        tableRightBorderShowHide || headers.length - 1 === index
                          ? "none"
                          : !bgcolor
                          ? "1px solid #D7D7DD"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={
                        tableHeaderTextStart
                          ? classes.headerTextStyle1
                          : classes.headerTextStyle
                      }
                    >
                      {column.name}
                    </Typography>
                  </TableCell>
                </>
              )}
            </>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const getRows = () => {
    return (
      <TableBody sx={classes.tableBody}>
        {finalTableData.currentData()?.map((row: any, index: any) => {
          return (
            <>
              <TableRow
                sx={
                  index % 2 == 0
                    ? {
                        margin: "10px 0",
                        background: !bgcolor ? pureWhiteColor : "#282945",
                        color: !bgcolor ? "black" : "white",
                        px: 5,
                      }
                    : {
                        background: !bgcolor ? pureWhiteColor : "#282945",
                        boxShadow: !bgcolor
                          ? "inset 0 0 99999px #E9E9FF"
                          : "inset 0 0 99999px #373854",
                        borderRadius: "37px",
                        color: !bgcolor ? "black" : "white",
                      }
                }
                key={index}
                {...getRowOnClickHandler(row)}
              >
                {checkboxSelection && (
                  <TableCell
                    sx={classes.tableRowCell}
                    padding="checkbox"
                    style={{
                      borderRight: tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                      textAlignLast: "center",
                    }}
                  >
                    <WhiteCheckbox
                      checked={
                        isSelected
                          ? isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      onClick={(event: any) =>
                        handleClick ? handleClick(event, row) : null
                      }
                    />
                  </TableCell>
                )}
                {getRowData(row)}
              </TableRow>
            </>
          );
        })}
      </TableBody>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    handlePageChange && handlePageChange(event, newPage - 1);
    setPage && setPage(newPage);
  };

  const getTablePagination = () => {
    return (
      <>
        <Box
          style={{
            display: "flex",
            justifyContent: isRowPerPageEnable ? "end" : "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box display={"flex"}>
            <Box marginTop="5px">
              <Typography
                sx={classes.perPageText}
                style={{ color: !bgcolor ? "black" : "white" }}
                variant="h6"
              >
                Rows per page
              </Typography>
            </Box>
            <Box
              sx={{ marginRight: "15px", marginTop: "5px" }}
              display={"flex"}
            >
              <Box marginLeft="15px">
                <Select
                  sx={
                    !bgcolor
                      ? classes.dropDownPerPageLight
                      : classes.dropDownStylePerPage
                  }
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setPage(Number(1));
                    // setPerPage(e.target.value);
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
                          backgroundColor: cornflowerBlueColor,
                          color: pureWhiteColor,
                        },
                        "& .MuiMenuItem-root.Mui-selected:hover": {
                          backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                          color: pureWhiteColor,
                        },
                      },
                    },
                    MenuListProps: {
                      sx: {
                        backgroundColor: cornflowerBlueColor,
                      },
                    },
                  }}
                  renderValue={() => (
                    <Box
                      sx={{
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: 400,
                      }}
                    >
                      {pageSize}
                    </Box>
                  )}
                >
                  {perPageValue?.map((data: any) => (
                    <MenuItem value={data} sx={{ color: "#fff" }}>
                      <Typography variant="subtitle1">{data}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box marginLeft="15px">
                <CustomIcon icon={<img src={divider} />} />
              </Box>
            </Box>
          </Box>

          <Box>
            <Pagination
              page={pageNumber!}
              count={dataCount}
              shape="rounded"
              size="medium"
              sx={!bgcolor ? pagination.pageBtnLightTheme : pagination.pageBtn}
              onChange={(event: any, page: any) => {
                handleChangePage(event, page);
              }}
            />
          </Box>
        </Box>
      </>
    );
  };
  const getTable = () => {
    return (
      <Box>
        {!paginationDirection && (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: !removePaginationWhiteSpace
                ? "space-between"
                : "end",
              alignItems: "center",
            }}
          >
            {!removePaginationWhiteSpace && headerData && (
              <Grid item xl={7} lg={6.5} md={12} sm={12} xs={12}>
                {headerData}
              </Grid>
            )}
            {!paginationHideShow &&
              (monthlyReportPagination ? (
                <Grid
                  item
                  xl={!removePaginationWhiteSpace ? 5 : 12}
                  lg={!removePaginationWhiteSpace ? 5.5 : 12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  {rowData?.length ? getTablePagination() : null}
                </Grid>
              ) : (
                <Grid
                  item
                  xl={!removePaginationWhiteSpace ? 5 : 12}
                  lg={!removePaginationWhiteSpace ? 5.5 : 12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  {rowData?.length ? getTablePagination() : null}
                </Grid>
              ))}
          </Grid>
        )}
        {supportTicket && <Box>{supportTicket}</Box>}
        <TableContainer
          sx={{
            borderTopLeftRadius: headerTopLeftRightRadius
              ? 0
              : "37px !important",
            borderTopRightRadius: headerTopLeftRightRadius
              ? 0
              : "37px !important",
            borderBottomRightRadius: "37px !important",
            borderBottomLeftRadius: "37px !important",
            boxShadow: "0px 8px 15px 0px rgba(0, 0, 0, 0)",
            backgroundColor: seeMore ? (bgcolor ? "#282945" : "#ffffff") : "",
            "&::-webkit-scrollbar": {
              height: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#7A81FD",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-button:start": { display: "block" },
            "&::-webkit-scrollbar-button:end": { display: "block" },
          }}
        >
          {tableHeaderData && (
            <Box sx={{ backgroundColor: bgcolor ? "#282945" : "#ffffff" }}>
              {tableHeaderData}
            </Box>
          )}
          <Table sx={classes.table}>
            {getHeaders()}
            {!isLoading && rowData?.length <= 0 ? (
              <TableBody sx={classes.tableBody}>
                <TableRow sx={classes.noBorderBottom}>
                  <TableCell
                    colSpan={20}
                    sx={{
                      background: !bgcolor ? pureWhiteColor : "#282945",
                    }}
                  >
                    {/* {NoDataMethod()} */}
                    {NoDataImagFullHeight()}
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              getRows()
            )}
          </Table>
          {seeMore && rowData?.length > 0 && (
            <Box
              sx={{
                width: "98%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Typography
                mt={1}
                mb={1}
                variant="h4"
                style={{
                  color: !bgcolor ? "rgb(122 129 253)" : "rgb(122 129 253)",
                  cursor: "pointer",
                }}
                onClick={handleClicks}
              >
                ...See More
              </Typography>
            </Box>
          )}
        </TableContainer>
        {paginationDirection === "down" && (
          <Grid container>
            {headerData ?? (
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                {headerData}
              </Grid>
            )}
            {!paginationHideShow && (
              <Grid xl={6} lg={6} md={12} sm={12} xs={12} mt={1}>
                {rowData?.length ? getTablePagination() : null}
              </Grid>
            )}
          </Grid>
        )}
        {getViewMoreModal()}
      </Box>
    );
  };
  return getTable();
};

export default CustomTable;
