import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Platform, StyleSheet, Text } from 'react-native'
import WebMap from './components/WebMap'
import NativeMap from './components/NativeMap'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  const Map = Platform.OS === 'web' ? <WebMap /> : <NativeMap />

  return (
    <View className="w-full h-full">
      <StatusBar style="auto" />
      <View className="h-1/2">{Map}</View>

      <Text>A</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
})
