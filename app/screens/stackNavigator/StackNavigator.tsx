import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
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
  BusinessStatsScreen,
  StaticSiteScreen,
  PrivacyPolicyScreen,
} from '../../screens'
import Planner from '../../screens/planner/Planner'
import { useAuth } from '../../components/auth/AuthProvider'
import RoundMenuScreen from '../rounds/RoundMenuScreen'
import { useNavigationState } from '@react-navigation/native'
import { Platform } from 'react-native'

export type RootStackParamList = {
  //auth
  SignIn: undefined
  SignOut: undefined
  SplashScreen: undefined

  //misc
  Home: undefined
  Error: undefined
  BusinessStats: undefined
  PlanMe: undefined
  PrivacyPolicy: undefined

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
        date?: Date
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
  const navigationState = useNavigationState((state) => state)
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'PlanMe'
    }
  }, [navigationState])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <>
          {/* --------------------------  Misc Screens  -------------------------- */}

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen name="BusinessStats" component={BusinessStatsScreen} />

          {/* --------------------------  Planner Screens  -------------------------- */}
          <Stack.Screen
            name="Planner"
            component={Planner}
            initialParams={{ screen: 'ExtendedPlannerView' }}
          />

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
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        </>
      ) : (
        <>
          {Platform.OS === 'web' ? (
            <>
              <Stack.Screen name="PlanMe" component={StaticSiteScreen} />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
              />
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
              />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
