// Components / hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import * as tablatureServices from "services/tablatureServices";

// MUI
import { CircularProgress } from "@mui/material";
import CardGrid from "components/CardGrid/CardGrid";

const TrendingContent = () => {
  const [trendingTablature, setTrendingTablature] = useState(null);
  const [tablatureFromRoute, setTablatureFromRoute] = useState(null);
  const { tabId } = useParams();

  useEffect(() => {
    if (trendingTablature === null) {
      tablatureServices.getTrendingTablature().then((res) => {
        setTrendingTablature(res.publicTablature);
      });
    }
  }, [trendingTablature]);

  useEffect(() => {
    if (tabId && tablatureFromRoute === null) {
      tablatureServices.getTablatureById(tabId).then((res) => {
        console.log(res);
        setTablatureFromRoute(res.tablature);
      });
    }
  }, [tabId, tablatureFromRoute]);

  return (
    <div data-testid="TrendingContent">
      {trendingTablature === null ? (
        <CircularProgress />
      ) : (
        <CardGrid 
          tablature={trendingTablature}
        />
      )}
    </div>
  );
};

export default TrendingContent;
