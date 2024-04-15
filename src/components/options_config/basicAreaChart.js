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
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
      triggerLineEvent: true,
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
      triggerLineEvent: true,
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
      triggerLineEvent: true,
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      triggerLineEvent: true,
    },
  ],
};
