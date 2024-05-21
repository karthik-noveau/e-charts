export const DEF_PATTERN_ID = "custum-pattern";

export const getCustomSvgDefsPattern = () => {
  // Create the pattern element
  const pattern = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "pattern"
  );

  pattern.setAttribute("id", DEF_PATTERN_ID);
  pattern.setAttribute("x", "0");
  pattern.setAttribute("y", "0");
  pattern.setAttribute("width", "18");
  pattern.setAttribute("height", "10");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute(
    "patternTransform",
    "translate(8, 8) rotate(135) skewX(0)"
  );

  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "8");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 100 100");

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  // group.setAttribute("fill", "white");
  // group.setAttribute("opacity", "0.4");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,60 L0,160 L20,160 L20,60 Z");
  path.setAttribute("transform", "rotate(-90 0 60)");

  // Append the path inside the group
  group.appendChild(path);

  // Append the group inside the SVG
  svg.appendChild(group);

  // Append the SVG inside the pattern
  pattern.appendChild(svg);

  // Append the pattern inside the defs
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.appendChild(pattern);
  return defs;
};

export const getCustomAreaDefsPattern = () => {
  const pattern = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "pattern"
  );

  pattern.setAttribute("x", "0");
  pattern.setAttribute("y", "0");
  pattern.setAttribute("width", "8");
  pattern.setAttribute("height", "8");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("id", `${DEF_PATTERN_ID}`);
  pattern.setAttribute(
    "patternTransform",
    "translate(8, 8) rotate(135) skewX(0)"
  );

  const gNode = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M0 -7l1 0l0 4l-1 0Z");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M1 -7l1 0l0 4l-1 0Z");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M0 0l1 0l0 4l-1 0Z");

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("d", "M1 0l1 0l0 4l-1 0Z");

  gNode.appendChild(path1);
  gNode.appendChild(path2);
  gNode.appendChild(path3);
  gNode.appendChild(path4);

  pattern.appendChild(gNode);

  return pattern;
};

export const getCustomSvgPath = (params) => {
  let pathDValue = params.event.target?.__svgPathBuilder?._str;
  if (!pathDValue) return;

  // let targetNode = params.event.event.target;
  let patternID = "custum-path";

  // if (
  //   params.componentSubType === "line" &&
  //   targetNode.nodeName === "path" &&
  //   targetNode.attributes["transform"]?.nodeName !== "transform"
  // ) {
  //   patternID = `area-${DEF_PATTERN_ID}`; // if area chart
  // } else {
  //   patternID = DEF_PATTERN_ID;
  // }

  // Create a path element
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute("d", pathDValue);
  pathElement.setAttribute("id", patternID);
  pathElement.setAttribute("fill", `url(#${DEF_PATTERN_ID})`);

  let styles = params.event.target.style;
  if (styles.stroke) {
    pathElement.setAttribute("stroke", styles.stroke);
    pathElement.setAttribute("stroke-width", styles.lineWidth);
    pathElement.setAttribute("stroke-linejoin", styles.lineJoin);
  }
  return pathElement;
};

export const getCustomCircleNode = (params) => {
  // let childRect = targetNode.getBoundingClientRect();
  let pathDValue = params.event.target.transform;

  let cx = "";
  let cy = "";
  let radius = "";

  if (pathDValue) {
    const [, , , radiusValue, cxValue, cyValue] = pathDValue.map(parseFloat);
    cy = cyValue;
    cx = cxValue;
    radius = radiusValue;
  }

  const createSvg = "http://www.w3.org/2000/svg";
  const circle = document.createElementNS(createSvg, "circle");
  circle.setAttribute("r", radius);
  circle.setAttribute("id", "custum-path");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("fill", `url(#${DEF_PATTERN_ID})`);

  let styles = params.event.target.style;
  if (styles.stroke) {
    circle.setAttribute("stroke", styles.stroke);
    circle.setAttribute("stroke-width", "0.2");
    circle.setAttribute("stroke-opacity", styles.opacity);
  }
  return circle;
};
