import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import { adminValidation, tabConfig, tasksTabContent } from "./AdminData";
import {
  CustomButton,
  CustomDialog,
  CustomIcon,
  CustomInput,
} from "global/components";
import {
  handleSort,
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminStyle from "./Admin.style";
import AddIcon from "@mui/icons-material/Add";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import {
  addAttribute,
  deleteAttribute,
  deleteAttributeDomains,
  deleteAttributeSubDomains,
  getContact,
  getDomain,
  getReason,
  getRegion,
  getSource,
  getStatus,
  getSubDomain,
  getSubmission,
  getType,
} from "./Admin.service";
import AdminTableData from "./Components/AdminTableData";
import AddAttribute from "assets/icons/addAttribute.svg";
import { getProcessDef } from "./Admin.service";
import CustomTabs1 from "global/components/CustomTabs/CustomTabs1";
import { doesLoggedInUserHasAccessToResource } from "utils/AuthorizationManager";
import deleteIcon from "assets/icons/delete.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import {
  errorStyling,
  lightDropDownColor,
  primaryBlackColor,
  primaryGray,
  pureWhiteColor,
} from "utils/styles";
import _ from "lodash";
import CustomTooltip from "global/components/CustomTooltip/CustomTooltip";
import { getCustomError } from "utils/customError";

