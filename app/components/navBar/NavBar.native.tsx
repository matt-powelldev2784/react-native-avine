import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '../../utils/theme/theme'

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Jobs')}
      >
        <Image
          source={require('../../../assets/customers.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>JOBS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Rounds')}
      >
        <Image
          source={require('../../../assets/round.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>ROUNDS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Planner')}
      >
        <Image
          source={require('../../../assets/calendar_white.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>PLANNER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute' as any,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary,
    paddingTop: 8,
    paddingBottom: 6,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
})

export default NavBar
