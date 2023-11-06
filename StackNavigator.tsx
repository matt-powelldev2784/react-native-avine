import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  SplashScreen,
  LoginScreen,
  MapScreen,
  Customers,
  Payments,
  Rounds,
  Jobs,
} from './app/screens'

export type RootStackParamList = {
  Login: undefined
  SplashScreen: undefined
  Customers: undefined
  Rounds: undefined
  Payments: undefined
  Jobs: undefined
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
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="Customers" component={Customers} />
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="Payments" component={Payments} />

          <Stack.Screen name="Map" component={MapScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  )
}

export default StackNavigator
