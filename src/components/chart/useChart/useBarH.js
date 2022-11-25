const useBarH = (chart, {position, field}) => {
  chart.coordinate().transpose();
  // return chart.interval().position(position);
  const CHART = chart.interval().position(position)
  if (field) {
    CHART.color(field).adjust([{
      type: 'dodge',
      marginRatio: 0
    }]);
  }
  return CHART;
};

export default useBarH