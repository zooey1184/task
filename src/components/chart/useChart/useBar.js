const useBar = (chart, {position, field}) => {
  chart.coordinate();
  const CHART = chart.interval().position(position)
  if (field) {
    CHART.color(field).adjust([{
      type: 'dodge',
      marginRatio: 0
    }]);
  }
  return CHART;
};

export default useBar