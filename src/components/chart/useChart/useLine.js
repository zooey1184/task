const useLine = (chart, {position, field}) => {
  chart.coordinate();
  const CHART = chart.line().position(position);
  if (field) {
    CHART.color(field).adjust([{
      type: 'dodge',
      marginRatio: 0
    }]);
  }
  return CHART;
};

export default useLine