import React, { useState, useEffect } from 'react';
import './slots.css';

const Slots = () => {
    const [spin, setSpin] = useState(false);
    const [ring1, setRing1] = useState();
    const [ring2, setRing2] = useState();
    const [ring3, setRing3] = useState();
    const [price, setPrice] = useState();
    const [input, setInput] = useState();
    const [realBet, setRealBet] = useState();
    const [jackpot, setJackpot] = useState(0);
    const [balance, setBalance] = useState(100000);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (ring3 !== undefined) {
            win();
            setSpin(false); // Allow the user to spin again immediately
            setShowResult(true);
            // Hide result after 5 seconds
            // Change this value to adjust the result display time
            setTimeout(() => {
                setShowResult(false);
            }, 5000);
        }
    }, [ring3]);

    const row = (ring) => {
        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            );
        } else if (spin && ring === undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🥭</div>
                </>
            );
        } else if (ring >= 1 && ring <= 50) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            );
        } else if (ring > 50 && ring <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            );
        } else if (ring > 75 && ring <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            );
        } else if (ring > 95 && ring <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            );
        }
    };

    const rand = () => {
        setRing1(Math.floor(Math.random() * 100) + 1);
        setTimeout(() => setRing2(Math.floor(Math.random() * 100) + 1), 1000);
        setTimeout(() => setRing3(Math.floor(Math.random() * 100) + 1), 2000);
    };

    const play = () => {
        if (!spin) {
            if (input <= balance && input >= 1) {
                setRealBet(input);
                setSpin(true);
                setShowResult(false);
                setRing1(undefined);
                setRing2(undefined);
                setRing3(undefined);
                setBalance(balance - input);
                setJackpot(jackpot + input / 2);
                setTimeout(rand, 2000);
            } else {
                setPrice(10);
                setShowResult(true);
                setTimeout(() => setShowResult(false), 5000); // Show insufficient funds message for 5 seconds
            }
        }
    };

    const win = () => {
        if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50) {
            setPrice(1);
            setBalance(balance + realBet * 15);
        } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75) {
            setPrice(2);
            setBalance(balance + realBet * 20);
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95) {
            setPrice(3);
            setBalance(balance + realBet * 25);
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100) {
            setPrice(4);
            setBalance(balance + jackpot);
            setJackpot(0);
        } else {
            setPrice(0);
        }
    };

    const premio = () => {
        if (price === 1) {
            return <p className="priceInd">{"🍇 X15 You've won " + realBet * 15 + "€!"}</p>;
        } else if (price === 2) {
            return <p className="priceInd">{"🍊 X20 You've won " + realBet * 20 + "€!"}</p>;
        } else if (price === 3) {
            return <p className="priceInd">{"🥭 X25 You've won " + realBet * 25 + "€!"}</p>;
        } else if (price === 4) {
            return <p className="priceInd">{"🍓 Jackpot! You've won: " + jackpot + "€!"}</p>;
        } else if (price === 0) {
            return <p className="priceInd">😧 ¡So close! But no luck...</p>;
        } else if (price === 10) {
            return <p className="priceInd">🥶 <span style={{ color: 'red' }}>Not enough funds</span></p>;
        }
    };

    const numChecker = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]+$/;
        if (value.match(regex) && parseInt(value) >= 0 || value === "") {
            setInput(value);
        }
    };

    return (
      <div className=' main-slots'>
        <div className="fullSlot">
            <h1 className="casinoName">casino melody vibe </h1>
            <h1 className="price">{"Jackpot: " + jackpot + "€"}</h1>
            <div className="slot">
                <div className="row">{row(ring1)}</div>
                <div className="row">{row(ring2)}</div>
                <div className="row">{row(ring3)}</div>
            </div>
            {showResult && <h1 className="price">{premio()}</h1>}
            <div className="slotFoot">
                <input
                    value={input}
                    type="number"
                    onChange={numChecker}
                    className="betInput"
                    placeholder="0€"
                />
                <button className="spinButton" onClick={play} disabled={spin}>Spin</button>
            </div>
            <h1 className="price">{"Available cash: " + (balance / 100).toFixed(2) + "€"}</h1>
            <button onClick={() => setBalance(balance + 1000)} className="buyMoreButton">Add 1000 €</button>
        </div></div>
    );
};

export default Slots;
