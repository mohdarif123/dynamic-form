import { Box, Grid, Typography } from "@mui/material";
import ViewEditStyles from "./ViewEdit.styles";
import { CustomButton, CustomDialog, CustomIcon } from "global/components";
import deleteIcon from "assets/icons/delete.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import React from "react";
import { primaryBlackColor, pureWhiteColor } from "../../../utils/styles";

interface customProps {
  setOpenDeleteModal: Function;
  openDeleteModal: boolean;
  handleDeleteSubmit: any;
}
const DeleteModal = (props: customProps) => {
  const classes = ViewEditStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const addUserHeaderContent = () => {
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
              color: !bgcolor ? primaryBlackColor : pureWhiteColor,
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Delete user
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: !bgcolor ? "black" : "white",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete users?
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
              label="Cancel"
              onClick={() => handleClose()}
              customClasses={{
                border: !bgcolor
                  ? "1.5px solid #C1C1C1"
                  : "1.5px solid #fff !important",
                width: {
                  xl: "110px !important",
                  lg: "110px !important",
                  md: "110px !important",
                  sm: "90px !important",
                  xs: "90px !important",
                },
                height: {
                  xl: "47px",
                  lg: "40px",
                  md: "38px",
                  sm: "38px",
                  xs: "38px",
                },
              }}
              buttonType={"outlined"}
            />
            <CustomButton
              label="Delete"
              buttonType={"contained"}
              onClick={() => props.handleDeleteSubmit()}
              customClasses={{
                width: {
                  xl: "110px !important",
                  lg: "110px !important",
                  md: "110px !important",
                  sm: "90px !important",
                  xs: "90px !important",
                },
                height: {
                  xl: "47px",
                  lg: "40px",
                  md: "38px",
                  sm: "38px",
                  xs: "38px",
                },
              }}
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
      dialogFooterContent={dialogFooterContent()}
      dialogBodyContent={addUserHeaderContent()}
      closeIcon={true}
      closeButtonVisibility
      width={"460px"}
      borderRadius="33px"
    />
  );
};

export default React.memo(DeleteModal);
