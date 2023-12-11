import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeviceType } from '../../utils/deviceTypes'
import theme from '../../utils/theme/theme'

const NavBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()

  const styles = StyleSheet.create({
    nav: {
      position: isLargeWeb ? 'relative' : ('fixed' as any),
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.primary,
      gap: isLargeWeb ? 32 : 0,
      paddingTop: 8,
      paddingBottom: 6,
      width: isLargeWeb ? 'auto' : '100%',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      width: 80,
    },
    buttonText: {
      paddingTop: 2,
      color: 'white',
      fontSize: isLargeWeb ? 14 : 12,
    },
  })

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Jobs', { refresh: true })}
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
        onPress={() => navigation.navigate('Payments')}
      >
        <Image
          source={require('../../../assets/calendar_white.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>PLANNER</Text>
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
