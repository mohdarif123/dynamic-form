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
