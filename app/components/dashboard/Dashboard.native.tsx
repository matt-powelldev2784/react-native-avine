import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import NavBar from './components/navBar/NavBar'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import theme from '../../utils/theme/theme'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView style={styles.screen}>
      {/* -------------------------- Header --------------------------  */}
      <View style={styles.headerNative}>
        <PlanMeLogo width={150} height={40} />

        <TouchableOpacity onPress={() => navigation.navigate('SignOut')}>
          <Image
            source={require('../../../assets/settings.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>

      {/* -------------------------- Children for Main View --------------------------  */}
      <View style={styles.page}>{children}</View>

      {/* -------------------------- Bottom Navbar --------------------------  */}
      <NavBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: theme.colors.primary,
  },
  headerNative: {
    position: 'relative',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 52,
    width: '100%',
  },
  text: {
    backgroundColor: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  account: { color: theme.colors.primary, fontWeight: 'bold' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    paddingTop: 0,
    color: theme.colors.secondary,
  },
})

export default Dashboard
