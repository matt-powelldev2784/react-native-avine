import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './app/components/auth/AuthProvider'
import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
