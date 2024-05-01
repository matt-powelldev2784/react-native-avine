import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../../components/auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlanMeLogo from '../../../components/PlanMeLogo/PlanMeLogo'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import theme from '../../../utils/theme/theme'
import { addClientSeeds } from '../../../db/seeds/addClientSeeds'
import Button from '../../../ui/button/Button'
import { addJobSeeds } from '../../../db/seeds/addJobSeeds'
import { addRoundSeeds } from '../../../db/seeds/addRoundSeeds'

const SignOut = () => {
  const { signOut, userInfo } = useAuth()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const userEmail = userInfo.providerData[0].email

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <PlanMeLogo />
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {/* ------ Seeds ----------- */}
      {userEmail === 'matt.powell2784@gmail.com' ? (
        <>
          <Button
            onPress={addClientSeeds}
            text="Add Client Seeds"
            isLoading={false}
            backgroundColor={'red'}
          />

          <Button
            onPress={addJobSeeds}
            text="Add Job Seeds"
            isLoading={false}
            backgroundColor={'red'}
          />

          <Button
            onPress={addRoundSeeds}
            text="Add Round Seeds"
            isLoading={false}
            backgroundColor={'red'}
          />
        </>
      ) : null}

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
    justifyContent: 'flex-start',
    gap: 20,
    padding: 4,
    backgroundColor: theme.colors.primary,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  backText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
})

export default SignOut
