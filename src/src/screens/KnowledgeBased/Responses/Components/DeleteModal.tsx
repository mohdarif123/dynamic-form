import ModalStyle from "./Modal.Style";
import { Typography, Box, Grid } from "@mui/material";
import { CustomButton, CustomDialog } from "global/components";
import DeleteImages from "assets/images/DeleteImages.svg";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";

interface customProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: Function;
  handleSubmit: any;
}
const DeleteModal = (props: customProps) => {
  const classes = ModalStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const dialogBodyContent = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <img src={DeleteImages} alt="image not found" />
        </Box>
        <Box mt={2}>
          <Typography
            variant="h2"
            sx={{
              color: !bgcolor ? "black" : "white",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete Response Content
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: !bgcolor ? "black" : "white",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete Response Content?
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
              customClasses={{
                width: "110px",
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
                border: !bgcolor
                  ? "1.5px solid #C1C1C1"
                  : "1.5px solid #fff !important",
              }}
              buttonType={"outlined"}
              label="Cancel"
              onClick={handleClose}
            />
            <CustomButton
              buttonType={"contained"}
              label="Delete"
              customClasses={{
                width: "110px",
                [`@media screen and (max-width: ${324}px)`]: {
                  width: "190px",
                },
              }}
              onClick={() => props.handleSubmit()}
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
      closeButtonVisibility
      width={"500px"}
      borderRadius="33px"
      dialogBodyContent={dialogBodyContent()}
      dialogFooterContent={dialogFooterContent()}
      cancelIcon={true}
      closeIcon={true}
    />
  );
};

export default DeleteModal;
