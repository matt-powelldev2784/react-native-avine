import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import MapScreen from './app/screens/MapScreen'
import Dashboard from './app/screens/Dashboard'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  Dashboard: undefined
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
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  )
}

export default StackNavigator
