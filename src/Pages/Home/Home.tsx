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
  const [getLocalPrevData, setGetLocalPrevData] = useState<boolean>(false);
  const [allFormData, setAllFormData] = useState<any>([]);

  // useEffect(() => {
  //   let persistFormData: any;
  //   const dataInLocal = localStorage.getItem("dynamicFormData");
  //   if (dataInLocal !== null) {
  //     persistFormData = JSON.parse(dataInLocal);
  //   }
  //   setAllFormData(persistFormData);
  //   console.log("testing");
  // }, []);

  const addModalHandler = () => {
    let existingFormData: any;
    setOpenAddModal(true);
    const storedDataInLocal = localStorage.getItem("dynamicFormData");
    if (storedDataInLocal !== null) {
      existingFormData = JSON.parse(storedDataInLocal);
    } else {
      existingFormData = [];
    }
    if (existingFormData?.length > 0) {
      setGetLocalPrevData(true);
    }
    setAllFormData(existingFormData);
    console.log(existingFormData, "existingFormData");
  };
  console.log(allFormData, "allFormData");
  const handleEditMethod = () => {
    setOpenAddModal(true);
  };

  const handleViewMethod = () => {
    setOpenAddModal(true);
  };

  const deleteHandler = () => {
    setOpenDeleteModal(true);
  };

  const deleteFunction = () => {
    alert("dlete");
    setOpenDeleteModal(false);
  };

  const showAllModalData = () => {
    return (
      <>
        <Grid container sx={classes.showAllDataWrapper}>
          <Grid xl={1.5} lg={1.5}>
            <Typography>Name</Typography>
          </Grid>
          <Grid xl={1.5} lg={1.5}>
            <Typography>class</Typography>
          </Grid>
          <Grid xl={1.5} lg={1.5}>
            <Typography>course</Typography>
          </Grid>
          <Grid xl={1.5} lg={1.5}>
            <Typography>data</Typography>
          </Grid>
          <Grid xl={1.5} lg={1.5}>
            <Typography>address</Typography>
          </Grid>
          <Grid xl={2.5} lg={2.5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ModeEditIcon
                sx={{ cursor: "pointer" }}
                onClick={handleEditMethod}
              />
              <VisibilityIcon
                sx={{ cursor: "pointer" }}
                onClick={handleViewMethod}
              />
              <DeleteOutlineIcon
                sx={{ cursor: "pointer" }}
                onClick={deleteHandler}
              />
              <Button variant="contained" sx={{ margin: "4px 0 4px 0" }}>
                Enalble
              </Button>
            </Box>
          </Grid>
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
          setGetLocalPrevData={setGetLocalPrevData}
          getLocalPrevData={getLocalPrevData}
          setAllFormData={setAllFormData}
          allFormData={allFormData}
        />
        {/* delete modal  */}
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteFunction={deleteFunction}
        />
      </>
    );
  };

  return getMainHome();
};
export default React.memo(Home);
