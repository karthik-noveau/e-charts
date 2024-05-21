import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { SVGRenderer } from "echarts/renderers";

import { eventConfiguration } from "./event.config.js";

export function EChart({ options }) {
  const uniqueId = useRef(Math.random());

  useEffect(() => {
    echarts.use([SVGRenderer]);
    var chart = echarts.init(
      document.getElementById(`main${uniqueId.current}`),
      null,
      {
        renderer: "svg",
      }
    );
    chart.setOption(options);
    eventConfiguration(chart);

    return () => {
      chart.dispose();
    };
  }, [options]);

  return (
    <div>
      <div
        style={{ width: "900px", height: "900px" }}
        id={`main${uniqueId.current}`}
      />
    </div>
  );
}
