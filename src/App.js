import { EChart } from "./components";

import { basicAreaChart } from "./components/options_config/basicAreaChart";
import { scatterChartOptions } from "./components/options_config/scatterChart";
import { stackedAreaChartOptions } from "./components/options_config/stackedAreaChart";
import { pieChartOptions } from "./components/options_config/pieChart";
import { DoughnutChartOptions } from "./components/options_config/doughnutChart";

import "./components/styles.css";

function App() {
  return (
    <div className="mainContainer">
      <EChart options={pieChartOptions} />
      <EChart options={DoughnutChartOptions} />
      <EChart options={scatterChartOptions} />

      <EChart options={basicAreaChart} />
      <EChart options={stackedAreaChartOptions} />
    </div>
  );
}

export default App;
