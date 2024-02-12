import { Avatar, Box, Typography } from "@mui/material";
import { CustomDialog, CustomTable } from "global/components";
import DashboardStyle from "./Dashboard.style";
import { cornflowerBlueColor, getRelativeFontSize } from "utils/styles";
import moment from "moment";

interface customProps {
  items: Function;
  setShowDialogComment: any;
  showDialogComment?: any;
}

const RfpLostDataComment = (props: customProps) => {
  const classes = DashboardStyle;
  const handleClose = () => {
    props.setShowDialogComment!(false);
  };
  const getDialogTitle = () => {
    return (
      <Typography
        sx={{
          fontSize: getRelativeFontSize(7),
          color: "#ffffff",
        }}
        variant="h2"
      >
        View Comments
      </Typography>
    );
  };
  const commentTableData = (item: any) => {
    const comments = item ? JSON.parse(item?.lost_comment) : [];
    const data = comments.map((items: any, index: any) => {
      const text = document.createElement("div");
      text.innerHTML = items.text;
      return {
        by: (
          <>
            <Box display={"flex"}>
              <Avatar
                sx={{
                  background: cornflowerBlueColor,
                  textTransform: "capitalize",
                }}
              >
                {items?.by?.charAt(0)}
              </Avatar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4" pl={1}>
                  {items.by}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        on: (
          <>
            <Box sx={classes.timingStyleWrapper}>
              <Typography variant="h5" marginLeft={2}>
                {moment(items.on).format("MM/DD/YYYY")}
                <Typography
                  sx={classes.timingStyle}
                  variant="h5"
                  component={"span"}
                >
                  {moment(items.on).format("hh:mm:ss")}
                </Typography>
              </Typography>
            </Box>
          </>
        ),
        text: (
          <>
            <Typography
              sx={{
                fontWeight: "400",
                cursor: "pointer",
              }}
              variant="h5"
            >
              {text.innerText}
            </Typography>
          </>
        ),
        // by: item.by,
      };
    });
    return data;
  };
  const commentDialogData = () => {
    return (
      <>
        <Box>
          <Box sx={classes.tasksTableStyle}>
            <CustomTable
              headers={[
                {
                  name: "Comment By",
                  field: "by",
                },
                {
                  name: "Comment On",
                  field: "on",
                },
                {
                  name: "Comment",
                  field: "text",
                },
              ]}
              rows={commentTableData(props.items)}
              paginationHideShow={true}
              tableHeaderTextStart={true}
            />
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      <CustomDialog
        isDialogOpen={props.showDialogComment}
        handleDialogClose={handleClose}
        dialogHeaderContent={getDialogTitle()}
        dialogBodyContent={commentDialogData()}
        closable
        closeButtonVisibility={true}
        width="1000px"
        borderRadius="33px"
        hideBgColor={true}
        cancelIconColor={true}
        dialogBodyContentPadding={true}
      />
    </>
  );
};
export default RfpLostDataComment;
