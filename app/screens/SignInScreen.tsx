import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const { promptAsync } = useAuth()

  return (
    <SafeAreaView style={styles.screen}>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={() => promptAsync()}>
        <Text>Sign In With Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default SignInScreen
