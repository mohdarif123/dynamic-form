import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Homestyle } from "./Home.style";
import AddModal from "./Modal/AddModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "./Modal/DeleteModal";

const Home = () => {
  const classes = Homestyle;
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deletedIndex, setDeletedIndex] = useState<number>(0);
  const [viewDataIndex, setViewDataIndex] = useState<number>(0);
  const [allFormData, setAllFormData] = useState<any>([]);
  const [viewModalData, setViewModalData] = useState<any>([]);
  const [editModalData, setEditModalData] = useState<any>([]);

  useEffect(() => {
    existingFormAllDataHandler();
  }, []);

  const existingFormAllDataHandler = () => {
    let existingFormData: any;
    const storedDataInLocal = localStorage.getItem("dynamicFormData");
    if (storedDataInLocal !== null) {
      existingFormData = JSON.parse(storedDataInLocal);
    } else {
      existingFormData = [];
    }
    setAllFormData(existingFormData);
  };

  const addModalHandler = () => {
    setOpenAddModal(true);
  };

  const handleEditMethod = (edit: any, i: number) => {
    setOpenAddModal(true);
    setEditModalData(edit);
    setViewDataIndex(i);
  };

  const handleViewMethod = (data: any) => {
    setOpenAddModal(true);
    setViewModalData(data);
  };

  const deleteHandler = (index: number) => {
    setOpenDeleteModal(true);
    setDeletedIndex(index);
  };

  const finalDeleteHandler = () => {
    const updateFormData = [...allFormData];
    updateFormData.splice(deletedIndex, 1);
    setAllFormData(updateFormData);
    setOpenDeleteModal(false);
    localStorage.setItem("dynamicFormData", JSON.stringify(updateFormData));
    alert("Delete successfully");
  };

  console.log(allFormData, "allFormData");
  const showAllModalData = () => {
    return (
      <>
        <Grid container sx={classes.showAllDataWrapper} spacing={2}>
          {allFormData.map((innerArray: any, index: number) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: "skyblue",
                padding: "10px 10px",
                marginY: "10px",
              }}
            >
              <Box>
                {innerArray?.map((item: any, innerIndex: number) => (
                  <Box key={innerIndex}>
                    <Typography variant="h5">
                      Type: {item.type}, Label: {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                <ModeEditIcon
                  sx={{ cursor: "pointer", marginRight: "20px" }}
                  onClick={() => handleEditMethod(innerArray, index)}
                />
                <VisibilityIcon
                  sx={{ cursor: "pointer", marginRight: "20px" }}
                  onClick={() => handleViewMethod(innerArray)}
                />
                <DeleteOutlineIcon
                  style={{ cursor: "pointer", marginRight: "20px" }}
                  onClick={() => deleteHandler(index)}
                />
                <Button variant="contained">Enable</Button>
              </Box>
            </Grid>
          ))}

          {allFormData?.length === 0 && (
            <Box>
              <Typography variant="h1">No data found</Typography>
            </Box>
          )}
        </Grid>
      </>
    );
  };

  const getButton = () => {
    return (
      <>
        <Box sx={classes.addButtonWrapperStyle}>
          <Button variant="contained" onClick={addModalHandler}>
            Add
          </Button>
        </Box>
      </>
    );
  };

  const getMainHome = () => {
    return (
      <>
        <Box>
          {/* add button  */}
          {getButton()}
          {showAllModalData()}
        </Box>

        {/* add form modal  */}
        <AddModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          allFormData={allFormData}
          viewModalData={viewModalData}
          setViewModalData={setViewModalData}
          setEditModalData={setEditModalData}
          editModalData={editModalData}
          viewDataIndex={viewDataIndex}
          setViewDataIndex={setViewDataIndex}
        />
        {/* delete modal  */}
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={finalDeleteHandler}
        />
      </>
    );
  };

  return getMainHome();
};
export default React.memo(Home);
