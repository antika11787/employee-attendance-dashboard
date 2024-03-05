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

interface Employee {
  Employee: string;
  "Employee ID": number;
  "Check In": string;
  "Worked Hours (H.M)": number;
  "Late Hours (H.M)": number;
  "Early Leave Hours (H.M)": number;
  "Over Time (H.M)": number;
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

  const extractUniqueNames = (checkIns: any[]): string[] => {
    const namesSet: Set<string> = new Set();

    checkIns.forEach((data) => {
      namesSet.add(data.Employee);
    });

    return Array.from(namesSet);
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

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  const getColor = (initial: string) => {
    const colors = [
      "#47466D",
      "#F8B195",
      "#F67280",
      "#C06C84",
      "#6C5B7B",
      "#355C7D",
    ];
    const index = initial.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return {
    formatDateToMonth,
    extractDates,
    extractUniqueNames,
    calculateAverageTime,
    getInitials,
    getColor,
  };
};

export default Helper;
