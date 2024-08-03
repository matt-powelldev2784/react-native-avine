import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlanMeLogo from '../../../components/PlanMeLogo/PlanMeLogo'
import * as WebBrowser from 'expo-web-browser'
import GoogleLoginButton from '../../../components/auth/components/GoogleLoginButton'
import theme from '../../../utils/theme/theme'
import Button from '../../../ui/button/Button'

const SignIn = () => {
  const { signIn } = useAuth()
  const handleCreateGoogleAccount = () => {
    WebBrowser.openBrowserAsync('https://accounts.google.com/signup')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <PlanMeLogo />
        <Text style={styles.text}>
          Database, planner and invoicing application for window cleaning
          professionals.
        </Text>
      </View>

      <GoogleLoginButton signInFn={signIn} />

      <View style={styles.linkContainer}>
        <Button
          text="Create Google Account"
          onPress={handleCreateGoogleAccount}
          backgroundColor={theme.colors.plannerPrimary}
          height={35}
        />

        <Text style={styles.linkText} onPress={handleCreateGoogleAccount}>
          If you do not have a google account, create a new one here and login
          using your google credientials.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    backgroundColor: theme.colors.primary,
    minHeight: 400,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  linkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  linkText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    paddingHorizontal: 16,
    cursor: 'pointer',
  },
})

export default SignIn
