const frame = document.querySelector("#frame");
const lastClick = document.querySelector("#last-click");
const points = [
  [1, 2],
  [2, 4],
  [6, 2],
  [9, 9],
];

const makeCircle = (point) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", Math.floor((frame.clientWidth / 10) * point[0]));
  circle.setAttribute(
    "cy",
    frame.clientHeight - Math.floor((frame.clientHeight / 10) * point[1])
  );
  circle.setAttribute("r", 10);
  circle.setAttribute("fill", "red");
  circle.setAttribute("class", "circle");
  circle.setAttribute("stroke-width", 3);
  circle.addEventListener("click", () => {
    lastClick.innerHTML = `Last point clicked: (${point[0]}, ${point[1]})`;
    if (circle.getAttribute("stroke")) {
      circle.removeAttribute("stroke");
    } else {
      circle.setAttribute("stroke", "purple");
    }
  });
  circle.addEventListener("mouseenter", () => {
    circle.setAttribute("fill", "yellow");
  });
  circle.addEventListener("mouseleave", () => {
    circle.setAttribute("fill", "red");
  });
  return circle;
};

points.forEach((point) => {
  frame.appendChild(makeCircle(point));
});

let xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxis.setAttribute("x1", 5);
xAxis.setAttribute("x2", frame.clientWidth);
xAxis.setAttribute("y1", frame.clientHeight - 10);
xAxis.setAttribute("y2", frame.clientHeight - 10);
xAxis.setAttribute("stroke", "black");
xAxis.setAttribute("stroke-width", 10);
frame.appendChild(xAxis);

let yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxis.setAttribute("x1", 0 + 10);
yAxis.setAttribute("x2", 0 + 10);
yAxis.setAttribute("y1", 0);
yAxis.setAttribute("y2", frame.clientHeight - 10);
yAxis.setAttribute("stroke", "black");
yAxis.setAttribute("stroke-width", 10);
frame.appendChild(yAxis);

// Dynamic value display
const xAxisSlider = document.querySelector("#xAxis");
const xAxisOutput = document.querySelector("#xOutput");
const yAxisSlider = document.querySelector("#yAxis");
const yAxisOutput = document.querySelector("#yOutput");
xAxisOutput.innerHTML = xAxisSlider.value;
yAxisOutput.innerHTML = yAxisSlider.value;

// Update the current slider value (each time you drag the slider handle)
xAxisSlider.oninput = (val) => {
  xAxisOutput.innerHTML = val.target.value;
};
yAxisSlider.oninput = (val) => {
  yAxisOutput.innerHTML = val.target.value;
};

const addPoint = () => {
  const newCircle = makeCircle([xAxisSlider.value, yAxisSlider.value]);
  frame.appendChild(newCircle);
};
