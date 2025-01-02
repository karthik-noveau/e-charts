import {
  getCustomAreaDefsPattern,
  getCustomCircleNode,
  getCustomSvgDefsPattern,
  getCustomSvgPath,
  DEF_PATTERN_ID,
} from "./svgpattern.config.js";

export function rgbToHex(rgba) {
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbaValues = rgba.match(/\d+/g).map(Number);

  const red = toHex(rgbaValues[0]).toUpperCase();
  const green = toHex(rgbaValues[1]).toUpperCase();
  const blue = toHex(rgbaValues[2]);
  const hexValue = `#${red}${green}${blue}`.toUpperCase();

  return hexValue;
}

function hexToRgbValues(hex) {
  hex = hex.replace(/^#/, "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r, g, b };
}

function isDarkColor(r, g, b) {
  // Note : if luminance value is low, color will be more dark
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  // A threshold valueb etween 0 and 255
  return luminance < 85;
}

function darkenColor(r, g, b, percentage) {
  // Decrease each color component by the given percentage
  r = Math.max(0, r - r * (percentage / 100));
  g = Math.max(0, g - g * (percentage / 100));
  b = Math.max(0, b - b * (percentage / 100));

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function getPatternColor(color) {
  let { r, g, b } = hexToRgbValues(color);

  // Check if the color is dark
  if (isDarkColor(r, g, b)) {
    return "rgb(255 255 255 / 70%)";
  } else {
    // Darken the color if it is not dark
    const darkeningPercentage = 30;
    const darkenedColor = darkenColor(r, g, b, darkeningPercentage);
    return `rgb(${darkenedColor.r} ${darkenedColor.g} ${darkenedColor.b})`;
  }
}

const getColumnData = (params, chart) => {
  let data = [];
  let series = chart.getOption().series;

  if (params.componentSubType === "scatter") {
    data.push(series[params.seriesIndex].name);
  } else {
    data.push(params.name);
  }
  return data;
};

const getValueData = (params) => {
  let data = [];
  if (params?.data?.value) {
    data.push(params.data.value);
  }
  if (params.componentSubType === "scatter" && params.data) {
    data.push(...params.data);
  }
  return data;
};

const getRowData = (params, rows) => {
  let data = [];
  if (rows && rows.length) {
    data.push(params?.seriesName);
  }
  return data;
};

export const getClickedColor = (params) => {
  let color = "";
  if (params.data?.style) {
    color = params.data.style.backgroundColor;
  } else if (params.event.target?.style?.fill) {
    color = params.event.target.style.fill;
  } else {
    color = params.color;
  }
  return color;
};

export const eventConfiguration = (chart, onChartClicked, rows) => {
  const click = (params) => {
    if (
      (params.componentSubType === "line" &&
        params.event.target.type === "ec-polygon") ||
      params.event.event.target.nodeName === "text"
    ) {
      return;
    }

    // get legend value & background color from onClick
    let data = {
      ColumnData: getColumnData(params, chart),
      ValueData: getValueData(params),
      RowData: getRowData(params, rows),
      BgColor: getClickedColor(params),
    };

    let svgElement = chart.getZr().painter.root.firstChild.firstChild;
    //remove create path node
    if (svgElement.getElementById("custum-path")) {
      svgElement.getElementById("custum-path").remove();
    }

    // remove create def pattern
    if (svgElement.getElementById(DEF_PATTERN_ID)) {
      if (params.componentSubType === "line") {
        svgElement.getElementById(DEF_PATTERN_ID).remove();
      }
      if (svgElement.getElementById(DEF_PATTERN_ID)?.parentNode) {
        svgElement.getElementById(DEF_PATTERN_ID).parentNode.remove();
      }
    }
    onChartClicked(data);
  };

  const mouseover = (params) => {
    let chartDefPattern = getCustomSvgDefsPattern();
    let areaDefsPattern = getCustomAreaDefsPattern();
    // if line chart, don't apply the pattern
    if (
      !(
        params.componentSubType !== "scatter" &&
        params.event.target?.shape?.symbolType === "circle"
      )
    ) {
      // get modified color for pattern
      let currentColor = getClickedColor(params);
      if (currentColor.includes("rgba")) {
        currentColor = rgbToHex(currentColor);
      }
      let modifiedColor = getPatternColor(currentColor);

      let targetNode = params.event.event.target;
      let parentNode = targetNode.parentElement;
      let gNode = null;
      let constructedPath = null;
      let defNode = null;
      let defsPattern =
        params.componentSubType === "line" ? areaDefsPattern : chartDefPattern;

      if (!["svg", "path"].includes(targetNode.nodeName)) return;
      let svgElement = chart.getZr().painter.root.firstChild.firstChild;

      // append defs pattern to SVG Node
      if (svgElement && !svgElement.getElementById("custum-pattern")) {
        svgElement.appendChild(defsPattern);
      }
      if (
        params.componentSubType === "line" &&
        svgElement.getElementById("custum-pattern")
      ) {
        let patternIdPath = svgElement.getElementById("custum-pattern");
        const paths = patternIdPath.querySelectorAll("path");
        paths.forEach((path) => {
          path.setAttribute("fill", modifiedColor);
        });
      } else {
        defNode = svgElement.getElementById(DEF_PATTERN_ID).querySelector("g");
        defNode.setAttribute("fill", modifiedColor);
      }

      // get childNodes of SVG
      if (targetNode.nodeName === "svg") {
        let svgChildNodes = targetNode.childNodes;
        svgChildNodes.forEach((svgChild) => {
          if (svgChild.nodeName === "g") {
            gNode = svgChild;
          }
        });
      }

      switch (params.componentSubType) {
        case "line": {
          // if area and stacked area chart
          constructedPath = getCustomSvgPath(params);
          if (
            params.event.target?.shape?.symbolType !== "circle" &&
            targetNode.nodeName === "path" &&
            !targetNode.attributes?.["stroke-linecap"]
          ) {
            parentNode && parentNode?.appendChild(constructedPath);
          }
          if (
            params.event.target?.shape?.symbolType !== "circle" &&
            targetNode.nodeName === "g" &&
            targetNode.attributes?.["clip-path"]
          ) {
            targetNode.appendChild(constructedPath);
          }
          if (targetNode.nodeName === "svg") {
            let dValue = params.event.target?.__svgPathBuilder?._str;
            gNode.childNodes.forEach((node) => {
              if (
                node.childNodes[0]?.nodeName === "path" &&
                node.childNodes[0]?.attributes?.d?.nodeValue === dValue
              ) {
                node.insertBefore(constructedPath, node.firstChild);
              }
            });
          }
          break;
        }
        case "scatter": {
          if (targetNode.nodeName === "path") {
            parentNode && parentNode?.appendChild(getCustomCircleNode(params));
          }
          if (targetNode.nodeName === "svg") {
            gNode.appendChild(getCustomCircleNode(params));
          }
          break;
        }
        default: {
          constructedPath = getCustomSvgPath(params);
          if (targetNode.nodeName === "path") {
            parentNode && parentNode?.appendChild(constructedPath);
          }
          if (targetNode.nodeName === "svg") {
            gNode.appendChild(constructedPath);
          }
        }
      }
    }
  };

  const mouseout = (params) => {
    let svgElement = chart.getZr().painter.root.firstChild.firstChild;
    //remove create path node
    if (svgElement.getElementById("custum-path")) {
      svgElement.getElementById("custum-path").remove();
    }

    // remove create def pattern
    if (svgElement.getElementById(DEF_PATTERN_ID)) {
      if (params.componentSubType === "line") {
        svgElement.getElementById(DEF_PATTERN_ID).remove();
      }
      if (svgElement.getElementById(DEF_PATTERN_ID)?.parentNode) {
        svgElement.getElementById(DEF_PATTERN_ID).parentNode.remove();
      }
    }
  };

  return { click, mouseover, mouseout };
};
