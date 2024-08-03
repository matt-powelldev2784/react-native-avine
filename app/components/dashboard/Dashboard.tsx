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
import NavBar from './components/navBar/NavBar'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { useDeviceType } from '../../utils/hooks/useDeviceTypes'
import theme from '../../utils/theme/theme'

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

            <View style={styles.navConatinerSmallScreen}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Image
                  source={require('../../../assets/home.png')}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>

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
        </View>
      ) : null}

      {/* -------------------------- Large Screen Web View --------------------------  */}
      {isLargeWeb ? (
        <View style={styles.headerLargeScreen}>
          <View style={styles.logoContainerLargeScreen}>
            <PlanMeLogo width={150} height={36} />
            {/* <PlanMeIcon width={30} height={30} /> */}
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
    backgroundColor: theme.colors.primary,
  },
  headerSmallScreen: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: '5%',
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerLargeScreen: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 34,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 40,
  },
  logoContainerSmallScreen: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  navConatinerSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  logoContainerLargeScreen: {
    flexDirection: 'row',
    gap: 16,
  },
  page: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: theme.colors.primary,
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
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  accountLarge: {
    color: theme.colors.primary,
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
    color: theme.colors.white,
  },
})

export default Dashboard
