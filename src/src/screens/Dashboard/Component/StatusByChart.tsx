import { Box, Divider, Typography, useMediaQuery, Grid } from "@mui/material";
import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { customScrollCssInner, theme } from "utils/styles";
import urls from "global/constants/UrlConstants";
import history from "utils/history";

type Props = {
  data: any;
  dateRange: any;
};

export const SemiCircularChart: React.FC<Props> = ({ data, dateRange }) => {
  const isDesktopXlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const isDesktopSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeIndex, setActiveIndex] = useState<any>(0);
  const bgcolor = useAppSelector(selectBackgroundColor);
  data = data.sort((a: any, b: any) => b.count - a.count);
  const totalCount = data.reduce(
    (accumulator: any, item: any) => accumulator + item.count,
    0
  );
  const sortStatusData = data.sort((a: any, b: any) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return a.count - b.count;
  });

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 8}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={bgcolor ? "#ffffff" : "#000000"}
          style={{ wordBreak: "break-all" }}
        >
          {data[activeIndex]?.name || ""}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={bgcolor ? "#ffffff" : "#000000"}
        >
          {`${data[activeIndex]?.count}`}
        </text>
      </g>
    );
  };
  const colors = [
    "#db771f",
    "#a03fe0",
    "#188ede",
    "#127550",
    "#de4e2c",
    "#262dc9",
    "#cf343c",
    "#4f33d6",
    "#2090b0",
    "#1b9e44",
  ];

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };
  return (
    <>
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item xl={8} lg={8.3} md={8} sm={8} xs={12}>
          <PieChart
            width={isDesktopXlDown ? 400 : isDesktopSmDown ? 300 : 500}
            height={isDesktopSmDown ? 200 : 450}
            style={{
              cursor: "pointer",
              marginBottom: isDesktopSmDown ? "-50px" : "",
              fontSize: "12px",
            }}
          >
            <Pie
              dataKey="count"
              startAngle={180}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              endAngle={0}
              stroke="none"
              data={data}
              cx="50%"
              onClick={() => {
                history.push(
                  `${urls.PROPOSAL_VIEW_PATH}?status=${data[activeIndex]?.name}&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                );
              }}
              cy="50%"
              paddingAngle={2}
              outerRadius={isDesktopXlDown ? 80 : 120}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Grid>
        <Grid
          item
          xl={4}
          lg={3.7}
          md={4}
          sm={4}
          xs={12}
          sx={{
            height: "320px",
            overflowY: "auto",
            ...customScrollCssInner,
          }}
        >
          {sortStatusData.map((items: any, index: any) => {
            return (
              <Grid display={"flex"} item pl={4}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "27px",
                    color: bgcolor ? "#ffffff" : "#000000",
                    marginBottom: "5px",
                    width: "80px",
                    cursor: "pointer",
                    wordBreak: "break-word",
                    marginRight: "5px",
                  }}
                  onClick={() => {
                    history.push(
                      `${urls.PROPOSAL_VIEW_PATH}?status=${items.name}&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                    );
                  }}
                  variant="h5"
                >
                  {items.name}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
                  >
                    {items.count}
                  </Typography>
                  <Box>
                    <Divider
                      sx={{
                        backgroundColor: colors[index % colors.length],
                        width: `${Math.ceil(
                          (items.count / totalCount) * 100
                        )}px`,
                        fontWeight: "bold",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "5px",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
