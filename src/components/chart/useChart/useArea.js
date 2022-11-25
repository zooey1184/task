const useArea = (chart, {position, field}) => {
  chart.coordinate();
  const CHART = chart.area().position(position);
  if (field) {
    CHART.color(field).adjust([{
      type: 'dodge',
      marginRatio: 0
    }]);
  }
  return CHART;
};

export default useArea