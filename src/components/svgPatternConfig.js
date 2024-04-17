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

  // Create the nested SVG element
  const nestedSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  nestedSVG.setAttribute("width", "5");
  nestedSVG.setAttribute("height", "5");
  nestedSVG.setAttribute("viewBox", "0 0 100 100");

  // Create the nested group element
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("fill", "white");
  group.setAttribute("opacity", "1");

  // Create the nested path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,60 L0,160 L20,160 L20,60 Z");
  path.setAttribute("transform", "rotate(-90 0 60)");

  // Append the path to the group
  group.appendChild(path);

  // Append the group to the nested SVG
  nestedSVG.appendChild(group);

  // Append the nested SVG to the pattern
  pattern.appendChild(nestedSVG);

  // Append the pattern to the defs element
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.appendChild(pattern);
  return defs;
};

export const getCustomSvgPath = (params) => {
  let selectedPathDValue;
  if (params.componentSubType === "bar") {
    selectedPathDValue = params.event.target.__svgPathBuilder._str;
  } else {
    selectedPathDValue = params.event.event.toElement.attributes?.d?.value;
  }

  // Create a new path element
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute("d", selectedPathDValue);
  pathElement.setAttribute("id", PATTERN_ID);
  pathElement.setAttribute("fill", `url(#${PATTERN_ID})`);

  return pathElement;
};

export const getCustomCircleNode = (params) => {
  let childRect = params.event.event.target.getBoundingClientRect();

  const transformAttributeValue =
    params.event.event.target.attributes.transform.nodeValue;

  // Extract translation values from the transform attribute
  const [, , , , , horizontalTranslation, verticalTranslation] =
    transformAttributeValue
      .match(/matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/)
      .map(parseFloat);

  const svgNS = "http://www.w3.org/2000/svg";
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("r", childRect.width / 2);
  circle.setAttribute("id", PATTERN_ID);
  circle.setAttribute("cx", horizontalTranslation);
  circle.setAttribute("cy", verticalTranslation);
  circle.setAttribute("fill", "url(#svg-pattern)");

  return circle;
};
