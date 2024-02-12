import React, { ChangeEvent, useEffect, useState } from "react";
import UsersStyle from "./Users.styles";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { Avatar, Box, Grid, InputAdornment, Typography } from "@mui/material";
import {
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomTable,
} from "global/components";
import { usersHeader } from "./UserData";
import editIcon from "assets/icons/editIcon.svg";
import {
  debounceEventHandler,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  getUser,
  getUserCountData,
  getUserCountDataSearch,
  getUserEditData,
  getUserSearch,
} from "./UsersService";
import { UserData } from "./UserInterface";
import strings from "global/constants/StringConstants";
import SearchIcon from "@mui/icons-material/Search";
import { getRole, userDeleted } from "./AddUser/AddUsersService";
import DeleteModal from "./Component/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTitle } from "utils/UseTitle";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./AddUser/AddUser";
import UpdateUser from "./AddUser/UpdateUser";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { primaryBlackColor, pureWhiteColor, sidebarColor } from "utils/styles";
import { getCustomError } from "utils/customError";

const Users = () => {
  useTitle(strings.USER);
  const classes = UsersStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openAddUsers, setOpenAddUsers] = useState(false);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [tableCount, setTableCount] = useState<number>(0);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [allRoles, setAllRoles] = useState<any>([]);

  useEffect(() => {
    if (searchValue) {
      getUserSearchData(searchValue);
    } else {
      getUserTableData();
    }
  }, [page, searchValue, pageSize]);

  const handleClose = () => {
    setOpenViewModal!(false);
  };

  const getUserSearchData = async (search: string) => {
    try {
      setIsLoading(true);
      const [role, userData, count] = await Promise.all([
        getRole(),
        getUserSearch(search, page, pageSize),
        getUserCountDataSearch(searchValue),
      ]);
      setAllRoles(role);
      const dataFormated = convertDataToTableFormat(userData, role);
      setUserData(dataFormated);
      setTableCount(count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getUserTableData = async () => {
    try {
      setIsLoading(true);
      const [role, userTableData, count] = await Promise.all([
        getRole(),
        getUser(page, pageSize),
        getUserCountData(),
      ]);
      const activeCount = count.find(
        (items: any) => items.name === strings.ACTIVE
      );
      setAllRoles(role);
      const formatedData = convertDataToTableFormat(userTableData, role);
      setUserData(formatedData);
      setTableCount(activeCount.count);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getUserEdit = async (items: any) => {
    try {
      setIsLoading(true);
      const userTableData = await getUserEditData(items.email);
      setRowData(userTableData);
      setOpenViewModal(true);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const transformedData = selected.map((item: any) => ({
        email: item.email.tooltip,
      }));
      for (const item of transformedData) {
        setIsLoading(true);
        setOpenDeleteModal(false);
        await userDeleted(item);
        openSuccessNotification("User has been deleted successfully");
        setSelected([]);
      }
      setOpenDeleteModal(false);
      setIsLoading(false);
      if (searchValue) {
        await getUserSearchData(searchValue);
      } else {
        await getUserTableData();
      }
    } catch (error: any) {
      setOpenDeleteModal(false);
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    setPage(1);
    setSearchValue(searchText);
  };

  const handleOpenViewModal = (items: any) => {
    getUserEdit(items);
  };

  const handleAddUsers = () => {
    setOpenAddUsers(true);
  };

  const handleUserDelete = async () => {
    selected.length > 0
      ? setOpenDeleteModal(true)
      : openWarningNotification("Please select at least one user");
  };

  const searchData = () => {
    return (
      <>
        <Grid item sx={classes.searchWrapperStyle}>
          <Box>
            <CustomInput
              placeHolder="Search"
              name="searchValue"
              id="searchValue"
              sx={{ width: "200px" }}
              customInputClasses={{
                border: "1.5px solid rgb(122, 129, 253)",
                background: !bgcolor ? pureWhiteColor : sidebarColor,
              }}
              onChange={debounceEventHandler(
                handleSearchOnChange,
                strings.SEARCH_TIME_OUT
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#7A81FD" }} />
                  </InputAdornment>
                ),
                disableUnderline: false,
              }}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const roleName = (role: any, allRole: any) => {
    if (role) {
      return allRole?.find((item: any) => item.id === role)?.name;
    }
    return "";
  };

  const convertDataToTableFormat = (userDatas: any, allRole: any) => {
    return userDatas.map((items: UserData) => {
      return {
        account: { tooltip: items.account },
        name: {
          component: (
            <Box>
              <Avatar sx={{ background: "#7A81FD" }}>
                {items.name.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          ),
          tooltip: items.name,
        },
        email: { tooltip: items.email },
        contactNo: { tooltip: items.contactNo },
        role: { tooltip: roleName(items?.roleIds[0], allRole), allRole },
        action: {
          component: (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CustomIcon
                icon={<img src={editIcon} alt="globe" />}
                onClick={() => handleOpenViewModal(items)}
              />
            </Box>
          ),
        },
      };
    });
  };

  const AddUsersDialogModal = () => {
    return (
      <>
        <AddUser
          openAddUsersModal={openAddUsers}
          setOpenAddUsersModal={setOpenAddUsers}
          getUserTableData={getUserTableData}
          allRoles={allRoles}
          userData={userData}
        />
      </>
    );
  };

  const UpdateUsersDialogModal = () => {
    return (
      <>
        <UpdateUser
          openUpdateUsers={openViewModal}
          setOpenUpdateUsers={setOpenViewModal}
          setItems={setRowData}
          getUserTableData={getUserTableData}
          item={rowData}
          handleClose={handleClose}
          allRoles={allRoles}
        />
      </>
    );
  };

  const getAllButton = () => {
    return (
      <>
        <Grid container spacing={1} sx={classes.buttonWrapper}>
          <Grid item>
            <Box>
              <CustomButton
                label={"Add User"}
                icon={<AddIcon htmlColor={"#7A81FD"} />}
                onClick={() => {
                  handleAddUsers();
                }}
                customClasses={{
                  width: {
                    xl: "130px",
                    lg: "130px",
                    md: "130px",
                    sm: "130px",
                    xs: "270px",
                  },
                  [`@media screen and (max-width: ${320}px)`]: {
                    width: "190px",
                  },
                  border: !bgcolor
                    ? "1px solid #7A81FD !important"
                    : "1.5px solid #7A81FD !important",
                }}
                buttonType={"outlined"}
              />
            </Box>
          </Grid>
          {
            <Grid item>
              <Box>
                <CustomButton
                  label={"Delete"}
                  icon={<DeleteIcon htmlColor={"#7A81FD"} />}
                  onClick={handleUserDelete}
                  customClasses={{
                    width: {
                      xs: "270px",
                      sm: "140px",
                      md: "140px",
                      lg: "140px",
                      xl: "140px",
                    },
                    [`@media screen and (max-width: ${320}px)`]: {
                      width: "190px",
                    },
                    border: !bgcolor
                      ? "1px solid #7A81FD !important"
                      : "1.5px solid #7A81FD !important",
                  }}
                  buttonType={"outlined"}
                />
              </Box>
            </Grid>
          }
          <Grid item>
            <Box>{searchData()}</Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const isSelected = (email: any) => {
    const findValue = selected.map((item: any) => item.email);
    return findValue.indexOf(email) !== -1;
  };

  const singleCheckboxHandler = (event: any, row: any) => {
    const selectedCheckBoxValue: any[] = [];
    if (isSelected(row.email)) {
      const removeSelectedArrayValue = selected?.filter((element: any) => {
        return element.email !== row.email;
      });
      setSelected(removeSelectedArrayValue);
    } else {
      if (event?.target?.checked) {
        selectedCheckBoxValue.push(...selected, {
          email: row.email,
        });
        setSelected(selectedCheckBoxValue);
      }
    }
  };
  const selectAllCheckBoxHandler = (event: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = userData.map((item: any) => {
        return {
          email: item.email,
        };
      });
      setSelected(newSelected);
      checkBoxValue.push(...selected, ...newSelected);
      setSelected(checkBoxValue);
      return;
    }
    let newSelected = userData.map((item: any) => item.email);
    let unCheckSelectAll = selected?.filter(
      (item: any) => !newSelected.includes(item.email)
    );
    setSelected(unCheckSelectAll);
  };

  const getTable = () => {
    return (
      <Box sx={classes.tasksTableStyle}>
        <CustomTable
          headers={usersHeader}
          rows={userData}
          checkboxSelection={true}
          paginationCount={tableCount}
          isRowPerPageEnable={true}
          pageNumber={page}
          handlePageChange={handleChangePage}
          isLoading={isLoading}
          setPage={setPage}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          onSelectAllClick={selectAllCheckBoxHandler}
          isSelectAll={selected.map((item: any) => item.email)}
          headerData={getAllButton()}
          setPageSize={setPageSize}
          rowsPerPage={pageSize}
          pageSize={pageSize}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
    );
  };

  const openDeleteCustomDialogModal = () => {
    return (
      <>
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          openDeleteModal={openDeleteModal}
          handleDeleteSubmit={handleDeleteSubmit}
        />
      </>
    );
  };

  const usersHeaders = () => {
    return (
      <Typography
        variant="h1"
        style={{
          color: !bgcolor ? primaryBlackColor : pureWhiteColor,
        }}
        mb={2}
      >
        Users
      </Typography>
    );
  };

  const getUsers = () => {
    return (
      <>
        <Box mt={11} px={3}>
          {usersHeaders()}
          {getTable()}
        </Box>
        {UpdateUsersDialogModal()}
        {openDeleteCustomDialogModal()}
        {AddUsersDialogModal()}
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return getUsers();
};

export default React.memo(Users);
