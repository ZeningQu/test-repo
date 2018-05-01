export const DIS_ACC = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Displacement", "type": "quantitative"},
    "y": {"field": "Acceleration", "type": "quantitative"}
  }
}
