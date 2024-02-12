import React from "react";
import { Typography } from "@mui/material";
import ModalStyle from "../../KnowledgeBased/Responses/Components/Modal.Style";
import { CustomModal } from "global/components";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

interface customProps {
  openViewModal: boolean;
  setOpenViewModal: Function;
  rowData?: any;
}
const ViewAnswerModal = (props: customProps) => {
  const classes = ModalStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const answertext = document.createElement("div");
  answertext.innerHTML = props.rowData;
  const dialogBodyContent = () => {
    return (
      <Typography style={{ color: !bgcolor ? "#000000" : "#ffffff" }}>
        {answertext.innerText}
      </Typography>
    );
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Typography
          variant="h6"
          sx={classes.textStyle}
          style={{ color: !bgcolor ? "#000000" : "#ffffff" }}
        >
          Text
        </Typography>
      </>
    );
  };
  const handleClose = () => {
    props.setOpenViewModal!(false);
  };

  return (
    <>
      <CustomModal
        isDialogOpen={props.openViewModal}
        closable
        handleDialogClose={handleClose}
        dialogTitleContent={dialogTitleContent()}
        closeButtonVisibility
        width={"640px"}
        borderRadius="20px"
        dialogBodyContent={dialogBodyContent()}
      />
    </>
  );
};

export default React.memo(ViewAnswerModal);
