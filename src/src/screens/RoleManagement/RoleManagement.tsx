import React, { useEffect, useRef, useState } from "react";
import { initialRoleData, rolesTableHeader } from "./RoleManagementHelpers";
import {
  Box,
  Chip,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import roleManagement from "./RoleManagement.styles";
import { cloneDeep } from "lodash";
import strings from "global/constants/StringConstants";
import { debounceEventHandler, isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { CustomButton, CustomInput, CustomTable } from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import AddUpdateRoles from "./AddUpdateRoles";
import {
  fetchRoles,
  fetchRolesCount,
  fetchSearchRoles,
  fetchSearchRolesCount,
} from "./RoleManagementService";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useTitle } from "utils/UseTitle";
import { getCustomError } from "utils/customError";

const RoleManagement = () => {
  useTitle(strings.ROLEMANAGEMENT);
  const classes = roleManagement;
  const [buttonClick, setButtonClick] = useState<string>(strings.rolesTable);
  const [loading, setLoading] = useState<boolean>(false);
  const [roleData, setRoleData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState<number>();
  const [finalData, setFinalData] = useState<any>(initialRoleData);
  const [searchParam, setSearchParam] = useState("");
  const searchValue = useRef<any>("");

  useEffect(() => {
    getData(searchParam.trim(), pageNumber);
  }, [searchParam.trim(), pageNumber]);

  const getData = (search: string, page: number) => {
    if (search) {
      getSearchParamsData(search, page);
    } else {
      fetchResourceHandler();
    }
  };

  const handleEdit = (rowData: any) => {
    setButtonClick(strings.editRole);
    setFinalData(cloneDeep(rowData));
  };

  const tableDataConversion = (data: any) => {
    return data?.map((item: any, index: number) => {
      return {
        name: (
          <Typography
            sx={classes.roleName}
            onClick={() => {
              if (item.id !== 2) handleEdit(item);
            }}
          >
            {item.name}
          </Typography>
        ),
        resources: item?.resources?.map((res: any) => {
          return (
            <>
              <Stack
                direction="row"
                alignItems="center"
                alignContent="center"
                spacing={1}
                mt={1}
              >
                <Typography sx={classes.resourceName}>{res.name} :</Typography>
                {res?.permissions?.map((i: any) => (
                  <Chip
                    key={index}
                    label={i}
                    sx={classes.addTagChip}
                    variant="filled"
                  />
                ))}
              </Stack>
            </>
          );
        }),
        action: (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Edit" placement="top" arrow>
              <EditIcon
                htmlColor={"#1a0224"}
                style={{ margin: "0px 8px -7px 17px" }}
                onClick={() => {
                  if (item.id !== 2) handleEdit(item);
                }}
              />
            </Tooltip>
          </Box>
        ),
      };
    });
  };

  const fetchResourceHandler = async () => {
    try {
      setLoading(true);
      const [resources, count] = await Promise.all([
        fetchRoles(pageNumber),
        fetchRolesCount(),
      ]);
      const finalSearchData = tableDataConversion(resources);
      setRoleData(finalSearchData);
      setCount(count);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const getSearchParamsData = async (search: string, page: number) => {
    try {
      let count: number;
      let response: any;
      setLoading(true);
      [count, response] = await Promise.all([
        fetchSearchRolesCount(search),
        fetchSearchRoles(search, page),
      ]);
      const tableData = tableDataConversion(response);
      setRoleData(tableData);
      setCount(count);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleSearchParams = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      setSearchParam(event.target.value.trim());
      setPageNumber(1);
    } else {
      setSearchParam("");
      setPageNumber(1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(1);
  };

  const handleRoleCreator = () => {
    setButtonClick(strings.createRole);
    setFinalData(cloneDeep(initialRoleData));
  };

  const getSearchBarRole = () => {
    return (
      <>
        <Stack
          sx={classes.outerTabBox}
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            sm: "space-between",
            xs: "flex-start",
          }}
          alignItems={{ lg: "center", sm: "center" }}
          spacing={2}
          mt={2}
        >
          <Typography sx={classes.titleText}>List of Roles</Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <CustomInput
              placeHolder="Search text"
              name="firstName"
              id="firstName"
              onChange={debounceEventHandler(
                handleSearchParams,
                strings.SEARCH_TIME_OUT
              )}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#7A81FD" }} />
                  </InputAdornment>
                ),
              }}
            />
            <CustomButton
              label="Create Role"
              onClick={handleRoleCreator}
              customClasses={{ width: "150px" }}
            />
          </Stack>
        </Stack>
      </>
    );
  };

  const getRolesTableRender = () => {
    return (
      <Box sx={classes.mainBox}>
        {getSearchBarRole()}
        <Box
          mt={2}
          style={{ maxHeight: "60vh", height: "fit-content", overflow: "auto" }}
        >
          <CustomTable
            headers={rolesTableHeader}
            rows={roleData}
            paginationCount={count}
            rowsPerPage={rowsPerPage}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
            handleRowsPerPage={handleRowsPerPage}
            setPage={setPageNumber}
            isSelected={false}
            isLoading={loading}
            isRowPerPageEnable={true}
          />
        </Box>
      </Box>
    );
  };

  const getRoleManagementScreen = () => {
    switch (buttonClick) {
      case strings.createRole:
        return (
          <AddUpdateRoles
            modeName={buttonClick}
            setButtonClick={setButtonClick}
            rowData={finalData}
            fetchResourceHandler={fetchResourceHandler}
          />
        );
      case strings.editRole:
        return (
          <AddUpdateRoles
            modeName={buttonClick}
            setButtonClick={setButtonClick}
            rowData={finalData}
            fetchResourceHandler={fetchResourceHandler}
          />
        );
      case strings.rolesTable:
        return getRolesTableRender();
      default:
        return getRolesTableRender();
    }
  };

  return (
    <>
      <CustomLoader isLoading={loading} />
      {getRoleManagementScreen()}
    </>
  );
};

export default RoleManagement;
