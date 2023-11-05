import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import MapScreen from './app/screens/MapScreen'
import Customers from './app/screens/Customers'
import Payments from './app/screens/Paymemts'
import Rounds from './app/screens/Rounds'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  Customers: undefined
  Rounds: undefined
  Payments: undefined
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
          <Stack.Screen name="Customers" component={Customers} />
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="Payments" component={Payments} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  )
}

export default StackNavigator
