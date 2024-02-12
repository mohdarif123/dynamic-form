import { CustomButton, CustomDialog, CustomIcon } from "global/components";
import deleteImage from "assets/images/deleteImage.svg";
import { Box, Grid, Typography } from "@mui/material";
import CompetitiveStyle from "../Competitive.styel";
import deleteIcon from "assets/icons/delete.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
interface customProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: Function;
  handleDeleteSubmit: any;
}

const ViewDeleteModal = (props: customProps) => {
  const classes = CompetitiveStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const addUserHeaderContent = () => {
    return <img src={deleteImage} alt="image not found" />;
  };

  const dialogBodyContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomIcon icon={<img src={deleteIcon} alt="deleteIcon" />} />
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
            Delete Comparison
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "white" : "#000",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Are you sure you want to remove created?
          </Typography>
        </Box>
      </>
    );
  };
  const handleClose = () => {
    props.setOpenDeleteModal!(false);
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

  return (
    <CustomDialog
      isDialogOpen={props?.openDeleteModal}
      closable
      handleDialogClose={handleClose}
      closeButtonVisibility
      width={"500px"}
      borderRadius="33px"
      dialogBodyContent={dialogBodyContent()}
      dialogFooterContent={dialogFooterContent()}
    />
  );
};

export default ViewDeleteModal;
