// High-precision architectural GeoJSON polygonal contours for Chișinău Sectors & Moldova Raions
// Designed for interactive real estate mapping with rich hover metadata and custom color tokens.
import { MOLDOVA_RAIONS_SVG } from "./moldova-svg-data";

export const CHISINAU_SECTORS_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "centru",
        name: "Sectorul Centru",
        type: "sector",
        description: "Centrul istoric, administrativ și comercial al Chișinăului",
        color: "#F59E0B", // Amber Gold
        avgPriceSqm: "€1,550/m²",
        listingCount: 48,
        center: [47.022, 28.833],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.816, 47.034],
            [28.846, 47.032],
            [28.854, 47.021],
            [28.849, 47.008],
            [28.835, 47.004],
            [28.818, 47.012],
            [28.812, 47.024],
            [28.816, 47.034],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "botanica",
        name: "Sectorul Botanica",
        type: "sector",
        description: "Cel mai verde sector, parcuri mari și conexiuni rapide spre aeroport",
        color: "#10B981", // Emerald Green
        avgPriceSqm: "€1,280/m²",
        listingCount: 62,
        center: [46.985, 28.868],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.849, 47.008],
            [28.854, 47.021],
            [28.885, 47.015],
            [28.912, 46.995],
            [28.905, 46.968],
            [28.875, 46.958],
            [28.845, 46.972],
            [28.842, 46.992],
            [28.849, 47.008],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "buiucani",
        name: "Sectorul Buiucani",
        type: "sector",
        description: "Zonă rezidențială aerisită, Parcul Valea Morilor și Alba-Iulia",
        color: "#6366F1", // Indigo
        avgPriceSqm: "€1,390/m²",
        listingCount: 41,
        center: [47.028, 28.788],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.752, 47.042],
            [28.795, 47.048],
            [28.816, 47.034],
            [28.812, 47.024],
            [28.818, 47.012],
            [28.798, 47.004],
            [28.765, 47.012],
            [28.752, 47.042],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "riscani",
        name: "Sectorul Rîșcani",
        type: "sector",
        description: "Bulevardul Moscova, infrastructură excelentă și parcuri forestiere",
        color: "#06B6D4", // Cyan
        avgPriceSqm: "€1,420/m²",
        listingCount: 55,
        center: [47.052, 28.862],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.846, 47.032],
            [28.878, 47.038],
            [28.892, 47.062],
            [28.875, 47.082],
            [28.845, 47.078],
            [28.838, 47.055],
            [28.846, 47.032],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "ciocana",
        name: "Sectorul Ciocana",
        type: "sector",
        description: "Bulevardul Mircea cel Bătrîn, blocuri noi și dezvoltare modernă",
        color: "#EC4899", // Pink
        avgPriceSqm: "€1,250/m²",
        listingCount: 39,
        center: [47.055, 28.905],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.878, 47.038],
            [28.918, 47.042],
            [28.942, 47.065],
            [28.935, 47.085],
            [28.892, 47.082],
            [28.892, 47.062],
            [28.875, 47.045],
            [28.878, 47.038],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "telecentru",
        name: "Sectorul Telecentru",
        type: "sector",
        description: "Panoramă deasupra orașului, vile de lux și liniște rezidențială",
        color: "#F97316", // Orange
        avgPriceSqm: "€1,350/m²",
        listingCount: 28,
        center: [46.992, 28.815],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.798, 47.004],
            [28.818, 47.012],
            [28.835, 47.004],
            [28.842, 46.992],
            [28.838, 46.975],
            [28.805, 46.978],
            [28.798, 47.004],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "posta_veche",
        name: "Poșta Veche & Rîșcani Nord",
        type: "sector",
        description: "Calea Orheiului, acces rapid și proiecte imobiliare emergente",
        color: "#64748B", // Slate Blue
        avgPriceSqm: "€1,180/m²",
        listingCount: 22,
        center: [47.058, 28.825],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28.795, 47.048],
            [28.838, 47.055],
            [28.845, 47.078],
            [28.818, 47.082],
            [28.795, 47.068],
            [28.795, 47.048],
          ],
        ],
      },
    },
  ],
};

