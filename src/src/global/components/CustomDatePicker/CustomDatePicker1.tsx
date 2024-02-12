import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import customDatePickerStyle from "./CustomDatePicker.styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { pureWhiteColor } from "utils/styles";

interface CustomDatePickerTypes {
  dateRange: any;
  handleDaterangeChange: Function;
  customWidth?: any;
  isFromMetaData?: boolean;
  fromDate?: any;
  toDate?: any;
  lableSecond?: any;
  lableSecondClass?: any;
  gridScreenValue?: any;
}

const CustomDatePicker1 = (props: CustomDatePickerTypes) => {
  const classes = customDatePickerStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  return (
    <>
      <Grid
        item
        sm={props?.gridScreenValue ? 12 : 9}
        xs={props?.gridScreenValue ? 12 : 9}
        md={9}
        lg={9}
        xl={9}
        style={{
          background: !bgcolor ? pureWhiteColor : "#282945",
          border: "1px solid #7A81FD",
          borderRadius: "34px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={
              props?.dateRange?.toDate &&
              moment(props?.dateRange?.toDate).isValid()
                ? props.dateRange.toDate
                : null
            }
            minDate={new Date(props.dateRange.fromDate)}
            openTo="year"
            views={["year", "month"]}
            onChange={(newValue) => {
              props.handleDaterangeChange(newValue, props.toDate);
            }}
            renderInput={(params: any) => (
              <TextField
                style={{ width: "100%" }}
                sx={
                  props.isFromMetaData
                    ? classes.datePickerAdditionalInfo
                    : !bgcolor
                    ? classes.datePicker1Light
                    : classes.datePicker1
                }
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "Enter end date",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
};
export default CustomDatePicker1;
