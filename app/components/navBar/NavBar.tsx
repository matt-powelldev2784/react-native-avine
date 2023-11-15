import { Image, StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDeviceType } from '../../utils/deviveTypes'

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const insets = useSafeAreaInsets()
  const { isWeb, isLargeWeb, isSmallWeb, isNative } = useDeviceType()

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        nav: {
          position:
            (isLargeWeb && 'relative') ||
            (isSmallWeb && 'fixed') ||
            (isNative && ('absolute' as any)),
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isWeb ? 'center' : 'space-around',
          backgroundColor: '#337bae',
          gap: isWeb ? 32 : 0,
          paddingTop: 8,
          paddingBottom: isNative && insets.bottom > 0 ? 0 : 6,
          width:
            (isLargeWeb && 'auto') ||
            (isSmallWeb && '100%') ||
            (isNative && '100%') ||
            'auto',
        },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        },
        buttonText: {
          paddingTop: isWeb ? 2 : 0,
          color: '#ffffff',
        },
      }),
    [isWeb, isLargeWeb, isSmallWeb, isNative, insets.bottom]
  )

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
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

export default NavBar
