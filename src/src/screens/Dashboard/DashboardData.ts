export const options = [
  {
    id: 0,
    label: "1 Week",
    value: "7",
  },

  {
    id: 2,
    label: "2 Week",
    value: "14",
  },
  {
    id: 3,
    label: "3 Week",
    value: "21",
  },
  {
    id: 4,
    label: "1 Month",
    value: "30",
  },

  {
    id: 5,
    label: "All",
    value: "-1",
  },
];
export const COLORS = [
  "rgb(0, 136, 254)",
  "rgb(0, 196, 159)",
  "rgb(255, 187, 40);",
  "rgb(255, 128, 66)",
  "rgb(136, 132, 216)",
  "rgb(19, 180, 202)",
  "rgb(165, 176, 205)",
];
export const getLastWeek = (datevalue: any) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - datevalue
  );
  return lastWeek;
};
export const weekValue = (datevalue: any) => {
  const lastWeek = getLastWeek(datevalue);
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    ("00" + lastWeekDay.toString()).slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};
export const handleCalculateDifference = (startDate: any, endDate: any) => {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();
  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return "Invalid date format";
  } else {
    const timeDifference = Math.abs(endDateTime - startDateTime);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
    // Alternatively, you can calculate the difference in other units like hours, minutes, etc.
  }
};

export const getLastMonth = (datevalue: any) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth() - datevalue,
    today.getDate()
  );
  return lastWeek;
};
export const weekValueMonth = (datevalue: any) => {
  const lastWeek = getLastMonth(datevalue - 1);
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    "01".slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};

export const getNextMonth = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth() + 7,
    today.getDate()
  );
  return lastWeek;
};
export const weekValueNextMonth = () => {
  const lastWeek = getNextMonth();
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekDay = lastWeek.getDate();
  const lastWeekYear = lastWeek.getFullYear();
  const lastWeekDate =
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    ("00" + lastWeekDay.toString()).slice(-2) +
    "-" +
    ("0000" + lastWeekYear.toString()).slice(-4);

  return lastWeekDate;
};
