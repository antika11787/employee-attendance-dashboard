import './index.scss';
import { ChartDataset, Chart as ChartJS, defaults, Filler } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import januaryCheckIns from '@/data/januaryCheckIns';
import Helper from '@/utils/helper';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font = {
    size: 20,
    weight: 'bold'
};
defaults.plugins.title.color = "black";

ChartJS.register(Filler);

interface CustomChartDataset extends ChartDataset<'line', number[]> {
    lineTension: number;
}

const SingleEmployeeCharts = () => {
    const { extractDates } = Helper();
    const labels = extractDates(januaryCheckIns);
    return (
        <div className="single-employee-charts">
            <div className='single-data-card work-hour'>
                <Line
                    data={{
                        labels: extractDates(januaryCheckIns),
                        datasets: [
                            {
                                label: "Worked Hours",
                                data: januaryCheckIns.map((data) => data["Worked Hours (H.M)"]),
                                backgroundColor: "rgba(71,70,109,0.3)",
                                borderColor: "#47466D",
                                lineTension: 0.5,
                                fill: true,
                            } as CustomChartDataset,
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Worked Hours",
                            },
                        },
                        layout: {
                            padding: 20,
                        },
                    }}
                />
            </div>
            <div className='single-data-card late-hour'>
                <Line
                    data={{
                        labels: extractDates(januaryCheckIns),
                        datasets: [
                            {
                                label: "Late Hours",
                                data: januaryCheckIns.map((data) => data["Late Hours (H.M)"]),
                                backgroundColor: "rgba(71,70,109,0.3)",
                                borderColor: "#47466D",
                                lineTension: 0.5,
                                fill: true,
                            } as CustomChartDataset,
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Late Hours",
                            },
                        },
                        layout: {
                            padding: 20,
                        }
                    }}
                />
            </div>
            <div className='single-data-card early-leave'>
                <Line
                    data={{
                        labels: extractDates(januaryCheckIns),
                        datasets: [
                            {
                                label: "Early Leave Hours",
                                data: januaryCheckIns.map((data) => data["Early Leave Hours (H.M)"]),
                                backgroundColor: "rgba(71,70,109,0.3)",
                                borderColor: "#47466D",
                                lineTension: 0.5,
                                fill: true,
                            } as CustomChartDataset,
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Early Leave Hours",
                            },
                        },
                        layout: {
                            padding: 20,
                        }
                    }}
                />
            </div>
            <div className='single-data-card overtime'>
                <Line
                    data={{
                        labels: extractDates(januaryCheckIns),
                        datasets: [
                            {
                                label: "Overtime",
                                data: januaryCheckIns.map((data) => data["Over Time (H.M)"]),
                                backgroundColor: "rgba(71,70,109,0.3)",
                                borderColor: "#47466D",
                                lineTension: 0.5,
                                fill: true,
                            } as CustomChartDataset,
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Overtime",
                            },
                        },
                        layout: {
                            padding: 20,
                        }
                    }}
                />
            </div>
            <div className='single-data-card overtime-vs-late'>
                <Bar
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'Overtime',
                                data: januaryCheckIns.map((data) => data["Over Time (H.M)"]),
                                backgroundColor: "#3D84A7",
                                borderColor: "transparent",
                            },
                            {
                                label: 'Late hours',
                                data: januaryCheckIns.map((data) => data["Late Hours (H.M)"]),
                                backgroundColor: "#46CDCF",
                                borderColor: "transparent",
                            },
                        ],
                    }}
                    options={{
                        indexAxis: 'x' as const,
                        elements: {
                            bar: {
                                borderWidth: 2,
                                borderRadius: 3.5
                            },
                        },
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right' as const,
                            },
                            title: {
                                display: true,
                                text: 'Overtime vs Late Hours',
                            },
                        },
                        layout: {
                            padding: 20,
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default SingleEmployeeCharts;
