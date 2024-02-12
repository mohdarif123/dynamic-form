import React from "react";
import ProposalStyle from "../Proppsals.style";
import { Box, Grid, Typography } from "@mui/material";
import CustomDialog from "global/components/CustomDialog/CustomDialog";
import DeleteImg from "assets/images/computer.png";

interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  item: any;
}

const TitleModel = (props: customProps) => {
  const classes = ProposalStyle;

  const handleCloseModel = () => {
    props.setOpenModal(false);
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Box sx={classes.dialogTitleWrapper}>
          <Box sx={classes.titleRight}>Proposal Details</Box>
        </Box>
      </>
    );
  };

  const dialogContent = () => {
    return (
      <>
        {/* <Box sx={classes.dialogFooter}>
          <CustomButton
            label="Cancel"
            customClasses={classes.buttonWhiteBg}
            onClick={() => handleCloseModel()}
          />
          <CustomButton
            label="Delete"
            onClick={() => props.handleConfirmDelete()}
          />
        </Box> */}
      </>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <Box display={"flex"}>
        <img src={DeleteImg} alt="delete Image" />
      </Box>
    );
  };
  const dialogBody = () => {
    return (
      <>
        <Grid
          container
          spacing={2}
          alignContent={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid item xs={12} xl={12}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                backgroundColor: "#f7f9fb",
                borderRadius: "8px",
                padding: "10px 12px",
                marginBottom: "10px",
                alignContent: "center",
              }}
            >
              <Typography>ID:</Typography>
              <Typography>{props.item?.title}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} xl={12}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                backgroundColor: "#f7f9fb",
                borderRadius: "8px",
                padding: "10px 12px",
                marginBottom: "10px",
              }}
            >
              <Typography>ISSUE DATE:</Typography>
              <Typography>{props.item?.issueDate}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} xl={12}>
            <Box
              display={"flex"}
              gap={2}
              sx={{
                backgroundColor: "#f7f9fb",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <Typography>DUE DATE:</Typography>
              <Typography>{props.item?.dueDate}</Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <CustomDialog
        dialogHeaderContent={dialogHeaderContent()}
        isDialogOpen={props.openModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleCloseModel}
        dialogTitleContent={dialogTitleContent()}
        dialogBodyContent={dialogBody()}
        dialogFooterContent={dialogContent()}
        width="450px"
        borderRadius="33px"
      />
    </>
  );
};

export default React.memo(TitleModel);
