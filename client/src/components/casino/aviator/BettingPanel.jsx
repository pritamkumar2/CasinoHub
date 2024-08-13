import React, { useState } from "react";

const BettingPanel = ({ multiplier, isRunning, onCashout }) => {
	const [bet, setBet] = useState("0.00");
	const [message, setMessage] = useState("");
	const [isPlaced, setIsPlaced] = useState(false);

	const handleBetChange = (e) => {
		setBet(e.target.value);
	};

	const placeBet = () => {
		if (isPlaced) {
			setBet("0.00");
			setIsPlaced(false);
			setMessage("");
		} else {
			const msg = `Placed a bet of ${bet}`;
			console.log(msg);
			setIsPlaced(true);
		}
	};

	const cashout = () => {
		if (isPlaced) {
			const cashoutValue = parseFloat(bet) * multiplier;
			const msg = `You cashed out ${cashoutValue.toFixed(2)} INR`;
			window.alert(msg);
			console.log(msg);
			setIsPlaced(false);
			onCashout(bet, cashoutValue);
		} else {
			setMessage("No bet placed to cash out.");
		}
	};

	return (
		<div className="flex flex-col items-center bg-gray-800 p-2 mt-2 mr-5 rounded-xl justify-center font-sans">
			<input
				className="px-5 py-6 rounded-xl mb-2 bg-black text-white font-bold text-center"
				type="text"
				pattern="[0-9]*"
				value={bet}
				onChange={handleBetChange}
				placeholder={bet}
				disabled={isRunning}
			/>
			<div className="flex gap-2">
				<button
					className={`px-10 py-3 rounded-xl border-2 shadow-md text-white font-sans ${
						isRunning
							? "bg-gray-600 border-gray-400 cursor-not-allowed"
							: "bg-lime-700 border border-lime-500"
					}`}
					onClick={placeBet}
					disabled={isRunning}
				>
					{isPlaced ? "Cancel Bet" : "Place Bet"}
				</button>
				<button
					className={`px-10 py-3 rounded-xl border-2 shadow-md text-white font-sans ${
						!isPlaced
							? "bg-gray-600 border-gray-400 cursor-not-allowed"
							: "bg-yellow-600 border border-yellow-900"
					}`}
					onClick={cashout}
					disabled={!isPlaced}
				>
					Cash Out <br />
					{(parseFloat(bet) * multiplier).toFixed(2)} INR
				</button>
			</div>
			{message && <p className="text-white mt-4">{message}</p>}
		</div>
	);
};

export default BettingPanel;
