import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import HighMap from "../Charts/HighMap";
import LineChart from "../Charts/LineChart";

function Summary(props) {
  const reports = useSelector((state) => state.root.reports);
  const countryMap = useSelector((state) => state.root.countryMap);

  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        <LineChart data={reports} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <HighMap mapData={countryMap} />
      </Grid>
    </Grid>
  );
}

export default Summary;
