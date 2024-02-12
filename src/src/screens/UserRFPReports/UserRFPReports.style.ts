import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  regularFont,
  skyPrimaryColor,
} from "utils/styles";

const UserRFPReportsStyle = {
  inputLabel: {
    fontWeight: 500,
    display: "flex",
    color: "rgba(0, 0, 0, 0.85)",
  },
  buttonWrapper: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
  buttonStyle: {
    width: "110px",
    [`@media screen and (max-width: ${324}px)`]: {
      width: "190px",
    },
  },
  titleStyle: {
    color: skyPrimaryColor,
  },
  tableStyle: {
    minWidth: "300px",
    width: "100%",
    overflow: "hidden",
  },
  headertableStyle: {
    color: skyPrimaryColor,
    ...boldFont,
    fontSize: getRelativeFontSize(8),
  },
  modalTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(6),
    textAlign: "center",
  },
  labelText: {
    color: "#ffffff",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
  CustomRequired: {
    color: inputLabelRequiredColor,
    ...regularFont,
    marginRight: "12px",
    fontSize: "12px",
  },
  labelText1: {
    color: "#000000",
    fontWeight: 500,
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },

  headertableStylesky: {
    color: "#7A81FD",
    ...boldFont,
    display: "flex",
    justifyContent: "center",
    fontSize: getRelativeFontSize(2),
    cursor: "pointer",
  },
} as const;
export default UserRFPReportsStyle;
