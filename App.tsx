import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Platform, StyleSheet } from 'react-native'
import WebMap from './components/WebMap'
import NativeMap from './components/NativeMap'

const App = () => {
  const Map = Platform.OS === 'web' ? <WebMap /> : <NativeMap />

  return Map
}

export default App

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
})
