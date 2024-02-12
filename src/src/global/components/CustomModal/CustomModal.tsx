import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import customDialogStyles from "./CustomModal.styles";
import { borderRadius, customScrollCssInner } from "utils/styles";
import clsx from "clsx";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

interface CustomProps {
  handleDialogClose?: any;
  closable?: boolean;
  width?: string;
  isDialogOpen: boolean;
  dialogTitleContent?: JSX.Element;
  dialogBodyContent?: JSX.Element;
  dialogFooterContent?: JSX.Element;
  dialogFooterClass?: any;
  dialogBodyClass?: any;
  closeButtonVisibility?: boolean;
  fullScreen?: boolean;
  borderRadius?: string;
  dialogHeaderContent?: JSX.Element;
  dialogHeaderContentClass?: any;
  hideBgColor?: boolean;
  showCancelIconWhenNoHeader?: boolean;
}

const CustomDialog = (props: CustomProps) => {
  const classes = customDialogStyles();
  const bgcolor = useAppSelector(selectBackgroundColor);
  const width = props.width ? props.width : "60%";
  const radius = props.borderRadius ? props.borderRadius : borderRadius;

  const customStyles = makeStyles((theme: Theme) => ({
    dialogWidth: {
      width: width,
      maxWidth: "none",
      borderRadius: radius,
      backgroundColor: props?.hideBgColor
        ? "#282844"
        : bgcolor
        ? "#282844"
        : "#ffffff",
      ...customScrollCssInner,
    },
  }));
  const customClasses = customStyles();

  const getDialogHeader = () => {
    return (
      props.dialogHeaderContent !== undefined && (
        <Box className={classes.headerStyle}>
          {props?.dialogHeaderContent !== undefined && (
            <Box>{props?.dialogHeaderContent}</Box>
          )}
          {props.closable && props.handleDialogClose !== undefined && (
            <Box
              className={classes.closeButtonContainer}
              onClick={props.handleDialogClose}
            >
              {props.closeButtonVisibility ? (
                <IconButton aria-label="close" className={classes.closeButton}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          )}
        </Box>
      )
    );
  };

  const getCancelIcon = () => {
    return (
      <>
        {props?.closable &&
          props.handleDialogClose !== undefined &&
          props?.showCancelIconWhenNoHeader && (
            <Box
              className={classes.closeButtonContainer}
              onClick={props.handleDialogClose}
            >
              {props.closeButtonVisibility ? (
                <IconButton
                  aria-label="close"
                  className={!bgcolor ? classes.closeIcon : classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          )}
      </>
    );
  };

  const getDialogTitle = () => {
    return (
      props.dialogTitleContent !== undefined && (
        <DialogTitle
          id="customized-dialog-title"
          className={bgcolor ? classes.dialogTitle : classes.dialogTitle1}
        >
          <Box className={classes.displayFlex}>
            {props.dialogTitleContent !== undefined && (
              <Box style={{ width: "100%" }}>{props.dialogTitleContent}</Box>
            )}
          </Box>
        </DialogTitle>
      )
    );
  };

  const getDialogBody = () => {
    return (
      <DialogContent
        className={
          props.dialogBodyClass !== undefined
            ? clsx(classes.dialogContent, props.dialogBodyClass)
            : bgcolor
            ? classes.dialogContent
            : classes.dialogContent1
        }
      >
        {props.dialogBodyContent}
      </DialogContent>
    );
  };
  const getDialogFooter = () => {
    return (
      props.dialogFooterContent !== undefined && (
        <DialogActions
          className={
            props.dialogFooterClass !== undefined
              ? bgcolor
                ? classes.dialogActionsClass
                : classes.dialogActions1Class
              : bgcolor
              ? classes.dialogActions
              : classes.dialogActions1
          }
        >
          {props.dialogFooterContent}
        </DialogActions>
      )
    );
  };

  return (
    <Dialog
      fullScreen={props.fullScreen}
      onClose={props.handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={props.isDialogOpen}
      classes={{
        paper: customClasses.dialogWidth,
      }}
    >
      {getDialogHeader()}
      {getCancelIcon()}
      {getDialogTitle()}
      {getDialogBody()}
      {getDialogFooter()}
    </Dialog>
  );
};

export default CustomDialog;
