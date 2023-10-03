interface LatLng {
  lat: number
  lng: number
}

interface getRouteRequest {
  start: LatLng
  end: LatLng
  waypoints: LatLng[]
  city: string
}

export const getRoute = async (routeRequest: getRouteRequest) => {
  console.log('routeRequest', routeRequest)
  const { waypoints, start, end, city } = routeRequest

  let waypointsString = ''
  waypoints.forEach((waypoint, index) => {
    waypointsString += `&destination${index}=${waypoint.lat},${waypoint.lng}`
  })

  const res = await fetch(
    `https://wps.hereapi.com/v8/findsequence2?apiKey=${process.env.HERE_API_KEY}&mode=fastest;car;traffic:disabled;motorway:-2&start=${start.lat},${start.lng}${waypointsString}&end=${end.lat},${end.lng}&return=polyline`
  )

  const json = await res.json()
  console.log('get route json', json)

  return json
}
