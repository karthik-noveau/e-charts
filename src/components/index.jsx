import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { SVGRenderer } from "echarts/renderers";

import {
  getCustomSvgPath,
  getCustomSvgDefsPattern,
  getCustomCircleNode,
} from "./svgPatternConfig.js";

export function EChart({ options }) {
  const uniqueId = useRef(Math.random());

  useEffect(() => {
    echarts.use([SVGRenderer]);

    var myChart = echarts.init(
      document.getElementById(`main${uniqueId.current}`),
      null,
      {
        renderer: "svg",
      }
    );

    myChart.setOption(options);

    // uppend the defs pattern to dom <svg> node
    const svgElement = myChart.getZr().painter.root.firstChild.firstChild;
    svgElement.appendChild(getCustomSvgDefsPattern());

    myChart.on("click", function (params) {
      alert(params.name);
      console.log("onclick", params);
    });

    myChart.on("mouseover", function (params) {
      let a = myChart.getOption().series[params.seriesIndex].areaStyle;
      console.log(
        "areaStyle ",
        myChart.getOption().series[params.seriesIndex].areaStyle
      );
      switch (params.componentSubType) {
        case "line": {
          if (a) {
            let targetNode = params.event.event.target;
            console.log("targetNode", targetNode);
            let parentNode = targetNode.parentElement;
            if (parentNode?.attributes["clip-path"]?.nodeName === "clip-path") {
              let path = getCustomSvgPath(params);
              parentNode.appendChild(path);
            }
            if (targetNode.nodeName === "path") {
              return targetNode;
            }
          }
          break;
        }
        case "scatter": {
          let parentNode = params.event.event.target.parentElement;
          parentNode.appendChild(getCustomCircleNode(params));
          break;
        }
        default: {
          // uppend the path to <g> node
          let parentNode = params.event.event.target.parentElement;
          parentNode && parentNode.appendChild(getCustomSvgPath(params));
        }
      }
    });

    myChart.on("mouseout", function (params) {
      let selectedTarget = params.event.event.target;

      if (selectedTarget.nodeName === "svg") {
        const svgNodeChildList = Array.from(selectedTarget.childNodes);

        let selectedNode = "";
        svgNodeChildList.forEach((svgChild) => {
          if (svgChild.nodeName === "g") {
            selectedNode = svgChild;
          }
        });

        selectedNode.childNodes.forEach((node) => {
          if (
            params.componentSubType === "scatter" &&
            node.nodeName === "circle"
          ) {
            if (node.attributes.id.nodeValue === "svg-pattern") {
              selectedNode.removeChild(node);
            }
          } else if (node.attributes?.id?.nodeValue === "svg-pattern") {
            node.parentNode.removeChild(node);
          }
        });
      } else {
        const gNodeChildList = Array.from(selectedTarget.parentNode.childNodes);
        gNodeChildList.forEach((item) => {
          if (item.attributes?.id?.nodeValue === "svg-pattern") {
            item.parentNode.removeChild(item);
          }
        });
      }
    });

    return () => {
      myChart.dispose();
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
