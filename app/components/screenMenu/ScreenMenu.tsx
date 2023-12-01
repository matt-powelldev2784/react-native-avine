import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'
import { useDeviceType } from '../../utils/deviceTypes'

interface ScreenMenuProps {
  title: string
  navigateTo?: keyof RootStackParamList
}

const ScreenMenu = ({ title, navigateTo }: ScreenMenuProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()

  return (
    <View
      style={
        isLargeWeb
          ? styles.menuContianerLargeWeb
          : styles.menuContianerSmallScreen
      }
    >
      <Text style={styles.pageTitle}>{title}</Text>

      {navigateTo ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => (navigateTo ? navigation.navigate('AddJob') : null)}
        >
          <Image
            source={require('../../../assets/plus.png')}
            style={{ width: 13, height: 13 }}
          />
          <Text style={styles.buttonText}>Add Job</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  menuContianerSmallScreen: {
    backgroundColor: '#aa337b',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 8,
  },
  menuContianerLargeWeb: {
    backgroundColor: '#aa337b',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pageTitle: {
    fontSize: 24,
    color: 'white',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  pageTitleHidden: {
    opacity: 0,
  },
  circle: {
    top: 5,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})

export default ScreenMenu
