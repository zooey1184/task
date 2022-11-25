import useArea from "./useArea";
import useBar from "./useBar";
import useBarH from "./useBarH";
import useCircle from "./useCircle";
import useLine from "./useLine";

const useChart = (chart, type, options) => {
  const obj = {
    area: useArea,
    bar: useBar,
    barH: useBarH,
    circle: useCircle,
    line: useLine,
  };
  if (obj[type]) {
    return obj[type](chart, options);
  } else {
    console.log("无配置图表类型 [bar, line, barH, circle]");
    return undefined;
  }
};
export default useChart;
