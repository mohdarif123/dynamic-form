const CustomDropzoneStyle = {
  dropzone: {
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    transition: "border-color 0.3s",
  },
  iconWrapperStyle: {
    borderColor: "#aaa",
    cursor: "pointer",
    height: "70px",
    width: "70px",
    borderRadius: "25px",
    background: "white",
    color: "#7A81FD",
    padding: "8px",
  },
  iconStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconStyle1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
  },
  customDropzoneWrapper: {
    width: "100%",
    minHeight: "110px",
    fontSize: "11px",
    borderRadius: "30px",
    background: "#F0ECFF",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  previewChip: {
    marginTop: 1,
    padding: "15px 0px",
    cursor: "pointer",
    justifyContent: "space-between",
  },
} as const;

export default CustomDropzoneStyle;
