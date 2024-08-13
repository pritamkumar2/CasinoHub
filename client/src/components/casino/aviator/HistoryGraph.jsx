import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend
);

const HistoryGraph = ({ history }) => {
	console.log("i am history",history)
	const data = {
		labels: history.map((_, index) => `Game ${index + 1}`),
		datasets: [
			{
				label: "Multiplier Display",
				data: history,
				borderColor: "rgb(253, 0, 0)",
				backgroundColor: "rgb(152, 25, 52)",
				lineColour: "white",
				fill: true,
			},
		],
	};

	const options = {
		scales: {
			x: { beginAtZero: true, grid: { color: "rgb(255,255,255)" } },
			y: { beginAtZero: true, grid: { color: "white" } },
		},
	};

	return (
		<div className="pt-4 pl-2">
			<Line data={data} options={options} />
		</div>
	);
};

export default HistoryGraph;
