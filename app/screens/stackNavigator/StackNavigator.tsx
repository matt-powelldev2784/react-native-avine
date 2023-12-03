import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Payments,
  Rounds,
  Jobs,
  SignInScreen,
  SignOutScreen,
  AddJob,
  EditJob,
} from '..'
import { useAuth } from '../../components/auth/AuthProvider'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

export type RootStackParamList = {
  //auth
  SignIn: undefined
  SignOut: undefined
  SplashScreen: undefined

  //rounds
  Rounds: undefined

  //payments
  Payments: undefined

  //jobs
  Jobs: undefined
  AddJob: undefined
  EditJob: { jobId: string } | undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const { userInfo } = useAuth()
  const [user, setUser] = useState(userInfo)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    setUser(userInfo)
    if (userInfo) {
      setTimeout(() => navigation.navigate('EditJob'), 100)
    } else {
      navigation.navigate('SignIn')
    }
  }, [userInfo, navigation])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          {/* --------------------------  Job Screens  ---------------------- */}
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="AddJob" component={AddJob} />
          <Stack.Screen name="EditJob" component={EditJob} />

          {/* --------------------------  Round Screens  ------------------------- */}
          <Stack.Screen name="Rounds" component={Rounds} />

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
