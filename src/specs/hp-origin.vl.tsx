export const HP_ORIGIN = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "description": "Shows the relationship between horsepower and the numbver of cylinders using tick marks.",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "tick",
  "encoding": {
    "y": {"field": "Origin", "type": "nominal", "axis": {
      "labelAngle": 0
    }},
    "x": {"field": "Horsepower", "type": "quantitative"}
  }
};