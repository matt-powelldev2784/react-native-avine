import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlanMeLogo from '../components/PlanMeLogo/PlanMeLogo'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './stackNavigator/StackNavigator'

const SignOutScreen = () => {
  const { signOut } = useAuth()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <PlanMeLogo />
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
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
  backButton: {
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  backText: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
  },
})

export default SignOutScreen
