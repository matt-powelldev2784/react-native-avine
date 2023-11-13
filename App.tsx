import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthProvider from './app/components/auth/AuthProvider'
import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App
