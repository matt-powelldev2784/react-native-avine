import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
//tslint:disable-next-line: no-submodule-imports
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider } from 'firebase/auth'
import { addUserToDb } from '../../db/user/addUserToDb'

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
  const provider = new GoogleAuthProvider()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  })

  const signInHandler = async () => {
    await signInWithPopup(auth, provider)
    await addUserToDb()
  }

  const signOutHandler = async () => {
    await signOut(auth)
    setUserInfo(null)
  }

  //if user is stored locally stack navigator will check for userInfo and navigate to appropriate screen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user)
      } else {
        setUserInfo(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const authContextValues = {
    userInfo,
    signIn: signInHandler,
    signOut: signOutHandler,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
