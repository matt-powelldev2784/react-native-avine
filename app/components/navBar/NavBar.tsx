import {
  View,
  Image,
  StyleSheet,
  Platform,
  Text,
  Pressable,
} from 'react-native'
import React from 'react'

const NavBar = () => {
  return (
    <View style={styles.nav}>
      <Pressable style={styles.button}>
        <Image
          source={require('../../../assets/customers.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>CUSTOMERS</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Image
          source={require('../../../assets/round.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>ROUNDS</Text>
      </Pressable>

      <Pressable style={styles.button}>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS === 'web' ? 'flex-end' : 'space-around',
    backgroundColor: '#337bae',
    gap: Platform.OS === 'web' ? 32 : 0,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
  },
})

export default NavBar
