import { appColor } from "../../../utils/styles";

const customTooltipStyle = {
  assigneePaper: {
    borderRadius: "36px",
  },
  ViewPopOverWrapper: { backgroundColor: appColor, borderRadius: "24px" },
  ViewPopOverWrapper1: { backgroundColor: "#ffffff", borderRadius: "24px" },
  popOverListItem: {
    padding: "10px 10px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
} as const;

export default customTooltipStyle;
