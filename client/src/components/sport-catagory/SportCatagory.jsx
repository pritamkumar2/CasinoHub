import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryBar from "../categoryBar.jsx/CategoryBar";
import MatchCard from "../matchCard.jsx/MatchCard";
import { useApi } from "../../../contextApi/Api/ApiProvider";

export default function SportCategory() {
  const { uniqueCategory } = useApi();
  const paramsdata = useParams();

  useEffect(() => {
    console.log("Unique category:", uniqueCategory);
  }, [uniqueCategory]);

  return (
    <div>
      <CategoryBar uniquCategory={uniqueCategory}></CategoryBar>
      <MatchCard></MatchCard>
    </div>
  );
}
