export const MPG_HP = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "y": {"field": "Horsepower", "type": "quantitative"},
    "x": {"field": "Miles_per_Gallon", "type": "quantitative"}
  }
}
