import HighChart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));
  return {
    chart: {
      height: "500",
    },
    title: {
      text: "Total number of infections",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#f35858"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size: 10px'>{point.key}</span><table>",
      pointFormat:
        "<tr><td style='color: {series.color}; padding: 0'>{series.name}: </td>" +
        "<td style='padding: 0'><b>{point.y} Infected case</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total number of infections",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

function LineChart({ data }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    let customData = [];

    switch (reportType) {
      case "30":
        customData = data.slice(data.length - 30);
        break;
      case "7":
        customData = data.slice(data.length - 7);
        break;

      default:
        customData = data;
        break;
    }

    setOptions(generateOptions(customData));
  }, [reportType, data]);

  return (
    <div>
      <ButtonGroup
        size="small"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
        >
          All
        </Button>
        <Button
          color={reportType === "30" ? "secondary" : ""}
          onClick={() => setReportType("30")}
        >
          30 days
        </Button>
        <Button
          color={reportType === "7" ? "secondary" : ""}
          onClick={() => setReportType("7")}
        >
          7 days
        </Button>
      </ButtonGroup>
      <HighchartsReact hightcharts={HighChart} options={options} />
    </div>
  );
}

export default LineChart;
