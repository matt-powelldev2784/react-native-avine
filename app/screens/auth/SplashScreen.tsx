import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import PlanMeLogo from '../../components/PlanMeLogo/PlanMeLogo'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../stackNavigator/StackNavigator'

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignIn')
    }, 2000)

    return () => clearTimeout(timer) // This will clear the timer when the component unmounts
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <PlanMeLogo />
      <Text style={styles.text}>Quick and Simple Round Planner</Text>
      <ActivityIndicator
        color={'#ffffff'}
        size="large"
        style={{ padding: 8, position: 'absolute', bottom: 32 }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#337bae',
  },
  image: {
    width: 300,
    height: 74,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
})

export default SplashScreen
