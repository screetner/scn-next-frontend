import { LayerProps } from 'react-map-gl'

// Heatmap color palette
const heatmapColors = [
  // Gradient from cool to warm colors representing density
  'rgba(33, 102, 172, 0)', // Transparent blue (lowest density)
  'rgba(103, 169, 207, 0.4)', // Light blue
  'rgba(209, 229, 240, 0.6)', // Pale blue
  'rgba(253, 219, 199, 0.7)', // Pale orange
  'rgba(239, 138, 98, 0.8)', // Orange
  'rgba(178, 24, 43, 0.9)', // Deep red (highest density)
]

// Heatmap layer configuration
export const heatmapLayer: LayerProps = {
  id: 'locations-heatmap',
  type: 'heatmap',
  paint: {
    // Heatmap weight based on point count or a specific property
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'density'],
      0,
      0,
      1,
      1,
    ],

    // Heatmap intensity (how quickly heat dissipates)
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 12, 3],

    // Color ramp for heatmap density
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      heatmapColors[0],
      0.2,
      heatmapColors[1],
      0.4,
      heatmapColors[2],
      0.6,
      heatmapColors[3],
      0.8,
      heatmapColors[4],
      1,
      heatmapColors[5],
    ],

    // Radius of influence for each point
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 10, 15, 50],

    // Opacity of the heatmap layer
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.7, 15, 0.5],
  },
}
