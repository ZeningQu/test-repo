export const CARS_INCONSISTENT = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "description": "Shows the relationship between horsepower and the numbver of cylinders using tick marks.",
  "width": 100,
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "circle",
  "encoding": {
    "x": {"field": "Origin", "type": "nominal", "axis": {
      "labelAngle": 0
    }},
    "y": {"field": "Horsepower", "type": "quantitative",
    "aggregate": "mean"}
  }
};
