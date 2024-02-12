import ProposalStyle from "../Proppsals.style";
import { Box } from "@mui/material";
import CustomDialog from "global/components/CustomDialog/CustomDialog";
import DeleteImg from "assets/images/computer.png";
import { CustomTable } from "global/components";
import { useState, memo } from "react";

interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  item: any;
}

const ViewCallDetailModel = (props: customProps) => {
  const classes = ProposalStyle;
  const [page, setPage] = useState(0);
  const userPerPage = 5;
  const pageVisited = page * userPerPage;
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
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const dialogBody = () => {
    return (
      <>
        <Box>
          <CustomTable
            headers={[
              { name: "name", field: "name" },
              { name: "Email", field: "email" },
              { name: "Contact No", field: "contactNo" },
              { name: "Title", field: "title" },
            ]}
            rows={props.item?.slice(pageVisited, pageVisited + userPerPage)}
            paginationCount={props?.item?.length}
            isRowPerPageEnable={true}
            rowsPerPage={userPerPage}
            handlePageChange={handleChangePage}
          />
        </Box>
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
        width="500px"
        borderRadius="33px"
      />
    </>
  );
};

export default memo(ViewCallDetailModel);
