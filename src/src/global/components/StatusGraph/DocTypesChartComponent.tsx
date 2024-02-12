import { Box, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { theme } from "../../../utils/styles";
import urls from "../../constants/UrlConstants";
import history from "../../../utils/history";
// import { CardsDataType } from "../DashboardInterfaces";
interface CustomProps {
  data: [{ name: ""; count: "" }];
  region: any;
  domain: any;
  interval: any;
}
const COLORS = [
  "rgb(0, 136, 254)",
  "rgb(0, 196, 159)",
  "rgb(255, 187, 40)",
  "rgb(255, 128, 66)",
  "rgb(136, 132, 216)",
  "rgb(19, 180, 202)",
  "rgb(165, 176, 205)",
];

const DocTypesChartComponent = (props: CustomProps) => {
  const isDesktopXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isDesktopLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isDesktopMd = useMediaQuery(theme.breakpoints.up("md"));
  const isDesktopXs = useMediaQuery(theme.breakpoints.up("xs"));
  return (
    <Box
      textAlign="center"
      width="auto"
      display="flex"
      justifyContent="space-between"
      marginRight={10}
      // sx={{ ...centerItemFlex, flexDirection: "row" }}
    >
      <PieChart
        width={
          isDesktopXl
            ? 400
            : isDesktopLg
            ? 260
            : isDesktopMd
            ? 600
            : isDesktopXs
            ? 300
            : 600
        }
        height={280}
        margin={{
          top: 5,
        }}
      >
        <Pie
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          data={props.data}
          innerRadius={45}
          outerRadius={65}
          cx={85}
          cy={125}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="count"
          onClick={(data: any, index: any) => {
            history.push(
              `${urls.PROPOSAL_VIEW_PATH}?subContext=status&status=${data.name}&region=${props.region}&domain=${props.domain}&interval=${props.interval}`
            );
          }}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="right"
          wrapperStyle={{
            paddingTop: "50px",
            cursor: "pointer",
          }}
          onClick={(data: any, index: any) => {
            history.push(
              `${urls.PROPOSAL_VIEW_PATH}?subContext=status&status=${data.value}&region=${props.region}&domain=${props.domain}&interval=${props.interval}`
            );
          }}
        />
      </PieChart>
    </Box>
  );
};

export default DocTypesChartComponent;
