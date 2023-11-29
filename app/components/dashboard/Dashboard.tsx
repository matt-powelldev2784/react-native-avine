import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import NavBar from '../navBar/NavBar'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { useDeviceType } from '../../utils/deviceTypes'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb, isSmallWeb } = useDeviceType()

  return (
    <SafeAreaView style={styles.screen}>
      {/* --------------------------  Small Screen Web View  -------------------------- */}
      {isSmallWeb ? (
        <View style={styles.headerSmallScreen}>
          <View style={styles.logoContainerSmallScreen}>
            <PlanMeLogo width={200} height={50} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SignOut')}
            >
              <Image
                source={require('../../../assets/settings.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* -------------------------- Large Screen Web View --------------------------  */}
      {isLargeWeb ? (
        <View style={styles.headerLargeScreen}>
          <View style={styles.logoContainerLargeScreen}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <PlanMeLogo width={200} height={50} />
            </TouchableOpacity>
          </View>

          <NavBar />
        </View>
      ) : null}

      {/* -------------------------- Children for Main View --------------------------  */}
      <View style={styles.page}>{children}</View>

      {/* -------------------------- Navbar For Smnall Devices --------------------------  */}
      {isSmallWeb ? <NavBar /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#337bae',
  },
  headerSmallScreen: {
    backgroundColor: '#337bae',
    paddingHorizontal: 16,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerLargeScreen: {
    backgroundColor: '#337bae',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainerSmallScreen: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  logoContainerLargeScreen: {
    flexDirection: 'row',
    gap: 16,
  },
  page: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f1f2f2',
    alignItems: 'center',
  },
  text: {
    color: '#337bae',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  circleSmallScreen: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLargeScreen: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  account: {
    color: '#337bae',
    fontWeight: 'bold',
  },
  accountLarge: {
    color: '#337bae',
    fontWeight: 'bold',
    fontSize: 20,
  },
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

export default Dashboard
