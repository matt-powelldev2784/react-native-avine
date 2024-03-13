import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Planner,
  ScheduleRound,
  Rounds,
  Jobs,
  SignInScreen,
  SignOutScreen,
  AddJob,
  EditJob,
  AddRound,
  EditRound,
  Home,
  Error,
  Clients,
  AddClient,
  EditClient,
} from '../../screens'
import { useAuth } from '../../components/auth/AuthProvider'

export type RootStackParamList = {
  //auth
  SignIn: undefined
  SignOut: undefined
  SplashScreen: undefined

  //misc
  Home: undefined
  Error: undefined

  //clients
  Clients: { refresh?: boolean } | undefined
  AddClient: undefined
  EditClient: { clientId: string } | undefined

  //rounds
  Rounds: { refresh?: boolean } | undefined
  AddRound: undefined
  EditRound: { roundId: string } | undefined

  //payments
  Planner: { refresh?: boolean; screen: string; jobId?: string } | undefined
  ScheduleRound: undefined

  //jobs
  Jobs: { refresh?: boolean } | undefined
  AddJob: undefined
  EditJob: { jobId: string } | undefined
}

export type RefreshableScreen = 'Rounds' | 'Planner' | 'Jobs'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const { userInfo } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <>
          <Stack.Screen
            name="Planner"
            component={Planner}
            initialParams={{ screen: 'PlannerView' }}
          />

          {/* --------------------------  Misc Screens  -------------------------- */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Error" component={Error} />

          {/* --------------------------  Client Screens  ---------------------- */}
          <Stack.Screen name="Clients" component={Clients} />
          <Stack.Screen name="AddClient" component={AddClient} />
          <Stack.Screen name="EditClient" component={EditClient} />

          {/* --------------------------  Job Screens  ---------------------- */}
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="AddJob" component={AddJob} />
          <Stack.Screen name="EditJob" component={EditJob} />

          {/* --------------------------  Planner Screens  -------------------------- */}

          <Stack.Screen name="ScheduleRound" component={ScheduleRound} />

          {/* --------------------------  Round Screens  ------------------------- */}
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="AddRound" component={AddRound} />
          <Stack.Screen name="EditRound" component={EditRound} />

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
