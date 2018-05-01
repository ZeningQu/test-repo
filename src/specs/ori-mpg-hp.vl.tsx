export const ORI_MPG_HP = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Origin", "type": "nominal"},
    "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
    "color": {"field": "Horsepower", "type": "quantitative"}
  }
}
