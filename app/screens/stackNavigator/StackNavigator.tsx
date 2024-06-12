import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Planner,
  InvoiceListView,
  AddCompanyInfo,
  EditInvoice,
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
  ClientMenuScreen,
  JobMenuScreen,
} from '../../screens'
import { useAuth } from '../../components/auth/AuthProvider'
import RoundMenuScreen from '../rounds/RoundMenuScreen'

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
  ClientMenu: undefined
  EditClient: { clientId: string } | undefined

  //rounds
  Rounds: { refresh?: boolean } | undefined
  AddRound: undefined
  EditRound: { roundId: string } | undefined
  RoundMenu: undefined

  //planner
  Planner:
    | {
        refresh?: boolean
        screen: string
      }
    | undefined

  //invoices
  InvoiceListView: { refresh?: boolean } | undefined
  EditInvoice: { invoiceId: string } | undefined
  AddCompanyInfo: undefined

  //jobs
  JobsMenu: undefined
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
          {/* --------------------------  Planner Screens  -------------------------- */}
          <Stack.Screen
            name="Planner"
            component={Planner}
            initialParams={{ screen: 'PlannerView' }}
          />

          {/* --------------------------  Misc Screens  -------------------------- */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Error" component={Error} />

          {/* --------------------------  Round Screens  ------------------------- */}
          <Stack.Screen name="RoundMenu" component={RoundMenuScreen} />
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="AddRound" component={AddRound} />
          <Stack.Screen name="EditRound" component={EditRound} />

          {/* --------------------------  Invoice Screens  -------------------------- */}
          <Stack.Screen name="InvoiceListView" component={InvoiceListView} />

          <Stack.Screen name="EditInvoice" component={EditInvoice} />
          <Stack.Screen name="AddCompanyInfo" component={AddCompanyInfo} />

          {/* --------------------------  Client Screens  ---------------------- */}
          <Stack.Screen name="Clients" component={Clients} />
          <Stack.Screen name="ClientMenu" component={ClientMenuScreen} />
          <Stack.Screen name="AddClient" component={AddClient} />
          <Stack.Screen name="EditClient" component={EditClient} />

          {/* --------------------------  Job Screens  ---------------------- */}
          <Stack.Screen name="Jobs" component={Jobs} />
          <Stack.Screen name="JobsMenu" component={JobMenuScreen} />
          <Stack.Screen name="AddJob" component={AddJob} />
          <Stack.Screen name="EditJob" component={EditJob} />

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
