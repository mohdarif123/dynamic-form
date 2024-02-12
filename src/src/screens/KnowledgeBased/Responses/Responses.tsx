import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import ResponseStyle from "./Response.styles";
import { initialState, responseHeader } from "./ResponseDataAndType";
import SearchIcon from "@mui/icons-material/Search";
import notifiers from "global/constants/NotificationConstants";
import {
  debounceEventHandler,
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import {
  deleteResponse,
  getDomainData,
  getRegionData,
  getResponse,
  getResponseCount,
  getSearchData,
  getSearchDataCount,
  getSubDomainData,
} from "./Responses.services";
import ViewAnswerModal from "./Components/ViewAnswerModal";
import urls from "global/constants/UrlConstants";
import history from "utils/history";
import DeleteModal from "./Components/DeleteModal";
import NoDataImage from "../../../assets/images/NoDataImage.svg";
import NoDataLight from "../../../assets/images/NoDataLight.svg";
import {
  dropDownDarkForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryBlackColor,
  primaryColorBlack,
  pureWhiteColor,
  selectBgDark,
  selectBgLight,
  sidebarColor,
} from "utils/styles";
import strings from "global/constants/StringConstants";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTitle } from "utils/UseTitle";
import editIcon from "assets/icons/Edit.svg";
import PendingIcon from "assets/icons/PendingIcon.svg";
import _ from "lodash";
import { doesLoggedInUserHasAccessToResource } from "utils/AuthorizationManager";
import AddResponseModal from "./Components/AddResponsesModal/AddResponseModal";
import view from "assets/icons/viewdoc.svg";
import StatusContent from "./StatusContent/StatusContent";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "assets/icons/HistoryIcon.svg";
import CompleteIcon from "assets/icons/CompleteIcon.svg";
import CustomTable3 from "global/components/CustomTable3/CustomTable3";
import JodItEditor from "jodit-react";
import { useLocation } from "react-router-dom";
import { getCustomError } from "utils/customError";
interface customProps {
  location?: any;
}

