import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import MapScreen from './screens/MapScreen'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  Map: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const user = true
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? <Stack.Screen name="Login" component={LoginScreen} /> : null}
      {user ? (
        <>
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  )
}

export default StackNavigator
