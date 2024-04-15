const data = [
  [[28604, 77, 1700969869, "Australia", 1990]],
  // [
  //   [44056, 81.8, 23968973, "Australia", 2015],
  //   [43294, 81.7, 35939927, "Canada", 2015],
  //   [13334, 76.9, 1376048943, "China", 2015],
  //   [21291, 78.5, 11389562, "Cuba", 2015],
  //   [38923, 80.8, 5503457, "Finland", 2015],
  //   [37599, 81.9, 64395345, "France", 2015],
  //   [44053, 81.1, 80688545, "Germany", 2015],
  //   [42182, 82.8, 329425, "Iceland", 2015],
  //   [5903, 66.8, 1311050527, "India", 2015],
  //   [36162, 83.5, 126573481, "Japan", 2015],
  //   [1390, 71.4, 25155317, "North Korea", 2015],
  //   [34644, 80.7, 50293439, "South Korea", 2015],
  //   [34186, 80.6, 4528526, "New Zealand", 2015],
  //   [64304, 81.6, 5210967, "Norway", 2015],
  //   [24787, 77.3, 38611794, "Poland", 2015],
  //   [23038, 73.13, 143456918, "Russia", 2015],
  //   [19360, 76.5, 78665830, "Turkey", 2015],
  //   [38225, 81.4, 64715810, "United Kingdom", 2015],
  //   [53354, 79.1, 321773631, "United States", 2015],
  // ],
];
export const scatterChartOptions = {
  title: {
    text: "Life Expectancy and GDP by Country",
    left: "5%",
    top: "3%",
  },
  legend: {
    right: "10%",
    top: "3%",
    data: ["1990", "2015"],
  },
  grid: {
    left: "8%",
    top: "10%",
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      name: "1990",
      data: data[0],
      type: "scatter",
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 5e2;
      },
    },
    {
      name: "2015",
      data: data[1],
      type: "scatter",
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 5e2;
      },
    },
  ],
  emphasis: {
    itemStyle: {
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
    scaleSize: 0,
  },
};
