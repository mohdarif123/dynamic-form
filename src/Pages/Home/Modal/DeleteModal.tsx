import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Modal from "@mui/material/Modal";
import { ModalStyle } from "./Modal.style";
import CloseIcon from "@mui/icons-material/Close";

interface CustomProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: any;
  deleteFunction?: any;
}
const DeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  deleteFunction,
}: CustomProps) => {
  const classes = ModalStyle;

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const deleteHandler = () => {
    deleteFunction();
  };
  const getHeaderData = () => {
    return (
      <>
        <Box sx={classes.headerStyle}>
          <Typography variant="h6" sx={classes.headingStyle}>
            Warning!
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
      </>
    );
  };
  return (
    <Modal
      open={openDeleteModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.WrapperStyle}>
        {getHeaderData()}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure want to delete this?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }} gap={2} mt={3}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={deleteHandler}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default React.memo(DeleteModal);
