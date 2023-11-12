import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider } from 'firebase/auth'

interface AuthProviderProps {
  children?: ReactNode
}

interface AuthContextType {
  userInfo: any
  promptAsync: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  promptAsync: () => {},
  signOut: () => {},
})
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '945554496854-hr1nsd0b4l7r34fs3upmkjscl3sg63ei.apps.googleusercontent.com',
    androidClientId:
      '945554496854-2m9h20r6qj02ie99qe9n600jd58ms83b.apps.googleusercontent.com',
    webClientId:
      '945554496854-07dm2kur1tskgs11liu31ffpo5ubrtjb.apps.googleusercontent.com',
  })

  const signIn = async () => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  }

  const signOutHandler = async () => {
    await signOut(auth)
    await AsyncStorage.removeItem('@user')
    setUserInfo(null)
  }

  useEffect(() => {
    if (response?.type === 'success') {
      signIn()
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
      }
    })

    return () => unsubscribe()
  }, [])

  const authContextValues = {
    userInfo,
    promptAsync: promptAsync,
    signOut: signOutHandler,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
