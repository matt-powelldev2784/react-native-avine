import { getPositionFromAddress } from './getPosition'
import { getRoute } from './getRoute'
import { getMap } from './getMap'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
var polyline = require('@mapbox/polyline')

const routePolylines = []

const getPolylinesForOriginAndDestination = async ({
  address1,
  address2,
}: string) => {
  const origin = await getPositionFromAddress(address1)
  const destination = await getPositionFromAddress(address2)

  const routeParams = {
    transportMode: 'car',
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    return: 'polyline',
    apikey: process.env.HERE_API_KEY,
  }

  const routeUrl = new URL('https://router.hereapi.com/v8/routes')
  Object.keys(routeParams).forEach((key) =>
    routeUrl.searchParams.append(key, routeParams[key])
  )

  const route = await fetch(routeUrl)
  const routeJson = await route.json()
  console.log('routeJson', routeJson)
  const polylineString = routeJson.routes[0].sections[0].polyline
  const polylineGeoJson = polyline.toGeoJSON(polylineString)

  console.log('polylineGeoJson', polylineGeoJson)

  const getMap = async (waypoints) => {
    const baseUrl = 'https://image.maps.ls.hereapi.com/mia/1.6/route'
    const url = new URL(baseUrl)

    url.searchParams.append('style', 'fleet')
    url.searchParams.append('m', 'route')

    waypoints.forEach((waypoint, index) => {
      const [lat, lng] = waypoint
      url.searchParams.append(`r${index}`, `${lat},${lng}`)
      url.searchParams.append(`m${index}`, `${lat},${lng}`)
    })

    console.log('url.searchParams', url.searchParams)

    url.searchParams.append('apiKey', process.env.HERE_API_KEY)

    console.log('url', url)

    const response = await fetch(url)

    // ... rest of your code
  }

  getMap(polylineGeoJson.coordinates)
}

getPolylinesForOriginAndDestination({
  address1: '34 Diceland Road Banstead Surrey SM7 2ET',
  address2: '10 Diceland Road Banstead Surrey SM7 2ET',
})

export const getPolylines = async () => {
  const start = await getPositionFromAddress('banstead')
  const end = await getPositionFromAddress('banstead')
  const city = 'London'

  console.log('start', start)

  const add1 = await getPositionFromAddress(
    'glowarm central heating ltd mitcham CR4 4BE'
  )

  const route = await fetch(
    `https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=polyline&apikey=${process.env.HERE_API_KEY}`
  )
  const routeJson = await route.json()
  const polyline2 = routeJson.routes[0].sections[0].polyline

  const polyline3 = polyline.toGeoJSON(polyline2)

  // const getPolyline = await fetch(route.url)
  // console.log('getPolyline', getPolyline)

  const waypointA = { lat: 51.32326, lng: -0.19916 }
  const waypointB = { lat: 51.35764, lng: -0.15864 }
  const waypointC = { lat: 51.40022, lng: -0.16931 }

  const getMap = await fetch(
    `https://image.maps.ls.hereapi.com/mia/1.6/route?style=fleet&m=route&r0=${waypointA.lat},${waypointA.lng}&r1=${waypointB.lat},${waypointB.lng}&r2=${waypointC.lat},${waypointC.lng}&m0=${waypointA.lat},${waypointA.lng}&m1=${waypointB.lat},${waypointB.lng}&m2=${waypointC.lat},${waypointC.lng}&apiKey=${process.env.HERE_API_KEY}`
  )

  console.log('getMap', getMap)
}
