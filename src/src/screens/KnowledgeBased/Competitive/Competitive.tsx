import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Globe from "assets/icons/Globe.svg";
import React, { useState, useEffect } from "react";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import _ from "lodash";
import {
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomTable,
} from "global/components";
import SearchIcon from "@mui/icons-material/Search";
import notifiers from "global/constants/NotificationConstants";
import AddIcon from "@mui/icons-material/Add";
import {
  debounceEventHandler,
  handleSort,
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import CompetitiveStyle from "./Competitive.styel";
import {
  deleteCompetitive,
  getCompetitive,
  getCompetitiveCount,
  getCompetitiveCountSearch,
  getCompetitiveSearch,
  getDomain,
  getRegion,
  getSource,
  getType,
} from "./Competitive.service";
import DeleteIcon from "@mui/icons-material/Delete";
import urls from "global/constants/UrlConstants";
import history from "utils/history";
import strings from "global/constants/StringConstants";
import { useTitle } from "utils/UseTitle";
import DeleteModal from "./Component/DeleteModal";
import AddCompetitive from "./Component/AddCompetitive";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor, sidebarColor } from "utils/styles";
import { useLocation } from "react-router-dom";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const Competitive = () => {
  useTitle(strings.COMPETITIVE);
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const urlParams = useLocation().search;
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [competitiveTableData, setCompetitiveTableData] = useState<Array<any>>(
    []
  );
  const [dropdownValue, setdropdownValue] = useState({
    region: { value: "All" },
    domain: { value: "All" },
  });
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState(1);
  const [competitiveDataCount, setCompetitiveDataCount] = useState(0);
  const [regions, setRegions] = useState<any>([]);
  const [domains, setDomains] = useState<any>([]);
  const regionData = new URLSearchParams(urlParams).get("region");
  const domainData = new URLSearchParams(urlParams).get("domain");
  const [selected, setSelected] = useState<any>([]);
  const [typeValue, setTypeValue] = useState([]);
  const [sourceValue, setSourceValue] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [headerInitalType, setInitalType] = useState({
    createdValue: "created",
    weekDataValue: "All",
    type: "All",
    region: regionData ?? "All",
    domian: domainData ?? "All",
    contract: "All",
    action: "All",
    submission: "All",
    status: "All",
  });
  const competitiveHeader = [
    {
      name: "Title & ID ",
      field: "title",
    },
    {
      name: "Agency",
      field: "agency",
    },
    {
      name: "Type",
      field: "type",
    },
    {
      name: "Region",
      field: "region",
      dropdownType: regions,
    },
    {
      name: "Domain",
      field: "domain",
      dropdownType: domains,
    },
    {
      name: "Price",
      field: "price",
    },
    {
      name: "Source",
      field: "source",
    },
    {
      name: "Website",
      field: "webSite",
    },
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  useEffect(() => {
    fetchRegions();
    fetchDomains(dropdownValue.region.value);
    if (searchText) {
      getCompetitiveTableDataSearch(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        page,
        searchText
      );
      fetchCompetitiveCountSearch(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        searchText
      );
    } else {
      getCompetitiveTableData(
        dropdownValue.region.value,
        dropdownValue.domain.value,
        page
      );
      fetchCompetitiveCount(
        dropdownValue.region.value,
        dropdownValue.domain.value
      );
    }
  }, [page, dropdownValue, searchText, pageSize]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value) {
      setSearchText(value?.trim());
    } else {
      setSearchText("");
    }
  };

  const fetchCompetitiveCount = async (region: string, domain: string) => {
    try {
      setIsLoading(true);
      const [competitiveCount] = await Promise.all([
        getCompetitiveCount(region, domain),
      ]);
      setCompetitiveDataCount(competitiveCount);
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const fetchCompetitiveCountSearch = async (
    region: string,
    domain: string,
    text: any
  ) => {
    try {
      setIsLoading(true);
      const [competitiveCount] = await Promise.all([
        getCompetitiveCountSearch(region, domain, text),
      ]);
      setCompetitiveDataCount(competitiveCount);
      // if (competitiveCount != 0) {
      //   setPage(1);
      // }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const convertAssigneeData = (data: any) => {
    return data.map((item: any, index: number) => {
      return {
        ...item,
        names: (
          <>
            <CustomTooltip item={item.name} />
          </>
        ),
        name: item.name,
      };
    });
  };

  const fetchRegions = async () => {
    try {
      setIsLoading(true);
      const [regions, type, source] = await Promise.all([
        getRegion(),
        getType(),
        getSource(),
      ]);
      const filterData = convertAssigneeData(handleSort(regions));
      setRegions(filterData);
      setSourceValue(source);
      setTypeValue(type);
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const fetchDomains = async (region: string) => {
    try {
      setIsLoading(true);
      const [domain] = await Promise.all([getDomain(region)]);
      const filterDomainValue: any = _.unionBy(domain, "name");
      const filterData = convertAssigneeData(handleSort(filterDomainValue));
      setDomains(filterData);
      // setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getCompetitiveTableData = async (
    region: string,
    domain: string,
    page: number
  ) => {
    try {
      setIsLoading(true);
      const [competitiveTableData] = await Promise.all([
        getCompetitive(region, domain, page, pageSize),
      ]);
      const formatedData = convertDataToTableFormat(competitiveTableData);
      setCompetitiveTableData(formatedData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const deleteCometitveHandler = async () => {
    try {
      setIsLoading(true);
      await deleteCompetitive(selected);
      setOpenDeleteModal(false);
      openSuccessNotification("Comparison has been deleted successfully");
      if (searchText) {
        await getCompetitiveTableDataSearch(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          page,
          searchText
        );
      } else {
        await getCompetitiveTableData(
          dropdownValue.region.value,
          dropdownValue.domain.value,
          page
        );
      }
      setSelected([]);
      setIsLoading(false);
    } catch (error: any) {
      setOpenDeleteModal(false);
      setIsLoading(false);
      getCustomError(error);
    }
  };
  const getCompetitiveTableDataSearch = async (
    region: string,
    domain: string,
    page: number,
    searchtext: any
  ) => {
    try {
      setIsLoading(true);
      const [competitiveTableData] = await Promise.all([
        getCompetitiveSearch(region, domain, page, searchtext, pageSize),
      ]);
      const formatedData = convertDataToTableFormat(competitiveTableData);
      setCompetitiveTableData(formatedData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getButtonData = () => {
    return (
      <>
        <Box sx={{ display: "flex", flexWrap: "wrap" }} mb={1} gap={1}>
          <Box>
            <CustomButton
              label={"Add Comparison"}
              icon={<AddIcon htmlColor={"#7A81FD"} />}
              onClick={handleAddModal}
              customClasses={{
                width: {
                  xs: "260px",
                  sm: "200px",
                  md: "200px",
                  lg: "200px",
                  xl: "200px",
                },
                [`@media screen and (max-width: ${320}px)`]: {
                  width: "190px",
                },
              }}
              buttonType={"outlined"}
            />
          </Box>
          <Box>
            <CustomButton
              label={"Delete"}
              icon={<DeleteIcon htmlColor="#7A81FD" />}
              onClick={handleDeleteModal}
              customClasses={{
                width: {
                  xs: "260px",
                  sm: "140px",
                  md: "140px",
                  lg: "140px",
                  xl: "140px",
                },
                [`@media screen and (max-width: ${320}px)`]: {
                  width: "190px",
                },
              }}
              buttonType={"outlined"}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "end" }}>{searchData()}</Box>
        </Box>
      </>
    );
  };

  const handleClick = (event: any, data: any) => {
    event.preventDefault();

    const documentID = data.id;

    if (event.ctrlKey) {
      window.open(
        `${urls.DETAILS_COMPETITIVE_VIEW_PATH}?id=${documentID}`,
        "_blank"
      );
    } else {
      history.push(
        `${urls.DETAILS_COMPETITIVE_VIEW_PATH}?id=${documentID}` +
          `&region=` +
          headerInitalType.region +
          `&domain=` +
          headerInitalType.domian +
          `&page=` +
          page +
          `&searchValue=` +
          searchText
      );
    }
  };

  const searchData = () => {
    return (
      <>
        <Box sx={classes.searchBoxWrapper}>
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
              handleChange,
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
      </>
    );
  };
  const getWebsiteInfo = (data: string) => {
    return data.includes("http")
      ? window.open(data, "_blank")
      : window.open(`http://${data}`, "_blank");
  };

  const answerData = (items: any) => {
    const text = items;
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items.length > 20) {
      truncatedString = text.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = text;
    }
    return truncatedString;
  };

  const convertDataToTableFormat = (data: any) => {
    return data.map((item: any) => {
      return {
        id: item.id,
        rowDataTitle: { tooltip: item.title },
        rowDataAgency: { tooltip: item.agency },
        rowDataAudit: { tooltip: item.audit },
        rowDataComment: { tooltip: item.comments },
        rowDataDomain: { tooltip: item.domain },
        rowDataMetaData: { tooltip: item.metadata },
        rowDataPrice: { tooltip: item.price },
        rowDataRegion: { tooltip: item.region },
        rowDataRequested: { tooltip: item.requestId },
        rowDataSource: { tooltip: item.source },
        rowDataType: { tooltip: item.type },
        title: {
          component: (
            <>
              <Box
                onClick={(e: any) => handleClick(e, item)}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#7A81FD",
                  }}
                  variant="h5"
                >
                  {answerData(item.title)}
                </Typography>

                <Typography
                  sx={classes.normalStyle}
                  variant="subtitle1"
                  style={{ color: !bgcolor ? "#A8A8A8" : "#BDBDBD" }}
                >
                  ID:{" "}
                  <Typography
                    component={"span"}
                    variant="subtitle1"
                    style={{ color: !bgcolor ? "#A8A8A8" : "#BDBDBD" }}
                  >
                    {item.requestId}
                  </Typography>
                </Typography>
              </Box>
            </>
          ),
        },
        agency: { tooltip: item.title },
        type: { tooltip: item.type },
        region: { tooltip: item.region },
        domain: { tooltip: item.domain },
        price: { tooltip: item.price },
        source: { tooltip: item.source },
        deletetitle: item.title,
        webSite: {
          component: (
            <>
              {item.agency.webSite && (
                <Box onClick={() => getWebsiteInfo(item.agency.webSite)}>
                  <Typography sx={classes.normalStyle}>
                    {<CustomIcon icon={<img src={Globe} alt="globe" />} />}
                  </Typography>
                </Box>
              )}
            </>
          ),
        },
      };
    });
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
          requestId: row.rowDataRequested.tooltip,
          source: row.rowDataSource.tooltip,
          title: row.deletetitle,
          type: row.rowDataType.tooltip,
          region: row.rowDataRegion.tooltip,
          domain: row.rowDataDomain.tooltip,
          agency: row.rowDataAgency.tooltip,
          comments: row.rowDataComment.tooltip,
          metadata: row.rowDataMetaData.tooltip,
          price: row.rowDataPrice.tooltip,
          audit: row.rowDataAudit.tooltip,
        });
        setSelected(selectedCheckBoxValue);
      }
    }
  };

  const selectAllCheckBoxHandler = (event: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = competitiveTableData.map((item: any) => {
        return {
          id: item.id,
          requestId: item.rowDataRequested.tooltip,
          source: item.rowDataSource.tooltip,
          title: item.deletetitle,
          type: item.rowDataType.tooltip,
          region: item.rowDataRegion.tooltip,
          domain: item.rowDataDomain.tooltip,
          agency: item.rowDataAgency.tooltip,
          comments: item.rowDataComment.tooltip,
          metadata: item.rowDataMetaData.tooltip,
          price: item.rowDataPrice.tooltip,
          audit: item.rowDataAudit.tooltip,
        };
      });
      setSelected(newSelected);
      checkBoxValue.push(...selected, ...newSelected);
      setSelected(checkBoxValue);
      return;
    }
    let newSelected = competitiveTableData.map((item: any) => item.id);
    let unCheckSelectAll = selected?.filter(
      (item: any) => !newSelected.includes(item.id)
    );
    setSelected(unCheckSelectAll);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleDeleteModal = () => {
    selected?.length > 0
      ? setOpenDeleteModal(true)
      : openWarningNotification("Please select at least one comparison");
  };

  const handleAddModal = () => {
    setOpenAddModal(true);
  };

  const deleteModal = () => {
    return (
      <>
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDeleteSubmit={deleteCometitveHandler}
        />
      </>
    );
  };

  const addModal = () => {
    return (
      <>
        <AddCompetitive
          openAddCompetitiveModal={openAddModal}
          setOpenAddCompetitiveModal={setOpenAddModal}
          domainType={domains}
          regionType={regions}
          typeValue={typeValue}
          sourceValue={sourceValue}
          getCompetitiveTableData={getCompetitiveTableData}
          dropdownValue={dropdownValue}
          page={page}
        />
      </>
    );
  };

  const getTable = () => {
    return (
      <Box sx={classes.tableStyle}>
        <CustomTable
          headers={competitiveHeader}
          rows={competitiveTableData}
          paginationCount={competitiveDataCount}
          isRowPerPageEnable={true}
          checkboxSelection={true}
          handlePageChange={handleChangePage}
          pageNumber={page}
          isLoading={isLoading}
          setPage={setPage}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          onSelectAllClick={selectAllCheckBoxHandler}
          isSelectAll={selected.map((item: any) => item.id)}
          setPageSize={setPageSize}
          pageSize={pageSize}
          rowsPerPage={pageSize}
          headerData={getButtonData()}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
    );
  };
  const getHeaders = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{
            color: !bgcolor ? primaryBlackColor : pureWhiteColor,
          }}
          mb={2}
        >
          Comparison
        </Typography>
      </>
    );
  };
  const getCompetitives = () => {
    return (
      <>
        <Box mt={11} px={3}>
          {getHeaders()}
          {getTable()}
        </Box>
        {deleteModal()}
        {addModal()}
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };

  return getCompetitives();
};

export default React.memo(Competitive);
