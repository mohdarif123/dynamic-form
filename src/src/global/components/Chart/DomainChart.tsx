import { Box, useMediaQuery } from "@mui/material";
import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from "recharts";
import { theme } from "utils/styles";

type Props = {
  data: any;
};

const DomainChart: React.FC<Props> = ({ data }) => {
  const isDesktopXl = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box>
      <ResponsiveContainer
        aspect={0}
        width={"100%"}
        minHeight={isDesktopXl ? 265 : 200}
      >
        <AreaChart
          width={730}
          height={220}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%" stopColor="#8884d8" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DomainChart;
