import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
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
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const { userInfo } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <>
          {/* --------------------------  Customer Screens  ---------------------- */}
          <Stack.Screen name="Customers" component={Customers} />

          {/* --------------------------  Round Screens  ------------------------- */}
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="Jobs" component={Jobs} />

          {/* --------------------------  Round Screens  -------------------------- */}
          <Stack.Screen name="Payments" component={Payments} />

          {/* --------------------------  Auth Screens Screens  ------------------- */}
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignOut" component={SignOutScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
