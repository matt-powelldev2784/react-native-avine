import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  const user = false

  return (
    <Stack.Navigator>
      {!user ? <Stack.Screen name="Login" component={LoginScreen} /> : null}
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  )
}

export default StackNavigator
