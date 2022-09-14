// Components / hooks
import { useEffect, useState, useRef, useCallback } from "react";
import Card from "components/Card/Card";
import { useParams } from "react-router-dom";
// import TrendingScroll from "./TrendingScroll";

// Services
import * as tablatureServices from "services/tablatureServices";

// MUI
import { CircularProgress, Grid } from "@mui/material";

const TrendingContent = () => {
  const [trendingTablature, setTrendingTablature] = useState(null);
  const [tablatureFromRoute, setTablatureFromRoute] = useState(null);
  const { tabId } = useParams();

  // const [pageNum, setPageNum] = useState(1)
  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   results,
  //   hasNextPage
  // } = TrendingScroll(pageNum)

  // const intObserver = useRef()
  // const lastTablatureRef = useCallback(tablature => {
  //   if (isLoading) return
  //   if (intObserver.current) intObserver.current.disconnect()

  //   intObserver.current = new IntersectionObserver(tablatures => {
  //     if (tablatures[0].isIntersecting && hasNextPage) {
  //       console.log('near the last tablature')
  //       setPageNum(prev => prev + 1)
  //     }
  //   })

  //   if (tablature) intObserver.current.observe(tablature)
  // }, [isLoading, hasNextPage])

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
        <Grid container spacing={2}>
          {tablatureFromRoute && (
            <Card
              key={-1}
              tabData={tablatureFromRoute}
              authorData={{
                user: tablatureFromRoute.owner.user,
                preferredUsername: tablatureFromRoute.owner.preferredUsername,
              }}
              isExpanded={true}
            />
          )}
          {trendingTablature.map((tablature, index) => {
            if (tabId === tablature._id) {
              return <></>
            }
            return (
              <Card
                key={index}
                tabData={tablature}
                // ref={lastTablatureRef}
                authorData={{
                  user: tablature.owner.user,
                  preferredUsername: tablature.owner.preferredUsername,
                }}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default TrendingContent;
