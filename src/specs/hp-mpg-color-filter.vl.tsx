export const HP_MPG_COLOR_FILTER = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {"url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/cars.json"},
  "mark": "point",
  "transform": [{"filter": {"field": "Origin", "oneOf": ["Japan", "USA"]}}],
  "encoding": {
    "x": {"field": "Horsepower", "type": "quantitative"},
    "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
    "color": {"field": "Origin", "type": "nominal",
    "scale": {"range": ["blue", "orange"]}}
  }
};
