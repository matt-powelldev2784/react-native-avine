import { Platform } from 'react-native'
import React from 'react'
import WebMap from '../components/map/WebMap'
import NativeMap from '../components/map/NativeMap'

const MapScreen = () => {
  const Map = Platform.OS === 'web' ? <WebMap /> : <NativeMap />

  return Map
}

export default MapScreen
