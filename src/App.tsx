import { Box } from "@mui/material";
import React from "react";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Box
        sx={{
          background: "#e1f6ff",
          height: "100%",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Home />
      </Box>
    </>
  );
}

export default React.memo(App);
