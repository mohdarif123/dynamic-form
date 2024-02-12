import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { customScrollCssInner, pureWhiteColor, theme } from "utils/styles";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { Divider } from "@mui/material";
import ByDomainBgImage from "assets/images/ByDomainBg.svg";
import history from "utils/history";
import urls from "global/constants/UrlConstants";

type Props = {
  domainData: any;
  dateRange: any;
};
const DomainByChart: React.FC<Props> = ({ domainData, dateRange }) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const colors = [
    "#e37e49",
    "#3b41e3",
    "#eb345d",
    "#29aae3",
    "#893deb",
    "#2ded6a",
    "#1e26e6",
  ];
  const isDesktopXlDown = useMediaQuery(theme.breakpoints.down("xl"));
  domainData = domainData.sort((a: any, b: any) => b.count - a.count);
  const isDesktopSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };
  const totalCount = domainData.reduce(
    (accumulator: any, item: any) => accumulator + item.count,
    0
  );
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
          innerRadius={outerRadius + 6}
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
          {domainData[activeIndex]?.name || ""}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 20}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={bgcolor ? "#ffffff" : "#000000"}
        >
          {`(${((value / totalCount) * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const getLineColor = (domainValue: string) => {
    switch (domainValue) {
      case "Cloud":
        return "#7ACFFD";
      case "Development":
        return "#CED0FF";
      case "Networking":
        return "#494D93";
      case "Security":
        return "#ACC6D5";
      case "Staffing":
        return "#7A81FD";
      default:
        return "#7ACFFD";
    }
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
      <Grid
        item
        xl={9}
        lg={9}
        md={9}
        sm={9}
        xs={12}
        pl={{ md: 8, sm: 6, xs: 6 }}
        style={{ display: "flex", alignItems: "center" }}
        pt={4}
      >
        <Box
          sx={{
            backgroundImage: "url(" + ByDomainBgImage + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "18px",
            width: isDesktopXlDown ? "210px" : "250px",
            height: isDesktopXlDown ? "210px" : "250px",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <Box sx={{ width: 600, height: 250 }}>
            <PieChart width={600} height={250} style={{ cursor: "pointer" }}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                stroke="none"
                data={domainData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                onClick={() => {
                  history.push(
                    `${urls.PROPOSAL_VIEW_PATH}?domain=${domainData[activeIndex]?.name}&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                  );
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                onMouseEnter={onPieEnter}
              >
                {domainData.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xl={3}
        lg={3}
        md={3}
        sm={3}
        xs={12}
        sx={{
          display: "flex",
          width: { xs: "100%", sm: "100%", md: "200px" },
        }}
      >
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            fontWeight: "bold",
            marginRight: "10px",
          }}
          orientation={isDesktopSmDown ? "horizontal" : "vertical"}
        />
        <Box
          display="flex"
          flexDirection="column"
          mt={"6px"}
          ml={1}
          sx={{
            height: "310px",
            overflowY: "auto",
            ...customScrollCssInner,
          }}
        >
          {domainData.map((items: any, index: any) => {
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "27px",
                    color: bgcolor ? pureWhiteColor : "#373854",
                    marginBottom: "7px",
                    cursor: "pointer",
                    wordBreak: "break-word",
                  }}
                  variant="h5"
                  onClick={() => {
                    history.push(
                      `${urls.PROPOSAL_VIEW_PATH}?domain=${items.name}&to=${dateRange.toDate}&from=${dateRange.fromDate}`
                    );
                  }}
                >
                  {items.name}

                  <Divider
                    sx={{
                      backgroundColor: colors[index % colors.length],
                      fontWeight: "bold",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "5px",
                      borderRadius: "10px",
                      width: `${Math.ceil((items.count / totalCount) * 100)}px`,
                    }}
                  />
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DomainByChart;
