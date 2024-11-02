import { LayerProps } from 'react-map-gl';

// Modern color palette
const colors = {
  primary: '#3B82F6',    // Blue
  secondary: '#F59E0B',  // Amber
  tertiary: '#f60a7e',   // Pink
  border: '#1F2937',     // Dark gray
  text: '#FFFFFF'        // White text
};

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'markers',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      colors.primary,        // Default color for small clusters
      10,                    // Threshold 1
      colors.secondary,      // Medium clusters
      50,                    // Threshold 2
      colors.tertiary        // Large clusters
    ],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      12,  // Min zoom
      [    // Size at min zoom
        'step',
        ['get', 'point_count'],
        20,   // Default size
        10,   // Threshold 1
        25,   // Medium size
        50,   // Threshold 2
        30    // Large size
      ],
      16,  // Max zoom
      [    // Size at max zoom
        'step',
        ['get', 'point_count'],
        25,   // Default size
        10,   // Threshold 1
        30,   // Medium size
        50,   // Threshold 2
        35    // Large size
      ]
    ],
    'circle-blur': 0.15,
    'circle-stroke-width': 2,
    'circle-stroke-color': colors.border,
    'circle-stroke-opacity': 0.3,
    'circle-opacity': 0.8,
    'circle-opacity-transition': {
      duration: 300,
      delay: 0
    },
    'circle-radius-transition': {
      duration: 300,
      delay: 0
    }
  }
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'markers',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      12, 12,  // Size at min zoom
      16, 14   // Size at max zoom
    ],
    'text-allow-overlap': true,
    'text-ignore-placement': true
  },
  paint: {
    'text-color': colors.text,
    'text-halo-color': 'rgba(0, 0, 0, 0.2)',
    'text-halo-width': 1,
    'text-halo-blur': 1,
    'text-opacity': 0.9,
    'text-opacity-transition': {
      duration: 300,
      delay: 0
    }
  }
};

export const unClusteredPointLayer: LayerProps = {
  id: 'unClustered-point',
  type: 'circle',
  source: 'markers',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': colors.tertiary,
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': colors.border,
    'circle-stroke-opacity': 0.3,
    'circle-opacity': 0.8,
    'circle-opacity-transition': {
      duration: 300,
      delay: 0
    },
    'circle-radius-transition': {
      duration: 300,
      delay: 0
    }
  }
};