import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const { promptAsync } = useAuth()

  return (
    <View>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={() => promptAsync()}>
        <Text>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignInScreen
