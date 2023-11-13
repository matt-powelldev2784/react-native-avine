import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  SplashScreen,
  MapScreen,
  Customers,
  Payments,
  Rounds,
  Jobs,
  SignInScreen,
  SignOutScreen,
} from './app/screens'
import { useAuth } from './app/components/auth/AuthProvider'

export type RootStackParamList = {
  SignIn: undefined
  SignOut: undefined
  SplashScreen: undefined
  Customers: undefined
  Rounds: undefined
  Payments: undefined
  Jobs: undefined
  Map: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const { userInfo } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <>
          <Stack.Screen name="SignOut" component={SignOutScreen} />
          <Stack.Screen name="Rounds" component={Rounds} />

          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="Customers" component={Customers} />

          <Stack.Screen name="Payments" component={Payments} />
          <Stack.Screen name="Map" component={MapScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
