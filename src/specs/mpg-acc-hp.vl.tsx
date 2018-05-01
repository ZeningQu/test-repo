export const MPG_ACC_HP = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Miles_per_Gallon", "type": "quantitative"},
    "y": {"field": "Acceleration", "type": "quantitative"},
    "color": {"field": "Horsepower", "type": "quantitative"}
  }
}
