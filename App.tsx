import React from 'react'
import { Platform } from 'react-native'
import WebMap from './app/components/map/WebMap'
import NativeMap from './app/components/map/NativeMap'
import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App
