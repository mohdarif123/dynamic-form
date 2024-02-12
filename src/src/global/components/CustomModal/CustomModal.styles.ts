import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ModelHeader, primaryBlackColor, pureWhiteColor } from "utils/styles";

const customDialogStyles = makeStyles((theme: Theme) => ({
  headerStyle: {
    background: ModelHeader,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: "15px 30px",
  },
  closeIcon: {
    color: primaryBlackColor,
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282844",
  },
  dialogTitle1: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  closeButtonContainer: {
    position: "absolute",
    right: "15px",
    color: theme.palette.grey[500],
  },
  closeButton: {
    padding: 0,
    marginTop: "9px",
    marginRight: "5px",
    color: pureWhiteColor,
  },
  dialogContent: {
    padding: theme.spacing(2),
    backgroundColor: "#282844",
  },
  dialogContent1: {
    padding: theme.spacing(2),
    backgroundColor: "#ffffff",
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1, 2),
    display: "flex",
    alignSelf: "center",
    width: "93%",
    backgroundColor: "#373854",
  },
  dialogActions1: {
    margin: 0,
    padding: theme.spacing(1, 2),
    display: "flex",
    alignSelf: "center",
    width: "93%",
    backgroundColor: "#ffffff",
  },
  dialogActionsClass: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#373854",
  },
  dialogActions1Class: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  displayFlex: {
    display: "flex",
  },
}));

export default customDialogStyles;
