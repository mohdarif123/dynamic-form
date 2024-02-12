import { Box, Grid, Typography } from "@mui/material";
import { CustomButton, CustomDialog, CustomIcon } from "global/components";
import TasksStyle from "../Tasks.styles";
import deleteImage from "assets/images/deleteImage.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import assigneeChange from "assets/images/assigneeChange.svg";
import React from "react";

interface customProps {
  assignNameModal: boolean;
  setAssignNameModal: Function;
  handleSubmit: any;
}
const AssignNameModal = (props: customProps) => {
  const classes = TasksStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon icon={<img src={assigneeChange} alt="deleteIcon" />} />
        </Box>
        <Box
          sx={bgcolor ? classes.centerItemFlex : classes.centerItemFlex1}
          mt={2}
        >
          <Typography
            variant="h5"
            sx={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
          >
            Are you sure you want to Assign?
          </Typography>
        </Box>
      </>
    );
  };
  const dialogFooterContent = () => {
    return (
      <>
        <Grid container sx={classes.centerItemFlex}>
          <Box sx={classes.dialogFooter}>
            <CustomButton
              customClasses={{ width: "110px" }}
              buttonType={"outlined"}
              label="No"
              onClick={handleClose}
            />
            <CustomButton
              label="Yes"
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
              onClick={() => props.handleSubmit()}
            />
          </Box>
        </Grid>
      </>
    );
  };
  const addUserHeaderContent = () => {
    return <img src={deleteImage} alt="image not found" />;
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Typography sx={classes.modalTitle} variant="h2">
          Assignee Name
        </Typography>
      </>
    );
  };
  const handleClose = () => {
    props.setAssignNameModal!(false);
  };

  return (
    <CustomDialog
      isDialogOpen={props?.assignNameModal}
      closable
      handleDialogClose={handleClose}
      closeButtonVisibility
      width={"500px"}
      borderRadius="33px"
      dialogBodyContent={dialogBodyContent()}
      dialogFooterContent={dialogFooterContent()}
      dialogHeaderContent={dialogTitleContent()}
    />
  );
};

export default React.memo(AssignNameModal);
