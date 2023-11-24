import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlanMeLogo from '../../components/PlanMeLogo/PlanMeLogo'
import * as WebBrowser from 'expo-web-browser'
import GoogleLoginButton from '../../components/auth/components/GoogleLoginButton'

const SignInScreen = () => {
  const { signIn } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <PlanMeLogo />
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>

      <GoogleLoginButton signInFn={signIn} />

      <Text
        style={styles.linkText}
        onPress={() =>
          WebBrowser.openBrowserAsync('https://accounts.google.com/signup')
        }
      >
        Create a Google Account
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    backgroundColor: '#337bae',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default SignInScreen
