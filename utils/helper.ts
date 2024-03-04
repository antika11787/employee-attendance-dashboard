interface CheckInData {
  Employee: string;
  "Employee ID": number;
  "Check In": string;
  "Worked Hours (H.M)": number;
  "Late Hours (H.M)": number;
  "Early Leave Hours (H.M)": number;
  "Over Time (H.M)": number;
  [key: string]: any;
}

const Helper = () => {
  const formatDateToMonth = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName: string = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return monthName;
  };

  const extractDates = (checkIns: CheckInData[]): number[] => {
    const datesSet: Set<number> = new Set();

    checkIns.forEach((data) => {
      const checkInDate: Date = new Date(data["Check In"]);
      datesSet.add(checkInDate.getDate());
    });

    return Array.from(datesSet);
  };

  function calculateAverageTime(
    checkIns: CheckInData[],
    timeKey: string
  ): number {
    let totalTime = 0;
    let totalEmployees = 0;

    // Iterate over the check-ins
    checkIns.forEach((checkIn) => {
      // Add the specified time for each employee to the total
      totalTime += checkIn[timeKey];
      totalEmployees++;
    });

    // Calculate the average time
    const averageTime = totalTime / totalEmployees;
    return averageTime;
  }

  return {
    formatDateToMonth,
    extractDates,
    calculateAverageTime,
  };
};

export default Helper;
