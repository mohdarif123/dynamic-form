import { Box, Typography } from "@mui/material";
import LearningModalStyle from "./Modal.styles";
import { CustomModal } from "global/components";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";

interface customProps {
  openViewModal: boolean;
  setOpenViewModal: Function;
  rowData?: any;
}

const LearningViewModal = (props: customProps) => {
  const classes = LearningModalStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Box sx={classes.bodyStyle}>
          <Typography
            variant="h4"
            sx={{
              color: !bgcolor ? primaryBlackColor : pureWhiteColor,
              fontWeight: 500,
              wordBreak: "break-all",
            }}
          >
            {props?.rowData?.proposalEvaluation?.comments[0]?.text
              ? props?.rowData?.proposalEvaluation?.comments[0]?.text
              : "Data is not available..."}
          </Typography>
        </Box>
      </>
    );
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Typography variant="h2" sx={{ color: "white" }}>
          Comment
        </Typography>
      </>
    );
  };
  const handleClose = () => {
    props.setOpenViewModal!(false);
  };
  return (
    <>
      <CustomModal
        isDialogOpen={props.openViewModal}
        closable
        handleDialogClose={handleClose}
        dialogHeaderContent={dialogTitleContent()}
        closeButtonVisibility
        width={"640px"}
        borderRadius="33px"
        dialogBodyContent={dialogBodyContent()}
        hideBgColor
      />
    </>
  );
};

export default LearningViewModal;
