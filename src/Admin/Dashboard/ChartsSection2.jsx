"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ChartsSection2 = () => {
  const data = {
    labels: [
      "Premium Car",
      "City Drive",
      "Luxury Auto",
      "Elite Vehicles",
      "Quick Rent",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [450000, 320000, 280000, 380000, 150000],
        backgroundColor: "#9361FF", // Purple color matching image
        borderRadius: 4,
        barThickness: 120,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
          font: {
            size: 16,
            family: "'Montserrat', sans-serif",
            weight: "600",
          },
          color: "#9361FF",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#101828",
        bodyColor: "#101828",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 600000,
        ticks: {
          stepSize: 150000,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="w-full mb-10">
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-[#101828] text-xl font-bold mb-8">
          Agency Performance Comparison
        </h3>
        <div className="h-80">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection2;
