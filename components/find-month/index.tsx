"use client";
import mainData from "@/data/mainData";
import Helper from "@/utils/helper";

const FindMonthComponent = () => {
  const { formatDateToMonth } = Helper();
  return (
    <div>
      <ul>
      {mainData.map((entry, index) => (
          <li key={index}>
            <p>Month: {formatDateToMonth(entry["Check In"])}</p>
            <p>Employee: {entry.Employee}</p>
            <p>Check In: {entry["Check In"]}</p>
            <p>Check Out: {entry["Check Out"]}</p>
            <p>Worked Hours: {entry["Worked Hours (H.M)"]} hours</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindMonthComponent;
