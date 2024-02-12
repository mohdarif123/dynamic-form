import React from "react";
import { CustomButton, CustomDialog, CustomIcon } from "global/components";
import { Box, Typography, Grid } from "@mui/material";
import ProposalStyles from "../Proppsals.style";
import deleteIcon from "assets/icons/delete.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

type Props = {
  setOpenDeleteModal: Function;
  openDeleteModal: boolean;
  handleDeleteSubmit: Function;
};

const DeleteDocumentModal: React.FC<Props> = ({
  setOpenDeleteModal,
  openDeleteModal,
  handleDeleteSubmit,
}) => {
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
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete Document
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Are you sure you want to delete document?
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
              onClick={() => handleDeleteSubmit()}
              customClasses={{ width: "110px" }}
              buttonType={"contained"}
            />
          </Box>
        </Grid>
      </>
    );
  };

  const handleClose = () => {
    setOpenDeleteModal!(false);
  };

  return (
    <CustomDialog
      isDialogOpen={openDeleteModal}
      closable
      handleDialogClose={handleClose}
      dialogBodyContent={dialogContent()}
      dialogFooterContent={dialogFooterContent()}
      width="460px"
      closeButtonVisibility
      borderRadius={"33px"}
      cancelIcon
    />
  );
};

export default React.memo(DeleteDocumentModal);
