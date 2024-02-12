import { CustomModal } from "global/components";
import { Typography } from "@mui/material";
import ModalStyle from "./Modal.Style";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";

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
      <Typography
        variant="subtitle1"
        sx={bgcolor ? classes.textStyle : classes.textStyle1}
      >
        <span dangerouslySetInnerHTML={{ __html: answertext.innerHTML }} />
      </Typography>
    );
  };
  const dialogTitleContent = () => {
    return (
      <>
        <Typography variant="h2" sx={classes.textStyle}>
          Answer
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
        dialogHeaderContent={dialogTitleContent()}
        closeButtonVisibility
        width={"640px"}
        borderRadius="20px"
        dialogBodyContent={dialogBodyContent()}
      />
    </>
  );
};

export default ViewAnswerModal;
