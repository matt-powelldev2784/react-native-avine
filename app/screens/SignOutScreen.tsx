import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignOutScreen = () => {
  const { signOut } = useAuth()

  return (
    <SafeAreaView>
      <Text>SignOut</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignOutScreen
