import { getPositionFromAddress } from './getPosition'
import { getRoute } from './getRoute'
import { getMap } from './getMap'

export const getRouteTest = async () => {
  const add1 = await getPositionFromAddress(
    'glowarm central heating ltd mitcham CR4 4BE'
  )
  const add2 = await getPositionFromAddress(
    '102a beddinton gardens carshalton SM5 3HQ'
  )

  const start = await getPositionFromAddress('banstead')
  const end = await getPositionFromAddress('banstead')
  const city = 'London'

  // getRoute({ start, end, waypoints: [add1, add2], city })
  // getMap()

  const routeMap = await fetch(
    `https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=polyline&apikey=${process.env.HERE_API_KEY}`
  )
  console.log('routeMap', routeMap)
}
