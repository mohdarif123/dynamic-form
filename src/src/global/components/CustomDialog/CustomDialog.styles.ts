import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ModelHeader, appColor, pureWhiteColor } from "utils/styles";

const customDialogStyles = makeStyles((theme: Theme) => ({
  headerStyle: {
    background: ModelHeader,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: "15px 30px",
  },
  cancelIconColor: {
    color: pureWhiteColor,
  },
  headerStyle1: {
    background: appColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    textAlign: "center",
    padding: "15px 30px",
  },
  headerStyle12: {
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    textAlign: "center",
    padding: "15px 30px",
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282844",
  },
  dialogTitleWhite: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: pureWhiteColor,
  },
  dialogTitle1: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282844",
  },
  closeIcon: {
    color: "#000",
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
    // padding: 0,
    backgroundColor: "#ffffff",
  },
  dialogContent1: {
    padding: theme.spacing(2),
    // padding: 0,
    backgroundColor: "#282844",
  },
  dialogContentAddCompetitive: {
    padding: theme.spacing(2),
    // padding: 0,
    backgroundColor: "#ffffff",
  },
  dialogContentAddCompetitive1: {
    padding: theme.spacing(2),
    // padding: 0,
    backgroundColor: "rgba(247, 247, 253, 1)",
  },
  dialogContent1AddCompetitive: {
    padding: theme.spacing(2),
    // padding: 0,
    backgroundColor: appColor,
  },
  dialogContentProposal: {
    // padding: theme.spacing(2),
    padding: 0,
    backgroundColor: "#ffffff",
  },
  dialogContent1Proposal: {
    // padding: theme.spacing(2),
    padding: 0,
    backgroundColor: "#282844",
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1, 2),
    display: "flex",
    alignSelf: "center",
    // backgroundColor: "#373854",
  },
  dialogActions1: {
    margin: 0,
    padding: theme.spacing(1, 2),
    display: "flex",
    alignSelf: "center",
    // backgroundColor: "#ffffff",
  },
  dialogActionsAttribute: {
    margin: 0,
    display: "flex",
    alignSelf: "center",
    // backgroundColor: "#373854",
    "& .css-hlj6pa-MuiDialogActions-root": {
      padding: 0,
    },
    width: "100%",
    padding: 0,
    backgroundColor: "#ffffff",
  },
  dialogActions1Attribute: {
    margin: 0,
    display: "flex",
    alignSelf: "center",
    "& .css-hlj6pa-MuiDialogActions-root": {
      padding: 0,
    },
    width: "100%",
    padding: 0,
    backgroundColor: "#373854",
    // backgroundColor: "#ffffff",
  },
  displayFlex: {
    display: "flex",
  },
}));

export default customDialogStyles;
