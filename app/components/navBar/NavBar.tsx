import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
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
          justifyContent: 'space-around',
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
          width: 80,
        },
        buttonText: {
          paddingTop: isWeb ? 2 : 0,
          color: '#ffffff',
          fontSize: 12,
        },
      }),
    [isWeb, isLargeWeb, isSmallWeb, isNative, insets.bottom],
  )

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
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
        onPress={() => navigation.navigate('Payments')}
      >
        <Image
          source={require('../../../assets/pay.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>PAYMENTS</Text>
      </TouchableOpacity>

      {isLargeWeb && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignOut')}
        >
          <Image
            source={require('../../../assets/settings.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={styles.buttonText}>SETTINGS</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default NavBar
