import React from "react";

const History = ({ history }) => {
	return (
		<div className="font-sans rounded-xl bg-gray-800 p-4 text-center mx-2">
			<h1 className="text-white text-2xl font-bold ">History</h1>
			<ul className="text-white">
				{history.map((multiplier, index) => (
					<li key={index}>x{multiplier}</li>
				))}
			</ul>
		</div>
	);
};

export default History;
