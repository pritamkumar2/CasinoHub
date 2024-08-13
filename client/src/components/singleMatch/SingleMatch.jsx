import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom';

const SingleMatch = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const data = useParams();

  useEffect(() => {
    const fetchMatchData = async () => {
      console.log("i am data ", data);
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${data.sports}/events/${data.id}/odds?apiKey=1506a8b0c02bfa5c495e19f8d0b9d7c3&regions=us&markets=player_pass_tds%2Calternate_spreads&dateFormat=iso&oddsFormat=decimal`);
        setMatchData(response.data);
        console.log("i am data ", response.data);
      } catch (error) {
        setError('Error fetching match data');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [data.sports, data.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate remaining time
  const commenceTime = new Date(matchData.commence_time).getTime();
  const currentTime = Date.now();
  const timeLeft = commenceTime - currentTime;

  return (
    <div className='text-white'>
      <h1>Match Odds</h1>
      <Countdown date={commenceTime} />
      {matchData.bookmakers.map((bookmaker) => (
        <div key={bookmaker.key} className="bookmaker" id={bookmaker.key}>
          <h2>{bookmaker.title}</h2>
          {bookmaker.markets.map((market) => (
            <div key={market.key} className="market">
              <h3>{market.title}</h3>
              <p>Last Update: {market.last_update}</p>
              <div className="outcomes">
                {market.outcomes.map((outcome) => (
                  <p key={outcome.name}>
                    {outcome.name} - Point: {outcome.point}, Price: {outcome.price}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SingleMatch;
