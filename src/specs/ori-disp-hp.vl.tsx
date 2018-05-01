export const ORI_DISP_HP = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Origin", "type": "nominal"},
    "y": {"field": "Displacement", "type": "quantitative"},
    "color": {"field": "Horsepower", "type": "quantitative"}
  }
}
