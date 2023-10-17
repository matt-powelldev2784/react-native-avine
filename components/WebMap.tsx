import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
  GoogleMap,
  Polyline,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'
import { Platform, StyleSheet } from 'react-native'
import { getMapPoints } from './getRoute'

const center = {
  lat: 51.31766,
  lng: -0.20921,
}

const pathCoordinates = [
  { lat: 37.8025259, lng: -122.4351431 },
  { lat: 37.7896386, lng: -122.421646 },
  { lat: 37.7665248, lng: -122.4161628 },
  // Add more coordinates as needed
]

const pathOptions = {
  strokeColor: '#000',
  strokeOpacity: 1,
  strokeWeight: 6,
}

const WebMap = () => {
  const [mapPoints, setMapPoints] = React.useState([])

  useEffect(() => {
    const getPoints = async () => {
      const points = await getMapPoints()
      setMapPoints(points)
    }
    getPoints()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (!isLoaded || mapPoints.length === 0) return <div>Loading...</div>

  return (
    <View style={styles.mapContainer}>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{ mapId: 'f53009f4e811f754' }}
      >
        <Polyline path={mapPoints} options={pathOptions} />
        {pathCoordinates.map((coordinate, i) => {
          return <Marker key={i} position={coordinate} />
        })}
      </GoogleMap>
    </View>
  )
}

export default WebMap

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
})
