export const ModalStyle = {
  WrapperStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
  },
  contentAreaWrapper: {
    overflowY: "auto",
    flexGrow: 1,
    minHeight: "50vh",
  },
  headerStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  headingStyle: {
    color: "#000",
  },
  footerWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    mt: 3,
    gap: 2,
  },
} as const;
