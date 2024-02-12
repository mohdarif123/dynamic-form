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
import customDialogStyles from "./CustomDialog.styles";
import { appColor, customScrollCssInner, theme } from "utils/styles";
import clsx from "clsx";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";

type Props = {
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
  dialogHeaderWidth?: any;
  dialogHeaderContentClass?: any;
  editproposal?: any;
  addCompetitiveColor?: any;
  bodyBackgroundColor?: boolean;
  comparisonBodyColor?: boolean;
  closeIcon?: any;
  cancelIcon?: boolean;
  outSideCloseHide?: boolean;
  hideBgColor?: boolean;
  cancelIconColor?: boolean;
  titleContentBgColor?: any;
  dialogBodyContentPadding?: boolean;
};

const CustomDialog: React.FC<Props> = ({
  isDialogOpen,
  addCompetitiveColor,
  bodyBackgroundColor,
  borderRadius,
  cancelIcon,
  children,
  closable,
  closeButtonVisibility,
  closeIcon,
  dialogBodyClass,
  dialogBodyContent,
  comparisonBodyColor,
  dialogFooterClass,
  dialogFooterContent,
  dialogHeaderContent,
  dialogHeaderWidth,
  dialogHeaderContentClass,
  dialogTitleContent,
  editproposal,
  fullScreen,
  handleDialogClose,
  outSideCloseHide,
  width,
  hideBgColor,
  cancelIconColor,
  titleContentBgColor,
  dialogBodyContentPadding,
}) => {
  const classes = customDialogStyles();
  const CustomWidth = width ? width : "60%";
  const bgcolor = useAppSelector(selectBackgroundColor);
  const radius = borderRadius ? borderRadius : borderRadius;

  const customStyles = makeStyles((theme: Theme) => ({
    dialogWidth: {
      width: CustomWidth,
      maxWidth: "none",
      borderRadius: radius,
      padding: "0px",
      ...customScrollCssInner,
      backgroundColor: !addCompetitiveColor
        ? hideBgColor
          ? "#282844"
          : !bgcolor
          ? "#ffffff"
          : "#282844"
        : appColor,
    },
  }));
  const customClasses = customStyles();

  const getDialogHeader = () => {
    return (
      dialogHeaderContent !== undefined && (
        <Box
          className={
            dialogHeaderContentClass
              ? bgcolor
                ? classes.headerStyle1
                : classes.headerStyle12
              : classes.headerStyle
          }
        >
          {dialogHeaderContent !== undefined && (
            <Box sx={dialogHeaderWidth && { width: "100%" }}>
              {dialogHeaderContent}
            </Box>
          )}
          {closable && handleDialogClose !== undefined && (
            <Box
              className={classes.closeButtonContainer}
              onClick={handleDialogClose}
            >
              {closeButtonVisibility ? (
                <IconButton
                  aria-label="close"
                  className={
                    cancelIconColor
                      ? classes.cancelIconColor
                      : !bgcolor
                      ? classes.closeIcon
                      : classes.closeButton
                  }
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          )}
        </Box>
      )
    );
  };

  const getDialogTitle = () => {
    return (
      dialogTitleContent !== undefined && (
        <DialogTitle
          id="customized-dialog-title"
          className={
            !bgcolor
              ? titleContentBgColor
                ? classes.dialogTitleWhite
                : classes.dialogTitle
              : classes.dialogTitle1
          }
        >
          <Box className={classes.displayFlex}>
            {dialogTitleContent !== undefined && (
              <Box style={{ width: "100%" }}>{dialogTitleContent}</Box>
            )}
          </Box>
        </DialogTitle>
      )
    );
  };
  const getDialogBody = () => {
    return (
      <>
        {closeIcon && (
          <Box
            className={classes.closeButtonContainer}
            onClick={handleDialogClose}
          >
            <IconButton
              aria-label="close"
              className={!bgcolor ? classes.closeIcon : classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <DialogContent
          className={
            dialogBodyClass !== undefined
              ? clsx(classes.dialogContent, dialogBodyClass)
              : !addCompetitiveColor
              ? !bgcolor
                ? classes.dialogContent
                : classes.dialogContent1
              : !bgcolor
              ? comparisonBodyColor
                ? classes.dialogContentAddCompetitive1
                : classes.dialogContentAddCompetitive
              : classes.dialogContent1AddCompetitive
          }
          sx={{
            background: bodyBackgroundColor && !bgcolor ? "white" : "#373854",
            ...customScrollCssInner,
            padding: dialogBodyContentPadding
              ? "0 13px !important"
              : theme.spacing(2),
          }}
        >
          {dialogBodyContent}
        </DialogContent>
      </>
    );
  };
  const getDialogBodyProposal = () => {
    return (
      <DialogContent
        className={
          dialogBodyClass !== undefined
            ? clsx(classes.dialogContentProposal, dialogBodyClass)
            : !bgcolor
            ? classes.dialogContentProposal
            : classes.dialogContent1Proposal
        }
        sx={{ ...customScrollCssInner }}
      >
        {dialogBodyContent}
      </DialogContent>
    );
  };
  const getDialogFooter = () => {
    return (
      dialogFooterContent !== undefined && (
        <DialogActions
          className={
            dialogFooterClass
              ? !bgcolor
                ? classes.dialogActionsAttribute
                : classes.dialogActions1Attribute
              : !bgcolor
              ? classes.dialogActions
              : classes.dialogActions1
          }
        >
          {dialogFooterContent}
        </DialogActions>
      )
    );
  };

  const getCancelIcon = () => {
    return (
      <>
        {closable && handleDialogClose !== undefined && cancelIcon && (
          <Box
            className={classes.closeButtonContainer}
            onClick={handleDialogClose}
          >
            {closeButtonVisibility ? (
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
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={!outSideCloseHide && handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      classes={{
        paper: customClasses.dialogWidth,
      }}
    >
      {getCancelIcon()}
      {getDialogHeader()}
      {getDialogTitle()}
      {editproposal ? getDialogBodyProposal() : getDialogBody()}
      {getDialogFooter()}
    </Dialog>
  );
};

export default CustomDialog;
