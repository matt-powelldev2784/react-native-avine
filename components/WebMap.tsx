import React from 'react'
import { View } from 'react-native'
import {
  GoogleMap,
  Polyline,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'
import { Platform, StyleSheet } from 'react-native'

const center = {
  lat: 37.8025259,
  lng: -122.4351431,
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
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <View style={styles.mapContainer}>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        <Polyline path={pathCoordinates} options={pathOptions} />
        {pathCoordinates.map((coordinate, i) => (
          <Marker key={i} position={coordinate} />
        ))}
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
