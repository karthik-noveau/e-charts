import { EChart } from "./components";

import { basicAreaChart } from "./components/options_config/basicAreaChart";
import { scatterChartOptions } from "./components/options_config/scatterChart";
import { stackedAreaChartOptions } from "./components/options_config/stackedAreaChart";
import { pieChartOptions } from "./components/options_config/pieChart";
import { DoughnutChartOptions } from "./components/options_config/doughnutChart";

import "./components/styles.css";
import { horizontalBarChartOptions } from "./components/options_config/horizontalBarChart";
import { verticalBarChartOptions } from "./components/options_config/verticalBarChart";
import { stackedVerticalBarChartOptions } from "./components/options_config/stackedVerticalBarChart";
import { lineChartOptions } from "./components/options_config/lineChart";

function App() {
  return (
    <div className="mainContainer">
      <EChart options={pieChartOptions} />
      {/* <EChart options={DoughnutChartOptions} /> */}
      {/* <EChart options={scatterChartOptions} /> */}
      {/* <EChart options={horizontalBarChartOptions} /> */}
      {/* <EChart options={verticalBarChartOptions} /> */}
      {/* <EChart options={stackedVerticalBarChartOptions} /> */}

      {/* <EChart options={lineChartOptions} />  */}

      {/* <EChart options={basicAreaChart} /> */}
      {/* <EChart options={stackedAreaChartOptions} /> */}
    </div>
  );
}

export default App;
