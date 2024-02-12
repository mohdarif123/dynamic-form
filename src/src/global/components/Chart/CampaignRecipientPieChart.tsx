import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";
import {
  lightBgColor,
  pureWhiteColor,
  sidebarColor,
  theme,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

type Props = {
  data: any;
  region: any;
  domain: any;
  interval: any;
};

const gradientColors = [
  {
    offset: "0%",
    color: "rgba(226, 94, 101, 1)",
  },
  {
    offset: "100%",
    color: "rgba(226, 129, 134, 0)", // Change this color as needed
  },
];

const CampaignRecipientPieChart: React.FC<Props> = ({
  data,
  interval,
  domain,
  region,
}) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));
  const isDesktopLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isDesktopMd = useMediaQuery(theme.breakpoints.up("md"));
  const isDesktopMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktopSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isDesktopSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const bgcolor = useAppSelector(selectBackgroundColor);
  const renderGradient = () => (
    <defs>
      {data.map((entry: any, index: any) => (
        <linearGradient id={`myGradient${index}`} x1="0" x2="0" y1="0" y2="1">
          <stop
            key={index}
            offset={gradientColors[0]?.offset}
            stopColor={gradientColors[0]?.color}
          />
          <stop
            key={index}
            offset={gradientColors[1]?.offset}
            stopColor={gradientColors[1]?.color}
          />
        </linearGradient>
      ))}
    </defs>
  );
  const checkCount =
    data.filter((item: any) => {
      return item?.count > 0;
    })?.length <= 3;

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    const labelLines = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        {labelLines.map((line: any, index: any) => (
          <text
            key={index}
            x={0}
            y={index * 15}
            dy={10}
            fill={!bgcolor ? "#20213D" : pureWhiteColor}
            fontSize={isDesktop ? "16px" : "10px"}
            textAnchor="middle"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: !bgcolor ? lightBgColor : sidebarColor,
        width: "100%",
      }}
    >
      <ResponsiveContainer
        aspect={
          isDesktop
            ? 5
            : isDesktopLg
            ? 6
            : isDesktopMd
            ? 4
            : isDesktopSm
            ? 3
            : 1.5
        }
        width={"100%"}
      >
        <BarChart
          style={{ cursor: "pointer", color: "red" }}
          width={isDesktop ? 800 : 200}
          height={220}
          data={data}
          margin={
            isDesktopSm
              ? { top: 10, right: 30, left: 0, bottom: 5 }
              : { top: 10, right: -20, left: 0, bottom: 5 }
          }
          barSize={checkCount && isDesktopSmDown ? 60 : 12}
        >
          {renderGradient()}

          {isDesktopMdDown ? (
            <XAxis
              dataKey="name"
              padding={{ left: 20, right: 20 }}
              interval={0}
              tick={<CustomXAxisTick />}
            />
          ) : (
            <>
              <XAxis
                dataKey="name"
                padding={{ left: 20, right: 20 }}
                interval={0}
                tick={{
                  fill: !bgcolor ? "#20213D" : pureWhiteColor,
                  fontSize: isDesktop ? "16px" : "12px",
                  dy: 10,
                }}
              />
            </>
          )}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#999999", fontSize: "16px" }}
          />

          {/* <Tooltip
            cursor={{ fill: "transparent" }}
            position={{ y: props.data.height + 40 }}
            offset={-60}
          /> */}
          <Tooltip
            isAnimationActive={false}
            trigger="hover"
            content={({ payload, label }) => {
              if (payload) {
                const xValue = payload[0]?.value;
                if (xValue) {
                  return (
                    <Box
                      sx={{
                        backgroundColor: "#ffffff",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      <Typography sx={{ margin: "5px", color: "#7A81FD" }}>
                        {xValue}
                      </Typography>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      sx={{
                        backgroundColor: "#ffffff",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      <Typography sx={{ margin: "5px", color: "#7A81FD" }}>
                        {0}
                      </Typography>
                    </Box>
                  );
                }
              } else {
                return <span>No payload</span>;
              }
            }}
            cursor={{ fill: "transparent" }}
          />
          <CartesianGrid strokeDasharray="2" vertical={false} />
          <Bar dataKey="count" color="#fff" radius={[10, 10, 0, 0]}>
            {data.map((entry: any, index: number) => (
              <>
                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
              </>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CampaignRecipientPieChart;
