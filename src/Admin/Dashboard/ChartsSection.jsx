"use client";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const ChartsSection = () => {
  // Common Labels
  const labels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

  // Booking Data
  const bookingData = {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: [140, 165, 190, 215, 240, 270, 180],
        borderColor: "#4F85F6",
        backgroundColor: "#4F85F6",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  // Revenue Data
  const revenueData = {
    labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: [450000, 520000, 580000, 650000, 730000, 780000, 550000],
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const getOptions = (max, stepSize) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 14,
            family: "'Montserrat', sans-serif",
            weight: "500",
          },
          color: "#4F85F6", // Default color, overridden in labels if needed
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#101828",
        bodyColor: "#101828",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: max,
        ticks: {
          stepSize: stepSize,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Booking Growth Chart */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-[#101828] text-lg font-bold mb-6">
          Monthly Booking Growth
        </h3>
        <div className="h-72">
          <Line
            data={bookingData}
            options={{
              ...getOptions(280, 70),
              plugins: {
                ...getOptions(280, 70).plugins,
                legend: {
                  ...getOptions(280, 70).plugins.legend,
                  labels: {
                    ...getOptions(280, 70).plugins.legend.labels,
                    color: "#4F85F6",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Revenue Growth Chart */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-[#101828] text-lg font-bold mb-6">
          Revenue Growth
        </h3>
        <div className="h-72">
          <Line
            data={revenueData}
            options={{
              ...getOptions(800000, 200000),
              plugins: {
                ...getOptions(800000, 200000).plugins,
                legend: {
                  ...getOptions(800000, 200000).plugins.legend,
                  labels: {
                    ...getOptions(800000, 200000).plugins.legend.labels,
                    color: "#10B981",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
