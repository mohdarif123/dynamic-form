import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ModalStyle } from "./Modal.style";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { TypeAndLabel } from "./modalValidation";

interface CustomProps {
  openAddModal: boolean;
  setOpenAddModal: any;
  getLocalPrevData: boolean;
  setGetLocalPrevData: any;
  allFormData?: any;
  setAllFormData?: any;
}

const AddModal = ({
  openAddModal,
  setOpenAddModal,
  getLocalPrevData,
  setGetLocalPrevData,
  allFormData,
  setAllFormData,
}: CustomProps) => {
  const classes = ModalStyle;
  const [typeAndLabelValue, setTypeAndLabelValue] = useState<TypeAndLabel>({
    type: "",
    label: "",
  });
  const [formData, setFormData] = useState<TypeAndLabel[]>([]);

  // useEffect(() => {
  //   if (getLocalPrevData === true) {
  //     getDataFromLocalStorage();
  //   }
  // }, [getLocalPrevData]);

  // console.log(formData, "formData");
  // console.log(persistFormData, "persistFormData");
  // const getDataFromLocalStorage = () => {
  //   let existingFormData: any;
  //   const storedDataInLocal = localStorage.getItem("dynamicFormData");
  //   console.log(storedDataInLocal, "storedDataInLocal");
  //   if (storedDataInLocal !== null) {
  //     existingFormData = JSON.parse(storedDataInLocal);
  //   } else {
  //     console.log("[}")
  //     existingFormData = [];
  //   }
  //   console.log(existingFormData,"existingFormData")
  //   setPersistFormData(existingFormData);
  // };
  // dropdown type and input label onchange
  const handleTypeLabelOnChange = (event: any) => {
    const { value } = event.target;
    setTypeAndLabelValue((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleAddComponent = () => {
    setFormData((prevData) => [...prevData, typeAndLabelValue]);
    setTypeAndLabelValue({
      type: "",
      label: "",
    });
  };

  // handle close method
  const handleClose = () => {
    setTypeAndLabelValue({
      type: "",
      label: "",
    });
    setFormData([]);
    setOpenAddModal(false);
  };

  // handle clear local storage method
  const handleClear = () => {
    setTypeAndLabelValue({
      type: "",
      label: "",
    });
    setFormData([]);
  };

  const handleSubmit = () => {
    if (allFormData?.length > 0) {
      let arr = [formData, allFormData];
      localStorage.setItem("dynamicFormData", JSON.stringify(arr));
    } else {
      console.log("else");
      localStorage.setItem("dynamicFormData", JSON.stringify(formData));
    }
    setTypeAndLabelValue({
      type: "",
      label: "",
    });
    setFormData([]);
    setOpenAddModal(false);
  };

  const getFooter = () => {
    return (
      <>
        <Box sx={classes.footerWrapperStyle}>
          <Box>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={formData?.length > 0 ? false : true}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </>
    );
  };

  const handleDeleteComponentMethod = (i: any) => {
    const newData = [...formData];
    newData.splice(i, 1);
    setFormData(newData);
    alert("Delete component succeesfully");
  };

  const getDynamicField = () => {
    return (
      <>
        <Box mt={1}>
          <Typography variant="h5"> Dynamic Fields</Typography>
          <Grid container spacing={2} mt={0.5} sx={{ overflow: "auto" }}>
            {formData.map((items: any, index: number) => {
              return (
                <>
                  {items.type === "text" && (
                    <>
                      <Grid
                        item
                        xl={9}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        key={index}
                        sx={{ borderBottom: "1px solid green" }}
                        mb={1}
                      >
                        <Typography sx={{ textTransform: "capitalize" }} mb={1}>
                          {items.label}
                        </Typography>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          id={items.label}
                          name={items.label}
                          label={items.label}
                          type={items.type}
                          defaultValue={`Enter ${items.label}`}
                        />
                      </Grid>
                      <Grid
                        item
                        xl={2}
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteComponentMethod(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  )}
                  {items.type === "textarea" && (
                    <>
                      <Grid
                        item
                        xl={9}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        key={index}
                        sx={{ borderBottom: "1px solid green" }}
                        mb={1}
                      >
                        <Typography sx={{ textTransform: "capitalize" }} mb={1}>
                          {items.label}
                        </Typography>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          rows={4}
                          id={items.label}
                          name={items.label}
                          label={items.label}
                          type={items.type}
                          defaultValue={`Enter ${items.label}`}
                        />
                      </Grid>
                      <Grid
                        item
                        xl={2}
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteComponentMethod(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  )}

                  {items.type === "checkbox" && (
                    <>
                      <Grid
                        item
                        xl={9}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        key={index}
                        sx={{ borderBottom: "1px solid green" }}
                        mb={1}
                      >
                        <Typography sx={{ textTransform: "capitalize" }} mb={1}>
                          {items.label}
                        </Typography>
                        <Checkbox defaultChecked />
                      </Grid>
                      <Grid
                        item
                        xl={2}
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteComponentMethod(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  )}

                  {items.type === "radio" && (
                    <>
                      <Grid
                        item
                        xl={9}
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        key={index}
                        sx={{ borderBottom: "1px solid green" }}
                        mb={1}
                      >
                        <Typography sx={{ textTransform: "capitalize" }} mb={1}>
                          {items.label}
                        </Typography>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label={items.label}
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid
                        item
                        xl={2}
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteComponentMethod(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  )}
                </>
              );
            })}
          </Grid>
        </Box>
      </>
    );
  };

  const getContentArea = () => {
    return (
      <>
        <Box>
          <Grid container spacing={1} mt={0.3}>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Type
                </InputLabel>
                <Select
                  id="type"
                  name="type"
                  value={typeAndLabelValue.type}
                  label="Select Type"
                  onChange={handleTypeLabelOnChange}
                >
                  {["text", "checkbox", "radio", "textarea"].map(
                    (inputType: any) => {
                      return (
                        <MenuItem
                          value={inputType}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {inputType}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              {" "}
              <TextField
                required
                style={{ width: "100%" }}
                id="label"
                name="label"
                value={typeAndLabelValue.label}
                label="Label"
                defaultValue="Enter Lable"
                onChange={handleTypeLabelOnChange}
              />
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={12} xs={12}>
              <Button variant="contained" onClick={handleAddComponent}>
                Add Component
              </Button>
            </Grid>
          </Grid>
          {getDynamicField()}
        </Box>
      </>
    );
  };
  const getHeaderData = () => {
    return (
      <>
        <Box sx={classes.headerStyle}>
          <Typography variant="h6" sx={classes.headingStyle}>
            Add Form
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
      </>
    );
  };

  return (
    <Modal
      open={openAddModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.WrapperStyle}>
        <Box>{getHeaderData()}</Box>
        <Box sx={classes.contentAreaWrapper}>{getContentArea()}</Box>
        <Box>{getFooter()}</Box>
      </Box>
    </Modal>
  );
};
export default React.memo(AddModal);