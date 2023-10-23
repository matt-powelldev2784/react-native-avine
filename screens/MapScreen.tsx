import { Platform, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../StackNavigator'
import React from 'react'
import WebMap from '../components/WebMap'
import NativeMap from '../components/NativeMap'
import { useLayoutEffect } from 'react'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Map'>

const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>()

  const Map = Platform.OS === 'web' ? <WebMap /> : <NativeMap />

  return Map
}

export default MapScreen
