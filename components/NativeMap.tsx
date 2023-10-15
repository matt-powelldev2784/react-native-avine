import React from 'react'
import MapView, { Polyline } from 'react-native-maps'

const NativeMap = () => {
  const coordinates = [
    { latitude: 37.8025259, longitude: -122.4351431 },
    { latitude: 37.7896386, longitude: -122.421646 },
    { latitude: 37.7665248, longitude: -122.4161628 },
    // Add more coordinates as needed
  ]

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider="google"
    >
      <Polyline
        coordinates={coordinates}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={
          [
            // add more colors for your polylines as needed
          ]
        }
        strokeWidth={6}
      />
    </MapView>
  )
}

export default NativeMap
