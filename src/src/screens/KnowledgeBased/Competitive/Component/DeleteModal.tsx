import React from "react";
import { CustomButton, CustomDialog } from "global/components";
import { Box, Typography, Grid } from "@mui/material";
import CompetitiveStyle from "../Competitive.styel";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import deleteIcon from "assets/icons/delete.svg";

interface customProps {
  setOpenDeleteModal: Function;
  openDeleteModal: boolean;
  handleDeleteSubmit?: any;
}
const DeleteModal = (props: customProps) => {
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const dialogBodyContent = () => {
    return (
      <>
        <Grid container sx={classes.centerItemFlex}>
          <Box sx={classes.deleteDialogFooter}>
            <CustomButton
              label="Cancel"
              onClick={handleClose}
              buttonType={"outlined"}
            />
            <CustomButton
              label="Delete"
              onClick={() => props.handleDeleteSubmit()}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <img src={deleteIcon} alt="deleteImage" width={"300px"} />
        </Box>
        <Box mt={2}>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? pureWhiteColor : primaryBlackColor,
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete Comparison
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete Comparison?
          </Typography>
        </Box>
      </>
    );
  };
  const handleClose = () => {
    props.setOpenDeleteModal!(false);
  };
  return (
    <>
      <CustomDialog
        isDialogOpen={props?.openDeleteModal}
        closable
        handleDialogClose={handleClose}
        dialogBodyContent={dialogHeaderContent()}
        closeButtonVisibility
        width={"460px"}
        borderRadius="33px"
        closeIcon={true}
        cancelIcon={true}
        dialogFooterContent={dialogBodyContent()}
      />
    </>
  );
};

export default DeleteModal;
