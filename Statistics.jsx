import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import "./style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Statistics({ receipts }) {
  // Группировка по месяцам (для столбчатой диаграммы)
  const monthlyTotals = {};
  receipts.forEach(({ date, amount }) => {
    const month = new Date(date).toLocaleString("default", {
      year: "numeric",
      month: "short",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
  });

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Расходы по месяцам",
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // Группировка по категориям (для круговой диаграммы)
  const categoryTotals = {};
  receipts.forEach(({ category, amount }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="statistics-container">
      <h3>Статистика расходов</h3>
      <div className="chart-bar">
        <Bar data={barData} />
      </div>
      <div className="chart-pie">
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Statistics;

