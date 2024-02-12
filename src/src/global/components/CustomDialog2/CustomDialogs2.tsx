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
import { appColor, customScrollCssInner } from "utils/styles";
import clsx from "clsx";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import customDialogStyles2 from "./CustomDialogs2.styles";

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
  dialogHeaderContentClass?: any;
  editproposal?: any;
  addCompetitiveColor?: any;
  bodyBackgroundColor?: boolean;
};
const CustomDialogs2: React.FC<Props> = ({
  isDialogOpen,
  addCompetitiveColor,
  bodyBackgroundColor,
  borderRadius,
  children,
  closable,
  closeButtonVisibility,
  dialogBodyClass,
  dialogBodyContent,
  dialogFooterClass,
  dialogFooterContent,
  dialogHeaderContent,
  dialogHeaderContentClass,
  dialogTitleContent,
  editproposal,
  fullScreen,
  handleDialogClose,
  width,
}) => {
  const classes = customDialogStyles2();
  const CustomWidth = width ? width : "60%";
  const bgcolor = useAppSelector(selectBackgroundColor);
  const radius = borderRadius ? borderRadius : borderRadius;

  const customStyles = makeStyles((theme: Theme) => ({
    dialogWidth: {
      width: CustomWidth,
      maxWidth: "none",
      borderRadius: radius,
      padding: "0px",
      backgroundColor: !addCompetitiveColor
        ? !bgcolor
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
            <Box>{dialogHeaderContent}</Box>
          )}
          {closable && handleDialogClose !== undefined && (
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
        </Box>
      )
    );
  };

  const getDialogTitle = () => {
    return (
      dialogTitleContent !== undefined && (
        <DialogTitle
          id="customized-dialog-title"
          className={!bgcolor ? classes.dialogTitle : classes.dialogTitle1}
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
      <DialogContent
        className={
          dialogBodyClass !== undefined
            ? clsx(classes.dialogContent, dialogBodyClass)
            : !addCompetitiveColor
            ? !bgcolor
              ? classes.dialogContent
              : classes.dialogContent1
            : !bgcolor
            ? classes.dialogContentAddCompetitive
            : classes.dialogContent1AddCompetitive
        }
        sx={{
          background: bodyBackgroundColor && !bgcolor ? "white" : "373854",
          ...customScrollCssInner,
        }}
      >
        {dialogBodyContent}
      </DialogContent>
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

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      classes={{
        paper: customClasses.dialogWidth,
      }}
    >
      {getDialogHeader()}
      {getDialogTitle()}
      {editproposal ? getDialogBodyProposal() : getDialogBody()}
      {getDialogFooter()}
    </Dialog>
  );
};

export default CustomDialogs2;
