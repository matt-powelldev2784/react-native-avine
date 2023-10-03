export const getMap = async () => {
  const waypoints = [
    { id: 'start', lat: 51.32326, lng: -0.19916 },
    { id: 'destination1', lat: 51.35764, lng: -0.15864 },
    { id: 'destination0', lat: 51.40022, lng: -0.16931 },
    { id: 'end', lat: 51.32326, lng: -0.19916 },
  ]

  let waypointString = ''
  waypoints.forEach((waypoint, index) => {
    waypointString += `&via=${waypoint.lat},${waypoint.lng}`
  })

  const url = `https://router.hereapi.com/v8/routes?apiKey=${process.env.HERE_API_KEY}&transportMode=car&routingMode=fast&origin=${waypoints[0].lat},${waypoints[0].lng}${waypointString}&destination=${waypoints[3].lat},${waypoints[3].lng}${waypointString}&return=polyfill`

  const map = await fetch(url)

  console.log('map', map)
}
