'use client';

import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Image from "next/image";
import "./index.scss";

import sourceData from "@/data/sourceData.json";
import allData from "@/data/allData.json";

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
    return (
        <div className="home-container">
            {/* <h3 className="home-heading">Dashboard</h3> */}
            {/* <div className="info-card"> */}
            <div className="data-card params work-hour">
                <Image src={"/bar-graph.png"} alt="work" width={50} height={50} />
                <div>
                </div>
            </div>
            <div className="data-card params late-hour">
                <div className="progress">
                </div>
            </div>
            <div className="data-card params early-leave"></div>
            <div className="data-card params overtime"></div>
            {/* </div> */}
            <div className="data-card main-chart">
                <Line
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Worked hours",
                                data: allData.map((data) => data.worked_hours),
                                backgroundColor: "#47466D",
                                borderColor: "#47466D",
                            },
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
                            padding: 20,
                        }
                    }}
                />
            </div>
            <div className="data-card second-chart">
                <Doughnut
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            // {
                            //     label: "Worked hours",
                            //     data: allData.map((data) => data.worked_hours),
                            //     backgroundColor: "#47466D",
                            //     borderColor: "#47466D",
                            // },
                            // {
                            //     label: "test",
                            //     data: allData.map((data) => data.late_hours),
                            //     backgroundColor: "#3D84A7",
                            //     borderColor: "#3D84A7",
                            // },
                            // {
                            //     label: "Early leave hours",
                            //     data: allData.map((data) => data.early_leave_hours),
                            //     backgroundColor: "#46CDCF",
                            //     borderColor: "#46CDCF",
                            // },
                            {
                                label: "Overtime",
                                data: sourceData.map((data) => data.value),
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
            <div className="data-card third-chart">
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
