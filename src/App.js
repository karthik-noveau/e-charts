import { EChart } from "./components";

import { basicAreaChart } from "./components/options_config/basicAreaChart";
import { stackedAreaChartOptions } from "./components/options_config/stackedAreaChart";

import "./components/styles.css";

function App() {
  return (
    <div className="mainContainer">
      <EChart options={basicAreaChart} />
      <EChart options={stackedAreaChartOptions} />
    </div>
  );
}

export default App;
