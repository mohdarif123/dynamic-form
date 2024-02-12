/*eslint-disable*/
import React, { useState } from "react";
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
import { useLocation } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { CustomButton, CustomInput } from "global/components";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import CompetitiveStyle from "../Competitive.styel";
import { addDocumentService, upload } from "../Competitive.service";
import CustomDialog from "global/components/CustomModal/CustomModal";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  primaryBlackColor,
  pureWhiteColor,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import CustomDropzone from "global/components/CustomDropzone/CustomDropzone";
import { getCustomError } from "utils/customError";

interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  handlerSave: any;
  viewProposalData: any;
  viewProposalHandler: any;
}
const AddDocumentModal = (props: customProps) => {
  const classes = CompetitiveStyle;
  const [loading, setLoading] = useState<boolean>(false);
  const urlParams = useLocation().search;
  const proposalId = new URLSearchParams(urlParams).get("id");
  const [titleError, setTitleError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [uploadFileError, setUploadFileError] = useState("");
  const bgcolor = useAppSelector(selectBackgroundColor);
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
      expiryDate: "12/31/9999",
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

  const handleValidate = () => {
    let invalid = true;
    formField?.map((item: any, index: any) => {
      const type = formField[index].type;
      const title = formField[index].title;
      const fileName = formField[index].fileName;
      if (!type && !title && !fileName) {
        setTitleError("Please select type");
        setTypeError("Please enter title");
        setUploadFileError("Please upload file");
        invalid = false;
      }
      if (!type) {
        setTitleError("Please select type");
        invalid = false;
      }
      if (!title) {
        setTypeError("Please enter title");
        invalid = false;
      }
      if (!fileName) {
        setUploadFileError("Please upload file");
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
          await addDocumentService(item);
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
        props.viewProposalHandler();
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        getCustomError(error);
      }
    }
  };

  const handleCloseModel = () => {
    props.setOpenModal(false);
    setFormField([{}]);
    setTitleError("");
    setTypeError("");
    setUploadFileError("");
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

  const handlerRemoveHandler = (index: number) => {
    setFormField(formField.filter((item: any, i: number) => i !== index));
  };
  const dialogBody = () => {
    return (
      <>
        {/* <Box
          pt={1}
          display={"flex"}
          justifyContent={"flex-end"}
          alignContent={"flex-end"}
        ></Box> */}
        <Grid
          container
          gap={2}
          mt={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {formField?.map((item: any, index: number) => {
            return (
              <>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={10}>
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
                      const inputType = [...formField];
                      inputType[index].type = e.target.value;
                      setFormField(inputType);
                    }}
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
                    {["Project Info", "Project Proposal"]?.map(
                      (item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                        >
                          <Typography variant="subtitle1"> {item}</Typography>
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {!isTruthy(formField[index].type) && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {titleError}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={10}>
                  <CustomInput
                    label="Title"
                    placeHolder="Enter title"
                    required
                    onChange={(e: any) => {
                      const inputType = [...formField];
                      inputType[index].title = e.target.value;
                      setFormField(inputType);
                    }}
                    name="title"
                    id="title"
                    value={item.title}
                  />
                  {!isTruthy(formField[index].title) && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {typeError}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid
                  item
                  xl={10}
                  sm={10}
                  xs={10}
                  lg={10}
                  md={10}
                  sx={{ textAlign: "-webkit-center" }}
                  display={"flex"}
                  justifyContent={"start"}
                >
                  <Box sx={classes.formInput}>
                    <Box sx={classes.inputLable}>
                      <Typography
                        sx={bgcolor ? classes.label : classes.label1}
                        variant="h6"
                      >
                        Upload File{" "}
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
                      index={index}
                      dropzoneIcon={dropZoneDropZone}
                      onAdd={(e: any) => {
                        uploadDoccumentFileHandler(e, index);
                      }}
                      dropzoneIconStyle={true}
                      iconWrapperStyle={classes.dropzoneIconStyle}
                      dropzoneCustomClasses={{
                        background: bgcolor ? "#282945" : "#E6E7FF",
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                        display: "flex",
                      }}
                      uploadedFileName={formField[index].fileName}
                    />
                    {!isTruthy(formField[index].fileName) && (
                      <FormHelperText error sx={{ ...errorStyling }}>
                        {uploadFileError}
                      </FormHelperText>
                    )}
                  </Box>
                  <Grid item xl={3} lg={3} md={3} sm={5} xs={6}>
                    <Box marginLeft={3} mt={6}>
                      <CustomButton
                        label={"Delete"}
                        icon={<DeleteIcon htmlColor={"#7A81FD"} />}
                        disabled={Object.keys(formField).length <= 1}
                        customClasses={{ width: "150px" }}
                        buttonType={"outlined"}
                        onClick={() => handlerRemoveHandler(index)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </>
            );
          })}
          <Box display={"flex"} justifyContent={"center"}>
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
                    expiryDate: "12/31/9999",
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

          <Box sx={classes.dialogFooter}>
            <CustomButton
              label="Cancel"
              onClick={() => handleCloseModel()}
              buttonType={"outlined"}
            />
            <CustomButton
              label="Submit"
              onClick={() => addDocument()}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const dialogContent = () => {
    return (
      <>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            label="Cancel"
            onClick={() => handleCloseModel()}
            buttonType={"outlined"}
          />
          <CustomButton
            label="Submit"
            onClick={() => addDocument()}
            buttonType={"contained"}
          />
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
        dialogFooterClass={true}
        handleDialogClose={handleCloseModel}
        dialogFooterContent={dialogBody()}
        width="900px"
        borderRadius="33px"
        showCancelIconWhenNoHeader={true}
      />
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default AddDocumentModal;
