import { boldFont } from "utils/styles";

const appHeaderStyles = {
  appHeaderTitle: {
    ...boldFont,
  },
  menuMobile: {
    width: "100vw",
  },
  logoBox: {
    display: "flex",
    cursor: "pointer",
    height: "50px",
    width: "60px",
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: "15px",
    cursor: "pointer",
  },
  logOutWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
    padding: "15px",
  },
} as const;

export default appHeaderStyles;
