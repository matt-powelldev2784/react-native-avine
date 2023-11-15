import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import NavBar from '../navBar/NavBar'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  const windowWidth = useWindowDimensions().width

  return (
    <SafeAreaView style={styles.screen}>
      {/* Small Screen Web View */}
      {Platform.OS === 'web' && windowWidth < 768 ? (
        <View style={styles.navSmallScreen}>
          <PlanMeLogo width={200} height={50} />
          <NavBar />
        </View>
      ) : null}

      {/* Large Screen Web View */}
      {Platform.OS === 'web' && windowWidth > 768 ? (
        <View style={styles.navLargeScreen}>
          <PlanMeLogo width={200} height={50} />
          <NavBar />
        </View>
      ) : null}

      {/* Native App View */}
      {Platform.OS !== 'web' ? (
        <View style={styles.headerNative}>
          <PlanMeLogo width={150} height={40} />
          <View style={styles.circle}>
            <Text>AB</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.page}>{children}</View>

      {Platform.OS !== 'web' ? <NavBar /> : null}
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
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Dashboard
