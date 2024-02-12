import { Box, Grid, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { theme } from "utils/styles";
import { PieChart, Pie, Sector, Cell } from "recharts";
import ByDomainBgImage from "assets/images/DocumentChart.svg";
import history from "utils/history";
import urls from "global/constants/UrlConstants";

type Props = {
  domainData: any;
  dateRange: any;
};
const DocumentStatusChart: React.FC<Props> = ({ domainData, dateRange }) => {
  const isDesktopXlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const colors = [
    { start: "rgba(63, 253, 242, 1)", end: "rgba(117, 158, 239, 1)" },
    { start: "rgba(255, 86, 143, 1)", end: "rgba(255, 148, 114, 1)" },
    { start: "rgba(162, 144, 251, 1)", end: "rgba(73, 46, 205, 1)" },
  ];
  const renderGradient = () => (
    <defs>
      {domainData.map((entry: any, index: any) => (
        <linearGradient id={`myGradients${index}`}>
          <stop offset="0%" stopColor={colors[index % colors.length].start} />
          <stop offset="100%" stopColor={colors[index % colors.length].end} />
        </linearGradient>
      ))}
    </defs>
  );

  const isDesktopXlDown = useMediaQuery(theme.breakpoints.down("xl"));
  domainData = domainData.sort((a: any, b: any) => b.count - a.count);
  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

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
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 0) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 10) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 13;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={4}
          textAnchor="middle"
          fill={"#ffffff"}
          style={{ wordBreak: "break-all" }}
        >
          {domainData[activeIndex]?.name}
        </text>
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
          innerRadius={outerRadius - 33}
          cornerRadius={5}
          outerRadius={outerRadius + 12}
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
          {domainData[activeIndex]?.count || ""} Docs
        </text>
      </g>
    );
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
        pl={{ xl: 8, lg: 3, md: 8, sm: 6, xs: 6 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        pt={isDesktopXlUp ? 8 : 9}
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
            width: isDesktopXlDown ? "90px" : "90px",
            height: isDesktopXlDown ? "90px" : "90px",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <Box sx={{ width: isDesktopXlUp ? 420 : 300, height: 230 }}>
            <PieChart
              width={isDesktopXlUp ? 420 : 300}
              height={230}
              style={{ cursor: "pointer" }}
            >
              {renderGradient()} {/* Use the gradient defined earlier */}
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                stroke="none"
                data={domainData}
                cx="50%"
                cy="50%"
                innerRadius={isDesktopXlUp ? 50 : 47}
                onClick={() => {
                  history.push(
                    `${urls.WON_PROPOSAL_VIEW_PATH}?interval=${domainData[activeIndex]?.name}`
                  );
                }}
                outerRadius={isDesktopXlUp ? 80 : 62}
                fill="url(#gradientId)"
                dataKey="count"
                onMouseEnter={onPieEnter}
              >
                {domainData.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#myGradients${index})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocumentStatusChart;
