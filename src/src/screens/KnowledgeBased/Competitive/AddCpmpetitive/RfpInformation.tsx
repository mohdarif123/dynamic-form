import {
  Box,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { CustomButton, CustomInput } from "global/components";
import { isTruthy } from "helpers/methods";
import CompetitiveStyle from "../Competitive.styel";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { appColor, errorStyling, primaryGray, pureWhiteColor } from "utils/styles";

interface RFPProps {
  regionType: string[];
  user: string[];
  type: string[];
  source: string[];
  setAddCompetitiveValue: any;
  addCompetitiveValue: any;
  domainType: string[];
  subDomain: string[];
  activeStep: any;
  nextStep: any;
  editState: any;
  setEditCompetitiveModal?: any;
}

const RfpinformartionScreen = (props: RFPProps) => {
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 4;

  const onChangeHandler = (e: any) => {
    props.setAddCompetitiveValue({
      ...props.addCompetitiveValue,
      [e.target.name]: {
        ...props.addCompetitiveValue[e.target.name],
        value: e.target?.value,
        error: "",
      },
    });
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: bgcolor ? "#282844" : pureWhiteColor,
          borderBottomLeftRadius: "34px",
          borderBottomRightRadius: "34px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}
        >
          <Box sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={2}>
              <CustomInput
                required
                id="requestId"
                label="Solicitation"
                disabled={props.editState}
                placeHolder="Enter your solicitation"
                type="text"
                name="requestId"
                propsToInputElement={{ maxLength: 50 }}
                value={props.addCompetitiveValue.requestId?.value}
                onChange={onChangeHandler}
                customInputClasses={
                  !bgcolor ? classes.inputLightStyle : classes.inputDarkStyle
                }
                error={
                  !isTruthy(props?.addCompetitiveValue?.requestId?.value) &&
                  props?.addCompetitiveValue?.requestId?.error
                }
              />
              {!isTruthy(props?.addCompetitiveValue?.requestId?.value) &&
                props?.addCompetitiveValue?.requestId?.error && (
                  <FormHelperText error sx={{...errorStyling}}>
                    {props?.addCompetitiveValue?.requestId?.error}
                  </FormHelperText>
                )}
            </Grid>

            {/* Display Name input box*/}
            <Box mt={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomInput
                  label="Title"
                  disabled={props.editState}
                  required
                  id="title"
                  type="text"
                  name="title"
                  placeHolder="Enter your title"
                  propsToInputElement={{ maxLength: 100 }}
                  value={props.addCompetitiveValue?.title?.value}
                  onChange={onChangeHandler}
                  error={
                    !isTruthy(props?.addCompetitiveValue?.title?.value) &&
                    props?.addCompetitiveValue?.title?.error
                  }
                  customInputClasses={
                    !bgcolor ? classes.inputLightStyle : classes.inputDarkStyle
                  }
                />
                {!isTruthy(props?.addCompetitiveValue?.title?.value) &&
                  props?.addCompetitiveValue?.title?.error && (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props?.addCompetitiveValue?.title?.error}
                    </FormHelperText>
                  )}
              </Grid>
            </Box>

            <Box mt={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box gap={{ xs: 2 }} sx={classes.inputFlexStyle}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                  >
                    <InputLabel
                      sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                    >
                      <Typography variant="h6">Region</Typography>
                      <Box sx={classes.star}>*</Box>
                    </InputLabel>
                    <Select
                      sx={
                        bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                      }
                      id="region"
                      readOnly={props.editState ? true : false}
                      name="region"
                      value={props.addCompetitiveValue.region?.value}
                      onChange={onChangeHandler}
                      renderValue={() => (
                        <Typography
                          sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                          variant="h4"
                        >
                          {props.addCompetitiveValue.region?.value ||
                            "Select Region"}
                        </Typography>
                      )}
                      displayEmpty
                      error={
                        props?.addCompetitiveValue?.region?.value?.length < 2 &&
                        props?.addCompetitiveValue?.region?.error?.length !== 0
                      }
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
                              backgroundColor: bgcolor ? appColor : "#ffffff",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                          },
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 190,
                          },
                        },
                        MenuListProps: {
                          sx: {
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                            borderRadius: "34px",
                          },
                        },
                      }}
                    >
                      {props.regionType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: bgcolor ? "#ffffff" : "#000000",
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addCompetitiveValue?.region?.value) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addCompetitiveValue?.region?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{
                      width: { md: "50%", sm: "100%" },
                    }}
                    mt={{ sm: 0, xs: 1 }}
                  >
                    <InputLabel
                      sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                    >
                      <Typography variant="h6">Domain</Typography>
                      <Box sx={classes.star}>*</Box>
                    </InputLabel>
                    <Select
                      sx={
                        bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                      }
                      id="domain"
                      name="domain"
                      readOnly={props.editState}
                      value={props.addCompetitiveValue.domain?.value}
                      onChange={onChangeHandler}
                      renderValue={() => (
                        <Typography
                          variant="h4"
                          sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                        >
                          {props.addCompetitiveValue.domain?.value ||
                            "Select Domain"}
                        </Typography>
                      )}
                      displayEmpty
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
                              backgroundColor: bgcolor ? appColor : "#ffffff",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                          },
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 190,
                          },
                        },
                        MenuListProps: {
                          sx: {
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                            borderRadius: "34px",
                          },
                        },
                      }}
                      error={
                        props?.addCompetitiveValue?.domain?.value?.length < 4 &&
                        props?.addCompetitiveValue?.domain?.error?.length !== 0
                      }
                    >
                      {props.domainType?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: bgcolor ? "#ffffff" : "#000000",
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addCompetitiveValue?.domain?.value) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addCompetitiveValue?.domain?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box mt={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={classes.inputFlexStyle} gap={2}>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                  >
                    <InputLabel sx={classes.inputLabel}>
                      <Typography
                        variant="h6"
                        sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                      >
                        Source
                      </Typography>
                      <Box sx={classes.star}>*</Box>
                    </InputLabel>
                    <Select
                      sx={
                        bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                      }
                      id="source"
                      readOnly={props.editState}
                      name="source"
                      value={props.addCompetitiveValue.source?.value}
                      onChange={onChangeHandler}
                      renderValue={() => (
                        <Typography
                          variant="h4"
                          sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                        >
                          {props.addCompetitiveValue.source?.value ||
                            "Select Source"}
                        </Typography>
                      )}
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
                              backgroundColor: bgcolor ? appColor : "#ffffff",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                          },
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 190,
                          },
                        },
                        MenuListProps: {
                          sx: {
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                            borderRadius: "34px",
                          },
                        },
                      }}
                      displayEmpty
                      error={
                        props?.addCompetitiveValue?.source?.value?.length < 4 &&
                        props?.addCompetitiveValue?.source?.error?.length !== 0
                      }
                    >
                      {props.source?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: bgcolor ? "#ffffff" : "#000000",
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addCompetitiveValue?.source?.value) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addCompetitiveValue?.source?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{ width: { md: "50%", sm: "100%" } }}
                    mt={{ sm: 0, xs: 1 }}
                  >
                    <InputLabel
                      sx={bgcolor ? classes.inputLabel : classes.inputLabel1}
                    >
                      <Typography variant="h6">Type</Typography>
                      <Box sx={classes.star}>*</Box>
                    </InputLabel>
                    <Select
                      sx={
                        bgcolor ? classes.dropDownStyle : classes.dropDownStyle1
                      }
                      id="type"
                      readOnly={props.editState}
                      name="type"
                      value={props.addCompetitiveValue.type?.value}
                      onChange={onChangeHandler}
                      renderValue={() => (
                        <Typography
                          variant="h4"
                          sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                        >
                          {props.addCompetitiveValue.type?.value ||
                            "Select Type"}
                        </Typography>
                      )}
                      displayEmpty
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
                              backgroundColor: bgcolor ? appColor : "#ffffff",
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                              color: pureWhiteColor,
                            },
                            borderRadius: "34px",
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                          },
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 190,
                          },
                        },
                        MenuListProps: {
                          sx: {
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                            borderRadius: "34px",
                          },
                        },
                      }}
                      error={
                        props?.addCompetitiveValue?.type?.value?.length < 3 &&
                        props?.addCompetitiveValue?.type?.error?.length !== 0
                      }
                    >
                      {props.type?.map((item: any, index: any) => (
                        <MenuItem
                          key={index}
                          value={item.name}
                          sx={{
                            color: bgcolor ? "#ffffff" : "#000000",
                            backgroundColor: bgcolor ? appColor : "#ffffff",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {!isTruthy(props?.addCompetitiveValue?.type?.value) && (
                      <FormHelperText error sx={{...errorStyling}}>
                        {props?.addCompetitiveValue?.type?.error}
                      </FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Box>
            <Box mt={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CustomInput
                  id="price"
                  label="Price"
                  placeHolder="Enter your price"
                  type="number"
                  name="price"
                  value={props.addCompetitiveValue.price?.value}
                  onChange={onChangeHandler}
                  error={
                    !isTruthy(props?.addCompetitiveValue?.price?.value) &&
                    props?.addCompetitiveValue?.price?.error
                  }
                  customInputClasses={
                    !bgcolor ? classes.inputLightStyle : classes.inputDarkStyle
                  }
                />
                {!isTruthy(props?.addCompetitiveValue?.price?.value) &&
                  props?.addCompetitiveValue?.price?.error && (
                    <FormHelperText error sx={{...errorStyling}}>
                      {props?.addCompetitiveValue?.price?.error}
                    </FormHelperText>
                  )}
              </Grid>
            </Box>
            {/* {!props.editState && (
              <Box mt={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box>
                    <Typography
                      sx={bgcolor ? classes.label : classes.label1}
                      variant="h6"
                    >
                      Description{" "}
                    </Typography>
                  </Box>
                  <TextField
                    multiline
                    minRows={3}
                    inputProps={{ maxLength: 500 }}
                    sx={
                      bgcolor ? classes.testAreaStyle : classes.testAreaStyle1
                    }
                    name="comment"
                    id="comment"
                    placeholder="Enter your comment"
                    value={props.addCompetitiveValue.comment?.value}
                    onChange={(event: any) => onChangeHandler(event)}
                  />
                </Grid>
              </Box>
            )} */}
            <Box mt={3}>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  alignContent={"center"}
                  justifyContent={"center"}
                  gap={3}
                  pb={3}
                >
                  <CustomButton
                    label="Cancel"
                    onClick={() => {
                      props.setEditCompetitiveModal(false);
                    }}
                    customClasses={{ width: "110px" }}
                    buttonType={"outlined"}
                  />
                  <CustomButton
                    label="Next"
                    onClick={() => props.nextStep()}
                    customClasses={{ width: "110px" }}
                    buttonType={"contained"}
                  />
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default RfpinformartionScreen;
