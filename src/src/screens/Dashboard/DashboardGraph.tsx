import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Label,
} from "recharts";

export const colors = [
  "#CB5B66",
  "#1CB7CC",
  "#FFBB28",
  "#FF6978",
  "#0088FE",
  "#C6C6C6",
  "#0D7938",
  "#796C6B",
  "#A5B0CD",
  "#00C49F",
];

export const LineGraph = (value: any, index: any) => {
  const data = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: value },
    { name: "Jan", value: 10 },
    { name: "Jan", value: 80 },
    { name: "Feb", value: value },
  ];
  return (
    <LineChart
      width={150}
      height={50}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        horizontal={false}
      />
      <Line type="monotone" dataKey="value" stroke={colors[index]} />
    </LineChart>
  );
};

export const VolumeGraph = (progress: any) => {
  const data = [{ name: "Progress", percentage: 85 }];
  return (
    <BarChart width={400} barSize={12} height={200} data={progress}>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        horizontal={false}
      />
      {/* <Tooltip /> */}
      <XAxis dataKey="name" axisLine={false} tickLine={false} />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};
