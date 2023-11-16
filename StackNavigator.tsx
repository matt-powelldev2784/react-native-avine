import React, { useEffect, useState } from 'react'
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
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

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
  const [user, setUser] = useState(userInfo)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    setUser(userInfo)
    if (userInfo) {
      setTimeout(() => navigation.navigate('Customers'), 100)
    } else {
      navigation.navigate('SignIn')
    }
  }, [userInfo])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
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
