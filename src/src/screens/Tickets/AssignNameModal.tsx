import { Box, Grid, Typography } from "@mui/material";
import deleteImage from "assets/images/deleteImage.svg";
import ticketsStyles from "./Tickets.styles";
import { CustomButton, CustomDialog } from "global/components";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import React from "react";
import { pureWhiteColor } from "utils/styles";

interface customProps {
  assignNameModal: boolean;
  setAssignNameModal: Function;
  handleSubmit: any;
}
const AssignNameModal = (props: customProps) => {
  const classes = ticketsStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Box sx={bgcolor ? classes.centerItemFlex : classes.centerItemFlex1}>
          <Typography variant="h5">Are you sure you want to Assign?</Typography>
        </Box>
      </>
    );
  };
  const dialogFooterContent = () => {
    return (
      <>
        <Grid
          container
          sx={classes.centerItemFlex}
          style={{ background: !bgcolor ? pureWhiteColor : "#282844" }}
        >
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
      hideBgColor
      dialogFooterClass
      cancelIconColor
    />
  );
};

export default React.memo(AssignNameModal);
