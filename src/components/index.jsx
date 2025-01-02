import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { SVGRenderer } from "echarts/renderers";

import { eventConfiguration } from "./event.config.js";

export function EChart({ options }) {
  const uniqueId = useRef(Math.random());
  const chartInstanceRef = useRef(null);
  const onChartClicked = (data) => {
    console.log("clicked ", data);
    alert("clicked ", data);
  };

  useEffect(() => {
    echarts.use([SVGRenderer]);
    var chart = echarts.init(
      document.getElementById(`main${uniqueId.current}`),
      null,
      {
        renderer: "svg",
      }
    );
    chartInstanceRef.current = chart;
    chart.setOption(options);
    eventConfiguration(chart);

    return () => {
      chart.dispose();
    };
  }, [options]);

  useEffect(function initPatternEvents() {
    let chartEvents = {};

    const { click, mouseover, mouseout } = eventConfiguration(
      chartInstanceRef.current,
      onChartClicked
    );
    chartEvents = { click, mouseover, mouseout };
    configureEvents({ click, mouseover, mouseout }, chartInstanceRef.current);

    return () => {
      if (chartInstanceRef.current) {
        destroyEvents(
          {
            click: chartEvents.click,
            mouseover: chartEvents.mouseover,
            mouseout: chartEvents.mouseout,
          },
          chartInstanceRef.current
        );
      }
    };
  }, []);

  return (
    <div
      style={{
        minWidth: "300px",
        minHeight: "300px",
        width: "600px",
        height: "600px",
      }}
      id={`main${uniqueId.current}`}
    />
  );
}

function configureEvents(events = {}, chart) {
  const {
    click,
    dblclick,
    mousedown,
    mousemove,
    mouseup,
    mouseover,
    mouseout,
    legendselectchanged,
    datazoom,
  } = events;

  click && chart.on("click", click);
  dblclick && chart.on("dblclick", dblclick);
  mousedown && chart.on("mousedown", mousedown);
  mousemove && chart.on("mousemove", mousemove);
  mouseup && chart.on("mouseup", mouseup);
  mouseover && chart.on("mouseover", mouseover);
  mouseout && chart.on("mouseout", mouseout);
  legendselectchanged && chart.on("legendselectchanged", legendselectchanged);
  datazoom && chart.on("datazoom", datazoom);
}
function destroyEvents(events = {}, chart) {
  const {
    click,
    dblclick,
    mousedown,
    mousemove,
    mouseup,
    mouseover,
    mouseout,
    legendselectchanged,
    datazoom,
  } = events;

  click && chart.off("click", click);
  dblclick && chart.off("dblclick", dblclick);
  mousedown && chart.off("mousedown", mousedown);
  mousemove && chart.off("mousemove", mousemove);
  mouseup && chart.off("mouseup", mouseup);
  mouseover && chart.off("mouseover", mouseover);
  mouseout && chart.off("mouseout", mouseout);
  legendselectchanged && chart.off("legendselectchanged", legendselectchanged);
  datazoom && chart.off("datazoom", datazoom);
}
