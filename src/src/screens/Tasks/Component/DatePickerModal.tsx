import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomButton, CustomIcon } from "global/components";
import TasksStyle from "../Tasks.styles";
import CustomDialog from "global/components/CustomModal/CustomModal";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import dueDateChnageImage from "assets/images/dueDateChange.svg";

interface customProps {
  openDatePickerModal: boolean;
  setOpenDatePickerModal: Function;
  handleDateUpdate?: any;
}
const DatePickerModal = (props: customProps) => {
  const classes = TasksStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon
            icon={
              <img
                src={dueDateChnageImage}
                alt="deleteIcon"
                height={"150px"}
                width={"180px"}
              />
            }
          />
        </Box>
        <Box sx={classes.centerItemFlex} py={2}>
          <Typography
            variant="h5"
            sx={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
          >
            Are you sure you want to change due date?
          </Typography>
        </Box>
      </>
    );
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Grid container sx={classes.centerItemFlex} mt={3}>
          <Box sx={classes.dialogFooter}>
            <CustomButton
              customClasses={{
                width: "110px",
                "&:hover fieldset": {
                  borderColor: "grey",
                },
              }}
              buttonType={"outlined"}
              label="No"
              onClick={handleClose}
            />
            <CustomButton
              label="Yes"
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
              onClick={() => props.handleDateUpdate()}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Typography sx={classes.modalTitle} variant="h2">
          Due Date
        </Typography>
      </>
    );
  };

  const handleClose = () => {
    props.setOpenDatePickerModal!(false);
  };
  return (
    <CustomDialog
      isDialogOpen={props?.openDatePickerModal}
      closable
      handleDialogClose={handleClose}
      dialogHeaderContent={dialogTitleContent()}
      closeButtonVisibility
      width={"500px"}
      borderRadius="33px"
      dialogBodyContent={dialogBodyContent()}
      dialogFooterContent={dialogFooterContent()}
      hideBgColor
      dialogFooterClass
    />
  );
};

export default React.memo(DatePickerModal);
