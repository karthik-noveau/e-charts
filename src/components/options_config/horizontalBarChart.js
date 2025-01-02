export const horizontalBarChartOptions = {
  title: {
    text: "World Population",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: "category",
    name: "Population",
    offset: 1,
    nameLocation: "middle",
    data: [
      1932552345235234523452345234325, 234334523423452345342348,
      31334523452345452342000, 1213452234523452334594, 13423452345234513423441,
      6834523345234523445231807,
    ],

    nameTextStyle: {
      padding: [0, 0, 30, 0],
      color: "green",
    },
    axisLine: {
      show: true,
      onZero: 0,
      lineStyle: {
        // color: "red",
        width: 1,
        lineHeight: 1.64,
      },
    },
    axisTick: {
      show: true,
      length: 12,
    },
    axisLabel: {
      interval: "auto",
      margin: 15,
      overflow: "truncate",
      width: 50,
      formatter: (value) => {
        return value;
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        // color: "red",
        width: 1,
      },
    },
  },
  series: [
    {
      name: "2012",
      type: "bar",
      data: [19325, 23438, 31000, 121594, 134141, 681807],
    },
  ],
};
