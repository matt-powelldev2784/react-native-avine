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
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  signIn: () => {},
  signOut: () => {},
})
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  })

  const signOutHandler = async () => {
    await signOut(auth)
    await AsyncStorage.removeItem('@user')
    setUserInfo(null)
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  }, [response])

  const checkForLocalUser = async () => {
    const user = await AsyncStorage.getItem('@user')
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
    signIn: promptAsync,
    signOut: signOutHandler,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
