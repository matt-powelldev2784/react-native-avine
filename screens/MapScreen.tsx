import { Platform, View } from 'react-native'
import React from 'react'
import WebMap from '../components/WebMap'
import NativeMap from '../components/NativeMap'

const MapScreen = () => {
  const Map = Platform.OS === 'web' ? <WebMap /> : <NativeMap />

  return Map
}

export default MapScreen
