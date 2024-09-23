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

// Chart.jsに必要なスケールやエレメントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const hoursAndMinutes = [65, 59, 20, 81, 56, 55, 40]; // サンプルデータ(分)
  const formattedLabels = hoursAndMinutes.map((minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}m`;
  });

  const data = {
    labels: formattedLabels, // フォーマットされたラベルを使用
    datasets: [
      {
        label: "学習時間",
        data: hoursAndMinutes, // 分のデータを使用
        backgroundColor: "rgba(243, 244, 246, 1)",
        borderColor: "rgba(132, 204, 22, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total study time (min)",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
