import {
  BaseTextFieldProps,
  Box,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import {
  CountryIso2,
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import {
  inputLabelRequiredColor,
  lightDropDownColor,
  primaryBlackColor,
  pureWhiteColor,
  sidebarColor,
} from "utils/styles";
import customContactNumberStyles from "./CustomContactInput.style";

export interface MUIPhoneProps extends BaseTextFieldProps {
  label?: string;
  value: string;
  placeHolder?: string;
  error?: any;
  name?: any;
  customSxSelectClasses?: any;
  customInputTextFieldClasses?: any;
  onChange: (phone: string) => void;
  menuPropsStyling?: boolean;
  textfieldDisabled?: boolean;
  selectDisabled?: boolean;
  id?: any;
}

const CustomContactInput: React.FC<MUIPhoneProps> = ({
  label,
  value,
  placeHolder,
  error,
  onChange,
  required,
  name,
  customSxSelectClasses,
  menuPropsStyling,
  customInputTextFieldClasses,
  textfieldDisabled,
  selectDisabled,
  id,
  ...restProps
}) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = customContactNumberStyles;

  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "us",
      value,
      countries: defaultCountries,
      onChange: (data: any) => {
        onChange(data.phone);
      },
    });

  return (
    <>
      <>
        <InputLabel sx={classes.nameField}>
          <Typography
            variant="h6"
            sx={{
              ...classes.inputLabel,
              color: menuPropsStyling
                ? pureWhiteColor
                : !bgcolor
                ? primaryBlackColor
                : pureWhiteColor,
            }}
          >
            {label}
          </Typography>

          {(required ?? false) && (
            <Box
              ml={0.4}
              sx={{
                color: inputLabelRequiredColor,
              }}
            >
              *
            </Box>
          )}
        </InputLabel>
        <TextField
          sx={
            menuPropsStyling
              ? [classes.textFieldStyle,customInputTextFieldClasses]
              : customInputTextFieldClasses
              ? [
                  !bgcolor ? classes.textFieldLight : classes.textFieldStyle,
                  customInputTextFieldClasses,
                ]
              : !bgcolor
              ? classes.textFieldLight
              : classes.textFieldStyle
          }
          name={name}
          disabled={textfieldDisabled}
          variant="outlined"
          value={phone}
          id={id}
          placeholder={placeHolder}
          onChange={handlePhoneValueChange}
          type="tel"
          inputRef={inputRef}
          {...(error && { error: true, helperText: error })}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{
                  marginRight: "2px",
                  marginLeft: "-10px",
                  marginTop: "8px",
                }}
              >
                <Select
                  disabled={selectDisabled}
                  sx={
                    customSxSelectClasses
                      ? [
                          !bgcolor
                            ? classes.dropDownLightStyle
                            : classes.dropDownStyling,
                          customSxSelectClasses,
                        ]
                      : !bgcolor
                      ? classes.dropDownLightStyle
                      : classes.dropDownStyling
                  }
                  MenuProps={{
                    style: {
                      height: "300px",
                      width: "360px",
                      left: "-34px",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    PaperProps: menuPropsStyling
                      ? {
                          sx: {
                            "& .MuiMenuItem-root.Mui-selected": {
                              backgroundColor: "#7A81FD",
                              borderRadius: "25px !important",
                            },
                            "& .MuiMenuItem-root:hover": {
                              backgroundColor: "#7A81FD",
                              borderRadius: "25px !important",
                              color: pureWhiteColor
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: "#7A81FD",
                              color: pureWhiteColor
                            },
                            width: "250px",
                            borderRadius: "25px",
                            backgroundColor: sidebarColor,
                            "::-webkit-scrollbar": {
                              display: "none",
                            },
                            MenuListProps: {
                              sx: {
                                backgroundColor: "red",
                                borderRadius: "34px",
                              },
                            },
                          },
                        }
                      : {
                          sx: {
                            "& .MuiMenuItem-root.Mui-selected": {
                              backgroundColor: !bgcolor
                                ? lightDropDownColor
                                : sidebarColor,
                            },
                            "& .MuiMenuItem-root:hover": {
                              backgroundColor: !bgcolor ? "#7A81FD" : "#7A81FD",
                              borderRadius: "25px !important",
                              color: pureWhiteColor
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: !bgcolor
                                ? "#7A81FD"
                                : sidebarColor,
                              color: pureWhiteColor
                            },
                            width: "250px",
                            borderRadius: "25px",
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
                  }}
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryIso2)}
                  renderValue={(value) => <FlagEmoji iso2={value} />}
                >
                  {defaultCountries.map((c) => {
                    const country = parseCountry(c);
                    return (
                      <MenuItem
                        key={country.iso2}
                        value={country.iso2}
                        sx={{
                          color: !bgcolor ? "black" : "white",
                          backgroundColor: menuPropsStyling
                            ? sidebarColor
                            : !bgcolor
                            ? lightDropDownColor
                            : sidebarColor,
                        }}
                      >
                        <FlagEmoji
                          iso2={country.iso2}
                          style={{
                            marginRight: "8px",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                        <Typography
                          marginRight="8px"
                          sx={{
                            color: menuPropsStyling
                              ? pureWhiteColor
                              : !bgcolor
                              ? primaryBlackColor
                              : pureWhiteColor,
                          }}
                          variant="h5"
                        >
                          {country.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: menuPropsStyling
                              ? pureWhiteColor
                              : !bgcolor
                              ? primaryBlackColor
                              : pureWhiteColor,
                          }}
                          variant="h5"
                        >
                          +{country.dialCode}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </InputAdornment>
            ),
          }}
          {...restProps}
        />
      </>
    </>
  );
};

export default React.memo(CustomContactInput);
