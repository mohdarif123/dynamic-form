import React from "react";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import customButtonStyles from "./CustomButton.styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { pureWhiteColor } from "utils/styles";

type Props = {
  label?: string | JSX.Element;
  onClick: any;
  loading?: boolean;
  customClasses?: any;
  icon?: JSX.Element;
  disabled?: boolean;
  buttonType?: string;
};

const CustomButton: React.FC<Props> = ({
  label,
  onClick,
  customClasses,
  disabled,
  icon,
  loading,
  buttonType,
}) => {
  const classes = customButtonStyles;
  const appliedClass = customClasses;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const processing = loading ? loading : false;
  const btnDisabled = disabled ? disabled : false;

  const getCustomCss = () => {
    switch (buttonType) {
      case "outlined":
        return classes.outlinedBtn;
      case "contained":
        return classes.containedBtn;
      default:
        return {};
    }
  };

  const switchButtonType = getCustomCss();
  const appliedClasses = {
    ...classes.btnStyle,
    ...switchButtonType,
    ...(customClasses ?? {}),
  };
  const outline = {
    background: !bgcolor ? pureWhiteColor : "#373854",
    color: !bgcolor ? "#373854" : pureWhiteColor,
    border: !bgcolor ? "1px solid #7A81FD" : "1.5px solid #7A81FD",
  };

  const contained = {
    background: !bgcolor ? "#7A81FD" : "#7A81FD",
    color: !bgcolor ? pureWhiteColor : pureWhiteColor,
  };
  return (
    <Button
      startIcon={icon}
      style={buttonType === "outlined" ? outline : contained}
      sx={[appliedClasses]}
      onClick={(event: any) => onClick(event)}
      disabled={processing || disabled}
    >
      {processing ? (
        <CircularProgress sx={classes.loadingStyle} />
      ) : (
        <Typography variant="h5" sx={classes.buttonTextStyle}>
          {label}
        </Typography>
      )}
    </Button>
  );
};

export default CustomButton;
