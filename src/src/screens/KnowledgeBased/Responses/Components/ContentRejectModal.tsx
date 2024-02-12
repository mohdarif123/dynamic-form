import React from "react";
import { CustomButton, CustomDialog } from "global/components";
import { Box, Typography } from "@mui/material";

interface customProps {
  openRejectModal: boolean;
  setOpenRejectModal: Function;
  handleReject?: any;
}

const ContentRejectModal = (props: customProps) => {
  const handleClose = () => {
    props.setOpenRejectModal!(false);
  };
  const dialogBodyContent = () => {
    return <></>;
  };

  const dialogFooterContent = () => {
    return (
      <>
        <Box display="flex" gap={1}>
          <CustomButton label="No" onClick={handleClose} />
          <CustomButton label="Yes" onClick={() => props?.handleReject()} />
        </Box>
      </>
    );
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Typography variant="h2" sx={{ fontWeight: 600 }}>
          Reject New Content
        </Typography>
        <Typography variant="h5" mt={1}>
          Are you sure you want to reject Content?
        </Typography>
      </>
    );
  };
  return (
    <CustomDialog
      isDialogOpen={props?.openRejectModal}
      closable
      handleDialogClose={handleClose}
      dialogTitleContent={dialogTitleContent()}
      closeButtonVisibility
      width={"500px"}
      borderRadius="33px"
      dialogBodyContent={dialogBodyContent()}
      dialogFooterContent={dialogFooterContent()}
    />
  );
};

export default ContentRejectModal;