const Admin = () => {
  useTitle(strings.ADMIN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteName, setDeleteName] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<any>({
    text: { value: "", error: "" },
    dropdown: { value: "", error: "" },
  });
  const [dropDownValue, setDropdownValue] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const classes = AdminStyle;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selected, setSelected] = useState<any>([]);
  const [newValueAttribute, setNewvalueAttribute] = useState<any>("Status");
  const [currentSelectedTab, setCurrentSelectedTab] =
    useState<any>("Attributes");
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [addContent, setAddContent] = useState<any>();
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [dropdownValue, setdropdownValue] = useState({
    region: { value: "US" },
    domain: { value: "Staffing" },
  });

  useEffect(() => {
    if (currentSelectedTab === "Attributes") {
      getTableData();
    } else {
      getWorkFlowData();
    }
  }, [newValueAttribute, currentSelectedTab, dropdownValue]);

  useEffect(() => {
    setSelected([]);
    setPage(0);
    setPageSize(10);
  }, [newValueAttribute]);

  const getTableData = async () => {
    switch (newValueAttribute) {
      case "Status":
        return getStatusData();
      case "Type":
        return getTypeData();
      case "Region":
        return getRegionData();
      case "Domain":
        return getDomainData(dropdownValue.region.value);
      case "SubDomain":
        return getSubDomainData(dropdownValue.domain.value);
      case "Source":
        return getSourceData();
      case "Contract":
        return getContactData();
      case "Submission":
        return getSubmissionData();
      case "Reason":
        return getReasonData();
      default:
        return getStatusData();
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

  const getDomainData = async (regionValue: any) => {
    try {
      setIsLoading(true);
      const [domain, data] = await Promise.all([
        getDomain(regionValue),
        getRegion(),
      ]);
      setTableData(domain);
      const filterData = convertAssigneeData(handleSort(data));
      setDropdownValue(filterData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getWorkFlowData = async () => {
    try {
      setIsLoading(true);
      const domain = await getProcessDef();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getStatusData = async () => {
    try {
      setIsLoading(true);
      const domain = await getStatus();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getTypeData = async () => {
    try {
      setIsLoading(true);
      const domain = await getType();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getRegionData = async () => {
    try {
      setIsLoading(true);
      const domain = await getRegion();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSubDomainData = async (domainValue: any) => {
    try {
      setIsLoading(true);
      const [domain, data] = await Promise.all([
        getSubDomain(domainValue),
        getDomain("All"),
      ]);
      // const domain = await getSubDomain(domainValue);
      const filterDomainValue: any = _.unionBy(data, "name");
      setTableData(domain);
      const filterData = convertAssigneeData(handleSort(filterDomainValue));
      setDropdownValue(filterData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSourceData = async () => {
    try {
      setIsLoading(true);
      const domain = await getSource();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getContactData = async () => {
    try {
      setIsLoading(true);
      const domain = await getContact();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getSubmissionData = async () => {
    try {
      setIsLoading(true);
      const domain = await getSubmission();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const getReasonData = async () => {
    try {
      setIsLoading(true);
      const domain = await getReason();
      setTableData(domain);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
    }
  };

  const handleTabChange = (newVaue: any) => {
    setCurrentSelectedTab(newVaue);
    getStepSecond(newVaue);
    setSelected([]);
  };

  const handleTabChangeAttribute = (newVaueAttribute: any) => {
    setNewvalueAttribute(newVaueAttribute);
  };

  const handleDelete = () => {
    if (selected.length > 0) {
      setDeleteName(selected);
      setOpenModal(true);
    } else {
      openWarningNotification("Please select at least one attribute");
    }
  };
  const handleAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };
  const handleCloseModelAdd = () => {
    setOpenModalAdd(false);
    setInputValue({
      text: { value: "", error: "" },
      dropdown: { value: "", error: "" },
    });
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      switch (newValueAttribute) {
        case "SubDomain":
          for (const item of selected) {
            await deleteAttributeSubDomains(
              newValueAttribute.charAt(0).toLowerCase() +
                newValueAttribute.slice(1),
              item.name,
              item,
              item.type
            );
          }
          break;
        case "Domain":
          for (const item of selected) {
            await deleteAttributeDomains(
              newValueAttribute.charAt(0).toLowerCase() +
                newValueAttribute.slice(1),
              item.name,
              item,
              item.context
            );
          }
          break;
        default:
          for (const item of selected) {
            await deleteAttribute(
              newValueAttribute.charAt(0).toLowerCase() +
                newValueAttribute.slice(1),
              item.name,
              item
            );
          }
          break;
      }
      setSelected([]);
      setIsLoading(false);
      openSuccessNotification("Attribute has been deleted successfully");
      setOpenModal(false);
      setIsLoading(false);
      await getTableData();
    } catch (error: any) {
      setIsLoading(false);
      getCustomError(error);
      setIsLoading(false);
    }
  };
  const handleValidation = () => {
    const { errors, isValid } = adminValidation(
      inputValue,
      dropDownValue,
      newValueAttribute
    );
    setInputValue({ ...errors });
    return isValid;
  };

  const handleConfirmAdd = async (
    name: any,
    context: any,
    type: any,
    tabValue?: any
  ) => {
    const data = {
      context: context,
      name: name,
      type: type,
    };
    if (handleValidation()) {
      try {
        setIsLoading(true);
        await addAttribute(
          newValueAttribute.charAt(0).toLowerCase() +
            newValueAttribute.slice(1),
          data
        );
        openSuccessNotification("Attribute has been added successfully");
        setOpenModalAdd(false);
        setInputValue({
          text: { value: "", error: "" },
          dropdown: { value: "", error: "" },
        });
        setIsLoading(false);
        tabValue == "Domain"
          ? setdropdownValue({
              ...dropdownValue,
              region: { value: context },
            })
          : tabValue == "SubDomain"
          ? setdropdownValue({
              ...dropdownValue,
              domain: { value: type },
            })
          : await getTableData();
      } catch (error: any) {
        getCustomError(error);
        setIsLoading(false);
      }
    }
  };

  const addEmailsDialogFooter = () => {
    return (
      <>
        <Grid container sx={classes.centerItemFlex}>
          <Box sx={classes.buttonWrapper}>
            <CustomButton
              label="Cancel"
              onClick={() => handleCloseModel()}
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
            />
            <CustomButton
              label={"Delete"}
              onClick={() => {
                handleConfirmDelete();
              }}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };
  const dialogFooterContent = () => {
    return (
      <>
        <Box mt={2} width={"100%"}>
          <Box sx={classes.buttonWrapper} mb={3}>
            <CustomButton
              label={strings.CANCEL}
              onClick={() => {
                handleCloseModelAdd();
              }}
              customClasses={classes.buttonStye}
              buttonType={"outlined"}
            />
            <CustomButton
              label={strings.SAVE}
              onClick={() => {
                setAddContent({ ...addContent, type: newValueAttribute });
                newValueAttribute === "Domain"
                  ? handleConfirmAdd(
                      inputValue.text.value,
                      inputValue.dropdown.value,
                      newValueAttribute,
                      newValueAttribute
                    )
                  : newValueAttribute === "SubDomain"
                  ? handleConfirmAdd(
                      inputValue.text.value,
                      newValueAttribute,
                      inputValue.dropdown.value,
                      newValueAttribute
                    )
                  : handleConfirmAdd(
                      inputValue.text.value,
                      "Request",
                      newValueAttribute,
                      newValueAttribute
                    );
                // handleConfirmAdd(addItem);
              }}
              customClasses={classes.buttonStye}
              buttonType={"contained"}
            />
          </Box>
        </Box>
      </>
    );
  };
  const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, text: { value: event.target.value } });
  };
  const getAllButton = () => {
    return (
      <>
        <Box sx={classes.buttonContainer}>
          {doesLoggedInUserHasAccessToResource(strings.ADD, strings.RESPONSE) &&
            currentSelectedTab === "Attributes" && (
              <Box>
                <CustomButton
                  label={`Add ${newValueAttribute}`}
                  icon={<AddIcon htmlColor={"#7A81FD"} />}
                  onClick={handleAdd}
                  customClasses={{
                    width: {
                      xl: "160px",
                      lg: "160px",
                      md: "160px",
                      sm: "200px",
                      xs: "265px",
                    },
                    [`@media screen and (max-width: ${320}px)`]: {
                      width: "190px",
                    },
                  }}
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
                icon={<DeleteIcon htmlColor={"#7A81FD"} />}
                onClick={handleDelete}
                customClasses={{
                  width: {
                    xs: "265px",
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
          )}
        </Box>
      </>
    );
  };
  const dialogContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon icon={<img src={deleteIcon} alt="deleteIcon" />} />
        </Box>
        <Box mt={2}>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete {`${newValueAttribute}`}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete?
          </Typography>
        </Box>
      </>
    );
  };
  const dialogContentAdd = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon icon={<img src={AddAttribute} alt="AddAttribute" />} />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? "white" : "#000000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Add {`${newValueAttribute}`}
          </Typography>

          <Grid
            container
            style={{ display: "flex", justifyContent: "center" }}
            gap={2}
          >
            {dropDownValue.length > 0 && (
              <Grid item xl={7} lg={7} md={8} xs={11} sm={9}>
                <Stack direction="column">
                  <InputLabel
                    sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                  >
                    <Typography variant="h6">{` ${
                      newValueAttribute === "Domain" ? "Region" : "Domain"
                    }`}</Typography>
                    <Box sx={classes.star}>*</Box>
                  </InputLabel>
                  <Select
                    sx={
                      bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                    }
                    id="submissionType"
                    name="submissionType"
                    value={inputValue.dropdown.value}
                    onChange={(event: any) =>
                      setInputValue({
                        ...inputValue,
                        dropdown: { value: event.target.value },
                      })
                    }
                    renderValue={() => (
                      <Typography
                        sx={{ color: bgcolor ? "#CBCBCB" : "#000000" }}
                        variant="h5"
                      >
                        {inputValue.dropdown.value ||
                          `Select ${
                            newValueAttribute === "Domain" ? "Region" : "Domain"
                          }`}
                      </Typography>
                    )}
                    style={classes.styledrop}
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
                            backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                            borderRadius: "40px !important",
                          },
                          "& .MuiMenuItem-root.Mui-selected:hover": {
                            backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                            color: pureWhiteColor,
                          },
                          borderRadius: "34px",
                          backgroundColor: !bgcolor ? "#E6E7FF" : "#282945",
                          "::-webkit-scrollbar": {
                            display: "none",
                          },
                          MenuListProps: {
                            sx: {
                              backgroundColor: lightDropDownColor,
                              borderRadius: "34px",
                            },
                          },
                        },
                      },
                      MenuListProps: {
                        sx: {
                          backgroundColor: bgcolor ? "#373854" : "#E6E7FF",
                          borderRadius: "34px",
                        },
                      },
                    }}
                    error={
                      inputValue.dropdown.value && inputValue.dropdown.error
                    }
                    displayEmpty
                  >
                    {dropDownValue?.map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        sx={{
                          color: bgcolor ? "#ffffff" : "#000000",
                          backgroundColor: bgcolor ? "#373854" : "#E6E7FF",
                        }}
                        value={item.name}
                      >
                        <Typography variant="subtitle1">
                          {" "}
                          {item.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {!isTruthy(inputValue.dropdown.value) && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {inputValue.dropdown.error}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            )}
            <Grid item xl={7} lg={7} md={8} xs={11} sm={9}>
              <CustomInput
                id="attribute"
                placeHolder={`Enter ${newValueAttribute}`}
                type="text"
                label={`${newValueAttribute}`}
                required
                name="attribute"
                onChange={(event: any) => {
                  handleState(event);
                }}
                customInputClasses={{
                  background: !bgcolor ? "#E6E7FF" : "#373854",
                  input: {
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: !bgcolor
                        ? `0 0 0 1000px #E6E7FF inset`
                        : `0 0 0 1000px #373854 inset`,
                      transition:
                        "background-color 5000s ease-in-out 0s !important",
                      "-webkit-text-fill-color": !bgcolor
                        ? primaryBlackColor
                        : "white !important",
                    },
                  },
                }}
                error={
                  !isTruthy(inputValue.text.value) && inputValue.text.error
                }
              />
              {!isTruthy(inputValue.text.value) && inputValue.text.error && (
                <FormHelperText error sx={{ ...errorStyling }}>
                  {inputValue.text.error}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogContent()}
        dialogFooterContent={addEmailsDialogFooter()}
        width="460px"
        closable={true}
        closeIcon={true}
        closeButtonVisibility
        cancelIcon={true}
        borderRadius="33px"
      />
    );
  };
  const customDialogAdd = () => {
    return (
      <CustomDialog
        isDialogOpen={openModalAdd}
        handleDialogClose={handleCloseModelAdd}
        dialogBodyContent={dialogContentAdd()}
        closable
        // dialogHeaderContent={addUserHeaderContent()}
        dialogFooterContent={dialogFooterContent()}
        dialogFooterClass={classes.dialogFooterClass}
        // handleDialogClose={handleClose}
        width={"600px"}
        closeIcon={true}
        closeButtonVisibility
        borderRadius="33px"
        cancelIcon={true}
      />
    );
  };
  const customtabAttribute = () => {
    return (
      <>
        <CustomTabs
          changeValue={(newVaueAttribute: string) => {
            setDropdownValue([]);
            setInputValue({
              text: { value: "", error: "" },
              dropdown: { value: "", error: "" },
            });
            setNewvalueAttribute(newVaueAttribute);
            handleTabChangeAttribute(newVaueAttribute);
          }}
          sx={classes.button}
          selected={newValueAttribute}
          tabConfig={tabConfig["Admin"]}
          classes={{ width: "100%" }}
          width={classes.tabWidth1}
        />
        <Divider
          sx={{
            backgroundColor: "#7A81FD",
          }}
        />
      </>
    );
  };

  const getStepSecond = (newVaue: any) => {
    switch (newVaue) {
      case "Attributes":
        return (
          <>
            <Box>{getTableSecond()}</Box>
          </>
        );

      default:
        return (
          <AdminTableData
            tableData={tableData}
            getStepperSecond={getStepper}
            currentSelectedTab={currentSelectedTab}
            isLoading={isLoading}
            selected={selected}
            newValueAttribute={"Process"}
          />
        );
    }
  };
  const getStatusValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getTypeValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          isLoading={isLoading}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getRegionValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };

  const getDomainValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          dropDownValue={dropDownValue}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getSubDomainValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          dropDownValue={dropDownValue}
          setSelectedValue={setSelected}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          subDomain={true}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getSourceValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getContactValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          page={page}
          setdropdownValue={setdropdownValue}
          isLoading={isLoading}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getSubmissionValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          page={page}
          isLoading={isLoading}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getReasonValue = () => {
    return (
      <>
        <AdminTableData
          tableData={tableData}
          setSelectedValue={setSelected}
          isLoading={isLoading}
          page={page}
          setdropdownValue={setdropdownValue}
          dropdownValue={dropdownValue}
          currentSelectedTab={currentSelectedTab}
          pageSize={pageSize}
          getStepper={customtabAttribute}
          getStepperSecond={getStepper}
          selected={selected}
          newValueAttribute={newValueAttribute}
        />
      </>
    );
  };
  const getTableSecond = () => {
    switch (newValueAttribute) {
      case "Status":
        return getStatusValue();
      case "Type":
        return getTypeValue();
      case "Region":
        return getRegionValue();
      case "Domain":
        return getDomainValue();
      case "SubDomain":
        return getSubDomainValue();
      case "Source":
        return getSourceValue();
      case "Contract":
        return getContactValue();
      case "Submission":
        return getSubmissionValue();
      case "Reason":
        return getReasonValue();
      default:
        return getStatusValue();
    }
  };
  const getStepper = () => {
    return (
      <>
        <Box sx={classes.getStepperWrapper}>
          <Box>
            <CustomTabs1
              changeValue={(newVaue: string) => {
                handleTabChange(newVaue);
              }}
              sx={{
                padding: "0px 0px",
                height: "4vh",
                width: "50%",
                background: !bgcolor ? "white" : "#282945",
              }}
              selected={currentSelectedTab}
              tabConfig={tasksTabContent}
              classes={{ width: "100%" }}
              width={{
                width: "100%",
                [`@media screen and (max-width: ${320}px)`]: {
                  width: "190px",
                },
              }}
              borderRadius={true}
            />
          </Box>
          <Box>{getAllButton()}</Box>
        </Box>
      </>
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
          Admin
        </Typography>
      </>
    );
  };

  const getAdminData = () => {
    return (
      <Box mt={11} px={3}>
        {getHeaders()}
        {customDialog()}
        {customDialogAdd()}
        {getStepSecond(currentSelectedTab)}
        <CustomLoader isLoading={isLoading} />
      </Box>
    );
  };
  return getAdminData();
};
export default React.memo(Admin);
