import Polyline from '@mapbox/polyline'
import { Platform } from 'react-native'

const origin = {
  address: '34 Diceland Road, Banstead, Surrey, SM7 2ET',
}
const destination = {
  address: '34 Diceland Road, Banstead, Surrey, SM7 2ET',
}

const intermediates = [
  {
    address: '53 St Georges Road, Mitcham, Surrey, CR4 1ED',
  },
  {
    address: '179 Streaham Road, Mitcham CR4',
  },
  {
    address: '102a Beddington Gardens, Carshalton, Surrey, SM5 3HQ',
  },
]

export const getMapPoints = async () => {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  const headers = {
    'X-Goog-Api-Key': process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    'Content-Type': 'application/json',
    'X-Goog-FieldMask':
      'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.optimizedIntermediateWaypointIndex',
  }
  const body = {
    origin,
    destination,
    intermediates,
    travelMode: 'DRIVE',
    extraComputations: ['TRAFFIC_ON_POLYLINE'],
    routingPreference: 'TRAFFIC_AWARE',
    optimizeWaypointOrder: 'true',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
    const data = await response.json()
    const polyline = data.routes[0].polyline.encodedPolyline
    let points = Polyline.decode(polyline)

    const mapPoints = points.map((point) => ({
      lat: point[0],
      lng: point[1],
      latitude: point[0],
      longitude: point[1],
    }))

    return mapPoints
  } catch (error) {
    console.error('Error:', error)
  }
}
