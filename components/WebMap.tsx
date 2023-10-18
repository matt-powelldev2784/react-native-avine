import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
  GoogleMap,
  Polyline,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'
import { StyleSheet } from 'react-native'
import { getMapPoints } from './getMapPoints'

const pathCoordinates = [
  { lat: 51.3576621, lng: -0.1585714 },
  { lat: 51.4025653, lng: -0.1502123 },
  { lat: 51.41609270000001, lng: -0.1529775 },
]

const pathOptions = {
  strokeColor: '#000',
  strokeOpacity: 1,
  strokeWeight: 6,
}

type LatLngLiteral = google.maps.LatLngLiteral

const WebMap = () => {
  const [mapPoints, setMapPoints] = React.useState<LatLngLiteral[]>([])

  useEffect(() => {
    const loadMapPoints = async () => {
      const points = await getMapPoints()
      const convertedPoints = points?.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      }))
      if (convertedPoints) setMapPoints(convertedPoints)
    }
    loadMapPoints()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  if (!isLoaded || mapPoints.length === 0) return <div>Loading...</div>

  return (
    <View style={styles.mapContainer}>
      <GoogleMap
        zoom={11}
        center={mapPoints[0]}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{ mapId: 'f53009f4e811f754' }}
      >
        <Polyline path={mapPoints} options={pathOptions} />

        {pathCoordinates.map((coordinate, i) => {
          return (
            <Marker key={i} position={coordinate} label={(i + 1).toString()} />
          )
        })}
      </GoogleMap>
    </View>
  )
}

export default WebMap

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '50%',
  },
})
