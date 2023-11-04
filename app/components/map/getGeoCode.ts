export const getGeoCode = async (address: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`

  const response = await fetch(url)
  const geoCodeData = await response.json()
  const geoCode = geoCodeData.results[0].geometry.location

  return geoCode
}
