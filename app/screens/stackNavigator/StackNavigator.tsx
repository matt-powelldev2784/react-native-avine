import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Payments,
  Rounds,
  Jobs,
  SignInScreen,
  SignOutScreen,
  AddJob,
  EditJob,
  AddRound,
} from '..'
import { useAuth } from '../../components/auth/AuthProvider'

export type RootStackParamList = {
  //auth
  SignIn: undefined
  SignOut: undefined
  SplashScreen: undefined

  //rounds
  Rounds: { refresh?: boolean } | undefined
  AddRound: undefined

  //payments
  Payments: undefined

  //jobs
  Jobs: { refresh?: boolean } | undefined
  AddJob: undefined
  EditJob: { jobId: string } | undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const { userInfo } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <>
          {/* --------------------------  Job Screens  ---------------------- */}
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="AddJob" component={AddJob} />
          <Stack.Screen name="EditJob" component={EditJob} />

          {/* --------------------------  Round Screens  ------------------------- */}
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="AddRound" component={AddRound} />

          {/* --------------------------  Round Screens  -------------------------- */}
          <Stack.Screen name="Payments" component={Payments} />

          {/* --------------------------  Auth Screens Screens  ------------------- */}
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
