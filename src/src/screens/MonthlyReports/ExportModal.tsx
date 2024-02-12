import { CustomButton, CustomDialogs2, CustomInput } from "global/components";
import ExportDataIcon from "assets/icons/exportData.svg";
import { Box, Stack } from "@mui/system";
import {
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useState } from "react";
import { isTruthy, openWarningNotification } from "helpers/methods";
import { exportDataInitial, exportValidation } from "./MonthlyReports.Data";
import MonthlyReportsStyle from "./MonthlyReports.style";
import {
  dropDownDarkForSx,
  dropDownLightForSx,
  errorStyling,
  meneItemDarkStyle,
  meneItemLightStyle,
  menuPropsDarkStyle,
  menuPropsLightStyle,
  renderValueDarkStyle,
  renderValueLightStyle,
  selectBgDark,
  selectBgLight,
} from "utils/styles";
import notifiers from "global/constants/NotificationConstants";
import { getExport } from "./MonthlyReports.services";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import _, { isEmpty } from "lodash";
import { getCustomError } from "utils/customError";

interface customProps {
  setExportModal: Function;
  exportModal: boolean;
  region?: any;
  month?: any;
  year?: any;
  displaytable?: any;
}
const dropdownValue = [
  {
    value: "Excel Sheet",
    name: "Excel Sheet",
  },
];
const ExportModal = (props: customProps) => {
  const classes = MonthlyReportsStyle;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [dropdown, setdropdown] = useState<any>("");
  const [dropdownError, setDropDownError] = useState<any>("");
  const [fileName, setFileName] = useState<any>(exportDataInitial);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const handleClose = () => {
    props.setExportModal!(false);
    setFileName({ fileName: { value: "" } });
    setdropdown("");
    setDropDownError("");
  };
  const handleOnchange = (event: any) => {
    setFileName({ value: event.target.value, error: "" });
  };

  const handleValidation = () => {
    const { isValid, errors }: { isValid: boolean; errors: any } =
      exportValidation(fileName);
    if (!dropdown) {
      setDropDownError("Please select file format");
      return false;
    }
    setFileName({ ...errors });
    return isValid;
  };
  const handleDropDownValidation = () => {
    if (!dropdown) {
      setDropDownError("Please select file format");
      return false;
    } else {
      setDropDownError("");
      return true;
    }
  };

  const getExportData = async () => {
    if (handleValidation() && handleDropDownValidation()) {
      if (!isEmpty(props.displaytable)) {
        try {
          setIsLoading(true);
          const res = await getExport(
            props.region,
            props.month,
            props.year,
            fileName.value
          );
          let file: any = document.createElement("a");
          file.style = "display:none";
          let url = window.URL.createObjectURL(res);
          file.href = url;
          file.download = fileName.value;
          file.click();
          // @ts-ignore
          window.URL.revokeObjectURL(url);
          file.remove();
          setdropdown("");
          setFileName({ fileName: { value: "" } });
          props.setExportModal(false);
          setDropDownError("");
          setIsLoading(false);
        } catch (error: any) {
          setdropdown("");
          setDropDownError("");
          setIsLoading(false);
          getCustomError(error);
        }
      } else {
        openWarningNotification(
          "There is no monthly RFP report data available for the export"
        );
        handleClose();
      }
    }
  };
  const getDialogBody = () => {
    return (
      <>
        <Box display={"grid"}>
          <Box mt={2}>
            <Grid container gap={1}>
              <Grid item xl={5.9} lg={5.9} md={5.9} sm={5.9} xs={12}>
                <CustomInput
                  required
                  id="solicitation"
                  label="File Name"
                  placeHolder="File name"
                  type="text"
                  name="fileName"
                  value={fileName.value}
                  onChange={handleOnchange}
                  error={!isTruthy(fileName.value) && fileName.error}
                />
                {!isTruthy(fileName.value) && fileName.error && (
                  <FormHelperText error sx={{ ...errorStyling }}>
                    {fileName.error}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xl={5.9} lg={5.9} md={5.9} sm={5.9} xs={12}>
                <Stack direction="column">
                  <InputLabel
                    style={bgcolor ? classes.labelText : classes.labelText1}
                    sx={classes.inputLabel}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: !bgcolor ? "black" : "white" }}
                    >
                      File Format
                    </Typography>
                    <Box component={"span"} sx={classes.CustomRequired}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    id="country"
                    name="country"
                    value={dropdown}
                    onChange={(e) => {
                      setdropdown(e.target.value);
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
                        {dropdown || "Select file format"}
                      </Typography>
                    )}
                    displayEmpty
                  >
                    {dropdownValue?.map((item: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={item.name}
                        sx={!bgcolor ? meneItemLightStyle : meneItemDarkStyle}
                      >
                        <Typography variant="subtitle1">
                          {" "}
                          {item.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {!dropdown && (
                    <FormHelperText error sx={{ ...errorStyling }}>
                      {dropdownError}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Box display={"flex"} justifyContent={"center"} mt={3}>
              <Box>
                <CustomButton
                  customClasses={{ width: "110px" }}
                  buttonType={"outlined"}
                  label="Cancel"
                  onClick={() => {
                    handleClose();
                  }}
                />
              </Box>
              <Box ml={3}>
                <CustomButton
                  label="Export"
                  onClick={() => {
                    getExportData();
                  }}
                  customClasses={{ width: "110px" }}
                  buttonType={"contained"}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        style={{ flexDirection: "column" }}
      >
        <img src={ExportDataIcon} alt="ExportDataIcon" />
        <Typography
          sx={{ color: !bgcolor ? "#000000" : "white" }}
          variant="h2"
          mt={3}
        >
          Export Data
        </Typography>
      </Box>
    );
  };

  const exportData = () => {
    return (
      <>
        <CustomDialogs2
          isDialogOpen={props.exportModal}
          dialogHeaderContent={dialogHeaderContent()}
          handleDialogClose={handleClose}
          dialogBodyContent={getDialogBody()}
          dialogHeaderContentClass={true}
          closable
          closeButtonVisibility={true}
          width="600px"
          borderRadius="33px"
          bodyBackgroundColor={true}
        />
        <CustomLoader isLoading={isLoading} />
      </>
    );
  };
  return exportData();
};
export default ExportModal;
