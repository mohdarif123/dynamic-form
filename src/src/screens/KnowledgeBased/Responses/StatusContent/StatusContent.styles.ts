const StatusContentStyle = {
  textWrapper: {
    padding: "15px 12px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    gap: 2,
    borderRadius: "8px 8px 0 0px",
  },
  testStyle: {
    fontWeight: "600",
  },
  cardText: {
    fontWeight: 600,
    lineHeight: "32px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  nameField: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 400,
    display: "flex",
    marginBottom: "10px",
  },
  cardMainWrapper: {
    // backgroundColor: "#373854",
    borderRadius: "20px",
  },
} as const;
export default StatusContentStyle;
