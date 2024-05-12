// import { darken } from "base/themes";

import {
  getCustomAreaDefsPattern,
  getCustomCircleNode,
  getCustomSvgDefsPattern,
  getCustomSvgPath,
} from "./svgpattern.config.js";

const PATTERN_ID = "svg-pattern";

export const getClickedName = (params, chart) => {
  let name = [];
  let series = chart.getOption().series;
  if (params.componentSubType === "scatter") {
    name = series[params.seriesIndex].name;
  } else {
    name = params.name;
  }
  return name;
};

export const getClickedColor = (params, chart) => {
  let color = "";
  if (params.data?.style) {
    color = params.data.style.backgroundColor;
  } else {
    color = params.color;
  }
  return color;
};

export const eventConfiguration = (chart) => {
  // get <svg> element
  const svgElement = chart.getZr().painter.root.firstChild.firstChild;
  let defPattern = getCustomSvgDefsPattern();
  let areaDefsPattern = getCustomAreaDefsPattern();
  svgElement.appendChild(defPattern);
  // svgElement.appendChild(areaDefsPattern);

  // Insert defPattern as the first child of svgElement
  if (svgElement.firstChild) {
    svgElement.insertBefore(defPattern, svgElement.firstChild);
  } else {
    svgElement.appendChild(defPattern);
  }

  chart.on("click", (params) => {
    // get legend, name & background color
    if (params.event.target.type !== "ec-polygon") {
      alert(getClickedName(params, chart));
    }
  });

  chart.on("mouseover", (params) => {
    let targetNode = params.event.event.target;
    console.log("over targetNode ", targetNode);
    console.log("over params ", params);

    if (targetNode.nodeName === "path") {
      let parentNode = targetNode.parentElement;
      console.log("parentNode ", parentNode);

      // getCustomSvgPath retrun the <path> element
      // returned <path> element uppend to <g>
      switch (params.componentSubType) {
        case "line": {
          if (
            targetNode.nodeName === "path" &&
            targetNode.attributes["transform"]?.nodeName === "transform"
          ) {
            // if line chart
            break;
          }
          // if area and stacked area chart
          parentNode.setAttribute("id", `area-${PATTERN_ID}`);
          let constructedPath = getCustomSvgPath(params);
          parentNode.appendChild(constructedPath);
          break;
        }
        case "scatter": {
          let parentNode = params.event.event.target.parentElement;
          parentNode && parentNode?.appendChild(getCustomCircleNode(params));
          break;
        }
        default: {
          let customPath = getCustomSvgPath(params);
          console.log("customPath", customPath);
          parentNode && parentNode?.appendChild(customPath);
        }
      }
    }
  });

  chart.on("mouseout", (params) => {
    let selectedTarget = params.event.event.target;
    // get all childs nodes inside the <g>
    let childNodes = selectedTarget.parentNode?.childNodes;

    console.log("out target ", selectedTarget);

    if (
      params.componentSubType === "line" &&
      selectedTarget.nodeName === "path" &&
      selectedTarget.attributes["transform"]?.nodeName === "transform"
    ) {
      // if line chart
      return;
    }

    if (params.componentSubType === "line") {
      // if area chart
      areaChartMouseOut(params);
      return;
    }

    // uppended <path> will be removed when mouse moved away from the <svg> context
    if (selectedTarget.nodeName === "svg") {
      const svgNodeChildList = Array.from(selectedTarget.childNodes);

      // get <g> node child elements
      let selectedNode = "";
      svgNodeChildList.forEach((svgChild) => {
        if (svgChild.nodeName === "g") {
          selectedNode = svgChild;
        }
      });

      // remove <path patter-id="svg-pattern"> element
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
      // uppended <path patter-id="svg-pattern"> node will be removed when mouse moved away from the hoverd slice
      const gNodeChildNodes = Array.from(childNodes);
      gNodeChildNodes.forEach((item) => {
        if (item.attributes?.id?.nodeValue === "svg-pattern") {
          item.parentNode.removeChild(item);
        }
      });
    }
  });
};

const areaChartMouseOut = (params) => {
  let tartgetNode = params.event.event.target;
  const svgNodeChildList = Array.from(tartgetNode.childNodes);
  // get all childs nodes inside the <g>
  if (tartgetNode.nodeName === "svg") {
    // get <g> node child elements
    let gNode = "";
    svgNodeChildList.forEach((svgChild) => {
      if (svgChild.nodeName === "g") {
        gNode = svgChild;
      }
    });
    const gNodeChildNodes = gNode.childNodes;
    let parentNode = "";
    gNodeChildNodes.forEach((item) => {
      if (item.attributes?.id?.nodeValue === "area-svg-pattern") {
        parentNode = item;
      }
    });

    if (parentNode) {
      parentNode.childNodes.forEach((child) => {
        if (child.attributes["id"]?.nodeValue === "area-svg-pattern") {
          parentNode.removeAttribute("id");
          parentNode.removeChild(child);
        }
      });
    }
  } else if (tartgetNode.nodeName === "path") {
    // uppended <path patter-id="svg-pattern"> node will be removed when mouse moved away from the hoverd slice
    const gNodeChildNodes = tartgetNode.parentNode?.parentNode.childNodes;
    let parentNode = "";
    gNodeChildNodes.forEach((item) => {
      if (item.attributes?.id?.nodeValue === "area-svg-pattern") {
        parentNode = item;
      }
    });

    if (parentNode) {
      parentNode.childNodes.forEach((child) => {
        if (child.attributes["id"]?.nodeValue === "area-svg-pattern") {
          parentNode.removeAttribute("id");
          parentNode.removeChild(child);
        }
      });
    }
  }
};
