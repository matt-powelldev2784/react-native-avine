import React from 'react'
import { Platform } from 'react-native'
import WebMap from './components/WebMap'
import NativeMap from './components/NativeMap'
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
