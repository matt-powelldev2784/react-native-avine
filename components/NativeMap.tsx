import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { getMapPoints } from './getMapPoints'

const pathCoordinates = [
  { latitude: 51.3576621, longitude: -0.1585714 },
  { latitude: 51.4025653, longitude: -0.1502123 },
  { latitude: 51.41609270000001, longitude: -0.1529775 },
]

type LatLngLiteral = {
  latitude: number
  longitude: number
}

const NativeMap = () => {
  const [mapPoints, setMapPoints] = useState<LatLngLiteral[]>([])

  useEffect(() => {
    const loadMapPoints = async () => {
      const points = await getMapPoints()
      if (points) setMapPoints(points)
    }
    loadMapPoints()
  }, [])

  if (mapPoints.length === 0) return null

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: mapPoints[0].latitude,
          longitude: mapPoints[0].longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}
      >
        <Polyline coordinates={mapPoints} strokeColor="#000" strokeWidth={6} />

        {pathCoordinates.map((coordinate, i) => (
          <Marker key={i} coordinate={coordinate} title={(i + 1).toString()} />
        ))}
      </MapView>
    </View>
  )
}

export default NativeMap

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '50%',
  },
})
