import React, { useEffect, useRef, useState } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";

// load highcharts module
highchartMap(Highchart);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#ffc4aa"],
      [0.4, "#ff8a66"],
      [0.6, "#ff392b"],
      [0.8, "#b71525"],
      [1, "#7a0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Population",
      joinBy: ["hc-key", "key"],
    },
  ],
};

function HighMap({ mapData }) {
  const [options, setoptions] = useState({});
  const chartRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));

      setoptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: fakeData,
          },
        ],
      });

      if (!loaded) setLoaded(true);
    }
  }, [mapData, loaded]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [mapData]);

  if (!loaded) return null;

  return (
    <HighchartsReact
      Highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={chartRef}
    />
  );
}

export default HighMap;
