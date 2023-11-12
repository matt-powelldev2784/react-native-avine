import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = ({ promptAsync }: any) => {
  return (
    <View>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={() => promptAsync()}>
        <Text>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn
