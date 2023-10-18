type LatLngLiteral = {
  latitude: number
  longitude: number
}

export const calculateRegion = (
  points: LatLngLiteral[]
): LatLngLiteral & { latitudeDelta: number; longitudeDelta: number } => {
  const latitudes = points.map((point) => point.latitude)
  const longitudes = points.map((point) => point.longitude)

  const minLat = Math.min(...latitudes)
  const maxLat = Math.max(...latitudes)
  const minLng = Math.min(...longitudes)
  const maxLng = Math.max(...longitudes)

  const midLat = (minLat + maxLat) / 2
  const midLng = (minLng + maxLng) / 2

  const deltaLat = (maxLat - minLat) * 1.1 // Add a 10% padding
  const deltaLng = (maxLng - minLng) * 1.1 // Add a 10% padding

  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: deltaLat,
    longitudeDelta: deltaLng,
  }
}
