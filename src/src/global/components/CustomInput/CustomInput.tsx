import { Box, InputLabel, SxProps, TextField, Typography } from "@mui/material";
import customInputStyles from "./CustomInput.styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { PasswordStrengthIndicator } from "../PasswordMeter/PasswordMeter";

type Props = {
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: any;
  type?: string;
  name?: string;
  select?: boolean;
  onKeyPress?: any;
  InputProps?: any;
  error?: any;
  required?: boolean;
  InputLabelProps?: any;
  id?: string;
  sx?: SxProps;
  disabled?: boolean;
  propsToInputElement?: any;
  helperText?: string;
  customInputClasses?: any;
  customClasses?: any;
  onInput?: any;
  dateIconColor?: any;
  autoComplete?: string;
  isPasswordVisible?: boolean;
};

const CustomInput: React.FC<Props> = ({
  InputLabelProps,
  InputProps,
  children,
  customClasses,
  customInputClasses,
  dateIconColor,
  disabled,
  error,
  helperText,
  id,
  label,
  name,
  onChange,
  onInput,
  onKeyPress,
  placeHolder,
  propsToInputElement,
  required,
  select,
  sx,
  type,
  value,
  autoComplete,
  isPasswordVisible,
}) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = customInputStyles;

  return (
    <Box>
      <Box>
        <InputLabel
          required={required}
          sx={
            customClasses
              ? [classes.nameField, customClasses]
              : bgcolor
              ? classes.nameField
              : classes.nameField1
          }
        >
          <Typography variant="h6">{label}</Typography>
        </InputLabel>
      </Box>
      <TextField
        sx={
          customInputClasses
            ? [
                !bgcolor ? classes.textFieldLight : classes.textField,
                customInputClasses,
              ]
            : !bgcolor
            ? classes.textFieldLight
            : classes.textField
        }
        variant="outlined"
        id={id}
        className={dateIconColor ? dateIconColor : ""}
        placeholder={placeHolder}
        type={type}
        name={name}
        select={select}
        value={value}
        autoComplete={autoComplete ? autoComplete : ""}
        InputProps={InputProps}
        inputProps={propsToInputElement}
        onChange={onChange}
        onKeyPress={onKeyPress}
        required={required}
        {...(error && { error: true, helperText: error })}
        disabled={disabled}
        helperText={helperText}
        onInput={onInput}
      />
      {/* {error && <span style={classes.errorStyle}>{error}</span>} */}
      {isPasswordVisible && <PasswordStrengthIndicator password={value} />}
    </Box>
  );
};

export default CustomInput;
