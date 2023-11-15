import {
  View,
  Image,
  StyleSheet,
  Platform,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../auth/AuthProvider'

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const insets = useSafeAreaInsets()
  const windowWidth = useWindowDimensions().width
  const { userInfo } = useAuth()
  const userInitials = userInfo?.displayName
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')

  const safeAreaStyle = StyleSheet.create({
    nav: {
      position:
        Platform.OS === 'web' && Platform.OS === 'web' && windowWidth < 768
          ? 'fixed'
          : Platform.OS === 'web'
          ? 'relative'
          : ('absolute' as any),
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: Platform.OS === 'web' ? 'center' : 'space-around',
      backgroundColor: '#337bae',
      gap: Platform.OS === 'web' ? 32 : 0,
      paddingTop: 8,
      paddingBottom: Platform.OS !== 'web' && insets.bottom > 0 ? 0 : 6,
      width:
        Platform.OS !== 'web' || (Platform.OS === 'web' && windowWidth < 768)
          ? '100%'
          : 'auto',
    },
  })

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={safeAreaStyle.nav}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    paddingTop: Platform.OS !== 'web' ? 2 : 0,
    color: '#ffffff',
  },
})

export default NavBar
