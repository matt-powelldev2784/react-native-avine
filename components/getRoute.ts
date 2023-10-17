import Polyline from '@mapbox/polyline'

export const getMapPoints = async () => {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  const headers = {
    'X-Goog-Api-Key': process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    'Content-Type': 'application/json',
    'X-Goog-FieldMask':
      'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.optimizedIntermediateWaypointIndex',
  }
  const body = {
    origin: {
      address: '34 Diceland Road, Banstead, Surrey, SM7 2ET',
    },
    destination: {
      address: '34 Diceland Road, Banstead, Surrey, SM7 2ET',
    },
    intermediates: [
      {
        address: '53 St Georges Road, Mitcham, Surrey, CR4 1ED',
      },
    ],
    travelMode: 'DRIVE',
    extraComputations: ['TRAFFIC_ON_POLYLINE'],
    routingPreference: 'TRAFFIC_AWARE',
    optimizeWaypointOrder: 'true',
  }

  const getPoints = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      })
      const data = await response.json()
      console.log(data.routes[0])
      const polyline = data.routes[0].polyline.encodedPolyline
      console.log('polyline', polyline)
      let points = Polyline.decode(polyline)
      console.log('points', points)

      const pointsObject = points.map((point) => ({
        lat: point[0],
        lng: point[1],
      }))
      console.log('pointsObject', pointsObject)

      return pointsObject
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const pointsReturn = await getPoints()
  console.log('pointsReturn', pointsReturn)
  return pointsReturn
}
