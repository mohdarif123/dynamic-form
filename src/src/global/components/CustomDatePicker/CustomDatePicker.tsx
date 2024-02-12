import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import customDatePickerStyle from "./CustomDatePicker.styles";
import Arrow_Right_Black from "../../../assets/icons/Vector.svg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { errorStyling, primaryBlackColor, pureWhiteColor } from "utils/styles";

type Props = {
  dateRange: any;
  disablePast?: any;
  handleDaterangeChange: Function;
  customWidth?: any;
  isFromMetaData?: boolean;
  fromDate?: any;
  toDate?: any;
  labelFirst?: any;
  labelSecond?: any;
  labelFirstRequired?: any;
  labelSecondRequired?: any;
  placeholderstart?: any;
  placeholderend?: any;
  disableFuture?: any;
  errorFirst?: any;
  errorSecond?: any;
  lableFirstClass?: any;
  lableSecondClass?: any;
  labelWidth?: any;
  readonly?: any;
};
const CustomDatePicker: React.FC<Props> = ({
  dateRange,
  handleDaterangeChange,
  customWidth,
  disableFuture,
  disablePast,
  errorFirst,
  errorSecond,
  fromDate,
  isFromMetaData,
  labelFirst,
  labelFirstRequired,
  labelSecond,
  labelSecondRequired,
  labelWidth,
  lableFirstClass,
  lableSecondClass,
  placeholderend,
  placeholderstart,
  readonly,
  toDate,
}) => {
  const classes = customDatePickerStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  return (
    <>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        {(labelFirst || labelSecond) && (
          <Box
            sx={{
              display: "flex",
              mb: 0.5,
              ml: 1,
            }}
          >
            {labelFirst && (
              <>
                <Box display={"flex"} width={labelWidth}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                    }}
                  >
                    {labelFirst}
                  </Typography>
                  {labelFirstRequired && <Box sx={classes.star}>*</Box>}
                </Box>
              </>
            )}

            {labelSecond && (
              <Typography
                variant="h5"
                sx={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
              >
                {labelSecond}
              </Typography>
            )}
            {labelSecondRequired && <Box sx={classes.star}>*</Box>}
          </Box>
        )}

        <Grid
          container
          display={"flex"}
          p={isFromMetaData ? 0 : 0}
          width={customWidth}
          style={{
            background: !bgcolor ? pureWhiteColor : "#282945",
            border: "1px solid #7A81FD",
            borderRadius: "34px",
          }}
        >
          <Grid item sm={5.3} xs={5.1} md={5.6} lg={5.6} xl={5.6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={
                  dateRange?.fromDate && moment(dateRange?.fromDate).isValid()
                    ? moment(dateRange.fromDate)
                    : null
                }
                disableFuture={disableFuture ? true : false}
                onChange={(newValue) =>
                  handleDaterangeChange(newValue, fromDate)
                }
                renderInput={(params: any) => (
                  <TextField
                    style={{
                      width: "100%",
                    }}
                    sx={
                      isFromMetaData
                        ? classes.datePickerAdditionalInfo
                        : !bgcolor
                        ? classes.datePicker1Light
                        : classes.datePicker1
                    }
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: placeholderstart,
                      readOnly: readonly ? true : false,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <img
            src={Arrow_Right_Black}
            alt="Arrow_Right_Black"
            style={{ justifyContent: "center", display: "flex", width: "13px" }}
          />
          <Grid item sm={5.3} xs={5.1} md={5.6} lg={5.6} xl={5.6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={
                  dateRange?.toDate && moment(dateRange?.toDate).isValid()
                    ? dateRange.toDate
                    : null
                }
                minDate={new Date(dateRange.fromDate)}
                onChange={(newValue) => {
                  handleDaterangeChange(newValue, toDate);
                }}
                disablePast={disablePast ? true : false}
                renderInput={(params: any) => (
                  <TextField
                    style={{ width: "100%" }}
                    sx={
                      isFromMetaData
                        ? classes.datePickerAdditionalInfo
                        : !bgcolor
                        ? classes.datePicker2Light
                        : classes.datePicker2
                    }
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: placeholderend,
                      readOnly: readonly ? true : false,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        {(errorFirst || errorSecond) && (
          <Box
            sx={{
              display: "flex",
              mb: 0.5,
              ml: 1,
            }}
          >
            {(!dateRange.issueDate ||
              dateRange.issueDate == "Invalid date" ||
              !moment(dateRange.issueDate, "DD/MM/YYYY").isValid()) && (
              <FormHelperText error sx={{ width: labelWidth, ...errorStyling }}>
                {errorFirst}
              </FormHelperText>
            )}
            {(!dateRange.expiryDate ||
              dateRange.expiryDate == "Invalid date" ||
              !moment(dateRange.expiryDate, "DD/MM/YYYY").isValid()) && (
              <FormHelperText
                error
                sx={{
                  marginLeft:
                    dateRange.issueDate && dateRange.issueDate != "Invalid date"
                      ? labelWidth
                      : "",
                  ...errorStyling,
                }}
              >
                {errorSecond}
              </FormHelperText>
            )}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default CustomDatePicker;
