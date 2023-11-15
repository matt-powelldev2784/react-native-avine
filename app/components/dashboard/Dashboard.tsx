import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import NavBar from '../navBar/NavBar'
import { useAuth } from '../auth/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../StackNavigator'
import { useDeviceType } from '../../utils/deviveTypes'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isWeb, isLargeWeb, isSmallWeb, isNative } = useDeviceType()
  const { userInfo } = useAuth()
  const userInitials = userInfo?.displayName
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')

  return (
    <SafeAreaView style={styles.screen}>
      {/* --------------------------  Small Screen Web View  -------------------------- */}
      {isSmallWeb ? (
        <View style={styles.navSmallScreen}>
          <View style={styles.logoContainer}>
            <PlanMeLogo width={200} height={50} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SignOut')}
            >
              <View style={styles.circle}>
                <Text style={styles.account}>{userInitials || null}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* -------------------------- Large Screen Web View --------------------------  */}
      {isLargeWeb ? (
        <View style={styles.navLargeScreen}>
          <PlanMeLogo width={200} height={50} />
          <NavBar />
        </View>
      ) : null}

      {/* -------------------------- Native App View --------------------------  */}
      {isNative ? (
        <View style={styles.headerNative}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <PlanMeLogo width={150} height={40} />
          </TouchableOpacity>
          <View style={styles.circle}>
            <Text
              style={styles.account}
              onPress={() => navigation.navigate('SignOut')}
            >
              {userInitials || null}
            </Text>
          </View>
        </View>
      ) : null}

      {/* -------------------------- Children for Main View --------------------------  */}
      <View style={styles.page}>{children}</View>

      {/* -------------------------- Navbar For Native App --------------------------  */}
      {isNative ? <NavBar /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#337bae',
  },
  navSmallScreen: {
    backgroundColor: '#337bae',
    paddingHorizontal: Platform.OS === 'web' ? 24 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 6,
  },
  navLargeScreen: {
    backgroundColor: '#337bae',
    paddingHorizontal: Platform.OS === 'web' ? 24 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerNative: {
    backgroundColor: '#337bae',
    paddingHorizontal: Platform.OS === 'web' ? 24 : 16,
    paddingVertical: Platform.OS === 'web' ? 0 : 6,
    flexDirection: 'row',
    justifyContent: Platform.OS === 'web' ? 'center' : 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  page: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    gap: 8,
    paddingBottom: Platform.OS !== 'web' ? 52 : 128,
  },
  text: {
    color: '#337bae',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  account: { color: '#337bae', fontWeight: 'bold' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    paddingTop: Platform.OS !== 'web' ? 2 : 0,
    color: '#ffffff',
  },
  navSmall: {
    position: 'absolute',
    bottom: 0,
  },
})

export default Dashboard
