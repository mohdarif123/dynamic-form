import { useEffect, useState } from "react";
import customTableStyles from "./customTable.styles";
import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  Stack,
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
import NoDataImage from "../../../assets/images/NoDataImage.svg";
import NoDataLight from "../../../assets/images/NoDataLight.svg";
import Pagination from "@mui/material/Pagination";
import divider from "../../../assets/icons/divider.svg";
import usePagination from "./Pagination";
import paginationStyles from "./Pagination.styles";
import CustomIcon from "../CustomIcon/CustomIcon";
import {
  appColor,
  cornflowerBlueColor,
  lightBgColor,
  lightDropDownColor,
  meneItemLightStyle,
  primaryBlackColor,
  primaryColorBlack,
  primaryGray,
  pureWhiteColor,
  semiTransparentBlack,
  semiTransparentWhite,
  sidebarColor,
} from "../../../utils/styles";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import CustomButton from "../CustomButton/CustomButton";
import history from "../../../utils/history";
import urls from "../../constants/UrlConstants";
import React from "react";
import { perPageValue } from "../CustomTable/custompaginationData";
interface CustomProps {
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
  getRowsMultipleCheck?: any;
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
}

const ProposalCommentCustom = (props: CustomProps) => {
  const classes = customTableStyles;
  const pagination = paginationStyles;
  // const [page, setPage] = useState<number>(1);
  const [rowData, setRowData] = useState(props.rows);
  const [selected, setSelected] = useState<any>();
  const bgcolor = useAppSelector(selectBackgroundColor);
  // const [perPage, setPerPage] = useState<any>(props.pageSize);
  const rowPerPageData = [10, 15, 20, 25];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  useEffect(() => {
    setSelected(
      props?.rows?.map((item: any) => item?.id || item?.email || item?.name)
    );
    setRowData(props?.rows);
  }, [props.rows]);

  useEffect(() => {
    setRowData(props?.rows);
  }, [props.headers]);
  const getRowOnClickHandler = (row: any) => {
    let handleRowClick = props.handleRowClick
      ? {
          onClick: () => props.handleRowClick && props.handleRowClick(row),
        }
      : {};
    return handleRowClick;
  };
  const handleClick = () => {
    history.push(urls.DUE_PROPOSAL_VIEW_PATH);
  };

  const PER_PAGE = props.rowsPerPage ?? 10;
  const dataCount = Math.ceil(props.paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  const getRowData = (row: any) => {
    return props.headers.map((column, index) => (
      <TableCell
        sx={classes.tableCell}
        align={column["align"]}
        key={index}
        style={{
          borderRight: props.tableRightBorderShowHide
            ? "none"
            : !bgcolor
            ? "1px solid #D7D7DD"
            : "1px solid rgba(255, 255, 255, 0.07)",
        }}
      >
        <Box style={{ borderTopLeftRadius: "10px" }}>
          {row[column["field"]]}
        </Box>
      </TableCell>
    ));
  };
  const headerDropdownOnchange = (event: any) => {
    props.setdropdownValue({
      ...props.dropdownValue,
      [event.target.name]: { value: event.target.value },
    });
    props?.setPage(1);
    props?.dropdownOnchange && props?.dropdownOnchange(event);
  };
  const getHeaders = () => {
    let checkValue: boolean | null = null;
    if (props?.isSelectAll?.length) {
      checkValue = selected?.every((item: any) =>
        props.isSelectAll?.includes(item)
      );
    }
    return (
      <TableHead>
        <TableRow>
          {props.checkboxSelection && (
            <TableCell
              padding="checkbox"
              sx={classes.tableHeaderCell}
              style={{
                background: !bgcolor ? pureWhiteColor : "#282945",
                borderBottom: bgcolor
                  ? `1px dashed ${semiTransparentBlack}`
                  : `1px dashed ${semiTransparentWhite}`,
                borderRight: props.tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? `1px solid ${semiTransparentWhite}`
                  : `1px solid ${semiTransparentBlack}`,
              }}
            >
              <Checkbox
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
                checked={checkValue ?? false}
                onChange={props.onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )}
          {props.headers.map((column, index) => (
            <>
              {column?.dropdownType ? (
                <>
                  <TableCell
                    sx={
                      props.tableHeaderTextStart
                        ? classes.tableHeaderCellDropdown1
                        : classes.tableHeaderCellDropdown
                    }
                    align={column["align"]}
                    key={index}
                    style={{
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      borderBottom: !bgcolor
                        ? `1px dashed ${semiTransparentBlack}`
                        : `1px dashed ${semiTransparentWhite}`,
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                      padding: props.tableHeaderTextStart ? "0px" : "16px",
                    }}
                  >
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
                            width: 200,
                          },
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
                              borderRadius: "40px !important",
                              color: pureWhiteColor,
                              backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            backgroundColor: !bgcolor ? "#E6E7FF" : "#20213D",
                            "::-webkit-scrollbar": {
                              display: "none",
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
                      {column?.dropdownType?.map((item: any, index: number) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: !bgcolor ? "#373854" : pureWhiteColor,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
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
                        ? `1px dashed ${semiTransparentBlack}`
                        : `1px dashed ${semiTransparentWhite}`,
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={
                        props.tableHeaderTextStart
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
  const getHeadersMulti = () => {
    let checkValue: boolean | null = null;
    if (props?.isSelectAll?.length) {
      checkValue =
        selected?.filter((item: any) => {
          return props.isSelectAll?.includes(item);
        }).length > 0;
    }
    return (
      <TableHead>
        <TableRow style={{ borderRadius: "10px" }}>
          {props.getRowsMultipleCheck && (
            <TableCell
              padding="checkbox"
              sx={classes.tableHeaderCell}
              style={{
                background: !bgcolor ? pureWhiteColor : "#282945",
                borderBottom: !bgcolor
                  ? `1px dashed ${semiTransparentBlack}`
                  : `1px dashed ${semiTransparentWhite}`,
                borderRight: props.tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              <Checkbox
                // sx={classes.checkbox}
                style={{ color: !bgcolor ? "#373854" : pureWhiteColor }}
                checked={checkValue ?? false}
                onChange={props.onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )}
          {props.headers.map((column, index) => (
            <>
              {column?.dropdownType ? (
                <>
                  <TableCell
                    sx={classes.tableHeaderCellDropdown}
                    align={column["align"]}
                    key={index}
                    style={{
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      borderBottom: !bgcolor
                        ? `1px dashed ${semiTransparentBlack}`
                        : `1px dashed ${semiTransparentWhite}`,
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Select
                      sx={
                        !bgcolor
                          ? classes.dropDownLightStyle
                          : classes.dropDownDarkStyle
                      }
                      id={column.name}
                      name={column.name}
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                      }}
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
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              borderRadius: "40px !important",
                              color: pureWhiteColor,
                            },
                            "& .MuiMenuItem-root:hover": {
                              borderRadius: "40px !important",
                              color: pureWhiteColor,
                              backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            backgroundColor: !bgcolor ? "#E6E7FF" : "#20213D",
                            "::-webkit-scrollbar": {
                              display: "none",
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
                      {column?.dropdownType?.map((item: any, index: number) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: !bgcolor ? "#373854" : pureWhiteColor,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </>
              ) : (
                <>
                  {" "}
                  <TableCell
                    sx={classes.tableHeaderCell}
                    align={column["align"]}
                    key={index}
                    style={{
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      borderBottom: !bgcolor
                        ? `1px dashed ${semiTransparentBlack}`
                        : `1px dashed ${semiTransparentWhite}`,
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Typography variant="h4" sx={classes.headerTextStyle}>
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
                {props.checkboxSelection && (
                  <TableCell
                    sx={classes.tableRowCell}
                    padding="checkbox"
                    style={{
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Checkbox
                      onClick={(event) =>
                        props.handleClick ? props.handleClick(event, row) : null
                      }
                      color="primary"
                      checked={
                        props.isSelected
                          ? props.isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                        borderRadius: "15px !important",
                        border: "1px solid #ffffff !important",
                      }}
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
  const getRowsMultiple = () => {
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
                {props.getRowsMultipleCheck && (
                  <TableCell
                    sx={classes.tableRowCell}
                    padding="checkbox"
                    style={{
                      borderRight: props.tableRightBorderShowHide
                        ? "none"
                        : !bgcolor
                        ? "1px solid #D7D7DD"
                        : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Checkbox
                      onClick={(event) =>
                        props.handleClick ? props.handleClick(event, row) : null
                      }
                      color="primary"
                      disabled={!props.getRowsMultipleCheck[index]}
                      checked={
                        props.isSelected
                          ? props.isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                        borderRadius: "5px !important",
                        border: "1px solid #ffffff !important",
                      }}
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
    props.handlePageChange && props.handlePageChange(event, newPage - 1);
    props.setPage && props.setPage(newPage);
  };

  const handleChangePerPageData = (event: any) => {
    props.handlePerPageData && props.handlePerPageData(event);
  };
  const goHomeHandler = () => {
    history.push(urls.DASHBOARD_VIEW_PATH);
  };
  const getTablePagination = () => {
    return (
      <>
        <Box
          style={{
            display: "flex",
            justifyContent: props.isRowPerPageEnable ? "end" : "space-between",
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
                  value={props.pageSize}
                  onChange={(e) => {
                    props?.setPageSize(e.target.value);
                    props?.setPage(Number(1));
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
                          color: pureWhiteColor,
                          backgroundColor: cornflowerBlueColor,
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
                      {props.pageSize}
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
              page={props.pageNumber!}
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
        {!props.paginationDirection && (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {props?.headerData && (
              <Grid item xl={7} lg={6.5} md={12} sm={12} xs={12}>
                {props?.headerData}
              </Grid>
            )}
            {!props?.paginationHideShow &&
              (props.monthlyReportPagination ? (
                <Grid item xl={5} lg={5.5} md={12} sm={12} xs={12}>
                  {rowData?.length ? getTablePagination() : null}
                </Grid>
              ) : (
                <Grid item xl={5} lg={5.5} md={12} sm={12} xs={12}>
                  {rowData?.length ? getTablePagination() : null}
                </Grid>
              ))}
          </Grid>
        )}
        {props.supportTicket && <Box>{props.supportTicket}</Box>}
        <TableContainer
          sx={{
            borderTopLeftRadius: props.headerTopLeftRightRadius
              ? 0
              : "37px !important",
            borderTopRightRadius: props.headerTopLeftRightRadius
              ? 0
              : "37px !important",
            borderBottomRightRadius: "37px !important",
            borderBottomLeftRadius: "37px !important",

            boxShadow: "0px 8px 15px 0px rgba(0, 0, 0, 0)",
            backgroundColor: props.seeMore
              ? bgcolor
                ? "#282945"
                : "#ffffff"
              : "",
          }}
        >
          {props?.tableHeaderData && (
            <Box sx={{ backgroundColor: bgcolor ? "#282945" : "#ffffff" }}>
              {props.tableHeaderData}
            </Box>
          )}
          <Table sx={classes.table}>
            {props.getRowsMultipleCheck ? getHeadersMulti() : getHeaders()}
            {!props.isLoading && rowData?.length <= 0 ? (
              <TableBody sx={classes.tableBody}>
                <TableRow sx={classes.noBorderBottom}>
                  <TableCell
                    colSpan={15}
                    sx={{
                      background: !bgcolor ? pureWhiteColor : "#282945",
                    }}
                  >
                    <Box textAlign="center">
                      <Box
                        component="img"
                        src={!bgcolor ? NoDataLight : NoDataImage}
                        overflow="auto"
                        height={props.noDataImageHeight ? "100px" : "200px"}
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
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : props.getRowsMultipleCheck ? (
              getRowsMultiple()
            ) : (
              getRows()
            )}
          </Table>
          {props.seeMore && rowData?.length > 0 && (
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
                onClick={handleClick}
              >
                ...See More
              </Typography>
            </Box>
          )}
        </TableContainer>
        {props.paginationDirection == "down" && (
          <Grid container>
            {props?.headerData ?? (
              <Grid item xl={6.5} lg={7} md={12} sm={12} xs={12}>
                {props?.headerData}
              </Grid>
            )}
            {!props.paginationHideShow && (
              <Grid xl={5} lg={5.5} md={12} sm={12} xs={12}>
                {rowData?.length ? getTablePagination() : null}
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    );
  };
  return getTable();
};

export default ProposalCommentCustom;
