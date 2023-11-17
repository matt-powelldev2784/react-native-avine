import React, { createContext, useContext, ReactNode, useState } from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
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
  const provider = new GoogleAuthProvider()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  })

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      const user = result.user
      console.log('user', user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      console.log('errorCode', errorCode)
      console.log('errorMessage', errorMessage)
      console.log('email', email)
      console.log('credential', credential)
    }
  }

  const signOutHandler = async () => {
    await signOut(auth)
    setUserInfo(null)
  }

  const authContextValues = {
    userInfo,
    signIn: signInWithGoogle,
    signOut: signOutHandler,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
