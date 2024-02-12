import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Loader from "../../../assets/loader.svg";
interface CustomLoaderProps {
  isLoading?: boolean;
}
const CustomLoader = (props: CustomLoaderProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 101,
        backgroundColor: "rgb(255 243 243 / 50%) !important",
      }}
      open={props.isLoading!}
    >
      {/* <CircularProgress color="inherit" /> */}
      <img src={Loader} width="150px" alt="Loader" />
    </Backdrop>
  );
};

export default CustomLoader;
