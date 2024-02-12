import { Box, List, Tooltip, Typography } from "@mui/material";
import CustomPaper from "../CustomPaper/CustomPaper";
import customTooltipStyle from "./CustomTooltip.Style";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";

interface CustomProps {
  item: any;
  length?: any;
}

const CustomTooltip = ({ item, length }: CustomProps) => {
  const classes = customTooltipStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const answerData = (items: any) => {
    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;
    const truncatedLength = length ? 35 : 20 - ellipsisLength;
    const frontLength = Math.ceil(truncatedLength);
    let truncatedString = "";
    if (items?.length > length ? 35 : 20) {
      truncatedString = items.substr(0, frontLength) + ellipsis;
    } else {
      truncatedString = items;
    }
    return truncatedString;
  };

  const dueDateConverter = (data: any) => {
    return (
      <CustomPaper className={classes.assigneePaper}>
        <Box
          sx={
            bgcolor ? classes.ViewPopOverWrapper : classes.ViewPopOverWrapper1
          }
        >
          <Box sx={classes.popOverListItem}>
            <List sx={classes.popOverListItem}>
              <Typography
                variant="subtitle2"
                sx={{ ml: 1, color: bgcolor ? "#ffffff" : "#000000" }}
              >
                {data}
              </Typography>
            </List>
          </Box>
        </Box>
      </CustomPaper>
    );
  };

  return (
    <>
      {item.length > 15 ? (
        <Tooltip
          title={dueDateConverter(item)}
          arrow
          placement="left"
          componentsProps={{
            tooltip: {
              sx: {
                background: "none",
                marginRight: "15px",
              },
            },
          }}
        >
          <Box display={"flex"}>
            <Box>{answerData(item)}</Box>
          </Box>
        </Tooltip>
      ) : (
        <Box display={"flex"}>
          <Box>{item}</Box>
        </Box>
      )}
    </>
  );
};
export default CustomTooltip;
