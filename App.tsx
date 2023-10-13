import React from 'react'
import MapView, { Polyline } from 'react-native-maps'

const MyMapComponent = () => {
  console.log(
    'process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY',
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
  )

  console.log('process.env', process.env)


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
      googleMapsApiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <Polyline
        coordinates={coordinates}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#7F0000',
          '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          '#B24112',
          '#E5845C',
          '#238C23',
          '#7F0000',
          // add more colors for your polylines as needed
        ]}
        strokeWidth={6}
      />
    </MapView>
  )
}

export default MyMapComponent
