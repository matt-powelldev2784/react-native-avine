import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth'
import { auth } from './firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StackNavigator from './StackNavigator'
import { SignIn, SignOut } from './app/components'

WebBrowser.maybeCompleteAuthSession()

const App = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '945554496854-hr1nsd0b4l7r34fs3upmkjscl3sg63ei.apps.googleusercontent.com',
    androidClientId:
      '945554496854-2m9h20r6qj02ie99qe9n600jd58ms83b.apps.googleusercontent.com',
    webClientId:
      '945554496854-07dm2kur1tskgs11liu31ffpo5ubrtjb.apps.googleusercontent.com',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  }, [response])

  const checkForLocalUser = async () => {
    const user = await AsyncStorage.getItem('@user')
    console.log('user', user)
    if (user) {
      setUserInfo(JSON.parse(user))
    }
  }

  useEffect(() => {
    checkForLocalUser()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user)
        await AsyncStorage.setItem('@user', JSON.stringify(user))
      } else {
        setUserInfo(null)
        console.log('User is not authenticated')
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <NavigationContainer>
      {userInfo ? <SignOut /> : <SignIn promptAsync={promptAsync} />}

      {/* <StackNavigator /> */}
    </NavigationContainer>
  )
}

export default App
