export const Month = [
  {
    id: 0,
    label: "January",
    value: "1",
  },
  {
    id: 1,
    label: "February",
    value: "2",
  },
  {
    id: 2,
    label: "March",
    value: "3",
  },
  {
    id: 3,
    label: "April",
    value: "4",
  },
  {
    id: 4,
    label: "May",
    value: "5",
  },
  {
    id: 5,
    label: "June",
    value: "6",
  },
  {
    id: 6,
    label: "July",
    value: "7",
  },
  {
    id: 7,
    label: "August ",
    value: "8",
  },
  {
    id: 8,
    label: "September ",
    value: "9",
  },
  {
    id: 9,
    label: "October",
    value: "10",
  },
  {
    id: 10,
    label: "November",
    value: "11",
  },
  {
    id: 11,
    label: "December",
    value: "12",
  },
];
export const Years = [
  {
    id: 0,
    label: "2021",
    value: "2021",
  },
  {
    id: 1,
    label: "2022",
    value: "2022",
  },
  {
    id: 2,
    label: "2023",
    value: "2023",
  },
  {
    id: 3,
    label: "2024",
    value: "2024",
  },
  {
    id: 4,
    label: "2025",
    value: "2025",
  },
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
    ("0000" + lastWeekYear.toString()).slice(-4) +
    "-" +
    ("00" + lastWeekMonth.toString()).slice(-2) +
    "-" +
    ("00" + lastWeekDay.toString()).slice(-2);

  return lastWeekDate;
};

export const exportDataInitial = () => {
  return {
    fileName: {
      value: "",
      error: "",
    },
  };
};

export const exportValidation = (adminDetails: any) => {
  let errors = adminDetails;
  let isValid = true;
  const adminDetail = adminDetails;
  if (!adminDetail.value) {
    errors.error = "Please enter file name";
    isValid = false;
  }
  return { errors, isValid };
};
