import { registerRootComponent } from 'expo'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './app/components/auth/AuthProvider'
import StackNavigator from './app/screens/stackNavigator/StackNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  NotoSans_700Bold,
  NotoSans_400Regular,
} from '@expo-google-fonts/noto-sans'

const App = () => {
  const [fontsLoaded] = useFonts({
    NotoSans_700Bold,
    NotoSans_400Regular,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
