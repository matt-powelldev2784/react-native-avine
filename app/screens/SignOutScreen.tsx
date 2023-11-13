import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'

const SignOutScreen = () => {
  const { signOut } = useAuth()

  return (
    <View>
      <Text>SignOut</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignOutScreen
