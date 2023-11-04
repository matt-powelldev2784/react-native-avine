import React from 'react'
import { Platform } from 'react-native'
import WebMap from './app/components/WebMap'
import NativeMap from './app/components/NativeMap'
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
