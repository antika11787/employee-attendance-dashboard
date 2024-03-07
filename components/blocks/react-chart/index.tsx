'use client';

import React, { useState, ChangeEventHandler } from "react";
import { Chart as ChartJS, registerables, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Image from "next/image";
import Helper from "@/utils/helper";
import HighLow from "@/data/highLow";
import allData from "@/data/allData.json";
import januaryCheckIns from "@/data/januaryCheckIns";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import { AgChartOptions } from "ag-charts-enterprise";
import "./index.scss";


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font = {
    size: 20,
    weight: 'bold'
};
defaults.plugins.title.color = "black";

const ReactChart = () => {
    const { extractDates, calculateAverageTime, parseTimeString } = Helper();

    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('january');

    const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const averageWorkHour = calculateAverageTime(januaryCheckIns, "Worked Hours (H.M)");
    const averageLateHour = calculateAverageTime(januaryCheckIns, "Late Hours (H.M)");
    const averageEarlyLeaveHour = calculateAverageTime(januaryCheckIns, "Early Leave Hours (H.M)");
    const averageOvertime = calculateAverageTime(januaryCheckIns, "Over Time (H.M)");

    const [options, setOptions] = useState<AgChartOptions>({
        data: HighLow.map((data) => {
            return {
                label: data.label,
                low: data.low,
                high: data.high,
                late: data.late,
                early: data.early,
                ontime: data.ontime
            }
        }),
        title: {
            text: "Employee Check in Data",
        },
        subtitle: {
            text: "Early, On time and Late Check in for January, 2024",
        },
        series: [
            {
                type: "range-bar",
                xKey: "label",
                yLowKey: "low",
                yHighKey: "high",
                fill: "#47466D",
                stroke: "#47466D",
                // fillOpacity: 0.5,
                lineDash: [5, 5],
                lineDashOffset: 10,
                highlightStyle: {
                    item: {
                        fill: "#47466D",
                    }
                },
                tooltip: {
                    format: {
                        title: (data: any) => data.label,
                        value: (data: any) => {
                            let tooltipContent = "";
                            if (data.yValue > 0) {
                                tooltipContent += `Late: ${data.yValue}\n`;
                            } else if (data.yValue < 0) {
                                tooltipContent += `Early: ${Math.abs(data.yValue)}\n`;
                            }
                            return tooltipContent.trim();
                        }
                    }
                }
            },
        ],
        background: {
            fill: "transparent",
        },
        annotations: [{
            type: 'line',
            y: 0,
            stroke: 'red',
            strokeWidth: 2,
            dash: [4, 4]
        }]
    });



    return (
        <div className="home-container">
            <div className="data-card params work-hour">
                <div className="params-wrapper">
                    <Image src={"/team.png"} alt="work" width={50} height={50} />
                    <div className="params-detail">
                        <h5 className="params-heading">Total Employee</h5>
                        <h2 className="params-value">500</h2>
                    </div>
                </div>
            </div>
            <div className="data-card params check-in">
                <div className="params-wrapper">
                    <div className="params-detail">
                        <h5 className="params-heading">Checked in</h5>
                        <h2 className="params-value">460</h2>
                    </div>
                    <Image src={"/check-in.png"} alt="work" width={50} height={50} />
                </div>
            </div>
            <div className="data-card params late-hour">
                <div className="params-wrapper">
                    <Image src={"/running.png"} alt="work" width={50} height={50} />
                    <div className="params-detail">
                        <h5 className="params-heading">Late Arrival</h5>
                        <h2 className="params-value">5%</h2>
                    </div>
                </div>
            </div>
            <div className="data-card params overtime">
                <div className="params-wrapper">
                    <div className="params-detail">
                        <h5 className="params-heading">Total Absent</h5>
                        <h2 className="params-value">40</h2>
                    </div>
                    <Image src={"/absent.png"} alt="work" width={50} height={50} />
                </div>
            </div>
            <div className="data-card check-in-chart">
                <AgChartsReact className="ag-chart" options={options} />
            </div>
            <div className="data-card dummy"></div>
            <div className="data-card doughnut-chart">
                <div className="doughnut-heading">
                    <h2 className="doughnut-heading-text">Employee Attendance</h2>
                    <div className="doughnut-heading-dropdown-container">
                        <select value={selectedYear} onChange={handleChangeYear} className="doughnut-heading-dropdown">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                        <select value={selectedMonth} onChange={handleChangeMonth} className="doughnut-heading-dropdown">
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                        </select>
                    </div>
                </div>
                <Doughnut
                    data={{
                        labels: ["worked Hours", "Late Hours", "Early Hours", "Overtime"],
                        datasets: [
                            {
                                data: [averageWorkHour, averageLateHour, averageEarlyLeaveHour, averageOvertime],
                                backgroundColor: ["#47466D", "#3D84A7", "#ABEDD8", "#46CDCF"],
                                borderColor: "transparent",
                            }
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: false,
                            },
                        },
                        layout: {
                            padding: 10,
                        }
                    }}
                />
            </div>
            <div className="data-card bar-chart">
                <Bar
                    data={{
                        labels: allData.map((data) => data.label),
                        datasets: [
                            // {
                            //     label: "Worked hours",
                            //     data: allData.map((data) => data.worked_hours),
                            //     backgroundColor: "#47466D",
                            //     borderColor: "#47466D",
                            // },
                            {
                                label: "Late hours",
                                data: allData.map((data) => data.late_hours),
                                backgroundColor: "#3D84A7",
                                borderColor: "#3D84A7",
                            },
                            {
                                label: "Early leave hours",
                                data: allData.map((data) => data.early_leave_hours),
                                backgroundColor: "#46CDCF",
                                borderColor: "#46CDCF",
                            },
                            {
                                label: "Overtime",
                                data: allData.map((data) => data.overtime),
                                backgroundColor: "#ABEDD8",
                                borderColor: "#ABEDD8",
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Employee Attendance",
                            },
                        },
                        layout: {
                            padding: 20
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ReactChart;
