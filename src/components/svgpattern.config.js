const PATTERN_ID = "svg-pattern";

export const getCustomSvgDefsPattern = () => {
  // Create the pattern element
  const pattern = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "pattern"
  );

  pattern.setAttribute("id", PATTERN_ID);
  pattern.setAttribute("x", "0");
  pattern.setAttribute("y", "0");
  pattern.setAttribute("width", "8");
  pattern.setAttribute("height", "8");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute(
    "patternTransform",
    "translate(8, 8) rotate(135) skewX(0)"
  );

  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "5");
  svg.setAttribute("height", "5");
  svg.setAttribute("viewBox", "0 0 100 100");

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("fill", "rgb(0,0,0)");
  group.setAttribute("opacity", "0.4");

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
  pattern.setAttribute("id", `area-${PATTERN_ID}`);
  pattern.setAttribute(
    "patternTransform",
    "translate(8, 8) rotate(135) skewX(0)"
  );

  const gNode = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M0 -7l1 0l0 4l-1 0Z");
  path1.setAttribute("fill", "rgb(0,0,0)");
  path1.setAttribute("fill-opacity", "0.4");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M1 -7l1 0l0 4l-1 0Z");
  path2.setAttribute("fill", "rgb(0,0,0)");
  path2.setAttribute("fill-opacity", "0.4");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M0 0l1 0l0 4l-1 0Z");
  path3.setAttribute("fill", "rgb(0,0,0)");
  path3.setAttribute("fill-opacity", "0.4");

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("d", "M1 0l1 0l0 4l-1 0Z");
  path4.setAttribute("fill", "rgb(0,0,0)");
  path4.setAttribute("fill-opacity", "0.4");

  gNode.appendChild(path1);
  gNode.appendChild(path2);
  gNode.appendChild(path3);
  gNode.appendChild(path4);

  pattern.appendChild(gNode);

  return pattern;
};

export const getCustomSvgPath = (params) => {
  // get D value of PATH
  let selectedPathDValue;
  if (params.componentSubType === "bar") {
    selectedPathDValue = params.event.target.__svgPathBuilder._str;
  } else {
    selectedPathDValue = params.event.target.__svgPathBuilder._str;
  }

  // construct pattern ID
  let targetNode = params.event.event.target;
  let patternID = "";
  if (
    params.componentSubType === "line" &&
    targetNode.nodeName === "path" &&
    targetNode.attributes["transform"]?.nodeName !== "transform"
  ) {
    patternID = `area-${PATTERN_ID}`;
  } else {
    patternID = PATTERN_ID;
  }

  // Create a path element
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute("d", selectedPathDValue);
  pathElement.setAttribute("id", patternID);
  pathElement.setAttribute("fill", `url(#${patternID})`);

  return pathElement;
};

export const getCustomCircleNode = (params) => {
  let childRect = params.event.event.target.getBoundingClientRect();

  const transformAttributeValue =
    params.event.event.target.attributes.transform?.nodeValue;

  // Extract translation values from the transform attribute

  const matchResult =
    transformAttributeValue &&
    transformAttributeValue.match(
      /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/
    );
  let horizontalTranslationValue = "";
  let verticalTranslationValue = "";
  if (matchResult) {
    const [, , , , , horizontalTranslation, verticalTranslation] =
      matchResult.map(parseFloat);
    verticalTranslationValue = verticalTranslation;
    horizontalTranslationValue = horizontalTranslation;
  }

  const svgNS = "http://www.w3.org/2000/svg";
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("r", childRect.width / 2);
  circle.setAttribute("id", PATTERN_ID);
  circle.setAttribute("cx", horizontalTranslationValue);
  circle.setAttribute("cy", verticalTranslationValue);
  circle.setAttribute("fill", "url(#svg-pattern)");

  return circle;
};
