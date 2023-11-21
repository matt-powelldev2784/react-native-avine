import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../PlanMeLogo/PlanMeLogo'
import NavBar from '../navBar/NavBar'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView style={styles.screen}>
      {/* -------------------------- Header --------------------------  */}

      <View style={styles.headerNative}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <PlanMeLogo width={150} height={40} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circle}
          onPress={() => navigation.navigate('SignOut')}
        >
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
    backgroundColor: '#337bae',
  },
  headerNative: {
    backgroundColor: '#337bae',
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  page: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 52,
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
    paddingTop: 0,
    color: '#ffffff',
  },
})

export default Dashboard
