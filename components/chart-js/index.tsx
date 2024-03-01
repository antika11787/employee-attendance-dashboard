'use client';

import Image from "next/image";
import { useEffect } from "react";
import {
  Chart,
  LinearScale,
  BarController,
  DoughnutController,
  ArcElement,
  BarElement,
  CategoryScale,
  defaults
} from 'chart.js';
import {
  Bar
} from 'react-chartjs-2';
// import Chart from "chart.js/auto";
import sourceData from "@/data/sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const ChartJS = () => {
  useEffect(() => {
    // Create the chart
    Chart.register(LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement);

    const mainChartCanvas = document.getElementById("main-chart") as HTMLCanvasElement;
    const secondChartCanvas = document.getElementById("second-chart") as HTMLCanvasElement;
    const thirdChartCanvas = document.getElementById("third-chart") as HTMLCanvasElement;

    const canvasArray = [mainChartCanvas, secondChartCanvas, thirdChartCanvas];
    const existingCharts = canvasArray.map(canvas => Chart.getChart(canvas));
    existingCharts.forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });

    new Chart(mainChartCanvas, {
      type: "bar",
      data: {
        labels: sourceData.map((data) => data.label),
        datasets: [
          {
            label: "aaaaaa",
            data: sourceData.map((data) => data.value),
            backgroundColor: "rgba(54, 162, 235, 0.2)"
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 10
          }
        },
        indexAxis: "x",
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false
            }
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    new Chart(secondChartCanvas, {
      type: "doughnut",
      data: {
        labels: sourceData.map((data) => data.label),
        datasets: [
          {
            label: "aaaaaa",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            backgroundColor: "rgba(54, 162, 235, 0.2)"
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 10
          }
        },
        indexAxis: "x",
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false
            }
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

  }, []);

  return (
    <div className="home-container">
      <div className="main-chart-container">
        <canvas id="main-chart" className="chart-canvas" width="400" height="400"></canvas>
      </div>
      <div className="second-chart-container">
        <canvas id="second-chart" className="chart-canvas" width="400" height="400"></canvas>
      </div>
      <div className="third-chart"></div>
    </div>
  );
}

export default ChartJS;
