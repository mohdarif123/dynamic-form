import { purplePrimaryColor } from "../../../utils/styles";
const paginationStyles = {
  pageBtn: {
    display: "flex",
    marginTop: "8px",
    justifyContent: "end",
    zIndex: 1,
    // marginBottom: "100px",
    "& .Mui-selected": {
      color: "#fff",
      backgroundColor: `${purplePrimaryColor} ! important`,
    },
  },
} as const;
export default paginationStyles;
