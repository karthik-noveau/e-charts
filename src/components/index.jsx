import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { SVGRenderer } from "echarts/renderers";

import {
  getCustomSvgPath,
  getCustomSvgDefsPattern,
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

    // uppend the defs pattern to dom <svg> node
    const svgElement = myChart.getZr().painter.root.firstChild.firstChild;
    svgElement.appendChild(getCustomSvgDefsPattern());

    myChart.on("click", function (params) {
      alert(params.name);
      console.log("onclick", params);
    });

    myChart.on("mouseover", function (params) {
      switch (params.componentSubType) {
        case "line": {
          let parentNode = params.event.event.target.parentElement;
          if (parentNode.attributes["clip-path"]?.nodeName === "clip-path") {
            console.log("mouser over parantNode", parentNode);
            parentNode.appendChild(getCustomSvgPath(params));
          }

          break;
        }
        case "scatter": {
          let parentNode = params.event.event.target.parentElement;
          let parentRect =
            params.event.event.target.parentElement.getBoundingClientRect();
          let childRect = params.event.event.target.getBoundingClientRect();

          const transformAttributeValue =
            params.event.event.target.attributes.transform.nodeValue;
          console.log(transformAttributeValue);

          // Extract translation values from the transform attribute
          const [, , , , , horizontalTranslation, verticalTranslation] =
            transformAttributeValue
              .match(
                /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/
              )
              .map(parseFloat);

          console.log("Horizontal Translation:", horizontalTranslation);
          console.log("Vertical Translation:", verticalTranslation);

          const svgNS = "http://www.w3.org/2000/svg";
          const circle = document.createElementNS(svgNS, "circle");
          circle.setAttribute("r", childRect.width / 2);
          circle.setAttribute("cx", horizontalTranslation);
          circle.setAttribute("cy", verticalTranslation);
          circle.setAttribute("fill", "url(#svg-pattern)");

          parentNode.appendChild(circle);

          break;
        }
        default: {
          console.log("default", params);
          // uppend the path to <g> node
          let parentNode = params.event.event.target.parentElement;
          parentNode && parentNode.appendChild(getCustomSvgPath(params));
        }
      }
    });

    myChart.on("mouseout", function (params) {
      let selectedTarget = params.event.event.target;
      let childNodes = selectedTarget.parentNode.childNodes;

      console.log("mouseout target node", selectedTarget);

      if (selectedTarget.nodeName === "svg") {
        const childNodeList = Array.from(selectedTarget.childNodes);
        childNodeList.forEach((item) => {
          if (item.nodeName === "g") {
            let childNodeList = item.childNodes;
            childNodeList.forEach((item) => {
              if (item.attributes?.id?.nodeValue === "svg-pattern") {
                item.parentNode.removeChild(item);
              }
            });
          }
        });
      } else {
        const childNodeList = Array.from(childNodes);
        childNodeList.forEach((item) => {
          if (item.attributes?.id?.nodeValue === "svg-pattern") {
            item.parentNode.removeChild(item);
          }
        });
      }
    });

    myChart.setOption(options);

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
