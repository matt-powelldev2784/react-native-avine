type LatLngLiteral = {
  latitude: number
  longitude: number
}

export const getPolylineCenter = (mapPoints: LatLngLiteral[]) => {
  let minLat: number = 0
  let maxLat: number = 0
  let minLng: number = 0
  let maxLng: number = 0

  mapPoints.forEach((point) => {
    if (!minLat || point.latitude < minLat) minLat = point.latitude
    if (!maxLat || point.latitude > maxLat) maxLat = point.latitude
    if (!minLng || point.longitude < minLng) minLng = point.longitude
    if (!maxLng || point.longitude > maxLng) maxLng = point.longitude
  })

  // Calculate map center
  const midLat = (minLat + maxLat) / 2
  const midLng = (minLng + maxLng) / 2

  return {
    native: {
      latitude: midLat,
      longitude: midLng,
    },
    web: {
      lat: midLat,
      lng: midLng,
    },
  }
}
