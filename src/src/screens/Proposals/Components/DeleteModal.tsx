import React from "react";
import { CustomButton, CustomDialog, CustomIcon } from "global/components";
import { Box, Typography, Grid } from "@mui/material";
import ProposalStyles from "../Proppsals.style";
import deleteIcon from "assets/icons/delete.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

interface customProps {
  setOpenDeleteModal: Function;
  openDeleteModal: boolean;
  handleDeleteSubmit: any;
}

const DeleteModal = (props: customProps) => {
  const classes = ProposalStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const dialogContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon
            icon={<img src={deleteIcon} alt="deleteIcon" width={"300px"} />}
          />
        </Box>
        <Box mt={2}>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete RFP
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete the RFP?
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
              label="Cancel"
              onClick={handleClose}
            />
            <CustomButton
              label="Delete"
              onClick={() => props.handleDeleteSubmit()}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const handleClose = () => {
    props.setOpenDeleteModal!(false);
  };

  return (
    <CustomDialog
      isDialogOpen={props?.openDeleteModal}
      closable
      handleDialogClose={handleClose}
      dialogBodyContent={dialogContent()}
      dialogFooterContent={dialogFooterContent()}
      width="460px"
      closeIcon={true}
      cancelIcon={true}
      closeButtonVisibility
      borderRadius="33px"
    />
  );
};

export default React.memo(DeleteModal);
