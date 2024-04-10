import { EChart } from "./components";

import { basicAreaChart } from "./components/options_config/basicAreaChart";
import { scatterChartOptions } from "./components/options_config/scatterChart";
import { stackedAreaChartOptions } from "./components/options_config/stackedAreaChart";

import "./components/styles.css";

function App() {
  return (
    <div className="mainContainer">
      <EChart options={basicAreaChart} />
      <EChart options={stackedAreaChartOptions} />
      <EChart options={scatterChartOptions} />
    </div>
  );
}

export default App;
