import { useEffect, useState } from "react";
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
  sidebarColor,
} from "../../../utils/styles";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import CustomButton from "../CustomButton/CustomButton";
import history from "../../../utils/history";
import urls from "../../constants/UrlConstants";
import React from "react";
import customTableStyles from "../CustomTable/customTable.styles";
import ViewMoreModal from "../CustomTable/ViewMoreModal";
import paginationStyles from "../CustomTable/Pagination.styles";
import usePagination from "../CustomTable/Pagination";
import { perPageValue } from "../CustomTable/custompaginationData";
import { withStyles } from "@mui/styles";
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
  removePaginationWhiteSpace?: boolean;
  secondTable?: any;
}

const CustomTable3 = (props: CustomProps) => {
  const classes = customTableStyles;
  const pagination = paginationStyles;
  // const [page, setPage] = useState<number>(1);
  const [rowData, setRowData] = useState(props.rows);
  const [selected, setSelected] = useState<any>();
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [seeMoreData, setSeeMoreData] = useState("");
  const [headerName, setHeaderName] = useState("");
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

  const BootstrapTooltip = styled(
    ({ className, children, ...props }: TooltipProps) => (
      <Tooltip {...props} arrow classes={{ popper: className }}>
        {children}
      </Tooltip>
    )
  )(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#7A81FD",
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
    const columnHeaderName = props?.headers[i].name;
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

  const NoDataMethod = () => {
    return (
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
          mb={2}
        >
          We've got nothing for you, sorry!
        </Typography>
      </Box>
    );
  };

  const getRowData = (row: any) => {
    return props?.headers?.map((column, index) => {
      const data = props.tooltipEnabled
        ? row[column["field"]]?.tooltip
        : row[column["field"]];
      return (
        <React.Fragment key={index}>
          <TableCell
            sx={classes.tableCellCustom3}
            align={column["align"]}
            key={index}
            style={{
              borderRight:
                props.tableRightBorderShowHide ||
                props?.headers?.length - 1 === index
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
            }}
          >
            {props.tooltipEnabled ? (
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
                  <Box>
                    <Typography
                      variant="h6"
                      sx={
                        index >= 1 && props.tableRowsDataCenter
                          ? classes.rowText2
                          : classes.rowText
                      }
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                      }}
                    >
                      {row[column["field"]].component &&
                        row[column["field"]].component}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }} ml={0.7}>
                    <Typography
                      variant="h6"
                      sx={
                        index >= 1 && props.tableRowsDataCenter
                          ? classes.rowText2
                          : classes.rowText
                      }
                      style={{
                        color: !bgcolor ? "#373854" : pureWhiteColor,
                      }}
                    >
                      {answerData(data)}
                    </Typography>
                  </Box>
                </Box>
              </BootstrapTooltip>
            ) : (
              <Typography
                variant="h6"
                sx={
                  index >= 1 && props.tableRowsDataCenter
                    ? classes.rowText2
                    : classes.rowText
                }
                style={{
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
                borderBottom: !bgcolor
                  ? "1.2px dashed #D7D7DD"
                  : "1.2px dashed rgba(255, 255, 255, 0.07)",
                borderRight: props.tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
                textAlignLast: "center",
              }}
            >
              <WhiteCheckbox
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
                        ? "1.2px dashed #D7D7DD"
                        : "1.2px dashed rgba(255, 255, 255, 0.07)",
                      borderRight:
                        props.tableRightBorderShowHide ||
                        props?.headers?.length - 1 === index
                          ? "none"
                          : !bgcolor
                          ? "1px solid #D7D7DD"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                      padding: props.tableHeaderTextStart ? "0px" : "16px",
                    }}
                  >
                    {column?.field == "state" ? (
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
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root:hover": {
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
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
                              value={item}
                              sx={{
                                color: !bgcolor ? "#373854" : pureWhiteColor,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {item}
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
                                color: pureWhiteColor,
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
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
                                {item.name}
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
                        props.tableRightBorderShowHide ||
                        props?.headers?.length - 1 === index
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
                  ? "1.2px dashed #D7D7DD"
                  : "1.2px dashed rgba(255, 255, 255, 0.07)",
                borderRight: props.tableRightBorderShowHide
                  ? "none"
                  : !bgcolor
                  ? "1px solid #D7D7DD"
                  : "1px solid rgba(255, 255, 255, 0.07)",
                textAlignLast: "center",
              }}
            >
              <WhiteCheckbox
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
                        ? "1.2px dashed #D7D7DD"
                        : "1.2px dashed rgba(255, 255, 255, 0.07)",
                      borderRight:
                        props.tableRightBorderShowHide ||
                        props?.headers?.length - 1 === index
                          ? "none"
                          : !bgcolor
                          ? "1px solid #D7D7DD"
                          : "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    {column?.field == "state" ? (
                      <Select
                        sx={
                          !bgcolor
                            ? classes.dropDownLightStyle
                            : classes.dropDownDarkStyle
                        }
                        id={column.name}
                        name={column.name.toLowerCase()}
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
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root:hover": {
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
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
                        {column?.dropdownType}
                        {column?.dropdownType?.map(
                          (item: any, index: number) => (
                            <MenuItem
                              key={index}
                              value={item}
                              sx={{
                                color: !bgcolor ? "#373854" : pureWhiteColor,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {item}
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
                        name={column.name.toLowerCase()}
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
                                backgroundColor: !bgcolor
                                  ? "#969AFF"
                                  : "#2F3052",
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                              },
                              "& .MuiMenuItem-root:hover": {
                                borderRadius: "40px !important",
                                color: pureWhiteColor,
                                backgroundColor: !bgcolor
                                  ? "#7A81FD"
                                  : "#7A81FD",
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
                                {item.name}
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
                  {" "}
                  <TableCell
                    sx={classes.tableHeaderCell}
                    align={column["align"]}
                    key={index}
                    style={{
                      textAlign: "start",
                      background: !bgcolor ? pureWhiteColor : "#282945",
                      color: !bgcolor ? "#373854" : pureWhiteColor,
                      borderBottom: !bgcolor
                        ? "1.2px dashed #D7D7DD"
                        : "1.2px dashed rgba(255, 255, 255, 0.07)",
                      borderRight:
                        props.tableRightBorderShowHide ||
                        props?.headers?.length - 1 === index
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
                      textAlignLast: "center",
                    }}
                  >
                    <WhiteCheckbox
                      checked={
                        props.isSelected
                          ? props.isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      onClick={(event: any) =>
                        props.handleClick ? props.handleClick(event, row) : null
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
                      textAlignLast: "center",
                    }}
                  >
                    <WhiteCheckbox
                      checked={
                        props.isSelected
                          ? props.isSelected(row.email || row.id || row.name)
                          : null
                      }
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                      disabled={!props.getRowsMultipleCheck[index]}
                      onClick={(event: any) =>
                        props.handleClick ? props.handleClick(event, row) : null
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
                          backgroundColor: cornflowerBlueColor,
                          color: pureWhiteColor,
                        },
                        "& .MuiMenuItem-root.Mui-selected:hover": {
                          backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                          color: pureWhiteColor,
                        },
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
              justifyContent: !props?.removePaginationWhiteSpace
                ? "space-between"
                : "end",
              alignItems: "center",
            }}
          >
            {!props?.removePaginationWhiteSpace && props?.headerData && (
              <Grid item xl={7} lg={6.5} md={12} sm={12} xs={12}>
                {props?.headerData}
              </Grid>
            )}
            {!props?.paginationHideShow &&
              (props.monthlyReportPagination ? (
                <Grid
                  item
                  xl={!props?.removePaginationWhiteSpace ? 5 : 12}
                  lg={!props?.removePaginationWhiteSpace ? 5.5 : 12}
                  md={12}
                  sm={12}
                  xs={12}
                >
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
        {rowData?.length > 0 ? (
          <Grid container gap={1}>
            <Grid item xl={4.8} lg={5.8} md={12} sm={12} xs={12}>
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
                  // boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  boxShadow: "0px 8px 15px 0px rgba(0, 0, 0, 0)",
                  backgroundColor: props.seeMore
                    ? bgcolor
                      ? "#282945"
                      : "#ffffff"
                    : "",
                }}
              >
                {props?.tableHeaderData && (
                  <Box
                    sx={{ backgroundColor: bgcolor ? "#282945" : "#ffffff" }}
                  >
                    {props.tableHeaderData}
                  </Box>
                )}
                <Table sx={classes.responseTable}>
                  {props.getRowsMultipleCheck
                    ? getHeadersMulti()
                    : getHeaders()}
                  {!props.isLoading && rowData?.length <= 0 ? (
                    <TableCell colSpan={15}>{NoDataMethod()}</TableCell>
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
                        color: !bgcolor
                          ? "rgb(122 129 253)"
                          : "rgb(122 129 253)",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      ...See More
                    </Typography>
                  </Box>
                )}
              </TableContainer>
            </Grid>
            <Grid item xl={7} lg={6} md={12} sm={12} xs={12}>
              {props?.secondTable}
            </Grid>
          </Grid>
        ) : (
          !props.isLoading && (
            <Box>
              <Box
                sx={{
                  minHeight: {
                    xl: "calc(100vh - 345px)",
                    lg: "calc(100vh - 250px)",
                    md: "calc(100vh - 250px)",
                    sm: "calc(100vh - 250px)",
                    xs: "calc(100vh - 380px)",
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
                  height={"200px"}
                  width="100%"
                />
                <Typography
                  mt={1}
                  variant="h4"
                  sx={{
                    color: !bgcolor ? primaryColorBlack : pureWhiteColor,
                  }}
                  mb={2}
                >
                  We've got nothing for you, sorry!
                </Typography>
              </Box>
            </Box>
          )
        )}

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
        {getViewMoreModal()}
      </Box>
    );
  };
  return getTable();
};

export default CustomTable3;
