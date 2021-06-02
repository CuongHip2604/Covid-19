import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import HighlightCard from "../HighlightCard";

function Highlight(props) {
  const reports = useSelector((state) => state.root.reports);
  const data = reports && reports.length ? reports[reports.length - 1] : [];
  const summary = [
    {
      title: "Number of infections",
      count: data.Confirmed,
      type: "confirmed",
    },
    {
      title: "Number of cured cases",
      count: data.Recovered,
      type: "recovered",
    },
    {
      title: "Number of deaths",
      count: data.Deaths,
      type: "death",
    },
  ];
  return (
    <Grid container spacing={3} style={{ marginBottom: 10 }}>
      {summary.map((item, index) => (
        <HighlightCard
          title={item.title}
          count={item.count}
          type={item.type}
          key={index}
        />
      ))}
    </Grid>
  );
}

export default Highlight;
