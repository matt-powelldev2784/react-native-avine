import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { getMapPoints } from './getMapPoints'
import { calculateRegion } from './calculateRegion'

const pathCoordinates = [
  { latitude: 51.3576621, longitude: -0.1585714 },
  { latitude: 51.4025653, longitude: -0.1502123 },
  { latitude: 51.41609270000001, longitude: -0.1529775 },
]

type LatLngLiteral = {
  latitude: number
  longitude: number
  latitudeDelta?: number | undefined
  longitudeDelta?: number | undefined
}

const NativeMap = () => {
  const [mapPoints, setMapPoints] = useState<LatLngLiteral[]>([])
  const [polylineCenter, setPolylineCenter] = useState<LatLngLiteral>({
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
    //fallback defaults to London
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadMapPoints = async () => {
      const points = await getMapPoints()
      if (points) {
        setMapPoints(points.mapPoints)
        setPolylineCenter(calculateRegion(points.mapPoints))
        setIsLoaded(true)
      }
    }
    loadMapPoints()
  }, [])

  if (mapPoints.length === 0 || !isLoaded)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: polylineCenter.latitude,
          longitude: polylineCenter.longitude,
          latitudeDelta: polylineCenter.latitudeDelta || 0.15, //0.15 is a fallback for London map
          longitudeDelta: polylineCenter.longitudeDelta || 0.15, //0.15 is a fallback for London map
        }}
      >
        <Polyline coordinates={mapPoints} strokeColor="#000" strokeWidth={6} />

        {pathCoordinates.map((coordinate, i) => (
          <Marker key={i} coordinate={coordinate}>
            <View className="bg-red-500 p-1 rounded">
              <Text className="text-white font-bold">{i + 1}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

export default NativeMap
