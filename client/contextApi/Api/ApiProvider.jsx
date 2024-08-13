import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ApiContext = createContext();

const api_url = import.meta.env.VITE_THE_ODDS_API_URL;
const api_key = import.meta.env.VITE_THE_ODDS_API_KEY;

const ApiProvider = ({ children }) => {
  const [matchDatas, setMatchDatas] = useState([]);
  const [oddsData, setOddsData] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const itemsPerPage = 4;

  console.log("->>>>>>> match data ", matchDatas);
  console.log("odds data", oddsData);
  console.log("uniqueCategory", uniqueCategory);

  const fetchMatchData = async () => {
    try {
      const response = await axios.get(`${api_url}sports?apiKey=${api_key}`);
      setMatchDatas(response.data);
      console.log("Fetched match data:", response.data);

      const uniqueGroups = [...new Map(response.data.map((item) => [item.group, item])).values()];
      setUniqueCategory(uniqueGroups);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchMatchData();

    // Set up polling
    const intervalId = setInterval(fetchMatchData, 30000); // Poll every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchOddsData = async (sportKey) => {
    if (oddsData[sportKey]) {
      setCurrentPage((prevState) => ({ ...prevState, [sportKey]: 1 }));
      return;
    }

    try {
      const response = await axios.get(
        `${api_url}sports/${sportKey}/odds/?apiKey=${api_key}&regions=us&markets=h2h&oddsFormat=decimal`
      );
      setOddsData((prevState) => ({ ...prevState, [sportKey]: response.data }));
      console.log(" -------------->", response.data);
      setCurrentPage((prevState) => ({ ...prevState, [sportKey]: 1 }));
    } catch (error) {
      console.error("Error fetching odds data:", error);
    }
  };

  const handleNextPage = (sportKey) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [sportKey]: (prevState[sportKey] || 1) + 1,
    }));
  };

  const handlePreviousPage = (sportKey) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [sportKey]: Math.max((prevState[sportKey] || 1) - 1, 1),
    }));
  };

  const getPaginatedOdds = (sportKey) => {
    const page = currentPage[sportKey] || 1;
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return oddsData[sportKey]?.slice(indexOfFirstItem, indexOfLastItem) || [];
  };

  return (
    <ApiContext.Provider
      value={{
        matchDatas,
        oddsData,
        currentPage,
        uniqueCategory,
        fetchOddsData,
        handleNextPage,
        handlePreviousPage,
        getPaginatedOdds,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const apiContextValue = useContext(ApiContext);
  if (!apiContextValue) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return apiContextValue;
};

export default ApiProvider;
   
