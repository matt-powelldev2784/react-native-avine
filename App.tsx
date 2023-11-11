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
import StackNavigator from './StackNavigator'
import { SignIn } from './app/components'

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user)
        console.log(user)
      } else {
        setUserInfo(null)
        console.log('no user')
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <NavigationContainer>
      {userInfo ? <StackNavigator /> : <SignIn promptAsync={promptAsync} />}

      {/* <StackNavigator /> */}
    </NavigationContainer>
  )
}

export default App
