import * as React from "react";
import { useEffect, useState } from "react";
import customTableStyles from "./customTable.styles";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
import NoData from "../../../assets/images/tableNoData.svg";
import paginationStyles from "./Pagination.styles";
import CustomButton from "../CustomButton/CustomButton";
import NoDataImage from "../../../assets/images/NoDataImage.svg";
import NoDataLight from "../../../assets/images/NoDataLight.svg";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import { useAppSelector } from "../../../utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "../../../utils/styles";
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
  rowsPerPage?: number;
  pageNumber?: number;
  numSelected?: number;
  rowCount?: number;
  order?: Order;
  orderBy?: number;
  selectedRow?: any;
  handleClick?: any;
  onSelectAllClick?: any;
  isSelected?: any;
  checkboxSelection?: boolean;
  isSelectAll?: any;
  isLoading?: boolean;
}
type Order = "asc" | "desc";

const CustomTable1 = (props: CustomProps) => {
  const classes = customTableStyles;
  const pagination = paginationStyles;
  const [page, setPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(props.pageNumber!);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rowData, setRowData] = useState(props.rows);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<number>(props.headers[0].field);
  const [selected, setSelected] = useState<any>();
  const rowCount = rowData.length;
  const bgcolor = useAppSelector(selectBackgroundColor);

  useEffect(() => {
    setSelected(props?.rows?.map((item: any) => item?.id));
    setRowData(props.rows);
  }, [props.rows]);
  const PER_PAGE = 10;
  const dataCount = Math.ceil(props.paginationCount! / PER_PAGE);
  const finalTableData = usePagination(rowData, PER_PAGE);

  const getRowOnClickHandler = (row: any) => {
    let handleRowClick = props.handleRowClick
      ? {
          onClick: () => props.handleRowClick && props.handleRowClick(row),
        }
      : {};
    return handleRowClick;
  };

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const bb = b[orderBy] as any;
    const aa = a[orderBy] as any;
    const bOrder =
      typeof bb === "number" || typeof bb === "string" ? bb : bb.props.children;
    const aOrder =
      typeof aa === "number" || typeof aa === "string" ? aa : aa.props.children;
    if (bOrder < aOrder) {
      return -1;
    }
    if (bOrder > aOrder) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (property: number) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getHeaderCellClassHandler = () => {
    let customClasses = props.customClasses;
    let handleCustomClass =
      customClasses && customClasses.headerCellClass
        ? {
            className: customClasses.headerCellClass,
          }
        : {};
    return handleCustomClass;
  };

  const getRowData = (row: any) => {
    return props.headers.map((column, index) => (
      <TableCell sx={classes.tableCell} align={column["align"]} key={index}>
        <Box style={{ borderTopLeftRadius: "10px" }}>
          {row[column["field"]]}
        </Box>
      </TableCell>
    ));
  };

  const getHeaders = (
    numSelected: number,
    rowCount: number,
    order: Order,
    orderBy: any
  ) => {
    let checkValue: boolean | null = null;
    if (props?.isSelectAll?.length)
      checkValue = selected?.every((item: any) =>
        props.isSelectAll?.includes(item)
      );
    return (
      <TableHead>
        <TableRow style={{ borderRadius: "10px" }}>
          <TableCell padding="checkbox" sx={classes.tableHeaderCell}>
            <Checkbox
              sx={classes.checkboxStyle}
              checked={checkValue ?? false}
              onChange={props.onSelectAllClick}
            />
          </TableCell>
          {props.headers.map((column, index) => (
            <TableCell
              sx={classes.tableHeaderCell}
              align={column["align"]}
              key={index}
              sortDirection={orderBy === column.field ? order : false}
            >
              <TableSortLabel
                style={{ color: "white" }}
                active={orderBy === column.field}
                direction={orderBy === column.field ? order : "asc"}
                onClick={() => {
                  handleRequestSort(column.field);
                }}
              >
                {column.name}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const getRows = () => {
    return (
      <TableBody sx={classes.tableBody}>
        {finalTableData.currentData()?.map((row: any, index: number) => {
          return (
            <TableRow
              sx={classes.tableRow}
              key={index}
              {...getRowOnClickHandler(row)}
            >
              {props.checkboxSelection && (
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={(event) =>
                      props.handleClick ? props.handleClick(event, row) : null
                    }
                    color="primary"
                    checked={props.isSelected ? props.isSelected(row.id) : null}
                    inputProps={{
                      "aria-labelledby": `enhanced-table-checkbox-${index}`,
                    }}
                  />
                </TableCell>
              )}
              {getRowData(row)}
            </TableRow>
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
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTablePagination = () => {
    return (
      <>
        <Pagination
          page={page}
          count={dataCount}
          shape="rounded"
          size="medium"
          sx={pagination.pageBtn}
          onChange={(event: any, page: any) => {
            handleChangePage(event, page);
          }}
          showLastButton
          showFirstButton
        />
      </>
    );
  };

  const getTable = () => {
    return (
      <Box pb={4}>
        <Table sx={classes.table} stickyHeader>
          {getHeaders(selected?.length, rowCount, order, orderBy)}
          {!props.isLoading && rowData?.length <= 0 ? (
            <TableCell
              colSpan={7}
              style={{
                padding: "20px",
              }}
            >
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
                    color: "rgba(153, 153, 153, 1)",
                  }}
                >
                  We've got nothing for you, sorry!
                </Typography>
                {/* <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
                  {" "}
                  <CustomButton
                    label={"Go Home"}
                    onClick={() => {}}
                    customClasses={classes.exportButtonStyle}
                    buttonType={!bgcolor ? "contained" : "outlined"}
                  />
                </Box> */}
              </Box>
            </TableCell>
          ) : (
            getRows()
          )}
        </Table>
        {rowData?.length ? getTablePagination() : null}
      </Box>
    );
  };

  return getTable();
};

export default CustomTable1;
