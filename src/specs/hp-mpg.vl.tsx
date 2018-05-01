export const HP_MPG = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Horsepower", "type": "quantitative"},
    "y": {"field": "Miles_per_Gallon", "type": "quantitative"}
  }
}
