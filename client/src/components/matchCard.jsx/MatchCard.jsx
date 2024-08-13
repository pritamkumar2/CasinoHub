import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Radio } from "lucide-react";
import { useApi } from "../../../contextApi/Api/ApiProvider";
import "./matchstyle.css";

const MatchCard = () => {
  const { matchDatas, fetchOddsData, handleNextPage, handlePreviousPage, getPaginatedOdds, currentPage, oddsData } = useApi();
  const { sportCatagory } = useParams();
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    if (matchDatas.length && sportCatagory) {
      const filtered = matchDatas.filter((match) => match.group.toLowerCase() === sportCatagory.toLowerCase());
      if (filtered.length > 0) {
        filtered.forEach(match => fetchOddsData(match.key));
      }
    }
  }, [matchDatas, sportCatagory]);

  const handleNext = (sportKey) => {
    handleNextPage(sportKey);
  };

  const handlePrevious = (sportKey) => {
    handlePreviousPage(sportKey);
  };

  const handleMatchClick = (matchId, matchkey) => {
    console.log("Selected match ID:", matchId);
    navigate(`/catagory/match/${matchId}/${matchkey}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto p-4 custom-scrollbar" style={{ height: '620px', overflowY: 'scroll' }}>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {matchDatas
          .filter(match => match.group.toLowerCase() === sportCatagory.toLowerCase())
          .filter(match => getPaginatedOdds(match.key).length > 0)
          .map((match, index) => (
            <div key={index} className="p-4 rounded-lg" onClick={console.log("yaha se id nahi melga", match)}>
              <h1>{match.id} :id</h1>
              <h2 className="text-2xl font-bold mb-2 w-full items-center flex justify-start text-indigo-500 bg-white">
                <div className="ml-3">{match.title}</div>
              </h2>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-3">
                  <p className="text-lg font-semibold text-[#e2cb47]">{match.key}</p>
                  <div className="flex flex-col text-[#c72727]">
                    <Radio />
                    <p className="text-xs">Active: {match.active ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#39d185]">Description:</p>
                  <p className="text-sm text-[#e2cb47]">{match.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#7ed85a]">Odds</h3>
                <div className="grid grid-cols-3 gap-6 ">
                  {getPaginatedOdds(match.key).map((odds, idx) => (
                    <div key={idx} className="mt-2" onClick={console.log("yaha check kro ", odds)}>
                      {odds.bookmakers.map((bookmaker, bookIdx) => (
                        <div
                          key={bookIdx}
                          className="mt-3 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 flex flex-col items-center w-72 h-48 mx-auto bg-green-300"
                          onClick={() => {
                            console.log("Match object:", match);
                            handleMatchClick(odds.id, match.key);
                          }}
                        >
                          <h1>Last update: {formatDate(bookmaker.last_update)}</h1>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col items-center">
                              <img
                                src="https://iconape.com/wp-content/png_logo_vector/avatar.png"
                                alt="Avatar"
                                className="w-16 h-16 rounded-full"
                              />
                              <span className="text-md font-medium text-purple-700">{bookmaker.title.left}</span>
                            </div>
                            <span className="text-lg font-bold mx-4">vs</span>
                            <div className="flex flex-col items-center">
                              <img
                                src="https://iconape.com/wp-content/png_logo_vector/avatar.png"
                                alt="Avatar"
                                className="w-16 h-16 rounded-full"
                              />
                              <span className="text-md font-medium text-purple-700">{bookmaker.title.right}</span>
                            </div>
                          </div>
                          <div className="flex justify-between w-full mt-4">
                            {bookmaker.markets[0].outcomes.map((outcome, outcomeIdx) => (
                              <div key={outcomeIdx} className="text-sm text-center">
                                <span className="text-green-700 font-semibold">{outcome.name}</span>
                                <div>
                                  <span className="text-red-700">{outcome.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handlePrevious(match.key)}
                    disabled={currentPage[match.key] === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg mr-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleNext(match.key)}
                    disabled={currentPage[match.key] * itemsPerPage >= (oddsData[match.key]?.length || 0)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MatchCard;
