export const basicAreaChart = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
      triggerLineEvent: true,
    },
  ],
  tooltip: {
    // Add the tooltip configuration
    trigger: "axis", // Trigger tooltip on axis hover
    // axisPointer: {
    //   // Customize axis pointer appearance
    //   type: "shadow", // Use a subtle shadow effect
    //   shadowStyle: {
    //     color: "rgba(0, 0, 0, 0.1)", // Set a light gray shadow color
    //   },
    // },
    formatter: function (params) {
      // Customize tooltip content
      let tooltipContent = "";

      // Iterate through each data series in the tooltip
      params.forEach((param) => {
        tooltipContent += `${param.seriesName}: ${param.value}<br>`;
      });

      return tooltipContent; // Return the formatted tooltip string
    },
  },
};
