import { useEffect, useState } from "react";
import CustomTable1 from "global/components/CustomTable/CustomTable1";
import { Box } from "@mui/material";

interface CustomProps {
  tableData: any[];
  setSelectedValue?: any;
  page?: any;
  subDomain?: any;
  pageSize?: any;
  dropDownValue?: any;
  getStepper?: any;
  getStepperSecond?: any;
  currentSelectedTab?: any;
  setdropdownValue?: any;
  dropdownValue?: any;
  selected?: any;
  isLoading: any;
  newValueAttribute: any;
}

const AdminTableData = (props: CustomProps) => {
  const [page, setPage] = useState(props.page ?? 1);
  const [pageSize, setPageSize] = useState<number>(props.pageSize ?? 10);
  const pageVisited = (page - 1) * pageSize;
  const displayRows = props.tableData?.slice(
    pageVisited,
    pageVisited + pageSize
  );

  const adminTableHeaderDomain: any[] = [
    {
      name: props.newValueAttribute,
      field: "name",
    },
    {
      name: props.subDomain ? "Domain" : "Region",
      field: props.subDomain ? "type" : "context",
      dropdownType: props.dropDownValue,
    },
  ];
  const adminTableHeader: any[] = [
    {
      name: props.newValueAttribute,
      field: "name",
    },
  ];
  useEffect(() => {
    setPage(1);
  }, [props.tableData]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const isSelected = (name: any) => {
    const findValue = props?.selected?.map((item: any) => item.name);
    return findValue.indexOf(name) !== -1;
  };

  const singleCheckboxHandler = (event: any, row: any) => {
    const selectedCheckBoxValue: any[] = [];
    if (isSelected(row.name)) {
      const removeSelectedArrayValue = props?.selected?.filter(
        (element: any) => {
          return element.name !== row.name;
        }
      );

      props.setSelectedValue(removeSelectedArrayValue);
    } else {
      if (event?.target?.checked) {
        selectedCheckBoxValue.push(...props.selected, {
          context: row.context,
          type: row.type,
          name: row.name,
        });
        props.setSelectedValue(selectedCheckBoxValue);
      }
    }
  };

  const selectAllCheckBoxHandler = (event: any, data: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = data?.map((item: any) => {
        return {
          context: item.context,
          type: item.type,
          name: item.name,
        };
      });
      props.setSelectedValue(newSelected);
      checkBoxValue.push(...props?.selected, ...newSelected);
      props.setSelectedValue(checkBoxValue);
      return;
    }
    let newSelected = props.tableData?.map((item: any) => item.name);
    let unCheckSelectAll = props.selected?.filter(
      (item: any) => !newSelected.includes(item.name)
    );
    props.setSelectedValue(unCheckSelectAll);
  };
  return (
    <>
      <Box>
        <CustomTable1
          headers={
            props.dropDownValue ? adminTableHeaderDomain : adminTableHeader
          }
          rows={displayRows}
          checkboxSelection={true}
          isRowPerPageEnable={true}
          headertab={props.getStepper}
          paginationCount={props.tableData?.length}
          pageNumber={page}
          handlePageChange={handleChangePage}
          rowsPerPage={pageSize}
          setdropdownValue={props.setdropdownValue}
          dropdownValue={props.dropdownValue}
          headerData={props.getStepperSecond}
          // paginationDirection={"down"}
          isLoading={props.isLoading}
          currentSelectedTab={props.currentSelectedTab}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
          onSelectAllClick={(e: any) =>
            selectAllCheckBoxHandler(e, displayRows)
          }
          isSelectAll={props?.selected?.map((item: any) => item.name)}
          headerTextStart
        />
      </Box>
    </>
  );
};
export default AdminTableData;
