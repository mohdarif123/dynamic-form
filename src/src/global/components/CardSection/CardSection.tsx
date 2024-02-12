import React from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { pinkDarkColor, theme } from "utils/styles";
import CardSectionStyles from "./CardSection.style";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { planLimits, PricingData } from "models/interfaces";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { getFormattedStatsCount } from "helpers/methods";

type Props = {
  pricingData?: PricingData[];
  plan: any;
  setPlan: Function;
};

const CardSection: React.FC<Props> = ({ pricingData, plan, setPlan }) => {
  const classes = CardSectionStyles;

  const rightIcon = () => {
    return (
      <Box
        component="span"
        sx={{
          marginRight: 1,
          color: "#ADC804",
          svg: {
            height: "20px",
            width: "20px",
          },
        }}
      >
        <DoneRoundedIcon />
      </Box>
    );
  };

  return (
    <>
      {pricingData?.map((item: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              border:
                item.id === item.id ? "2px solid #c11986" : "1px solid #DDDDDD",
              boxShadow: "2px 7px 19px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              width: "282px",
              height: "70vh",
              [theme.breakpoints.down("xl")]: {
                height: "90vh",
              },
              [theme.breakpoints.down("md")]: {
                height: "auto",
              },
            }}
            onClick={() => setPlan(item)}
          >
            <>
              <Box
                sx={{
                  backgroundColor: pinkDarkColor,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  color: "#FFFFFF",
                  padding: 1,
                  display: "flex",
                  justifyContent: "center",
                  svg: {
                    height: "15px",
                    width: "15px",
                  },
                }}
              >
                <StarRateRoundedIcon />
                <Typography sx={classes.recommendsText}>
                  Mailzzy Recommends
                </Typography>
              </Box>
              <Stack
                direction="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                padding={2}
              >
                <Box
                  sx={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& .not-allowed": {
                      cursor: "not-allowed! important",
                      pointerEvents: "auto! important",
                    },
                  }}
                >
                  <Typography gutterBottom sx={classes.title}>
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      marginBottom: 2,
                      [theme.breakpoints.down("sm")]: {
                        marginTop: "1px",
                        "& .MuiStack-root>:not(style)": {
                          marginTop: "1px !important",
                        },
                      },
                    }}
                  >
                    <Typography component="span" sx={classes.amount}>
                      {item.hasOwnProperty("price")
                        ? `$${item.price}/month`
                        : "FREE"}
                      <Tooltip
                        title="Launch offer for a limited period"
                        placement="right"
                      >
                        <Typography sx={classes.asterisks}>*</Typography>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  {item.limits.map((data: planLimits) => {
                    return (
                      <Box display="flex">
                        {rightIcon()}
                        <Typography variant="h2" sx={classes.validity}>
                          {getFormattedStatsCount(data.limit)} {data.entity}
                        </Typography>
                      </Box>
                    );
                  })}

                  <>
                    {item.features?.map((desc: string) => {
                      return (
                        <Typography variant="h2" sx={classes.validity}>
                          {rightIcon()} {desc}
                        </Typography>
                      );
                    })}
                  </>
                </Box>
              </Stack>
            </>
          </Box>
        );
      })}
    </>
  );
};

export default CardSection;
