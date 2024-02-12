import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  InputLabel,
  Tooltip,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { CustomButton, CustomIcon, CustomInput } from "global/components";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputMask from "react-input-mask";
import ProposalStyles from "../Proppsals.style";
import JoditEditor from "jodit-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router";
import strings from "global/constants/StringConstants";
import { isPhoneValid, isTruthy } from "helpers/methods";
import { getFormattedNumbers } from "helpers/methods";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomContactInput from "global/components/CustomContactInput/CustomContactInput";
import { errorStyling } from "utils/styles";

interface ContractProps {
  addProposalValue: any;
  joiData: any;
  setJoiData: any;
  setContactDetail: any;
  contactDetail: any;
  handleBackStep: any;
  collectAddProposalData: any;
  editState: any;
  collectUpdateProposalData: any;
  setAddProposalValue: any;
  contactErrorDetails?: any;
  proposalId?: any;
  handleClose?: any;
  setVisitedContactFelid?: any;
  isVisitedContactField?: boolean;
}

const ContactInfromationScreen2 = (props: ContractProps) => {
  const classes = ProposalStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [nameError, setNameError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const emailRegex = strings.regex;
  const urlParams = useLocation().search;
  const proposalId = props.proposalId;
  const handlerAddDetails = () => {
    props?.setVisitedContactFelid(false);
    if (handleValidate()) {
      const newValue: any[] = [];
      newValue.push(...props.contactDetail, {
        title: "",
        name: "",
        email: "",
        contactNo: "",
      });
      props.setContactDetail(newValue);
    }
  };

  const handleRemoveHandler = (index: number) => {
    props.setContactDetail(
      props.contactDetail.filter((item: any, i: number) => i !== index)
    );
    setNameError("");
    setContactNoError("");
  };
  const handlerChange = (e: any) => {
    props.setAddProposalValue({
      ...props.addProposalValue,
      text: {
        ...props.addProposalValue["text"],
        value: e,
      },
    });
  };
  const handleValidate = () => {
    let invalid = true;
    props?.contactDetail?.forEach((item: any, index: any) => {
      const type = props?.contactDetail[index].name;
      const contactNumberValue = props?.contactDetail[index].contactNo;
      if (!type && !contactNumberValue) {
        setNameError("Please enter name");
        setContactNoError("Please enter a valid contact No");
        invalid = false;
      }
      if (!type) {
        setNameError("Please enter name");
        invalid = false;
      }
      if (!contactNumberValue || !isPhoneValid(contactNumberValue)) {
        setContactNoError("Please enter a valid contact No");
        invalid = false;
      }
    });
    return invalid;
  };
  return (
    <>
      <Box>
        <Container maxWidth="md">
          <Box
            onClick={() => props.handleBackStep()}
            sx={{ cursor: "pointer" }}
          >
            <CustomIcon
              icon={
                <ArrowBackIcon
                  sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                />
              }
            />
            <Typography
              sx={{
                fontSize: "32x",
                fontWeight: 400,
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              variant="h6"
            >
              Back
            </Typography>
          </Box>
          <Box mt={4}>
            <Box pt={1}>
              <CustomButton
                onClick={handlerAddDetails}
                label="Add Contact"
                icon={<AddIcon />}
                customClasses={{ width: "180px" }}
                buttonType={"outlined"}
              />
            </Box>
            <Grid container mt={2} spacing={2}>
              {props.contactDetail?.map((item: any, index: number) => {
                return (
                  <>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <CustomInput
                        label="Title"
                        id="title"
                        type="text"
                        name="title"
                        placeHolder="Enter your title"
                        propsToInputElement={{ maxLength: 50 }}
                        value={item.title}
                        onChange={(e: any) => {
                          const title = [...props.contactDetail];
                          title[index].title = e.target.value;
                          props.setContactDetail(title);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <CustomInput
                        label="Name"
                        required
                        id="name"
                        type="text"
                        name="name"
                        placeHolder="Enter your name"
                        propsToInputElement={{ maxLength: 100 }}
                        value={item.name}
                        onChange={(e: any) => {
                          const name = [...props.contactDetail];
                          name[index].name = e.target.value;
                          props.setContactDetail(name);
                          setNameError("");
                        }}
                      />
                      {!isTruthy(props.contactDetail[index].name) && (
                        <FormHelperText error sx={{...errorStyling}}>{nameError}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <CustomInput
                        label="Email"
                        id="email"
                        type="text"
                        name="email"
                        placeHolder="Enter your email"
                        propsToInputElement={{ maxLength: 100 }}
                        value={item.email}
                        onChange={(e: any) => {
                          const email = [...props.contactDetail];
                          email[index].email = e.target.value;
                          props.setContactDetail(email);
                        }}
                      />
                      {!emailRegex.test(item?.email) &&
                      item?.email?.length > 0 ? (
                        <FormHelperText error sx={{...errorStyling}}>
                          Please enter correct agency email
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                      <CustomContactInput
                        required
                        label="Contact Number"
                        id="agencyContactNo"
                        name="agencyContactNo"
                        value={item.contactNo}
                        placeHolder="(###) ###-####"
                        customInputTextFieldClasses={{
                          borderRadius: "38px",
                          ".MuiSvgIcon-root ": {
                            fill: "#7A81FD",
                          },
                        }}
                        customSxSelectClasses={classes.customSxSelectStyle}
                        onChange={(phone: string) => {
                          const contactNo = [...props.contactDetail];
                          contactNo[index].contactNo = phone;
                          props.setContactDetail(contactNo);
                          props?.isVisitedContactField && !isPhoneValid(phone)
                            ? setContactNoError(
                                "Please enter a valid contact No"
                              )
                            : setContactNoError("");
                        }}
                        onClick={() => props.setVisitedContactFelid(true)}
                        onBlur={() =>
                          props.setVisitedContactFelid(
                            isPhoneValid(item.contactNo)
                          )
                        }
                      />
                      {!isTruthy(item?.contactNo) ||
                        (!isPhoneValid(item?.contactNo) && (
                          <FormHelperText error sx={{...errorStyling}}>
                            {contactNoError}
                          </FormHelperText>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <Box mt={3} gap={5} ml={5} component={"div"}>
                        <Tooltip title="Delete" placement="top">
                          <DeleteIcon
                            style={{
                              fontSize: "30px",
                              cursor: "pointer",
                              color: bgcolor ? "#ffffff" : "#000000",
                            }}
                            htmlColor={"#7A81FD"}
                            onClick={() => handleRemoveHandler(index)}
                          />
                        </Tooltip>
                      </Box>
                    </Grid>
                  </>
                );
              })}
              {props.editState && (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {/* <CustomTable
                      headers={[
                        {
                          name: "Date",
                          field: "fromDate",
                        },
                        {
                          name: "Text",
                          field: "text",
                        },
                        {
                          name: "Created By",
                          field: "createdBy",
                        },
                      ]}
                      rows={props.joiData}
                      isRowPerPageEnable={true}
                    /> */}
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack>
                  <InputLabel sx={classes.inputLabel}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: bgcolor
                          ? classes.inputLabel
                          : classes.inputLabel1,
                      }}
                    >
                      Comment
                    </Typography>
                  </InputLabel>
                  <JoditEditor
                    value={props?.addProposalValue?.text?.value}
                    onChange={handlerChange}
                  />
                </Stack>
              </Grid>
              <Box
                mt={3}
                justifyContent={"center"}
                display={"flex"}
                width="100%"
              >
                <Grid container mt={1} sx={{ justifyContent: "center" }}>
                  <Box sx={classes.buttonWrapper} gap={3}>
                    <CustomButton
                      label={strings.CANCEL}
                      onClick={() => props.handleClose()}
                      customClasses={{ width: "110px" }}
                      buttonType={"outlined"}
                    />
                    <CustomButton
                      label="Submit"
                      onClick={() => {
                        if (handleValidate()) {
                          if (proposalId) {
                            props.collectUpdateProposalData();
                          } else {
                            props.collectAddProposalData();
                          }
                        }
                      }}
                      customClasses={{ width: "110px" }}
                      buttonType={"contained"}
                    />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default React.memo(ContactInfromationScreen2);
