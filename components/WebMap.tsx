import React, { useState, useEffect } from 'react'
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

type LatLngLiteral = google.maps.LatLngLiteral

const WebMap = () => {
  const [mapPoints, setMapPoints] = useState<LatLngLiteral[]>([])
  const [polylineCenter, setPolylineCenter] = useState<LatLngLiteral>({
    lat: 51.5074,
    lng: -0.1278, //fallback defaults to London
  })

  useEffect(() => {
    const loadMapPoints = async () => {
      const points = await getMapPoints()
      if (points) {
        setMapPoints(points.mapPoints)
        setPolylineCenter(points.polylineCenter.web)
      }
    }
    loadMapPoints()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  const fitPolylineInMapView = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    mapPoints.forEach((point) => {
      bounds.extend(point)
    })
    map.fitBounds(bounds)
  }

  if (!isLoaded || mapPoints.length === 0) return <div>Loading...</div>

  return (
    <View style={styles.mapContainer}>
      <GoogleMap
        center={polylineCenter}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{ mapId: 'f53009f4e811f754' }}
        onLoad={fitPolylineInMapView}
      >
        <Polyline
          path={mapPoints}
          options={{
            strokeColor: '#000',
            strokeOpacity: 1,
            strokeWeight: 6,
          }}
        />

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
