import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlanMeLogo from '../components/PlanMeLogo/PlanMeLogo'
import * as WebBrowser from 'expo-web-browser'

const SignInScreen = () => {
  const { promptAsync } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <PlanMeLogo />
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Image
          style={styles.image}
          source={require('../../assets/google_g.png')} // replace with the path to your logo
        />
        <Text style={styles.buttonText}>Sign In With Google</Text>
      </TouchableOpacity>

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
  image: {
    width: 40,
    height: 40,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default SignInScreen