const Responses = (props: customProps) => {
  useTitle(strings.RESPONSES);
  const classes = ResponseStyle;
  const urlParams = useLocation().search;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isLoading, setIsLoading] = useState(false);
  const [responseTableData, setResponseTableData] = useState<any>([]);
  const [regions, setRegions] = useState([]);
  const [domainValue, setDomainValue] = useState([]);
  const [subDomainValue, setSubDomainValue] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openViewHistoryModal, setOpenViewHistoryModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowData, setRowData] = useState<any>();
  const contentId = new URLSearchParams(urlParams).get("id");
  const [pageSize, setPageSize] = useState<number>(10);
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getTableRowData, setGetTableRowData] = useState<any>();
  const [indexingValue, setIndexingValue] = useState<any>(0);
  const [searchDropdownValue, setSearchDropdownValue] = useState(
    initialState()
  );
  const [statusApprove, setStatusApprove] = useState<any>(
    contentId ? true : false
  );
  const [idStatus, setIdStatus] = useState<any>(contentId ? contentId : "");
  const [selected, setSelected] = useState<any>([]);
  const [page, setPage] = useState(props?.location?.state?.prevPageNumber ?? 1);
  const [dropdownValue, setDropdownValue] = useState({
    region: { value: "All" },
    domain: { value: "All" },
  });

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#7A81FD",
    },
  }));

  useEffect(() => {
    getRegionHandler();
  }, []);

  useEffect(() => {
    if (dropdownValue.region.value) {
      getDomainHandler(dropdownValue.region.value);
    }
  }, [dropdownValue.region.value]);

  // useEffect(() => {
  //   setPage(1);
  // }, [pageSize]);

  useEffect(() => {
    if (dropdownValue.region.value && dropdownValue.domain.value) {
      getSubDomainHandler(dropdownValue.domain.value);
    }
  }, [dropdownValue.region.value, dropdownValue.domain.value]);

  useEffect(() => {
    if (searchDropdownValue.searchValue.value) {
      handleSearch(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        searchDropdownValue.subDomain,
        searchDropdownValue.searchValue.value
      );
      setIndexingValue(0);
    } else if (
      dropdownValue.region.value &&
      dropdownValue.domain.value &&
      searchDropdownValue.subDomain
    ) {
      getResponseTableData(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        searchDropdownValue.subDomain
      );
      setIndexingValue(0);
    }
  }, [
    dropdownValue.region.value,
    dropdownValue.domain.value,
    searchDropdownValue.subDomain,
    searchDropdownValue.searchValue.value,
    page,
    pageSize,
  ]);

  const handleSeachOnChange = (event: any) => {
    setSearchDropdownValue({
      ...searchDropdownValue,
      searchValue: { value: event.target.value },
    });
    setPage(1);
  };
  const answerData = (items: any) => {
    const answertext = document.createElement("div");
    answertext.innerHTML = items.answer;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items.answer.length > 20) {
      truncatedString = answertext.innerText.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = answertext.innerText;
    }
    return truncatedString;
  };

  const answerHandler = (rowData: any, index: number) => {
    setGetTableRowData(rowData);
    setIndexingValue(index);
  };

  const convertDataToTableFormat = (responseData: any) => {
    return responseData.map((items: any, index: number) => {
      return {
        id: items.id,
        question: {
          component: (
            <Typography
              sx={{
                cursor: "pointer",
                color:
                  index == indexingValue
                    ? "#7A81FD"
                    : !bgcolor
                    ? primaryBlackColor
                    : pureWhiteColor,
              }}
              variant="h4"
              onClick={() => answerHandler(items, index)}
            >
              {items?.question}
            </Typography>
          ),
        },
        status: {
          component:
            doesLoggedInUserHasAccessToResource(
              strings.UPDATE,
              strings.RESPONSE
            ) && items.status != "Approved" ? (
              <Box sx={{ cursor: "pointer" }}>
                <Typography
                  sx={{ color: !bgcolor ? "#000000" : "#ffffff" }}
                  onClick={() => handleStatusContent(items.id)}
                  variant="h5"
                  style={{ fontWeight: 600 }}
                >
                  {items.status}
                </Typography>
              </Box>
            ) : (
              items.status !== strings.PENDING && (
                <Typography
                  sx={[{ color: !bgcolor ? "#000000" : "#ffffff" }]}
                  variant="h5"
                  style={{ fontWeight: 600 }}
                >
                  {items.status}
                </Typography>
              )
            ),
        },
        answer: {
          component: (
            <Box
              onClick={() => {
                handleViewAnswer(items?.answer);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                sx={!bgcolor ? classes.tableDataStyle1 : classes.tableDataStyle}
                variant="h5"
              >
                {answerData(items)}
              </Typography>
            </Box>
          ),
        },
        number: { tooltip: items.number },
        action: doesLoggedInUserHasAccessToResource(
          strings.UPDATE,
          strings.RESPONSE
        ) &&
          items.status === strings.APPROVED && {
            component: (
              <Box sx={{ display: "flex", justifyContent: "center" }} gap={1}>
                <CustomIcon
                  icon={<img src={editIcon} alt="editIcon" />}
                  onClick={() => viewHistoryCustomDialogModal(items.id)}
                />
                {items.count > 1 && (
                  <CustomIcon
                    icon={<img src={view} alt="view" />}
                    onClick={() =>
                      history.push(
                        `${urls.RESPONSE_HISTORY_VIEW_PATH}?id=${items.id}`
                      )
                    }
                  />
                )}
              </Box>
            ),
          },
        parentId: { tooltip: items.parentId },
        count: { tooltip: items.count },
        order: { tooltip: items.order },
        region: { tooltip: items.region },
        domain: { tooltip: items.domain },
        subDomain: { tooltip: items.subDomain },
        questionsdsss: { tooltip: items.question },
        numbersssss: { tooltip: items.number },
        statusssss: { tooltip: items.status },
        answerssss: { tooltip: items.answer },
        audit: {
          createdOn: { tooltip: items.audit.createdOn },
          updatedOn: { tooltip: items.audit.updatedOn },
          thruZ: { tooltip: items.audit.thruZ },
          createdBy: { tooltip: items.audit.createdBy },
          updatedBy: { tooltip: items.audit.updatedBy },
        },
      };
    });
  };

  const getRegionHandler = async () => {
    try {
      setIsLoading(true);
      const [regions] = await Promise.all([getRegionData()]);
      setRegions(regions);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getDomainHandler = async (regionValue: string) => {
    try {
      setIsLoading(true);
      const domains = await getDomainData(regionValue);
      const filterDomainValue: any = _.unionBy(domains, "name");
      setDomainValue(filterDomainValue);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSubDomainHandler = async (domain: string) => {
    try {
      setIsLoading(true);
      const subDomains = await getSubDomainData(domain);
      setSubDomainValue(subDomains);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleSearch = async (
    region: string,
    domain: string,
    subDomain: string,
    searchValue: string
  ) => {
    try {
      setIsLoading(true);
      const [searchData, count] = await Promise.all([
        getSearchData(region, domain, subDomain, searchValue, page, pageSize),
        getSearchDataCount(region, domain, subDomain, searchValue),
      ]);
      setResponseTableData(searchData);
      setPageNumber(count);
      setGetTableRowData(searchData[0]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getResponseTableData = async (
    region: string,
    domain: string,
    subDomain: string
  ) => {
    try {
      setIsLoading(true);
      const [responseData, count] = await Promise.all([
        getResponse(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          searchDropdownValue.subDomain,
          pageSize,
          page
        ),
        getResponseCount(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          searchDropdownValue.subDomain
        ),
      ]);
      setPageNumber(count);
      setResponseTableData(responseData);
      setGetTableRowData(responseData[0]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleViewAnswer = (answer: string) => {
    setOpenViewModal(true);
    setOpenViewHistoryModal(false);
    setRowData(answer);
  };

  const handleStatusContent = async (id: string) => {
    setStatusApprove(true);
    setIdStatus(id);
  };

  const handleAddResponses = () => {
    history.push({
      pathname: urls.RESPONSE_ADD_PATH,
      state: {
        paginationNumber: page,
      },
    });
  };

  const handleDelete = () => {
    selected.length > 0
      ? setOpenDeleteModal(true)
      : openWarningNotification("Please select at least one content");
  };

  const handleOnchange = (event: any) => {
    const value = event.target.value.trim();
    setSearchDropdownValue({
      ...searchDropdownValue,
      [event.target.name]: {
        value: value,
      },
    });
    setPage(1);
  };

  const handleDropdown = (event: any) => {
    setDropdownValue({
      ...dropdownValue,
      [event.target.name]: {
        value: event.target?.value,
      },
    });
  };

  const getAllButton = () => {
    return (
      <>
        <Box sx={classes.buttonContainer}>
          {doesLoggedInUserHasAccessToResource(
            strings.ADD,
            strings.RESPONSE
          ) && (
            <Box>
              <CustomButton
                label={"Add Content"}
                icon={<AddIcon htmlColor={!bgcolor ? "#373854" : "#7A81FD"} />}
                onClick={handleAddResponses}
                customClasses={classes.buttonStyle}
                buttonType={"outlined"}
              />
            </Box>
          )}
          {doesLoggedInUserHasAccessToResource(
            strings.DELETE,
            strings.RESPONSE
          ) && (
            <Box>
              <CustomButton
                label={"Delete"}
                icon={<DeleteIcon htmlColor="#7A81FD" />}
                onClick={handleDelete}
                customClasses={classes.deleteButtonStyle}
                buttonType={"outlined"}
              />
            </Box>
          )}
          <Box sx={classes.dropdownWrapper}>
            <Stack direction="column">
              <Select
                sx={{
                  ...(!bgcolor
                    ? classes.dropDownLightForSx
                    : dropDownDarkForSx),
                  border: "1.5px solid rgb(122, 129, 253)",
                }}
                style={{
                  background: !bgcolor ? pureWhiteColor : sidebarColor,
                }}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                id="region"
                name="region"
                renderValue={() =>
                  dropdownValue?.region?.value == "All"
                    ? "Select region"
                    : dropdownValue?.region?.value
                }
                value={dropdownValue?.region?.value}
                displayEmpty
                onChange={(event: any) => handleDropdown(event)}
              >
                {regions?.map((item: any, index: number) => (
                  <MenuItem
                    key={index}
                    value={item.name}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
          <Box sx={classes.dropdownWrapper}>
            {" "}
            <Stack direction="column">
              <Select
                sx={{
                  ...(!bgcolor
                    ? classes.dropDownLightForSx
                    : dropDownDarkForSx),
                  border: "1.5px solid rgb(122, 129, 253)",
                }}
                style={{
                  background: !bgcolor ? pureWhiteColor : sidebarColor,
                }}
                MenuProps={!bgcolor ? menuPropsLightStyle : menuPropsDarkStyle}
                id="domain"
                name="domain"
                value={dropdownValue?.domain?.value}
                displayEmpty
                renderValue={() =>
                  dropdownValue?.domain?.value == "All"
                    ? "Select domain"
                    : dropdownValue?.domain?.value
                }
                onChange={(event: any) => handleDropdown(event)}
              >
                {domainValue?.map((item: any, index: number) => (
                  <MenuItem
                    key={index}
                    value={item.name}
                    sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                  >
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
          <Box sx={classes.searchInputWrapper}>
            <CustomInput
              placeHolder="Search"
              name="searchValue"
              id="searchValue"
              onChange={debounceEventHandler(
                handleSeachOnChange,
                strings.SEARCH_TIME_OUT
              )}
              customInputClasses={{
                border: "1.5px solid rgb(122, 129, 253)",
                background: !bgcolor ? pureWhiteColor : sidebarColor,
              }}
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
        </Box>
      </>
    );
  };

  const viewAnswerCustomDialogModal = () => {
    return (
      <>
        <ViewAnswerModal
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          rowData={rowData}
        />
      </>
    );
  };

  const viewHistoryCustomDialogModal = (item: any) => {
    history.push(`${urls.RESPONSE_EDIT_PATH}?id=${item}`);
  };

  const deleteCustomDialogModal = () => {
    return (
      <>
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleSubmit={handleDeleteResponse}
        />
      </>
    );
  };

  const AddResponseDialogModal = () => {
    return (
      <>
        <AddResponseModal
          openAddResponseModal={openAddResponseModal}
          setOpenAddResponseModal={setOpenAddResponseModal}
          getResponseTableData={getResponseTableData}
        />
      </>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleDeleteResponse = async () => {
    try {
      setIsLoading(true);
      setOpenDeleteModal(false);
      await deleteResponse(selected);
      openSuccessNotification("Content has been deleted successfully");
      if (searchDropdownValue.searchValue.value) {
        await handleSearch(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          searchDropdownValue.subDomain,
          searchDropdownValue.searchValue.value
        );
      } else if (
        dropdownValue.region.value &&
        dropdownValue.domain.value &&
        searchDropdownValue.subDomain
      ) {
        await getResponseTableData(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          searchDropdownValue.subDomain
        );
      }
      setSelected([]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const isSelected = (id: any) => {
    const findValue = selected.map((item: any) => item.id);
    return findValue.indexOf(id) !== -1;
  };

  const singleCheckboxHandler = (event: any, row: any) => {
    const selectedCheckBoxValue: any[] = [];
    if (isSelected(row.id)) {
      const removeSelectedArrayValue = selected?.filter((element: any) => {
        return element.id !== row.id;
      });
      setSelected(removeSelectedArrayValue);
    } else {
      if (event?.target?.checked) {
        selectedCheckBoxValue.push(...selected, {
          id: row.id,
          parentId: row.parentId.tooltip,
          count: row.count.tooltip,
          order: row.order.tooltip,
          region: row.region.tooltip,
          domain: row.domain.tooltip,
          subDomain: row.subDomain.tooltip,
          question: row.questionsdsss.tooltip,
          answer: row.answerssss.tooltip,
          number: row.numbersssss.tooltip,
          status: row.statusssss.tooltip,
          audit: row.audit.tooltip,
        });
        setSelected(selectedCheckBoxValue);
      }
    }
  };

  const selectAllCheckBoxHandler = (event: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = responseTableData
        .filter((item: any) => item.status !== "Approved")
        ?.map((item: any, index: any) => {
          return {
            id: item.id,
            parentId: item.parentId,
            count: item.count,
            order: item.order,
            region: item.region,
            domain: item.domain,
            subDomain: item.subDomain,
            question: item.questionsdsss,
            answer: item.answerssss,
            number: item.numbersssss,
            status: item.statusssss,
            audit: item.audit,
          };
        });
      setSelected(newSelected);
      checkBoxValue.push(...selected, ...newSelected);
      setSelected(checkBoxValue);
      return;
    }
    let newSelected = responseTableData?.map((item: any) => item.id);
    let unCheckSelectAll = selected?.filter(
      (item: any) => !newSelected.includes(item.id)
    );
    setSelected(unCheckSelectAll);
  };

  const getStatus = () => {
    if (doesLoggedInUserHasAccessToResource(strings.DELETE, strings.RESPONSE)) {
      return responseTableData.map((e: any) => {
        if (e.status === "Approved") {
          return false;
        } else {
          return true;
        }
      });
    } else {
      return false;
    }
  };

  const statusApproveData = () => {
    return (
      <>
        <StatusContent
          setStatusApprove={setStatusApprove}
          statusApprove={statusApprove}
          responseId={idStatus}
          getResponseTableData={getResponseTableData}
        />
      </>
    );
  };

  const getSecondAnswerTable = () => {
    return (
      <>
        <Box
          sx={{
            ...classes.mainAnswerTableStyle,
            background: bgcolor ? "#282945" : "#ffffff",
          }}
        >
          {responseTableData.length > 0 ? (
            <Box>
              <Box
                display={"flex"}
                sx={{
                  placeContent: "space-between",
                }}
              >
                <Box sx={classes.iconWrapperStyle}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "17px",
                      height: "35px",
                      fontWeight: 700,
                      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                    }}
                  >
                    Answer
                  </Typography>
                </Box>
                <Box sx={classes.iconWrapperStyle}>
                  <BootstrapTooltip
                    title={
                      getTableRowData?.status !== "Approved"
                        ? "Pending"
                        : "Approved"
                    }
                  >
                    <Box
                      component={"img"}
                      src={
                        getTableRowData?.status !== "Approved"
                          ? PendingIcon
                          : CompleteIcon
                      }
                      onClick={() => {
                        if (getTableRowData?.status !== "Approved") {
                          handleStatusContent(getTableRowData.id);
                        }
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  </BootstrapTooltip>
                  {doesLoggedInUserHasAccessToResource(
                    strings.UPDATE,
                    strings.RESPONSE
                  ) &&
                    getTableRowData?.status === strings.APPROVED && (
                      <Box
                        sx={{ display: "flex", justifyContent: "center" }}
                        gap={1}
                      >
                        <BootstrapTooltip title="Edit">
                          <Box
                            component={"img"}
                            src={editIcon}
                            onClick={() =>
                              viewHistoryCustomDialogModal(getTableRowData.id)
                            }
                            sx={{ cursor: "pointer" }}
                          />
                        </BootstrapTooltip>
                        {getTableRowData.count > 1 && (
                          <BootstrapTooltip title="View History">
                            <Box
                              component={"img"}
                              src={HistoryIcon}
                              onClick={() =>
                                history.push(
                                  `${urls.RESPONSE_HISTORY_VIEW_PATH}?id=${getTableRowData.id}`
                                )
                              }
                              sx={{ cursor: "pointer" }}
                            />
                          </BootstrapTooltip>
                        )}
                      </Box>
                    )}
                </Box>
              </Box>
              <Box
                sx={{
                  ...classes.answerBoxStyle,
                }}
                mt={1}
              >
                <JodItEditor
                  value={getTableRowData?.answer}
                  onChange={() => {}}
                  config={{
                    readonly: true,
                  }}
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </>
    );
  };

  const getTable = () => {
    return (
      <Box>
        <CustomTable3
          headers={responseHeader.filter((items: any) => items != false)}
          rows={convertDataToTableFormat(responseTableData)}
          paginationCount={pageNumber}
          handlePageChange={handleChangePage}
          isLoading={isLoading}
          isRowPerPageEnable={true}
          getRowsMultipleCheck={getStatus() as any}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          onSelectAllClick={selectAllCheckBoxHandler}
          isSelectAll={selected?.map((e: any) => e.id)}
          setPageSize={setPageSize}
          pageSize={pageSize}
          pageNumber={page}
          rowsPerPage={pageSize}
          setPage={setPage}
          headerData={getAllButton()}
          tooltipEnabled
          secondTable={getSecondAnswerTable()}
        />
      </Box>
    );
  };

  const getResponseHeader = () => (
    <Typography
      sx={{
        ...classes.headerMainStyle,
        color: !bgcolor ? primaryBlackColor : pureWhiteColor,
      }}
      variant="h1"
    >
      Content Library
    </Typography>
  );

  const getResponses = () => {
    return (
      <>
        <Box mt={11} px={3}>
          {getResponseHeader()}
          {getTable()}
          {statusApproveData()}
          {viewAnswerCustomDialogModal()}
          {deleteCustomDialogModal()}
          {AddResponseDialogModal()}
        </Box>
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return getResponses();
};
export default React.memo(Responses);
