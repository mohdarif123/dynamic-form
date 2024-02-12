import { Box, Typography } from "@mui/material";
import React from "react";
import somethingwrongIcon from "assets/icons/SomethingWrong.svg";
import { theme } from "./styles";
import { CustomButton, CustomIcon } from "global/components";

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; errorDetails: string; component: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorDetails: "", component: "" };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      try {
        return (
          <>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                textAlign: "center",
                height: "100vh",
                display: "grid",
              }}
            >
              <CustomIcon
                icon={
                  <img src={somethingwrongIcon} alt="ticket-Comment-Icon" />
                }
              />

              <Typography
                sx={{
                  [theme.breakpoints.up("lg")]: {
                    fontWeight: 800,
                    fontSize: "50px",
                    color: "#000000",
                  },
                  [theme.breakpoints.up("xs")]: {
                    fontWeight: 800,
                    fontSize: "30px",
                    color: "#000000",
                  },
                  [theme.breakpoints.up("xl")]: {
                    fontWeight: 800,
                    fontSize: "60px",
                    color: "#000000",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontWeight: 800,
                    fontSize: "40px",
                    color: "#000000",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontWeight: 800,
                    fontSize: "30px",
                    color: "#000000",
                  },
                }}
              >
                Something went wrong
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
                {" "}
                <CustomButton
                  label={"Go Home"}
                  onClick={() => {}}
                  customClasses={{
                    width: {
                      xl: "110px",
                      lg: "110px",
                      md: "110px",
                      sm: "100px",
                      xs: "100px",
                    },
                    height: {
                      xl: "47px",
                      lg: "40px",
                      md: "38px",
                      sm: "38px",
                      xs: "38px",
                    },
                    border: "none",
                    background: "rgba(38, 49, 96, 1)",
                  }}
                  buttonType={"contained"}
                />
              </Box>
            </Box>
          </>
        );
      } catch (error) {
        throw error;
      }
    }

    return this.props.children;
  }
}
