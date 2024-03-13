'use client';

import React, { useState, ChangeEventHandler, useEffect } from "react";
import { Chart as ChartJS, registerables, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Image from "next/image";
import Helper from "@/utils/helper";
import HighLow from "@/data/highLow";
import januaryCheckIns from "@/data/januaryCheckIns";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import { AgChartOptions } from "ag-charts-enterprise";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./index.scss";
import Clock from "@/components/elements/clock";
import { BiSolidEditAlt } from "react-icons/bi";
import { totalCheckInApi, totalLateApi } from "@/apiEndpoints/fileApi";
import { GetTotalEmployeeApi, UpdateTotalEmployeeApi } from "@/apiEndpoints/employeeApi";
import { useSelector } from "react-redux";
import { FileState, totalEmployeeResponse } from "@/types/interface";
import EditModal from "../editModal";

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
    const fileId = useSelector((state: FileState) => state.file._id);
    const { calculateAverageTime } = Helper();
    const [isClient, setIsClient] = useState<boolean>(false);
    const [value, onChange] = useState<Value>(new Date());
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [totalCheckIn, setTotalCheckIn] = useState<number | null>(null);
    const [totalLate, setTotalLate] = useState<number | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [editModalTotal, setEditModalTotal] =
        useState<totalEmployeeResponse | null>(null);
    const [total, setTotal] = useState<totalEmployeeResponse | undefined>(undefined);

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
            }
        }),
        title: {
            text: `Employee Attendance for ${HighLow[0].label}`,
            fontWeight: 'bold',
        },
        subtitle: {
            text: "Maximum Early and Late Check in (in minutes) for January, 2024",
        },
        series: [
            {
                type: "range-bar",
                xKey: "label",
                yLowKey: "low",
                yHighKey: "high",
                fill: "#47466D",
                stroke: "#47466D",
            },
        ],
        background: {
            fill: "transparent",
        },
    });

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const day = value instanceof Date ? value.getDate() : undefined;
    const month = value instanceof Date ? months[value.getMonth()] : undefined;
    const year = value instanceof Date ? value.getFullYear() : undefined;
    const formattedDate = `${year}-${month}-${Number(day ?? '01') < 10 ? '0' + (day ?? '01') : (day ?? '01')}`;
    console.log("value", formattedDate);

    useEffect(() => {
        setIsClient(true);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [checkInData, lateData, totaldata] = await Promise.all([
                    totalCheckInApi(fileId, formattedDate),
                    totalLateApi(fileId, formattedDate),
                    GetTotalEmployeeApi()
                ]);
                setTotalCheckIn(checkInData);
                setTotalLate(lateData);
                setTotal(totaldata);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [value]);

    return (
        <div className="home-container">
            <div className="top-container">
                <div className="calendar custom-scrollbar">
                    <Calendar onChange={onChange} value={value} className={"custom-calendar"} />
                </div>
                <div className="params">
                    <div className="params-box check-in">
                        {isClient && <Clock />}
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/employee.png" alt="employees" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">100</p>
                                <p className="total-employee">total Employee</p>
                            </div>
                            <BiSolidEditAlt className="total-employee-update-icon"
                                onClick={() => {
                                    openEditModal();
                                }} />
                            <EditModal
                                isEditModalOpen={isEditModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                editModalTotal={editModalTotal}
                                setTotal={setTotal}
                            />
                        </div>
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/mobile.png" alt="checked-in" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">{totalCheckIn}</p>
                                <p className="total-employee">Checked in</p>
                            </div>
                        </div>
                    </div>
                    <div className="params-box total-wrapper">
                        <div className="total-container">
                            <Image src="/running.png" alt="running" width={70} height={70} />
                            <div className="total">
                                <p className="total-number">{totalLate}</p>
                                <p className="total-employee">Total Late</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-card check-in-chart">
                <AgChartsReact className="ag-chart" options={options} />
            </div>
            <div className="data-card check-in-doughnut">
                <Doughnut
                    data={{
                        labels: ["Absent", "Present"],
                        datasets: [
                            {
                                data: [100 - (totalCheckIn ?? 0), totalCheckIn],
                                backgroundColor: ["#3D84A7", "#ABEDD8"],
                                borderColor: "transparent",
                                borderRadius: 5,
                                spacing: 2,
                            }
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: `Employee Attendance for ${formattedDate}`,
                                display: true,
                                font: {
                                    size: 16,
                                }
                            },
                        },
                        layout: {
                            padding: 20
                        }
                    }}
                />
            </div>
            <div className="overview">
                <p className="overview-text">Overview</p>
                <div className="overview-dropdown-container">
                    <p className="overview-dropdown-text">Select Duration</p>
                    <select value={selectedMonth} onChange={handleChangeMonth} className="overview-heading-dropdown">
                        <option value="last 2 days">Last 2 days</option>
                        <option value="last 7 days">Last 7 days</option>
                        <option value="last 15 days">Last 15 days</option>
                        <option value="last 30 days">Last 30 days</option>
                    </select>
                </div>
            </div>
            <div className="data-card pie-chart">
                <Pie
                    data={{
                        labels: ["Late Hours", "Early Hours", "Overtime"],
                        datasets: [
                            {
                                data: [averageLateHour, averageEarlyLeaveHour, averageOvertime],
                                backgroundColor: ["#3D84A7", "#ABEDD8", "#46CDCF"],
                                borderColor: "transparent",
                                borderRadius: 5,
                            }
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: ['Daily Employee Attendance', 'Parameters for January, 2024'],
                                display: true,
                                font: {
                                    size: 14,
                                }
                            },
                        },
                        layout: {
                            padding: 20
                        }
                    }}
                />
            </div>
            <div className="data-card bar-chart">
                <Bar
                    data={{
                        labels: HighLow.map((data) => data.label),
                        datasets: [
                            {
                                label: "Late hours",
                                data: januaryCheckIns.map((data) => data["Late Hours (H.M)"]),
                                backgroundColor: "#3D84A7",
                                borderColor: "#3D84A7",
                            },
                            {
                                label: "Early leave hours",
                                data: januaryCheckIns.map((data) => data["Early Leave Hours (H.M)"]),
                                backgroundColor: "#46CDCF",
                                borderColor: "#46CDCF",
                            },
                            {
                                label: "Overtime",
                                data: januaryCheckIns.map((data) => data["Over Time (H.M)"]),
                                backgroundColor: "#ABEDD8",
                                borderColor: "#ABEDD8",
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Daily Employee Attendance Parameters for January, 2024",
                            },
                        },
                        layout: {
                            padding: 20
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ReactChart;
