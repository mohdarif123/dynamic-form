import { theme } from "utils/styles";

const UsersStyle = {
  tasksTableStyle: {
    minWidth: "300px",
    width: "100%",
  },
  searchWrapperStyle: {
    width: {
      xl: "250px",
      lg: "200px",
      md: "270px",
      sm: "270px",
      xs: "270px",
    },
    [`@media screen and (max-width: ${320}px)`]: {
      width: "190px",
    },
  },
  headerStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    spacing: 2,
    gap: 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: "7px",
    },
  },
  buttonWrapper: {
    display: "flex",
    justifyContent:{ xl: "start", lg: "start", md: "start" },
    mb:1,
    [theme.breakpoints.down("lg")]: {
      mt: 0,
    },
  },
} as const;

export default UsersStyle;
