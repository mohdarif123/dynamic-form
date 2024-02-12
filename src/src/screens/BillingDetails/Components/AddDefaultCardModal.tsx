import { Box, Grid, Typography } from "@mui/material";
import DeleteImg from "assets/icons/adddocIcon.svg";
import React, { useState } from "react";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import { CustomButton, CustomDialog } from "global/components";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { selectUserName } from "redux/authSlice";
import CustomLoader from "global/components/CustomLoader/CustomLoader";

interface AddDefaultCardModelProps {
  setOpenModal: Function;
  openModal: boolean;
  handleConfirmDelete: Function;
}
const AddDefaultCardModel = ({
  setOpenModal,
  openModal,
  handleConfirmDelete,
}: AddDefaultCardModelProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const userName = useAppSelector(selectUserName);
  const [loading, setLoading] = useState<boolean>(false);

  const dialogHeaderContent = () => {
    return (
      <>
        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            <img src={DeleteImg} alt="delete Image" />
          </Box>

          <Box marginTop={3} textAlign={"center"}>
            <Typography
              sx={{ color: bgcolor ? "#FFFFFF" : "#000000" }}
              variant="h2"
            >
              Primary
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const dialogContent = () => (
    <>
      <Grid
        container
        sx={{
          backgroundColor: bgcolor ? "#14142D" : "#ffffff",
          placeContent: "center",
        }}
      >
        <Typography
          sx={{
            color: bgcolor ? "#CBCBCB" : "#000000",
            fontSize: "16px",
            lineHeight: "26px",
            fontWeight: 400,
            fontFamily: "Source Sans 3",
          }}
        >
          Are you want to set your card primary? <br />
        </Typography>
        <CustomLoader isLoading={loading} />
      </Grid>
    </>
  );

  const dialogFooter = () => {
    return (
      <>
        <Box
          width={"100%"}
          display={"flex"}
          sx={{ backgroundColor: bgcolor ? "#14142D" : "#ffffff" }}
          justifyContent={"center"}
        >
          <Box sx={classes.buttonWrapper} mb={2} mt={2} gap={3}>
            <Box sx={classes.deleteDialogFooter}>
              <CustomButton
                label="Cancel"
                onClick={handleCloseModel}
                buttonType={"outlined"}
              />
              <CustomButton
                label="Confirm"
                onClick={handleConfirmDelete}
                buttonType={"contained"}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <CustomDialog
        dialogTitleContent={dialogHeaderContent()}
        isDialogOpen={openModal}
        titleContentBgColor
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogContent()}
        dialogFooterClass={[{ ...classes.deleteDialogFooter }]}
        dialogFooterContent={dialogFooter()}
        width="600px"
        closable={true}
        closeIcon={true}
        closeButtonVisibility
        borderRadius="33px"
        addCompetitiveColor={bgcolor ? "#14142D" : "#ffffff"}
      />
    </>
  );
};
export default React.memo(AddDefaultCardModel);
