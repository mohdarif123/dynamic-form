import ProposalStyle from "../Proppsals.style";
import { Box, Grid, Typography } from "@mui/material";
import CustomDialog from "global/components/CustomDialog/CustomDialog";
import DeleteImg from "assets/images/computer.png";
import React from "react";

interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  item: any;
}

const ServiceAgencyModel = (props: customProps) => {
  const classes = ProposalStyle;

  const handleCloseModel = () => {
    props.setOpenModal(false);
  };

  const agencyAddressData = [
    {
      name: "Line1",
      value: props.item?.line1,
    },
    {
      name: "Line2",
      value: props.item?.line2,
    },
    {
      name: "Line3",
      value: props.item?.line3,
    },
    {
      name: "City",
      value: props.item?.city,
    },
    {
      name: "State",
      value: props.item?.state,
    },
    {
      name: "Country",
      value: props.item?.country,
    },
    {
      name: "PinCode",
      value: props.item?.pinCode,
    },
  ];

  const dialogTitleContent = () => {
    return (
      <>
        <Box sx={classes.dialogTitleWrapper}>
          <Typography sx={classes.titleRight} variant="h1">
            Agency Address
          </Typography>
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
        {agencyAddressData?.map((items: any, index: number) => {
          return (
            <Grid
              key={index}
              container
              spacing={2}
              alignContent={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <>
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
                    <Typography variant="h5">{items?.name}:</Typography>
                    <Typography variant="h5">{items?.value}</Typography>
                  </Box>
                </Grid>
              </>
            </Grid>
          );
        })}
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

export default React.memo(ServiceAgencyModel);
