import { EChart } from "./components";
import { basicAreaChart } from "./components/options_config/basicAreaChart";
import { DoughnutChartOptions } from "./components/options_config/doughnutChart";
import { horizontalBarChartOptions } from "./components/options_config/horizontalBarChart";
import { lineChartOptions } from "./components/options_config/lineChart";
import { pieChartOptions } from "./components/options_config/pieChart";
import { scatterChartOptions } from "./components/options_config/scatterChart";
import { stackedAreaChartOptions } from "./components/options_config/stackedAreaChart";
import { stackedVerticalBarChartOptions } from "./components/options_config/stackedVerticalBarChart";
import { verticalBarChartOptions } from "./components/options_config/verticalBarChart";

import "./components/styles.css";

function App() {
  return (
    <div className="mainContainer">
      <EChart options={pieChartOptions} />
      <EChart options={DoughnutChartOptions} />
      <EChart options={verticalBarChartOptions} />
      <EChart options={horizontalBarChartOptions} />
      <EChart options={stackedVerticalBarChartOptions} />
      <EChart options={lineChartOptions} />
      <EChart options={scatterChartOptions} />
      <EChart
        options={{
          ...basicAreaChart,
        }}
      />
      <EChart
        options={{
          // aria: {
          //   enabled: true,
          //   decal: {
          //     show: true,
          //   },
          // },
          ...stackedAreaChartOptions,
        }}
      />
    </div>
  );
}

export default App;
