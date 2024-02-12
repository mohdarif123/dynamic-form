/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { CustomButton, CustomInput } from "global/components";
import ProposalStyles from "../Proppsals.style";
import { Box } from "@mui/system";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import DeleteImg from "assets/icons/adddocIcon.svg";
import dropZoneDropZone from "assets/icons/DownlaodsIcon.svg";
import { upload } from "../Proposals.service";
import { useLocation } from "react-router";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  addDocumentService,
  updateDocumentProposal,
} from "../AddProposal/AddProposal.service";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import CustomDatePicker from "global/components/CustomDatePicker/CustomDatePicker";
import moment from "moment";
import { CustomDateRange } from "../../UserRFPReports/UserRFPReports.Type";
import CustomDialog from "global/components/CustomModal/CustomModal";
import {
  menuPropsDarkStyle,
  menuPropsLightStyle,
  dropDownDarkForSx,
  dropDownLightForSx,
  meneItemDarkStyle,
  meneItemLightStyle,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
  pureWhiteColor,
  primaryBlackColor,
  errorStyling,
} from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import { getCustomError } from "utils/customError";

interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  viewProposalData?: any;
  fetchDocumentHandler?: any;
  status?: any;
  updateData?: any;
  setUpdateItem?: any;
}
const AddDocumentModal = (props: customProps) => {
  const classes = ProposalStyles;
  const initialState: any = {
    fromDate: "",
    toDate: "",
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadDocumentObject, setUploadDocumentObject] = useState<any>({});
  const urlParams = useLocation().search;
  const proposalId = new URLSearchParams(urlParams).get("id");
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [titleError, setTitleError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [issueDateError, setIssueDateError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [dateRange, setDateRange] = useState<CustomDateRange>(initialState);
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  const [dateRangeChanged, setDateRangeChanged] = useState<boolean>(false);
  const [uploadFileError, setUploadFileError] = useState("");
  const [formField, setFormField] = useState<any>([
    {
      audit: {
        fromZ: new Date(),
        thruZ: new Date(),
        createdBy: "",
        updatedBy: "",
      },
      comment: "",
      content: "",
      expiryDate: "",
      fileName: "",
      id: "",
      interval: 0,
      issueDate: "",
      metaData: [],
      ownerId: proposalId,
      path: "",
      status: "Active",
      title: props?.updateData?.title ? props?.updateData?.title : "",
      type: props?.updateData?.type ? props?.updateData?.type : "",
    },
  ]);
  useEffect(() => {
    setFormField([
      {
        ...formField[0],
        title: props?.updateData?.title,
        type: props?.updateData?.type,
      },
    ]);
  }, [props?.updateData]);

  const handleValidate = () => {
    let invalid = true;
    formField?.map((item: any, index: any) => {
      const type = formField[index].type;
      const title = formField[index].title;
      const fileName = formField[index].fileName;
      const expiryDate = formField[index].expiryDate;
      const dateexpiry = moment(expiryDate).format("MM-DD-YYYY");
      const issueDate = formField[index].issueDate;
      if (!type && !title && !fileName) {
        setTitleError("Please select title");
        setTypeError("Please enter type");
        setUploadFileError("Please upload file");
        invalid = false;
      }
      if (!title) {
        setTitleError("Please select title");
        invalid = false;
      }
      if (!type) {
        setTypeError("Please enter type");
        invalid = false;
      }
      if (!fileName) {
        setUploadFileError("Please upload file");
        invalid = false;
      }
      if (
        (!expiryDate && type === "Project Agreement") ||
        expiryDate == "Invalid date"
      ) {
        setExpiryDateError("Please select expiry Date");
        invalid = false;
      }
      if (
        (!issueDate && type === "Project Agreement") ||
        issueDate == "Invalid date"
      ) {
        setIssueDateError("Please select issue Date");
        invalid = false;
      }
      if (
        issueDate &&
        !moment(issueDate, "DD/MM/YYYY").isValid() &&
        type === "Project Agreement"
      ) {
        setIssueDateError("Please select valid issue Date");
        invalid = false;
      }
      if (
        expiryDate &&
        !moment(expiryDate, "DD/MM/YYYY").isValid() &&
        type === "Project Agreement"
      ) {
        setExpiryDateError("Please select valid expiry Date");
        invalid = false;
      }
    });
    return invalid;
  };
  const addDocument = async () => {
    if (handleValidate()) {
      try {
        setLoading(true);
        for (const item of formField) {
          let data = item;
          if (item.type === "Project Agreement") {
            data = {
              ...item,
              issueDate:
                item.fromDate && moment(item.fromDate).format("MM/DD/YYYY"),
              expiryDate:
                item.toDate && moment(item.toDate).format("MM/DD/YYYY"),
            };
          }
          await addDocumentService(data);
        }
        props.setOpenModal(false);
        setFormField([
          {
            ...formField[0],
            title: "",
            type: "",
            path: "",
            fileName: "",
          },
        ]);
        props?.updateData &&
          (await updateDocumentProposal(props?.updateData?.id));
        setLoading(false);
        handleCloseModel();
        props.fetchDocumentHandler();
      } catch (error: any) {
        setLoading(false);
        getCustomError(error);
      }
    }
  };
  const handleCloseModel = () => {
    props.setOpenModal(false);
    props?.setUpdateItem(false);
    setFormField([
      {
        audit: {
          fromZ: new Date(),
          thruZ: new Date(),
          createdBy: "",
          updatedBy: "",
        },
        comment: "",
        content: "",
        expiryDate: "",
        fileName: "",
        id: "",
        interval: 0,
        issueDate: "",
        metaData: [],
        ownerId: proposalId,
        path: "",
        status: "Active",
        title: "",
        type: "",
      },
    ]);
    setTitleError("");
    setTypeError("");
    setUploadFileError("");
    setIssueDateError("");
    setExpiryDateError("");
  };
  const dialogHeaderContent = () => {
    return (
      <>
        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            <img src={DeleteImg} alt="delete Image" />
          </Box>
          <Box marginTop={3} textAlign={"center"}>
            <Typography
              sx={bgcolor ? classes.titleRight : classes.titleRight1}
              variant="h2"
            >
              Add Document
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const uploadDoccumentFileHandler = async (event: any, index: any) => {
    try {
      setLoading(true);
      const fileData = event[0];
      const data = new FormData();
      const fileImagePath = fileData?.file;
      data.append("file", fileImagePath);
      const response = await upload(proposalId, data);
      const setFileName = [...formField];
      setFileName[index].path = response?.path;
      setFileName[index].fileName = fileImagePath?.name;
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleDaterangeChange = (
    value: string,
    date: string,
    index: number
  ) => {
    const formDataValue = [...formField];
    const formattedDate = value;
    setDateRange({
      ...dateRange,
      [date]: formattedDate,
    });
    switch (date) {
      case "fromDate":
        {
          formDataValue[index].issueDate =
            moment(formattedDate).format("DD/MM/YYYY");
        }
        break;
      case "toDate":
        {
          formDataValue[index].expiryDate =
            moment(formattedDate).format("DD/MM/YYYY");
        }
        break;
      default:
        break;
    }
    formDataValue[index][date] = formattedDate;
    setFormField(formDataValue);
    setDateRangeChanged(true);
    setSelectedTableData([]);
  };
  const DocumentType = () => {
    if (props.status !== "Won") {
      return ["Project Info", "Project Proposal"];
    } else {
      return ["Project Info", "Project Proposal", "Project Agreement"];
    }
  };
  const wonTitle = ["Insurance", "Contract"];

  const handlerRemoveHandler = (index: number) => {
    setFormField(formField.filter((item: any, i: number) => i !== index));
  };

  const dialogContent = () => {
    return (
      <>
        <Box width={"100%"}>
          {formField?.map((item: any, index: number) => {
            return (
              <>
                <Grid
                  container
                  sx={{
                    backgroundColor: bgcolor ? "#373854" : "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Grid xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={11} mt={1}>
                    <Box sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                        }}
                      >
                        Type{" "}
                      </Typography>
                      <Typography sx={classes.star}>*</Typography>
                    </Box>
                    <Select
                      id="type"
                      name="type"
                      value={item.type}
                      onChange={(e: any) => {
                        const formFieldwwww = [...formField];
                        formFieldwwww[index].type = e.target.value;
                        formFieldwwww[index].title = "";
                        setFormField(formFieldwwww);
                      }}
                      // disabled={props?.updateData?.type}
                      readOnly={props?.updateData?.type ? true : false}
                      sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                      style={!bgcolor ? selectBgLight : selectBgDark}
                      MenuProps={
                        !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                      }
                      renderValue={() => (
                        <Typography
                          sx={
                            !bgcolor
                              ? renderValueLightStyle
                              : renderValueDarkStyle
                          }
                          variant="h4"
                        >
                          {item.type ? item.type : "Select Type"}
                        </Typography>
                      )}
                      displayEmpty
                    >
                      {DocumentType()?.map((item: any, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                        >
                          <Typography variant="subtitle1"> {item}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(formField[index].type) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {typeError}
                      </FormHelperText>
                    )}
                  </Grid>
                  {item.type == "Project Agreement" ? (
                    <Grid xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={11} mt={1}>
                      <Box sx={classes.inputLabel}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: !bgcolor
                              ? primaryBlackColor
                              : pureWhiteColor,
                          }}
                        >
                          Title
                        </Typography>
                        <Typography sx={classes.star}>*</Typography>
                      </Box>
                      <Select
                        id="title"
                        name="title"
                        value={item.title}
                        onChange={(e: any) => {
                          const formFieldwwww = [...formField];
                          formFieldwwww[index].title = e.target.value;
                          setFormField(formFieldwwww);
                        }}
                        // disabled={props?.updateData?.title}
                        readOnly={props?.updateData?.title ? true : false}
                        sx={!bgcolor ? dropDownLightForSx : dropDownDarkForSx}
                        style={!bgcolor ? selectBgLight : selectBgDark}
                        MenuProps={
                          !bgcolor ? menuPropsLightStyle : menuPropsDarkStyle
                        }
                        renderValue={() => (
                          <Typography
                            sx={
                              !bgcolor
                                ? renderValueLightStyle
                                : renderValueDarkStyle
                            }
                            variant="h4"
                          >
                            {item.title ? item.title : "Select Title"}
                          </Typography>
                        )}
                        displayEmpty
                      >
                        {wonTitle?.map((item: any, index) => (
                          <MenuItem
                            key={index}
                            value={item}
                            sx={
                              !bgcolor ? meneItemLightStyle : meneItemDarkStyle
                            }
                          >
                            <Typography variant="subtitle1"> {item}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                      {!isTruthy(formField[index].title) && (
                        <FormHelperText error sx={{ ...errorStyling }}>
                          {typeError}
                        </FormHelperText>
                      )}
                    </Grid>
                  ) : (
                    <Grid xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={11}>
                      <Box mt={1}>
                        <CustomInput
                          label="Title"
                          placeHolder="Enter title"
                          customInputClasses={{ height: "47px" }}
                          required
                          onChange={(e: any) => {
                            const formFieldwwww = [...formField];
                            formFieldwwww[index].title = e.target.value;
                            setFormField(formFieldwwww);
                          }}
                          name="title"
                          id="title"
                          value={item.title}
                        />
                        {!isTruthy(formField[index].title) && (
                          <FormHelperText error sx={{ ...errorStyling }}>
                            {titleError}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                  )}

                  <Grid item xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={5.2}>
                    <Box sx={classes.formInput}>
                      <Box sx={classes.inputLabel}>
                        <Typography
                          sx={bgcolor ? classes.nameField : classes.nameField1}
                          variant="h6"
                        >
                          Upload File
                        </Typography>
                        <Typography sx={classes.star}>*</Typography>
                      </Box>
                      <CustomDropzone
                        acceptedFileTypes={[
                          ".jpeg",
                          ".jpg",
                          ".png",
                          ".gif",
                          ".bmp",
                          ".tiff",
                          ".pdf",
                          ".doc",
                          ".docx",
                          ".txt",
                          ".xls",
                          ".xlsx",
                        ]}
                        maxFileSize={10485760}
                        dropzoneIcon={dropZoneDropZone}
                        dropzoneIconStyle={true}
                        index={index}
                        onAdd={(e: any) => {
                          uploadDoccumentFileHandler(e, index);
                        }}
                        dropzoneCustomClasses={{
                          background: bgcolor ? "#282945" : "#E6E7FF",
                          border: !bgcolor ? "1px solid #C1C1C1" : "none",
                          display: "flex",
                        }}
                        uploadedFileName={formField[index].fileName}
                        iconWrapperStyle={classes.dropzoneIconStyle}
                      />
                      {!isTruthy(formField[index].fileName) && (
                        <FormHelperText error sx={{ ...errorStyling }}>
                          {uploadFileError}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={5.2}>
                    <Box marginLeft={2} m={5}>
                      <CustomButton
                        label={"Delete"}
                        icon={<DeleteIcon htmlColor={"#7A81FD"} />}
                        disabled={Object.keys(formField).length <= 1}
                        customClasses={{
                          width: {
                            xl: "120px",
                            lg: "120px",
                            md: "120px",
                            sm: "120px",
                            xs: "100px",
                          },
                        }}
                        buttonType={"outlined"}
                        onClick={() => handlerRemoveHandler(index)}
                      />
                    </Box>
                  </Grid>
                  {formField[index].type === "Project Agreement" && (
                    <Grid item xl={5.5} lg={5} md={5} mt={1}>
                      <CustomDatePicker
                        handleDaterangeChange={(value: any, type: any) =>
                          handleDaterangeChange(value, type, index)
                        }
                        fromDate="fromDate"
                        toDate="toDate"
                        dateRange={formField[index]}
                        customWidth={{
                          xl: "450px",
                          lg: "450px",
                          sm: "280px",
                          md: "400px",
                        }}
                        disableFuture={true}
                        labelWidth={{
                          lg: "225px",
                          sm: "140px",
                          md: "200px",
                          xs: "200px",
                        }}
                        labelFirst="Issue Date"
                        labelSecondRequired={true}
                        labelFirstRequired={true}
                        disablePast={true}
                        labelSecond="Expiry Date"
                        placeholderstart="Select Issue Date"
                        errorFirst={issueDateError}
                        errorSecond={expiryDateError}
                        placeholderend="Select Expiry Date"
                        readonly={true}
                      />
                    </Grid>
                  )}
                </Grid>
              </>
            );
          })}
          {!props?.updateData && (
            <Box pt={2} display={"flex"} justifyContent={"center"}>
              <CustomButton
                onClick={() => {
                  if (handleValidate()) {
                    const data: any[] = [];
                    data.push(...formField, {
                      audit: {
                        fromZ: new Date(),
                        thruZ: new Date(),
                        createdBy: "",
                        updatedBy: "",
                      },
                      comment: "",
                      content: "",
                      expiryDate: "",
                      fileName: "",
                      id: 0,
                      issueDate: "",
                      metaData: [],
                      ownerId: proposalId,
                      path: "",
                      status: "Active",
                      title: "",
                      type: "",
                    });
                    setFormField(data);
                    setTitleError("");
                    setTypeError("");
                    setUploadFileError("");
                  }
                }}
                label="Add Document"
                icon={<AddIcon htmlColor={"#7A81FD"} />}
                customClasses={{ width: "200px" }}
                buttonType={"outlined"}
              />
            </Box>
          )}
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              backgroundColor: bgcolor ? "#373854" : "#ffffff",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <Box sx={classes.dialogFooter} marginTop={7}>
              <CustomButton
                label="Cancel"
                customClasses={{ width: "170px" }}
                buttonType={"outlined"}
                onClick={() => handleCloseModel()}
              />
              <CustomButton
                label="Submit"
                customClasses={{ width: "170px" }}
                buttonType={"contained"}
                onClick={() => addDocument()}
              />
            </Box>
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <>
      <CustomDialog
        dialogTitleContent={dialogHeaderContent()}
        isDialogOpen={props.openModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleCloseModel}
        // dialogTitleContent={dialogTitleContent()}
        dialogFooterContent={dialogContent()}
        dialogFooterClass={true}
        width={"850px"}
        borderRadius="33px"
      />
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(AddDocumentModal);
