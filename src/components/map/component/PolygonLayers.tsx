import { LayerProps } from 'react-map-gl'

// Modern color palette
const colors = {
  primary: '#3B82F6', // Modern blue
  secondary: '#6366F1', // Modern indigo
  accent: '#8B5CF6', // Modern purple
  highlight: '#F59E0B', // Modern amber
  success: '#10B981', // Modern green
}

// Fill layer with gradient and interactive states
export const polygonFillLayer: LayerProps = {
  id: 'polygon-fill',
  type: 'fill',
  paint: {
    // Gradient fill using data-driven styling
    'fill-color': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, colors.primary,
      15, colors.secondary,
      20, colors.accent
    ],
    // Dynamic opacity based on zoom level
    'fill-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, 0.2,
      15, 0.3,
      20, 0.4
    ],
    // Hover effect
    'fill-opacity-transition': {
      duration: 300,
      delay: 0
    },
  },
}

// Outline layer with modern effects
export const polygonOutlineLayer: LayerProps = {
  id: 'polygon-outline',
  type: 'line',
  paint: {
    // Animated gradient line color
    'line-color': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, colors.primary,
      15, colors.accent,
      20, colors.highlight
    ],
    // Dynamic line width based on zoom
    'line-width': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, 1,
      15, 2,
      20, 3
    ],
    // Smooth line
    'line-blur': 0.5,
    // Animated dash pattern
    'line-dasharray': [2, 2],
    // Smooth transitions
    'line-opacity': 0.8,
    'line-opacity-transition': {
      duration: 300,
      delay: 0
    },
  },
}
