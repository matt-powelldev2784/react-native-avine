import {
  View,
  Image,
  StyleSheet,
  Platform,
  Text,
  Pressable,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../StackNavigator'

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.nav}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Customers')}
      >
        <Image
          source={require('../../../assets/customers.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>CUSTOMERS</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Rounds')}
      >
        <Image
          source={require('../../../assets/round.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>ROUNDS</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Payments')}
      >
        <Image
          source={require('../../../assets/pay.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>PAYMENTS</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: Platform.OS === 'web' ? 'relative' : 'absolute',
    bottom: 0,
    paddingBottom: Platform.OS === 'web' ? 0 : 32,
    paddingTop: Platform.OS === 'web' ? 0 : 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS === 'web' ? 'center' : 'space-around',
    backgroundColor: '#337bae',
    gap: Platform.OS === 'web' ? 32 : 0,
    width: Platform.OS !== 'web' ? '100%' : 'auto',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: Platform.OS === 'web' ? 8 : 0,
  },
  buttonText: {
    paddingTop: 4,
    color: '#ffffff',
  },
})

export default NavBar