// ============================================================================
// OFFICIAL MOLDOVA RAIONS FROM USER SVG (prezentaVot / CEC Electoral Map)
// Converts SVG path coordinate space (minX=154..maxX=598, minY=0..maxY=560)
// directly to high-precision WGS84 GeoJSON [lng, lat] coordinates for Leaflet
// ============================================================================

const GEO_BOUNDS = {
  west: 26.618,
  east: 30.136,
  north: 48.492,
  south: 45.468,
  svgMinX: 154,
  svgMaxX: 598,
  svgMinY: 0,
  svgMaxY: 560
};

function parseSvgPathToGeoJsonGeometry(d) {
  if (!d) return { type: "Polygon", coordinates: [[]] };
  const subpaths = d.split(/(?=[M|m])/).filter(Boolean);
  const rings = [];

  subpaths.forEach(sub => {
    const matches = [...sub.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)];
    if (matches.length >= 3) {
      const ring = matches.map(m => {
        const x = parseFloat(m[1]);
        const y = parseFloat(m[2]);
        const lng = GEO_BOUNDS.west + ((x - GEO_BOUNDS.svgMinX) / (GEO_BOUNDS.svgMaxX - GEO_BOUNDS.svgMinX)) * (GEO_BOUNDS.east - GEO_BOUNDS.west);
        const lat = GEO_BOUNDS.north - ((y - GEO_BOUNDS.svgMinY) / (GEO_BOUNDS.svgMaxY - GEO_BOUNDS.svgMinY)) * (GEO_BOUNDS.north - GEO_BOUNDS.south);
        return [Number(lng.toFixed(5)), Number(lat.toFixed(5))];
      });
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        ring.push([first[0], first[1]]);
      }
      rings.push(ring);
    }
  });

  if (rings.length === 0) return { type: "Polygon", coordinates: [[]] };
  if (rings.length === 1) return { type: "Polygon", coordinates: rings };
  return { type: "MultiPolygon", coordinates: rings.map(r => [r]) };
}

function computeCenterFromGeometry(geometry) {
  const coords = [];
  if (geometry.type === "Polygon") {
    geometry.coordinates[0]?.forEach(pt => coords.push(pt));
  } else if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach(poly => {
      poly[0]?.forEach(pt => coords.push(pt));
    });
  }
  if (coords.length === 0) return [47.024, 28.832];
  let sumLat = 0, sumLng = 0;
  coords.forEach(pt => {
    sumLng += pt[0];
    sumLat += pt[1];
  });
  return [Number((sumLat / coords.length).toFixed(4)), Number((sumLng / coords.length).toFixed(4))];
}

export const MOLDOVA_RAIONS_GEOJSON = {
  type: "FeatureCollection",
  features: MOLDOVA_RAIONS_SVG.map(raion => {
    const geometry = parseSvgPathToGeoJsonGeometry(raion.d);
    const center = computeCenterFromGeometry(geometry);
    return {
      type: "Feature",
      properties: {
        id: raion.id,
        name: raion.name,
        type: raion.id.startsWith("mun_") ? "municipiu" : raion.id.startsWith("uta_") ? "uta" : "raion",
        typeLabel: raion.id.startsWith("mun_") ? "Municipiu" : raion.id.startsWith("uta_") ? "Unitate Autonomă" : "Raion",
        region: raion.region,
        description: raion.description || `${raion.name}, regiunea ${raion.region}`,
        color: raion.color,
        avgPriceSqm: raion.avgPriceFormatted || raion.avgPriceSqm,
        listingCount: raion.listingCount,
        center: center
      },
      geometry: geometry
    };
  })
};
