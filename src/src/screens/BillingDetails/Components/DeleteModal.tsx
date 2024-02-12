import React from "react";
import { CustomButton, CustomDialogs2 } from "global/components";
import { Box, Typography, Grid } from "@mui/material";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import deleteIcon from "assets/icons/delete.svg";
import { billingDetailsStyle as classes } from "../BillingDetail.style";

interface deleteModalProps {
  setOpenDeleteModal: Function;
  openDeleteModal: boolean;
  handleDeleteSubmit?: any;
}
const DeleteModal = ({
  setOpenDeleteModal,
  openDeleteModal,
  handleDeleteSubmit,
}: deleteModalProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Grid container mt={2}>
          <Box sx={classes.deleteDialogFooter}>
            <CustomButton
              label="Cancel"
              onClick={handleClose}
              buttonType={"outlined"}
            />
            <CustomButton
              label="Delete"
              onClick={() => handleDeleteSubmit()}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        style={{ flexDirection: "column" }}
      >
        <img
          src={deleteIcon}
          alt="deleteImage"
          height={"180px"}
          width={"320px"}
        />
        <Typography
          sx={{ color: !bgcolor ? "#000000" : "white" }}
          variant="h2"
          mt={3}
        >
          Delete Card
        </Typography>
        <Typography
          sx={classes.fontText}
          variant="h5"
          mt={1}
          style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
        >
          Are you sure you want to delete card details ?
        </Typography>
      </Box>
    );
  };
  const handleClose = () => {
    setOpenDeleteModal!(false);
  };
  return (
    <>
      <CustomDialogs2
        isDialogOpen={openDeleteModal}
        closable
        handleDialogClose={handleClose}
        dialogHeaderContentClass={true}
        dialogHeaderContent={dialogHeaderContent()}
        closeButtonVisibility
        width={"500px"}
        borderRadius="33px"
        dialogBodyContent={dialogBodyContent()}
      />
    </>
  );
};

export default React.memo(DeleteModal);
