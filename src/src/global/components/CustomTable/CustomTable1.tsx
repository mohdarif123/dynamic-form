import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import NoDataImage from "assets/images/NoDataImage.svg";
import NoDataLight from "assets/images/NoDataLight.svg";
import divider from "assets/icons/divider.svg";
import usePagination from "./Pagination";
import paginationStyles from "./Pagination.styles";
import { perPageValue } from "./custompaginationData";
import CustomIcon from "../CustomIcon/CustomIcon";
import {
  lightDropDownColor,
  primaryColorBlack,
  primaryGray,
  pureWhiteColor,
} from "../../../utils/styles";
import customTableStyles1 from "./CustomTable1.styles";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import history from "../../../utils/history";
import urls from "../../constants/UrlConstants";
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
  tableRightBorderShowHide?: boolean;
  handlePerPageData?: any;
  perPageData?: any;
  isRowPerPageEnable?: boolean;
  getRowsMultipleCheck?: any;
  headerData?: any;
  headertab?: any;
  setPageSize?: any;
  pageSize?: any;
  headerDropdownValue?: any;
  dropdownOnchange?: any;
  setdropdownValue?: any;
  dropdownValue?: any;
  paginationDirection?: any;
  headerTextStart?: boolean;
};

const CustomTable1: React.FC<Props> = ({
  headers,
  rows,
  checkboxSelection,
  children,
  currentSelectedTab,
  customClasses,
  dropdownOnchange,
  dropdownValue,
  getRowsMultipleCheck,
  handleClick,
  handlePageChange,
  handlePerPageData,
  handleRowClick,
  handleRowsPerPage,
  headerData,
  headerDropdownValue,
  headertab,
  isLoading,
  isRowPerPageEnable,
  isSelectAll,
  isSelected,
  onSelectAllClick,
  pageNumber,
  pageSize,
  paginationCount,
  paginationDirection,
  perPageData,
  rowsPerPage,
  searchFields,
  searchParam,
  setPage,
  setPageSize,
  setdropdownValue,
  size,
  tableRightBorderShowHide,
  headerTextStart,
}) => {
  const classes = customTableStyles1;
  const pagination = paginationStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [rowData, setRowData] = useState(rows);
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    setSelected(
      rows?.map((item: any) => item?.id || item?.email || item?.name)
    );
    setRowData(rows);
  }, [rows]);

  useEffect(() => {
    setRowData(rows);
  }, [headers]);

  const getRowOnClickHandler = (row: any) => {
    let handleRowClicks = handleRowClick
      ? {
          onClick: () => handleRowClick && handleRowClick(row),
        }
      : {};
    return handleRowClicks;
  };

  const PER_PAGE = rowsPerPage ?? 10;
  const dataCount = Math.ceil(paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  const WhiteCheckbox = withStyles({
    root: {
      color: "rgb(122, 129, 253)",
      "&$checked": {
        color: "rgb(122, 129, 253) !important",
        background: "white",
        width: "17px",
        height: "17px",
        textAlignLast: "center",
      },
    },
    checked: {},
  })((props: any) => <Checkbox color="default" {...props} />);

  const getRowData = (row: any) => {
    return headers?.map((column, index) => (
      <>
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
          <Typography
            variant="h6"
            sx={bgcolor ? classes.rowText : classes.rowText1}
          >
            {row[column["field"]]}
          </Typography>
        </TableCell>
      </>
    ));
  };
  const headerDropdownOnchange = (event: any) => {
    setdropdownValue({
      ...dropdownValue,
      [event.target.name]: { value: event.target.value },
    });
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
              sx={bgcolor ? classes.tableHeaderCell : classes.tableHeaderCell1}
              style={{
                background: !bgcolor ? pureWhiteColor : "#282945",

                borderRight: tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
                textAlignLast: "center",
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
                      bgcolor
                        ? classes.tableHeaderCell
                        : classes.tableHeaderCell1
                    }
                    align={column["align"]}
                    key={index}
                    style={{
                      textAlign: headerTextStart ? "start" : "center",
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      background: !bgcolor ? pureWhiteColor : "#282945",
                    }}
                  >
                    <Select
                      sx={
                        !bgcolor
                          ? classes.dropDownLightStyle
                          : classes.dropDownStyle
                      }
                      id={column.name}
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                      }}
                      name={column.name.toLowerCase()}
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
                      {column?.dropdownType?.map((item: any, index: number) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: !bgcolor ? "#373854" : pureWhiteColor,
                            // backgroundColor: appColor,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.names}
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
                      bgcolor
                        ? classes.tableHeaderCell
                        : classes.tableHeaderCell1
                    }
                    style={{
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      color: !bgcolor ? "#373854" : pureWhiteColor,

                      borderRight:
                        tableRightBorderShowHide || headers.length - 1 === index
                          ? "none"
                          : !bgcolor
                          ? "1px solid #D7D7DD"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                    align={column["align"]}
                    key={index}
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
  const getHeadersMulti = () => {
    let checkValue: boolean | null = null;
    if (isSelectAll?.length) {
      checkValue =
        selected?.filter((item: any) => {
          return isSelectAll?.includes(item);
        }).length > 0;
    }
    return (
      <TableHead>
        <TableRow style={{ borderRadius: "10px" }}>
          {getRowsMultipleCheck && (
            <TableCell padding="checkbox" sx={classes.tableHeaderCell}>
              <Checkbox
                sx={classes.checkbox}
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
                    sx={classes.tableHeaderCellDropdown}
                    align={column["align"]}
                    key={index}
                  >
                    <Select
                      sx={classes.dropDownStyle}
                      id={column.name}
                      name={column.name}
                      style={classes.styledrop}
                      onChange={(e: any) => headerDropdownOnchange(e)}
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
                sx={bgcolor ? classes.tableRow : classes.tableRow1}
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
  const getRowsMultiple = () => {
    return (
      <TableBody sx={classes.tableBody}>
        {finalTableData.currentData()?.map((row: any, index: any) => {
          return (
            <>
              <TableRow
                sx={index % 2 == 0 ? classes.tableRow : classes.tableRowOdd}
                key={index}
                {...getRowOnClickHandler(row)}
              >
                {getRowsMultipleCheck && (
                  <TableCell sx={classes.tableRowCell} padding="checkbox">
                    <Checkbox
                      onClick={(event) =>
                        handleClick ? handleClick(event, row) : null
                      }
                      color="primary"
                      disabled={!getRowsMultipleCheck[index]}
                      checked={
                        isSelected
                          ? isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      style={{
                        color: "#fff",
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
    handlePageChange && handlePageChange(event, newPage - 1);
    setPage && setPage(newPage);
  };

  const handleChangePerPageData = (event: any) => {
    handlePerPageData && handlePerPageData(event);
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
                        "&::-webkit-scrollbar-button:end": { display: "block" },
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
                    <MenuItem
                      value={data}
                      sx={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                      }}
                    >
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
              // showLastButton
              // showFirstButton
              // variant="outlined"
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
              justifyContent: "space-between",
            }}
          >
            {headerData && (
              <Grid item xl={7} lg={6.5} md={12} sm={12} xs={12}>
                {headerData()}
              </Grid>
            )}
            <Grid item xl={5} lg={5.5} md={12} sm={12} xs={12}>
              {rowData?.length ? getTablePagination() : null}
            </Grid>
          </Grid>
        )}
        {headertab && <Box>{headertab()}</Box>}
        <TableContainer
          sx={
            currentSelectedTab === "Attributes"
              ? classes.borderRadiusTable
              : classes.borderRadiusTable1
          }
        >
          <Table sx={classes.table}>
            {getRowsMultipleCheck ? getHeadersMulti() : getHeaders()}
            {!isLoading && rowData?.length <= 0 ? (
              <TableCell colSpan={15}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={!bgcolor ? NoDataLight : NoDataImage}
                    overflow="auto"
                    height="200px"
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
                  {/* <Box
                    sx={{ display: "flex", justifyContent: "center" }}
                    mt={4}
                  >
                    <CustomButton
                      label={"Go Home"}
                      onClick={goHomeHandler}
                      customClasses={classes.exportButtonStyle}
                      buttonType={!bgcolor ? "contained" : "outlined"}
                    />
                  </Box> */}
                </Box>
              </TableCell>
            ) : getRowsMultipleCheck ? (
              getRowsMultiple()
            ) : (
              getRows()
            )}
          </Table>
        </TableContainer>
        {paginationDirection == "down" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px",
            }}
          >
            <Box marginLeft="5px">{headerData}</Box>
            <Box>{rowData?.length ? getTablePagination() : null}</Box>
          </Box>
        )}
      </Box>
    );
  };
  return getTable();
};

export default CustomTable1;
